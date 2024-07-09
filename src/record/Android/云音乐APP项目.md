---
# 这是文章的标题
title: 云音乐APP项目
# 这是页面的图标
# icon: 
# 这是侧边栏的顺序
order: 4
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

## 项目的构建

### 构建

1. 直接在Android Studio新建项目。

2. 写一个全局的`Application`类，用于存储一些系统信息。

   - 该类实现onCreate方法

   ```java
   package com.bin23.music;
   
   import android.app.Application;
   
   public class MyApplication extends Application {
       @Override
       public void onCreate() {
           super.onCreate();
       }
   }
   ```

   - 在`AndroidMainifest.xml`中声明`MyApplication`, 使`MyApplication`生效，主要做法就是在application标签中加个name属性，如下：

   ```xml
   <application
           android:name=".MyApplication"
           ...
                >
       ...
   </application>
   ```

3. 写一个`BaseActivity`类继承`Activity`作为项目中`所有Activity的父类`用来描述`所有Activity的共性`。

   ```java
   package com.bin23.music.activities;
   
   import android.app.Activity;
   import android.os.Bundle;
   
   import androidx.annotation.Nullable;
   
   public class BaseActivity extends Activity {
       @Override
       protected void onCreate(@Nullable Bundle savedInstanceState) {
           super.onCreate(savedInstanceState);
       }
   }
   ```

4. 使`MainActivity`也继承`BaseActivity`。

### 样式的小修改

样式的修改基本在res这个目录下面。

#### 修改statusBar颜色

1. 修改res/values/colors.xml

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <resources>
       <color name="colorPrimary">#6200EE</color>
       <color name="colorPrimaryDark">#3700B3</color>
       <color name="colorAccent">#03DAC5</color>
       
       <!-- 定义自己的主色调 -->
       <color name="mainColor">#d43433</color>
   </resources>
   ```

   这里定义了主色调为红色。

2. 修改res/values/styles.xml

   ```xml
   <resources>
       <!-- Base application theme. -->
       <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
           <!-- Customize your theme here. -->
           <!-- 注释掉默认的主题颜色 -->
   <!--        <item name="colorPrimary">@color/colorPrimary</item>-->
   <!--        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>-->
   <!--        <item name="colorAccent">@color/colorAccent</item>-->
           <!-- 使用我们自己定义的主色调 -->
           <item name="colorPrimaryDark">@color/mainColor</item>
       </style>
   
   </resources>
   ```

以上，整体基本OK。

## 欢迎页面

### WelcomeActivity

1. 新建`WelcomeActivity`作为欢迎页面的Activity，使之继承`BaseActivity`（以后的创建的Activity都直接继承BaseActivity）。

   ```java
   package com.bin23.music.activities;
   
   import androidx.appcompat.app.AppCompatActivity;
   
   import android.os.Bundle;
   
   import com.bin23.music.R;
   
   public class WelcomeActivity extends BaseActivity {
   
       @Override
       protected void onCreate(Bundle savedInstanceState) {
           super.onCreate(savedInstanceState);
           setContentView(R.layout.activity_welcome);
       }
   }
   ```

2. 编写activity_welcome.xml布局。

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
       xmlns:app="http://schemas.android.com/apk/res-auto"
       xmlns:tools="http://schemas.android.com/tools"
       android:layout_width="match_parent"
       android:layout_height="match_parent"
       android:background="@color/mainColor"
       tools:context=".activities.WelcomeActivity">
   
       <ImageView
           android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:src="@mipmap/welcome_icon"
           android:layout_gravity="center">
   
       </ImageView>
   
   </FrameLayout>
   ```

3. 在`AndroidMainifest.xml`中修改启动顺序，现在应该先启动`WelcomeActivity`。

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <manifest xmlns:android="http://schemas.android.com/apk/res/android"
       package="com.bin23.music">
   
       <application
           ...>
           <activity android:name=".activities.MainActivity"></activity>
           <activity android:name=".activities.WelcomeActivity">
               <intent-filter>
                   <action android:name="android.intent.action.MAIN" />
   
                   <category android:name="android.intent.category.LAUNCHER" />
               </intent-filter>
           </activity>
       </application>
   
   </manifest>
   ```

### 欢迎页面的处理逻辑

需要实现的功能

- 在欢迎页面停留3秒钟后实现跳转
- 目前先跳转到MainActivity（因为此时我们还没实现登录页面）

使用的工具

- Timer

  > Timer是Java中的定时调度工具类（`java.util.Timer`）
  >
  > 功能上，它可以实现在某个具体时间执行什么任务。
  >
  > 底层上，它使用一个后台线程去执行定时任务。
  >
  > TimerTask是一个抽象类，它的子类由 Timer 安排为一次执行或重复执行的任务。实际上就是一个拥有run方法的类，需要定时执行的代码放到run方法体内。

下面开始编写代码，如下：

WelcomeActivity

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.bin23.music.R;

import java.util.Timer;
import java.util.TimerTask;

public class WelcomeActivity extends BaseActivity {

    private Timer mTimer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);

        init();
    }

    private void init() {
        mTimer = new Timer();
        // schedule(TimerTask task, long delay)
        // 作用
        //   - 等待delay毫秒后执行且仅执行一次task (单次)。
        mTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                // Log.e("WelcomeActivity", "当前线程为:" + Thread.currentThread().getName());
                // 跳转到MainActivity
                toMain();
            }
        }, 3 * 1000);
    }

    private void toMain() {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}
```

## 登录功能

### 定义尺寸

在res/values/下新建dimen.xml，定义尺寸。

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <dimen name="marginSize">16dp</dimen>
    <dimen name="toolbarHeight">56dp</dimen>
</resources>
```

### 通用UI-Toolbar

使用Material Design的Toolbar

#### toolbar.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="@dimen/toolbarHeight"
    android:background="@color/mainColor"
    android:paddingLeft="@dimen/marginSize"
    android:paddingRight="@dimen/marginSize"
    >

    <!--
        android:theme 让Toolbar单独使用深色主题
        app:popupTheme 让Toolbar中弹出的菜单也使用深色主题
    -->
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="555dp"
        android:layout_height="?attr/actionBarSize"
        android:background="?attr/colorPrimaryDark"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
        app:popupTheme="@style/ThemeOverlay.AppCompat.Light">

        <ImageView
            android:id="@+id/iv_back"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginRight="@dimen/marginSize"
            android:src="@mipmap/back" />

        <TextView
            android:id="@+id/tv_toolbar_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:text="音乐"
            android:textSize="22dp" />
    </androidx.appcompat.widget.Toolbar>

</androidx.constraintlayout.widget.ConstraintLayout>
```

### LoginActivity

1. 新建`LoginActivity`作为登录页面的Activity

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.bin23.music.R;

public class LoginActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }
}
```

2. 编辑登录的布局文件，使用`include标签`引入`toolbar.xml布局`。

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--xmlns:app="http://schemas.android.com/apk/res-auto" 指定了新的命名空间，下面才能使用app:attribute的写法，比如app:popupTheme-->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activities.LoginActivity">

    <include layout="@layout/toolbar"/>

</LinearLayout>
```

3. 修改欢迎页面的处理逻辑，使之跳转到登录页面

### 引用通用UI

#### BaseActivity

在BaseActivity中写initToolBar()方法，方便其他Activity来使用该方法进行通用UI的初始化。比如标题栏的初始化，哪些需要显示，哪些不需要显示，在登录页面就显示登录标题，在注册页面就显示注册标题等等。

```java
package com.bin23.music.activities;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.IdRes;
import androidx.annotation.Nullable;

import com.bin23.music.R;

public class BaseActivity extends Activity {

    private ImageView mIvBack;
    private TextView mTvTitle;

    /**
     * 简化findViewById
     * @param id
     * @param <T>
     * @return
     */
    protected <T extends View> T fd(@IdRes int id) {
        return findViewById(id);
    }


    protected void initToolBar (boolean isShowBack, String title) {
        mIvBack = fd(R.id.iv_back);
        mTvTitle = fd(R.id.tv_toolbar_title);

        mIvBack.setVisibility(isShowBack ? View.VISIBLE : View.GONE);
        mTvTitle.setText(title);

        mIvBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}

```

以上完成通用UI的引用，toolbar也就完成了。

修改下LoginActivity

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.bin23.music.R;

public class LoginActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        initView();
    }

    /**
     * 初始化View
     */
    private void initView() {
        initToolBar(false, "欢迎登录~");
    }
}
```

### 自定义View-输入控件

登录页面中的手机号输入框和密码输入框的实现。

自定义组件/控件/之类的，有两种方法

1. 使用include标签将自定义的控件引入，就比如上面的toolbar
2. 自定义控件/View

这里就用自定义控件View来实现

#### 自定义属性

在res/values/下新建一个attrs.xml，声明我们的控件inputView

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- 声明样式 -->
    <declare-styleable name="inputView">
        <attr name="input_icon" format="reference"></attr>
        <attr name="input_hint" format="string"></attr>
        <attr name="is_password" format="boolean"></attr>
    </declare-styleable>
</resources>
```

#### 自定义控件布局

input_view.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="@dimen/inputViewHeight"
    android:orientation="horizontal"
    android:paddingLeft="@dimen/marginSize"
    android:paddingRight="@dimen/marginSize"
    >

    <ImageView
        android:id="@+id/iv_icon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/phone"
        />

    <EditText
        android:id="@+id/et_input"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@null"
        android:hint="用户名"
        android:paddingLeft="@dimen/marginSize"
        android:paddingRight="@dimen/marginSize"
        android:textSize="@dimen/TitleSize"

        />
</LinearLayout>
```

InputView

```java
package com.bin23.music.views;

import android.content.Context;
import android.content.res.TypedArray;
import android.text.InputType;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bin23.music.R;

/**
 * 1. input_icon
 * 2. input_hint
 * 3. is_password
 */
public class InputView extends FrameLayout {

    private int inputIcon;
    private String inputHint;
    private boolean isPassword;

    private View mView;
    private ImageView mIvIcon;
    private EditText mEtInput;

    public InputView(@NonNull Context context) {
        super(context);
        init(context, null);
    }

    public InputView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public InputView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    public InputView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init (Context context, AttributeSet attrs) {
        if (attrs == null) return;
        // 获取自定义属性
        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.inputView);
        inputIcon = typedArray.getResourceId(R.styleable.inputView_input_icon, R.mipmap.logo);
        inputHint = typedArray.getString(R.styleable.inputView_input_hint);
        isPassword = typedArray.getBoolean(R.styleable.inputView_is_password, false);
        typedArray.recycle();

        // 绑定layout布局
        mView = LayoutInflater.from(context).inflate(R.layout.input_view,this,false);
        mIvIcon = mView.findViewById(R.id.iv_icon);
        mEtInput = mView.findViewById(R.id.et_input);

        // 布局 关联 -》属性
        mIvIcon.setImageResource(inputIcon);
        mEtInput.setHint(inputHint);
        mEtInput.setInputType(isPassword ? InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD : InputType.TYPE_CLASS_PHONE);

        // input_view 和 InputView 绑定起来了
        addView(mView);
    }

    public String getInputStr() {
        return mEtInput.getText().toString().trim();
    }
}

```

然后就可以在登录页面的布局中使用这个自定义的View了

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--xmlns:app="http://schemas.android.com/apk/res-auto" 指定了新的命名空间，下面才能使用app:attribute的写法，比如app:popupTheme-->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activities.LoginActivity">

    <include layout="@layout/toolbar"/>

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/logo"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="10dp"
        />
    
    <com.bin23.music.views.InputView
        android:id="@+id/input_phone"
        android:layout_width="match_parent"
        android:layout_height="@dimen/inputViewHeight"
        android:layout_marginTop="@dimen/marginSize"
        app:input_icon="@mipmap/phone"
        app:input_hint="手机号"
        app:is_password="false"
        >

    </com.bin23.music.views.InputView>

</LinearLayout>
```

### 自定义样式

#### 灰色分割线

color.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#6200EE</color>
    <color name="colorPrimaryDark">#3700B3</color>
    <color name="colorAccent">#03DAC5</color>

    <!-- 定义自己的主色调 -->
    <color name="mainColor">#d43433</color>
    <!-- 定义分割线颜色 -->
    <color name="lineColor">#c3c3c3</color>
</resources>
```

style.xml

```xml
<resources>
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <!-- 注释掉默认的主题颜色 -->
<!--        <item name="colorPrimary">@color/colorPrimary</item>-->
<!--        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>-->
<!--        <item name="colorAccent">@color/colorAccent</item>-->
        <!-- 使用我们自己定义的主色调 -->
        <item name="colorPrimaryDark">@color/mainColor</item>
    </style>

    <!-- 分割线样式 -->
    <style name="line">
        <item name="android:layout_width">match_parent</item>
        <item name="android:layout_height">1dp</item>
        <item name="android:layout_margin">@dimen/marginSize</item>
        <item name="android:background">@color/lineColor</item>
    </style>

</resources>
```

在登录页面布局进行引用

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--xmlns:app="http://schemas.android.com/apk/res-auto" 指定了新的命名空间，下面才能使用app:attribute的写法，比如app:popupTheme-->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activities.LoginActivity">

    <include layout="@layout/toolbar"/>

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/logo"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="10dp"
        />

    <!-- 自定义的输入控件 -->
    <com.bin23.music.views.InputView
        android:id="@+id/input_phone"
        android:layout_width="match_parent"
        android:layout_height="@dimen/inputViewHeight"
        android:layout_marginTop="@dimen/marginSize"
        app:input_icon="@mipmap/phone"
        app:input_hint="手机号"
        app:is_password="false"
        >

    </com.bin23.music.views.InputView>

    <!-- 分割线的引用 -->
    <View style="@style/line" />

</LinearLayout>
```

然后就是剩下的布局了，密码框，注册按钮，登录按钮。

密码框直接复用，注册按钮直接使用TextView

#### 登录按钮样式

登录按钮直接使用Button，但是样式我们就自己写一个。

在res/value/styles.xml下，再写一个样式，然后主要是那个背景高亮，通过background那里实现（使用drawable）

```xml
<resources>
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        ...
    </style>

    <!-- 分割线样式 -->
    <style name="line">
        ...
    </style>

    <!-- 按钮样式，点击的时候高亮的实现通过background那里实现 -->
    <style name="commitBtn">
        <item name="android:layout_width">match_parent</item>
        <item name="android:layout_height">@dimen/btnHeight</item>
        <item name="android:textColor">@android:color/white</item>
        <item name="android:textSize">@dimen/TitleSize</item>
        <item name="android:layout_marginLeft">@dimen/marginSize</item>
        <item name="android:layout_marginRight">@dimen/marginSize</item>
        <item name="android:gravity">center</item>
        <item name="android:background">@drawable/btn_commit_select</item>
    </style>

</resources>
```

##### drawable

高亮的drawable，btn_commit_h.xml

> shape-特定形状，模型的图样

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">

    <solid android:color="@color/mainColorH">

    </solid>

    <corners android:radius="@dimen/radius"/>
</shape>
```

普通的drawable，btn_commit_n.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">

    <solid android:color="@color/mainColor">

    </solid>

    <corners android:radius="@dimen/radius"/>
</shape>
```

不同状态的drawable，btn_commit_select.xml

> selector-不同状态选择不同的图样

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- View 高亮状态 -->
    <item
        android:state_focused="true"
        android:drawable="@drawable/btn_commit_h"
        />

    <item
        android:state_pressed="true"
        android:drawable="@drawable/btn_commit_h"
        />
    <item
        android:state_selected="true"
        android:drawable="@drawable/btn_commit_h"
        />
    <!-- View默认状态-->
    <item
        android:drawable="@drawable/btn_commit_n"
        />

</selector>
```

##### 直接使用按钮样式

登录的布局xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--xmlns:app="http://schemas.android.com/apk/res-auto" 指定了新的命名空间，下面才能使用app:attribute的写法，比如app:popupTheme-->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activities.LoginActivity">

    ......

    <Button
        style="@style/commitBtn"
        android:text="登  录"
        android:layout_marginTop="@dimen/marginSize"
        android:onClick="onCommitClick"
        />

</LinearLayout>
```

### 完善布局

然后就是再加多两个，立即注册和忘记密码。

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--xmlns:app="http://schemas.android.com/apk/res-auto" 指定了新的命名空间，下面才能使用app:attribute的写法，比如app:popupTheme-->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activities.LoginActivity">

    .......

    <Button
        style="@style/commitBtn"
        android:text="登  录"
        android:layout_marginTop="@dimen/marginSize"
        android:onClick="onCommitClick"
        />

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="@dimen/marginSize"
        android:orientation="horizontal">
        <TextView
            android:id="@+id/tv_register"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:padding="@dimen/marginSize"
            android:text="立即注册"
            android:textSize="@dimen/infoSize"
            android:textColor="@color/mainColor"
            android:onClick="onRegisterClick"
            >

        </TextView>

        <TextView
            android:id="@+id/tv_forget_pw"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="200dp"
            android:layout_toRightOf="@+id/tv_register"
            android:onClick="onForgetPwClick"
            android:padding="@dimen/marginSize"
            android:text="忘记密码"
            android:textColor="@color/mainColor"
            android:textSize="@dimen/infoSize">

        </TextView>
    </RelativeLayout>

</LinearLayout>
```

LoginActivity中加上如下的点击方法

```java

    /**
     * 登录
     */
    public void onCommitClick(View view) {

    }

    /**
     * 注册
     */
    public void onRegisterClick(View view) {

    }

    /**
     * 忘记密码
     */
    public void onForgetPwClick(View view) {

    }
```



### AndroidUtilCode框架的引入

使用这个框架，来实现验证功能。

1. 依赖

```gradle
 implementation 'com.blankj:utilcodex:1.30.6'
```

2. 初始化

```java
package com.bin23.music;

import android.app.Application;

import com.blankj.utilcode.util.Utils;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        // 初始化 AndroidUtilCode
        Utils.init(this);
    }
}

```

3. 使用RegexUtils来实现验证

写多一个工具类，写验证方法。

```java
package com.bin23.music.utils;

import android.content.Context;
import android.text.TextUtils;
import android.widget.Toast;

import com.blankj.utilcode.util.RegexUtils;

public class UserUtils {

    /**
     * 登录验证
     * @param context
     * @param phone
     * @param password
     * @return
     */
    public static boolean validateLogin(Context context, String phone, String password) {
        if (!RegexUtils.isMobileExact(phone)) {
            Toast.makeText(context, "手机号无效", Toast.LENGTH_SHORT).show();
            return false;
        }

        if (TextUtils.isEmpty(password)) {
            Toast.makeText(context, "密码为空,请输入密码", Toast.LENGTH_SHORT).show();
            return false;
        }

        return true;
    }
}

```

## 注册页面

### 注册页面的编写

1. 创建新的Activity，RegisterActivity，然后编辑布局，基本上就是复用之前定义的控件，然后改下id名

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--xmlns:app="http://schemas.android.com/apk/res-auto" 指定了新的命名空间，下面才能使用app:attribute的写法，比如app:popupTheme-->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activities.LoginActivity">

    <include layout="@layout/toolbar"/>

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/logo"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="10dp"
        />

    <!-- 自定义的输入控件 -->
    <com.bin23.music.views.InputView
        android:id="@+id/input_phone"
        android:layout_width="match_parent"
        android:layout_height="@dimen/inputViewHeight"
        android:layout_marginTop="@dimen/marginSize"
        app:input_icon="@mipmap/phone"
        app:input_hint="请输入手机号"
        app:is_password="false"
        >

    </com.bin23.music.views.InputView>

    <!-- 分割线的引用 -->
    <View style="@style/line" />

    <com.bin23.music.views.InputView
        android:id="@+id/input_password"
        android:layout_width="match_parent"
        android:layout_height="@dimen/inputViewHeight"
        android:layout_marginTop="@dimen/marginSize"
        app:input_icon="@mipmap/password"
        app:input_hint="请输入密码"
        app:is_password="true"
        >

    </com.bin23.music.views.InputView>

    <View style="@style/line" />

    <com.bin23.music.views.InputView
        android:id="@+id/input_password_confirm"
        android:layout_width="match_parent"
        android:layout_height="@dimen/inputViewHeight"
        android:layout_marginTop="@dimen/marginSize"
        app:input_icon="@mipmap/password"
        app:input_hint="请确认密码"
        app:is_password="true"
        >

    </com.bin23.music.views.InputView>

    <Button
        style="@style/commitBtn"
        android:text="注  册"
        android:layout_marginTop="@dimen/marginSize"
        android:onClick="onRegisterClick"
        />

</LinearLayout>
```

2. RegisterActivity进行Toolbar的初始化，还有控件的初始化。

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.bin23.music.R;
import com.bin23.music.views.InputView;

public class RegisterActivity extends BaseActivity {

    private InputView mIvPhone, mIvPassword, mIvPasswordConfirm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        initView();
    }

    private void initView() {
        initToolBar(true, "欢迎注册~");

        mIvPhone = fd(R.id.input_phone);
        mIvPassword = fd(R.id.input_password);
        mIvPasswordConfirm = fd(R.id.input_password_confirm);
    }

    public void onRegisterClick(View view) {

    }
}
```

3. 然后修改下登录页面的跳转逻辑，使之能跳转到注册页面。

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.bin23.music.R;
import com.bin23.music.utils.UserUtils;
import com.bin23.music.views.InputView;

public class LoginActivity extends BaseActivity {

    private InputView mIvPhone, mIvPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        initView();
    }

    /**
     * 初始化View
     */
    ...

    /**
     * 登录
     */
    ...

    /**
     * 注册
     */
    public void onRegisterClick(View view) {
        Intent intent = new Intent(this, RegisterActivity.class);
        startActivity(intent);
    }

    /**
     * 忘记密码
     */
    ...
}
```

### 过度动画

styles.xml的AppTheme中

```xml
<item name="android:windowAnimationStyle">@style/AnimationActivity</item>
```

添加style

```xml
<style name="AnimationActivity" parent="@android:style/Animation.Activity">
    <item name="android:activityOpenEnterAnimation">@anim/open_enter</item>
    <item name="android:activityOpenExitAnimation">@anim/open_exit</item>
    <item name="android:activityCloseEnterAnimation">@anim/close_exit</item>
    <item name="android:activityCloseExitAnimation">@anim/close_enter</item>
</style>
```

然后4个动画效果

open_enter.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:fromXDelta="100%"
        android:toXDelta="0%"
        android:duration="@integer/anim_duration"
        />
</set>
```

open_exit.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <scale
        android:fromXScale="1.0"
        android:fromYScale="1.0"
        android:toXScale="0.8"
        android:toYScale="0.8"
        android:pivotX="50%"
        android:pivotY="50%"
        android:duration="@integer/anim_duration"
        ></scale>
</set>
```

close_enter.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <scale
        android:fromXScale="0.8"
        android:fromYScale="0.8"
        android:toXScale="1.0"
        android:toYScale="1.0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:duration="@integer/anim_duration"
        ></scale>
</set>
```

close_exit.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:fromXDelta="0%"
        android:toXDelta="100%"
        android:duration="@integer/anim_duration"/>


</set>
```

## MaterialDesign风格的主页

### MainActivity

此时的MainActivity需要修改父类，改回继承原先的AppCompatActivity

```java
public class MainActivity extends AppCompatActivity {
    ...
}
```

activity_main.xml布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.drawerlayout.widget.DrawerLayout
    android:id="@+id/drawer_layout"
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activities.MainActivity">

    <!--第一个DrawerLayout子控件，主要内容页面-->
    <!--CoordinatorLayout和FrameLayout基本一样，但是它可以自动响应布局-->
    <androidx.coordinatorlayout.widget.CoordinatorLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >

        <!--工具栏-->
        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimaryDark"
            android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
            app:popupTheme="@style/ThemeOverlay.AppCompat.Light"
            />

    </androidx.coordinatorlayout.widget.CoordinatorLayout>

    <!--第二个DrawerLayout子控件，作为侧边导航栏-->
    <com.google.android.material.navigation.NavigationView
        android:id="@+id/nav_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        app:headerLayout="@layout/nav_header"
        app:menu="@menu/nav_menu" />

</androidx.drawerlayout.widget.DrawerLayout>
```

res/menu/下的nav_menu.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <group android:checkableBehavior="single">
        <item
            android:id="@+id/nav_msg"
            android:icon="@mipmap/nav_msg"
            android:title="@string/nav_msg" />
        <item
            android:id="@+id/nav_setting"
            android:icon="@mipmap/nav_setting"
            android:title="@string/nav_setting" />
        <item
            android:id="@+id/nav_about"
            android:icon="@mipmap/nav_about"
            android:title="@string/nav_about" />
        <item
            android:id="@+id/nav_logout"
            android:icon="@mipmap/nav_logout"
            android:title="@string/nav_logout" />
    </group>
</menu>
```

res/menu/下的toolbar.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item
        android:id="@+id/backup"
        android:icon="@mipmap/ic_backup"
        android:title="备份"
        app:showAsAction="always"
        />

    <item
        android:id="@+id/delete"
        android:icon="@mipmap/ic_delete"
        android:title="删除"
        app:showAsAction="ifRoom"
        />

    <item
        android:id="@+id/settings"
        android:icon="@mipmap/ic_settings"
        android:title="设置"
        app:showAsAction="never"
        />
</menu>
```

res/strings.xml

```xml
<resources>
    <string name="app_name">MusicDemo</string>
    <string name="nav_msg">我的消息</string>
    <string name="nav_setting">设置</string>
    <string name="nav_about">关于</string>
    <string name="nav_logout">退出登录</string>

</resources>
```

MainActivity，先初始化Toolbar，然后是滑动布局，接着设置HomeAsUp以及NavigationView

```java
package com.bin23.music.activities;

import androidx.annotation.IdRes;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bin23.music.R;
import com.bin23.music.activities.BaseActivity;
import com.bin23.music.utils.UserUtils;
import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity {

    private Toolbar toolbar;
    private DrawerLayout mDrawerLayout;
    private NavigationView  navView;
    private ActionBar actionBar;

    /**
     * 简化findViewById
     * @param id
     * @param <T>
     * @return
     */
    protected <T extends View> T fd(@IdRes int id) {
        return findViewById(id);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initView();
        setHomeAsUp();

        setNavSideBar();
    }

    private void initView() {
        // 设置、初始化Toolbar
        toolbar = fd(R.id.toolbar);
        setSupportActionBar(toolbar);
        // 滑动布局
        mDrawerLayout = fd(R.id.drawer_layout);
        // 侧边导航栏 NavigationView
        navView = fd(R.id.nav_view);
    }

    /**
     * 设置HomeAsUp按钮
     */
    private void setHomeAsUp() {
        // 获取 ActionBar ，最左侧的按钮叫 HomeAsUp 按钮
        actionBar = getSupportActionBar();
        if (actionBar != null) {
            // 显示导航按钮
            actionBar.setDisplayHomeAsUpEnabled(true);
            // 设置导航按钮图标
            actionBar.setHomeAsUpIndicator(R.mipmap.ic_menu);
        }
    }

    private void setNavSideBar() {
        // 将call选项默认选中
        navView.setCheckedItem(R.id.nav_msg);
        // 使图片显示原色，不然就是灰色了
        navView.setItemIconTintList(null);
        // 处理NavigationView点击事件
        navView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(MenuItem item) {
                	...
                }
                mDrawerLayout.closeDrawers();
                return true;
            }
        });
    }

}
```

然后还可以设置Toolbar上的menu点击事件，menu的知识点

```java
	public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.toolbar, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            // HomeAsUp的id永远都是 android.R.id.home
            case android.R.id.home:
                // 调用 DrawerLayout 的 openDrawer() 展示滑动菜单
                mDrawerLayout.openDrawer(GravityCompat.START);
                break;
            case R.id.backup:
                Toast.makeText(this, "You clicked Backup", Toast.LENGTH_SHORT).show();
                break;
            case R.id.delete:
                Toast.makeText(this, "You clicked Delete", Toast.LENGTH_SHORT).show();
                break;
            case R.id.settings:
                Toast.makeText(this, "You clicked Settings", Toast.LENGTH_SHORT).show();
                break;
            default:
        }
        return true;
    }
```



### 退出登录

UserUtils下写logout方法

```java
    public static void logout(Context context) {
        Intent intent = new Intent(context, LoginActivity.class);
        // 添加intent标识符，清理task栈，并且新生成task栈
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
        // 此时动画错误，（因为动画是基于Activity进栈出栈实现的，现在栈没了，所以需要重新搞）得解决动画错误，重新定义Activity跳转动画
        ((Activity)context).overridePendingTransition(R.anim.open_enter, R.anim.open_exit);

    }
```

设置NavigationView的点击事件，点击退出登录使执行退出操作。

```java
private void setNavSideBar() {
    // 将call选项默认选中
    navView.setCheckedItem(R.id.nav_msg);
    // 使图片显示原色，不然就是灰色了
    navView.setItemIconTintList(null);
    // 处理NavigationView点击事件
    navView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
        @Override
        public boolean onNavigationItemSelected(MenuItem item) {
            switch (item.getItemId()) {
                case R.id.nav_msg:
                    break;
                case R.id.nav_setting:
                    break;
                case R.id.nav_about:
                    break;
                case R.id.nav_logout:
                    UserUtils.logout(MainActivity.this);
                    break;
                default:
                    break;
            }
            mDrawerLayout.closeDrawers();
            return true;
        }
    });
}
```

### 我的资料页面

想要的效果是，当在NavigationView的header中点击头像或名字时，能进入我的资料页面。

#### MeActivity

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.bin23.music.R;

public class MeActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_me);

        initView();
    }

    private void initView() {
        initToolBar(true, "我的资料");
    }


}
```

#### 上方Header布局

me_header.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="180dp"
    >

    <ImageView
        android:id="@+id/h_back"
        android:layout_width="match_parent"
        android:layout_height="180dp"
        android:src="@mipmap/nav_icon"
        android:scaleType="centerCrop"
        />

    <!--图片圆形化控件-->
    <de.hdodenhof.circleimageview.CircleImageView
        android:id="@+id/icon_image"
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_marginTop="@dimen/marginSize"
        android:layout_centerInParent="true"
        android:src="@mipmap/nav_icon"
        />

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignBottom="@id/h_back"
        android:layout_marginBottom="20dp"
        android:layout_marginLeft="@dimen/marginSize"
        android:layout_marginRight="@dimen/marginSize"
        android:background="#4DAE1616"
        android:orientation="horizontal">

        <ImageView
            android:id="@+id/user_line"
            android:layout_width="1dp"
            android:layout_height="25dp"
            android:layout_centerHorizontal="true"
            android:layout_marginLeft="15dp"
            android:background="@android:color/holo_orange_light" />

        <TextView
            android:id="@+id/user_name"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_toLeftOf="@id/user_line"
            android:text="God23Bin"
            android:textColor="@android:color/white"
            android:textSize="17sp" />

        <TextView
            android:id="@+id/user_val"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="15dp"
            android:layout_toRightOf="@id/user_line"
            android:text="135****5582"
            android:textColor="@android:color/white"
            android:textSize="17sp" />
    </RelativeLayout>

</RelativeLayout>
```



#### 自定义View-item控件

##### 自定义属性

res/values/attrs.xml下面，加入新的属性。

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- 声明样式 -->
    <declare-styleable name="inputView">
        <attr name="input_icon" format="reference"/>    <!--设置左侧图标-->
        <attr name="input_hint" format="string"/>       <!--设置hint文字-->
        <attr name="is_password" format="boolean"/>     <!--设置是否为密码-->
    </declare-styleable>

    <declare-styleable name="itemView">
        <attr name="left_icon" format="reference"/>     <!--设置左侧图标-->
        <attr name="show_left_icon" format="boolean"/>  <!--设置是否显示左侧图标-->
        <attr name="left_text" format="string"/>        <!--设置左侧标题文字-->
        <attr name="right_text" format="string"/>       <!--设置右侧描述文字-->
        <attr name="right_icon" format="reference"/>    <!--设置右侧图标-->
        <attr name="show_right_arrow" format="boolean"/><!--设置是否显示右侧小箭头-->
    </declare-styleable>
</resources>
```

##### 自定义控件布局

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="@dimen/itemViewHeight"
    android:orientation="horizontal"
    android:paddingLeft="@dimen/marginSize"
    android:paddingRight="@dimen/marginSize"
    >

    <ImageView
        android:id="@+id/iv_left_icon"
        android:layout_width="22dp"
        android:layout_height="22dp"
        android:layout_marginTop="@dimen/marginSize"
        android:src="@mipmap/phone"
        />

    <TextView
        android:id="@+id/tv_left_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="姓名"
        android:textSize="@dimen/ItemTextSize"
        android:layout_marginTop="@dimen/marginSize"
        android:layout_marginLeft="@dimen/marginSize"
        android:layout_toRightOf="@+id/iv_left_icon"
        />

    <TextView
        android:id="@+id/tv_right_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginRight="@dimen/marginSize"
        android:layout_marginTop="@dimen/marginSize"
        android:text="God23Bin"
        android:textSize="@dimen/ItemTextSize"
        android:textColor="#63666666"
        android:layout_toLeftOf="@+id/iv_right_icon"
        />

    <ImageView
        android:id="@+id/iv_right_icon"
        android:layout_width="22dp"
        android:layout_height="22dp"
        android:layout_marginTop="@dimen/marginSize"
        android:src="@mipmap/item_in"
        android:layout_alignParentRight="true"
        />

</RelativeLayout>
```

ItemView

老套路

1. 声明属性
2. 声明控件

3. init方法
   - 通过`context.obtainStyledAttributes(attrs, R.styleable.itemView);`获取TypedArray，进而获取自定义的属性
   - 通过`LayoutInflater.from(context).inflate(R.layout.item_view,this,false);`绑定layout
   - 把属性和控件关联起来
   - 通过`addView(mView);`把布局和这个类关联起来

```java
package com.bin23.music.views;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bin23.music.R;

/**
 * 1. left_icon
 *      isShowLeftIcon
 * 2. left_text
 * 3. right_text
 * 4. right_icon
 *      isShowRightArrow
 */
public class ItemView extends FrameLayout {
    // 属性
    private int leftIcon, rightIcon;
    private String leftText, rightText;
    private boolean isShowLeftIcon, isShowRightArrow;

    // 控件
    private View mView;
    private ImageView mLeftIcon, mRightArrowIcon;
    private TextView mTvLeftText, mTvRightText;

    public ItemView(@NonNull Context context) {
        super(context);
        init(context, null);
    }

    public ItemView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public ItemView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    public ItemView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        if (attrs == null) return;
        // 获取自定义属性
        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.itemView);

        leftIcon = typedArray.getResourceId(R.styleable.itemView_left_icon, R.mipmap.logo);
        isShowLeftIcon = typedArray.getBoolean(R.styleable.itemView_show_left_icon, true);      //得到是否显示左侧图标属性标识
        leftText = typedArray.getString(R.styleable.itemView_left_text);
        rightText = typedArray.getString(R.styleable.itemView_right_text);
        rightIcon = typedArray.getResourceId(R.styleable.itemView_right_icon, R.mipmap.item_in);
        isShowRightArrow = typedArray.getBoolean(R.styleable.itemView_show_right_arrow, true);  //得到是否显示右侧图标属性标识
        typedArray.recycle();


        // 绑定layout布局
        mView = LayoutInflater.from(context).inflate(R.layout.item_view,this,false);
        mLeftIcon = mView.findViewById(R.id.iv_left_icon);
        mTvLeftText = mView.findViewById(R.id.tv_left_text);
        mTvRightText = mView.findViewById(R.id.tv_right_text);
        mRightArrowIcon = mView.findViewById(R.id.iv_right_icon);

        // 布局 关联 -》属性
        mLeftIcon.setImageResource(leftIcon);           // 设置左侧图标
        mLeftIcon.setVisibility(isShowLeftIcon ? View.VISIBLE : View.INVISIBLE);            //设置左侧箭头图标是否显示 rightDesc.setText(ta.getString(R.styleable.ItemView_right_text));//设置右侧文字描述
        mTvLeftText.setText(leftText);                  // 设置左侧文字
        mTvRightText.setText(rightText);                // 设置右侧文字
        mRightArrowIcon.setImageResource(rightIcon);    // 设置右侧图标
        mRightArrowIcon.setVisibility(isShowRightArrow ? View.VISIBLE : View.INVISIBLE);    //设置右侧箭头图标是否显示

        // item_view 和 ItemView 绑定起来
        addView(mView);
    }
}
```

#### 使用自定义的item控件

me_activity.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activities.MeActivity">

    <include layout="@layout/toolbar" />

    <include layout="@layout/me_header" />

    <com.bin23.music.views.ItemView
        android:layout_width="match_parent"
        android:layout_height="@dimen/itemViewHeight"
        app:left_icon="@mipmap/item_user"
        app:left_text="昵称"
        app:right_text="God23Bin"
        app:show_left_icon="true"
        app:show_right_arrow="true"
        >

    </com.bin23.music.views.ItemView>

    <com.bin23.music.views.ItemView
        android:layout_width="match_parent"
        android:layout_height="@dimen/itemViewHeight"
        app:left_icon="@mipmap/item_sex"
        app:left_text="性别"
        app:right_text="男"
        app:show_left_icon="true"
        app:show_right_arrow="true"
        >

    </com.bin23.music.views.ItemView>

    <com.bin23.music.views.ItemView
        android:layout_width="match_parent"
        android:layout_height="@dimen/itemViewHeight"
        app:left_icon="@mipmap/item_area"
        app:left_text="地区"
        app:right_text="广东省 广州市"
        app:show_left_icon="true"
        app:show_right_arrow="true"
        >

    </com.bin23.music.views.ItemView>

    <com.bin23.music.views.ItemView
        android:layout_width="match_parent"
        android:layout_height="@dimen/itemViewHeight"
        app:left_icon="@mipmap/item_sign"
        app:left_text="简介"
        app:right_text="心如花木，向阳花开"
        app:show_left_icon="true"
        app:show_right_arrow="true"
        >

    </com.bin23.music.views.ItemView>

    <!-- 分割线的引用 -->
    <View style="@style/line" />

    <com.bin23.music.views.ItemView
        android:layout_width="match_parent"
        android:layout_height="@dimen/itemViewHeight"
        app:left_icon="@mipmap/item_update_pw"
        app:left_text="修改密码"
        app:right_text=""
        app:show_left_icon="true"
        app:show_right_arrow="true"
        >

    </com.bin23.music.views.ItemView>

    <!-- 分割线的引用 -->
    <View style="@style/line" />

    <com.bin23.music.views.ItemView
        android:layout_width="match_parent"
        android:layout_height="@dimen/itemViewHeight"
        app:left_icon="@mipmap/item_version"
        app:left_text="版本"
        app:right_text=""
        app:show_left_icon="true"
        app:show_right_arrow="false"
        >

    </com.bin23.music.views.ItemView>

</LinearLayout>
```

完成我的资料页面的编写。

#### 添加点击事件

需求：点击弹框，可进行修改

实现：使用XPopup弹窗库

依赖

```gradle
	// XPopup弹窗
    implementation 'com.github.li-xiaojun:XPopup:2.3.4'
```

在上面的ItemView控件中都添加上onClick属性，然后在MeActivity中进行处理点击事件。

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import com.bin23.music.R;
import com.bin23.music.interfaces.MyCallBack;
import com.bin23.music.utils.RegionalChooseUtil;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.bitmap.CenterCrop;
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions;
import com.bumptech.glide.request.RequestOptions;
import com.lxj.xpopup.XPopup;
import com.lxj.xpopup.interfaces.OnInputConfirmListener;

import jp.wasabeef.glide.transformations.BlurTransformation;
import jp.wasabeef.glide.transformations.CropCircleTransformation;

import static java.security.AccessController.getContext;

public class MeActivity extends BaseActivity {

    private ImageView mHeadBack, mHead;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_me);

        initView();
    }

    private void initView() {
        initToolBar(true, "我的资料");

        // 头部图像初始化
        mHeadBack = findViewById(R.id.h_back);
        setHeaderWithGlide();

        // 城市选择器初始化
        RegionalChooseUtil.initJsonData(MeActivity.this);
    }

    public void setHeaderWithGlide() {
        //设置背景磨砂效果
        Glide.with(this).load(R.mipmap.nav_icon)
                .apply(RequestOptions.bitmapTransform(new BlurTransformation(14, 3)))
                .transition(DrawableTransitionOptions.withCrossFade())  //淡入淡出
                .into(mHeadBack);

    }

    public void onNicknameItemClick(View view) {
        new XPopup.Builder(MeActivity.this).asInputConfirm("修改昵称", "",
                new OnInputConfirmListener() {
                    @Override
                    public void onConfirm(String text) {
                        // 进行数据库操作
                        Toast.makeText(MeActivity.this, "你点击了确定" + text, Toast.LENGTH_SHORT).show();
                    }
                })
                .show();
    }

    public void onSexItemClick(View view) {
        new XPopup.Builder(MeActivity.this).asInputConfirm("修改性别", "",
                new OnInputConfirmListener() {
                    @Override
                    public void onConfirm(String text) {
                        // 进行数据库操作
                        Toast.makeText(MeActivity.this, "你点击了确定" + text, Toast.LENGTH_SHORT).show();
                    }
                })
                .show();
    }

    /**
     * 城市选择点击事件
     * @param view
     */
    public void onAreaItemClick(View view) {
        
    }

    public void onSignItemClick(View view) {
        new XPopup.Builder(MeActivity.this).asInputConfirm("修改简介", "",
                new OnInputConfirmListener() {
                    @Override
                    public void onConfirm(String text) {
                        // 进行数据库操作
                        Toast.makeText(MeActivity.this, "你点击了确定" + text, Toast.LENGTH_SHORT).show();
                    }
                })
                .show();
    }

    public void onUpdatePwItemClick(View view) {
        
    }

    public void onVersionItemClick(View view) {
        Toast.makeText(MeActivity.this, "当前版本为1.0", Toast.LENGTH_SHORT).show();
    }
}
```

##### 底部城市选择器的实现

依赖：

```gradle
    // 底部城市选择器相关依赖
    implementation 'com.google.code.gson:gson:2.7'
    implementation 'com.contrarywind:Android-PickerView:4.1.9'
    implementation 'com.contrarywind:wheelview:4.1.0'
```

城市地址选择工具类

```java
package com.bin23.music.utils;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.view.View;

import com.bigkoo.pickerview.builder.OptionsPickerBuilder;
import com.bigkoo.pickerview.listener.OnOptionsSelectListener;
import com.bigkoo.pickerview.view.OptionsPickerView;
import com.bin23.music.interfaces.MyCallBack;
import com.contrarywind.interfaces.IPickerViewData;
import com.google.gson.Gson;

import org.json.JSONArray;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class RegionalChooseUtil {

    private static List<RegionalBean> options1Items = new ArrayList<>();
    private static ArrayList<ArrayList<String>> options2Items = new ArrayList<>();
    private static ArrayList<ArrayList<ArrayList<String>>> options3Items = new ArrayList<>();


    /**
     * 弹框展示
     * @return
     */
    public static void showPickerView(final Context context, final MyCallBack callBack) {// 弹出选择器
        OptionsPickerView pvOptions = new OptionsPickerBuilder(context, new OnOptionsSelectListener() {
            @Override
            public void onOptionsSelect(int options1, int options2, int options3, View v) {
                //返回的分别是三个级别的选中位置
                String opt1tx = options1Items.size() > 0 ?
                        options1Items.get(options1).getPickerViewText() : "";

                String opt2tx = options2Items.size() > 0
                        && options2Items.get(options1).size() > 0 ?
                        options2Items.get(options1).get(options2) : "";

                String opt3tx = options2Items.size() > 0
                        && options3Items.get(options1).size() > 0
                        && options3Items.get(options1).get(options2).size() > 0 ?
                        options3Items.get(options1).get(options2).get(options3) : "";

                String tx = opt1tx + opt2tx + opt3tx;
                ResultBean bean = new ResultBean(opt1tx, opt2tx, opt3tx);
                callBack.callBack(bean);

            }
        })
        .setTitleText("城市选择")
        .setDividerColor(Color.BLACK)
        .setTextColorCenter(Color.rgb(0, 153, 204)) //设置选中项文字颜色
        .setContentTextSize(16)
        .build();

//        pvOptions.setPicker(options1Items);//一级选择器
        pvOptions.setPicker(options1Items, options2Items);//二级选择器
//        pvOptions.setPicker(options1Items, options2Items, options3Items);//三级选择器
        pvOptions.show();

    }

    /**
     * 初始化弹框
     */
    public static void initJsonData(Context context) {//解析数据

        /**
         * 注意：assets 目录下的Json文件仅供参考，实际使用可自行替换文件
         * 关键逻辑在于循环体
         *
         * */
        String JsonData = getJson(context, "province.json");        // 获取 assets 目录下的json文件数据

        ArrayList<RegionalBean> jsonBean = parseData(JsonData);              // 用 Gson 转成实体

        /**
         * 添加省份数据
         *
         * 注意：如果是添加的JavaBean实体，则实体类需要实现 IPickerViewData 接口，
         * PickerView会通过getPickerViewText方法获取字符串显示出来。
         */
        options1Items = jsonBean;

        for (int i = 0; i < jsonBean.size(); i++) {//遍历省份
            ArrayList<String> cityList = new ArrayList<>();//该省的城市列表（第二级）
            ArrayList<ArrayList<String>> province_AreaList = new ArrayList<>();//该省的所有地区列表（第三极）

            for (int c = 0; c < jsonBean.get(i).getCityList().size(); c++) {//遍历该省份的所有城市
                String cityName = jsonBean.get(i).getCityList().get(c).getName();
                cityList.add(cityName);//添加城市
                ArrayList<String> city_AreaList = new ArrayList<>();//该城市的所有地区列表

                //如果无地区数据，建议添加空字符串，防止数据为null 导致三个选项长度不匹配造成崩溃
                /*if (jsonBean.get(i).getCityList().get(c).getArea() == null
                        || jsonBean.get(i).getCityList().get(c).getArea().size() == 0) {
                    city_AreaList.add("");
                } else {
                    city_AreaList.addAll(jsonBean.get(i).getCityList().get(c).getArea());
                }*/
                city_AreaList.addAll(jsonBean.get(i).getCityList().get(c).getArea());
                province_AreaList.add(city_AreaList);//添加该省所有地区数据
            }

            /**
             * 添加城市数据
             */
            options2Items.add(cityList);

            /**
             * 添加地区数据
             */
            options3Items.add(province_AreaList);
        }


    }

    private static ArrayList<RegionalBean> parseData(String result) {//Gson 解析
        ArrayList<RegionalBean> detail = new ArrayList<>();
        try {
            JSONArray data = new JSONArray(result);
            Gson gson = new Gson();
            for (int i = 0; i < data.length(); i++) {
                RegionalBean entity = gson.fromJson(data.optJSONObject(i).toString(), RegionalBean.class);
                detail.add(entity);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return detail;
    }

    // 读取Json文件
    private static String getJson(Context context, String fileName) {

        StringBuilder stringBuilder = new StringBuilder();
        try {
            AssetManager assetManager = context.getAssets();
            BufferedReader bf = new BufferedReader(new InputStreamReader(
                    assetManager.open(fileName)));
            String line;
            while ((line = bf.readLine()) != null) {
                stringBuilder.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return stringBuilder.toString();
    }

    /**
     * 地区省份选择
     */
    private class RegionalBean implements IPickerViewData {


        /**
         * name : 省份
         * city : [{"name":"北京市","area":["东城区","西城区","崇文区","宣武区","朝阳区"]}]
         */

        private String name;
        private List<CityBean> city;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<CityBean> getCityList() {
            return city;
        }

        public void setCityList(List<CityBean> city) {
            this.city = city;
        }

        // 实现 IPickerViewData 接口，
        // 这个用来显示在PickerView上面的字符串，
        // PickerView会通过IPickerViewData获取getPickerViewText方法显示出来。
        @Override
        public String getPickerViewText() {
            return this.name;
        }

    }

    /**
     * 城市对象
     */
    private class CityBean {
        /**
         * name : 城市
         * area : ["东城区","西城区","崇文区","昌平区"]
         */

        private String name;
        private List<String> area;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<String> getArea() {
            return area;
        }

        public void setArea(List<String> area) {
            this.area = area;
        }
    }

    /**
     * 选择结果
     */
    public static class ResultBean {
        private String province;
        private String city;
        private String area;

        public ResultBean(String province, String city, String area) {
            this.province = province;
            this.city = city;
            this.area = area;
        }


        public ResultBean() {
        }

        public String getProvince() {
            return province;
        }

        public void setProvince(String province) {
            this.province = province;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getArea() {
            return area;
        }

        public void setArea(String area) {
            this.area = area;
        }

        @Override
        public String toString() {
            return "ProvinceBean{" +
                    "province='" + province + '\'' +
                    ", city='" + city + '\'' +
                    ", area='" + area + '\'' +
                    '}';
        }
    }

}
```

回调接口`MyCallBack`

```java
package com.bin23.music.interfaces;

public interface MyCallBack {
    void callBack(Object object);
}

```

MeActivity中点击事件进行调用

```java
    /**
     * 城市选择点击事件
     * @param view
     */
    public void onAreaItemClick(View view) {
        // 弹窗显示
        RegionalChooseUtil.showPickerView(MeActivity.this, new MyCallBack() {
            @Override
            public void callBack(Object object) {
                // object 获取到城市选择结果
                Toast.makeText(MeActivity.this, object.toString(), Toast.LENGTH_SHORT).show();
            }
        });
    }
```

### 修改密码页面

1. UpdatePwActivity

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.bin23.music.R;

public class UpdatePwActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_pw);

        initView();
    }

    private void initView() {
        initToolBar(true, "修改密码");
    }

    public void onUpdatePwConfirmBtnClick(View view) {

    }
}
```

2. 布局的话基本上也和登录注册一样，直接复用

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activities.UpdatePwActivity">

    <include layout="@layout/toolbar"/>

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/logo"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="10dp"
        />

    <!-- 自定义的输入控件 -->

    <!-- 分割线的引用 -->
    <com.bin23.music.views.InputView
        android:id="@+id/input_old_password"
        android:layout_width="match_parent"
        android:layout_height="@dimen/inputViewHeight"
        android:layout_marginTop="@dimen/marginSize"
        app:input_hint="请输入原密码"
        app:input_icon="@mipmap/password"
        app:is_password="true">

    </com.bin23.music.views.InputView>

    <View style="@style/line" />

    <com.bin23.music.views.InputView
        android:id="@+id/input_new_password"
        android:layout_width="match_parent"
        android:layout_height="@dimen/inputViewHeight"
        android:layout_marginTop="@dimen/marginSize"
        app:input_icon="@mipmap/password"
        app:input_hint="请输入新密码"
        app:is_password="true"
        >

    </com.bin23.music.views.InputView>

    <com.bin23.music.views.InputView
        android:id="@+id/input_new_confirm_password"
        android:layout_width="match_parent"
        android:layout_height="@dimen/inputViewHeight"
        android:layout_marginTop="@dimen/marginSize"
        app:input_icon="@mipmap/password"
        app:input_hint="请确认新密码"
        app:is_password="true"
        >

    </com.bin23.music.views.InputView>


    <Button
        style="@style/commitBtn"
        android:text="确  认  修  改"
        android:layout_marginTop="@dimen/marginSize"
        android:onClick="onUpdatePwConfirmBtnClick"
        />

</LinearLayout>
```

3. 然后在我的资料页面添加点击事件

```java
    public void onUpdatePwItemClick(View view) {
        Intent intent = new Intent(MeActivity.this, UpdatePwActivity.class);
        startActivity(intent);
    }
```

### 主页的主要内容

上面的主页部分，我们已经处理了Toolbar和NavigationView这两部分了，接下来就是主要内容部分

1. 需求：这里展示歌单，网格布局的歌单，每行显示3个歌单

2. 实现：这里就需要用到`RecyclerView`了

   - 使用RecyclerView

   - 使用CardView

   - 使用AppBarLayout（解决Toolbar被RecyclerView遮挡的问题）

     > 因为它们（Toolbar、RecyclerView）都在CoordinatorLayout里面，然而CoordinatorLayout就和FrameLayout一样，是没什么可以定位的布局，所以会默认在左上角展开，那么就会使Toolbar被RecyclerView遮挡

#### 修改activity_main.xml布局

修改activity_main.xml布局，把Toolbar放在AppBarLayout中，解决Toolbar被RecyclerView遮挡的问题。

在加上AppBarLayout的同时，给RecyclerView加上一个行为`app:layout_behavior="@string/appbar_scrolling_view_behavior"`。

然后在Toolbar上加多一个属性`app:layout_scrollFlags="scroll|enterAlways|snap"`可以使在滚动的时候Toolbar能够显示和隐藏。

activity_main.xml

```xml
    <!--第一个DrawerLayout子控件，主要内容页面-->
    <!--CoordinatorLayout和FrameLayout基本一样，但是它可以自动响应布局-->
    <androidx.coordinatorlayout.widget.CoordinatorLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >

        <!-- 把Toolbar放在AppBarLayout中，解决Toolbar被RecyclerView遮挡的问题-->
        <com.google.android.material.appbar.AppBarLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
            <!--
                工具栏
                layout_scrollFlags属性:
                - scroll      表示Toolbar会跟着向上滚动并隐藏
                - enterAlways 表示Toolbar会跟着向下滚动并重新显示
                - snap        表示Toolbar会跟据距离显示还是隐藏
            -->
            <androidx.appcompat.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="?attr/colorPrimaryDark"
                android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
                app:popupTheme="@style/ThemeOverlay.AppCompat.Light"
                app:layout_scrollFlags="scroll|enterAlways|snap"
                />
        </com.google.android.material.appbar.AppBarLayout>

        <!-- 加上AppBarLayout的同时，给RecyclerView加上一个行为-->
        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/rv_grid"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_behavior="@string/appbar_scrolling_view_behavior"
            />

    </androidx.coordinatorlayout.widget.CoordinatorLayout>
```

#### 在MainActivity中初始化

声明RecyclerView控件，然后设置同一行显示3个。我们需要数据，数据显示就通过Adapter来实现，所以还需要Adapter

```java
        private RecyclerView mRvGrid;
        private MusicsGridAdapter mMgAdapter;


        mRvGrid = fd(R.id.rv_grid);
        // 设置同一行，3个元素，即显示3个歌单
        mRvGrid.setLayoutManager(new GridLayoutManager(this, 3));
        mMgAdapter = new MusicsGridAdapter(this);
        // 传入 adapter 显示数据
        mRvGrid.setAdapter(mMgAdapter);
```

##### MusicsGridAdapter

同样的套路

1. 写个ViewHolder内部类继承RecyclerView.ViewHolder，方便数据加载，而不用重新new出来
2. 然后这个MusicsGridAdapter继承RecyclerView.Adapter泛型是刚写的ViewHolde内部类
3. 声明Context上下文
4. 实现3个方法
   - onCreateViewHolder()
   - onBindViewHolder()
   - getItemCount()
5. 然后因为在onCreateViewHolder方法中，我们需要用到RecyclerView的子项（item）布局的View对象，所以我们得有这个子项布局，也就是说我们需要**写子项布局**。

```java
package com.bin23.music.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bin23.music.R;

public class MusicsGridAdapter extends RecyclerView.Adapter<MusicsGridAdapter.ViewHolder> {

    private Context mContext;

    public MusicsGridAdapter(Context context) {
        mContext = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (mContext == null) {
            mContext = parent.getContext();
        }
        return new ViewHolder(LayoutInflater.from(mContext).inflate(R.layout.item_grid_musics, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

    }

    @Override
    public int getItemCount() {
        return 6;
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            LinearLayout linearLayout = (LinearLayout)itemView;
        }
    }
}

```

##### Recycler View的子项布局----歌单item

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"
    android:background="@color/white">

    <androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="@dimen/marginSize"
        app:cardCornerRadius="16dp"
        android:elevation="16dp"
        >
        <ImageView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:scaleType="fitXY"
            android:src="@mipmap/img1"
            />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:gravity="right|center_vertical"
            android:layout_margin="@dimen/albumMarginSize"
            >
            <ImageView
                android:layout_width="@dimen/playNumImgSize"
                android:layout_height="@dimen/playNumImgSize"
                android:src="@mipmap/play_num"
                />
            <TextView
                android:id="@+id/tv_playNum"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="10.00万"
                android:textColor="@android:color/white"
                android:textSize="@dimen/TitleSize"
                android:textStyle="bold"
                android:layout_marginLeft="@dimen/albumMarginSize"

                />
        </LinearLayout>

    </androidx.cardview.widget.CardView>

    <TextView
        android:id="@+id/tv_name"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="@dimen/marginSize"
        android:text="歌单名称"
        android:textColor="@color/titleColor"
        android:textSize="@dimen/TitleSize"
        android:padding="@dimen/albumMarginSize"
        android:textStyle="bold"
        />

</LinearLayout>
```

### 实现下拉刷新

引入依赖

```gradle
// 下拉刷新
implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.1.0"
```

#### 修改activity_main.xml布局

1. 修改主内容CoordinationLayout的布局，布局如下进行嵌套

```
- SwipeReFreshLayout
  - ScrollView
    - LinearLayout
      - LinearLayout
    - RecyclerView
```

   			2. app:layout_behavior="@string/appbar_scrolling_view_behavior"加在SwipeReFreshLayout上面，而不是RecyclerView了
            			3. 主要效果
           - 能够下拉刷新
              - 有推荐歌单字样
			4. Activity这里

      - 设置网格歌单
      - 设置刷新逻辑，目前还未实现

activity_main.xml

```xml
...
	<!--第一个DrawerLayout子控件，主要内容页面-->
    <!--CoordinatorLayout和FrameLayout基本一样，但是它可以自动响应布局-->
    <androidx.coordinatorlayout.widget.CoordinatorLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >
        <!-- 把Toolbar放在AppBarLayout中，解决Toolbar被RecyclerView遮挡的问题-->
        <com.google.android.material.appbar.AppBarLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
            <!--
                工具栏
                layout_scrollFlags属性:
                - scroll      表示Toolbar会跟着向上滚动并隐藏
                - enterAlways 表示Toolbar会跟着向下滚动并重新显示
                - snap        表示Toolbar会跟据距离显示还是隐藏
            -->
            <androidx.appcompat.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="?attr/colorPrimaryDark"
                android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
                app:popupTheme="@style/ThemeOverlay.AppCompat.Light"
                app:layout_scrollFlags="scroll|enterAlways|snap"
                />
        </com.google.android.material.appbar.AppBarLayout>

        <androidx.swiperefreshlayout.widget.SwipeRefreshLayout
            android:id="@+id/swipe_refresh"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_behavior="@string/appbar_scrolling_view_behavior">

            <ScrollView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"

                >
                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:orientation="vertical"
                    >
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal"
                        android:gravity="center_vertical"
                        android:layout_marginTop="@dimen/marginSize"
                        android:layout_marginLeft="@dimen/marginSize"
                        android:layout_marginBottom="@dimen/marginSize"
                        >
                        <View
                            android:layout_width="4dp"
                            android:layout_height="22dp"
                            android:background="@color/mainColor"
                            >

                        </View>
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="推荐歌单"
                            android:textColor="@color/titleColor"
                            android:textSize="@dimen/TitleSize"
                            android:textStyle="bold"
                            android:layout_marginLeft="@dimen/marginTabSize"
                            />
                    </LinearLayout>

                    <!-- 加上AppBarLayout的同时，给RecyclerView加上一个行为-->
                    <androidx.recyclerview.widget.RecyclerView
                        android:id="@+id/rv_grid"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        />

                </LinearLayout>
            </ScrollView>

        </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>


    </androidx.coordinatorlayout.widget.CoordinatorLayout>
...
```

#### 在MainActivity中初始化

把网格布局的设置进行封装，然后下拉刷新也封装，如下

```java
	...
	private SwipeRefreshLayout swipeRefresh;
	...
    private void initView() {
        // 设置、初始化Toolbar
        toolbar = fd(R.id.toolbar);
        setSupportActionBar(toolbar);
        // 滑动布局
        mDrawerLayout = fd(R.id.drawer_layout);
        // 侧边导航栏 NavigationView
        navView = fd(R.id.nav_view);
        // 网格歌单 RecyclerView
        mRvGrid = fd(R.id.rv_grid);

        swipeRefresh = fd(R.id.swipe_refresh);
        setSwipeRefresh();
    }

/**
     * 设置主页的主要部分-歌单的数据显示
     */
    private void setMusicsGrid() {
        // 设置同一行，3个元素，即显示3个歌单
        mRvGrid.setLayoutManager(new GridLayoutManager(this, 3));
        mMgAdapter = new MusicsGridAdapter(this);
        // 传入 adapter 显示数据
        mRvGrid.setAdapter(mMgAdapter);
    }

    /**
     * 设置刷新圈圈颜色、刷新逻辑
     */
    private void setSwipeRefresh() {
        swipeRefresh.setColorSchemeColors(R.color.mainColorH);
        swipeRefresh.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                // 处理刷新逻辑，这里更换下歌单封面
                reFreshPlayList();
            }
        });
    }

    private void reFreshPlayList() {

    }

```

### 歌单列表页面

#### 完整代码如下

AlbumActivity

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import com.bin23.music.R;
import com.bin23.music.adapters.MusicsListAdapter;

public class AlbumActivity extends BaseActivity {

    private RecyclerView mRvList;
    private MusicsListAdapter mMusicsListAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_album);

        initView();
    }

    private void initView() {
        initToolBar(true, "歌单");

        mRvList = fd(R.id.rv_list);
        mRvList.setLayoutManager(new LinearLayoutManager(this));
        mRvList.addItemDecoration(new DividerItemDecoration(this,DividerItemDecoration.VERTICAL));
        mRvList.setNestedScrollingEnabled(false);
        // ScrollView和RecyclerView嵌套会出现问题，RecyclerView高度计算不准确
        // 解决
        // 1. 不知道列表高度，需要我们手动计算高度
        //    -  直接在Adapter中计算

        mMusicsListAdapter = new MusicsListAdapter(this, mRvList);
        mRvList.setAdapter(mMusicsListAdapter);
    }
}
```

MusicsListAdapter

```java
package com.bin23.music.adapters;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.bin23.music.R;
import com.bin23.music.activities.PlayMusicActivity;

public class MusicsListAdapter extends RecyclerView.Adapter<MusicsListAdapter.ViewHolder> {

    private Context mContext;

    private View mItemView;
    private RecyclerView mRv;
    private boolean isCalculatedRvHeight;

    public MusicsListAdapter(Context context, RecyclerView recyclerView) {
        mContext = context;
        mRv = recyclerView;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (mContext == null) {
            mContext = parent.getContext();
        }
        mItemView = LayoutInflater.from(mContext).inflate(R.layout.item_list_musics, parent, false);
        return new ViewHolder(mItemView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        setRecyclerViewHeight();
    }

    @Override
    public int getItemCount() {
        return 20;
    }

    /**
     * 获取itemView的高度/数量
     * 即可计算出RecyclerView的高度
     */
    private void setRecyclerViewHeight() {
        if (isCalculatedRvHeight || mRv == null) return;

        isCalculatedRvHeight = true;
        // 获取itemView的高度
        RecyclerView.LayoutParams itemViewLp = (RecyclerView.LayoutParams)mItemView.getLayoutParams();
        // 获取itemView的数量
        int itemCount = getItemCount();
        // 计算高度
        int recyclerViewHeight = itemViewLp.height * itemCount;
        // 设置高度
        LinearLayout.LayoutParams rvLp = (LinearLayout.LayoutParams)mRv.getLayoutParams();
        rvLp.height = recyclerViewHeight;
        mRv.setLayoutParams(rvLp);
    }

    class ViewHolder extends RecyclerView.ViewHolder {

        ImageView ivIcon;
        View itemView;
        TextView TvName,TvAuthor;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.itemView=itemView;
            ivIcon=itemView.findViewById(R.id.iv_song_cover_icon);
            TvName=itemView.findViewById(R.id.tv_song_name);
            TvAuthor=itemView.findViewById(R.id.tv_song_author);
        }
    }
}
```

activity_album.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".activities.AlbumActivity">

    <include layout="@layout/toolbar"/>

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            >
            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="horizontal"
                >
                <androidx.cardview.widget.CardView
                    android:layout_width="90dp"
                    android:layout_height="90dp"
                    android:layout_margin="@dimen/marginSize"
                    app:cardCornerRadius="8dp"
                    android:elevation="8dp"
                    >

                    <com.bin23.music.views.WEqualHeightImageView
                        android:id="@+id/iv_playlist_head_left_icon"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:scaleType="fitXY"
                        android:src="@mipmap/img1"
                        />

                </androidx.cardview.widget.CardView>

                <TextView
                    android:id="@+id/tv_playlist_name_n"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/marginSize"
                    android:text="【纯音乐】听，窗外的声音"
                    />

            </LinearLayout>

            <androidx.recyclerview.widget.RecyclerView
                android:id="@+id/rv_list"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                />
        </LinearLayout>
    </ScrollView>

</LinearLayout>
```

item_list_musics.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="@dimen/marginSize"
    android:orientation="horizontal"
    android:background="@drawable/item_commit_select"
    >

    <ImageView
        android:id="@+id/iv_song_cover_icon"
        android:layout_width="@dimen/itemSongCoverIconSize"
        android:layout_height="@dimen/itemSongCoverIconSize"
        android:src="@mipmap/img1"/>

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:orientation="vertical"
        android:layout_marginLeft="@dimen/marginSize"
        >
        <TextView
            android:id="@+id/tv_song_name"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:text="音乐名称"
            android:textColor="@color/titleColor"
            android:textSize="@dimen/TitleSize"
            android:textStyle="bold"
            />
        <TextView
            android:id="@+id/tv_song_author"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textColor="@color/infoColor"
            android:textSize="@dimen/infoSize"
            android:text="作者"
            />
    </LinearLayout>

<!--    <ImageView-->
<!--        android:layout_width="@dimen/MusicPlaySize"-->
<!--        android:layout_height="@dimen/MusicPlaySize"-->
<!--        android:src="@mipmap/play"-->
<!--        android:layout_gravity="center_vertical"-->
<!--        android:layout_marginLeft="@dimen/marginSize"-->
<!--        />-->

</LinearLayout>
```

#### 从布局说起

顶部还是一样，toolbar，然后下来就一个ScrollView，里面放LinearLayout，然后再里面就左边一个歌单封面，右边就歌单名称，下面就是一个RecyclerView。

##### 解决高度计算问题

使用RecyclerView还是一样，然后ScrollView和RecyclerView以线性的方式一起使用的话，会出现高度计算不准确的问题，需要解决。

```java
    private Context mContext;

    private RecyclerView mRv;
    private boolean isCalculatedRvHeight;

    public MusicsListAdapter(Context context, RecyclerView recyclerView) {
        mContext = context;
        mRv = recyclerView;
    }


	/**
     * 获取itemView的高度/数量
     * 即可计算出RecyclerView的高度
     */
    private void setRecyclerViewHeight() {
        if (isCalculatedRvHeight || mRv == null) return;

        isCalculatedRvHeight = true;
        // 获取itemView的高度
        RecyclerView.LayoutParams itemViewLp = (RecyclerView.LayoutParams)mItemView.getLayoutParams();
        // 获取itemView的数量
        int itemCount = getItemCount();
        // 计算高度
        int recyclerViewHeight = itemViewLp.height * itemCount;
        // 设置高度
        LinearLayout.LayoutParams rvLp = (LinearLayout.LayoutParams)mRv.getLayoutParams();
        rvLp.height = recyclerViewHeight;
        mRv.setLayoutParams(rvLp);
    }
```

##### Recycler View的子项布局-歌曲item

其实也没什么好说的，还是一样的操作。

算了，主要代码就在上面，没什么好说的。

## 音乐播放页面

### PlayMusicActivity

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;

import com.bin23.music.R;
import com.bin23.music.views.PlayMusicView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;

import jp.wasabeef.glide.transformations.BlurTransformation;

public class PlayMusicActivity extends BaseActivity {

    private ImageView mIvBg;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_play_music);
        // 隐藏statusBar
//        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        
        initView();
    }

    private void initView() {
        mIvBg = fd(R.id.iv_bg);

        Glide.with(this)
                .load("https://th.bing.com/th/id/Rafa07faa2f0e044cd86319d5bb7f9908?rik=HVdVHQur3UAvrw&riu=http%3a%2f%2fp3.music.126.net%2fNsMBYe-88XPS0BZjGH4opw%3d%3d%2f7710875046485282.jpg&ehk=6L5vfizAnxM9rhIZC6ypH64wnwLzQ%2ftEVfZO5pcRnzo%3d&risl=&pid=ImgRaw")
                // 提供applay()方法
                //   - 接收RequestOptions参数，可以对图片进行配置，有bitmapTransform()方法将Transformation封装到RequestOptions对象里面，而RequestOptions实现Transformation
                // bitmapTransform()方法
                //   - 接收TransFormation参数，我们可以new出BlurTransformation()进行高斯模糊处理，其参数一，模糊程度，参数二，宽高为原图片十分之一
                .apply(RequestOptions.bitmapTransform(new BlurTransformation(80,3)))
                .into(mIvBg);
    }

    // 后退按钮点击事件
    public void onBackClick(View view){
        onBackPressed();
    }
}
```

### activity_play_music.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activities.PlayMusicActivity">

    <ImageView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/iv_bg"
        android:scaleType="centerCrop"
        android:src="@mipmap/img1"
        />

    <!-- 唱片部分 下面通过自定义View实现 -->

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/no_bar_back"
        android:layout_margin="@dimen/marginSize"
        android:onClick="onBackClick"
        />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="480dp"
        android:orientation="vertical"
        android:gravity="center_horizontal"
        >
        <TextView
            android:id="@+id/tv_name"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="@dimen/TitleSize"
            android:text="音乐名称"
            android:textColor="@android:color/white"
            android:textStyle="bold"

            >

        </TextView>

        <TextView
            android:id="@+id/tv_author"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="@dimen/TitleSize"
            android:text="作者"
            android:textColor="@android:color/white"
            android:textStyle="bold"
            android:layout_marginTop="@dimen/marginSize"
            >

        </TextView>
    </LinearLayout>

</FrameLayout>
```

### 自定义View-PlayMusicView

#### PlayMusicView

```java
public class PlayMusicView extends FrameLayout {

    private Context mContext;

    private View mView;

    public PlayMusicView(@NonNull Context context) {
        super(context);
        init(context, null);
    }

    public PlayMusicView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public PlayMusicView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    public PlayMusicView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        mContext = context;
        // 还是一样生成一个View，通过Layout
        mView = LayoutInflater.from(mContext).inflate(R.layout.play_music, this, false);

        addView(mView);
    }

    /**
     * 设置唱片中显示的音乐封面
     * @param iconUrl
     */
    public void setMusicCover(String iconUrl) {
        Glide.with(mContext)
                .load(iconUrl)
                .into(mIvCoverIcon);
    }

}
```

#### play_music.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_margin="@dimen/marginSize"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <!-- 唱片 -->
    <FrameLayout
        android:id="@+id/fl_playMusic"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="@dimen/discTopSize"
        >
        <!-- 唱片最外黑圈 -->
        <ImageView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:src="@mipmap/disc"
            />
        <!-- 圆形封面 -->
        <de.hdodenhof.circleimageview.CircleImageView
            android:id="@+id/iv_circle_cover_icon"
            android:layout_width="@dimen/playMusicIconSize"
            android:layout_height="@dimen/playMusicIconSize"
            android:layout_gravity="center"
            app:civ_border_width="2dp"
            app:civ_border_color="@android:color/black"
            />
        <!-- 播放按钮 -->
        <ImageView
            android:id="@+id/iv_music_play"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:src="@mipmap/play_music"
            android:visibility="gone"
            />

    </FrameLayout>

    <!-- 指针 -->
    <ImageView
        android:id="@+id/iv_needle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/new_needle"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="5dp"
        android:layout_marginLeft="30dp"
        />

</FrameLayout>
```

### 自定义动画-唱片转动以及指针转动

总共需要3个动画

1. 唱片一直围绕本省中心转动
2. 指针进来
3. 指针离开

#### 唱片转动

play_music_animation.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:interpolator="@android:anim/linear_interpolator"
    >
    <!-- interpolator 指定动画执行方式 ：平滑、前快后慢等-->

    <!--
        从起始坐标 0 到 终点坐标 360
        以50%，即以中心旋转
        duration执行时间
        repeatCount : 设置为一直转动-->
    <rotate
        android:fromDegrees="0"
        android:toDegrees="360"
        android:pivotX="50%"
        android:pivotY="50%"
        android:duration="@integer/play_music_disc_anim_duration"

        android:repeatCount="infinite"
        />

</set>
```

#### 指针转动

play_needle_anim.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:interpolator="@android:anim/linear_interpolator"
    >

    <rotate
        android:fromDegrees="-20"
        android:toDegrees="0"
        android:pivotY="0"
        android:pivotX="0"
        android:duration="@integer/play_needle_disc_anim_duration"
        />

</set>
```

stop_needle_anim.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:interpolator="@android:anim/linear_interpolator"
    android:fillAfter="true">
    <!--    保持在最后一帧-->

    <rotate
        android:fromDegrees="0"
        android:toDegrees="-20"
        android:pivotY="0"
        android:pivotX="0"
        android:duration="@integer/play_needle_disc_anim_duration"
        />

</set>
```



### 音乐帮助类

#### MediaPlayerHelper

```java
package com.bin23.music.helps;

import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;

import java.io.IOException;

public class MediaPlayerHelper {

    private static MediaPlayerHelper instance;

    private Context mContext;
    private MediaPlayer mMediaPlayer;

    private OnMediaPlayerHelperListener onMediaPlayerHelperListener;

    private String mPath;

    public void setOnMediaPlayerHelperListener(OnMediaPlayerHelperListener onMediaPlayerHelperListener) {
        this.onMediaPlayerHelperListener = onMediaPlayerHelperListener;
    }

    /**
     * 单例器
     * @param context
     * @return
     */
    public static MediaPlayerHelper getInstance(Context context) {
        if (instance == null) {
            synchronized (MediaPlayerHelper.class) {
                if (instance == null) {
                    instance = new MediaPlayerHelper(context);
                }
            }
        }
        return instance;
    }



    private MediaPlayerHelper(Context context) {
        mContext = context;
        mMediaPlayer = new MediaPlayer();
    }

    // MediaPlayer需要拥有什么方法？
    // setPath: 需要知道当前要播放哪首音乐，音乐的播放地址
    // start:   需要播放这首音乐
    // pause:   需要暂停这首音乐

    /**
     * 设置播放哪首音乐
     * @param path
     */
    public void setPath(String path) {
        mPath = path;
        // 1.音乐正在播放，那么重置播放状态
        // 2.设置播放音乐路径
        // 3.准备播放
        if (mMediaPlayer.isPlaying()) {
            mMediaPlayer.reset();
        }
        try {
            mMediaPlayer.setDataSource(mContext, Uri.parse(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
        mMediaPlayer.prepareAsync();
        // 监听异步加载，获得异步加载后的通知
        mMediaPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mp) {
                if (onMediaPlayerHelperListener != null) {
                    onMediaPlayerHelperListener.onPrepared(mp);
                }
            }
        });
    }

    /**
     * 返回正在播放的音乐路径
     * @return
     */
    public String getPath() {
        return mPath;
    }

    /**
     * 开始播放音乐
     */
    public void start() {
        if (mMediaPlayer.isPlaying()) {
            return;
        }
        mMediaPlayer.start();
    }

    /**
     * 暂停播放音乐
     */
    public void pause() {
        mMediaPlayer.pause();
    }
    public interface OnMediaPlayerHelperListener {
        void onPrepared(MediaPlayer mp);
    }
}
```

### 完善代码

```java
package com.bin23.music.views;

import android.content.Context;
import android.media.MediaPlayer;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.FrameLayout;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bin23.music.R;
import com.bin23.music.helps.MediaPlayerHelper;
import com.bumptech.glide.Glide;

public class PlayMusicView extends FrameLayout {

    private Context mContext;

    private View mView;

    private ImageView mIvCoverIcon;

    private Animation mPlayMusicAnim, mPlayNeedleAnim, mStopNeedleAnim;

    private FrameLayout mFlPlayMusic;
    private ImageView mIvNeedle;

    // 播放按钮
    private ImageView mIvMusicPlay;
    // 播放状态
    private boolean isPlaying;
    // 音乐播放帮助类
    private MediaPlayerHelper mMediaPlayerHelper;

    private String mPath;

    public PlayMusicView(@NonNull Context context) {
        super(context);
        init(context, null);
    }

    public PlayMusicView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public PlayMusicView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    public PlayMusicView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        mContext = context;
        // 还是一样生成一个View，通过Layout
        mView = LayoutInflater.from(mContext).inflate(R.layout.play_music, this, false);

        mIvCoverIcon = mView.findViewById(R.id.iv_circle_cover_icon);
        mIvMusicPlay = mView.findViewById(R.id.iv_music_play);


        /**
         * 1. 定义所需要执行的动画
         *      - 唱片转动的动画
         *      - 指针指向唱片的动画
         *      - 指针离开唱片的动画
         * 2. 安卓为View提供的startAnimation方法，使View执行动画
         */

        // 初始化创建的动画
        mPlayMusicAnim = AnimationUtils.loadAnimation(mContext, R.anim.play_music_animation);
        mPlayNeedleAnim = AnimationUtils.loadAnimation(mContext, R.anim.play_needle_anim);
        mStopNeedleAnim = AnimationUtils.loadAnimation(mContext, R.anim.stop_needle_anim);
        // 接下来调用 安卓为View提供的startAnimation方法，先声明下需要执行动画的View，写在了上面
        mFlPlayMusic = mView.findViewById(R.id.fl_playMusic);
        mFlPlayMusic.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                trigger();
            }
        });
        mIvNeedle = mView.findViewById(R.id.iv_needle);

//        mIvMusicPlay.setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View v) {
//
//            }
//        });

        addView(mView);

        mMediaPlayerHelper = MediaPlayerHelper.getInstance(mContext);
    }

    /**
     * 设置唱片中显示的音乐封面
     * @param iconUrl
     */
    public void setMusicCover(String iconUrl) {
        Glide.with(mContext)
                .load(iconUrl)
                .into(mIvCoverIcon);
    }

    /**
     * 切换播放状态
     */
    private void trigger() {
        if (isPlaying) {
            stopMusic();
        } else {
            playMusic(mPath);
        }
    }

    /**
     * 播放音乐执行动画效果，并播放音乐
     */
    public void playMusic(String path) {
        mPath = path;
        isPlaying = true;
        mIvMusicPlay.setVisibility(View.GONE);
        mFlPlayMusic.startAnimation(mPlayMusicAnim);
        mIvNeedle.startAnimation(mPlayNeedleAnim);
        // 1.判断当前音乐是否已经是在播放的音乐
        // 2.如果当前的音乐是在播放的音乐，那么直接执行start()
        // 3.如果当前音乐不是需要播放的音乐的时候，直接setPath()
        if (mMediaPlayerHelper.getPath() != null && mMediaPlayerHelper.getPath().equals(path)) {
            mMediaPlayerHelper.start();
        } else {
            mMediaPlayerHelper.setPath(path);
            // 监听当前要播放的音乐是否准备完成了，完成就执行start()
            mMediaPlayerHelper.setOnMediaPlayerHelperListener(new MediaPlayerHelper.OnMediaPlayerHelperListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    mMediaPlayerHelper.start();
                }
            });
        }
    }

    public void stopMusic() {
        isPlaying = false;
        mIvMusicPlay.setVisibility(View.VISIBLE);
        mFlPlayMusic.clearAnimation();
        mIvNeedle.startAnimation(mStopNeedleAnim);

        mMediaPlayerHelper.pause();
    }
}
```

## Realm数据库

### 如何引入？

直接看官方文档

> [https://docs.mongodb.com/realm/sdk/android/](https://docs.mongodb.com/realm/sdk/android/)

### 初始化

```java
package com.bin23.music;

import android.app.Application;

import com.blankj.utilcode.util.Utils;

import io.realm.Realm;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        // 初始化 AndroidUtilCode
        Utils.init(this);
        // 初始化 Realm
        Realm.init(this);
    }
}

```

### RealmHelper

```java
package com.bin23.music.helps;

import com.bin23.music.model.UserModel;

import java.util.List;

import io.realm.Realm;
import io.realm.RealmQuery;
import io.realm.RealmResults;

public class RealmHelper {

    private Realm mRealm;

    public RealmHelper() {
        mRealm=Realm.getDefaultInstance();
    }

    /**
     * 关闭数据库
     */
    public void close() {
        if(mRealm!=null || !mRealm.isClosed())
            mRealm.close();
    }

}
```

### 注册功能

继续编辑之前的UserUtils类，加上Realm数据库，将数据存放到数据库中，进而实现用户注册功能。

有一个概念——数据模型，我们需要数据模型作为用户数据的载体，Realm将操作数据模型的对象，所以我们写一个数据模型——UserModel

#### UserModel

数据模型需要继承RealmObject

```java
package com.bin23.music.model;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.Required;

public class UserModel extends RealmObject {
    @PrimaryKey
    private String phone;
    @Required
    private String password;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```

#### 基本逻辑思路

1. 在RealmHelper类中编写插入数据模型到数据库中的方法

   ```java
   	public void saveUser(UserModel userModel) {
           mRealm.beginTransaction();
           mRealm.insert(userModel);
           mRealm.commitTransaction();
       }
   ```

2. 在UserUtils中编写用户注册的业务方法，其主要业务逻辑就是调用RealmHelper类的插入方法

   ```java
       /**
        * 用户注册方法
        * @param context
        * @param phone
        * @param password
        * @param passwordConfirm
        * @return
        */
       public static boolean register(Context context, String phone, String password, String passwordConfirm){
           // 判断注册输入数据是否合法，如果不合法返回false
           if (!validationOfRegister(context, phone, password, passwordConfirm)) {
               return false;
           }
   
           UserModel user = new UserModel();
           user.setPhone(phone);
           user.setPassword(EncryptUtils.encryptMD5ToString(password));
   
           saveUser(user);
           return true;
       }
   
       /**
        * 存储用户数据到数据库
        * @param userModel
        */
       public static void saveUser(UserModel userModel){
           RealmHelper realmHelp = new RealmHelper();
           realmHelp.saveUser(userModel);
           realmHelp.close();
       }
   ```

3. 点击事件调用UserUtils的注册方法

   ```java
   public void onRegisterClick(View view) {
       String phone = mIvPhone.getInputStr().trim();
       String password = mIvPassword.getInputStr().trim();
       String passwordC = mIvPasswordConfirm.getInputStr().trim();
       // 进行注册，返回注册结果
       boolean res = UserUtils.register(this, phone, password, passwordC);
       if (!res) {
           return;
       }
       onBackPressed();
   }
   ```

#### 注册的验证

```java
    /**
     * 注册验证的封装
     * 使用RegexUtils进行注册输入数据的合法性验证
     * 还使用UserUtils本身提供的验证手机号是否已经注册的方法来判断
     * @param context
     * @param phone
     * @param password
     * @param passwordConfirm
     * @return
     */
    public static boolean validationOfRegister(Context context, String phone, String password, String passwordConfirm) {
        if(!RegexUtils.isMobileExact(phone)){
            showToast(context, PHONE_INVALID);
            return false;
        }
        if(StringUtils.isEmpty(password)){
            showToast(context, PASSWORD_IS_EMPTY);
            return false;
        }
        if(!password.equals(passwordConfirm)){
            showToast(context, PASSWORD_NOT_EQUAL);
            return false;
        }
        // 判断用户当前输入的手机号是否已经被注册
        if (UserUtils.userExistFromPhone(phone)) {
            showToast(context, PHONE_HAS_EXITS);
            return false;
        }
        return true;
    }

    /**
     * 根据手机号判断用户是否存在
     * @param phone
     */
    public static boolean userExistFromPhone(String phone) {
        boolean res = false;
        // 获取数据库中所有用户数据
        RealmHelper realmHelper = new RealmHelper();
        List<UserModel> allUser = realmHelper.getAllUser();
        // 循环遍历匹配是否已存在传入的 phone
        for (UserModel userModel : allUser) {
            if (userModel.getPhone().equals(phone)) {
                res = true;
                break;
            }
        }
        realmHelper.close();
        return res;
    }
```

完善的

```java
package com.bin23.music.helps;

import com.bin23.music.model.UserModel;

import java.util.List;

import io.realm.Realm;
import io.realm.RealmQuery;
import io.realm.RealmResults;

public class RealmHelper {

    private Realm mRealm;

    public RealmHelper() {
        mRealm=Realm.getDefaultInstance();
    }

    /**
     * 关闭数据库
     */
    public void close() {
        if(mRealm!=null || !mRealm.isClosed())
            mRealm.close();
    }

    /**
     * 保存用户信息
     * @param userModel
     */
    public void saveUser(UserModel userModel) {
        mRealm.beginTransaction();
        mRealm.insert(userModel);
        mRealm.commitTransaction();
    }

    public List<UserModel> getAllUser() {
        RealmQuery<UserModel> query = mRealm.where(UserModel.class);
        return query.findAll();
    }

    public boolean validateUser(String phone, String password) {
        boolean res = false;
        RealmQuery<UserModel> query = mRealm.where(UserModel.class);
        query = query.equalTo("phone", phone).equalTo("password", password);
        UserModel user = query.findFirst();
        if (user != null) {
            res = true;
        }
        return res;
    }

}
```

### 登录功能



#### 基本逻辑思路

1. 在RealmHelper中实现验证手机号和密码是否匹配的方法

   ```java
       /**
        * 验证用户，用于登录，查询输入的手机号与密码与数据库中的是否匹配
        * @param phone
        * @param password
        * @return
        */
       public boolean validateUser(String phone, String password) {
           boolean res = false;
           RealmQuery<UserModel> query = mRealm.where(UserModel.class);
           query = query.equalTo("phone", phone).equalTo("password", password);
           UserModel user = query.findFirst();
           if (user != null) {
               res = true;
           }
           return res;
       }
   ```

2. 在UserUtils中调用RealmHelper中的验证用户的方法

   ```java
       /**
        * 用户登录方法
        * @param context
        * @param phone
        * @param password
        * @return
        */
       public static boolean login(Context context, String phone, String password) {
           // 判断登录输入数据是否合法，如果不合法返回false
           if (!validationOfLogin(context, phone, password)) {
               return false;
           }
   
           RealmHelper realmHelper = new RealmHelper();
           boolean res = realmHelper.validateUser(phone, EncryptUtils.encryptMD5ToString(password));
           realmHelper.close();
           if (!res) {
               showToast(context, LOGIN_FAIL);
               return false;
           }
   
           return true;
       }
   ```

3. 点击事件调用UserUtils的登录方法

   ```java
       /**
        * 登录
        */
       public void onCommitClick(View view) {
           String phone = mIvPhone.getInputStr();
           String password = mIvPassword.getInputStr();
           if (!UserUtils.login(this, phone, password)) {
               return;
           }
           Intent intent = new Intent(this, MainActivity.class);
           startActivity(intent);
           finish();
       }
   ```

#### 登录的验证

```java
    /**
     * 登录验证的封装
     * 使用RegexUtils进行登录输入数据的合法性验证
     * 还使用UserUtils本身提供的验证手机号是否已经注册的方法来判断
     * 1.验证手机号是否为空
     * 2.验证手机号是否合法
     * 3.验证密码是否为空
     *
     * 4.验证手机号是否已经注册
     * 5.验证用户输入的手机号和密码是否匹配
     * @param context
     * @param phone
     * @param password
     * @return 合法返回true，不合法返回false
     */
    public static boolean validationOfLogin(Context context, String phone, String password) {
        if (TextUtils.isEmpty(phone)) {
            showToast(context, PHONE_IS_EMPTY);
            return false;
        }
        if (!RegexUtils.isMobileExact(phone)) {
            showToast(context, PHONE_INVALID);
            return false;
        }
        if (TextUtils.isEmpty(password)) {
            showToast(context, PASSWORD_IS_EMPTY);
            return false;
        }
        if (!UserUtils.userExistFromPhone(phone)) {
            showToast(context, PHONE_NO_EXITS);
            return false;
        }
        return true;
    }
```

### 自动登录的实现

#### UserHelper

```java
package com.bin23.music.helps;

/**
 * 用户帮助类
 * 1.用户登录
 *    - 当用户登录时，使用 SharedPreferences 保存登录用户的用户标记
 *    - 使用全局单例类 UserHelper 保存登录用户信息
 *      -- 用户登录之后，如果重新打开App，那么就检查 SharedPreferences 中是否存在登录用户标记
 *      -- 存在->为 UserHelper 赋值，并且进入主页
 *      -- 不存在，则进入登录页面
 * 2.用户退出
 *    - 删除 SharedPreferences 的标记，回到登录页面
 */
public class UserHelper {

    private static UserHelper instance;
    // phone 作为 标记
    private String phone;

    private UserHelper() {

    }

    public static UserHelper getInstance() {
        if (instance == null) {
            synchronized (UserHelper.class) {
                if (instance == null) {
                    instance = new UserHelper();
                }
            }
        }
        return instance;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
```

#### SharedPreferencesUtil

主要三个方法

1. 当用户登录时，使用 SharedPreferences 保存登录用户的用户标记

   ```java
   	public static boolean saveUser(Context context, String phone){
           SharedPreferences sp = context.getSharedPreferences(SPConstants.SP_NAME_USER, Context.MODE_PRIVATE);
   
           SharedPreferences.Editor editor = sp.edit();
           editor.putString(SPConstants.SP_KEY_PHONE,phone);
           boolean result = editor.commit();
           return  result;
       }
   ```

   那么在哪里调用这个方法？显然是在登录的时候，那么就来UserUtils

   ```java
   public static boolean login(Context context, String phone, String password) {
           // 判断登录输入数据是否合法，如果不合法返回false
           if (!validationOfLogin(context, phone, password)) {
               return false;
           }
   
           ....
           // 保存用户标记，为实现自动登录做准备
           boolean isSave = SharedPreferencesUtil.saveUser(context, phone);
           if (!isSave) {
               showToast(context, SAVE_USER_TO_SP_FAIL);
               return false;
           }
           // 在全局单例类中保存用户登录标记
           UserHelper.getInstance().setPhone(phone);
   
           return true;
       }
   ```

   用户登录之后，如果重新打开App，那么就检查 SharedPreferences 中是否存在登录用户标记。有就进入主页，没有就进入登录页面。

2. 如何检查 SharedPreferences 中是否存在登录用户标记？就去 SharedPreferences 拿出来，看存不存在。

   ```java
       /**
        * 判断当前是否存在已登录用户
        * @param context
        * @return
        */
       public static boolean isLoginUser(Context context){
           boolean result = false;
   
           SharedPreferences sp = context.getSharedPreferences(SPConstants.SP_NAME_USER, Context.MODE_PRIVATE);
   
           String phone = sp.getString(SPConstants.SP_KEY_PHONE, "");
           // 从 SP 中取出来不为空，说明存在已登录用户
           if (!TextUtils.isEmpty(phone)) {
               result = true;
               UserHelper.getInstance().setPhone(phone);
           }
           return result;
       }
   ```

   在哪里调用这个方法？显然是欢迎页面。那就来到WelcomeActivity

   ```java
       private void init() {
           // 用户自动登录，判断是否已经登录，已经登录则进入主页，否则进入登录页面
           final boolean isLogin = SharedPreferencesUtil.isLoginUser(this);
   
           mTimer = new Timer();
           // schedule(TimerTask task, long delay)
           // 作用
           //   - 等待delay毫秒后执行且仅执行一次task (单次)。
           mTimer.schedule(new TimerTask() {
               @Override
               public void run() {
                   // Log.e("WelcomeActivity", "当前线程为:" + Thread.currentThread().getName());
                   // 跳转到MainActivity
   //                toMain();
                   if (isLogin) {
                       toMain();
                   } else {
                       toLogin();
                   }
               }
           }, 2 * 1000);
       }
   ```

3. 退出登录，删除 SharedPreferences 的标记，回到登录页面

   ```java
       /**
        * 移除标记
        * @param context
        * @return
        */
       public static boolean removeUser(Context context){
           SharedPreferences sp = context.getSharedPreferences(SPConstants.SP_NAME_USER, Context.MODE_PRIVATE);
   
           SharedPreferences.Editor editor = sp.edit();
           editor.remove(SPConstants.SP_KEY_PHONE);
           boolean result = editor.commit();
           return result;
       }
   ```

##### 完整SharedPreferencesUtil

```java
package com.bin23.music.utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

import com.bin23.music.constants.SPConstants;
import com.bin23.music.helps.UserHelper;

public class SharedPreferencesUtil {

    /**
     * 当用户登录时，使用 SharedPreferences 保存登录用户的用户标记
     * @param context
     * @param phone
     * @return
     */
    public static boolean saveUser(Context context, String phone){
        SharedPreferences sp=context.getSharedPreferences(SPConstants.SP_NAME_USER, Context.MODE_PRIVATE);

        SharedPreferences.Editor editor=sp.edit();
        editor.putString(SPConstants.SP_KEY_PHONE,phone);
        boolean result=editor.commit();
        return  result;
    }

    /**
     * 判断当前是否存在已登录用户
     * @param context
     * @return
     */
    public static boolean isLoginUser(Context context){
        boolean result = false;

        SharedPreferences sp = context.getSharedPreferences(SPConstants.SP_NAME_USER, Context.MODE_PRIVATE);

        String phone = sp.getString(SPConstants.SP_KEY_PHONE, "");
        // 从 SP 中取出来不为空，说明存在已登录用户
        if (!TextUtils.isEmpty(phone)) {
            result = true;
            UserHelper.getInstance().setPhone(phone);
        }
        return result;
    }

    /**
     * 移除标记
     * @param context
     * @return
     */
    public static boolean removeUser(Context context){
        SharedPreferences sp = context.getSharedPreferences(SPConstants.SP_NAME_USER, Context.MODE_PRIVATE);

        SharedPreferences.Editor editor = sp.edit();
        editor.remove(SPConstants.SP_KEY_PHONE);
        boolean result = editor.commit();
        return result;
    }
}

```

##### SPConstants

```java
package com.bin23.music.constants;

public class SPConstants {
    public static final String SP_NAME_USER="user";
    public static final String SP_KEY_PHONE="phone";
}
```



### 一系列封装

```java
    /**
     * 一系列封装
     */
    private static final String PHONE_IS_EMPTY = "手机号为空，请输入手机号";
    private static final String PHONE_INVALID = "请输入正确的手机号";
    private static final String PASSWORD_IS_EMPTY = "密码为空，请输入密码";
    private static final String PASSWORD_NOT_EQUAL = "请确认两次密码输入是否一致";
    private static final String PHONE_HAS_EXITS = "该手机号已经注册";
    private static final String PHONE_NO_EXITS = "该手机号未注册";
    private static final String LOGIN_FAIL = "登陆失败：手机号或密码不正确";
    private static final String SAVE_USER_TO_SP_FAIL = "登陆失败：应用发生错误，请稍后重试";
    private static final String REMOVE_USER_FROM_SP_FAIL = "退出失败：应用发生错误，请稍后重试";

    public static void showToast(Context context, String msg) {
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
    }
```

### 修改密码

在RealmHelper中

```java
    /**
     * 获取当前用户
     */
    public UserModel getUser() {
        RealmQuery<UserModel> query = mRealm.where(UserModel.class);
        return query.equalTo("phone", UserHelper.getInstance().getPhone()).findFirst();
    }

    /**
     * 修改密码
     */
    public void updatePassword(String password) {
        UserModel userModels = getUser();
        mRealm.beginTransaction();
        userModels.setPassword(password);
        mRealm.commitTransaction();
    }
```

在UserUtils中

```java
    /**
     * 修改密码
     *  1.数据验证
     *      1.原密码是否输入
     *      2.新密码是否输入且新密码与确定密码是否相同
     *      3. 原密码输入是否正确
     *            1. Realm 获取到当前登录的用户模型
     *            2. 根据用户模型中保存的密码匹配用户原密码
     *
     *  2. 利用Realm模型自动更新特性来完成密码的修改
     * @param context
     * @param oldPassWord
     * @param passWord
     * @param passWordConfirm
     * @return
     */
    public static boolean updatePassword(Context context, String oldPassWord, String passWord, String passWordConfirm){

        if(TextUtils.isEmpty(oldPassWord)){
            Toast.makeText(context, "请输入原密码！", Toast.LENGTH_SHORT).show();
            return false;
        }
        if(TextUtils.isEmpty(passWord)||!passWord.equals(passWordConfirm)){
            Log.d(TAG, "ChangePassWord: "+passWord+"   "+passWordConfirm+"   :"+TextUtils.isEmpty(passWord)+"  :"+passWord.equals(passWordConfirm));
            Toast.makeText(context, "请输入密码！", Toast.LENGTH_SHORT).show();
            return false;
        }
        Log.d(TAG, "ChangePassWord: 123");
        // 验证原密码是否正确
        RealmHelper realmHelper = new RealmHelper();
        UserModel user = realmHelper.getUser();

        if(!EncryptUtils.encryptMD5ToString(oldPassWord).equals(user.getPassword())){
            Toast.makeText(context, "原密码不正确！", Toast.LENGTH_SHORT).show();
            return false;
        }

        realmHelper.updatePassword(EncryptUtils.encryptMD5ToString(passWord));
        realmHelper.close();
        return  true;
    }
```

在UpdatePwActivity中，先获取控件，然后获取控件中的值，然后进行调用修改密码的方法。

```java
package com.bin23.music.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.bin23.music.R;
import com.bin23.music.utils.UserUtils;
import com.bin23.music.views.InputView;

public class UpdatePwActivity extends BaseActivity {

    private InputView oldPwd, newPwd, newPwdConfirm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_pw);

        initView();
    }

    private void initView() {
        initToolBar(true, "修改密码");
        oldPwd = fd(R.id.input_old_password);
        newPwd = fd(R.id.input_new_password);
        newPwdConfirm = fd(R.id.input_new_confirm_password);
    }

    public void onUpdatePwConfirmBtnClick(View view) {
        String oldPassword = oldPwd.getInputStr();
        String password = newPwd.getInputStr();
        String passwordConfirm = newPwdConfirm.getInputStr();

        boolean result = UserUtils.updatePassword(this, oldPassword, password, passwordConfirm);
        if(!result){
            return ;
        }
        showToast(this, "成功修改密码~");
        onBackPressed();
    }
}
```

## 音乐模型类

根据Json数据，我们要创建相对应的音乐模型，然后存储到数据库。

```json
{
  "album": [
    {
      "albumId": "1",
      "name": "Nostalgic",
      "poster": "http://res.lgdsunday.club/poster-9.png",
      "playNum": "203.3万",
      "list": [
        {
          "musicId": "101",
          "name": "Mood",
          "poster": "http://p1.music.126.net/LfAiSYcf5FLgfvVtLzN77w==/109951165165797187.jpg?param=130y130",
          "path": "https://m701.music.126.net/20210602115214/ee01f1a230159c99f3e572eeb0efd423/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8102894100/bdfb/f80d/f05f/684d7cc0da64c4c3692cf7432f9dfc99.mp3",
          "author": "24kGoldn / iann dior"
        },
        {
          "musicId": "102",
          "name": "亲爱的旅人啊",
          "poster": "http://p1.music.126.net/1YrCPOBV314i-mTtlDg8mQ==/109951164148664637.jpg?param=130y130",
          "path": "https://m7.music.126.net/20210602121125/1d2eb504e9aed3c54712b17c0ce2113b/ymusic/0552/035b/555a/2830fd68d141a3bfb53db0f00fbf7a2f.mp3",
          "author": "周深"
        },
        {
          "musicId": "103",
          "name": "海底",
          "poster": "http://p1.music.126.net/swcW0FE-__ihfjnJqU22Qg==/109951164696345792.jpg?param=130y130",
          "path": "https://m801.music.126.net/20210602121357/2b8abed4ad01122f9978feacd5f33da4/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/1497471438/83c8/0008/9a4e/69ec042fc44d5e65584e6da38b9459ab.mp3",
          "author": "一支榴莲"
        },
        {
          "musicId": "104",
          "name": "无心斗艳",
          "poster": "http://p2.music.126.net/xdiVy-xDwYrP86q6TgmZ4g==/109951164508089024.jpg?param=130y130",
          "path": "https://m801.music.126.net/20210602135018/61a4d52a99624607b91b90e90dad3309/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/1628996315/2f20/18ed/dcb7/11bd8a3fb8ce03e0927d6a3e4c486c63.mp3",
          "author": "大布/苏泽龙"
        },
        {
          "musicId": "105",
          "name": "海底",
          "poster": "http://p1.music.126.net/swcW0FE-__ihfjnJqU22Qg==/109951164696345792.jpg?param=130y130",
          "path": "https://m801.music.126.net/20210602121357/2b8abed4ad01122f9978feacd5f33da4/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/1497471438/83c8/0008/9a4e/69ec042fc44d5e65584e6da38b9459ab.mp3",
          "author": "一支榴莲"
        },
        {
          "musicId": "106",
          "name": "Mood",
          "poster": "http://p1.music.126.net/LfAiSYcf5FLgfvVtLzN77w==/109951165165797187.jpg?param=130y130",
          "path": "https://m701.music.126.net/20210602115214/ee01f1a230159c99f3e572eeb0efd423/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8102894100/bdfb/f80d/f05f/684d7cc0da64c4c3692cf7432f9dfc99.mp3",
          "author": "24kGoldn / iann dior"
        },
        {
          "musicId": "107",
          "name": "无心斗艳",
          "poster": "http://p2.music.126.net/xdiVy-xDwYrP86q6TgmZ4g==/109951164508089024.jpg?param=130y130",
          "path": "https://m801.music.126.net/20210602135018/61a4d52a99624607b91b90e90dad3309/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/1628996315/2f20/18ed/dcb7/11bd8a3fb8ce03e0927d6a3e4c486c63.mp3",
          "author": "大布/苏泽龙"
        },
        {
          "musicId": "108",
          "name": "亲爱的旅人啊",
          "poster": "http://p1.music.126.net/1YrCPOBV314i-mTtlDg8mQ==/109951164148664637.jpg?param=130y130",
          "path": "https://m7.music.126.net/20210602121125/1d2eb504e9aed3c54712b17c0ce2113b/ymusic/0552/035b/555a/2830fd68d141a3bfb53db0f00fbf7a2f.mp3",
          "author": "周深"
        }
      ]
    },
    {
      "albumId": "2",
      "name": "Champ de tournesol",
      "poster": "http://res.lgdsunday.club/poster-10.png",
      "playNum": "78.3万",
      "list": [
        {
          "musicId": "201",
          "name": "亲爱的旅人啊",
          "poster": "http://p1.music.126.net/1YrCPOBV314i-mTtlDg8mQ==/109951164148664637.jpg?param=130y130",
          "path": "https://m7.music.126.net/20210602121125/1d2eb504e9aed3c54712b17c0ce2113b/ymusic/0552/035b/555a/2830fd68d141a3bfb53db0f00fbf7a2f.mp3",
          "author": "周深"
        },
        {
          "musicId": "202",
          "name": "无心斗艳",
          "poster": "http://p2.music.126.net/xdiVy-xDwYrP86q6TgmZ4g==/109951164508089024.jpg?param=130y130",
          "path": "https://m801.music.126.net/20210602135018/61a4d52a99624607b91b90e90dad3309/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/1628996315/2f20/18ed/dcb7/11bd8a3fb8ce03e0927d6a3e4c486c63.mp3",
          "author": "大布/苏泽龙"
        },
        {
          "musicId": "203",
          "name": "Mood",
          "poster": "http://p1.music.126.net/LfAiSYcf5FLgfvVtLzN77w==/109951165165797187.jpg?param=130y130",
          "path": "https://m701.music.126.net/20210602115214/ee01f1a230159c99f3e572eeb0efd423/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8102894100/bdfb/f80d/f05f/684d7cc0da64c4c3692cf7432f9dfc99.mp3",
          "author": "24kGoldn / iann dior"
        },
        {
          "musicId": "204",
          "name": "亲爱的旅人啊",
          "poster": "http://p1.music.126.net/1YrCPOBV314i-mTtlDg8mQ==/109951164148664637.jpg?param=130y130",
          "path": "https://m7.music.126.net/20210602121125/1d2eb504e9aed3c54712b17c0ce2113b/ymusic/0552/035b/555a/2830fd68d141a3bfb53db0f00fbf7a2f.mp3",
          "author": "周深"
        },
        {
          "musicId": "205",
          "name": "海底",
          "poster": "http://p1.music.126.net/swcW0FE-__ihfjnJqU22Qg==/109951164696345792.jpg?param=130y130",
          "path": "https://m801.music.126.net/20210602121357/2b8abed4ad01122f9978feacd5f33da4/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/1497471438/83c8/0008/9a4e/69ec042fc44d5e65584e6da38b9459ab.mp3",
          "author": "一支榴莲"
        },
        {
          "musicId": "206",
          "name": "无心斗艳",
          "poster": "http://p2.music.126.net/xdiVy-xDwYrP86q6TgmZ4g==/109951164508089024.jpg?param=130y130",
          "path": "https://m801.music.126.net/20210602135018/61a4d52a99624607b91b90e90dad3309/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/1628996315/2f20/18ed/dcb7/11bd8a3fb8ce03e0927d6a3e4c486c63.mp3",
          "author": "大布/苏泽龙"
        },
        {
          "musicId": "207",
          "name": "亲爱的旅人啊",
          "poster": "http://p1.music.126.net/1YrCPOBV314i-mTtlDg8mQ==/109951164148664637.jpg?param=130y130",
          "path": "https://m7.music.126.net/20210602121125/1d2eb504e9aed3c54712b17c0ce2113b/ymusic/0552/035b/555a/2830fd68d141a3bfb53db0f00fbf7a2f.mp3",
          "author": "周深"
        },
        {
          "musicId": "208",
          "name": "Mood",
          "poster": "http://p1.music.126.net/LfAiSYcf5FLgfvVtLzN77w==/109951165165797187.jpg?param=130y130",
          "path": "https://m701.music.126.net/20210602115214/ee01f1a230159c99f3e572eeb0efd423/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8102894100/bdfb/f80d/f05f/684d7cc0da64c4c3692cf7432f9dfc99.mp3",
          "author": "24kGoldn / iann dior"
        }
      ]
    }
  ],
  "hot": [
    {
      "musicId": "7",
      "name": "Nostalgic Piano",
      "poster": "http://res.lgdsunday.club/poster-1.png",
      "path": "http://res.lgdsunday.club/Nostalgic%20Piano.mp3",
      "author": "Rafael Krux"
    },
    {
      "musicId": "8",
      "name": "La Citadelle",
      "poster": "http://res.lgdsunday.club/poster-2.png",
      "path": "http://res.lgdsunday.club/La%20Citadelle.mp3",
      "author": "Komiku"
    },
    {
      "musicId": "9",
      "name": "Champ de tournesol",
      "poster": "http://res.lgdsunday.club/poster-3.png",
      "path": "http://res.lgdsunday.club/Champ%20de%20tournesol.mp3",
      "author": "Komiku"
    },
    {
      "musicId": "10",
      "name": "Horizon Flare",
      "poster": "http://res.lgdsunday.club/poster-4.png",
      "path": "http://res.lgdsunday.club/Horizon%20Flare.mp3",
      "author": "Alexander Nakarada"
    },
    {
      "musicId": "11",
      "name": "Lovely Piano Song",
      "poster": "http://res.lgdsunday.club/poster-5.png",
      "path": "http://res.lgdsunday.club/Lovely%20Piano%20Song.mp3",
      "author": "Rafael Krux"
    },
    {
      "musicId": "12",
      "name": "Romantic Inspiration",
      "poster": "http://res.lgdsunday.club/poster-6.png",
      "path": "http://res.lgdsunday.club/Romantic%20Inspiration.mp3",
      "author": "Rafael Krux"
    },
    {
      "musicId": "13",
      "name": "Brothers Unite",
      "poster": "http://res.lgdsunday.club/poster-7.png",
      "path": "http://res.lgdsunday.club/Brothers%20Unite.mp3",
      "author": "Alexander Nakarada"
    },
    {
      "musicId": "14",
      "name": "Amazing Grace",
      "poster": "http://res.lgdsunday.club/poster-8.png",
      "path": "http://res.lgdsunday.club/Amazing%20Grace.mp3",
      "author": "Kevin MacLeod"
    }
  ]
}

```

### MusicSourceModel

```java
package com.bin23.music.model;

import io.realm.RealmList;
import io.realm.RealmObject;

/**
 * json数据中，最外层的对象
 */
public class MusicSourceModel extends RealmObject {

   private RealmList<AlbumModel> album;
   private RealmList<MusicModel> hot;

   public RealmList<AlbumModel> getAlbum() {
       return album;
   }

   public void setAlbum(RealmList<AlbumModel> album) {
       this.album = album;
   }

   public RealmList<MusicModel> getHot() {
       return hot;
   }

   public void setHot(RealmList<MusicModel> hot) {
       this.hot = hot;
   }
}

```

### AlbumModel

```java
package com.bin23.music.model;

import io.realm.RealmList;
import io.realm.RealmObject;

public class AlbumModel  extends RealmObject {

   private String albumId;
   private String name;
   private String poster;
   private String playNum;
   private RealmList<MusicModel> list;

   public String getAlbumId() {
       return albumId;
   }

   public void setAlbumId(String albumId) {
       this.albumId = albumId;
   }

   public String getName() {
       return name;
   }

   public void setName(String name) {
       this.name = name;
   }

   public String getPoster() {
       return poster;
   }

   public void setPoster(String poster) {
       this.poster = poster;
   }

   public String getPlayNum() {
       return playNum;
   }

   public void setPlayNum(String playNum) {
       this.playNum = playNum;
   }

   public RealmList<MusicModel> getList() {
       return list;
   }

   public void setList(RealmList<MusicModel> list) {
       this.list = list;
   }
}

```

### MusicModel

```java
package com.bin23.music.model;

import io.realm.RealmObject;

public class MusicModel extends RealmObject {

   private String musicId;
   private String name;
   private String poster;
   private String path;
   private String author;


   public String getMusicId() {
       return musicId;
   }

   public void setMusicId(String musicId) {
       this.musicId = musicId;
   }

   public String getName() {
       return name;
   }

   public void setName(String name) {
       this.name = name;
   }

   public String getPoster() {
       return poster;
   }

   public void setPoster(String poster) {
       this.poster = poster;
   }

   public String getPath() {
       return path;
   }

   public void setPath(String path) {
       this.path = path;
   }

   public String getAuthor() {
       return author;
   }

   public void setAuthor(String author) {
       this.author = author;
   }


}

```

### 添加音乐资源到数据库

RealmHelper中

```java
//    /**
//     * 用户登录，存放读取到的数据
//     * 用户退出，删除数据
//     */
//
   /**
    * 保存音乐资源数据
    *
    * @param context
    */
   public void setMusicSource(Context context) {
       // 拿到资源文件中的数据
       String musicSourceJson = DataUtil.getJsonFromAssets(context, "DataSource.json");
       mRealm.beginTransaction();
       // 把Json数据直接保存到数据库中 -参数说明 1. 数据模型 2. Json数据
       mRealm.createObjectFromJson(MusicSourceModel.class, musicSourceJson);
       mRealm.commitTransaction();
   }

   /**
    * 删除音乐元数据
    */
   public void removeMusicSource() {
       mRealm.beginTransaction();
       mRealm.delete(MusicSourceModel.class);
       mRealm.delete(MusicModel.class);
       mRealm.delete(AlbumModel.class);
       mRealm.commitTransaction();
   }
```

UserUtils中，在登录的时候就调用上面的setMusicSource()方法，退出的时候就调用removeMusicSource()方法

```java
    /**
     * 用户登录方法
     * @param context
     * @param phone
     * @param password
     * @return
     */
    public static boolean login(Context context, String phone, String password) {
        // 判断登录输入数据是否合法，如果不合法返回false
        if (!validationOfLogin(context, phone, password)) {
            return false;
        }

        RealmHelper realmHelper = new RealmHelper();
        boolean res = realmHelper.validateUser(phone, EncryptUtils.encryptMD5ToString(password));

        if (!res) {
            showToast(context, LOGIN_FAIL);
            return false;
        }
        // 保存用户标记，为实现自动登录做准备
        boolean isSave = SharedPreferencesUtil.saveUser(context, phone);
        if (!isSave) {
            showToast(context, SAVE_USER_TO_SP_FAIL);
            return false;
        }
        // 在全局单例类中保存用户登录标记
        UserHelper.getInstance().setPhone(phone);
        UserHelper.getInstance().setUsername("默认的昵称哦");

        // 保存音乐源数据
        realmHelper.setMusicSource(context);

        realmHelper.close();

        return true;
    }

    public static void logout(Context context) {
        boolean isRemove = SharedPreferencesUtil.removeUser(context);
        if (!isRemove) {
            showToast(context, REMOVE_USER_FROM_SP_FAIL);
            return;
        }

       // 删除数据源
       RealmHelper realmHelper = new RealmHelper();
       realmHelper.removeMusicSource();
       
       realmHelper.close();

        Intent intent = new Intent(context, LoginActivity.class);
        // 添加intent标识符，清理task栈，并且新生成task栈
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
        // 此时动画错误，（因为动画是基于Activity进栈出栈实现的，现在栈没了，所以需要重新搞）得解决动画错误，重新定义Activity跳转动画
//        ((Activity)context).overridePendingTransition(R.anim.open_enter, R.anim.open_exit);

    }
```

### 读取音乐资源，显示在首页和歌单页面

在Realm中

```java
   /**
    * 返回音乐源数据
    */
   public MusicSourceModel getMusicSource() {
       return mRealm.where(MusicSourceModel.class).findFirst();
   }
```

在MainActivity中

```java
    private void initData() {
        mRealmHelper = new RealmHelper();
        mMusicSourceModel = mRealmHelper.getMusicSource();
    }
...
    
    /**
     * 设置主页的主要部分-歌单的数据显示
     */
    private void setMusicsGrid() {
        // 设置同一行，3个元素，即显示3个歌单
        mRvGrid.setLayoutManager(new GridLayoutManager(this, 3));
        // mMgAdapter = new MusicsGridAdapter(this);
        mMgAdapter = new MusicsGridAdapter(this, mMusicSourceModel.getAlbum());
        // 传入 adapter 显示数据
        mRvGrid.setAdapter(mMgAdapter);
    }
```

