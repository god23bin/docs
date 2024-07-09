---
# 这是文章的标题
title: 云音乐APP简介
# 这是页面的图标
# icon: 
# 这是侧边栏的顺序
order: 3
# 设置作者
author: god23bin
# 设置写作时间
date: 2021-05-20 09:45:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - Android
  - 笔记
---

## 整体项目效果

我已经将该项目上传到Github了，可以直接访问，同时代码提交记录如下

[Github上我的代码提交记录，可直接访问，此链接是Github镜像，网络稳定](https://hub.fastgit.org/god23bin/RoadOfLearning_Android/commits/master?before=fc6684222ae1a5707c3d2c3be5c55384799fd827+35&branch=master)

[项目地址](https://hub.fastgit.org/god23bin/RoadOfLearning_Android/tree/master/MusicDemo)

![](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20210608105801623.png)

![](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20210608105854798.png)

![](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20210608105949753.png)

## 实现的功能

1. 登录

   - 手机号验证

     - 手机号是否为空

     - 手机号合法性
     - 手机号是否已经注册

   - 密码验证

     - 密码是否为空

   - 密码进行加密后查询数据库

2. 注册

   - 手机号验证
     - 手机号是否已经注册
   - 密码验证
     - 密码是否为空
   - 确认密码验证
     - 两次密码输入是否相同

3. 自动登录

   - 如果已经登录，那么直接从欢迎页面进入主页面
   - 如果未登录，那么直接从欢迎页面进入登录页面

4. 修改密码

   - 原密码验证
   - 密码验证
   - 确认密码验证

5. 退出登录

6. 展示歌单

7. 展示歌曲列表

8. 音乐的播放

9. 以Material风格开发，具有侧边栏，在主页面往下滚动时，标题栏会进行隐藏

由于时间问题，还有其他功能没有完成。但是基本思路都是差不多的。

## 使用的技术

1. MaterialDesign
2. Realm - 非关系型数据库
3. RecyclerView
4. AndroidUtilCode - 工具箱，各种验证
5. SharedPreferences
6. CircleImageView - 圆形图片
7. CardView - 卡片
8. Glide - 解析网络图片，图片模糊
9. XPopup - 弹窗
10. PickerView - 城市选择器所需依赖
11. WheelView - 城市选择器所需依赖
12. Gson - 解析Json
13. SwipeRefreshLayout - 实现下拉刷新

## 使用的知识

1. 对于一个项目的构建，可以使用全局的一个Application；可以写一个BaseActivity类，作为Activity的父类，用来描述`所有Activity的共性`。

2. Timer的使用，可以在欢迎页面进行使用，使用其schedule()方法，传入TimerTask实现类，重写run方法，使之等待n秒钟后执行相对应的跳转页面逻辑。

3. 控制View控件的显示与隐藏，可以封装一个方法，使用逻辑判断是否需要显示，这个方法可以写在BaseActivity中。

4. 自定义控件的知识

   - 需要声明控件名字与属性，在values下创建attrs.xml下可以声明控件的名字以及属性。
   - 控件的布局。
   - 控件所对应的类，继承某种布局，可以是FrameLayout，在该类中进行属性与布局，布局与类进行关联的操作。
     - 获取属性
     - 获取布局
     - 布局设置属性
     - 该类addView()绑定布局

5. MaterialDesign风格的主页

   - 最简单就需要DrawerLayout，里面一个CoordinatorLayout或者FrameLayout，一个NavigationView
   - CoordinatorLayout里面就放Toolbar
   - 想让Toolbar在页面向下滚动时下拉，就需要给Toolbar加上`layout_scrollFlags`属性。当下面有RecyclerView时，需要把Toolbar放在AppBarLayout中，解决Toolbar被RecyclerView遮挡的问题，加上AppBarLayout的同时，给RecyclerView加上一个行为`app:layout_behavior="@string/appbar_scrolling_view_behavior"`，总而言之，一句话，AppBarLayout下面是谁，就给谁加行为。

6. 自定义动画的知识

   - 在res下创建anim目录，然后编写动画的xml。
   - AnimationUtils加载动画。
   - 调用安卓为View提供的startAnimation方法，让某个View执行动画。

7. Realm的使用

   - 使用之前需要开启事务，然后执行CRUD，最后关闭事务。

8. 多次封装，可以分为三层，类似MVC，底层DAO，中层Service，上层Controller；底层封装Realm的操作，向上提供操作方法，比如查询用户，插入用户数据等等。然后中层封装业务逻辑，比如登录方法，该方法先验证数据，然后调用Realm提供的方法。最后上层直接调用中层提供的方法。

9. SharedPreferences的使用

   - 先通过上下文使用 getSharedPreferences() 获取到 SharedPreferences对象 
   - 调用 edit() 方法获取 SharedPreferences.Editor，SharedPreferences 通过该接口对其内容进行更新
   - 调用相对应的put()方法更新键值对

   - 调用 SharedPreferences.Editor 的 commit() 方法将更新提交到 SharedPreferences 中

10. MediaPlayer的使用

    - 需要先准备MediaPlayer对象，直接new出来
    - 使用setDataSource()方法指定要播放的资源文件。并且在调用start()方法之前需要调用prepare()或prepareAsync()。
    - MediaPlayer是可以直接播放网络音频的。只需要在setDataSource()中传入相应的uri即可
    - player.setOnPreparedListener()监听
    - 在监听方法中使用player.start()播放音乐

