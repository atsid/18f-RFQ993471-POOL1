18f-RFQ993471-POOL1 - Patterns
==============

### Building & running locally

You will need to [install Jekyll](http://jekyllrb.com/docs/installation/). You will also need to [install Node.js](http://nodejs.org/download/). Node.js powers the front-end build and dependency management tools [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/).

Once Jekyll and Node.js are installed, ensure you have Grunt and Bower installed globally with:
```
npm install grunt-cli -g
npm install bower -g
```

Then install the project's dependencies with:
```
npm install
bower install
```
---
#### Running the documentation
Build the front-end assets (LESS/CSS/JS) with:
```
grunt build
```
Run the project with Jekyll:
```
jekyll serve
```
This starts Jekyll, which compiles the markdown files into static html files, starts a server for you to view the documentation at, as well as watches for changes and recompiles. 


##### Distribution Builds
After running `grunt build` and `jekyll build`, you will have a `_site` folder that contains the entire static site and resources. 


## License


## Disclaimer

Testing.
