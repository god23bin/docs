---
# 这是文章的标题
title: Hibernate 基本操作、懒加载以及缓存
# 这是页面的图标
# icon: bear
# 这是侧边栏的顺序
order: 2
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-05-10 13:14:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - Hibernate
---

## 前言

上一篇咱们介绍了 Hibernate 以及写了一个 Hibernate 的工具类，快速入门体验了一波 Hibernate 的使用，我们只需通过 Session 对象就能实现数据库的操作了。

现在，这篇介绍使用 Hibernate 进行基本的 CRUD、懒加载以及缓存的知识。

> 提示：如果你还没看上一篇，那么建议你看完上一篇再来看这篇。

## 基本的 CRUD

> 以下代码均写在测试类 HibernateTest 中

### 插入操作

这个在上一篇已经演示过，这里便不再演示。

### 查询操作

查询有 2 种方式，通过 Session 对象的 `get` 方法 或者 `load` 方法来实现查询，主要将查询的数据结果封装到一个 Java 对象中。

1. `get` 方法

```java
    @Test
    public void queryByGet() {
        // 获取 Session 对象
        Session session = HibernateUtil.getSession();
        try {
            // 使用 get() 方法，第一个参数是持久化类的类型参数，第二个参数是主键标识参数，如果没有匹配的记录，那么会返回 null
            User user = session.get(User.class, new Integer("1"));
            System.out.println("用户ID：" + user.getId());
        } catch (Exception e) {
            System.out.println("查询User数据失败！");
            e.printStackTrace();
        } finally{
            // 关闭 Session 对象
            HibernateUtil.closeSession();
        }
    }
```

控制台输出：可以看到，执行了查询 SQL，并打印了用户 ID。

```shell
INFO: HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
五月 08, 2023 11:38:59 下午 org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator initiateService
INFO: HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
Hibernate: 
    select
        user0_.id as id1_0_0_,
        user0_.name as name2_0_0_,
        user0_.password as password3_0_0_ 
    from
        user user0_ 
    where
        user0_.id=?
用户ID：1

```

2. `load` 方法

```java
    @Test
    public void queryByLoad() {
        // 获取 Session 对象
        Session session = HibernateUtil.getSession();
        try {
            // 使用 load() 方法，它返回对象的代理，只有该代理被调用时，Hibernate 才会真正去执行 SQL 查询
            User user = session.load(User.class, new Integer("1"));
            // ID 是已知的，不用进行查询
            System.out.println("用户ID：" + user.getId());
            // 此时该代理被调用，就执行 SQL 语句，得到真正的数据记录
            System.out.println("用户名称：" + user.getName());
        } catch (Exception e) {
            System.out.println("查询User数据失败！");
            e.printStackTrace();
        } finally{
            // 关闭 Session 对象
            HibernateUtil.closeSession();
        }
    }
```

控制台输出：

```shell
五月 08, 2023 11:40:13 下午 org.hibernate.dialect.Dialect <init>
INFO: HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
五月 08, 2023 11:40:14 下午 org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator initiateService
INFO: HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
用户ID：1
Hibernate: 
    select
        user0_.id as id1_0_0_,
        user0_.name as name2_0_0_,
        user0_.password as password3_0_0_ 
    from
        user user0_ 
    where
        user0_.id=?
用户名称：god23bin

```

**可以看到，是先打印用户ID的，这里还没有执行查询 SQL，直到下一条语句中的 `user.getName()` 的执行，查询的 SQL 语句才被 Hibernate 执行**。

### 修改操作

想对某条数据进行修改操作，那么需要将它先查询出来，然后进行修改。这里就执行了两条 SQL，保险起见，开启事务，然后执行这两条 SQL，接着提交事务。当然，这两条 SQL，Hibernate 帮我们写的啦！

```java
    @Test
    public void update() {
        // 获取 Session 对象
        Session session = HibernateUtil.getSession();
        try {
            // 开启事务
            session.beginTransaction();
            // 进行查询，将结果封装成 user 对象
            User user = session.get(User.class, new Integer("1"));
            // 对 user 对象进行修改
            user.setName("公众号：god23bin");
            user.setPassword("456789");
            // 提交事务
            session.getTransaction().commit();
        } catch (Exception e) {
            // 发生异常，则回滚事务
            session.getTransaction().rollback();
            System.out.println("修改User数据失败！");
            e.printStackTrace();
        } finally{
            // 关闭 Session 对象
            HibernateUtil.closeSession();
        }
    }
```

控制台输出：

```shell
五月 09, 2023 12:00:16 上午 org.hibernate.dialect.Dialect <init>
INFO: HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
五月 09, 2023 12:00:17 上午 org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator initiateService
INFO: HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
Hibernate: 
    select
        user0_.id as id1_0_0_,
        user0_.name as name2_0_0_,
        user0_.password as password3_0_0_ 
    from
        user user0_ 
    where
        user0_.id=?
Hibernate: 
    update
        user 
    set
        name=?,
        password=? 
    where
        id=?
        
```

可以看到运行前和运行后，数据的变化，如图：

![数据的变化](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510200856.png)

> 如果屏幕前的小伙伴是按照我的步骤一步一步跟下来，那么你可能会遇到中文乱码的问题，此时需要在 hibernate.cfg.xml 配置文件中修改 URL，加上两个参数 `useUnicode=true&characterEncoding=UTF-8`，如下：
>
> `<property name="connection.url">jdbc:mysql://localhost:3306/demo_hibernate?useUnicode=true&amp;characterEncoding=UTF-8</property>`

### 删除操作

删除操作需要先把数据查询出来，然后通过 Session 对象的 delete 方法将其删除。代码如下：

```java
    @Test
    public void delete() {
        // 获取 Session 对象
        Session session = HibernateUtil.getSession();
        try {
            session.beginTransaction();
            User user = session.get(User.class, new Integer("1"));
            // 删除操作
            session.delete(user);
            session.getTransaction().commit();
        } catch (Exception e) {
            session.getTransaction().rollback();
            System.out.println("删除User数据失败！");
            e.printStackTrace();
        } finally{
            // 关闭 Session 对象
            HibernateUtil.closeSession();
        }
    }
```

控制台输出：

```shell
五月 09, 2023 12:10:09 上午 org.hibernate.dialect.Dialect <init>
INFO: HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
五月 09, 2023 12:10:10 上午 org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator initiateService
INFO: HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
Hibernate: 
    select
        user0_.id as id1_0_0_,
        user0_.name as name2_0_0_,
        user0_.password as password3_0_0_ 
    from
        user user0_ 
    where
        user0_.id=?
Hibernate: 
    delete 
    from
        user 
    where
        id=?

```

## 关于 Hibernate 中对象的状态

在Hibernate中，对象的状态有 4 种，分别为 Transient、Persistent、Detached、Removed，译名就比较多，方便起见，我选择 3 个字的译名：

1. **瞬时态（Transient）**：当一个对象被实例化后，它处于瞬时态，简单理解，就是 `new 操作之后`。瞬时态的对象没有与之关联的数据库记录，并且没有被 Hibernate 的 Session 管理。当将瞬时态的对象关联到持久态对象或通过 Session 对象的 `save`、`persist` 等方法进行持久化操作后，该对象的状态会发生变化，转成持久态。
2. **持久态（Persistent）**：当一个对象与 Hibernate 的 Session 关联后，它就处于持久态。持久态的对象有与之对应的数据库记录，并且被 Hibernate 的 Session 管理。对持久态对象的任何更改都会自动同步到数据库。持久态对象可以通过Session的 `get`、`load` 等方法从数据库中获取，或者通过 `save`、`update`、`persist` 等方法进行持久化操作。
3. **游离态（Detached）**：当一个持久态对象与 Hibernate 的 Session 分离后，它处于游离态。游离态的对象仍然有与之对应的数据库记录，但不再受 Hibernate 的 Session 管理。对游离态对象的更改不会自动同步到数据库。可以通过 Session 的 `evict`、`clear` 等方法将持久态对象转变为游离态对象，或者通过 Session 的 `merge` 方法将游离态对象重新关联到 Session 中。
4. **删除态（Removed）**：当一个持久态对象被从 Hibernate 的  Session中删除后，它处于删除态。删除态的对象仍然有与之对应的数据库记录，但即将被从数据库中删除。删除态对象可以通过 Session 的`delete` 方法进行删除操作。

Hibernate 通过跟踪对象的状态变化，实现了对象与数据库的同步。在 Hibernate 的事务管理中，对象的状态转换是自动进行的，我们无需手动操作，Hibernate 会根据对象的状态进行相应的数据库操作，保证对象与数据库的一致性。

需要注意的是，Hibernate 的对象状态与数据库的操作并不是一一对应的，Hibernate 提供了一系列的持久化方法和操作，我们可以根据具体的需求选择合适的方法来进行对象状态的转换和数据库操作。对于复杂的业务逻辑和数据处理，需要仔细理解和管理对象的状态，以避免数据不一致的问题。

## 懒加载

**Hibernate 的懒加载（Lazy Loading）是一种延迟加载策略**，它允许程序在需要访问相关数据时才从数据库中加载关联对象的属性或集合。

在 Hibernate 中，懒加载是通过使用代理对象来实现的。实际上，我们在演示 Session 对象的 `load()` 方法时，就是懒加载了，一开始返回的是代理对象，并没有直接查询数据库，而是直到该代理对象的属性或方法被调用时，Hibernate 会根据需要自动执行额外的数据库查询，从而延迟加载关联的数据。

这就是懒加载，等到需要的时候才去加载。

懒加载的主要优点是可以提高系统性能和减少不必要的数据库查询。如果一个对象关联的属性或集合在业务逻辑中很少被使用，懒加载可以避免不必要的数据库访问，减轻数据库负载。

除了 `load` 方法实现的懒加载，我们还可以通过设置映射文件中的 `<property> ` 标签的 `lazy` 属性实现懒加载：

```xml
<property name="name" type="string" lazy="true" /> <!-- name 属性被设置成懒加载-->
```

## 缓存

**缓存是一种临时存储数据的方式，将数据保存在更快速的存储介质（如内存）中，以便将来能够快速访问和检索。**

Hibernate 提供了缓存的技术，主要用于存储实体对象以及查询的结果集。缓存分为**一级缓存（Session 缓存）和二级缓存（Session Factory 缓存）**。

### 一级缓存

一级缓存是与 Session 相关联的缓存，它存储了从数据库中读取的实体对象。在同一个 Session 中，当多次查询相同的数据时，Session 首先会根据对应的持久化类和唯一性标识（一般指的是ID）去缓存中查找是否存在该数据。如果存在，则直接从缓存中获取，而不再访问数据库；如果不存在，则继续向二级缓存种查找。

一级缓存是**默认开启**的，可以提高读取性能。

示例：

```java
    @Test
    public void testFirstLevelCache() {
        Session session = HibernateUtil.getSession();
        try {
            System.out.println("第一次查询：");
            User user = session.get(User.class, new Integer("2"));
            System.out.println("用户名：" + user.getName());
            
            System.out.println("第二次查询：");
            User user2 = session.get(User.class, new Integer("2"));
            System.out.println("用户名：" + user2.getName());
        } catch (Exception e) {
            System.out.println("查询User数据失败！");
            e.printStackTrace();
        } finally{
            // 关闭 Session 对象
            HibernateUtil.closeSession();
        }
    }
```

控制台输出：

```shell
五月 09, 2023 9:35:31 下午 org.hibernate.dialect.Dialect <init>
INFO: HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect
五月 09, 2023 9:35:32 下午 org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator initiateService
INFO: HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
第一次查询：
Hibernate: 
    select
        user0_.id as id1_0_0_,
        user0_.name as name2_0_0_,
        user0_.password as password3_0_0_ 
    from
        user user0_ 
    where
        user0_.id=?
用户名：god23bin
第二次查询：
用户名：god23bin

```

**可以看到，第二次查询是没有执行 SQL 的，直接从一级缓存中获取。**

### 二级缓存

二级缓存是在 SessionFactory 级别上的缓存，**用于缓存多个 Session 之间共享的数据**。它可以减少对数据库的访问次数，提高性能和扩展性。二级缓存可以存储实体对象、集合对象以及查询结果集。

由于 Hibernate 本身并未提供二级缓存的具体实现，所以需要借助其他缓存插件或者说策略来实现二级缓存。比如 Ehcache、Redis 等。

我们这里直接使用 Ehcache。

1. **引入依赖项**

```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-ehcache</artifactId>
    <version>5.6.14.Final</version>
</dependency>

<dependency>
    <groupId>net.sf.ehcache</groupId>
    <artifactId>ehcache</artifactId>
    <version>2.10.0</version>
</dependency>
```

2. **开启二级缓存**

二级缓存默认是关闭的，我们需要手动开启。在 `hibernate.cfg.xml` 中开启二级缓存：

```xml
<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
                "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
		...
        <!-- 开启二级缓存 -->
        <property name="hibernate.cache.use_second_level_cache">true</property>
        <!-- 开启查询缓存 -->
        <property name="hibernate.cache.use_query_cache">true</property>
        <!-- 指定使用的缓存实现类 -->
        <property name="hibernate.cache.region.factory_class">org.hibernate.cache.ehcache.internal.SingletonEhcacheRegionFactory</property>
    </session-factory>
</hibernate-configuration>
```

3. **创建缓存配置文件**

我们在 `/src/main/resources` 目录下创建缓存配置文件 ehcache.xml：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
         updateCheck="false">

    <!-- 硬盘存储：将缓存中暂时不使用的对象，持久化到硬盘 -->
    <!-- path 属性：指定在硬盘上存储对象的路径 -->
    <!-- java.io.tmpdir 是默认的临时文件路径。 可以通过右边的方式打印出具体的文件路径： System.out.println(System.getProperty("java.io.tmpdir")); -->
    <diskStore path="java.io.tmpdir"/>


    <!-- defaultCache：默认的缓存策略 -->
    <!-- eternal 属性：设定缓存的elements是否永远不过期。如果为true，则缓存的数据始终有效，如果为false那么还要根据timeToIdleSeconds，timeToLiveSeconds判断 -->
    <!-- maxElementsInMemory 属性：在内存中缓存的element的最大数目 -->
    <!-- overflowToDisk 属性：如果内存中数据超过内存限制，是否要缓存到硬盘上 -->
    <!-- diskPersistent 属性：是否在硬盘上持久化。指重启 JVM 后，数据是否有效。默认为false -->
    <!-- timeToIdleSeconds 属性：对象空闲时间(单位：秒)，指对象在多长时间没有被访问就会失效。只对eternal为false的有效。默认值0，表示一直可以访问 -->
    <!-- timeToLiveSeconds 属性：对象存活时间(单位：秒)，指对象从创建到失效所需要的时间。只对eternal为false的有效。默认值0，表示一直可以访问 -->
    <!-- memoryStoreEvictionPolicy 属性：缓存的 3 种清除策略，因为缓存区域是一定的，满了之后就需要清除不需要的数据 -->
    <!-- 1. FIFO：first in first out (先进先出). 先缓存的数据会先被清除-->
    <!-- 2. LFU：Less Frequently Used (最少使用).意思是一直以来最少被使用的。缓存的元素有一个 hit 属性，hit 值最小的将会被清除 -->
    <!-- 3. LRU：Least Recently Used(最近最少使用). (ehcache 默认值).缓存的元素有一个时间戳，当缓存容量满了，而又需要腾出地方来缓存新的元素的时候，那么现有缓存元素中时间戳离当前时间最远的元素将被清除 -->

    <defaultCache eternal="false"
                  maxElementsInMemory="1000"
                  overflowToDisk="false"
                  diskPersistent="false"
                  timeToIdleSeconds="0"
                  timeToLiveSeconds="600"
                  memoryStoreEvictionPolicy="LRU"/>

    <!-- name： Cache的名称，必须是唯一的(ehcache会把这个cache放到HashMap里)-->
    <cache name="userCache"
           eternal="false"
           maxElementsInMemory="100"
           overflowToDisk="false"
           diskPersistent="false"
           timeToIdleSeconds="0"
           timeToLiveSeconds="300"
           memoryStoreEvictionPolicy="LRU"/>
</ehcache>

```

4. 在持久化类的映射文件中指定缓存策略

User.hbm.xml：

```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-mapping PUBLIC
        "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping>
    <class name="cn.god23bin.demo.domain.entity.User" table="user">
        <!-- 指定缓存策略 -->
        <cache usage="read-only"/>
		...
    </class>
</hibernate-mapping>
```

测试二级缓存：

```java
    @Test
    public void testSecondLevelCache() {
        Session session1 = HibernateUtil.getSession();
        Session session2 = HibernateUtil.getSession();
        try {
            System.out.println("第一个 Session 去查询数据并封装成对象");
            User user1 = session1.get(User.class, new Integer("2"));
            System.out.println("用户名：" + user1.getName());

            System.out.println("第二个 Session 去查询同一数据并封装成对象");
            User user2 = session2.get(User.class, new Integer("2"));
            System.out.println("用户名：" + user1.getName());
        } catch (Exception e) {
            System.out.println("查询User数据失败！");
            e.printStackTrace();
        } finally{
            // 关闭 Session 对象
            HibernateUtil.closeSession();
        }
    }
```

控制台输出：

```shell
五月 09, 2023 11:18:31 下午 org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator initiateService
INFO: HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
第一个 Session 去查询数据并封装成对象
Hibernate: 
    select
        user0_.id as id1_0_0_,
        user0_.name as name2_0_0_,
        user0_.password as password3_0_0_ 
    from
        user user0_ 
    where
        user0_.id=?
用户名：god23bin
第二个 Session 去查询同一数据并封装成对象
用户名：god23bin
```

## 总结

本篇文章主要讲了基本的 CRUD 操作，都是通过 Session 去操作的，根据一个持久化类的类型以及一个唯一标识进行相关操作，然后讲了 Hibernate 中的对象的状态，有 4 种，分别是瞬时、持久、游离、删除。

接着说了 Hibernate 的懒加载，有利于降低数据库的开销，当然缓存也是，除了加快我们的访问速度，也降低了直接访问数据库的开销，缓存就两种，一级和二级，一级默认是开启的，二级需要引入相关的依赖项，然后进行配置，开启二级缓存，配置缓存策略。

这里附上整个项目的目录结构，便于对照：

![整个项目的目录结构](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230509234045.png)

以上，就是本篇的内容，这些都应该掌握。咱们下期再见。

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**