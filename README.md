# futo

Vercel Next.js extensive boilerplate generator that integrates Material-UI, Google's Firestore (both client & server configuration & user authentication), creates Gitlab group & repo and provides some basic structuring & templating.

## Generated project...

- fully integrates [Material-UI](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)
- creates [Google's Firebase project](https://firebase.google.com/) & associated Web application
- safely and securely integrates both [client](https://firebase.google.com/docs/firestore/quickstart) and [server](https://firebase.google.com/docs/admin/setup) Google's Firebase Firestore credentials through Vercel secrets
- includes an example of a realtime posts feed with an infinite scrolling and server prefetch [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching)
- includes completely working user authentication through [Google's Firestore](https://firebase.google.com)
- makes an initial commit to your [Gitlab](https://gitlab.com) account
- includes a [theme](https://test-omega-mocha.vercel.app/theme.js) page where you can see a preview of UI items and their styling

## Demo

- Is right [here](https://test-omega-mocha.vercel.app/)
- [/login](https://test-omega-mocha.vercel.app/login)
- [/join](https://test-omega-mocha.vercel.app/join)
- [/posts](https://test-omega-mocha.vercel.app/posts)
- [/theme](https://test-omega-mocha.vercel.app/theme)

## Prerequisites

I suspect you have these: `expect, git, npm, sed, wget, vercel`  

I suspect you might need these: `gcloud, gitlab, firebase`  

Also, I used `google-chrome-stable` as my browser to open links for configuration, but feel free to substitute all occurrences of `google-chrome-stable` with your preferred browser

### GCloud CLI Installation

Follow instructions on https://cloud.google.com/sdk/install and then log in using `gcloud auth login` (more on login [here](https://cloud.google.com/sdk/gcloud/reference/auth/login)).

### Gitlab CLI Installation

This should be enough to install it: `pip install python-gitlab`.  
But in case follow instructions [here](https://python-gitlab.readthedocs.io/en/stable/install.html)  

After that create a Gitlab personal access token here: https://gitlab.com/profile/personal_access_tokens (more [here](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html))  

Create `~/.python-gitlab.cfg` with these contents:

```
[global]
default = main
ssl_verify = true
timeout = 5

[main]
url = https://gitlab.com
private_token = your_gitlab_personal_access_token_you_just_generated
```

And that should be it.  

More on configuring Gitlab CLI [here](https://python-gitlab.readthedocs.io/en/stable/cli.html#configuration).

### Firebase CLI Installation

This should be enough to install: `npm install -g firebase-tools`\
(More on installation [here](https://firebase.google.com/docs/cli#windows-npm))\
\
After installation, log in using `firebase login` and that should be it.\
(More on login [here](https://firebase.google.com/docs/cli#sign-in-and-test-cli)).

### Path

Be sure to include the script in your `~/.profile` (or `~/.bash_profile` | `~/.bashrc`).\
I did it like this in my `~/.profile`:

```
for d in ~/.bin/*/bin; do export PATH="$PATH:$d"; done
```

And I did put the script into `~/.bin

## Usage

This is how you generate a complete new project. If you don't wish to create integrate Google's Firebase or to create a Gitlab group and repository, feel free to leave the options.

```
futo project init myproject --firebase --gitlab
```

And this is how you remove it

```
futo project remove myproject
```

Script also includes functionality to generate a boilerplate for react npm package using [react-npm-boilerplate](https://github.com/optimista/react-npm-boilerplate).

```
futo package init mypackage
```

```
futo package remove mypackage
````

In all cases, you need to be in parent directory of your package / project. So if your package / project is in directory `/home/me/myproject`, you have to be in `/home/me/` when running the scripts.

## Connect

<a href="https://www.buymeacoffee.com/optimista" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
