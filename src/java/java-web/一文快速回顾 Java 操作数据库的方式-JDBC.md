---
# 这是文章的标题
title: 一文快速回顾 Java 操作数据库的方式-JDBC
# 这是页面的图标
icon: connectdevelop
# 这是侧边栏的顺序
order: 3
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-03-24 13:14:13
# 一个页面可以有多个分类
category:
  - Java
# 一个页面可以有多个标签
tag:
  - Java Web
  - JDBC
---

## 前言

数据库的重要性不言而喻，不管是什么系统，什么应用软件，也不管它们是 Windows 上的应用程序，还是 Web 应用程序，存储（持久化）和查询（检索）数据都是核心的功能。

大家学习数据库时，比如 MySQL 这个数据库管理系统，都是在 CLI（Command Line Interface）上操作数据库的，现在，我们看看，在 Java Web 中，我们如何使用 Java 去操作数据库。

## JDBC

JDBC（Java Data Base Connectivity）是 Java 操作数据库的一种规范，也是一种 API（与数据库系统进行通信的标准的 API），更是一门技术。

JDBC 是由一组用 Java 编写的类和接口组成，对数据库的操作提供了基本的方法。但是，对于数据库细节的操作，那就是由数据库的厂商实现的。使用 JDBC 操作数据库，需要数据库厂商提供的数据库驱动程序的支持。

那什么是数据库驱动程序呢？这个驱动（driver）可以理解成一种可以让数据库和 Java 彼此进行互动的程序。

简单来讲，JDBC 提供了一种 API 的规范，告诉各大数据库厂商按这种规范来实现这些 API 具体的实现代码。可以从两个角色的角度来说这个 JDBC。从咱们开发人员的角度来说，JDBC 为我们开发人员提供了统一的操作数据库的 API，不用管这些 API 的具体实现，专注于 API 的调用；从数据库厂商的角度来说，JDBC 为他们提供了一套标准的模型接口，都按这个接口去做自己的实现。

## 如何使用 JDBC？

JDBC 的使用主要有如下几个步骤：

1. 注册数据库驱动程序（database driver program）到 JDBC 的驱动管理器中。

在连接数据库之前，需要将数据库厂商提供的数据库驱动类注册到 JDBC 的驱动管理器中，一般是把驱动类加载到 JVM 实现的。

```java
Class.forName("com.mysql.jdbc.Driver");
```

> 注意：8.0 以上的 MySQL，驱动类是 `com.mysql.cj.jdbc.Driver`

2. 构建数据库连接的 URL。

要与数据库建立连接，那么就需要构建数据库连接的 URL，这个 URL 由数据库厂商指定，一般符合一种基本格式，即 `JDBC协议+IP地址或域名+端口+数据库名称`。MySQL 的 URL 是 `jdbc:mysql://localhost:3306/dbname`

3. 获取连接对象（Connection 对象）。

```java
String url = "jdbc:mysql://localhost:3306/dbname";
String username = "root";
String password = "123456";
// Connection 对象的获取需要借助 DriverManager 对象
Connection conn = DriverManager.getConnection(url, username, password);
```

4. 进行数据库操作。

编写 SQL，然后获取 PreparedStatement 对象，对 SQL 语句进行执行。SQL 语句的参数是可以使用占位符 “?” 代替，再通过 PreparedStatement 对象对 SQL 语句中的占位符进行赋值。

> Statment 这个单词的意思在这里指的就是 SQL 语句。

```java
// 编写SQL
String sql = "INSERT INTO tb_game(name, price, platform) values(?, ?, ?)";
// 获取 PreparedStatement 对象
PreparedStatement ps = conn.preparedStatement(sql);
// 给占位符赋值
ps.setString(1, "NBA2K");
ps.setDouble(2, 198.0);
ps.setString(3, "Windows");
// 执行 SQL，将这条数据写入数据库，返回影响的行数
int row = ps.executeUpdate();
```

> 使用 PreparedStatement 对象对 SQL 语句的占位符参数赋值，其参数的下标是从 1 开始的。

5. 关闭连接

```java
conn.close();
```

## CRUD

### 新增操作

新增操作，就是上面的插入操作，请看上面。

### 查询操作

#### ResultSet

使用 JDBC 查询数据，与插入数据的操作流程基本一样，但是执行查询操作后需要通过一个对象来接收查询的结果，这个对象就是 ResultSet （结果集）。

ResultSet 是 JDBC API 中封装的对象，从数据表中查到的所有记录都会放在这个集合中。ResultSet 中维护着一个 cursor（游标）来指向当前的数据行（数据记录），初始化的时候，这个游标指向第一行的前一行，可以通过 `next()`  方法来移动游标，让游标指向下一行。

调用这个 `next()` 它返回的是一个布尔值，为 true 说明 ResultSet 中还有下一行的数据，为 false 说明没有，所以可以结合 while 循环使用这个方法来遍历整个 ResultSet。

```java
// 由于一开始的游标在第一行的前一行，所以执行 next() 后，游标就指向第一行的数据了
while (resultSet.next()) {
    // 处理结果集中每一行的数据
}
```

获取到 ResultSet 对象后，移动了光标指定了数据行，然后通过 ResultSet 对象提供的一系列 `getXxxx()` 方法来获取当前行的数据，比如 `resultSet.getInt("price")` 获取当前行中字段名为 `price` 的数据。

默认的 ResultSet 是不可更新的，同时它的游标只能一步一步 next 下去，只能走一遍，不能回到上一行的。说了默认，那说明是可以设置的，通过如下代码进行设置：

```java
Statement stmt = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
ResultSet rs = stmt.executeQuery("SELECT a, b FROM TABLE2");
// rs 是可以滚动的，也就是游标走到最后又会回到开头继续走，并且它的内容是可以被改变的
```

#### 查询

找到价格大于50块钱的所有游戏：

```java
String sql = "SELECT id, name, price FROM tb_game WHERE price > ?";
PreparedStatement ps = conn.preparedStatement(sql);
ps.setDouble(1, 50);
// 执行查询
ResultSet rs = ps.executeQuery(sql);
List<Game> gameList = new ArrayList<>();
// 遍历结果集
while (rs.next()) {
	Game game = new Game();
    // 获取当前行中字段名为 id 的数据，并赋值到 game 对象中
    game.setId(rs.getInt("id"));
    game.setName(rs.getString("name"));
    game.setPrice(rs.getDouble("price"));
    gameList.add(game);
}
System.out.println(gameList);
```

### 修改（更新）操作

修改（更新）数据的操作，也是和插入数据的操作是类似的。

更新 ID 为 3 的数据记录，修改其价格为 298 块钱。

```java
String sql = "UPDATE tb_game SET price = ? WHERE id = ?";
PreparedStatement ps = conn.preparedStatement(sql);
ps.setDouble(1, 298);
ps.setInt(2, 3);
int row = ps.executeUpdate();
```

### 删除操作

同理。

```java
String sql = "DELETE FROM tb_game WHERE id = ?";
PreparedStatement ps = conn.preparedStatement(sql);
ps.setInt(1, 1);
int row = ps.executeUpdate();
```

## 分页查询

在 Java Web 中数据量非常大的情况下，是不利于将所有数据都展示到一个页面中的，查看不方便，又占用系统资源。此时就需要对数据进行分页查询，同时，以后的工作中，可以说大部分的业务场景都会涉及到分页查询。

在 MySQL 中，分页可以通过其自身的 LIMIT 关键字来实现：

```sql
SELECT *
FROM tb_game
WHERE price > 50
ORDER BY price DESC
LIMIT 0, 10; // 从表中下标0开始（第一行的下标为0），限制返回10条记录
```

目前分页涉及到这样的两个参数：**当前页码**和**页面大小**。

涉及的 SQL 语句：`SELECT * FROM tb_game WHERE price > 50 ORDER BY price DESC LIMIT 当前页码, 页面大小`

```java
// 分页参数
int currentPage = 1, pageSize = 10;
// 分页 SQL
String sql = "SELECT * FROM tb_game WHERE price > 50 ORDER BY price DESC LIMIT ?, ?";
PreparedStatement ps = conn.preparedStatement(sql);
// 赋值
ps.setInt(1, (page - 1) * pageSize);
ps.setInt(2, pageSize);
ResultSet rs = ps.executeQuery();
```

与此同时，还需要计算获取的数据的**总记录数**，用于计算分页的**总页数**，便于前端传递是要哪一页的数据给后端。

```java
int count = 0;
String sql = "SELECT COUNT(*) FROM tb_game WHERE price > 50";
PreparedStatement ps = conn.preparedStatement(sql);
ResultSet rs = ps.executeQuery();
if (rs.next()) {
    // 获取总记录数，getInt(1) 是获取第一列的数据
    count = rs.getInt(1);
}
```

## 总结

目前在 Java 中通过 JDBC 来操作数据库，就有几个固定的步骤，先加载数据库驱动程序，接着获取数据库的连接，有了这个连接后，才能进行 CRUD 的操作，操作后也可以获取操作的结果，最后关闭这些资源，比如数据库连接。

不过，在日常的开发中，基本不会用到原生的 JDBC 来操作数据库，一般我们有多种选择，可以使用 JdbcTemplate、Hibernate、MyBatis、JPA（Java Persistence API，Java 持久化 API）或者是其他任意的持久化框架。

## 最后的最后

**由本人水平所限，难免有错误以及不足之处， `屏幕前的靓仔靓女们` 如有发现，恳请指出！**

**最后，谢谢你看到这里，谢谢你认真对待我的努力，希望这篇博客对你有所帮助！**

**你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**