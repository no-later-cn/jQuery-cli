# jquery 官网

官网为了对爬虫友好，不合适做单页面，也不大适合用 react，vue 这样的框架。

本脚手架已经支持使用 ES6，sass、，模块化，热加载，eslint 等功能

## Build Setup

```bash
# 安装依赖
npm install

# 开发的时候在本地启localhost:8866，并开始热加载
npm run dev

# production的发布时打包
npm run build

# 本地启动http服务查看dist

npm server
```

## 目录结构

```
./
├── .babelrc                          // babel的配置文件
├── .eslintignore                     // eslint的配置文件
├── .eslintrc.js                      //eslint 语法规则
├── .gitignore
├── README.md
├── build
│   ├── webpack.base.js
│   ├── webpack.dev.js            // 开发环境的webpack配置文件
│   └── webpack.prod.js           // 线上环境的webpack配置文件
├── package.json
├── postcss.config.js
├── src                                     // src 文件夹
│   ├── components
│   │   ├── footer.html
│   │   └── header.html
│   ├── images
│   │   └── logo.svg
│   ├── pages                               // 页面文件夹
│   │   └── home
│   │       ├── index.html
│   │       ├── index.js
│   │       └── index.scss
│   ├── style
│   │   ├── common
│   │   │   ├── mixins.scss
│   │   │   ├── reset.scss
│   │   │   └── var.scss
│   ├── page.config.js                   // 页面的配置文件
│   └── utils
└── yarn.lock
```

## 开发流程

如果增加新页面，只需两步，不需要改 webpack 等配置文件

1. 在 pages 中新增一个文件夹
2. 在 page.config.js 中添加这个页面的信息即可

比如

```
  {
    name: 'home',
    html: 'home/index.html',
    jsEntry: 'home/index.js'
  }
```
