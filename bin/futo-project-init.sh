#!/bin/bash

templates=$HOME/.bin/futo/templates

### HELPERS
import-secondary()
{
	import=$1; file=$2
	sed -i "1,/^$/s/^$/\n$import\n/" $file
}

### INIT

futo-project-init()
{
	name=$1
	futo-project-init-pre $@
	futo-project-init-vercel $@
	futo-project-init-material-ui $@
	futo-project-init-styling $@
	futo-project-init-post $@
}

### PRE & POST

futo-project-init-pre()
{
	name=$1
	while [ -n "$2" ]; do
		case "$2" in
			--gitlab)
				if [[ $( gitlab group create --name=$name --path=$name 2>&1 | grep "Impossible" ) ]]; then
					echo "Group with namespace $name already exists."
					exit 1
				fi
			;;
		esac
		shift
	done
}

futo-project-init-vercel()
{
	name=$1
	vercel init nextjs $name && cd $name && vercel --confirm && npm i	

	# Set index.js HTML, imports and remove vercel.svg
	sed -i "/^  <div className=\"container\">$/,/^  <\/div>$/d;/const Home = () => (/a \ \ <h1>${name^}<\/h1>" pages/index.js # delete all html; insert div with title
	sed -i "/^import/,/^$/d" pages/index.js # delete all imports
	rm -rf pages/api public/vercel.svg # getting rid of api & vercel.svg
}

futo-project-init-material-ui()
{
	### Variables
	name=$1

	### Install @material-ui/core 
	npm install @material-ui/core
	wget -O pages/_app.js https://raw.githubusercontent.com/mui-org/material-ui/master/examples/nextjs/pages/_app.js
	wget -O pages/_document.js https://raw.githubusercontent.com/mui-org/material-ui/master/examples/nextjs/pages/_document.js
	mkdir src && wget -O src/theme.js https://raw.githubusercontent.com/mui-org/material-ui/master/examples/nextjs/src/theme.js 

	### pages/index.js (only change of pages/index.js here)
	mkdir app && mkdir app/layouts && cp $templates/app/layouts/FocusLayout.js app/layouts/FocusLayout.js
	echo "export { default as FocusLayout } from './FocusLayout'" > app/layouts/index.js
	cp $templates/pages/index.js pages/index.js
	sed -i "s/\(<Typography[^>]*>\)Name\(<\/Typography>\)/\1${name^}\2/" pages/index.js

	### Creating app folder
	npm install path
	cp $templates/next.config.js next.config.js
		
	### Move theme to app/utils
	mkdir app/utils && mv src/theme.js app/utils/theme.js && rm -rf src 
	echo "export { default as theme } from './theme'" > app/utils/index.js
	# rewrite relative theme import into app module resolve
	sed -i "s/import theme from '\.\.\/src\/theme';/\nimport { theme } from 'utils' /g" pages/_app.js pages/_document.js

	### _app preparation
	sed -i "s/MyApp/"${name^}"App/" pages/_app.js
	sed -i "s/My page/"${name^}"/g" pages/_app.js # change title

	### _document.js preparation
	sed -i "/{\/\* PWA primary color \*\/}/d" pages/_document.js # get rid of comment
	sed -i ":a;/<[^>]*$/{N;s/\n */ /;ba;}" pages/_document.js # get rid of line breaks in html
	sed -i "s/MyDocument/${name^}Document/g" pages/_document.js # change name of Document class

	### add general styles.css
  sed -i '/<\/Head>/i \          <link rel="stylesheet" type="text/css" href="/styles.css" />' pages/_document.js
  touch public/styles.css # add styles to head
}

futo-project-init-styling() {
	### fonts
	sed -i '/Roboto/s/<[^>]*>/<link rel="stylesheet" href="https:\/\/fonts.googleapis.com\/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,700;1,100;1,300;1,500;1,700\&display=swap" \/>/' pages/_document.js

	### add Link
	sed -i "/^import { red } from '@material-ui\/core\/colors'/a\import NextLink from 'next/link'\nimport { forwardRef } from 'react'" app/utils/theme.js
	sed -i "/const theme/i\const Link = forwardRef(({ className, children, onBlur, onFocus, ...props }, ref) => <NextLink {...props}><a className={className}>{children}</a></NextLink>);" app/utils/theme.js
	sed -i '/^\/\/ Create a theme instance./d' app/utils/theme.js

	### styling
	sed -i '/^const theme/,/^});/d' app/utils/theme.js
	sed -i "1i import { Fade } from '@material-ui/core'" app/utils/theme.js
	sed -i -e "/^const Link/r $templates/app/utils/_theme.js" -e '/^const Link/a\\n' app/utils/theme.js

	### add theme preview
	cp $templates/pages/theme.js pages/theme.js
}

futo-project-init-post()
{
	name=$1
	while [ -n "$2" ]; do
		case "$2" in
			--firebase)
				projectid=$name-$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 5 | head -n 1)
				futo-project-init-post-firebase-setup $name $projectid
				futo-project-init-post-firebase $name $projectid
			;;
			--gitlab)
				namespaceid=$( gitlab namespace list --search=$name | sed -n '1s/id: //p' )
				gitlab project create --name=$name --namespace-id=$namespaceid
				git init
				git remote add origin git@gitlab.com:$name/$name.git
				git add .
				git commit -m "Initial commit"
				git push -u origin master
				url="https://zeit.co/optimista/$name/settings/git-integration?provider=gitlab"
				echo "To finish git integration go to your browser to newly opened link $url and insert $name/$name to repository field" >> /tmp/futo-$name
				google-chrome-stable $url > /dev/null 2>&1
			;;
		esac
		shift
	done
}

### POST-FIREBASE
futo-project-init-post-firebase-setup()
{
	### create firestore app
	name=$1
	projectid=$2
	firebase projects:create --non-interactive -n ${name^} $projectid 

	url=https://console.firebase.google.com/project/$projectid/settings/general/web
	google-chrome-stable $url > /dev/null 2>&1
	echo
	echo "Hey! To continue Firestore Cloud storage integration go to your chrome browser to newly opened link $url and set Google Cloud Platform (GCP) resource location."
	echo
	echo "(Once you are done, hit enter to continue)"
	read

	url=https://console.cloud.google.com/datastore/welcome?project=$projectid
	google-chrome-stable $url > /dev/null 2>&1
	echo "Perfect. Now go to your browser to this newly opened link $url and switch Google's Firestore to Native mode."
	echo 
	echo "(Once you are done, hit enter to continue)"
	read

	expect <(cat <<-EOF
	spawn firebase init firestore --project $projectid;
	expect "? What file should be used for Firestore Rules? (firestore.rules)"
	send "\r";
	expect "? What file should be used for Firestore indexes? (firestore.indexes.json)"
	send "\r";
	expect eof
	EOF
	)
	
	firebase use $projectid
	createapp=$( firebase apps:create WEB ${name^} | tail -n1 | sed 's/^\s//g' )
	$( echo $createapp ) | sed -n '/firebase\.initializeApp({/,/^$/p' > app/utils/firebase.js
	sed -i -e '/^firebase/i if (!firebase.apps.length) {' -e '/^firebase/,/});/s/^/  /' -e '/^  });/a }' app/utils/firebase.js
	npm install firebase # add condition checking for apps; indentation; end bracket
	sed -i "1i import firebase from 'firebase/app'\n" app/utils/firebase.js # add import
	import-secondary "import 'firebase\/auth'\nimport 'firebase\/firestore'" app/utils/firebase.js # import firestore
	sed -i '$a\\nexport default firebase;' app/utils/firebase.js # export firebase, firestore variables
	sed -i "1i export { default as firebase } from './firebase'" app/utils/index.js

	# enable e-mail authentication
	url=https://console.firebase.google.com/project/$projectid/authentication/providers
	echo "To finish integration with Firebase Authentication, go to your browser to newly opened link $url and enable E-mail/Password authentication." >> /tmp/futo-$name
	google-chrome-stable $url > /dev/null 2>&1

	# server-side service account
	gcloud config set project $projectid
	iamaccount=$( gcloud iam service-accounts list | grep firebase-adminsdk | sed 's/  */ /g' | cut -d ' ' -f 2 )
	gcloud iam service-accounts keys create /tmp/keys --iam-account=$iamaccount
  vercel secret add $projectid-google-app-credentials "$( cat /tmp/keys | base64 -w 0 )"
	echo GOOGLE_APP_CREDENTIALS="$( cat /tmp/keys | base64 -w 0 )" >> .env

	# firestore.rules setup
	sed -i "1i \rules_version = '2';" firestore.rules # update firestore.rules to 2nd version
	sed -i "/match \/{document=\*\*} {/,/^ *}$/d" firestore.rules # remove previous rule
	sed -i "/match/a\    match /posts/{post} {\n      allow read, write: if request.auth.uid != null;\n    }" firestore.rules
	firebase deploy --only firestore:rules
}

futo-project-init-post-firebase()
{
	name=$1; projectid=$2

	### AUTH

	# add Header.js
	npm install @futo-ui/hooks @material-ui/icons
	cp -r $templates/app/core app/core && cp $templates/public/name.png public/$name.png
	cp -r $templates/app/auth app/auth
	sed -i "/<Typography[^>]*>/s/\(<Link[^>]*>\)name/\1$name/" app/core/Header.js
	sed -i "/Avatar/{s/name.png/$name.png/;s/name/$name/}" app/core/Header.js

	# Inject <Header /> into FocusLayout
	import-secondary "import { Header } from 'core'" app/layouts/FocusLayout.js # import Header
	sed -i '/const FocusLayout/s/\(children\)/\1, header/' app/layouts/FocusLayout.js  
	sed -i '/<Container[^>]*>/i\      { header && <Header /> }' app/layouts/FocusLayout.js

	# create signup page
	cp $templates/pages/join.js pages/join.js

	# create login page
	cp $templates/pages/login.js pages/login.js

	### FEED

	# add PageLayout
	cp $templates/app/layouts/PageLayout.js app/layouts/PageLayout.js
	echo "export { default as PageLayout } from './PageLayout'" >> app/layouts/index.js

	# create posts feed
	npm install @futo-ui/utils
	cp -r $templates/app/data app/data
	cp -r $templates/app/posts app/posts

	# add posts
	npm install @material-ui/lab
	cp $templates/pages/posts.js pages/posts.js

	### SERVER-SIDE

	### add server-side rendering (firebase-admin)
	npm install firebase-admin
	cp $templates/vercel.json vercel.json	
	sed -i "s/projectid/$projectid/" vercel.json

	cp $templates/app/utils/server.js app/utils/server.js	
	sed -i "/databaseURL/s/projectid/$projectid/" app/utils/server.js
}
