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

##### 代码格式化配置
```
# 安装代码格式化插件（注意：代码格式化规则配置在 .prettierrc.json 文件里面）
$ yarn add --dev --exact prettier
# 解决eslint和prettier冲突问题安装扩展插件
$ yarn add --dev eslint-config-prettier
# 插件安装完成在package.json配置文件里面添加如下配置
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
}
# 手动格式化代码（. 表示格式化全部文件）
$ yarn prettier --write .
```

##### 代码在提交之前自动格式化
```
# 安装插件
$ yarn add --dev husky lint-staged
$ npx husky install
# 自动配置package.json
$ npm set-script prepare "husky install"
$ npx husky add .husky/pre-commit "npx lint-staged"
# 配置完成后在package.json文件里面会自动多出如下配置
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{tsx,ts,js,css}": "prettier --write --ignore-unknown"
  }
}  
```
