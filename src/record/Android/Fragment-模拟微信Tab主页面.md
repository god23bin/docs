---
# 这是文章的标题
title: Fragment-模拟微信Tab主页面
# 这是页面的图标
# icon: 
# 这是侧边栏的顺序
order: 2
# 设置作者
author: god23bin
# 设置写作时间
date: 2021-05-18 09:45:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - Android
  - 笔记
---

# Fragment-模拟微信Tab主页面

## 准备工作

把图片文件放在drawable下

新建布局文件

### top_layout.xml

使用TextView来显示标题栏，让其居中

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="45dp"
    android:background="@drawable/title_bar"
    android:gravity="center"
    android:orientation="vertical">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="微信"
        android:textColor="#ffffff"
        android:textSize="20sp"
        android:textStyle="bold"
        />

</LinearLayout>
```

### bottom_layout.xml

底部布局文件，使用4个LinearLayout来水平显示4个tab，LinearLayout里面写ImageButton及对应textView

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="60dp"
    android:background="@drawable/bottom_bar"
    android:orientation="horizontal">

    <LinearLayout
        android:id="@+id/id_tab_wechat"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical">

        <ImageButton
            android:id="@+id/id_tab_weixin_img"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00000000"
            android:clickable="false"
            android:src="@drawable/tab_weixin_pressed" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="微信"
            android:textColor="#fff" />

    </LinearLayout>

    <LinearLayout
        android:id="@+id/id_tab_frd"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical">

        <ImageButton
            android:id="@+id/id_tab_frd_img"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00000000"
            android:clickable="false"
            android:src="@drawable/tab_find_frd_normal" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="朋友"
            android:textColor="#fff" />

    </LinearLayout>

    <LinearLayout
        android:id="@+id/id_tab_address"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical">

        <ImageButton
            android:id="@+id/id_tab_address_img"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00000000"
            android:clickable="false"
            android:src="@drawable/tab_address_normal" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="通讯录"
            android:textColor="#fff" />

    </LinearLayout>


    <LinearLayout
        android:id="@+id/id_tab_setting"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:orientation="vertical">

        <ImageButton
            android:id="@+id/id_tab_setting_img"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00000000"
            android:clickable="false"
            android:src="@drawable/tab_settings_normal" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="设置"
            android:textColor="#fff" />

    </LinearLayout>

</LinearLayout>
```

### tab.xml

tab就是中间的内容，以后需要可以进行扩展，这里就写一下文本就可以了

tab01.xml

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <TextView
        android:text="这是微信首页"
        android:textSize="30sp"
        android:gravity="center"
        android:textStyle="bold"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

tab02.xml

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <TextView
        android:text="这是朋友页"
        android:textSize="30sp"
        android:gravity="center"
        android:textStyle="bold"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

tab03.xml

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <TextView
        android:text="这是通讯录"
        android:textSize="30sp"
        android:gravity="center"
        android:textStyle="bold"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

tab04.xml

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <TextView
        android:text="这是设置"
        android:textSize="30sp"
        android:gravity="center"
        android:textStyle="bold"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

### 主页面布局

activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <include layout="@layout/top_layout" />

    <FrameLayout
        android:id="@+id/id_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1">

    </FrameLayout>

    <include layout="@layout/bottom_layout" />

</LinearLayout>
```

## 代码实现

### 创建4个Fragment

创建4个Fragment，分别对应4个Tab，实现动态加载布局

WeChatFragment

```java
package com.bin23.wechatpractice.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.wechatpractice.R;

public class WeChatFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.tab01, container, false);
    }
}

```

FriendFragment

```java
package com.bin23.wechatpractice.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.wechatpractice.R;

public class FriendFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.tab02, container, false);
    }
}
```

AddressFragment

```java
package com.bin23.wechatpractice.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.wechatpractice.R;

public class AddressFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.tab03, container, false);
    }
}
```

SettingFragment

```java
package com.bin23.wechatpractice.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bin23.wechatpractice.R;

public class SettingFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.tab04, container, false);
    }
}
```

### MainActivity

```java
package com.bin23.wechatpractice;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.ImageButton;
import android.widget.LinearLayout;

import com.bin23.wechatpractice.fragment.AddressFragment;
import com.bin23.wechatpractice.fragment.FriendFragment;
import com.bin23.wechatpractice.fragment.SettingFragment;
import com.bin23.wechatpractice.fragment.WeChatFragment;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private LinearLayout tabWeChat;
    private LinearLayout tabFriend;
    private LinearLayout tabAddress;
    private LinearLayout tabSetting;

    private ImageButton ibWeChat;
    private ImageButton ibFriend;
    private ImageButton ibAddress;
    private ImageButton ibSetting;

    private Fragment wechatFragment;
    private Fragment friendFragment;
    private Fragment addressFragment;
    private Fragment settingFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
//        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //隐藏默认的标题栏
        ActionBar actionbar = getSupportActionBar();
        if (actionbar != null) {
            actionbar.hide();
        }
        initView();//初始化控件
        initEvent();//初始化事件
        setSelect(0);//对事物方法调用显示第一个界面
    }

    private void initView() {
        tabWeChat = (LinearLayout) findViewById(R.id.id_tab_wechat);
        tabFriend = (LinearLayout) findViewById(R.id.id_tab_frd);
        tabAddress = (LinearLayout) findViewById(R.id.id_tab_address);
        tabSetting = (LinearLayout) findViewById(R.id.id_tab_setting);

        ibWeChat = (ImageButton) findViewById(R.id.id_tab_weixin_img);
        ibFriend = (ImageButton) findViewById(R.id.id_tab_frd_img);
        ibAddress = (ImageButton) findViewById(R.id.id_tab_address_img);
        ibSetting = (ImageButton) findViewById(R.id.id_tab_setting_img);
    }

    private void initEvent() {
        tabWeChat.setOnClickListener(this);
        tabFriend.setOnClickListener(this);
        tabAddress.setOnClickListener(this);
        tabSetting.setOnClickListener(this);
    }


    //自定义一个方法
    private void setSelect(int i) {

        // FragmentManager fm = getFragmentManager();  //先拿到管理器
        FragmentManager fm = getSupportFragmentManager();  //使用V4包下的Fragment是的事务管理器
        FragmentTransaction transaction = fm.beginTransaction();  //开启一个事务transaction

        hideFragment(transaction); //自定义一个函数先对所有事务进行隐藏
        //将图片切换为亮色
        //切换界面
        switch (i) {  //切换图片为亮色
            case 0: {
                if (wechatFragment == null) {
                    //为空则初始化他
                    wechatFragment = new WeChatFragment();
                    transaction.add(R.id.id_container, wechatFragment);  //初始化Fragment
                } else {
                    //否则对其进行显示
                    transaction.show(wechatFragment);
                }
                ibWeChat.setImageResource(R.drawable.tab_weixin_normal); //切换图片
                break;
            }
            case 1: {
                if (friendFragment == null) {
                    //为空则初始化他
                    friendFragment = new FriendFragment();
                    transaction.add(R.id.id_container, friendFragment);  //初始化Fragment
                } else {
                    //否则对其进行显示
                    transaction.show(friendFragment);
                }
                ibFriend.setImageResource(R.drawable.tab_find_frd_normal);
                break;
            }
            case 2: {
                if (addressFragment == null) {
                    //为空则初始化他
                    addressFragment = new AddressFragment();
                    transaction.add(R.id.id_container, addressFragment);  //初始化Fragment
                } else {
                    //否则对其进行显示
                    transaction.show(addressFragment);
                }
                ibAddress.setImageResource(R.drawable.tab_address_normal);
                break;
            }
            case 3: {
                if (settingFragment == null) {
                    //为空则初始化他
                    settingFragment = new SettingFragment();
                    transaction.add(R.id.id_container, settingFragment);  //初始化Fragment
                } else {
                    //否则对其进行显示
                    transaction.show(settingFragment);
                }
                ibSetting.setImageResource(R.drawable.tab_settings_normal);
                break;
            }

        }//switch

        transaction.commit();//提交事务
    }//setSelect()


    //隐藏事务方法
    private void hideFragment(FragmentTransaction transaction) {  //对不为空的Fragment隐藏
        if (wechatFragment != null) {
            transaction.hide(wechatFragment);
        }
        if (friendFragment != null) {
            transaction.hide(friendFragment);
        }
        if (addressFragment != null) {
            transaction.hide(addressFragment);
        }
        if (settingFragment != null) {
            transaction.hide(settingFragment);
        }
    }

    //图片设置为暗色
    private void resetImg() {
        ibWeChat.setImageResource(R.drawable.tab_weixin_normal);
        ibFriend.setImageResource(R.drawable.tab_find_frd_normal);
        ibAddress.setImageResource(R.drawable.tab_address_normal);
        ibSetting.setImageResource(R.drawable.tab_settings_normal);
    }

    @Override
    public void onClick(View view) {

        resetImg();//设置暗色
        switch (view.getId()) {
            case R.id.id_tab_wechat: {
                setSelect(0);
                ibWeChat.setImageResource(R.drawable.tab_weixin_pressed);  //将点击的图标设置为亮色
                break;
            }
            case R.id.id_tab_frd: {
                setSelect(1);
                ibFriend.setImageResource(R.drawable.tab_find_frd_pressed);
                break;
            }
            case R.id.id_tab_address: {
                setSelect(2);
                ibAddress.setImageResource(R.drawable.tab_address_pressed);
                break;
            }
            case R.id.id_tab_setting: {
                setSelect(3);
                ibSetting.setImageResource(R.drawable.tab_settings_pressed);
                break;
            }

        }

    }

}
```

## 效果

手机

![手机](https://gitee.com/god23bin/blog-pic-bed/raw/master/20220316111505.png)

平板

![平板](https://gitee.com/god23bin/blog-pic-bed/raw/master/20220316111511.png)