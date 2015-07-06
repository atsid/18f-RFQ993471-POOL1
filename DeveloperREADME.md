This README is for developers wanting to get the project running.

# Getting Started

The app uses [gulp](http://gulpjs.com/) to do some builds and run a static server to host the content. To get started:

1. Install [Node.js](https://nodejs.org/) if you don't already have it
1. Clone the git repo to a user-owned directory where you have permissions
1. Get dev dependencies: `npm install`
1. Run code quality checks: `npm test`

Optional: install gulp so you can execute it directly on the command line: `npm install -g gulp`.
This is optional because `npm test` and `npm serve` will get you running, and they map to a local gulp from node_modules.

# Running the App

You have a couple of options to run the app after the above install completes, depending on your preferred workflow.

Note that you should double-check that you don't have any other servers running that might conflict, such as on port 8000.

## Static Gulp Server

You can run the app right out of the cloned codebase, with `npm start`. This will run a gulp task to serve up the static content at http://localhost:8000/18f-RFQ993471-POOL1.
 
## Live Reload

If you prefer a live-reload environment during development, use `gulp watch`.
This will serve up the static content at http://localhost:8000/18f-RFQ993471-POOL1, *and* watch for file changes to automatically refresh itself.

The only difference between `npm start` and `gulp watch` is so you have a live-reload option if you don't mind a little bit of CPU load.

## Other Servers

If you'd rather use a separate server such as Apache, copy the app folder into the server directory after install, and everything should load up.
For example, if your Apache DocumentRoot is /Users/USERNAME/apache and you've cloned into a folder called "18f-RFQ993471-POOL1", copy the 18f-RFQ993471-POOL1 directory into there and then navigate to http://localhost/18f-RFQ993471-POOL1.

To make this a little cleaner, you can run `gulp build` to get only what you need in the `dist` folder and copy those contents to your server directly.
This will avoid a lot of unnecessary file copying from places like node_modules.
However, if you want to do dev and have the ability to refresh immediately, you'll want to copy all of the content
(or clone the repo into your server root in the first place). 

# Publishing

## Testing Deployment

If you want to run a local server that replicates the live environment, do:

1. `gulp build`
1. `gulp serve-dist`

This will build and copy content to the output folder ('dist'), and start the server task pointing at that folder instead of root.

## Deploy

To deploy the app to public GitHub Pages, run `gulp deploy`.

This runs the `gulp build` step, then pushes the content of the 'dist' folder to `gh-pages` branch for publication.

# Reference

Gulp task listing:

* `gulp lint` - runs jshint
* `gulp watch` - starts the static server with live-reload
* `gulp serve` - starts the static server
* `gulp serve-dist` - starts the static server, pointed at output directory
* `gulp clean` - deletes the `dist` directory
* `gulp less` - builds .less files into .css
* `gulp minify-js` - minifies and concatenates app *.js files
* `gulp site` - copies static non-built site files to output directory
* `gulp build` - copies only relevant content to `dist` directory
* `gulp ghpages` - pushes contents of `dist` directory to gh-pages branch
* `gulp deploy` - runs clean, build, gh-pages in order
* `gulp undeploy` - removes gh-pages branch content

As noted above, for convenience, `npm test` is mapped to `gulp lint` and `npm start` is mapped to `gulp serve`.
Within these two commands, local gulp is used so you don't need to have it installed globally.

