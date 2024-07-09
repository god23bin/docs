---
# 这是文章的标题
title: XAMPP 使用本地 MySQL
# 这是页面的图标
icon: table
# 这是侧边栏的顺序
# order: 2
# 设置作者
author: god23bin
# 设置写作时间
date: 2020-03-16 09:45:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - MySQL
---

## 安装XAMPP时不要勾选MySQL

​		由于XAMPP安装好后，它自带的MySQL和我以前安装的MySQL有冲突，即使在XAMPP的控制面板里修改了端口也没有效果，导致我用不了MySQL

​		然而我又不想删掉自己以前安装的MySQL，那么干脆不用它的，我们安装的时候就不安装MySQL

>  XAMPP下载：[https://cloud.189.cn/t/qiMzyefqyARr](https://cloud.189.cn/t/qiMzyefqyARr)

![去掉MySQL](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204108.png)

## 配置Apache

安装好后，配置Apache端口，默认80，你不冲突不修改也行，然后修改httpd.conf文件，我直接Ctrl+F，搜索所有的80，然后修改成了8081

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204117.png)

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204124.png)

还有把httpd-ssl.conf文件里的所有443修改成4433

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204130.png)

## 配置MySQL

来到你的XAMPP安装目录的phpMyAdmin下，我的是D:\SoftWare\XAMPP\phpMyAdmin，然后编辑config.inc.php文件

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204135.png)

然后进入D:\SoftWare\XAMPP\phpMyAdmin\libraries，编辑config.default.php文件

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204140.png)

## 运行结果

在XAMPP开启服务

![在XAMPP开启服务](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204143.png)

然后浏览器访问：localhost:8081，显示如下，然后点击phpMyAdmin，成功访问

![点击phpMyAdmin](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204146.png)

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204149.png)

---

我是分割线

---

实际上，我上面没有下拉，下拉就出现下图的错误

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204151.png)

这时候继续去phpMyAdmin下面的config.inc.php配置下，把下面截图所示的User for advanced features 这部分的用户pma修改成root用户

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204154.png)

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204156.png)

刷新页面，就没有报错了，如果还有报错，显示phpMyAdmin高级功能尚未完全设置部分功能未激活的话，那就按它来，点查找原因，之后会新建出来一个名为phpmyadmin的数据库，然后就OK了

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220531204158.png)

参考资料：[https://jingyan.baidu.com/article/48b558e3ede7747f39c09a55.html](https://jingyan.baidu.com/article/48b558e3ede7747f39c09a55.html)