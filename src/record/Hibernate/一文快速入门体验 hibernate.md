---
# 这是文章的标题
title: 一文快速入门体验 Hibernate
# 这是页面的图标
# icon: bear
# 这是侧边栏的顺序
order: 1
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-05-09 13:14:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - Hibernate
---

## 前言

Hibernate 是一个优秀的持久层的框架，当然，虽然现在说用得比较多的是 MyBaits，但是我工作中也不得不接触 Hibernate，特别是一些老项目需要你维护的时候。所以，在此写下这篇文章，方便自己回顾，也方便新手入门体验 Hibernate。

> 注：使用的版本是 Hibernate 5.x 的

## 什么是 ORM？

ORM（Object Relational Mapping，对象关系映射）**可以说是一种理论，或者说是一种设计思想**，主要是让「关系型数据库」和「面向对象编程语言」之间建立映射关系。目的是将数据库中的数据转换为对象，以便开发人员更方便地进行数据库操作。

**那为什么会出现 ORM 呢？**

在我们学习 JDBC 的时候，我们需要编写大量的 SQL 语句来执行数据库的 CRUD 操作，而且还需要手动将查询结果转换为对象。这样的操作是比较繁琐的，还容易出错，而且对于大型项目来说，数据库操作的代码量通常很大，维护起来也是非常困难的。所以，ORM 出现了，帮助我们简化数据库操作，提高开发效率。

市面上有很多不同的 ORM 框架可供选择，在 Java 后端开发的学习路线上，我们需要知道的就有 Hibernate 和 MyBatis。

简单来说，ORM 就是将数据库操作封装成对象操作，通过对象的方式来进行数据库的增删改查。

### 理解 JPA 和 ORM 的关系

JPA（Java Persistence API）是 Java EE（现在称为 Jakarta EE）规范中定义的一套 API，用于实现对象和关系数据库之间的映射。JPA 提供了一种标准的方式来进行对象持久化操作。而 ORM 是一个通用的概念，不局限于特定的编程语言或框架。比如 Python 也有对应的实现 ORM 的框架。

换句话说，JPA 它定义了一系列的接口和注解，开发者可以使用这些接口和注解来描述对象和数据库表之间的映射关系，并进行数据库操作。**而 ORM 是一个更广泛的概念，它可以适用于其他编程语言和框架，并不局限于 Java 和 JPA。**

> 注：JPA 就只定义，没有具体实现，就是所谓的规范、标准，我 JPA 规定了这些 API 能进行相关操作，具体的实现是交给软件厂商去实现的，比如 Hibernate 就是 JPA 标准的一种实现。

### 理解 JPA 和 Hibernate 的关系

**Hibernate 是 JPA 的一种具体实现，它使用了 JPA 规范定义的接口和注解，提供了 ORM 功能。**

**从时间线上来看**：JPA（Java Persistence API）是在 Hibernate 之后出现的。

最早由 Gavin King 在2001年创建 Hibernate，目标是简化开发人员进行数据库的操作，以面向对象的方式去操作数据库。

JPA 的第一个版本是在2006年发布的，其中包含了一系列的接口和注解，用于描述对象和数据库表之间的映射关系，以及进行数据库操作。Hibernate 的创始人 Gavin King 是 JPA 规范的主要参与者之一。

JPA 规范的出现是为了标准化 ORM 框架的行为和功能，使开发人员可以在不同的 ORM 实现之间进行切换，而不需要修改大量的代码。

总结来说，Hibernate 是在 JPA 规范之前出现的 ORM 框架，而 JPA 是在 Hibernate 的基础上产生的一套标准化的 ORM API。Hibernate 作为 JPA 的一种实现，为开发人员提供了强大的 ORM 功能，并成为了 JPA 规范的主要影响者之一。

## 正题：Hibernate 简介

Hibernate 是全自动的对象关系映射的持久层框架，主要通过持久化类（.Java，当然，也习惯说的实体类）、映射文件（.hbm.xml）和配置文件（.cfg.xml）来操作关系型数据库。

Hibernate 封装了数据库的访问细节，通过配置的属性文件，来关联上关系型数据库和实体类的。

Hibernate 中有 3 个我们需要知道的类，分别是配置类（Configuration）、会话工厂类（SessionFactory）和会话类（Session），**注意，此处的 Session 可不是 HttpSession 啊！**

- **配置类**

主要负责管理 Hibernate 的配置信息以及 Hibernate 的启动，在运行的时候，配置类会读取一些底层的基本信息，比如数据库的 URL、数据库的用户名、密码、驱动类、方言（适配器，Dialect）等信息。

- **会话工厂类**

主要负责生成 Session，这个工厂类会保存当前数据库中所有的映射关系。

- **会话类**

持久化操作的核心，通过它实现 CRUD，它不是线程安全的，需要注意不要多个线程共享一个 Session 对象。

> 理解会话二字：顾名思义，实际上就是交流，通信。在网络中，一次会话可以是一次 HTTP 请求到 HTTP 响应的过程，在数据库操作中，一次会话，可以是一次新增操作的请求到数据库中，然后数据库做出响应。

## 使用 Maven 构建 Hibernate 项目

最原始引入 Jar 包的方式来创建 Hibernate 项目，可以参考这里：

[http://m.biancheng.net/hibernate/first-example.html](http://m.biancheng.net/hibernate/first-example.html)

由于我比较懒，所以使用 Maven 来构建一个具有 Hibernate 的 Web 项目。

### 引入依赖项

分别引入 Hibernate、MySQL 数据库驱动、单元测试 Junit4（创建 Maven 时自带的）。

```xml
<!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-core -->
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>5.6.14.Final</version>
</dependency>

<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
</dependency>

<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
    <scope>test</scope>
</dependency>
```

### Hibernate 配置文件

在 resource 目录下创建一个 `hibernate.cfg.xml` 配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
                "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <!-- 配置数据源、连接池等相关信息 -->
        <property name="connection.url">jdbc:mysql://localhost:3306/demo_hibernate</property>
        <property name="connection.username">root</property>
        <property name="connection.password">123456</property>
        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
        <!-- Hibernate 方言 -->
        <property name="dialect">org.hibernate.dialect.MySQLDialect</property>
        <!-- 打印 SQL 语句-->
        <property name="show_sql">true</property>
        <!-- 格式化 SQL 语句-->
        <property name="format_sql">true</property>
        <!-- 映射文件所在位置 -->
        <mapping resource="cn/god23bin/demo/domain/mapping/User.hbm.xml" />
    </session-factory>
</hibernate-configuration>

```

以上的配置只是一小部分，还可以配置数据库连接池、是否自动生成数据库表等等。

### 持久化类（实体类）

我们是通过持久化类来操作数据库表的，也就是 ORM 的体现，即对象映射到数据库表，数据库表也映射对象，操作对象就相当于操作数据库表。所以我们需要编写持久化类来描述数据库表，类中的属性需要与数据库表中的字段相匹配。

创建一个 User 类，作为一个 JavaBean（只有 getter 和 setter 方法，没有其他业务方法的对象）

```java
package cn.god23bin.demo.domain.entity;

/**
 * @author god23bin
 */
public class User {
    private Integer id;
    private String name;
    private String password;

    // 省略 getter 和 setter 方法
}

```

这种类（JavaBean）在日常开发中是无处不在的，百分之百会用到，也称它为 POJO（Plain Old Java Object），我们知道这种概念就行，反正这种类就只有属性和对应的 getter 和 setter 方法。

需要注意的几点：

- 必须有无参构造方法，便于 Hibernate 通过 Constructor.newInstance() 实例化持久类。
- 提供一个标识属性，一般这个标识属性映射的是数据库表中的主键字段，就上面 User 中的 id 属性。
- 设计实体类，属性都是声明为 private 的。

### Hibernate 映射

我们单独写了一个持久化类，目前是还没有做映射的，也就是说还不能通过这个类去操作数据库，那如何去做映射呢？

这就涉及到一个映射文件了，映射文件是 xml 文件，命名规则一般是 `持久化类名.hbm.xml`，以 User 为例，它的映射文件就是 `User.hbm.xml`。

我们可以在项目某个包下创建映射文件，我选择在 `cn.god23bin.demo.domain.mapping` 包下创建：

```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-mapping PUBLIC
        "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping>
    <!-- name 属性：持久化类的全路径 -->
    <!-- table 属性：表的名称 -->
    <class name="cn.god23bin.demo.domain.entity.User" table="user">
        <!-- 主键 -->
        <id name="id" column="id" type="java.lang.Integer">
            <!-- 主键生成策略 -->
            <generator class="native"/>
        </id>
        <!-- type 属性 的三种写法 -->
        <!-- 1. Java类型 :java.lang.String -->
        <!-- 2. Hibernate类型:string -->
        <!-- 3. SQL类型 :不能直接使用type属性,需要子标签<column> -->
        <!--    <column name="name" sql-type="varchar(20)"/> -->
        <property name="name" column="name" type="string" not-null="true" length="50"/>
        <property name="password" column="password" not-null="true" length="50"/>
    </class>
</hibernate-mapping>
```

> 注意：映射文件的编写需要按照持久化类来编写，而不是数据库表。

> cn.god23bin.demo.domain.entity.User 称为全路径 | 全限定类名 | 全限定名 | 全包名，反正我是见过多种叫法的，指的都是同个东西。

> 如果映射文件中没有配置 column 和 type 属性，那么 Hibernate 会默认使用持久化类中的属性名和属性类型去匹配数据库表中的字段。

创建完这个映射文件后，我们需要在配置文件中 `<session-factory>` 里指定该映射文件所在的位置，这样 Hibernate 才知道映射文件在哪里。

```xml
<mapping resource="cn/god23bin/demo/domain/mapping/User.hbm.xml" />
```

完整的配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
                "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="connection.url">jdbc:mysql://localhost:3306/demo_hibernate</property>
        <property name="connection.username">root</property>
        <property name="connection.password">123456</property>
        <property name="dialect">org.hibernate.dialect.MySQLDialect</property>
        <property name="show_sql">true</property>
        <property name="format_sql">true</property>
        <!-- 映射文件所在位置 -->
        <mapping resource="cn/god23bin/demo/domain/mapping/User.hbm.xml" />
    </session-factory>
</hibernate-configuration>

```

#### 配置 pom.xml

由于我是 Maven 来构建项目的，所以需要新增一个配置，便于让 Hibernate 能够找到 Maven 工程编译后的 `*.hbm.xml` 映射文件。

在 pom.xml 中，找到 build 标签，在里面加上如下的配置：

```xml
<build>
	...
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.xml</include>
                <include>**/*.properties</include>
            </includes>
        </resource>
    </resources>
</build>
```

### Hibernate 工具类

Hibernate 有 3 个需要知道的类，不知道现在你还记不记得，不记得就翻到上面简介那里看看。

其中，Session 是持久化操作的核心类，通过它可以实现 CRUD 操作。那么如何获取 Session 对象呢？显而易见，就是通过 Session 工厂，即 SessionFactory 对象，来获取 Session 对象，那问题又来了，Session 工厂如何获取？

这里就得说到 Configuration 配置类了，通过它创建 SessionFactory 对象，进而获取 Session 对象。

核心代码是这样的：

```java
// 读取 hibernate.cfg.xml 配置文件并创建 SessionFactory
Configuration configure = new Configuration().configure(); // 加载配置文件，configure() 方法可以指定配置文件所在位置，没有指定的话，默认为项目的 classpath 根目录下的 hibernate.cfg.xml
SessionFactory sessionFactory = configure.buildSessionFactory();  // 创建 SessionFactory 对象
```

一般情况下，我们会写一个工具类来获取 Session 对象，如下：

```java
package cn.god23bin.demo.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * @author god23bin
 */
public class HibernateUtil {

    /**
     * 一个 ThreadLocal 变量，用于存储线程局部变量 Session。
     * ThreadLocal 提供了线程局部变量的机制，保证每个线程都有自己的 Session 实例。
     */
    private static final ThreadLocal<Session> THREAD_LOCAL = new ThreadLocal<>();

    private static SessionFactory sessionFactory;

    static {
        try{
            // 读取 hibernate.cfg.xml 配置文件并创建 SessionFactory
            Configuration configure = new Configuration().configure();
            sessionFactory = configure.buildSessionFactory();
        } catch (Exception e) {
            System.err.println("Hibernate 创建会话工厂失败！");
            e.printStackTrace();
        }
    }

    /**
     * 获取 Session 对象
     */
    public static Session getSession() {
        Session session = THREAD_LOCAL.get();
        if (session == null || session.isOpen()) {
            if (sessionFactory == null) {
                rebuildSessionFactory();
            }
            session = (sessionFactory != null) ? sessionFactory.openSession() : null;
            THREAD_LOCAL.set(session);
        }
        return session;
    }

    /**
     * 重新创建会话工厂
     */
    private static void rebuildSessionFactory() {
        try{
            // 读取 hibernate.cfg.xml 配置文件并创建 SessionFactory
            Configuration configure = new Configuration().configure();
            sessionFactory = configure.buildSessionFactory();
        } catch (Exception e) {
            System.err.println("Hibernate 创建会话工厂失败！");
            e.printStackTrace();
        }
    }

    /**
     * 返回唯一的会话工厂对象
     */
    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    /**
     * 关闭 Session 对象
     */
    public static void closeSession() {
        Session session = THREAD_LOCAL.get();
        THREAD_LOCAL.remove();
        if (session != null) {
            session.close();
        }
    }

}
```

### 测试

创建一张 user 表：

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `password` varchar(50) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

编写一个测试类，由于我这里是 Maven 项目，按照约定，测试类放在 `/src/test/java/` 目录下，我这里就把这个测试类 `HibernateTest` 放在 `java` 目录下的 `cn.god23bin.demo` 包中：

```java
package cn.god23bin.demo;

import cn.god23bin.demo.domain.entity.User;
import cn.god23bin.demo.util.HibernateUtil;
import org.hibernate.Session;
import org.junit.Test;

/**
 * @author god23bin
 */
public class HibernateTest {

    @Test
    public void test() {
        // 获取 Session 对象
        Session session = HibernateUtil.getSession();
        User user = new User();
        user.setName("god23bin");
        user.setPassword("123456");
        try {
            // 开启事务，即使是执行一次数据库操作，也是事务
            session.beginTransaction();
            // 执行插入操作
            session.save(user);
            // 提交事务
            session.getTransaction().commit();
        } catch (Exception e) {
            // 发生异常，则回滚事务
            session.getTransaction().rollback();
            System.out.println("插入User数据失败！");
            e.printStackTrace();
        } finally{
            // 关闭 Session 对象
            HibernateUtil.closeSession();
        }
    }
}
```

控制台输出：

```shell
五月 07, 2023 11:52:13 下午 org.hibernate.Version logVersion
INFO: HHH000412: Hibernate ORM core version 5.6.14.Final
五月 07, 2023 11:52:15 下午 org.hibernate.annotations.common.reflection.java.JavaReflectionManager <clinit>
INFO: HCANN000001: Hibernate Commons Annotations {5.1.2.Final}
五月 07, 2023 11:52:17 下午 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure
WARN: HHH10001002: Using Hibernate built-in connection pool (not for production use!)
五月 07, 2023 11:52:17 下午 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl buildCreator
INFO: HHH10001005: using driver [com.mysql.jdbc.Driver] at URL [jdbc:mysql://localhost:3306/demo_hibernate]
五月 07, 2023 11:52:17 下午 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl buildCreator
INFO: HHH10001001: Connection properties: {user=root, password=****}
五月 07, 2023 11:52:17 下午 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl buildCreator
INFO: HHH10001003: Autocommit mode: false
五月 07, 2023 11:52:17 下午 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl$PooledConnections <init>
INFO: HHH000115: Hibernate connection pool size: 20 (min=1)
Sun May 07 23:52:17 CST 2023 WARN: Establishing SSL connection without server's identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set. For compliance with existing applications not using SSL the verifyServerCertificate property is set to 'false'. You need either to explicitly disable SSL by setting useSSL=false, or set useSSL=true and provide truststore for server certificate verification.
五月 07, 2023 11:52:18 下午 org.hibernate.dialect.Dialect <init>
INFO: HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
五月 07, 2023 11:52:20 下午 org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator initiateService
INFO: HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
Hibernate: 
    insert 
    into
        user
        (name, password) 
    values
        (?, ?)

Process finished with exit code 0

```

我们可以查看数据库中 User 表中是否存在我们刚刚插入的数据，可以发现是存在的：

![User 表](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230508004709.png)

## 总结

我们依次说明了什么是 ORM，并且梳理了 JPA 和 ORM的关系以及 JPA 和 Hibernate 的关系。

> 我相信还是有很多人没有搞清楚它们之间的联系的，就只是学了而已，或者说学过而已，当然，也有的人说，知道了它们的关系又能怎样呢？我不知道我也能用 Hibernate 去操作数据库。话虽如此，但是我认为明白它们之间的联系，是有利于我们后续其他知识的学习的，也能跟其他知识建立起联系，而不是单独的一个知识孤岛。

接着介绍了 Hibernate，以及如何使用 Maven 项目去构建一个具有 Hibernate 的 Web 应用，毕竟咱们开发，基本都是 Web 应用程序。

使用 Maven 去构建，就需要引入相关的依赖，Hibernate 的核心依赖以及数据库驱动的依赖，接着需要编写配置文件、持久化类、持久化类的映射文件，最后写一个获取 Session 对象的工具类，便于我们获取 Session 对象执行数据库操作。

以上，就是本篇文章的内容，现在恭喜你已经入门 Hibernate 了！是不是很快上手了！哈哈哈

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**