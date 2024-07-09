---
# 这是文章的标题
title: Android 学习笔记
# 这是页面的图标
# icon: 
# 这是侧边栏的顺序
order: 1
# 设置作者
author: god23bin
# 设置写作时间
date: 2021-05-16 09:45:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - Android
  - 笔记
---

# Android

## 第一周

### 什么是Android？

### 架构

![架构](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20200914181052066.png)

![](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20200914180527587.png)

- 应用层（Applications）

> 就我们安装在手机上的各种应用

- 应用框架层（Application Framework）

> 就别人写好的我们拿来用的东西，称框架，有各种API，我们就直接使用

- 系统运行库层（Android Runtime && Libraries）

> 一些C++库为Android提供支持

- Linux内核层（Linux Kernel）

> Android系统是基于Linux的，这一层就为Android提供底层驱动的

### 开发特色

**四大组件**

- 活动（Activity）
- 服务（Service）
- 广播接收器（Broadcast Receiver）
- 内容提供器（Content Provider）

**其他**

> - 系统控件：进行页面布局
> - 轻量级数据库SQLite 
> - 地理定位：使用第三方API，实现自己APP中的地理定位
> - 多媒体：可直接连接手机进行操作，也可使用模拟器
> - 传感器：比如微信摇一摇，就有使用到传感器

### 开发环境搭建
- Android Studio
- Android SDK

### 目录结构

**总体结构**

![总体结构](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20200914185355540.png)



**展开app目录**

![展开目录结构](https://gitee.com/god23bin/blog-pic-bed/raw/master/%E5%B1%95%E5%BC%80%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)

java文件，编写java 代码的地方，或者说编写kotlin代码的地方

res:资源文件，所以图片、布局等资源放置在此 

androidTest：测试用的文件夹

libs : 第三方Jar包，就需要把这些Jar包都放在libs目录下

build.gradle：有两个，关注APP里面的build.gradle

app 目录下的build.gradle

```groovy
//apply plugin，声明是 Android 应用程序还是库模块；
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

//android 闭包，配置项目构建的各种属性，compileSDKVersion 用于指定项目的变异 SDK  版本， buildToolsVersion 用户指定项目构建工具的版本。
android {
    compileSdkVersion 29
    buildToolsVersion "30.0.2"

    //defaultConfig 闭包：默认配置、应用程序包名、最小sdk版本、目标sdk版本、版本号、版本名称
    defaultConfig {
        applicationId "com.bin23.helloworld"
        minSdkVersion 21
        targetSdkVersion 29
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    //buildTypes 闭包：指定生成安装文件的配置，是否对代码进行混淆
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

//dependencies 闭包，指定当前项目的所有以来关系，本地以来，库依赖以及远程依赖
dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```

　　1） apply plugin，声明是 Android 应用程序还是库模块；

　　2） android 闭包，配置项目构建的各种属性，compileSDKVersion 用于指定项目的变异 SDK  版本， buildToolsVersion 用户指定项目构建工具的版本。

   - defaultConfig 闭包：默认配置、应用程序包名、最小sdk版本、目标sdk版本、版本号、版本名称；

   - buildTypes 闭包：指定生成安装文件的配置，是否对代码进行混淆；

   - signingConfigs 闭包：签名信息配置；

   - sourceSets  闭包：源文件路径配置；

   - lintOptions 闭包：lint 配置；
     
        3） dependencies 闭包，指定当前项目的所有以来关系，本地以来，库依赖以及远程依赖；
        
        4） repositories 闭包，仓库配置。

### AndroidManifest.xml

整个Android项目的配置文件

四大组件都要在这里注册，一般创建新的Activity就会自动注册

MainActivity：主活动

```xml
    <activity android:name=".MainActivity">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
```

注意：一个android 项目中可以有多个activity，但只能有一个启动activity(主activity),主activity需加上

```xml
	<intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>。
```

其他普通的activity只需注册即可。

### 日志工具类Log

Android中的日志工具类是Log（android.util.Log），这个类中提供了如下几个方法来供我们打印日志。
1.	Log.v()
这个方法用于打印那些最为琐碎的，意义最小的日志信息。对应级别verbose，是Android日志里面级别最低的一种。
2.	Log.d()
这个方法用于打印一些调试信息，这些信息对你调试程序和分析问题应该是有帮助的。对应级别debug，比verbose高一级。
3.	Log.i()
这个方法用于打印一些比较重要的数据，这些数据应该是你非常想看到的，可以帮你分析用户行为的那种。对应级别info，比debug高一级。
4.	Log.w()
这个方法用于打印一些警告信息，提示程序在这个地方可能会有潜在的风险，最好去修复一下这些出现警告的地方。对应级别warn，比info高一级。
5.	 Log.e()
错误信息

### 定制自己的日志工具
在调试过程中，会打印很多Log，但是调试完成之后，又要一行行将Log删除，效率太低。如何控制Log的打印呢？

自定义一个可以自己控制的日志打印类，通过判断LEVEL级别来打印。
比如，当需要打印所有的日志时，将LEVEL改为VERBOSE，此时所有的日志都会打印；
当不需要打印日志时，将LEVEL改为NOTHING，则所有的日志都不会打印了。
此时打印Log方法为：LogUtil.i("main", "hello");
```java
public class LogUtil {

	public static final int VERBOSE = 1;
	public static final int DEBUG = 2;
	public static final int INFO = 3;
	public static final int WARN = 4;
	public static final int ERROR = 5;
	public static final int NOTHING = 6;
	
	public static final int LEVEL = NOTHING;
	
	public static void v(String tag,String msg)
	{
		if(LEVEL<=VERBOSE)
		Log.v(tag, msg);
	}
	
	public static void d(String tag,String msg)
	{
		if(LEVEL<=DEBUG)
		Log.d(tag, msg);
	}
	
	public static void i(String tag,String msg)
	{
		if(LEVEL<=INFO)
		Log.i(tag, msg);
	}
	
	public static void w(String tag,String msg)
	{
		if(LEVEL<=WARN)
		Log.w(tag, msg);
	}
	
	public static void e(String tag,String msg)
	{
		if(LEVEL<=ERROR)
		Log.e(tag, msg);
	}
}
```

## 第二周

### Activity是什么？

> 它是一种包含用户界面的组件，主要用于和用户进行交互

### 基本用法

- 创建Activity

![直接newActivity](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20200924111319489.png)

![创建中](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20200924111608357.png)

索性我创建了三个

![](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20200924111750557.png)

- 布局

布局编辑器

![看看布局编辑器](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20200924111939003.png)

![布局编辑器略解](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20200924112356555.png)

### 使用Toast提醒

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_layout);
        Button button = (Button)findViewById(R.id.button1);
        /**
         * 点击事件测试Toast
         */
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(FirstActivity.this,"你点击了第一个按钮了哦~",Toast.LENGTH_SHORT).show();
            }
        });
    }
```

### 使用Menu

创建菜单文件

![创建菜单](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20200924113011295.png)

FirstActivity，重写onCreateOptionsMenu()方法 和 onOptionsItemSelected()方法

```java
    /**
     * 通过MenuInflater的inflate方法，找到我们写的菜单，把它添加到menu对象上
     * @param menu
     * @return
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main,menu);
        return true;
    }

    /**
     * 定义菜单响应事件
     * @param item
     * @return
     */
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        //通过item的id来判断点击的是哪个item
        switch (item.getItemId()){
            case R.id.add_item :
                Toast.makeText(this,"已加99999元",Toast.LENGTH_SHORT).show();
                break;
            case R.id.remove_item :
                Toast.makeText(this,"已移除物品",Toast.LENGTH_SHORT).show();
                break;
        }
        return true;
    }
```

### 什么是Intent？

> Android程序中各组件之间进行交互的东西

### 显式Intent

通过Intent，从FirstActivity跳转到SecondActivity（启动SecondActivity）

```java
		/**
         * 显式Intent
         */
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
                startActivity(intent);
            }
        });
```

Intent(Context packageContext, Class<?> cls)

两个参数

> packageContext：启动跳转到另一个Activity的上下文
>
> Class：目标Activity的Class

### 隐式Intent

> 不指明跳到哪一个Activity，而指定了action和category，进而进行跳转

配置AndroidManifest.xml

```xml
		<activity android:name=".SecondActivity">
            <intent-filter>
                <action android:name="com.bin23.activitytest.ACTION_START" />

                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
```

FirstActivity

```java
		/**
         * 隐式Intent
         */
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent("com.bin23.activitytest.ACTION_START");
//                intent.addCategory("com.bin23.activitytest.MY_CATEGORY");
                startActivity(intent);
            }
        });
```

#### 其他操作-更多隐式用法

```java
		/**
         * 更多隐式用法
         * 启动其他程序的 Activity
         * 比如访问某个网页，调用系统的浏览器来访问
         *
         * 使用系统内置动作 Intent.ACTION_VIEW
         *
         */
        Button button_baidu = (Button)findViewById(R.id.button_baidu);
        button_baidu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setData(Uri.parse("https://www.baidu.com"));
                startActivity(intent);
            }
        });

        /**
         * 调用手机拨号
         * 使用系统内置动作 Intent.ACTION_DIAL
         */
        Button button_dial = (Button)findViewById(R.id.button_dial);
        button_dial.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_DIAL);
                intent.setData(Uri.parse("tel:10086"));
                startActivity(intent);
            }
        });

```

### 向下一个Activity传送数据

使用Intent中的putExtra()方法

FirstActivity传送数据给SecondActivity

```java
		/**
         * 传送数据到下一个 Activity
         * 使用 intent 对象的 putExtra()方法，把数据放在 intent 中
         * 然后到下一个 Activity 后从 intent 中拿出来
         */
        Button button_sendMsg = (Button)findViewById(R.id.button_sendMsg);
        button_sendMsg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
                intent.putExtra("extra_data","哈喽，你好帅啊！");
                startActivity(intent);
            }
        });
```

SecondActivity接收传过来的数据

```java
	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.second_layout);
        final Intent intent = getIntent();
        String extra_data = intent.getStringExtra("extra_data");
        Log.d("传过来的数据：-----",extra_data);
    }
```

### 返回数据给上一个Activity

FirstActivity

```java
		Button button_sendMsg = (Button)findViewById(R.id.button_sendMsg);
        button_sendMsg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
                intent.putExtra("extra_data","哈喽，你好帅啊！");
                //请求码是唯一值即可，这里传 1
                startActivityForResult(intent,1);
            }
        });
```

此时使用startActivityForResult()来进行启动第二个Activity

startActivityForResult()两个参数

> 第一个，即intent
>
> 第二个，请求码，只要是唯一值就可以

SecondActivity接收传过来的数据，并可以返回数据给FirstActivity

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.second_layout);
        final Intent intent = getIntent();
        String extra_data = intent.getStringExtra("extra_data");
        Log.d("传过来的数据：-----",extra_data);

        Button button2 = (Button)findViewById(R.id.button2);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent1 = new Intent();
                intent1.putExtra("data_return","你好啊，帅帅的 FirstActivity");
                setResult(RESULT_OK,intent1);
                finish();
            }
        });
    }
```

setResult()两个参数

> 第一个，向上一个Activity返回处理结果，一般就两个，值分别是RESULT_OK 和 RESULT_CANCELED
>
> 第二个，Intent对象，把带有数据的Intent传回去

我们是用startActivityForResult()方法来启动SecondActivity的，SecondActivity被销毁后，会回调上一个Activity的onActivityResult()方法，所以需要在FirstActivity中重写onActivityResult()方法

FirstActivity

```java
    /**
     * 接收从 SecondActivity 返回的数据
     * @param requestCode 请求码， FirstActivity设置的，值为1
     * @param resultCode 结果码， 用于判断处理结果是否成功， SecondActivity设置的，值为RESULT_OK
     * @param data 即携带着返回数据的Intent对象
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        //通过switch判断该数据来源，因为一个Activity可以调用startActivityForResult()去启动很多Activity
        //每个Activity返回数据都会调用此方法，即onActivityResult，所以需要判断
        switch (requestCode) {
            case 1:
                if (resultCode == RESULT_OK) {
                    String data_return = data.getStringExtra("data_return");
                    Log.d("从 SecondActivity 返回的数据：--", data_return);
                }
                break;
            default:
        }
    }
```

### Activity生命周期

### Activity启动模式

## 第三周

### 常用控件

控件是放在布局文件中的，然后布局文件，也就是layout下面的xml文件，有好几种布局，现在你知道有ConstraintLayout，LinearLayout就OK，下面是一LinearLayout来进行布局的

LinearLayout 长成这样子

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


</LinearLayout>
```



#### TextView

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="这是TextView" />


</LinearLayout>
```

- 相关属性

  - android:layout_width="match_parent"
  - android:layout_height="wrap_content"

  上面这两个属性，所有控件都具有

  > match_parent，匹配父节点，让当前控件的大小与父布局的大小一样，也就是说由父布局来决定当前控件的大小

  > wrap_content，包裹内容，让当前控件刚好能够包含里面的内容，也就是说由控件内容来决定当前控件的大小

  - android:gravity="center"

  > 设置文字对齐方式，居中

  - android:textColor="#885588"
  - android:textSize="24sp"

  > 设置文字大小，用sp作为单位，这样当用户在系统修改了文字显示尺寸时，程序中的文字大小也会跟着改变

  

#### Button

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        ... />

    <Button
        android:id="@+id/button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="我就是Button" />


</LinearLayout>
```

- 点击事件，监听点击执行相关逻辑

两种方法

1. 直接用匿名内部类的方式来写

```java
package com.bin23.uitest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button = (Button)findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });
    }
}
```

2. 实现接口的方式来写

```java
package com.bin23.uitest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button = (Button)findViewById(R.id.button);
        button.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.button :
                //实现逻辑
                break;
            default:break;
        }
    }
}
```

#### EditText

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        ... />

    <Button
        ... />

    <EditText
        android:id="@+id/editText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        />


</LinearLayout>
```

小总结：

> 实际上，控件的使用都差不多，指定一个id，指定宽高，加入一些控件特有的属性

- 相关属性

  - android:hint="请输入你的用户名，我会消失"
  - android:maxLines="2"

  > android:maxLines="2" 表示EditText最多显示2行，过多会进行滚动，不设置这个的话，当文本输入越来越多时，EditText会一直拉伸

##### 点击Botton获取EditText内容

```java
package com.bin23.uitest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button = (Button)findViewById(R.id.button);
        button.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.button :
                EditText editText = (EditText)findViewById(R.id.editText);
                String text = editText.getText().toString();
                Toast.makeText(MainActivity.this, text, Toast.LENGTH_SHORT).show();
                break;
            default:break;
        }
    }
}
```

#### ImageView

图片一般都是放在drawable开头的目录下的，并且带上具体的分辨率，现在主流的手机屏幕分辨率大多是xxhdpi的，所以新建一个drawable-xxhdpi目录，然后准备两张图片放进去



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        ... />

    <Button
        ... />

    <EditText
        ...
        />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/img_1"
        />

</LinearLayout>
```

还可以结合Button点击事件，获取imageView，然后通过它的setImageResource()来设置别的图片

```java
package com.bin23.uitest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText editText;
    private ImageView imageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button = (Button)findViewById(R.id.button);
        Button button2 = (Button)findViewById(R.id.button2);
        button.setOnClickListener(this);
        button2.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.button :
                ...
            case R.id.button2 :
                imageView = (ImageView)findViewById(R.id.imageView);
                imageView.setImageResource(R.drawable.img_2);
                break;
            default:break;
        }
    }
}
```

#### ProgressBar

默认圆形进度条

```xml
<ProgressBar
    android:id="@+id/progressBar"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    />
```

##### 显示与隐藏进度条

```java
package com.bin23.uitest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText editText;
    private ImageView imageView;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button = (Button)findViewById(R.id.button);
        Button button2 = (Button)findViewById(R.id.button2);
        Button button3 = (Button)findViewById(R.id.button3);
        button.setOnClickListener(this);
        button2.setOnClickListener(this);
        button3.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.button :
                ...
            case R.id.button2 :
                ...
            case R.id.button3 :
                progressBar = (ProgressBar)findViewById(R.id.progressBar);
                if(progressBar.getVisibility() == View.VISIBLE){
                    progressBar.setVisibility(View.GONE);
                }else{
                    progressBar.setVisibility(View.VISIBLE);
                }
                break;
            default:break;
        }
    }
}
```

##### 指定样式为水平进度条

```xml
    <ProgressBar
        android:id="@+id/progressBar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        style="?android:attr/progressBarStyleHorizontal"
        android:max="100"
        />
```

> style="?android:attr/progressBarStyleHorizontal"    指定为水平进度条
> android:max="100"       设置进度条最大值

点击事件，每次点击都会增加进度条的进度，增加的进度为10

```java
            case R.id.button3 :
                progressBar = (ProgressBar)findViewById(R.id.progressBar);
//                if(progressBar.getVisibility() == View.VISIBLE){
//                    progressBar.setVisibility(View.GONE);
//                }else{
//                    progressBar.setVisibility(View.VISIBLE);
//                }
                progressBar.setProgress(progressBar.getProgress() + 10);
                break;
```

#### AlertDialog

你肯定遇到这样的情况，当你点击删除按钮的时候，就会弹出一个对话框，问你是否确定删除。如何做呢？

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    ...

    <Button
        android:id="@+id/button4"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="删除文件"
        />


</LinearLayout>
```

首先new出一个对话框

> new AlertDialog.Builder(MainActivity.this);

然后进行各种setXxx()方法进行设置对话框的属性，比如标题啊，内容啊，确定按钮啊，取消按钮啊等等

```java
package com.bin23.uitest;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText editText;
    private ImageView imageView;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ...
        Button button4 = (Button)findViewById(R.id.button4);
        ...
        button4.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            ...
            case R.id.button4 :
                AlertDialog.Builder builderDialog = new AlertDialog.Builder(MainActivity.this);
                builderDialog.setTitle("这是Dialog");
                builderDialog.setMessage("这很重要的，确认删除？");
                builderDialog.setCancelable(false);
                builderDialog.setPositiveButton("确认", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                    }
                });
                builderDialog.setNegativeButton("取消", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                    }
                });
                builderDialog.show();
                break;
            default:break;
        }
    }
}
```

### 3种基本布局

为何需要布局？布局可以让我们的控件布局里面可以放控件，也可以放布局，即多层布局嵌套

#### LinearLayout

LinearLayout，线性布局，控件会线性排列

之前的都是垂直方向上进行排列的，为什么呢？因为被属性 android: orientation 指定了排列方向为 vertical

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


</LinearLayout>
```

- 布局Layout属性 android: orientation

  > vertical，垂直排列
  >
  > horizontal，水平排列
  >
  > 注意：
  >
  > - vertical的情况下，内部控件的高度就不能指定为 match_parent，不然就撑开整个屏幕了
  > - horizontal的情况下，内部控件的宽度不能指定为 match_parent，不然一个控件就会独占一行

- 控件属性 android: layout_gravity

  > 这个和之前的android: gravity不同，android: gravity是设置文字在控件中的对齐方式的；
  >
  > android: layout_gravity是设置控件在布局中的对齐方式的
  >
  > 注意：
  >
  > - android: orientation = "vertical"的情况下，

  ```xml
  <!--关于属性   android:layout_gravity-->
      <Button
          android:id="@+id/button1_Linear"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:layout_gravity="top"
          android:text="按钮1" />
  
      <Button
          android:id="@+id/button2_Linear"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:layout_gravity="center_vertical"
          android:text="按钮2" />
  
      <Button
          android:id="@+id/button3_Linear"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:layout_gravity="bottom"
          android:text="按钮3" />
  ```

- 控件属性 android:layout_weight

  > android:layout_weight 允许我们使用比例的方式来指定控件的大小

  ```xml
      <EditText
          android:id="@+id/input_msg"
          android:layout_width="0dp"
          android:layout_height="wrap_content"
          android:layout_weight="1"
          android:hint="给对方发发消息吧" />
  
      <Button
          android:id="@+id/send"
          android:layout_width="0dp"
          android:layout_height="wrap_content"
          android:layout_weight="1"
          android:text="发送消息" />
  ```

  这里设置EditText和Button的宽度都为0dp（规范化写法），配合android:layout_weight使用，由android:layout_weight决定宽度

  这里有点先栅格化的系统，现在两个控件，水平排列，总共分成2份，各自占1份；如果想EditText占3份，Button占2份，那么EditText的该属性的值就写成3，Button的该属性的值就写成2

#### RelativeLayout

相对布局

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    
</RelativeLayout>
```

体会一下

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button1_Relative"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_alignParentTop="true"
        android:text="按钮1" />

    <Button
        android:id="@+id/button2_Relative"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:layout_alignParentTop="true"
        android:text="按钮2" />

    <Button
        android:id="@+id/button3_Relative"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="按钮3" />

    <Button
        android:id="@+id/button4_Relative"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_alignParentBottom="true"
        android:text="按钮4" />

    <Button
        android:id="@+id/button5_Relative"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:layout_alignParentBottom="true"
        android:text="按钮5" />

</RelativeLayout>
```

![相对于父布局定位效果](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20201104134720582.png)

然后可以相对于其他控件进行定位

```xml
    <Button
        android:id="@+id/button1_Relative"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_above="@+id/button3_Relative"
        android:layout_toLeftOf="@+id/button3_Relative"
        android:text="按钮1" />

    <Button
        android:id="@+id/button2_Relative"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button3_Relative"
        android:layout_toRightOf="@+id/button3_Relative"
        android:text="按钮2" />
```

#### FrameLayout

用得比较少

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    
</FrameLayout>
```



### 自定义控件

### ListView

#### 引入ListView标签

引入ListView标签，如下，这样的话，ListView就会填充整个屏幕了

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ListView
        android:id="@+id/listView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        />


</LinearLayout>
```

#### 准备数据以及适配器

ListView是来展示大量数据的，那么现在我们先把数据准备好，数据可以从数据库中获取，现在呢，简单点，就直接把数据存在数组中。然后数组中的数据无法直接传到ListView中，需要使用适配器来完成，这里就用ArrayAdapter，往Adapter的构造方法中传当前Activity、ListView子项布局的id，以及数据源（就是那些要展示的数据）。

最后，通过ListView的setAdapter()方法将适配器对象传进去就ok了

关于ListView子项布局，也就是说，要展示的数据是放在一个布局里，然后这个布局又需要放在ListView这个控件里的，一层套一层

```java
package com.bin23.listviewtest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private String[] data = {
            "Apple",
            "Banana",
            "Orange",
            "Watermelon",
            "Pear",
            "Grape",
            "Pineapple",
            "Strawberry",
            "Cherry",
            "Mango",
            "Apple",
            "Banana",
            "Orange",
            "Watermelon",
            "Pear",
            "Grape",
            "Pineapple",
            "Strawberry",
            "Cherry",
            "Mango",
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // android.R.layout.simple_list_item_1 是Android内置的布局文件，里面只有一个TextView，可以简单地显示一段文本
        ArrayAdapter<String> adapter = new ArrayAdapter<>(
                MainActivity.this, android.R.layout.simple_list_item_1, data);
        ListView listView = (ListView)findViewById(R.id.listView);
        listView.setAdapter(adapter);

    }
}
```

#### 完善

##### 实体类

Fruit

```java
package com.bin23.listviewtest.entity;

public class Fruit {
    private String name;
    private Integer imageId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public Fruit(String name, Integer imageId) {
        this.name = name;
        this.imageId = imageId;
    }
}

```

##### ListView的子项布局

fruit_item.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/fruitImage"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_gravity="center_vertical"
        android:layout_marginLeft="10dp"
        />

    <TextView
        android:id="@+id/fruitName"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical"
        android:layout_marginLeft="10dp"
        />

</LinearLayout>

```

##### 适配器

```java
package com.bin23.listviewtest.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bin23.listviewtest.R;
import com.bin23.listviewtest.entity.Fruit;

import java.util.List;

public class FruitAdapter extends ArrayAdapter<Fruit> {
    private Integer resourceId;

    /**
     * 这个构造方法，用于将Activity的实例、ListView子项布局的id和数据源传递进来
     * @param context
     * @param textViewResourceId
     * @param objects
     */
    public FruitAdapter(Context context, Integer textViewResourceId, List<Fruit> objects){
        super(context, textViewResourceId, objects);
        resourceId = textViewResourceId;
    }

    /**
     * 重写getView()方法，该方法在每个子项被滚动到屏幕内时会被调用
     * @param position
     * @param convertView
     * @param parent
     * @return
     */
    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        // 获取当前的Fruit对象
        Fruit fruit = getItem(position);
        // 通过LayoutInflater的from()方法创建LayoutInflater对象，然后调用inflate()方法动态加载一个布局文件
        // 参数（1.id：要加载的布局文件的id，
        //      2.父布局：给加载好的布局再添加一个父布局，
        //      3.基本写false，表示只让父布局中声明的layout属性生效，不会添加父布局）
        View view = LayoutInflater.from(getContext()).inflate(resourceId, parent, false);
        ImageView fruitImage = (ImageView)view.findViewById(R.id.fruitImage);
        TextView fruitName = (TextView)view.findViewById(R.id.fruitName);
        fruitImage.setImageResource(fruit.getImageId());
        fruitName.setText(fruit.getName());
        return view;
    }
}
```

##### ListView所在的Activity

```java
package com.bin23.listviewtest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.bin23.listviewtest.adapter.FruitAdapter;
import com.bin23.listviewtest.entity.Fruit;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private List<Fruit> fruitList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initFruits();
        FruitAdapter fruitAdapter = new FruitAdapter(MainActivity.this, R.layout.fruit_item, fruitList);
        ListView listView = (ListView)findViewById(R.id.listView);
        listView.setAdapter(fruitAdapter);
    }

    private void initFruits(){
        // 循环两次充满屏幕
        for (int i = 0; i < 2; i++) {
            fruitList.add(new Fruit("Apple", R.drawable.apple_pic));
            fruitList.add(new Fruit("Banana", R.drawable.banana_pic));
            fruitList.add(new Fruit("Cherry", R.drawable.cherry_pic));
            fruitList.add(new Fruit("Grape", R.drawable.grape_pic));
            fruitList.add(new Fruit("Mango", R.drawable.mango_pic));
            fruitList.add(new Fruit("Orange", R.drawable.orange_pic));
            fruitList.add(new Fruit("Pear", R.drawable.pear_pic));
            fruitList.add(new Fruit("Pineapple", R.drawable.pineapple_pic));
            fruitList.add(new Fruit("Strawberry", R.drawable.strawberry_pic));
            fruitList.add(new Fruit("Watermelon", R.drawable.watermelon_pic));
        }
    }
}
```

![ListView的完善](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20201108102811441.png)

#### 优化

对适配器进行优化

##### 对之前加载的布局进行缓存，无需每次都getView()

```java
package com.bin23.listviewtest.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bin23.listviewtest.R;
import com.bin23.listviewtest.entity.Fruit;

import java.util.List;

public class FruitAdapter extends ArrayAdapter<Fruit> {
    
    ...
        
    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        // 获取当前的Fruit对象
        Fruit fruit = getItem(position);
        View view;
        if (convertView == null) {
            // 通过LayoutInflater的from()方法创建LayoutInflater对象，然后调用inflate()方法动态加载一个布局文件
            // 参数（1.id：要加载的布局文件的id，
            //      2.父布局：给加载好的布局再添加一个父布局，
            //      3.基本写false，表示只让父布局中声明的layout属性生效，不会添加父布局）
            view = LayoutInflater.from(getContext()).inflate(resourceId, parent, false);
        } else {
            view = convertView;
        }
        ImageView fruitImage = (ImageView)view.findViewById(R.id.fruitImage);
        TextView fruitName = (TextView)view.findViewById(R.id.fruitName);
        fruitImage.setImageResource(fruit.getImageId());
        fruitName.setText(fruit.getName());
        return view;
    }
}

```

##### 使用ViewHolder，无需每次调用getView()时调用findViewById()

完整的适配器代码如下

```java
package com.bin23.listviewtest.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bin23.listviewtest.R;
import com.bin23.listviewtest.entity.Fruit;

import java.util.List;

public class FruitAdapter extends ArrayAdapter<Fruit> {
    private Integer resourceId;

    /**
     * 这个构造方法，用于将Activity的实例、ListView子项布局的id和数据源传递进来
     * @param context
     * @param textViewResourceId
     * @param objects
     */
    public FruitAdapter(Context context, Integer textViewResourceId, List<Fruit> objects){
        super(context, textViewResourceId, objects);
        resourceId = textViewResourceId;
    }

    /**
     * 重写getView()方法，该方法在每个子项被滚动到屏幕内时会被调用
     * @param position
     * @param convertView
     * @param parent
     * @return
     */
    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        // 获取当前的Fruit对象
        Fruit fruit = getItem(position);
        View view;
        ViewHolder viewHolder;
        if (convertView == null) {
            // 通过LayoutInflater的from()方法创建LayoutInflater对象，然后调用inflate()方法动态加载一个布局文件
            // 参数（1.id：要加载的布局文件的id，
            //      2.父布局：给加载好的布局再添加一个父布局，
            //      3.基本写false，表示只让父布局中声明的layout属性生效，不会添加父布局）
            view = LayoutInflater.from(getContext()).inflate(resourceId, parent, false);
            viewHolder = new ViewHolder();
            viewHolder.fruitImage = (ImageView) view.findViewById(R.id.fruitImage);
            viewHolder.fruitName = (TextView) view.findViewById(R.id.fruitName);
            // 将 ViewHolder 存储到 View 中 
            view.setTag(viewHolder);
        } else {
            view = convertView;
            //重新获取 ViewHolder
            viewHolder = (ViewHolder)view.getTag();
        }
        // 无需每次都调用 findViewById()
//        ImageView fruitImage = (ImageView)view.findViewById(R.id.fruitImage);
//        TextView fruitName = (TextView)view.findViewById(R.id.fruitName);
        viewHolder.fruitImage.setImageResource(fruit.getImageId());
        viewHolder.fruitName.setText(fruit.getName());
        return view;
    }
    
    class ViewHolder {
        ImageView fruitImage;
        TextView fruitName;
    }
}

```

#### ListView的点击事件

##### 为ListView设置一个监听器

使用ListView的setOnItemClickListener()方法

```java
		listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Fruit fruit = fruitList.get(position);
                Toast.makeText(MainActivity.this, fruit.getName(), Toast.LENGTH_SHORT).show();
            }
        });
```

完整代码如下

```java
package com.bin23.listviewtest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.bin23.listviewtest.adapter.FruitAdapter;
import com.bin23.listviewtest.entity.Fruit;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private List<Fruit> fruitList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initFruits();
        FruitAdapter fruitAdapter = new FruitAdapter(MainActivity.this, R.layout.fruit_item, fruitList);
        ListView listView = (ListView)findViewById(R.id.listView);
        listView.setAdapter(fruitAdapter);
        
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Fruit fruit = fruitList.get(position);
                Toast.makeText(MainActivity.this, fruit.getName(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void initFruits(){
        // 循环两次充满屏幕
        for (int i = 0; i < 2; i++) {
            fruitList.add(new Fruit("Apple", R.drawable.apple_pic));
            fruitList.add(new Fruit("Banana", R.drawable.banana_pic));
            fruitList.add(new Fruit("Cherry", R.drawable.cherry_pic));
            fruitList.add(new Fruit("Grape", R.drawable.grape_pic));
            fruitList.add(new Fruit("Mango", R.drawable.mango_pic));
            fruitList.add(new Fruit("Orange", R.drawable.orange_pic));
            fruitList.add(new Fruit("Pear", R.drawable.pear_pic));
            fruitList.add(new Fruit("Pineapple", R.drawable.pineapple_pic));
            fruitList.add(new Fruit("Strawberry", R.drawable.strawberry_pic));
            fruitList.add(new Fruit("Watermelon", R.drawable.watermelon_pic));
        }
    }
}
```

![点击ListView的效果](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20201108110248283.png)

### 自定义控件

#### 标题栏

1. 写自定义标题栏的布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/title_bg">

    <Button
        android:id="@+id/title_back"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_margin="5dp"
        android:background="@drawable/back_bg"
        android:text="Back"
        android:textColor="#fff" />

    <TextView
        android:id="@+id/title_text"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_weight="1"
        android:gravity="center"
        android:text="Title Text"
        android:textColor="#fff"
        android:textSize="24sp" />

    <Button
        android:id="@+id/title_edit"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_margin="5dp"
        android:background="@drawable/edit_bg"
        android:text="Edit"
        android:textColor="#fff" />

</LinearLayout>
```

2. 使用getSupportActionBar()方法隐藏默认的标题栏

```java
package com.bin23.uicustomviews;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //隐藏默认的标题栏
        ActionBar actionbar = getSupportActionBar();
        if (actionbar != null) {
            actionbar.hide();
        }

    }
}
```

3. 定义一个Layout类，继承LinearLayout，进行逻辑实现

TitleLayout

```java
package com.bin23.uicustomviews.layout;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.bin23.uicustomviews.R;


public class TitleLayout extends LinearLayout {

    public TitleLayout (Context context, AttributeSet attributeSet){
        super(context, attributeSet);
        // LayoutInflater的from构建LayoutInflater对象，然后使用inflate()方法加载布局文件
        LayoutInflater.from(context).inflate(R.layout.title, this);

        Button edit=(Button) findViewById(R.id.title_edit);
        Button back=(Button) findViewById(R.id.title_back);

        edit.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                Toast.makeText(getContext(), "Edit", Toast.LENGTH_SHORT).show();
            }
        });
        back.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                Toast.makeText(getContext(), "Back", Toast.LENGTH_SHORT).show();
            }
        });

    }
}

```

4. 引入标题栏

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

<!-- <include layout="@layout/title" /> -->

    <com.bin23.uicustomviews.layout.TitleLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>


</LinearLayout>
```

最终效果如下

![标题栏效果](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20201111111435405.png)

### RecyclerView

实现和ListView同样的效果

#### 添加依赖

打开app/build.gradle，添加下面的依赖，这样在所有Android系统版本上都能使用了

> implementation 'androidx.recyclerview:recyclerview:1.1.0'
>
> 这里版本号可能不同，前面基本都一样，如果不一样，Android Studio会提醒你

![Android Studio会提醒最新1.1.0](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20201108111214320.png)

```gradle
...
dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    implementation 'androidx.recyclerview:recyclerview:1.1.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```

![进行同步](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20201108111411148.png)

#### 引入标签

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        />


</LinearLayout>
```

#### 准备

Fruit

```java
package com.bin23.recyclerviewtest.entity;

public class Fruit {
    private String name;
    private Integer imageId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public Fruit(String name, Integer imageId) {
        this.name = name;
        this.imageId = imageId;
    }
}
```

fruit_item.xml

这里注意别写成match_parent，这样的话，运行出的效果会出现一个子项占一个屏幕的情况，需要改成**wrap_content**

![item.xml的宽高](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20201108152009525.png)

完整代码如下

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <ImageView
        android:id="@+id/fruitImage"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_gravity="center_vertical"
        android:layout_marginLeft="10dp"
        />

    <TextView
        android:id="@+id/fruitName"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical"
        android:layout_marginLeft="10dp"
        />

</LinearLayout>

```

#### 适配器

```java
package com.bin23.recyclerviewtest.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bin23.recyclerviewtest.R;
import com.bin23.recyclerviewtest.entity.Fruit;

import java.util.List;

/**
 * 继承 RecyclerView.Adapter
 * 就需要重写三个方法
 *      1. onCreateViewHolder()
 *      2. onBindViewHolder()
 *      3. getItemCount()
 */
public class FruitAdapter extends RecyclerView.Adapter<FruitAdapter.ViewHolder> {
    private List<Fruit> fruitList;

    static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView fruitImage;
        TextView fruitName;

        /**
         *
         * @param view 通常就是 RecyclerView 的子项布局
         */
        public ViewHolder(View view){
            super(view);
            fruitImage = (ImageView)view.findViewById(R.id.fruitImage);
            fruitName = (TextView)view.findViewById(R.id.fruitName);
        }
    }

    /**
     * 主要就是把数据源传进这个适配器
     * @param fruitList
     */
    public FruitAdapter(List<Fruit> fruitList) {
        this.fruitList = fruitList;
    }

    /**
     * 加载 fruit_item 布局，然后创建 ViewHolder 实例
     * @param parent
     * @param viewType
     * @return
     */
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fruit_item, parent, false);
        ViewHolder holder = new ViewHolder(view);
        return holder;
    }

    /**
     * 对 RecyclerView 子项的数据进行赋值
     * @param holder
     * @param position
     */
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Fruit fruit = fruitList.get(position);
        holder.fruitImage.setImageResource(fruit.getImageId());
        holder.fruitName.setText(fruit.getName());
    }

    /**
     * 告知我们 RecyclerView 的子项有多少个
     * @return
     */
    @Override
    public int getItemCount() {
        return fruitList.size();
    }
}
```

#### RecyclerView所在的Activity

```java
package com.bin23.recyclerviewtest;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import com.bin23.recyclerviewtest.adapter.FruitAdapter;
import com.bin23.recyclerviewtest.entity.Fruit;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private List<Fruit> fruitList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initFruits();
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(linearLayoutManager);
        FruitAdapter fruitAdapter = new FruitAdapter(fruitList);
        recyclerView.setAdapter(fruitAdapter);
    }

    private void initFruits(){
        // 循环两次充满屏幕
        for (int i = 0; i < 2; i++) {
            fruitList.add(new Fruit("Apple", R.drawable.apple_pic));
            fruitList.add(new Fruit("Banana", R.drawable.banana_pic));
            fruitList.add(new Fruit("Cherry", R.drawable.cherry_pic));
            fruitList.add(new Fruit("Grape", R.drawable.grape_pic));
            fruitList.add(new Fruit("Mango", R.drawable.mango_pic));
            fruitList.add(new Fruit("Orange", R.drawable.orange_pic));
            fruitList.add(new Fruit("Pear", R.drawable.pear_pic));
            fruitList.add(new Fruit("Pineapple", R.drawable.pineapple_pic));
            fruitList.add(new Fruit("Strawberry", R.drawable.strawberry_pic));
            fruitList.add(new Fruit("Watermelon", R.drawable.watermelon_pic));
        }
    }
}
```

![RecyclerView的效果](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20201108152325671.png)

### RecyclerView的点击事件

点击事件交给具体的view去实现，下面对适配器进行修改

```java
package com.bin23.recyclerviewtest.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bin23.recyclerviewtest.R;
import com.bin23.recyclerviewtest.entity.Fruit;

import java.util.List;

/**
 * 继承 RecyclerView.Adapter
 * 就需要重写三个方法
 *      1. onCreateViewHolder()
 *      2. onBindViewHolder()
 *      3. getItemCount()
 */
public class FruitAdapter extends RecyclerView.Adapter<FruitAdapter.ViewHolder> {
    private List<Fruit> fruitList;

    static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView fruitImage;
        TextView fruitName;
        // 点击事件由具体的 View 去实现
        // 用来保存子项最外层布局的实例，然后在onCreateViewHolder()方法中实现点击事件就可以了
        View fruitView;

        /**
         *
         * @param view 通常就是 RecyclerView 的子项布局
         */
        public ViewHolder(View view){
            super(view);
            fruitImage = (ImageView)view.findViewById(R.id.fruitImage);
            fruitName = (TextView)view.findViewById(R.id.fruitName);
            fruitView = view;
        }
    }

    /**
     * 主要就是把数据源传进这个适配器
     * @param fruitList
     */
    public FruitAdapter(List<Fruit> fruitList) {
        this.fruitList = fruitList;
    }

    /**
     * 加载 fruit_item 布局，然后创建 ViewHolder 实例
     * @param parent
     * @param viewType
     * @return
     */
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fruit_item, parent, false);
        final ViewHolder holder = new ViewHolder(view);
        holder.fruitView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 获取用户点击的 position
                int adapterPosition = holder.getAdapterPosition();
                Fruit fruit = fruitList.get(adapterPosition);
                Toast.makeText(v.getContext(), "你点击了 view " + fruit.getName(), Toast.LENGTH_SHORT).show();
            }
        });
        holder.fruitImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int adapterPosition = holder.getAdapterPosition();
                Fruit fruit = fruitList.get(adapterPosition);
                Toast.makeText(v.getContext(), "你点击了 image " + fruit.getName(), Toast.LENGTH_SHORT).show();
            }
        });
        return holder;
    }

    /**
     * 对 RecyclerView 子项的数据进行赋值
     * @param holder
     * @param position
     */
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Fruit fruit = fruitList.get(position);
        holder.fruitImage.setImageResource(fruit.getImageId());
        holder.fruitName.setText(fruit.getName());
    }

    /**
     * 告知我们 RecyclerView 的子项有多少个
     * @return
     */
    @Override
    public int getItemCount() {
        return fruitList.size();
    }
}

```



### RecyclerView 实现横向滚动与瀑布流布局

交给LinearLayoutManager

#### 横向滚动

item.xml 设置里面的元素垂直排列，默认元素的排列方式是水平排列的

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="100dp"
    android:layout_height="wrap_content">

    <ImageView
        android:id="@+id/fruitImage"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        />

    <TextView
        android:id="@+id/fruitName"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="10dp"
        />

</LinearLayout>

```



Activity

1. new 出LinearLayoutManager

> ```java
> LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
> ```

2. 设置布局为水平方向排列

> ```java
> linearLayoutManager.setOrientation(LinearLayoutManager.HORIZONTAL);
> ```

完整代码如下

```java
package com.bin23.recyclerviewtest;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import com.bin23.recyclerviewtest.adapter.FruitAdapter;
import com.bin23.recyclerviewtest.entity.Fruit;

import java.util.ArrayList;
import java.util.List;

public class SecondActivity extends AppCompatActivity {

    private List<Fruit> fruitList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.second_activity);

        initFruits();
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
        linearLayoutManager.setOrientation(LinearLayoutManager.HORIZONTAL);
        recyclerView.setLayoutManager(linearLayoutManager);
        FruitAdapter fruitAdapter = new FruitAdapter(fruitList);
        recyclerView.setAdapter(fruitAdapter);
    }

    private void initFruits(){
        // 循环两次充满屏幕
        for (int i = 0; i < 2; i++) {
            fruitList.add(new Fruit("Apple", R.drawable.apple_pic));
            fruitList.add(new Fruit("Banana", R.drawable.banana_pic));
            fruitList.add(new Fruit("Cherry", R.drawable.cherry_pic));
            fruitList.add(new Fruit("Grape", R.drawable.grape_pic));
            fruitList.add(new Fruit("Mango", R.drawable.mango_pic));
            fruitList.add(new Fruit("Orange", R.drawable.orange_pic));
            fruitList.add(new Fruit("Pear", R.drawable.pear_pic));
            fruitList.add(new Fruit("Pineapple", R.drawable.pineapple_pic));
            fruitList.add(new Fruit("Strawberry", R.drawable.strawberry_pic));
            fruitList.add(new Fruit("Watermelon", R.drawable.watermelon_pic));
        }
    }
}
```

### RecyclerView总结

1. 先添加依赖，implementation 'androidx.recyclerview:recyclerview:1.1.0'

2. 在某个Activity布局文件中引入RecyclerView的标签

   ```xml
   	<androidx.recyclerview.widget.RecyclerView
           android:id="@+id/recyclerView"
           android:layout_width="match_parent"
           android:layout_height="match_parent"
           />
   ```

3. 准备需要显示在RecyclerView中的实体类，还有实体列表布局文件

4. 准备实体适配器，该适配器继承RecyclerView.Adapter，重写三个方法

    *      onCreateViewHolder() // 加载 实体列表（比如 fruit_item） 布局，然后创建 ViewHolder 实例
    *      onBindViewHolder() // 对 RecyclerView 子项的数据进行赋值
    *      getItemCount()  // 告知我们 RecyclerView 的子项有多少个

5. 在这个Activity中加载RecyclerView，主要就两件事

   - recyclerView.setLayoutManager()，设置布局管理器，说明该RecyclerView是在何种布局中的
   - recyclerView.setAdapter()，设置适配器，用来显示实体的

## 第n周

### Fragment

#### 简单用法

在一个Activity种添加两个Fragment，并让这两个Fragment平分Activity

左侧Fragment布局，一个按钮，水平居中

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:text="按钮"
        />

</LinearLayout>
```

右侧Fragment布局，一个TextView显示文本

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:background="#ee00ee"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:textSize="24sp"
        android:text="这是右边的fragment"
        />

</LinearLayout>
```

LeftFragment类，让它继承androidx.fragment.app.Fragment

```java
package com.bin23.fragmenttest;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class LeftFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // 使用LayoutInflater的inflate()方法动态加载left_fragment布局
        return inflater.inflate(R.layout.left_fragment, container, false);
    }
}
```

RightFragment类

```java
package com.bin23.fragmenttest;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class RightFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // 使用LayoutInflater的inflate()方法动态加载right_fragment布局
        return inflater.inflate(R.layout.right_fragment, container, false);
    }
}
```

修改activity_main.xml

使用fragment标签，可以在布局中添加Fragment，主要需要记得加上name属性，写上全类名

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/leftFrag"
        android:name="com.bin23.fragmenttest.LeftFragment"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        />

    <fragment
        android:id="@+id/rightFrag"
        android:name="com.bin23.fragmenttest.RightFragment"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        />

</LinearLayout>
```

![简单用法-Fragment](https://gitee.com/god23bin/blog-pic-bed/raw/master/image-20201125095627082.png)

总结：

1. 想要Fragment就需要相对应的布局
2. 需要在Fragment类中进行加载布局
3. 在主布局文件中引入fragment，通过fragment标签

#### 动态添加Fragment

新的fragment布局

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:background="#ffff00"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:textSize="24sp"
        android:text="这是另一个的fragment"
        />

</LinearLayout>
```

fragment

```java
package com.bin23.fragmenttest;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class AnotherRightFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // 使用LayoutInflater的inflate()方法动态加载another_right_fragment布局
        return inflater.inflate(R.layout.another_right_fragment, container, false);
    }
}

```

activity_main.xml，使用某种Layout

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/leftFrag"
        android:name="com.bin23.fragmenttest.LeftFragment"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        />

    <!-- fragment标签 换成 FrameLayout标签-->
    <FrameLayout
        android:id="@+id/rightLayout"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        />

</LinearLayout>
```

主Activity中写替换的方法

```java
package com.bin23.fragmenttest;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button = (Button) findViewById(R.id.button);
        button.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.button:
                replaceFragment(new AnotherRightFragment());
                break;
            default:
                break;
        }
    }

    /**
     * 1. 写好待添加的Fragment实例
     * 2. 通过getSupportFragmentManager()获取FragmentManager
     * 3. 通过获取的FragmentManager调用beginTransaction()开启一个事务
     * 4. 向事务添加或替换Fragment，一般使用repalce()方法实现
     * 5. 提交事务
     * @param fragment 待添加的Fragment实例
     */
    private void replaceFragment(Fragment fragment){
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.replace(R.id.rightLayout, fragment);
        transaction.commit();
    }
}
```

总结：

1. 写好待添加的Fragment的代码，就布局和类
2. 在放置Fragment的布局文件中添加子项布局标签
3. 往子项布局中替换Fragment，实现动态添加Fragment

## 继续学习

### 广播

顾名思义，就是广播，App可以对喜欢的广播进行注册，这样就能接收喜欢的广播，这些广播可以来自系统，还可以是其他App。

广播有两种

- 标准广播（异步，不可截断）
- 有序广播（同步，可截断，按优先级来）

然后，你可以发送广播，也可以接收广播

发送广播就借助Intent，接收广播就使用**广播接收器**，这是一个新概念

### 接收系统广播

接收广播，主要接收系统广播。

如何注册广播？

两种方法

1. 在代码中注册（**动态注册**）
2. 在AndroidManifest.xml中注册（**静态注册**）

如何创建广播接收器？

简单，写一个类，继承BroadcastReceiver，重写onReceive()方法

### 动态注册

MainActivity为例，写一个内部类，继承BroadcastReceiver

```java
package com.bin23.broadcasttest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private IntentFilter intentFilter;
    private NetworkChangeReceiver networkChangeReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // 为需要监听的广播做准备
        intentFilter = new IntentFilter();
        // 添加监听的事件，系统网络变化广播
        intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
        networkChangeReceiver = new NetworkChangeReceiver();
        registerReceiver(networkChangeReceiver, intentFilter);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 一定要注销掉
        unregisterReceiver(networkChangeReceiver);
    }

    static class NetworkChangeReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            Toast.makeText(context, "网络状态发生改变了", Toast.LENGTH_SHORT).show();
        }
    }
}
```

### 静态注册

创建启动的广播接收器，重写方法

BootCompleteReceiver

```java
package com.bin23.broadcasttest;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class BootCompleteReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "Boot 完成", Toast.LENGTH_LONG).show();
    }
}
```



声明权限

```xml
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
```



```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bin23.broadcasttest">

    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <receiver
            android:name=".BootCompleteReceiver"
            android:enabled="true"
            android:exported="true"></receiver>

        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

### 自定义广播

广播接收器

```java
package com.bin23.broadcasttest;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class MyBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "接收到自定义广播", Toast.LENGTH_LONG).show();
        String data = intent.getExtras().getString("data");
        Toast.makeText(context, data, Toast.LENGTH_LONG).show();
    }
}
```

布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    >

    <Button
        android:id="@+id/button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="发送广播"
        />

</LinearLayout>
```

AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bin23.broadcasttest">

    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <!--注册广播接收器-->
        <receiver
            android:name=".MyBroadcastReceiver"
            android:enabled="true"
            android:exported="true">
            <!--监听该广播，可以让MyBroadcastReceiver接收到值为com.bin23.broadcasttest.MY_BROADCAST的广播-->
            <intent-filter>
                <action android:name="com.bin23.broadcasttest.MY_BROADCAST"/>
            </intent-filter>
        </receiver>
        <receiver
            android:name=".BootCompleteReceiver"
            android:enabled="true"
            android:exported="true" />

        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

然后修改MainActivity

MainActivity

```java
package com.bin23.broadcasttest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private IntentFilter intentFilter;
    private NetworkChangeReceiver networkChangeReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        // 为需要监听的广播做准备
//        intentFilter = new IntentFilter();
//        // 添加监听的事件，系统网络变化广播
//        intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
//        networkChangeReceiver = new NetworkChangeReceiver();
//        registerReceiver(networkChangeReceiver, intentFilter);
        Button button = (Button)findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 发送的广播
                Intent intent = new Intent("com.bin23.broadcasttest.MY_BROADCAST");
                intent.putExtra("data", "我是intent传送给广播接收器的数据");
                sendBroadcast(intent);
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 一定要注销掉
        unregisterReceiver(networkChangeReceiver);
    }

    static class NetworkChangeReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            Toast.makeText(context, "网络状态发生改变了", Toast.LENGTH_SHORT).show();
        }
    }
}
```

#### 另一个应用接受广播

新建一个广播接收器

```java
public class AnotherBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "接受到了广播在这个AnotherBroadcastReceiver", Toast.LENGTH_SHORT).show();
    }
}
```

AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bin23.broadcasttest2">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <receiver
            android:name=".AnotherBroadcastReceiver"
            android:enabled="true"
            android:exported="true">
            <!--监听广播，接收另一个App的广播-->
            <intent-filter>
                <action android:name="com.bin23.broadcasttest.MyBroadcastReceiver"/>
            </intent-filter>

        </receiver>

        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

去测试

#### 发送有序广播

设置优先级

AndroidManifest.xml

```xml
<intent-filter android:priority="100">
    <action android:name="com.bin23.broadcasttest.MyBroadcastReceiver"/>
</intent-filter>
```

### 本地广播



## 第n+1周

### 数据存储相关

数据持久化有3种

1. 文件存储
2. SharedPreference
3. 数据库

### 文件存储

核心就是Context类中提供的openFileInput()和onpenFileOutput()，之后就用IO流进行操作

### SharedPreference

它是使用键值对的方式来存储数据的

如何使用？

1. 先获取SharedPreferences对象，有3种方法

- Context类中的getSharedPreferences()方法
- Activity类中的getSharedPreferences()方法
- PreferenceManager类中的getDefaultSharedPreferences()方法

2. 开始向SharedPreferences文件中存储数据，3步

- 调用SharedPreferences对象的edit()方法获取SharedPreferences.Editor对象
- 向SharedPreferences.Editor对象添加数据
- 调用apply()方法进行提交数据，完成数据存储

开始测试**存储数据**以及**读取数据**

布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <Button
        android:id="@+id/save_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="保存数据"
        />

    <Button
        android:id="@+id/restore_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="恢复数据"
        />

</LinearLayout>
```

MainActivity

```java
package com.bin23.sharedpreferencestest;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button saveDataBtn = (Button)findViewById(R.id.save_data);
        saveDataBtn.setOnClickListener(new View.OnClickListener() {
            @SuppressLint("CommitPrefEdits")
            @Override
            public void onClick(View v) {
                // 指定SharedPreferences文件名为data
                SharedPreferences.Editor editor = getSharedPreferences("data", MODE_PRIVATE).edit();
                editor.putString("name", "LeBron");
                editor.putInt("age", 36);
                editor.putBoolean("married", false);
                // 进行提交，完成存储操作
                editor.apply();
            }
        });

        Button restoreDataBtn = (Button)findViewById(R.id.restore_data);
        restoreDataBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPreferences pref = getSharedPreferences("data", MODE_PRIVATE);
                String name = pref.getString("name", "");
                int age = pref.getInt("age", 0);
                boolean married = pref.getBoolean("married", false);
                Log.d("MainActivity", "name is " + name);
                Log.d("MainActivity", "age is " + age);
                Log.d("MainActivity", "married is " + married);
            }
        });
    }
}
```





### SQLite数据库

SQLiteOpenHelper是一个抽象类

它有两个抽象方法，分别是onCreate()和onUpgrade()，必须自己写帮助类去实现这两个方法，在这两个方法中实现创建、升级数据库的逻辑

还有两个重要的实例方法，可以打开或创建一个数据库

- getReadableDatabase()
- getWritableDatabase()

需要写一个类，比如MyDatabaseHelper，去继承SQLiteOpenHelper

```java
package com.bin23.databasetest;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.widget.Toast;

public class MyDatabaseHelper extends SQLiteOpenHelper {
    public static final String CREATE_BOOK = "create table Book("
            + "id integer primary key autoincrement, "
            + "author text, "
            + "price real, "
            + "pages integer, "
            + "name text) ";

    private Context mContext;

    public MyDatabaseHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
        mContext = context;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // 调用execSQL()方法执行建表语句，保证数据库创建完成的同时还能成功创建Book表
        db.execSQL(CREATE_BOOK);
        Toast.makeText(mContext, "创建成功", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}

```



配置adb.exe环境变量

D:\SoftWare\Android\android-sdk\platform-tools\adb.exe

在cmd输入以下命令进入设备的控制台了

```shell

```



```shell
adb shell
su
chmod 777 -R data
cd /data/data/com.xxxx/databases
```

然后使用sqlite命令，打开数据库

```shell
sqlite3 数据库名.db
```

### 进行CRUD

- getReadableDatabase()
- getWritableDatabase()

它们会返回SQLiteDatabase对象，利用它进行CRUD

布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    >

    <Button
        android:id="@+id/create_database"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="创建数据库"
        />

    <Button
        android:id="@+id/add_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="添加数据"
        />

    <Button
        android:id="@+id/update_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="更新数据"
        />

    <Button
        android:id="@+id/delete_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="删除数据"
        />

    <Button
        android:id="@+id/query_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="查询数据"
        />

</LinearLayout>
```

MainActivity

```java
package com.bin23.databasetest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    private MyDatabaseHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // 创建一个MyDatabaseHelper对象，通过构造函数将数据库名指定为BookStore.db，版本号为1
        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);
        Button createDatabase = (Button) findViewById(R.id.create_database);
        createDatabase.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 点击事件调用getWritableDatabase()方法
                // 第一次点击，发现没有这个数据库，就会创建该数据库，并调用创建一个MyDatabaseHelper中的onCreate()方法
                // 于是Book表也就创建了
                // 第二次点击就不会再创建一次了
                dbHelper.getWritableDatabase();
            }
        });
        //
        Button addData = (Button) findViewById(R.id.add_data);
        addData.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                ContentValues values = new ContentValues();
                // 开始组装第一条数据
                values.put("name", "The Da Vinci Code");
                values.put("author", "Dan Brown");
                values.put("pages", 454);
                values.put("price", 16.96);
                db.insert("Book", null, values); // 插入第一条数据
                values.clear();
                // 开始组装第二条数据
                values.put("name", "The Lost Symbol");
                values.put("author", "Dan Brown");
                values.put("pages", 510);
                values.put("price", 19.95);
                db.insert("Book", null, values); // 插入第二条数据
            }
        });
        Button updateData = (Button) findViewById(R.id.update_data);
        updateData.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                ContentValues values = new ContentValues();
                values.put("price", 10.99);
                db.update("Book", values, "name = ?", new String[] { "The Da Vinci Code" });
            }
        });
        Button deleteButton = (Button) findViewById(R.id.delete_data);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                db.delete("Book", "pages > ?", new String[] { "500" });
            }
        });
        Button queryButton = (Button) findViewById(R.id.query_data);
        queryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                // 查询Book表中所有的数据
                Cursor cursor = db.query("Book", null, null, null, null, null, null);
                if (cursor.moveToFirst()) {
                    do {
                        // 遍历Cursor对象，取出数据并打印
                        String name = cursor.getString(cursor.getColumnIndex("name"));
                        String author = cursor.getString(cursor.getColumnIndex("author"));
                        int pages = cursor.getInt(cursor.getColumnIndex("pages"));
                        double price = cursor.getDouble(cursor.getColumnIndex("price"));
                        Log.d("MainActivity", "book name is " + name);
                        Log.d("MainActivity", "book author is " + author);
                        Log.d("MainActivity", "book pages is " + pages);
                        Log.d("MainActivity", "book price is " + price);
                    } while (cursor.moveToNext());
                }
                cursor.close();
            }
        });

    }
}
```

#### 习惯的用法，通过SQL进行CRUD

增删改通过db.execSQL()

查就使用db.rawQurey()

### 推荐使用LitePal

添加依赖

app下的build.gradle

```gradle
dependencies {
    implementation 'org.litepal.guolindev:core:3.1.1'
}
```

在main目录下新建文件assets文件夹，然后新建litepal.xml文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<litepal>
    <dbname value="BookStore"></dbname>
    <version value="1"></version>

    <list>
        
    </list>
</litepal>
```

写一个Entity，就普通JavaBean

```java
package com.bin23.litepaltest.entity;

public class Book {
    private int id;
    private String author;
    private double price;
    private int pages;
    private String name;

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", author='" + author + '\'' +
                ", price=" + price +
                ", pages=" + pages +
                ", name='" + name + '\'' +
                '}';
    }

    public Book() {
    }

    public Book(int id, String author, double price, int pages, String name) {
        this.id = id;
        this.author = author;
        this.price = price;
        this.pages = pages;
        this.name = name;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    >

    <Button
        android:id="@+id/create_database"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="创建数据库"
        />

    <Button
        android:id="@+id/add_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="添加数据"
        />

    <Button
        android:id="@+id/update_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="更新数据"
        />

    <Button
        android:id="@+id/delete_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="删除数据"
        />

    <Button
        android:id="@+id/query_data"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="查询数据"
        />

    

</LinearLayout>
```

MainActivity

```java
package com.bin23.litepaltest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import org.litepal.tablemanager.Connector;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button createDatabase = (Button) findViewById(R.id.create_database);
        createDatabase.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // org.litepal.tablemanager.Connector
                Connector.getDatabase();
            }
        });
    }
}
```

如果要更新数据库的话，比如添加字段，添加某个类，那么直接添加，然后修改版本号，再次创建数据库就OK，它不会使以前的数据丢失，超级方便

## 数据共享

### 权限的申请

主要逻辑如下，这里申请直接打电话的权限

```java
package com.bin23.runtimepermissiontest;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button makeCall = (Button) findViewById(R.id.make_call);
        makeCall.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 判断用户是否已经给我们授权了
                // 使用ContextCompat.checkSelfPermission()方法
                // 将返回值与PackageManager.PERMISSION_GRANTED作比较，相等就代表授权了
                if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CALL_PHONE)!= PackageManager.PERMISSION_GRANTED) {
                    // 没有授权，调用ActivityCompat.requestPermissions()方法向用户申请权限
                    ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CALL_PHONE},1);
                    // 不管拒绝与否，都会回调到onRequestPermissionsResult()方法中，授权结果封装在grantResults中
                } else {
                    call();
                }
//                try {
//                    Intent intent = new Intent(Intent.ACTION_CALL);
//                    intent.setData(Uri.parse("tel:10086"));
//                    startActivity(intent);
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
            }
        });
    }

    private void call() {
        try {
            Intent intent = new Intent(Intent.ACTION_CALL);
            intent.setData(Uri.parse("tel:10086"));
            startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode){
            case 1:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    call();
                } else {
                    Toast.makeText(this, "你拒绝了允许请求", Toast.LENGTH_SHORT).show();
                }
                break;
            default:
        }
    }
}
```

声明权限

```xml
<uses-permission android:name="android.permission.CALL_PHONE" />
```

AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bin23.runtimepermissiontest">

    <uses-permission android:name="android.permission.CALL_PHONE" />

    <application
        ...
    </application>

</manifest>
```

### 访问其他程序的数据

这里以访问手机联系人为例

布局文件

```java
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    >

    <ListView
        android:id="@+id/contracts_lv"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >

    </ListView>

</LinearLayout>j
```

MainActivity

```java
package com.bin23.contractstest;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    ArrayAdapter<String> adapter;
    // ListView的数据源
    List<String> contactsList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ListView contactsLv = (ListView) findViewById(R.id.contracts_lv);
        adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, contactsList);
        contactsLv.setAdapter(adapter);
        // 判断是否授权给我们
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_CONTACTS)!= PackageManager.PERMISSION_GRANTED) {
            // 没有的话直接申请
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.READ_CONTACTS}, 1);
        }else{
            // 有的话直接读取联系人
            readContacts();
        }
    }

    /**
     * 读取联系人
     */
    private void readContacts(){
        Cursor cursor = null;
        try {
            // 查询联系人数据
            // 利用ContentResolver的query()方法查询
            // ContactsContract.CommonDataKinds.Phone类的常量 - CONTENT_URI，已经帮我们封装好了Uri.parse()解析出来的结果
            cursor = getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null,null);
            if (cursor!=null) {
                // 遍历cursor
                while(cursor.moveToNext()){
                    // 获取联系人姓名
                    String displayName = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
                    // 获取联系人手机号
                    String number = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                    // 进行拼接，放到ListView的数据源里
                    contactsList.add(displayName + "\n" + number);
                }
                adapter.notifyDataSetChanged();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode){
            case 1:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    readContacts();
                } else {
                    Toast.makeText(this, "你拒绝了允许", Toast.LENGTH_SHORT).show();
                }
                break;
            default:
        }
    }
}
```

声明权限

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bin23.contractstest">

    <uses-permission android:name="android.permission.READ_CONTACTS"/>
    
    <application
        ...
    </application>

</manifest>
```