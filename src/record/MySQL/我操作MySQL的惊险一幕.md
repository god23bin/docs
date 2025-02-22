---
# 这是文章的标题
title: 我操作 MySQL 的惊险一幕
# 这是页面的图标
icon: table
# 这是侧边栏的顺序
order: 1
# 设置作者
author: god23bin
# 设置写作时间
date: 2022-10-03 09:45:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - MySQL
---

## 背景

前几天因工作需要，组长给我安排了一个数据清洗的任务。

> 任务：把 A 表的数据洗到 B 表。

我的第一反应，**什么是「洗」？洗数据是什么？**洗钱我倒是知道。

不过我不能慌啊，于是问了问组长。

我：组长，把 A 表的数据洗到 B 表是什么意思？

组长一脸无奈，手捂住脸，恨铁不成钢，然后调整过来，还是很耐心地跟我讲的，大概意思就是我们现在 B 表需要 A 表的数据， A 表中和 B 表中字段含义一样，但是值可能不一样，这就需要我们进行处理，在将 A 表数据搞到 B 表的过程中，把数据搞正确。

基于我理解能力有限，当时并不是很懂所谓的「洗数据」，而且这个 A 表的字段也和 B 表的字段没怎么对上，A 的字段明显多于 B 的字段，某些字段命名也和 B 不一样，但是表达的意思是一样的，该如何洗？

于是疯狂搜索如何洗数据！

我这里就举个例子来说明，分别给出 A 表和 B 表，当然我只列出了一部分字段，现在假设就这么多字段。

### A 表

A 表字段：`name, province_id, city_id, area_id, tech_id, crop_id, field_id, create_time, update_time, xxx, yyy, zzz, ... `

**A 表的字段是多于 B 表的**，我需要将 A 表的数据洗到 B 表，**只处理我需要的字段**，不需要的就不用理。

A 表中有 2 万多条记录，B 表我自己插入的有 200 多条记录。

当然，给出 A 表后，还给了个实体模型（JavaBean，Entity，超多种叫法，花里胡哨的）

```java
public class A {
    private String name;
    private Long provinceId;
    private Long cityId;
    private Long areaId;
    private Long techId;
    private Long cropId;
    private Date createTime;
    private Date updateTime;
    ...
}
```

### B 表

B 表字段：`name, province_id, city_id, area_id, mature_id, crop_id, create_time, update_time`

## 还原现场

下面我模拟测试环境中数据库的那两张表，上面是 A 表（2 万多条记录，这里我只模拟了 7 条），下面的 B 表（200 多条记录）。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20221003105825.png)

### 洗数据思路

首先，我是先找出 A 表中能和 B 表对上意思的字段，然后将 A 表数据全部插入到 B 表中。

于是，我便找出了如下这些字段：

`name, province_id, city_id, area_id, tech_id, crop_id, update_time`

之后在 B 表中对新插入的数据进行处理，即**洗数据**。

### 写 SQL 操作

主要的 SQL 语句是：

```sql
INSERT INTO 目标表(字段1, 字段2, ...) SELECT 字段1, 字段2, ... FROM 来源表 WHERE 条件;
```

于是，便这样操作：

```sql
INSERT INTO b(name, province_id, city_id, area_id, mature_id, crop_id, update_time) 
SELECT name, province_id, city_id, area_id, tech_id, crop_id, update_time FROM a;
```

操作是正常的，成功将 A 中 2 万多条记录全部插入到了 B 中。

**但是！我漏了一个字段**，就是 `create_time` 。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20221003105833.png)

于是，想着对这个字段进行更新，将 A 中这个字段更新到 B 中。

于是写了一条SQL语句。

```sql
UPDATE b(create_time) SET create_time = (SELECT create_time FROM a);

> 1064 - You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '(create_time) SET create_time = (SELECT create_time FROM a)' at line 1
```

噢，看来不能这样更新啊！（一个大嘴巴子过去，写错了还没发现）

**换种写法：**

```sql
UPDATE b AS tb, (SELECT create_time FROM a) AS ta SET tb.create_time = ta.create_time;
```

**可以，噩梦开始了！**

更新了非常久，看着十几秒的SQL执行到六七百秒还没执行完，心里着实很慌！眼看着数据库可能会崩，我不得不向我的组长求救了！

这时问题出现了，有人数据库连接不上了，可见这严重性，已经影响到其他人的使用了！

![噩梦](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20221003105838.png)

于是我组长来帮我处理了，想着 kill 掉我的 `navicat` ，但是 kill 掉还是没效果，毕竟这个 SQL 已经在执行了。

我：能不能重启这个 MySQL 服务？

组长一波连环炮过来了

组长：重启？你知道这个 MySQL 有多少人在用吗？又不只是我们在用，你重启其他人怎么搞？

我哑口无言，心里非常忐忑，想着闯祸了，GG，就看着他操作。没过多久，经过他的一顿操作，终于解决了这个问题。我的心里的一块悬着的大石终于放下了，还好解决了。组长牛逼，救世主！

我：如何解决的？

组长：将这个事务回滚解决的，你更新的 SQL 怎么写的？（努力回想）

于是写出了上面写的 SQL：

```sql
UPDATE b AS tb, (SELECT create_time FROM a) AS ta SET tb.create_time = ta.create_time;
```

组长：你为什么这样写？不应该把子查询写在 `SET tb.create_time` 后面吗？

我：对啊，我一开始就是把这个子查询写在它后面的，但是提示我语法错误，我就换了一种写法。

组长：那你写写你说提示错误的 SQL。

于是我又丢出来一个 SQL：

```sql
UPDATE b SET create_time = (SELECT create_time FROM a);
```

**实际上，这条 SQL 也是不行的，子查询返回的结果不止一行，而当前 SET 是更新某一行的。**

**正确的写法是：**

```sql
UPDATE b AS tb 
SET create_time = (SELECT create_time FROM a AS ta WHERE tb.id = ta.id AND tb.name = ta.name)
```

![成功更新B表](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20221003105843.png)

> [博客园-SQL把一个表中数据更新到另一个表的多种方法](https://www.cnblogs.com/AlbertFei/archive/2012/12/27/essay.html)

最后组长深思，你 B 表已经有 2 万多条记录了，A 表也有 2 万多条记录，你这样更新，每一次都需要子查询查出 A 表的 2 万多条记录，B 也有 2 万多条记录，**这样成笛卡尔积了**，你知道什么是笛卡尔积吧？2 万 × 2 万 = 4 亿的记录行了，难怪这么久。

让我重新操作，那么现在我会在原先的 SQL 加上 WHERE 条件，这样写：

```sql
UPDATE b AS tb, (SELECT create_time, name FROM a) AS ta 
SET tb.create_time = ta.create_time
WHERE tb.id = ta.id AND tb.name = ta.name;
```

## 总结

情况：漏了某一个字段 X，需要将 A 表的这个字段列值更新到 B 表

条件：A 中的 id 字段的值等于 B表中的 id 字段的值 且 A 中的 name 字段的值等于 B 中 name 字段的值（条件为什么这样写？）。

> 条件这样写主要是因为 **表和表之间的关联关系** 可能有多个字段，此处只选二个字段，多个依此类推。

操作：

- 一张表的数据插入到另一张表，可以这样写：

```sql
INSERT INTO 目标表(字段1, 字段2, ...) SELECT 字段1, 字段2, ... FROM 来源表 WHERE 条件;
```

- 批量更新一张表的某个字段到另一张表，那么 SQL 可以类似这样写：

```sql
# 写法一
UPDATE b AS tb 
SET create_time = (SELECT create_time FROM a AS ta WHERE tb.id = ta.id AND tb.name = ta.name)

# 写法二
UPDATE b AS tb, (SELECT create_time, name FROM a) AS ta 
SET tb.create_time = ta.create_time
WHERE tb.id = ta.id AND tb.name = ta.name;
```

所谓**洗数据**：在我的理解中，就是把旧数据，按照新数据的规则把旧数据不正确的值修改正确，同时把这些旧数据插入到新数据中，成为新数据。举个例子，A 表中的 province_id，值为 10 代表 广东，而 B 表中的 province_id ，值为 19 代表 广东，把 A 表中的数据插入到 B 表的过程中，把值为 10 修改为 19，这样插入的数据才能在 B 表中正确表示 广东，这个过程就是「洗数据」，当然，也可以在插入后再修改，不管过程是怎样，最终能把数据的值修改正确，就是洗数据！

**教训：**

1. **数据量大的表，少在测试环境操作，要操作尽量保证写的 SQL 是正确的，能在本地环境操作就现在本地环境操作！**

2. **能用 Java 代码进行操作，优先写 Java 代码操作！**