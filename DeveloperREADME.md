This README is for developers wanting to get the project running.

# Getting Started

The app uses [gulp](http://gulpjs.com/) to do some builds and run a static server to host the content. To get started:

1. Install [Node.js](https://nodejs.org/) if you don't already have it
1. Get dev dependencies: `npm install`
1. Run code quality checks: `npm test`

# Running the App

You have a couple of options to run the app after the above install completes, depending on your preferred workflow.

## Live Reload

If you prefer a live-reload environment, use `npm start`.

This will run a gulp task to serve up the static content at http://localhost:8000.
It will also automatically open your browser to this page, and watch for file changes to automatically refresh itself.

If you want the gulp server but not the file watcher, Gulpfile.js has options to turn off the live reload feature.

## Static Server

If you'd rather use a separate server such as Apache, copy the app folder into the server directory after install, and everything should load up.
For example, if your Apache DocumentRoot is /Users/USERNAME/apache and you've cloned into a folder called "18f", copy the 18f directory into there and then navigate to http://localhost/18f.

To make this a little cleaner, you can run `gulp build` to get only what you need in the `dist` folder and copy those contents to your server directly.
This will avoid a lot of unnecessary file copying from places like node_modules.
However, if you want to do dev and have the ability to refresh immediately, you'll want to copy all of the content
(or clone the repo into your server root in the first place). 

# Publishing

To deploy the app to public GitHub Pages, run `gulp deploy`.

This will copy only the content needed for live hosting into a `dist` folder that is ready to drop into a server.
After that, it will push the folder to the `gh-pages` branch, so it gets published.

If you need to remove the content, run `gulp undeploy` to push a dummy file to the gh-pages site.
(You could delete the branch completely, but then you need to manually recreate it later).

# Reference

Gulp task listing:

* `gulp lint` - runs jshint
* `gulp serve` - starts the live-reload server
* `gulp clean` - deletes the `dist` directory
* `gulp build` - copies only relevant content to `dist` directory
* `gulp ghpages` - pushes contents of `dist` directory to gh-pages branch
* `gulp deploy` - runs clean, build, gh-pages in order
* `gulp undeploy` - removes gh-pages branch content

For convenience, `npm test` is mapped to `gulp lint` and `npm start` is mapped to `gulp serve`.
Within these two commands, local gulp is used so you don't need to have it installed globally.

