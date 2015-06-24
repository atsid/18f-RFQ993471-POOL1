This README is for developers wanting to get the project running.

# Getting Started

The app uses a simple Node.js Express static server to host the content. To get it running locally:

1. Install [Node.js](https://nodejs.org/) if you don't already have it
1. Get dev dependencies: `npm install`
1. Run code quality checks: `npm test`
1. Start the app: `npm start`

`npm start` will run a gulp task to serve up the static content at http://localhost:8000.
It will also automatically open your browser to this page, and watch for file changes to automatically refresh.
This behavior is configurable in Gulpfile.js.

# Publishing

To deploy the app to public GitHub Pages, run `gulp deploy`.

If you need to remove the content, run `gulp undeploy` to push a dummy file to the gh-pages site.
(You could delete the branch completely, but then you need to manually recreate it later).