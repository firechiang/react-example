##### 使用create-react-app插件创建React项目（因为我们要typescript项目所以加了--template typescript，不加默认就是javascript项目
```
# 项目名称是 react-example（注意：npx是指直接使用npm里面的包，如果没有会先自动安装）
$ npx create-react-app react-example --template typescript
```

##### 安装启动
```
# 安装依赖
$ yarn install
# 启动
$ yarn start
```

##### 全局安装ts-node，用于直接跑ts代码
```
$ npm install -g typescript
$ npm install -g ts-node

# 执行某个文件（文件路径可以使用相对路径）
$ ts-node "文件路径"
```
