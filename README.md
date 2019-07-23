
Getting Started
=======================

Just clone the repo and install the necessary node modules:

```shell
$ git clone http://gitlab.gidoor.com/web-app/gidoor-web-app.git
$ cd gidoor-web-app
$ npm install
```
Install Node modules listed in ./package.json (may take a while the first time)

```
npm run wx
```
Compile and launch 微信 project

or

 ```
 npm run app
 ```
Compile and launch App project



Usage
-----

Great, now that introductions have been made here's everything in full detail:


|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application(App,微信) to disk (`~/dist` by default).|
|`dev`.|<del>Same as `npm start`, but enables nodemon for the server as well.|
|`dev:no-debug`|Same as `npm run dev` but disables devtool instrumentation.|
|`app`|Run App project for IOS and Android|
|`wx`|Run 微信 project for 公众号菜单|
|`app:mock`|Run App project for IOS and Android but enable Native App Mock|
|`wx:mock`|Run 微信 project for 公众号菜单 but enable 微信支付 Mock|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|


**NOTE1:** Deploying to a specific environment? Make sure to specify your target `NODE_ENV` so webpack will use the correct configuration.
 For example:
  `NODE_ENV=production npm run compile` will compile your application with `~/build/webpack/_production.js`.

**NOTE2:** Deploying to specific environment Gidoor API Server
 For example:
`env API=http://qa.gidoor.com:3000/ CTX=wx/ npm start`
 api will connection qa.gidoor.com:3000  contextPath /wx/
