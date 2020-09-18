# Custom MVC application

## Prerequisites

* `Code/Text editor`
* `Blaise >= 5.6.x`
* `NodeJS >= v12.x` ([Download latest LTS](https://nodejs.org/en/))
* `NPM >= v6.x` (installed alongside NodeJS, but updated more frequently)
* `@angular/cli >= v9.x` (*optional*, allows for usage of angular ng commands) 
* `typescript >= v3.7.x` (*optional*)
* `rimraf >= 3.x` (*optional*)
* A code/text editor. Preferably one that supports syntax highlighting for Typescript.<br>Good options are [Visual Studio Code](https://code.visualstudio.com/), [Webstorm](https://www.jetbrains.com/webstorm/), [SublimeText](https://www.sublimetext.com/) and [Atom](https://atom.io/).
* A basic understanding of
	* [HTML5](https://developer.mozilla.org/nl/docs/Web/Guide/HTML/HTML5), [CSS3](https://developer.mozilla.org/nl/docs/Web/CSS/CSS3) and [Sass](https://sass-lang.com/)
	* [Typescript](https://www.typescriptlang.org/) and/or [JavaScript ES6](https://developer.mozilla.org/nl/docs/Web/JavaScript) (they are very similar).
	* [Angular](https://angular.io/). Follow [this tutorial](https://angular.io/tutorial) to get an introduction which covers the fundamentals of Angular.

You can check your current NodeJS and NPM versions by opening a terminal and running the following commands:

    node -v
    npm -v

To update NodeJS, [download](https://nodejs.org/en/) the latest version from the NodeJS [website](https://nodejs.org/en/).<br>To update your NPM version run:

    npm install npm@latest -g

If you have globally installed [rimraf](https://www.npmjs.com/package/rimraf), you can check the current version using:

    npm view rimraf version

To update rimraf, run:

    npm update rimraf

## Setting up your custom application

### Initial setup

Before you can run your own custom application for the first time, you will need to install its dependencies.<br> Open a terminal (preferably as **administrator**) and run the following command in the root folder of your application:

    npm install

### After installing a new release or upgrading to a new version of Blaise

Make sure your package.json file is up to date. You can find the latest version of this file in the updated samples folder. Open a terminal (preferably as **administrator**), navigate to the root folder of your application and run the following commands:

    npm run clean-modules
    npm install

The first command will remove all installed dependencies. The second command will reinstall them using the version specified by Blaise in the package.json and, more importantly, this will grab the latest Blaise core package from the release and reinstall it into your custom application. Remember to **always** run these commands after you download a new Blaise release or upgrade to a new version of Blaise.

If not everything seems to be installed correctly, you'll need to remove and reinstall every dependency from scratch using the above commands.

## Provided by Blaise

* Samples: can usually be found under %Documents%\Blaise5\Samples\API\DataEntry\MVC
* Technical documentation 
    * Current release: http://help.blaise.com/angular
    * Previous releases: http://help.blaise.com/angular/[version] e.g. 5.6.5

## Building your custom application

The sample included with your Blaise release contains a fully functioning [_Webpack_](https://webpack.js.org/) configuration out of the box. We will use this to build and run the application.

Start up a terminal (preferably as administrator) and navigate to the root folder of your application. Here, you can perform the following actions:

* Build with debugging capabilities: `npm run build:dev`
* Build for production purposes: `npm run build:prod`
* Build both: `npm run build`

## Frequently asked questions

**I tried to update my custom application to a new Blaise release, but nothing happens?**

* Make sure you've updated the `package.json` file your custom application to the latest version as found in the samples.
* Make sure the `blaise-core` entry in your `package.json` file points to the Blaise package in the installation folder.<br>In that file, you'll find a line that looks like this: `"@blaise-core": "file:C:\\Blaise\\Bin\\blaise-core.tgz",`.<br>The part after `file:` should point to the location of the newly installed Blaise package.

**I tried to update my custom application to a new Blaise release and it no longer builds**

* Make sure you've updated the `package.json` file your custom application to the latest version as found in the samples.
* Check out the documentation for any breaking changes.

<br><hr><center>Copyright (c) 2018 Statistics Netherlands</center>
