# 1709A 同城帮项目练习

## 技术栈： Bootstrap + jQuery + Less + baiduTemplate + gulp + Node.js + Express + Mysql + 高德地图

 
## 创建过程
* 新建一个目录 1709a_tcb
* cd 1709a_tcb/
* 在1709_tcb 内执行  git init
* 在仓库内 新建 readme.md 文件，即本文件
* 再新建一个 .gitignore 文件，编辑文件 ,内容写上 node_modules,之后有什么不需要上传的文件，都写在这个文件中
* git add .  把当前目录下，所有未在.gitignore 中配置的文件添加到git中
* git commit -m '注释内容'
* 在github上新建一个远程仓库
* 把本地仓库和远程仓库关联   git remote add origin 仓库地址
* git push -u origin master

* npm init 初始化npm
* npm install --save jquery
* npm install --save bootstrap
* npm install --save-dev gulp 安装 gulp
* 新建gulpfile.js
* 安装gulp 插件
	** del 删除目录
	** gulp-less 编译less
	** gulp-minify-css 压缩css
	** gulp-uglify  压缩 js
	** gulp-imagemin 压缩图片
	** gulp-rename 重命名
	** gulp-concat 文件合并
	** gulp-livereload 浏览器自动刷新



## 目录结构
	/node_modules
	/app-|
		 |- html
		 |- js
		 |- less
		 |- images
	/dist-|
		  |- html
		  |- js
		  |- css
		  |- images


#如何使用
	*把项目克隆下来 git 
	*cd 项目目录
	*npm install
	*npm run bulid
	*npm run watch
