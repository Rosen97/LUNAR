# LUNAR - 电商平台 (学习使用)


---
## 项目介绍
* 使用原生HTML/CSS/JS/JQ。 基于commonjs模块化标准，前后端完全分离，分层架构。
* 大量使用可高复用工具类设计与封装
* 通用模块设计与独立打包方法
* UI设计思想

---
## 项目模块介绍
* 用户模块 ： 数据安全性处理方案，表单异步/同步，实现用户的登录，登出，个人信息的修改。
* 商品模块 ： jQuery插件模块化改造，独立组件抽离。
* 购物车模块 ： 商品状态随时验证，模块内部方法调用。
* 订单模块 ： 表单回填，实现地址的增删改操作。

---
## 工具使用
* webpack 
* npm nodejs 
* Charles
* Git

---

## 演示

---
![wbvF0.gif](https://github.com/Rosen97/gallery/blob/master/lu1.gif)
![wbvF0.gif](https://github.com/Rosen97/gallery/blob/master/lu2.gif)
![wbvF0.gif](https://github.com/Rosen97/gallery/blob/master/lu3.gif)
![wbvF0.gif](https://github.com/Rosen97/gallery/blob/master/lu4.gif)

## 功能特性

1. 首页
2. 商品详情
3. 商品列表
4. 搜索商品
5. 登录/登出
6. 注册
7. 修改密码
8. 加购物车
9. 删减购物车
10. 购物车数量
11. 购物车提交
12. 地址管理
13. 订单管理
14. 订单提交
15. 订单验证


---

## 项目初始化步骤

* 安装nodejs环境,推荐使用v4.4.7
    下载地址 : https://nodejs.org/download/release/v4.4.7/

* 全局安装webpack v^1.15.0
    命令: npm install -g webpack@^1.15.0

* 全局安装webpack-dev-server v^1.16.5
    命令: npm install -g webpack-dev-server@^1.16.5

* 在项目根目录执行npm初始化
    命令: npm install (--registry=https://registry.npm.taobao.org)

* 开发模式下预览项目
    访问：http://localhost:3000/dist/view/index.html
* 数据加载跨域预览
    使用Charles，本地抓取数据，数据链接（http://test.happymmall.com）
