# Building an environment with webpack 5.74.0, webpack-cli 4.10.0

Started with the creation of 2 folders: "src" and "dist".

Into dist i put a simple index.html, and into src an index.js (with just a console.log inside) and a fetchJoke.js - a function with the same name inside which is exported and imported by the index.js)

Of course that doesnt work yet. You could handle the im-/exports with requireJS or you put a "type":"module" into your package.json, there are several ways.
But lets webpack deal with the module imports..

---

Installing webpack:

```sh
npm init -y
```

```sh
npm i -D webpack webpack-cli
```

After installing both packages (as a dev dependency: "-D" == "--save-dev") you need to adjust the package.json by adding the build command:

```sh
"scripts": {
"build": "webpack --mode production"
},
```

As shown: Since you dont have a configuration for webpack yet, you need to set the mode here.

Now you can test it:

```sh
npm run build
```

That should create a "main.js" inside your dist folder (with the bundled js code)

- change the script src in the index.html to "./main.js"
- now you can import / export modules in js-files as well as npm-modules

---

Next, create a "webpack.config.js" and put this code block inside:

```sh
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
}
```

- now you can shorten the build command in package.json to just calling webpack (without --mode production) since it is handled in the webpack.config.js
- if you build again, you should have a bundle.js in your dist folder

You can have multiple entry points by simply providing an object like with output:

```sh
entry: {
    bundle: path.resolve(__dirname, 'src/index.js')
  },
```

..and since i name it bundle here, i could change the outputs filename to '[name].js' (which is named after whatever you call your entrypoint)

But: Since webpack only understands js and json files, what about html, css or even scss, svg, etc?

---

For those you can use loaders and plugins..
You can load static assets like images, css files, etc into your javascript and scss files get compiled into normal css.

To test that out i install some packages...

```sh
npm i -D sass style-loader css-loader sass-loader
```

- and create a main.scss file inside of 'src/styles/'
- and bring that right into index.js by importing it

Thats obviously not going to work yet. The loaders are installed, but need to be configured before the next build.

The way you deal with loaders is you add a "module" object. Inside a rules array you can use RegEx to define which files need to be loaded by listing their file-extensions and with "use" you define which loader is going to do that.

```sh
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
```

---

- adding: HtmlWebpackPlugin

```sh
npm i -D html-webpack-plugin
```

- and:
  "src/template.html"

- adding [contenthash]
  which is useful for cashing

---

Setup Webpack Dev-Server
..which is useful for auto-reload & -recompiling

- for that just go to your package.json and add this to the scripts:

```sh
"scripts": {
  "dev": "webpack serve",
  "build": "webpack"
  ...
}
```

- with "npm run dev" you first will be asked if you like to install 'webpack-dev-server' which you confirm
- and when it runs the default port will be 8080

- in webpack.config.js right under output:

```sh
devServer: {
  static: {
    directory: path.resolve(__dirname, 'dist')
  },
  port: 3000,               // overrides the default port
  open: true,               // opens browser automatically
  hot: true,                // hot reload
  compress: true            // gzip compression
  historyApiFallback: true,
},
```

To prevent that with every change in the js-files the bundle.js files get add up, inside of webpack.config.js in the output object just type:

```sh
clean: true
```

---

- adding source maps
  ..which is good for debugging
  For that go right above the "devServer" and put that in:

```sh
devtool: 'source-map'
```

- that should create a bundle[hash].js.map file

---

If you want your code to be backwards compatible with older browsers then i'd suggest using the babel loader

```sh
npm i -D babel-loader @babel/core @babel/preset-env
```

and in webpack.config.js right under the first object in the rules array

```sh
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}
```

---

- for adding svg's:
  - create a folder "assets" inside of src
  - put a svg inside
  - import it into index.js :

```sh
import laughing from './assets/laughing.svg';
```

..and in webpack.config.js right after the babel loader:

```sh
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource'
}
```

and under output:

```sh
assetModuleFilename: '[name][ext]'
```

###### Now build again and everything should be bundled & compiled into your dist folder

---

For further, more detailed informations visit:

"https://webpack.js.org/concepts/"
