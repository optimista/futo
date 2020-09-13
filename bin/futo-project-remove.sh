#!/bin/bash

futo-project-remove()
{
	name=$1
	[ ! -d $name ] && cd ..

	expect <(cat <<-EOF
	spawn vercel rm $name;
	expect "> Are you sure? \[y/N\]"
	send "y\r";
	expect eof
	EOF
	)

	if [ -f $name/.firebaserc ]; then
		projectid=$( cat $name/.firebaserc | sed -n '/default/{s/^.*"\([a-z0-9-]*\)"/\1/;p}' )

		expect <(cat <<-EOF
		spawn vercel secrets remove $projectid-google-app-credentials;
		expect "? Are you sure? \[y/N\]"
		send "y\r";
		expect eof
		EOF
		)

		futo-project-remove-firebase $name $projectid
	fi

	[ -d $name/.git ] && futo-project-remove-gitlab $name
	rm -rf $name
}

futo-project-remove-firebase()
{
	name=$1
	projectid=$2
	url="https://console.firebase.google.com/project/$projectid/settings/general"
	echo "To delete project on firebase go to your browser and newly opened link $url"
	google-chrome-stable $url > /dev/null 2>&1 
}

futo-project-remove-gitlab()
{
	name=$1
	gitlabprojectid=$( gitlab project list --owned=True | grep -B 1 "path: $name" | sed -n '1s/id: //p' )
	gitlab project delete --id=$gitlabprojectid
	groupid=$( gitlab namespace list --search=$name | sed -n '1s/id: //p' )
	gitlab group delete --id=$groupid
}
