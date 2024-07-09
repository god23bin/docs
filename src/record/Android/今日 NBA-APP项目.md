---
# 这是文章的标题
title: 今日 NBA-APP 项目
# 这是页面的图标
# icon: 
# 这是侧边栏的顺序
order: 5
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

# 今日 NBA-APP项目

## 整体项目效果

![首页](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220316111644.png)

![赛程](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220316111648.png)

![社区](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220316111652.png)

![我的-NBA中心](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220316111656.png)

![我的-登录](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220316111659.png)

## 项目分析

想做一个类似腾讯体育那样的APP，有首页，有赛程，有社区，有我的，但是内容就只限NBA

首页，赛程，社区，我的，这4个部分，就可以使用4个Fragment来实现

### 关于首页

首页就显示新闻，可以浏览新闻，然后有下面几点

1. 新闻的数据通过别人提供的接口来获取
2. 使用ListView来实现新闻列表

### 关于赛程

赛程就显示NBA赛程，由于没有相关接口，此处没法实现

### 关于社区

这里就简单使用视频来实现，进入社区页面，显示视频列表，可以观看视频

1. 使用视频播放框架（JiaoZiVideoPlayer）实现该功能
2. 使用ListView实现视频列表
3. 视频数据需要通过别人提供的接口来获取

### 关于我的

进入该页面后显示30支NBA球队，还有登录页面，这两个子页面，通过左右滑动进行切换

1. 使用ViewPager实现两个子页面进行滑动切换
2. 使用GridView对30支球队实现网格布局
3. 登录页面就用普通控件实现

## 项目的实现

### 准备工作

1. 静态资源，就各种图片

2. 分析接口返回的json数据

3. 引入相关依赖

```gradle
	implementation 'cn.jzvd:jiaozivideoplayer:7.5.0'
    implementation 'com.google.code.gson:gson:2.6'
    implementation 'com.squareup.picasso:picasso:2.5.2'
```

4. 开启允许网络请求

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bin23.nbatoday">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/app_icon_new"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/app_icon_new"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        ...
    </application>

</manifest>
```



### 开始敲代码

#### 基本布局

顶部 top_layout.xml

> 1. 线性布局，引入我们的顶部背景图
> 2. 直接使用一个TextView显示整个APP的名字，今日NBA

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="50dp"
    android:background="@mipmap/title_bar"
    android:orientation="vertical"
    android:gravity="center"
    >

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="今日 NBA"
        android:textColor="#ffffff"
        android:textSize="30sp"
        android:textStyle="bold"
        />
</LinearLayout>
```

底部 bottom_layout.xml

> 1. 线性布局，引入我们的底部背景图，设置为水平的方向上的线性布局
> 2. 因为底部有4个图标可以点击，也就是首页，赛程，社区，我的，所以这里使用4个线性布局
> 3. 这4个线性布局基本一样，里面就一个ImageButton和一个TextView
>    - ImageButton用来显示图标
>    - TextView用来显示图标下面的文字（即首页，赛程，社区，我的）

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="85dp"
    android:background="@mipmap/bottom_bar"
    >

    <LinearLayout
        android:id="@+id/id_tab_home"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical">

        <ImageButton
            android:id="@+id/id_tab_home_img"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00000000"
            android:clickable="false"
            android:src="@drawable/tab_home_pressed"
            />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="首页"
            android:textColor="#000" />

    </LinearLayout>

    <LinearLayout
        android:id="@+id/id_tab_game"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical">

        <ImageButton
            android:id="@+id/id_tab_game_img"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00000000"
            android:clickable="false"
            android:src="@drawable/tab_game_normal" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="赛程"
            android:textColor="#000" />

    </LinearLayout>

    <LinearLayout
        android:id="@+id/id_tab_community"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical">

        <ImageButton
            android:id="@+id/id_tab_community_img"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00000000"
            android:clickable="false"
            android:src="@drawable/tab_community_normal" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="社区"
            android:textColor="#000" />

    </LinearLayout>


    <LinearLayout
        android:id="@+id/id_tab_myzone"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical">

        <ImageButton
            android:id="@+id/id_tab_myzone_img"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00000000"
            android:clickable="false"
            android:src="@drawable/tab_myzone_normal" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="我的"
            android:textColor="#000" />

    </LinearLayout>



</LinearLayout>
```

然后 activity_main.xml

> 1. 使用include标签把上面写的**顶部布局和底部布局**包含进来
> 2. 中间使用FrameLayout，为碎片进行替换而做准备，其id为id_container

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity"
    >

    <include layout="@layout/top_layout"/>

    <FrameLayout
        android:id="@+id/id_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        >

    </FrameLayout>


    <include layout="@layout/bottom_layout"/>



</LinearLayout>
```

目前效果

![目前效果-布局效果](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/image-20201206174230943.png)

#### 写4个Fragment的相关布局

直接新建4个布局，我把这4个布局命名为tab_xxx_content.xml，方便我们找到它们

现在，一开始这4个碎片直接最简单的代码，就布局里直接写TextView来显示下当前是哪个页面就OK的

但是在这里，我就完整地写出来

##### tab_home_content.xml

> 1. 首页，相对布局，当然，这里你不适用相对布局也可以，无所谓，然后放一个ListView，作为显示新闻的列表
>
> 2. 该ListView的id为home_news_infolist_lv
>
> 3. android:divider="@color/dividerColor" 自己在value下面的colors.xml里定义下分割线颜色，然后这里进行引用
>
>    colors.xml
>
>    ```xml
>    <?xml version="1.0" encoding="utf-8"?>
>    <resources>
>        <color name="colorPrimary">#6200EE</color>
>        <color name="colorPrimaryDark">#3700B3</color>
>        <color name="colorAccent">#03DAC5</color>
>        <color name="dividerColor">#C5C5C5</color>
>    </resources>
>    ```
>
>    

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:padding="20dp"
    >

    <ListView
        android:id="@+id/home_news_infolist_lv"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:divider="@color/dividerColor"
        android:dividerHeight="1dp">


    </ListView>


</RelativeLayout>
```

写好这个ListView后，还要写一个新闻列表的item布局

那就新建一个布局文件**tab_home_content_infolist_lv.xml**

tab_home_content_infolist_lv.xml

> 1. 使用相对布局，高度wrap_content，方向水平，搞点内边距padding
> 2. 第一个ImageView作为新闻的封面图片
> 3. 三个TextView分别作为新闻标题，作者以及发布的时间
> 4. 最后一个ImageView设置一个小箭头，单纯为了好看

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:padding="20dp"
    >

    <ImageView
        android:id="@+id/h_iv_img"
        android:layout_width="134dp"
        android:layout_height="86dp"
        android:layout_marginEnd="10dp"
        android:layout_marginRight="10dp"
        android:scaleType="fitXY"
        android:src="@drawable/news0" />

    <TextView
        android:id="@+id/h_tv_news_title"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="3dp"
        android:layout_toRightOf="@+id/h_iv_img"
        android:maxLines="2"
        android:text="新闻标题"
        android:textColor="#000"
        android:textSize="18sp"
        android:textStyle="bold"
        android:layout_marginLeft="12dp"
        />

    <TextView
        android:id="@+id/h_tv_author"
        android:layout_width="match_parent"
        android:layout_height="15dp"
        android:layout_toRightOf="@+id/h_iv_img"
        android:maxLines="2"
        android:text="作者"
        android:layout_above="@+id/h_tv_time"
        android:layout_marginLeft="12dp"
        android:textColor="#666"
        android:textSize="10sp"
        />

    <TextView
        android:id="@+id/h_tv_time"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignBottom="@+id/h_iv_img"
        android:layout_toRightOf="@+id/h_iv_img"
        android:text="2020-11-30"
        android:textSize="12dp"
        android:layout_alignLeft="@+id/h_tv_author"
        />


    <ImageView
        android:id="@+id/item_info_tv_next"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/expand"
        android:layout_alignParentRight="true"
        android:layout_centerVertical="true"
        />


</RelativeLayout>
```

![新闻ListView的item布局](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220316111709.png)

这样，新闻列表的item布局也OK了

##### tab_game_content.xml

> 没法实现，就最简单的了，直接像上面说的，使用TextView显示

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <TextView
        android:text="这是赛程"
        android:textSize="30sp"
        android:gravity="center"
        android:textStyle="bold"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

##### tab_community_content.xml

> 1. 社区，这里就显示视频列表，直接使用ListView，和首页基本一样
> 2. 该ListView的id为community_lv

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <ListView
        android:id="@+id/community_lv"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >

    </ListView>

</LinearLayout>
```

然后开始写ListView里面的视频item布局

> 这里就使用饺子视频播放框架
>
> 其Github地址：[https://github.com/lipangit/JiaoZiVideoPlayer](https://github.com/lipangit/JiaoZiVideoPlayer)

引入依赖

新建布局文件**tab_community_content_item_lv.xml**作为视频item布局

tab_community_content_item_lv.xml

> 1. 直接使用JzvdStd标签，就出现视频播放器，包含标题，视频缩略图
> 2. 写一些显示视频相关信息的东西，比如作者，收藏量，播放量，都用TextView来写

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <cn.jzvd.JzvdStd
        android:id="@+id/item_community_jzvd"
        android:layout_width="match_parent"
        android:layout_height="220dp"
        >

    </cn.jzvd.JzvdStd>

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="10dp"
        >

        <TextView
            android:id="@+id/item_community_tv_name"
            android:layout_width="210dp"
            android:layout_height="34dp"
            android:layout_marginLeft="7dp"
            android:padding="8dp"
            android:text="Anyone"
            android:textSize="12dp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/item_community_tv_favorite"
            android:layout_width="70dp"
            android:layout_height="wrap_content"
            android:layout_alignParentRight="true"
            android:drawableLeft="@mipmap/icon_favorite"
            android:text="1234"
            android:textSize="12dp"
            android:layout_centerVertical="true"
            />
        <TextView
            android:id="@+id/item_community_tv_play"
            android:layout_width="70dp"
            android:layout_height="wrap_content"
            android:drawableLeft="@mipmap/icon_play"
            android:layout_toLeftOf="@+id/item_community_tv_favorite"
            android:drawablePadding="5dp"
            android:layout_marginRight="10dp"
            android:text="12345"
            android:textSize="12dp"
            android:layout_centerVertical="true"
            />


    </RelativeLayout>

</LinearLayout>
```

![视频列表的item布局](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220316111716.png)

这样视频列表的item布局也就OK了

##### tab_myzone_content.xml

> 1. 就使用ViewPager，实现两个页面的滑动切换，其id为myzone_pg
> 2. PagerTitleStrip是标题滑动的其中一种

```xml
<LinearLayout  xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <androidx.viewpager.widget.ViewPager
        android:id="@+id/myzone_pg"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <androidx.viewpager.widget.PagerTitleStrip
            android:id="@+id/pagertitle"
            android:layout_width="wrap_content"
            android:layout_height="40dp"
            android:layout_gravity="top"
            android:textColor="#000000"
            android:paddingBottom="10dp"
            android:paddingHorizontal="15dp"
            />
        

    </androidx.viewpager.widget.ViewPager>

</LinearLayout >
```

然后那两个能通过ViewPager而进行滑动切换的页面布局如下

zone_view_1.xml

> 1. 网格布局，通过这个GridView实现，其id为zone_grid_list_gv，类似ListView
> 2. android:numColumns="4" 设置布局成为4列的网格

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center">

    <GridView
        android:id="@+id/zone_grid_list_gv"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:numColumns="4"
        >

    </GridView>


</LinearLayout>
```

然后还要写GridView里面的item的布局

zone_view_gridlist_item.xml

> 这里我使用相对布局

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <ImageView
        android:id="@+id/zone_list_item_iv"
        android:layout_width="match_parent"
        android:layout_height="140dp"
        android:src="@mipmap/lalakers"
        android:scaleType="centerCrop"
        />

    <TextView
        android:id="@+id/zone_list_item_name_tv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="湖人"
        android:layout_below="@+id/zone_list_item_iv"
        android:textSize="25dp"
        android:textStyle="bold"
        android:layout_centerHorizontal="true"
        />
    <TextView
        android:id="@+id/zone_list_item_des_tv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="8620000粉丝"
        android:layout_below="@+id/zone_list_item_name_tv"
        android:textSize="15dp"
        android:layout_centerHorizontal="true"
        />

</RelativeLayout>
```

![网格布局的item布局](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220316111722.png)

这样，也OK了

zone_view_2.xml

> 登录页面，没什么好说的，也是常用控件直接写

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center">

    <ImageView
        android:id="@+id/loginbutton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="120dp"
        android:src="@drawable/user_icon"/>

    <RelativeLayout
        android:id="@+id/input"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/loginbutton"
        android:layout_marginLeft="28dp"
        android:layout_marginRight="28dp"
        android:background="#fff"
        android:orientation="vertical">
        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="108dp"
            android:background="#fff"
            android:gravity="center_vertical"
            android:orientation="horizontal" >

            <ImageView
                android:id="@+id/login_user_icon_iv"
                android:layout_width="44dp"
                android:layout_height="44dp"
                android:src="@drawable/user_icon"
                android:scaleType="fitXY"
                />

            <EditText
                android:id="@+id/username_et"
                android:layout_width="match_parent"
                android:layout_height="44dp"
                android:layout_weight="1"
                android:background="@null"
                android:imeOptions="actionDone"
                android:textSize="16sp"
                android:ems="10"
                android:hint="请输入用户名"
                android:layout_toRightOf="@+id/login_user_icon_iv"
                android:layout_marginLeft="20dp"
                >
            </EditText>

            <ImageView
                android:id="@+id/login_pass_icon_iv"
                android:layout_width="44dp"
                android:layout_height="44dp"
                android:src="@drawable/password_icon"
                android:scaleType="fitXY"
                android:layout_below="@+id/login_user_icon_iv"
                android:layout_marginTop="20dp"
                />
            <EditText
                android:id="@+id/pass"
                android:layout_width="match_parent"
                android:layout_height="44.0dip"
                android:background="#00ffffff"
                android:gravity="center_vertical"
                android:layout_below="@+id/username_et"
                android:layout_toRightOf="@+id/login_pass_icon_iv"
                android:layout_marginLeft="20dp"
                android:layout_marginTop="20dp"
                android:inputType="textPassword"
                android:maxLength="16"
                android:maxLines="1"
                android:textColor="#ff1d1d1d"
                android:textColorHint="#ff666666"
                android:textSize="16.0sp"
                android:hint="请输入密码"
                />

        </RelativeLayout>


    </RelativeLayout>

    <Button
        android:id="@+id/loginBtn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/input"
        android:layout_marginTop="10dp"
        android:background="#3aadfd"
        android:text="登  录"
        android:textColor="#ffffff"
        android:textSize="18dp"
        android:layout_centerHorizontal="true"
        android:layout_marginLeft="28dp"
        android:layout_marginRight="28dp"
        />

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginLeft="28dp"
        android:layout_marginRight="28dp"
        android:layout_below="@+id/loginBtn"
        >
        <TextView
            android:id="@+id/login_to_register_tv"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="注册"
            android:textStyle="bold"
            android:textSize="16dp"
            android:layout_marginTop="20dp"
            />

        <TextView
            android:id="@+id/login_forget_tv"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="忘记密码"
            android:textStyle="bold"
            android:textSize="16dp"
            android:layout_alignParentRight="true"
            android:layout_marginTop="20dp"
            />
    </RelativeLayout>

    <TextView
        android:text=""
        android:layout_width="wrap_content"
        android:layout_below="@+id/loginBtn"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:id="@+id/promptText"
        android:textColor="#ff0000"
        android:layout_marginTop="10dp"
        android:textSize="18sp"/>

</RelativeLayout>
```

#### MainActivity 实现碎片之间的切换

1. 找到4个布局，4个ImageButton，4个Fragment，作为 MainActivity 的属性

> ```java
> private LinearLayout tabHome;
> private LinearLayout tabGame;
> private LinearLayout tabCommunity;
> private LinearLayout tabMyZone;
> 
> private ImageButton ibHome;
> private ImageButton ibGame;
> private ImageButton ibCommunity;
> private ImageButton ibMyZone;
> 
> private Fragment homeFragment;
> private Fragment gameFragment;
> private Fragment communityFragment;
> private Fragment myZoneFragment;
> ```

2. 实现View.OnClickListener类

> implements View.OnClickListener

3. 找到LinearLayou还有ImageButton以及布局点击事件，进行初始化

> ```java
> 	private void initView() {
>         tabHome = findViewById(R.id.id_tab_home);
>         tabGame = findViewById(R.id.id_tab_game);
>         tabCommunity  = findViewById(R.id.id_tab_community);
>         tabMyZone  = findViewById(R.id.id_tab_myzone);
> 
>         ibHome = findViewById(R.id.id_tab_home_img);
>         ibGame = findViewById(R.id.id_tab_game_img);
>         ibCommunity  = findViewById(R.id.id_tab_community_img);
>         ibMyZone  = findViewById(R.id.id_tab_myzone_img);
> 
>     }
> 
>     private void initEvent() {
>         tabHome.setOnClickListener(this);
>         tabGame.setOnClickListener(this);
>         tabCommunity.setOnClickListener(this);
>         tabMyZone.setOnClickListener(this);
>     }
> ```

4. 动态添加Fragment

> 动态添加Fragment主要分为4步
>
> 1. 获取到FragmentManager，在V4包中通过getSupportFragmentManager，在系统中原生的Fragment是通过getFragmentManager获得的。
> 2. 开启一个事务，通过调用beginTransaction方法开启。
> 3. 向容器内加入Fragment，一般使用add或者replace方法实现，需要传入容器的id和Fragment的实例。
> 4. 提交事务，调用commit方法提交。
>
> 这里写了一个setSelect()方法，该方法完成动态添加Fragment

5. 最后重写OnClick()方法

> 先设置点击前的图片，然后根据点击执行setSelect()方法，最后设置点击后的图片

以上，MainActivity基本完成，代码如下

MainActivity

```java
package com.bin23.nbatoday;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;


import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.LinearLayout;

import com.bin23.nbatoday.fragment.CommunityFragment;
import com.bin23.nbatoday.fragment.GameFragment;
//import com.bin23.nbatoday.fragment.HomeFragment;
import com.bin23.nbatoday.fragment.HomeNewsFragment;
import com.bin23.nbatoday.fragment.MyZoneFragment;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    private LinearLayout tabHome;
    private LinearLayout tabGame;
    private LinearLayout tabCommunity;
    private LinearLayout tabMyZone;

    private ImageButton ibHome;
    private ImageButton ibGame;
    private ImageButton ibCommunity;
    private ImageButton ibMyZone;

    private Fragment homeFragment;
    private Fragment gameFragment;
    private Fragment communityFragment;
    private Fragment myZoneFragment;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();//初始化控件
        initEvent();//初始化事件
        setSelect(0);//对事物方法调用显示第一个界面
    }

    private void initView() {
        tabHome = findViewById(R.id.id_tab_home);
        tabGame = findViewById(R.id.id_tab_game);
        tabCommunity  = findViewById(R.id.id_tab_community);
        tabMyZone  = findViewById(R.id.id_tab_myzone);

        ibHome = findViewById(R.id.id_tab_home_img);
        ibGame = findViewById(R.id.id_tab_game_img);
        ibCommunity  = findViewById(R.id.id_tab_community_img);
        ibMyZone  = findViewById(R.id.id_tab_myzone_img);

    }

    private void initEvent() {
        tabHome.setOnClickListener(this);
        tabGame.setOnClickListener(this);
        tabCommunity.setOnClickListener(this);
        tabMyZone.setOnClickListener(this);
    }


    /**
     * 选择碎片的方法
     * @param i
     */
    private void setSelect(int i) {

        // FragmentManager fm = getFragmentManager();  //先拿到管理器
        FragmentManager fm = getSupportFragmentManager();  //使用V4包下的Fragment的事务管理器
        FragmentTransaction transaction = fm.beginTransaction();  //开启一个事务transaction

        //一开始隐藏所有Fragment
        hideFragment(transaction); //自定义一个函数先对所有事务进行隐藏
        //将图片切换为亮色
        //切换界面
        switch (i) {  //切换图片为亮色
            case 0: {
                if (homeFragment == null) {
                    //为空则初始化他
                    homeFragment = new HomeNewsFragment();
                    transaction.add(R.id.id_container, homeFragment);  //初始化Fragment
                } else {
                    //否则对其进行显示
                    transaction.show(homeFragment);
                }
                ibHome.setImageResource(R.drawable.tab_home_normal); //切换图片
                break;
            }
            case 1: {
                if (gameFragment == null) {
                    //为空则初始化他
                    gameFragment = new GameFragment();
                    transaction.add(R.id.id_container, gameFragment);  //初始化Fragment
                } else {
                    //否则对其进行显示
                    transaction.show(gameFragment);
                }
                ibGame.setImageResource(R.drawable.tab_game_normal);
                break;
            }
            case 2: {
                if (communityFragment == null) {
                    //为空则初始化他
                    communityFragment = new CommunityFragment();
                    transaction.add(R.id.id_container, communityFragment);  //初始化Fragment
                } else {
                    //否则对其进行显示
                    transaction.show(communityFragment);
                }
                ibCommunity.setImageResource(R.drawable.tab_community_normal);
                break;
            }
            case 3: {
                if (myZoneFragment == null) {
                    //为空则初始化他
                    myZoneFragment = new MyZoneFragment();
                    transaction.add(R.id.id_container, myZoneFragment);  //初始化Fragment
                } else {
                    //否则对其进行显示
                    transaction.show(myZoneFragment);
                }
                ibMyZone.setImageResource(R.drawable.tab_myzone_normal);
                break;
            }

        }//switch

        transaction.commit();//提交事务
    }//setSelect()


    //隐藏事务方法
    private void hideFragment(FragmentTransaction transaction) {  //对不为空的Fragment隐藏
        if (homeFragment != null) {
            transaction.hide(homeFragment);
        }
        if (gameFragment != null) {
            transaction.hide(gameFragment);
        }
        if (communityFragment != null) {
            transaction.hide(communityFragment);
        }
        if (myZoneFragment != null) {
            transaction.hide(myZoneFragment);
        }
    }

    //图片设置为暗色
    private void resetImg() {
        ibHome.setImageResource(R.drawable.tab_home_normal);
        ibGame.setImageResource(R.drawable.tab_game_normal);
        ibCommunity.setImageResource(R.drawable.tab_community_normal);
        ibMyZone.setImageResource(R.drawable.tab_myzone_normal);
    }

    @Override
    public void onClick(View view) {

        resetImg();//设置暗色
        switch (view.getId()) {
            case R.id.id_tab_home: {
                setSelect(0);
                ibHome.setImageResource(R.drawable.tab_home_pressed);  //将点击的图标设置为亮色
                break;
            }
            case R.id.id_tab_game: {
                setSelect(1);
                ibGame.setImageResource(R.drawable.tab_game_pressed);
                break;
            }
            case R.id.id_tab_community: {
                setSelect(2);
                ibCommunity.setImageResource(R.drawable.tab_community_pressed);
                break;
            }
            case R.id.id_tab_myzone: {
                setSelect(3);
                ibMyZone.setImageResource(R.drawable.tab_myzone_pressed);
                break;
            }

        }

    }
}
```

#### 写Fragment

先写好这4个Fragment，基本一模一样，就加载的布局不同而已，这里就以HomeNewsFragment为例，代码如下，剩下的就不贴出来了

HomeNewsFragment

```java
package com.bin23.nbatoday.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.nbatoday.R;

public class HomeNewsFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.tab_home_content, container, false);
    }
}

```

写好4个Fragment，现在来完善它们

##### HomeNewsFragment

首先就HomeNewsFragment

###### 1. 找到布局中的控件，直接作为该Fragment的属性，

> ```java
> private ListView homeNewsLv;
> ```

###### 2. 声明接口的地址，同时生成相关实体类

> 调用的接口：[http://v.juhe.cn/toutiao/index?type=tiyu&key=e357dbe7418a4c1768a0c6fed0633f12](http://v.juhe.cn/toutiao/index?type=tiyu&key=e357dbe7418a4c1768a0c6fed0633f12)
>
> ```java
> private String url = "http://v.juhe.cn/toutiao/index?type=tiyu&key=e357dbe7418a4c1768a0c6fed0633f12";
> ```

该接口返回的json如下（由于json太长，省略掉了一些不必要的）

```json
{
    "reason": "成功的返回",
    "result": {
        "stat": "1",
        "data": [
            {
                "uniquekey": "f81342580eae30c277c2d563ac1f88b8",
                "title": "西班牙人必须感谢武磊：球队本赛季预期盈利高达7200万！",
                "date": "2020-12-08 14:52",
                "category": "体育",
                "author_name": "中超球评",
                "url": "https://mini.eastday.com/mobile/201208145223715.html",
                "thumbnail_pic_s": "https://00imgmini.eastday.com/mobile/20201208/2020120814_a4c635cc5b664b9790269b36705ee7bf_7938_mwpm_03200403.jpg",
                "thumbnail_pic_s02": "http://00imgmini.eastday.com/mobile/20201208/2020120814_c744565a8c634fdc9e4277bd1a7ac0b4_0549_mwpm_03200403.jpg",
                "thumbnail_pic_s03": "http://00imgmini.eastday.com/mobile/20201208/2020120814_8c3dd7dac5c24306a5b09f35450455f2_1594_mwpm_03200403.jpg"
            },
            {
                "uniquekey": "3a08b197f483910c1566e4333eaad102",
                "title": "科林斯：我研究了大量比赛录像，想要在防守端更具存在感",
                "date": "2020-12-08 14:52",
                "category": "体育",
                "author_name": "虎扑体育",
                "url": "https://mini.eastday.com/mobile/201208145223032.html",
                "thumbnail_pic_s": "https://08imgmini.eastday.com/mobile/20201208/20201208145223_c6d5d4ff006cc9b29693bc0daf3581c1_1_mwpm_03200403.jpg"
            },
            ............................
        ]
    },
    "error_code": 0
}
```

新建一个NewsEntity类，直接通过Gson Format这个插件，直接转生成我们所需要的实体类

NewsEntity

```java
package com.bin23.nbatoday.entity;

import java.util.List;

public class NewsEntity {

    private String reason;
    private ResultBean result;
    private int error_code;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public ResultBean getResult() {
        return result;
    }

    public void setResult(ResultBean result) {
        this.result = result;
    }

    public int getError_code() {
        return error_code;
    }

    public void setError_code(int error_code) {
        this.error_code = error_code;
    }

    public static class ResultBean {
        private String stat;
        private List<DataBean> data;

        public String getStat() {
            return stat;
        }

        public void setStat(String stat) {
            this.stat = stat;
        }

        public List<DataBean> getData() {
            return data;
        }

        public void setData(List<DataBean> data) {
            this.data = data;
        }

        public static class DataBean {

            private String uniquekey;
            private String title;
            private String date;
            private String category;
            private String author_name;
            private String url;
            private String thumbnail_pic_s;
            private String thumbnail_pic_s02;
            private String thumbnail_pic_s03;

            public String getUniquekey() {
                return uniquekey;
            }

            public void setUniquekey(String uniquekey) {
                this.uniquekey = uniquekey;
            }

            public String getTitle() {
                return title;
            }

            public void setTitle(String title) {
                this.title = title;
            }

            public String getDate() {
                return date;
            }

            public void setDate(String date) {
                this.date = date;
            }

            public String getCategory() {
                return category;
            }

            public void setCategory(String category) {
                this.category = category;
            }

            public String getAuthor_name() {
                return author_name;
            }

            public void setAuthor_name(String author_name) {
                this.author_name = author_name;
            }

            public String getUrl() {
                return url;
            }

            public void setUrl(String url) {
                this.url = url;
            }

            public String getThumbnail_pic_s() {
                return thumbnail_pic_s;
            }

            public void setThumbnail_pic_s(String thumbnail_pic_s) {
                this.thumbnail_pic_s = thumbnail_pic_s;
            }

            public String getThumbnail_pic_s02() {
                return thumbnail_pic_s02;
            }

            public void setThumbnail_pic_s02(String thumbnail_pic_s02) {
                this.thumbnail_pic_s02 = thumbnail_pic_s02;
            }

            public String getThumbnail_pic_s03() {
                return thumbnail_pic_s03;
            }

            public void setThumbnail_pic_s03(String thumbnail_pic_s03) {
                this.thumbnail_pic_s03 = thumbnail_pic_s03;
            }
        }
    }
}

```

通过分析json可知，我们需要的就是ResultBean里面的DataBen

###### 3. 所以，这个DataBean就是我们需要的数据源，把它也作为Fragment的属性

> private List<NewsEntity.ResultBean.DataBean> mDatas;

###### 4. 有了数据源，我们还需要创建适配器，以及为数据源设置适配器

> 下面就是适配器的代码，这里对以下代码进行解释
>
> Context作为适配器的属性，代表当前碎片所在的Activity
>
> 数据源也作为适配器的属性，方便我们写入数据到View中
>
> getBitmap(holder, picURL)操作是为了获取json中的图片，因为json中的图片是一个地址，不能直接设置给ImageView，所以需要进行解析，解析成Bitmap。getBitmap(holder, picURL)中创建一个新线程，解析了图片，通过Handler消息机制返回主线程，之所以需要创建新线程进行解析，是因为Android不推荐直接在主线程中使用网络请求
>
> 写个工具类，写个方法，解析图片地址转为bitmap的形式
>
> ```java
> public class HTTPUtil {
> 
>     /**
>      * 获取网落图片资源
>      * @param path
>      * @return
>      */
>     public static Bitmap getHttpBitmap(String path){
>         URL myFileURL;
>         Bitmap bitmap = null;
>         try{
>             myFileURL = new URL(path);
>             //获得连接
>             HttpURLConnection conn = (HttpURLConnection) myFileURL.openConnection();
> //            //设置超时时间为6000毫秒，conn.setConnectionTiem(0);表示没有时间限制
> //            conn.setConnectTimeout(6000);
> //            //连接设置获得数据流
> //            conn.setDoInput(true);
> //            //不使用缓存
> //            conn.setUseCaches(false);
>             //这句可有可无，没有影响
>             conn.connect();
>             //得到数据流
>             InputStream is = conn.getInputStream();
>             //解析得到图片
>             if (is == null){
>                 throw new RuntimeException("stream is null");
>             }else{
>                 try {
>                     ByteArrayOutputStream baos = new ByteArrayOutputStream();
>                     byte[] buf = new byte[1024];
>                     int hasReadLen = 0;
>                     while ((hasReadLen = is.read(buf)) != -1) {
>                         baos.write(buf, 0, hasReadLen);
>                     }
>                     byte[] data = baos.toByteArray();
>                     bitmap = BitmapFactory.decodeByteArray(data, 0, data.length);
>                 } catch (Exception e) {
>                     e.printStackTrace();
>                 }
> 
>                 is.close();
>             }
>         }catch(Exception e){
>             e.printStackTrace();
>         }
>         return bitmap;
>     }
> }
> ```
>
> 

NewsAdapter

```java
package com.bin23.nbatoday.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;

import com.bin23.nbatoday.R;
import com.bin23.nbatoday.entity.NewsEntity;
import com.bin23.nbatoday.utils.HTTPUtil;

import java.util.ArrayList;
import java.util.List;

public class NewsAdapter extends BaseAdapter {
    private Context context;
    private List<NewsEntity.ResultBean.DataBean> mDatas;

    public NewsAdapter(Context context, List<NewsEntity.ResultBean.DataBean> mDatas) {
        this.context = context;
        this.mDatas = mDatas;
    }

    @Override
    public int getCount() {
        return mDatas.size();
    }

    @Override
    public Object getItem(int position) {
        return mDatas.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder = null;
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.tab_home_content_infolist_lv, parent, false);
            holder = new ViewHolder(convertView);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }

        // 获取指定位置的数据
        NewsEntity.ResultBean.DataBean dataBean = mDatas.get(position);
        String picURL = dataBean.getThumbnail_pic_s();
        String title = dataBean.getTitle();
        String author_name = dataBean.getAuthor_name();
        String date = dataBean.getDate();

        // 解析图片地址，获取图片
        getBitmap(holder, picURL);
//        holder.newsIv.setImageBitmap(bitmap);
        holder.newsTitleTv.setText(title);
        holder.authorTv.setText(author_name);
        holder.timeTv.setText(date);

        return convertView;
    }

    @SuppressLint("HandlerLeak")
    Handler handler = new Handler(){
        @Override
        public void handleMessage(@NonNull Message msg) {
            if (msg.what == 3) {
                List list = (List) msg.obj;
                Bitmap bitmap = (Bitmap) list.get(0);
                ViewHolder holder = (ViewHolder) list.get(1);
                holder.newsIv.setImageBitmap(bitmap);

            }
        }
    };

    private void getBitmap(ViewHolder viewHolder, String picURL) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                Bitmap httpBitmap = HTTPUtil.getHttpBitmap(picURL);
                List list = new ArrayList();
                list.add(httpBitmap);
                list.add(viewHolder);
                Message message = new Message();
                message.what = 3;
                message.obj = list;
                handler.sendMessage(message);
            }
        }).start();
    }

    static class ViewHolder {
        private ImageView newsIv;
        private TextView authorTv;
        private TextView newsTitleTv;
        private TextView timeTv;

        public ViewHolder (View view){
            newsIv = view.findViewById(R.id.h_iv_img);
            newsTitleTv = view.findViewById(R.id.h_tv_news_title);
            authorTv = view.findViewById(R.id.h_tv_author);
            timeTv = view.findViewById(R.id.h_tv_time);
        }
    }
}

```

###### 5. 有了适配器，我们值需设置适配器就OK了

> HomeNewsFragment的onCreateView()方法里面
>
> ```java
>     homeNewsLv = view.findViewById(R.id.home_news_infolist_lv);
> 	// 数据源
>     mDatas = new ArrayList<>();
>     // 创建适配器
>     adapter = new NewsAdapter(view.getContext(), mDatas);
>     // 设置适配器
>     homeNewsLv.setAdapter(adapter);
> ```
> 此时，mDatas还是空的，就需要通过网络请求接口，获取数据，存入mDatas

###### 6. 进行网络请求，获取数据

> 写个工具类，进行请求，解析json，即获取json内容
>
> ```java
> public class HTTPUtil {
>     public static String getJsonConetent(String path){
>         ByteArrayOutputStream baos = new ByteArrayOutputStream();
>         try {
>             URL url = new URL(path);
>             HttpURLConnection conn = (HttpURLConnection) url.openConnection();
>             conn.connect();
>             InputStream is = conn.getInputStream();
>             byte[] buf = new byte[1024];
>             int hasReadLen = 0;
>             while ((hasReadLen = is.read(buf)) != -1) {
>                 baos.write(buf, 0, hasReadLen);
>             }
>         } catch (Exception e) {
>             e.printStackTrace();
>         }
>         return baos.toString();
>     }
> }
> ```
>
> 获取数据
>
> ```java
> 	private void loadData() {
>         // 创建新的线程，完成数据的获取
>         new Thread(new Runnable() {
>             @Override
>             public void run() {
>                 String jsonConetent = HTTPUtil.getJsonConetent(url);
>                 // 子线程不能更新UI，需要通过handler发送数据回到主线程--消息通知机制
>                 Message message = new Message(); // 发送的消息对象
>                 message.what = 2; // 设置消息编号
>                 message.obj = jsonConetent;
>                 handler.sendMessage(message); // 子线程发送回主线程
>             }
>         }).start(); //-----------------------------不要忘了start()
>     }
> ```
>
> 进行网络请求，还是一样，通过子线程进行，用Handler返回到主线程
>
> 然后handler就进行数据的获取，存入mDatas
>
> 记得这个Handler必须声明在loadData()前面，因为loadData()用到了handler
>
> ```java
> 	@SuppressLint("HandlerLeak")
>     Handler handler = new Handler(){
>         @Override
>         public void handleMessage(@NonNull Message msg) {
>             if (msg.what == 2) {
>                 String json = (String) msg.obj;
>                 NewsEntity newsEntity = new Gson().fromJson(json, NewsEntity.class);
>                 NewsEntity.ResultBean resultBean = newsEntity.getResult();
>                 List<NewsEntity.ResultBean.DataBean> itemList = resultBean.getData();
>                 mDatas.addAll(itemList);
>                 adapter.notifyDataSetChanged();
>             }
>         }
>     };
> ```

###### 7. 点击实现跳转到浏览器

> 使用setOnItemClickListener()方法，搞个匿名内部类，重写onItemClick()方法，借助intent进行跳转
>
> ```java
> private void initUI() {
>         homeNewsLv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
>             @Override
>             public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
>                 Intent intent = new Intent();
>                 intent.setAction(Intent.ACTION_VIEW);
>                 intent.setData(Uri.parse(mDatas.get(position).getUrl()));
>                 startActivity(intent);
>             }
>         });
>     }
> ```

###### 8. 最后，HomeNewsFragment代码如下

```java
package com.bin23.nbatoday.fragment;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.nbatoday.R;
import com.bin23.nbatoday.adapter.NewsAdapter;
import com.bin23.nbatoday.entity.NewsEntity;
import com.bin23.nbatoday.utils.HTTPUtil;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class HomeNewsFragment extends Fragment {

    private ListView homeNewsLv;
    private String url = "http://v.juhe.cn/toutiao/index?type=tiyu&key=e357dbe7418a4c1768a0c6fed0633f12";
    private List<NewsEntity.ResultBean.DataBean> mDatas;

    private NewsAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tab_home_content, container, false);

        homeNewsLv = view.findViewById(R.id.home_news_infolist_lv);

        // 数据源
        mDatas = new ArrayList<>();
        // 创建适配器
        adapter = new NewsAdapter(view.getContext(), mDatas);
        // 设置适配器
        homeNewsLv.setAdapter(adapter);

        loadData();
        initUI();
        return view;
    }

    @SuppressLint("HandlerLeak")
    Handler handler = new Handler(){
        @Override
        public void handleMessage(@NonNull Message msg) {
            if (msg.what == 2) {
                String json = (String) msg.obj;
                NewsEntity newsEntity = new Gson().fromJson(json, NewsEntity.class);
                NewsEntity.ResultBean resultBean = newsEntity.getResult();
                List<NewsEntity.ResultBean.DataBean> itemList = resultBean.getData();
                mDatas.addAll(itemList);
                adapter.notifyDataSetChanged();
            }
        }
    };

    private void loadData() {
        // 创建新的线程，完成数据的获取
        new Thread(new Runnable() {
            @Override
            public void run() {
                String jsonConetent = HTTPUtil.getJsonConetent(url);
                // 子线程不能更新UI，需要通过handler发送数据回到主线程--消息通知机制
                Message message = new Message(); // 发送的消息对象
                message.what = 2; // 设置消息编号
                message.obj = jsonConetent;
                handler.sendMessage(message); // 子线程发送回主线程
            }
        }).start(); //-----------------------------不要忘了start()
    }

    private void initUI() {
        homeNewsLv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent();
                intent.setAction(Intent.ACTION_VIEW);
                intent.setData(Uri.parse(mDatas.get(position).getUrl()));
                startActivity(intent);
            }
        });
    }

}

```

##### CommunityFragment

接下来是写CommunityFragment

###### 1. 找到布局中的控件

> ```java
> private ListView communityLv;
> ```

###### 2. 声明接口的地址，同时生成相关实体类

> 调用的接口：[https://api.bilibili.com/x/web-interface/search/all/v2?keyword=nba](https://api.bilibili.com/x/web-interface/search/all/v2?keyword=nba)
>
> ```java
> private String url = "https://api.bilibili.com/x/web-interface/search/all/v2?keyword=nba";
> ```

该接口返回的json如下（由于json太长，省略掉了一些不必要的）

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        .............................................
        "result": [
            {
                "result_type": "activity",
                "data": []
            },
            {
                "result_type": "web_game",
                "data": []
            },
            {
                "result_type": "card",
                "data": []
            },
            {
                "result_type": "media_bangumi",
                "data": []
            },
            {
                "result_type": "media_ft",
                "data": []
            },
            {
                "result_type": "bili_user",
                "data": []
            },
            {
                "result_type": "user",
                "data": []
            },
            {
                "result_type": "star",
                "data": []
            },
            {
                "result_type": "video",
                "data": [
                    {
                        "type": "video",
                        "id": 372285038,
                        "author": "GoldenHoops",
                        "mid": 544291138,
                        "typeid": "163",
                        "typename": "运动",
                        "arcurl": "http://www.bilibili.com/video/av372285038",
                        "aid": 372285038,
                        "bvid": "BV1tZ4y157Ge",
                        "title": "这TM才是过人呀！！纵享极致丝滑",
                        "description": "脚踝终结者们的丝滑操作",
                        "arcrank": "0",
                        "pic": "//i2.hdslb.com/bfs/archive/58586831ecb014dde2d2adfe0cb3f5c1df512028.jpg",
                        "play": 101778,
                        "video_review": 125,
                        "favorites": 383,
                        "tag": "十月打卡挑战W1,CROSSOVER,脚踝终结者,运球,篮球,NBA",
                        "review": 49,
                        "pubdate": 1601816939,
                        "senddate": 1602006440,
                        "duration": "4:58",
                        "badgepay": false,
                        "hit_columns": [
                            "tag"
                        ],
                        "view_type": "",
                        "is_pay": 0,
                        "is_union_video": 0,
                        "rec_tags": null,
                        "new_rec_tags": [],
                        "rank_score": 104304550
                    },
                    ............................
                ]
            }
        ]
    }
}
```

同样的，新建一个BilibiliVideoBean类，直接通过Gson Format这个插件，直接转生成我们所需要的实体类

BilibiliVideoBean

```java
package com.bin23.nbatoday.entity;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class BilibiliVideoBean {


    
    private int code;
    private String message;
    private int ttl;
    private DataBean data;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getTtl() {
        return ttl;
    }

    public void setTtl(int ttl) {
        this.ttl = ttl;
    }

    public DataBean getData() {
        return data;
    }

    public void setData(DataBean data) {
        this.data = data;
    }

    public static class DataBean {
        
        private String seid;
        private int page;
        private int pagesize;
        private int numResults;
        private int numPages;
        private String suggest_keyword;
        private String rqt_type;
        private CostTimeBean cost_time;
        private ExpListBean exp_list;
        private int egg_hit;
        private PageinfoBean pageinfo;
        private TopTlistBean top_tlist;
        private int show_column;
        private List<String> show_module_list;
        private List<ResultBean> result;

        public String getSeid() {
            return seid;
        }

        public void setSeid(String seid) {
            this.seid = seid;
        }

        public int getPage() {
            return page;
        }

        public void setPage(int page) {
            this.page = page;
        }

        public int getPagesize() {
            return pagesize;
        }

        public void setPagesize(int pagesize) {
            this.pagesize = pagesize;
        }

        public int getNumResults() {
            return numResults;
        }

        public void setNumResults(int numResults) {
            this.numResults = numResults;
        }

        public int getNumPages() {
            return numPages;
        }

        public void setNumPages(int numPages) {
            this.numPages = numPages;
        }

        public String getSuggest_keyword() {
            return suggest_keyword;
        }

        public void setSuggest_keyword(String suggest_keyword) {
            this.suggest_keyword = suggest_keyword;
        }

        public String getRqt_type() {
            return rqt_type;
        }

        public void setRqt_type(String rqt_type) {
            this.rqt_type = rqt_type;
        }

        public CostTimeBean getCost_time() {
            return cost_time;
        }

        public void setCost_time(CostTimeBean cost_time) {
            this.cost_time = cost_time;
        }

        public ExpListBean getExp_list() {
            return exp_list;
        }

        public void setExp_list(ExpListBean exp_list) {
            this.exp_list = exp_list;
        }

        public int getEgg_hit() {
            return egg_hit;
        }

        public void setEgg_hit(int egg_hit) {
            this.egg_hit = egg_hit;
        }

        public PageinfoBean getPageinfo() {
            return pageinfo;
        }

        public void setPageinfo(PageinfoBean pageinfo) {
            this.pageinfo = pageinfo;
        }

        public TopTlistBean getTop_tlist() {
            return top_tlist;
        }

        public void setTop_tlist(TopTlistBean top_tlist) {
            this.top_tlist = top_tlist;
        }

        public int getShow_column() {
            return show_column;
        }

        public void setShow_column(int show_column) {
            this.show_column = show_column;
        }

        public List<String> getShow_module_list() {
            return show_module_list;
        }

        public void setShow_module_list(List<String> show_module_list) {
            this.show_module_list = show_module_list;
        }

        public List<ResultBean> getResult() {
            return result;
        }

        public void setResult(List<ResultBean> result) {
            this.result = result;
        }

        public static class CostTimeBean {
            private String params_check;
            private String illegal_handler;
            private String as_response_format;
            private String mysql_request;
            private String as_request;
            private String save_cache;
            private String as_request_format;
            private String deserialize_response;
            private String total;
            private String main_handler;

            public String getParams_check() {
                return params_check;
            }

            public void setParams_check(String params_check) {
                this.params_check = params_check;
            }

            public String getIllegal_handler() {
                return illegal_handler;
            }

            public void setIllegal_handler(String illegal_handler) {
                this.illegal_handler = illegal_handler;
            }

            public String getAs_response_format() {
                return as_response_format;
            }

            public void setAs_response_format(String as_response_format) {
                this.as_response_format = as_response_format;
            }

            public String getMysql_request() {
                return mysql_request;
            }

            public void setMysql_request(String mysql_request) {
                this.mysql_request = mysql_request;
            }

            public String getAs_request() {
                return as_request;
            }

            public void setAs_request(String as_request) {
                this.as_request = as_request;
            }

            public String getSave_cache() {
                return save_cache;
            }

            public void setSave_cache(String save_cache) {
                this.save_cache = save_cache;
            }

            public String getAs_request_format() {
                return as_request_format;
            }

            public void setAs_request_format(String as_request_format) {
                this.as_request_format = as_request_format;
            }

            public String getDeserialize_response() {
                return deserialize_response;
            }

            public void setDeserialize_response(String deserialize_response) {
                this.deserialize_response = deserialize_response;
            }

            public String getTotal() {
                return total;
            }

            public void setTotal(String total) {
                this.total = total;
            }

            public String getMain_handler() {
                return main_handler;
            }

            public void setMain_handler(String main_handler) {
                this.main_handler = main_handler;
            }
        }

        public static class ExpListBean {
            /**
             * 5510 : true
             */

            @SerializedName("5510")
            private boolean _$5510;

            public boolean is_$5510() {
                return _$5510;
            }

            public void set_$5510(boolean _$5510) {
                this._$5510 = _$5510;
            }
        }

        public static class PageinfoBean {
            
            private LiveRoomBean live_room;
            private PgcBean pgc;
            private OperationCardBean operation_card;
            private TvBean tv;
            private MovieBean movie;
            private BiliUserBean bili_user;
            private LiveMasterBean live_master;
            private LiveAllBean live_all;
            private TopicBean topic;
            private UpuserBean upuser;
            private LiveBean live;
            private VideoBean video;
            private UserBean user;
            private BangumiBean bangumi;
            private ActivityBean activity;
            private MediaFtBean media_ft;
            private ArticleBean article;
            private MediaBangumiBean media_bangumi;
            private SpecialBean special;
            private LiveUserBean live_user;

            public LiveRoomBean getLive_room() {
                return live_room;
            }

            public void setLive_room(LiveRoomBean live_room) {
                this.live_room = live_room;
            }

            public PgcBean getPgc() {
                return pgc;
            }

            public void setPgc(PgcBean pgc) {
                this.pgc = pgc;
            }

            public OperationCardBean getOperation_card() {
                return operation_card;
            }

            public void setOperation_card(OperationCardBean operation_card) {
                this.operation_card = operation_card;
            }

            public TvBean getTv() {
                return tv;
            }

            public void setTv(TvBean tv) {
                this.tv = tv;
            }

            public MovieBean getMovie() {
                return movie;
            }

            public void setMovie(MovieBean movie) {
                this.movie = movie;
            }

            public BiliUserBean getBili_user() {
                return bili_user;
            }

            public void setBili_user(BiliUserBean bili_user) {
                this.bili_user = bili_user;
            }

            public LiveMasterBean getLive_master() {
                return live_master;
            }

            public void setLive_master(LiveMasterBean live_master) {
                this.live_master = live_master;
            }

            public LiveAllBean getLive_all() {
                return live_all;
            }

            public void setLive_all(LiveAllBean live_all) {
                this.live_all = live_all;
            }

            public TopicBean getTopic() {
                return topic;
            }

            public void setTopic(TopicBean topic) {
                this.topic = topic;
            }

            public UpuserBean getUpuser() {
                return upuser;
            }

            public void setUpuser(UpuserBean upuser) {
                this.upuser = upuser;
            }

            public LiveBean getLive() {
                return live;
            }

            public void setLive(LiveBean live) {
                this.live = live;
            }

            public VideoBean getVideo() {
                return video;
            }

            public void setVideo(VideoBean video) {
                this.video = video;
            }

            public UserBean getUser() {
                return user;
            }

            public void setUser(UserBean user) {
                this.user = user;
            }

            public BangumiBean getBangumi() {
                return bangumi;
            }

            public void setBangumi(BangumiBean bangumi) {
                this.bangumi = bangumi;
            }

            public ActivityBean getActivity() {
                return activity;
            }

            public void setActivity(ActivityBean activity) {
                this.activity = activity;
            }

            public MediaFtBean getMedia_ft() {
                return media_ft;
            }

            public void setMedia_ft(MediaFtBean media_ft) {
                this.media_ft = media_ft;
            }

            public ArticleBean getArticle() {
                return article;
            }

            public void setArticle(ArticleBean article) {
                this.article = article;
            }

            public MediaBangumiBean getMedia_bangumi() {
                return media_bangumi;
            }

            public void setMedia_bangumi(MediaBangumiBean media_bangumi) {
                this.media_bangumi = media_bangumi;
            }

            public SpecialBean getSpecial() {
                return special;
            }

            public void setSpecial(SpecialBean special) {
                this.special = special;
            }

            public LiveUserBean getLive_user() {
                return live_user;
            }

            public void setLive_user(LiveUserBean live_user) {
                this.live_user = live_user;
            }

            public static class LiveRoomBean {
                /**
                 * numResults : 5
                 * total : 5
                 * pages : 1
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class PgcBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class OperationCardBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class TvBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class MovieBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class BiliUserBean {
                /**
                 * numResults : 432
                 * total : 432
                 * pages : 22
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class LiveMasterBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class LiveAllBean {
                /**
                 * numResults : 5
                 * total : 5
                 * pages : 1
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class TopicBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class UpuserBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class LiveBean {
                /**
                 * numResults : 316
                 * total : 316
                 * pages : 16
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class VideoBean {
                /**
                 * numResults : 1000
                 * total : 1000
                 * pages : 50
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class UserBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class BangumiBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class ActivityBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class MediaFtBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class ArticleBean {
                /**
                 * numResults : 1000
                 * total : 1000
                 * pages : 50
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class MediaBangumiBean {
                /**
                 * numResults : 0
                 * total : 0
                 * pages : 0
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class SpecialBean {
                /**
                 * numResults : 2
                 * total : 2
                 * pages : 1
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }

            public static class LiveUserBean {
                /**
                 * numResults : 311
                 * total : 311
                 * pages : 16
                 */

                private int numResults;
                private int total;
                private int pages;

                public int getNumResults() {
                    return numResults;
                }

                public void setNumResults(int numResults) {
                    this.numResults = numResults;
                }

                public int getTotal() {
                    return total;
                }

                public void setTotal(int total) {
                    this.total = total;
                }

                public int getPages() {
                    return pages;
                }

                public void setPages(int pages) {
                    this.pages = pages;
                }
            }
        }

        public static class TopTlistBean {
            /**
             * live_room : 5
             * pgc : 0
             * operation_card : 0
             * tv : 0
             * movie : 0
             * special : 2
             * live_master : 0
             * bili_user : 432
             * topic : 0
             * upuser : 0
             * live : 5
             * video : 1000
             * user : 0
             * bangumi : 0
             * activity : 0
             * media_ft : 0
             * article : 1000
             * media_bangumi : 0
             * card : 0
             * live_user : 311
             */

            private int live_room;
            private int pgc;
            private int operation_card;
            private int tv;
            private int movie;
            private int special;
            private int live_master;
            private int bili_user;
            private int topic;
            private int upuser;
            private int live;
            private int video;
            private int user;
            private int bangumi;
            private int activity;
            private int media_ft;
            private int article;
            private int media_bangumi;
            private int card;
            private int live_user;

            public int getLive_room() {
                return live_room;
            }

            public void setLive_room(int live_room) {
                this.live_room = live_room;
            }

            public int getPgc() {
                return pgc;
            }

            public void setPgc(int pgc) {
                this.pgc = pgc;
            }

            public int getOperation_card() {
                return operation_card;
            }

            public void setOperation_card(int operation_card) {
                this.operation_card = operation_card;
            }

            public int getTv() {
                return tv;
            }

            public void setTv(int tv) {
                this.tv = tv;
            }

            public int getMovie() {
                return movie;
            }

            public void setMovie(int movie) {
                this.movie = movie;
            }

            public int getSpecial() {
                return special;
            }

            public void setSpecial(int special) {
                this.special = special;
            }

            public int getLive_master() {
                return live_master;
            }

            public void setLive_master(int live_master) {
                this.live_master = live_master;
            }

            public int getBili_user() {
                return bili_user;
            }

            public void setBili_user(int bili_user) {
                this.bili_user = bili_user;
            }

            public int getTopic() {
                return topic;
            }

            public void setTopic(int topic) {
                this.topic = topic;
            }

            public int getUpuser() {
                return upuser;
            }

            public void setUpuser(int upuser) {
                this.upuser = upuser;
            }

            public int getLive() {
                return live;
            }

            public void setLive(int live) {
                this.live = live;
            }

            public int getVideo() {
                return video;
            }

            public void setVideo(int video) {
                this.video = video;
            }

            public int getUser() {
                return user;
            }

            public void setUser(int user) {
                this.user = user;
            }

            public int getBangumi() {
                return bangumi;
            }

            public void setBangumi(int bangumi) {
                this.bangumi = bangumi;
            }

            public int getActivity() {
                return activity;
            }

            public void setActivity(int activity) {
                this.activity = activity;
            }

            public int getMedia_ft() {
                return media_ft;
            }

            public void setMedia_ft(int media_ft) {
                this.media_ft = media_ft;
            }

            public int getArticle() {
                return article;
            }

            public void setArticle(int article) {
                this.article = article;
            }

            public int getMedia_bangumi() {
                return media_bangumi;
            }

            public void setMedia_bangumi(int media_bangumi) {
                this.media_bangumi = media_bangumi;
            }

            public int getCard() {
                return card;
            }

            public void setCard(int card) {
                this.card = card;
            }

            public int getLive_user() {
                return live_user;
            }

            public void setLive_user(int live_user) {
                this.live_user = live_user;
            }
        }

        public static class ResultBean {
            /**
             * result_type : activity
             * data : []
             */

            private String result_type;
            private List<VideoData> data;

            public String getResult_type() {
                return result_type;
            }

            public void setResult_type(String result_type) {
                this.result_type = result_type;
            }

            public List<VideoData> getData() {
                return data;
            }

            public void setData(List<VideoData> data) {
                this.data = data;
            }
        }
    }
}

```

###### 3. 这里需要注意的是，最尾的代码，即ResultBean这个类

因为我们需要的视频数据是来自result里面的list的

![视频Json](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20220316111748.png)

但是生成的代码，List的泛型是？，所以我们需要自己新建一个类，来作为泛型，即视频数据类

```java
		public static class ResultBean {
            /**
             * result_type : activity
             * data : []
             */

            private String result_type;
            private List<?> data;

            .....
        }
```

那么就建一个类VideoData，根据json，也直接转成我们需要的代码

随便拿一个视频json

```json
{
    "type": "video",
    "id": 372285038,
    "author": "GoldenHoops",
    "mid": 544291138,
    "typeid": "163",
    "typename": "运动",
    "arcurl": "http://www.bilibili.com/video/av372285038",
    "aid": 372285038,
    "bvid": "BV1tZ4y157Ge",
    "title": "这TM才是过人呀！！纵享极致丝滑",
    "description": "脚踝终结者们的丝滑操作",
    "arcrank": "0",
    "pic": "//i2.hdslb.com/bfs/archive/58586831ecb014dde2d2adfe0cb3f5c1df512028.jpg",
    "play": 101778,
    "video_review": 125,
    "favorites": 383,
    "tag": "十月打卡挑战W1,CROSSOVER,脚踝终结者,运球,篮球,NBA",
    "review": 49,
    "pubdate": 1601816939,
    "senddate": 1602006440,
    "duration": "4:58",
    "badgepay": false,
    "hit_columns": [
        "tag"
    ],
    "view_type": "",
    "is_pay": 0,
    "is_union_video": 0,
    "rec_tags": null,
    "new_rec_tags": [],
    "rank_score": 104304550
}
```

然后直接生成，代码如下

VideoData

```java
package com.bin23.nbatoday.entity;

import java.util.List;

public class VideoData {

    private String type;
    private int id;
    private String author;
    private int mid;
    private String typeid;
    private String typename;
    private String arcurl;
    private int aid;
    private String bvid;
    private String title;
    private String description;
    private String arcrank;
    private String pic;
    private int play;
    private int video_review;
    private int favorites;
    private String tag;
    private int review;
    private int pubdate;
    private int senddate;
    private String duration;
    private boolean badgepay;
    private String view_type;
    private int is_pay;
    private int is_union_video;
    private Object rec_tags;
    private int rank_score;
    private List<String> hit_columns;
    private List<?> new_rec_tags;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getMid() {
        return mid;
    }

    public void setMid(int mid) {
        this.mid = mid;
    }

    public String getTypeid() {
        return typeid;
    }

    public void setTypeid(String typeid) {
        this.typeid = typeid;
    }

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename;
    }

    public String getArcurl() {
        return arcurl;
    }

    public void setArcurl(String arcurl) {
        this.arcurl = arcurl;
    }

    public int getAid() {
        return aid;
    }

    public void setAid(int aid) {
        this.aid = aid;
    }

    public String getBvid() {
        return bvid;
    }

    public void setBvid(String bvid) {
        this.bvid = bvid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getArcrank() {
        return arcrank;
    }

    public void setArcrank(String arcrank) {
        this.arcrank = arcrank;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public int getPlay() {
        return play;
    }

    public void setPlay(int play) {
        this.play = play;
    }

    public int getVideo_review() {
        return video_review;
    }

    public void setVideo_review(int video_review) {
        this.video_review = video_review;
    }

    public int getFavorites() {
        return favorites;
    }

    public void setFavorites(int favorites) {
        this.favorites = favorites;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public int getReview() {
        return review;
    }

    public void setReview(int review) {
        this.review = review;
    }

    public int getPubdate() {
        return pubdate;
    }

    public void setPubdate(int pubdate) {
        this.pubdate = pubdate;
    }

    public int getSenddate() {
        return senddate;
    }

    public void setSenddate(int senddate) {
        this.senddate = senddate;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public boolean isBadgepay() {
        return badgepay;
    }

    public void setBadgepay(boolean badgepay) {
        this.badgepay = badgepay;
    }

    public String getView_type() {
        return view_type;
    }

    public void setView_type(String view_type) {
        this.view_type = view_type;
    }

    public int getIs_pay() {
        return is_pay;
    }

    public void setIs_pay(int is_pay) {
        this.is_pay = is_pay;
    }

    public int getIs_union_video() {
        return is_union_video;
    }

    public void setIs_union_video(int is_union_video) {
        this.is_union_video = is_union_video;
    }

    public Object getRec_tags() {
        return rec_tags;
    }

    public void setRec_tags(Object rec_tags) {
        this.rec_tags = rec_tags;
    }

    public int getRank_score() {
        return rank_score;
    }

    public void setRank_score(int rank_score) {
        this.rank_score = rank_score;
    }

    public List<String> getHit_columns() {
        return hit_columns;
    }

    public void setHit_columns(List<String> hit_columns) {
        this.hit_columns = hit_columns;
    }

    public List<?> getNew_rec_tags() {
        return new_rec_tags;
    }

    public void setNew_rec_tags(List<?> new_rec_tags) {
        this.new_rec_tags = new_rec_tags;
    }
}
```

###### 4. 所以VideoData就是我们的数据源

```java
private List<VideoData> mDatas;
```

###### 5. 有了数据源，还需要适配器

BilibiliVideoAdapter

> 这里主要就是饺子视频播放框架以及Picasso的使用
>
> 饺子视频播放框架可以在GitHub上看人家给的示例
>
> [https://github.com/lipangit/JiaoZiVideoPlayer/blob/develop/app/src/main/java/cn/jzvd/demo/AdapterListView.java](https://github.com/lipangit/JiaoZiVideoPlayer/blob/develop/app/src/main/java/cn/jzvd/demo/AdapterListView.java)
>
> 由于这个视频接口获取不到B站视频的源视频播放地址，所以播放不了，我就直接拿一个可以播放的来顶替下
>
> 同时，写好一个找出类别为video的ResultBean的方法，因为ResultBean有类别，我们只需要类别为video的ResultBean，所以遍历下存放ResultBean这个集合
>
> ```java
> package com.bin23.nbatoday.utils;
> 
> import com.bin23.nbatoday.entity.BilibiliVideoBean;
> 
> import java.util.List;
> 
> public class VideoUtil {
>     /**
>      * 因为ResultBean有类别，我们只需要类别为video的ResultBean，所以遍历下存放ResultBean这个集合
>      * @return
>      */
> 
>     public static BilibiliVideoBean.DataBean.ResultBean getResultBeanOfVideo(List<BilibiliVideoBean.DataBean.ResultBean> resultList) {
>         BilibiliVideoBean.DataBean.ResultBean resultBean = null;
>         for (int i = 0; i < resultList.size(); i++) {
>             resultBean = resultList.get(i);
>             if ("video".equals(resultBean.getResult_type())) {
>                 System.out.println("");
>                 break;
>             }
>         }
>         return resultBean;
>     }
> }
> 
> ```
>
> 

```java
package com.bin23.nbatoday.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.bin23.nbatoday.R;
import com.bin23.nbatoday.entity.BilibiliVideoBean;
import com.bin23.nbatoday.entity.VideoData;
import com.bin23.nbatoday.utils.VideoUtil;
import com.squareup.picasso.Picasso;

import java.util.List;

import cn.jzvd.JzvdStd;

public class BilibiliVideoAdapter extends BaseAdapter {

    private Context context;
//    private List<BilibiliVideoBean.DataBean.ResultBean> mDatas;
    private List<VideoData> mDatas;

//    public BilibiliVideoAdapter(Context context, List<BilibiliVideoBean.DataBean.ResultBean> mDatas) {
//        this.context = context;
//        this.mDatas = mDatas;
//    }

    public BilibiliVideoAdapter(Context context, List<VideoData> mDatas) {
        this.context = context;
        this.mDatas = mDatas;
    }

    @Override
    public int getCount() {
        return mDatas.size();
    }

    @Override
    public Object getItem(int position) {
        return mDatas.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder = null;
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.tab_community_content_item_lv, parent, false);
            holder = new ViewHolder(convertView);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        // 获取指定位置的数据源
        //      1.获取我们所需类型为video的ResultBean
        VideoData videoData = mDatas.get(position);
        holder.upNameTv.setText(videoData.getAuthor());
        holder.playTv.setText(videoData.getPlay() + "");
        holder.favoriteTv.setText(videoData.getFavorites() + "");

        String viedoPageUrl = videoData.getArcurl();
        String purl = "https://upos-sz-mirrorks3.bilivideo.com/upgcxcode/37/58/242135837/242135837-1-208.mp4?e=ig8euxZM2rNcNbhM7wdVhwdlhzKMhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1607445659&gen=playurl&os=ks3bv&oi=978800370&trid=5dc9eebdbc064f1c9751c122389676ddT&platform=html5&upsig=fc5aa22d1b96c690565e2b12066cc254&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=524602686&orderid=0,1&logo=80000000";

        //      2.设置视频播放的信息
        holder.jzvdStd.setUp(purl, videoData.getTitle(), JzvdStd.SCREEN_NORMAL);
        String picURL = videoData.getPic();
        Picasso.with(context).load(picURL).into(holder.jzvdStd.posterImageView);
        holder.jzvdStd.positionInList = position;
        return convertView;
    }

    static class ViewHolder {
        private JzvdStd jzvdStd;
        private TextView upNameTv, playTv, favoriteTv;

        public ViewHolder(View view){
            jzvdStd = view.findViewById(R.id.item_community_jzvd);
            upNameTv = view.findViewById(R.id.item_community_tv_name);
            playTv = view.findViewById(R.id.item_community_tv_play);
            favoriteTv = view.findViewById(R.id.item_community_tv_favorite);
        }
    }

}

```

###### 6. 有了适配器，那就设置适配器

```java
		communityLv = view.findViewById(R.id.community_lv);

        // 数据源
        mDatas = new ArrayList<>();
        // 创建适配器
        adapter = new BilibiliVideoAdapter(view.getContext(), mDatas);
        // 设置适配器
        communityLv.setAdapter(adapter);
```

###### 7. 进行网络请求，获取数据

```java
	@SuppressLint("HandlerLeak")
    Handler handler = new Handler(){
        @Override
        public void handleMessage(@NonNull Message msg) {
            if (msg.what == 1) {
                String json = (String) msg.obj;
                BilibiliVideoBean videoBean = new Gson().fromJson(json, BilibiliVideoBean.class);
                BilibiliVideoBean.DataBean dataBean = videoBean.getData();
                List<BilibiliVideoBean.DataBean.ResultBean> resultBeanList_fromJson = dataBean.getResult();
                BilibiliVideoBean.DataBean.ResultBean resultBean = VideoUtil.getResultBeanOfVideo(resultBeanList_fromJson);
                // 获取视频数据
                List<VideoData> itemList = resultBean.getData();
                for (int i = 0; i < itemList.size(); i++) {
                    VideoData videoData = itemList.get(i);
                    mDatas.add(videoData);
                }
                // 提示适配器更新数据
                adapter.notifyDataSetChanged();
            }
        }
    };


    private void loadData() {
        // 创建新的线程，完成数据的获取
        new Thread(new Runnable() {
            @Override
            public void run() {
                String jsonConetent = HTTPUtil.getJsonConetent(url);
                // 子线程不能更新UI，需要通过handler发送数据回到主线程--消息通知机制
                Message message = new Message(); // 发送的消息对象
                message.what = 1; // 设置消息编号
                message.obj = jsonConetent;
                handler.sendMessage(message); // 子线程发送回主线程
            }
        }).start(); //-----------------------------不要忘了start()
    }
```

###### 8.  最后，CommunityFragment代码如下

CommunityFragment

```java
package com.bin23.nbatoday.fragment;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.nbatoday.R;
import com.bin23.nbatoday.adapter.BilibiliVideoAdapter;
import com.bin23.nbatoday.entity.BilibiliVideoBean;
import com.bin23.nbatoday.entity.VideoData;
import com.bin23.nbatoday.utils.HTTPUtil;
import com.bin23.nbatoday.utils.VideoUtil;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import cn.jzvd.JzvdStd;

public class CommunityFragment extends Fragment {

    private ListView communityLv;
    private String url = "https://api.bilibili.com/x/web-interface/search/all/v2?keyword=nba";
//    private List<BilibiliVideoBean.DataBean.ResultBean> mDatas;
    private List<VideoData> mDatas;

    private BilibiliVideoAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tab_community_content, container, false);
        communityLv = view.findViewById(R.id.community_lv);

        // 数据源
        mDatas = new ArrayList<>();
        // 创建适配器
        adapter = new BilibiliVideoAdapter(view.getContext(), mDatas);
        // 设置适配器
        communityLv.setAdapter(adapter);

        // 加载网络数据
        loadData();


        return view;
    }


    @SuppressLint("HandlerLeak")
    Handler handler = new Handler(){
        @Override
        public void handleMessage(@NonNull Message msg) {
            if (msg.what == 1) {
                String json = (String) msg.obj;
                BilibiliVideoBean videoBean = new Gson().fromJson(json, BilibiliVideoBean.class);
                BilibiliVideoBean.DataBean dataBean = videoBean.getData();
                List<BilibiliVideoBean.DataBean.ResultBean> resultBeanList_fromJson = dataBean.getResult();
                BilibiliVideoBean.DataBean.ResultBean resultBean = VideoUtil.getResultBeanOfVideo(resultBeanList_fromJson);
                // 获取视频数据
                List<VideoData> itemList = resultBean.getData();
                for (int i = 0; i < itemList.size(); i++) {
                    VideoData videoData = itemList.get(i);
                    mDatas.add(videoData);
                }
                // 提示适配器更新数据
                adapter.notifyDataSetChanged();
            }
        }
    };


    private void loadData() {
        // 创建新的线程，完成数据的获取
        new Thread(new Runnable() {
            @Override
            public void run() {
                String jsonConetent = HTTPUtil.getJsonConetent(url);
                // 子线程不能更新UI，需要通过handler发送数据回到主线程--消息通知机制
                Message message = new Message(); // 发送的消息对象
                message.what = 1; // 设置消息编号
                message.obj = jsonConetent;
                handler.sendMessage(message); // 子线程发送回主线程
            }
        }).start(); //-----------------------------不要忘了start()
    }


}
```

##### MyZoneFragment

接下来是MyZoneFragment，这里就用到PagerView的知识

因为多出两个页面，那么就多写两个布局文件

###### 1. 两个布局文件

第一个页面，网格布局，显示30支球队，纯静态，使用GridView

zone_view_1.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center">

    <GridView
        android:id="@+id/zone_grid_list_gv"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:numColumns="4"
        >

    </GridView>


</LinearLayout>
```

第二个页面，纯静态登录页面

zone_view_2.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center">

    <ImageView
        android:id="@+id/loginbutton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="40dp"
        android:layout_marginBottom="20dp"
        android:src="@drawable/login_logo"/>

    <RelativeLayout
        android:id="@+id/input"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/loginbutton"
        android:layout_marginLeft="28dp"
        android:layout_marginRight="28dp"
        android:background="#fff"
        android:orientation="vertical">
        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="108dp"
            android:background="#fff"
            android:gravity="center_vertical"
            android:orientation="horizontal" >

            <ImageView
                android:id="@+id/login_user_icon_iv"
                android:layout_width="44dp"
                android:layout_height="44dp"
                android:src="@drawable/user_icon"
                android:scaleType="fitXY"
                />

            <EditText
                android:id="@+id/username_et"
                android:layout_width="match_parent"
                android:layout_height="44dp"
                android:layout_weight="1"
                android:background="@null"
                android:imeOptions="actionDone"
                android:textSize="16sp"
                android:ems="10"
                android:hint="请输入用户名"
                android:layout_toRightOf="@+id/login_user_icon_iv"
                android:layout_marginLeft="20dp"
                >
            </EditText>

            <ImageView
                android:id="@+id/login_pass_icon_iv"
                android:layout_width="44dp"
                android:layout_height="44dp"
                android:src="@drawable/password_icon"
                android:scaleType="fitXY"
                android:layout_below="@+id/login_user_icon_iv"
                android:layout_marginTop="20dp"
                />
            <EditText
                android:id="@+id/pass"
                android:layout_width="match_parent"
                android:layout_height="44.0dip"
                android:background="#00ffffff"
                android:gravity="center_vertical"
                android:layout_below="@+id/username_et"
                android:layout_toRightOf="@+id/login_pass_icon_iv"
                android:layout_marginLeft="20dp"
                android:layout_marginTop="20dp"
                android:inputType="textPassword"
                android:maxLength="16"
                android:maxLines="1"
                android:textColor="#ff1d1d1d"
                android:textColorHint="#ff666666"
                android:textSize="16.0sp"
                android:hint="请输入密码"
                />

        </RelativeLayout>


    </RelativeLayout>

    <Button
        android:id="@+id/loginBtn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/input"
        android:layout_marginTop="10dp"
        android:background="#3aadfd"
        android:text="登  录"
        android:textColor="#ffffff"
        android:textSize="18dp"
        android:layout_centerHorizontal="true"
        android:layout_marginLeft="28dp"
        android:layout_marginRight="28dp"
        />

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginLeft="28dp"
        android:layout_marginRight="28dp"
        android:layout_below="@+id/loginBtn"
        >
        <TextView
            android:id="@+id/login_to_register_tv"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="注册"
            android:textStyle="bold"
            android:textSize="16dp"
            android:layout_marginTop="20dp"
            />

        <TextView
            android:id="@+id/login_forget_tv"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="忘记密码"
            android:textStyle="bold"
            android:textSize="16dp"
            android:layout_alignParentRight="true"
            android:layout_marginTop="20dp"
            />
    </RelativeLayout>

    <TextView
        android:text=""
        android:layout_width="wrap_content"
        android:layout_below="@+id/loginBtn"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:id="@+id/promptText"
        android:textColor="#ff0000"
        android:layout_marginTop="10dp"
        android:textSize="18sp"/>

</RelativeLayout>
```

布局文件OK了，那么就多两个Fragment

###### 2. 两个Fragment

ZoneOne和ZoneTwo，基本也一样，如下

```java
package com.bin23.nbatoday.fragment.sub;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.nbatoday.R;

public class ZoneOne extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.zone_view_1, container, false);
        return view;
    }
}

```

同理，对于ZoneOne，它是一个GridView，类上ListView，所以需要数据源，适配器

###### 3. ZoneOne的数据源

那么开始吧，数据源是静态的，我们就自己写

TeamBean

```java
package com.bin23.nbatoday.entity;

public class TeamBean {
    private String teamName;
    private String teamFans;
    private int teamPic;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamFans() {
        return teamFans;
    }

    public void setTeamFans(String teamFans) {
        this.teamFans = teamFans;
    }

    public int getTeamPic() {
        return teamPic;
    }

    public void setTeamPic(int teamPic) {
        this.teamPic = teamPic;
    }

    public TeamBean() {
    }

    public TeamBean(String teamName, String teamFans, int teamPic) {
        this.teamName = teamName;
        this.teamFans = teamFans;
        this.teamPic = teamPic;
    }
}

```

写一个工具类，来获取30支球队的信息，作为数据源

```java
package com.bin23.nbatoday.utils;

import com.bin23.nbatoday.R;
import com.bin23.nbatoday.entity.TeamBean;

import java.util.ArrayList;

public class TeamUtil {

    public static ArrayList<TeamBean> getAllTeam(){
        ArrayList<TeamBean> arrayList = new ArrayList<>();
        for (int i = 0; i < 1; i++) {
            TeamBean t1 = new TeamBean();
            t1.setTeamName("湖人");
            t1.setTeamFans("862万粉丝");
            t1.setTeamPic(R.mipmap.lalakers);

            TeamBean t2 = new TeamBean();
            t2.setTeamName("快船");
            t2.setTeamFans("484万粉丝");
            t2.setTeamPic(R.mipmap.laclippers);

            TeamBean t3 = new TeamBean();
            t3.setTeamName("勇士");
            t3.setTeamFans("1260万粉丝");
            t3.setTeamPic(R.mipmap.goldenstate);

            TeamBean t4 = new TeamBean();
            t4.setTeamName("篮网");
            t4.setTeamFans("119万粉丝");
            t4.setTeamPic(R.mipmap.brooklyn);

            TeamBean t5 = new TeamBean();
            t5.setTeamName("火箭");
            t5.setTeamFans("1168万粉丝");
            t5.setTeamPic(R.mipmap.houston);

            TeamBean t6 = new TeamBean();
            t6.setTeamName("雷霆");
            t6.setTeamFans("393万粉丝");
            t6.setTeamPic(R.mipmap.okc);

            TeamBean t7 = new TeamBean();
            t7.setTeamName("马刺");
            t7.setTeamFans("321万粉丝");
            t7.setTeamPic(R.mipmap.sanantonio);

            TeamBean t8 = new TeamBean();
            t8.setTeamName("76人");
            t8.setTeamFans("166万粉丝");
            t8.setTeamPic(R.mipmap.phila);

            TeamBean t9 = new TeamBean();
            t9.setTeamName("雄鹿");
            t9.setTeamFans("136万粉丝");
            t9.setTeamPic(R.mipmap.milwaukee);

            TeamBean t10 = new TeamBean();
            t10.setTeamName("凯尔特人");
            t10.setTeamFans("344万粉丝");
            t10.setTeamPic(R.mipmap.boston);

            TeamBean t11 = new TeamBean();
            t11.setTeamName("猛龙");
            t11.setTeamFans("165万粉丝");
            t11.setTeamPic(R.mipmap.toronto);

            TeamBean t12 = new TeamBean();
            t12.setTeamName("开拓者");
            t12.setTeamFans("148万粉丝");
            t12.setTeamPic(R.mipmap.portland);

            TeamBean t13 = new TeamBean();
            t13.setTeamName("森林狼");
            t13.setTeamFans("117万粉丝");
            t13.setTeamPic(R.mipmap.minnesota);

            TeamBean t14 = new TeamBean();
            t14.setTeamName("步行者");
            t14.setTeamFans("96万粉丝");
            t14.setTeamPic(R.mipmap.indiana);

            TeamBean t15 = new TeamBean();
            t15.setTeamName("公牛");
            t15.setTeamFans("179万粉丝");
            t15.setTeamPic(R.mipmap.chicago);

            TeamBean t16 = new TeamBean();
            t16.setTeamName("黄蜂");
            t16.setTeamFans("92万粉丝");
            t16.setTeamPic(R.mipmap.charlotte);

            TeamBean t17 = new TeamBean();
            t17.setTeamName("爵士");
            t17.setTeamFans("88万粉丝");
            t17.setTeamPic(R.mipmap.utah);

            TeamBean t18 = new TeamBean();
            t18.setTeamName("活塞");
            t18.setTeamFans("75万粉丝");
            t18.setTeamPic(R.mipmap.detroit);

            TeamBean t19 = new TeamBean();
            t19.setTeamName("太阳");
            t19.setTeamFans("67万粉丝");
            t19.setTeamPic(R.mipmap.phoenix);

            TeamBean t20 = new TeamBean();
            t20.setTeamName("国王");
            t20.setTeamFans("80万粉丝");
            t20.setTeamPic(R.mipmap.sacramento);

            TeamBean t21 = new TeamBean();
            t21.setTeamName("尼克斯");
            t21.setTeamFans("93万粉丝");
            t21.setTeamPic(R.mipmap.newyork);

            TeamBean t22 = new TeamBean();
            t22.setTeamName("老鹰");
            t22.setTeamFans("75万粉丝");
            t22.setTeamPic(R.mipmap.atlanta);

            TeamBean t23 = new TeamBean();
            t23.setTeamName("魔术");
            t23.setTeamFans("58万粉丝");
            t23.setTeamPic(R.mipmap.orlando);

            TeamBean t24 = new TeamBean();
            t24.setTeamName("鹈鹕");
            t24.setTeamFans("86万粉丝");
            t24.setTeamPic(R.mipmap.neworleans);

            TeamBean t25 = new TeamBean();
            t25.setTeamName("骑士");
            t25.setTeamFans("55万粉丝");
            t25.setTeamPic(R.mipmap.cleveland);

            TeamBean t26 = new TeamBean();
            t26.setTeamName("奇才");
            t26.setTeamFans("77万粉丝");
            t26.setTeamPic(R.mipmap.washington);

            TeamBean t27 = new TeamBean();
            t27.setTeamName("掘金");
            t27.setTeamFans("112万粉丝");
            t27.setTeamPic(R.mipmap.denver);

            TeamBean t28 = new TeamBean();
            t28.setTeamName("独行侠");
            t28.setTeamFans("235万粉丝");
            t28.setTeamPic(R.mipmap.dallas);

            TeamBean t29 = new TeamBean();
            t29.setTeamName("灰熊");
            t29.setTeamFans("116万粉丝");
            t29.setTeamPic(R.mipmap.memphis);

            TeamBean t30 = new TeamBean();
            t30.setTeamName("热火");
            t30.setTeamFans("212万粉丝");
            t30.setTeamPic(R.mipmap.miami);

            arrayList.add(t1);
            arrayList.add(t2);
            arrayList.add(t3);
            arrayList.add(t4);
            arrayList.add(t5);
            arrayList.add(t6);
            arrayList.add(t7);
            arrayList.add(t8);
            arrayList.add(t9);
            arrayList.add(t10);
            arrayList.add(t11);
            arrayList.add(t12);
            arrayList.add(t13);
            arrayList.add(t14);
            arrayList.add(t15);
            arrayList.add(t16);
            arrayList.add(t17);
            arrayList.add(t18);
            arrayList.add(t19);
            arrayList.add(t20);
            arrayList.add(t21);
            arrayList.add(t22);
            arrayList.add(t23);
            arrayList.add(t24);
            arrayList.add(t25);
            arrayList.add(t26);
            arrayList.add(t27);
            arrayList.add(t28);
            arrayList.add(t29);
            arrayList.add(t30);
        }
        return arrayList;
    }
}

```

###### 4. ZoneOne的适配器

```java
package com.bin23.nbatoday.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.bin23.nbatoday.R;
import com.bin23.nbatoday.entity.TeamBean;

import java.util.List;

public class TeamAdapter extends BaseAdapter {
    private Context context;
    private List<TeamBean> mDatas;

    public TeamAdapter(Context context, List<TeamBean> mDatas) {
        this.context = context;
        this.mDatas = mDatas;
    }

    @Override
    public int getCount() {
        return mDatas.size();
    }

    @Override
    public Object getItem(int position) {
        return mDatas.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder = null;
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.zone_view_gridlist_item, null);
            holder = new ViewHolder(convertView);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        // 获取当前指定位置的数据
        TeamBean teamBean = mDatas.get(position);
        holder.iv.setImageResource(teamBean.getTeamPic());
        holder.nameTv.setText(teamBean.getTeamName());
        holder.desTv.setText(teamBean.getTeamFans());

        return convertView;
    }

    static class ViewHolder {
        ImageView iv;
        TextView nameTv, desTv;
        public ViewHolder(View view){
            iv = view.findViewById(R.id.zone_list_item_iv);
            nameTv = view.findViewById(R.id.zone_list_item_name_tv);
            desTv = view.findViewById(R.id.zone_list_item_des_tv);
        }
    }
}

```

###### 5. 最后，ZoneOne代码如下

```java
package com.bin23.nbatoday.fragment.sub;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.nbatoday.R;
import com.bin23.nbatoday.adapter.TeamAdapter;
import com.bin23.nbatoday.entity.TeamBean;
import com.bin23.nbatoday.utils.TeamUtil;

import java.util.List;

public class ZoneOne extends Fragment {
    private GridView gv;
    private List<TeamBean> mDatas;
    private TeamAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.zone_view_1, container, false);
        gv = view.findViewById(R.id.zone_grid_list_gv);

        // 获取球队数据源
        mDatas = TeamUtil.getAllTeam();
        // 创建适配器对象
        adapter = new TeamAdapter(view.getContext(), mDatas);
        // 设置适配器
        gv.setAdapter(adapter);

        return view;
    }
}

```

###### 6. ZoneTwo基本不变

```java
package com.bin23.nbatoday.fragment.sub;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.nbatoday.R;

public class ZoneTwo extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.zone_view_2, container, false);
        return view;
    }
}

```

###### 7. MyZoneFragment

> - 实现ViewPager.OnPageChangeListener接口
>
> ```java
> implements ViewPager.OnPageChangeListener
> ```
>
> - 找到布局中的控件
>
> ```java
> 	private ViewPager myZonePg;
> ```
>
> - 声明两个集合，一个存放View，一个存放标题
>
> ```java
>     private ArrayList<View> viewList;
>     private ArrayList<String> titleList;
> 
>     //几个代表页面的常量
>     public static final int PAGE_ONE = 0;
>     public static final int PAGE_TWO = 1;
> ```

完整MyZoneFragment代码如下

```java
package com.bin23.nbatoday.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.viewpager.widget.ViewPager;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.bin23.nbatoday.R;
import com.bin23.nbatoday.adapter.ZoneFragmentAdapter;
//import com.bin23.nbatoday.adapter.ZonePagerAdapter;

import java.util.ArrayList;

public class MyZoneFragment extends Fragment implements ViewPager.OnPageChangeListener{

    private ViewPager myZonePg;
    private ArrayList<View> viewList;
    private ArrayList<String> titleList;

    //几个代表页面的常量
    public static final int PAGE_ONE = 0;
    public static final int PAGE_TWO = 1;

    private ZoneFragmentAdapter zoneFragmentAdapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tab_myzone_content, container, false);
        myZonePg = view.findViewById(R.id.myzone_pg);
        titleList = new ArrayList<String>();
        titleList.add("NBA中心");
        titleList.add("登录");
        zoneFragmentAdapter = new ZoneFragmentAdapter(getChildFragmentManager(), titleList);
        myZonePg.setAdapter(zoneFragmentAdapter);

        return view;
    }

    private void bindViews(View view) {
        myZonePg = view.findViewById(R.id.myzone_pg);
        myZonePg.setCurrentItem(0);
        myZonePg.addOnPageChangeListener(this);
    }


    //重写ViewPager页面切换的处理方法
    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
    }

    @Override
    public void onPageSelected(int position) {
    }

    @Override
    public void onPageScrollStateChanged(int state) {

    }

}

```

#### 写个启动页

新建一个Activity，其布局设置一张背景图

WelcomeActivity

WelcomeActivity继承Activity，而不是AppCompatActivity，然后修改主启动为WelcomeActivity，让页面在WelcomeActivity停留2秒后跳转到MainActivity

```java
package com.bin23.nbatoday;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import java.util.Timer;
import java.util.TimerTask;

public class WelcomeActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
        startMainActivity();
    }

    private void startMainActivity() {
        TimerTask delayTask = new TimerTask() {
            @Override
            public void run() {
                Intent mainIntent = new Intent(WelcomeActivity.this, MainActivity.class);
                startActivity(mainIntent);
                WelcomeActivity.this.finish();
            }
        };
        Timer timer = new Timer();
        timer.schedule(delayTask,2000);// 延时两秒执行 run 里面的操作
    }
}
```



## 所用到的知识

1. 布局文件的各种操作，比如设置背景，设置边距，设置位置等等
2. 动态添加Fragment，从而实现多页面切换
3. ListView的使用
4. 通过别人提供的接口获取数据，即网络请求接口地址后使用IO流进行获取json数据
5. JiaoZiVideoPlayer的使用
6. PagerView实现页面的左右滑动
7. GridView的使用
8. Handler消息机制

