---
# 这是文章的标题
title: J2EE、Java EE、JakartaEE 傻傻分不清楚
# 这是页面的图标
icon: pepper-hot
# 这是侧边栏的顺序
# order: 2
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-06-09 13:14:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - Java
---

相信大家从第一天学习 Java 的时候，就知道了 Java 有所谓的三个版本：Java SE、Java EE、Java ME。分别代表着 Java 基础版、Java 企业版、Java 移动版。

后来，在你漫漫地学习之路上，又蹦出来 J2EE、Jakarta EE 这些专业术语。

那你有没有搞清除这几个有什么区别？它们的内容你有了解吗？

**实际上，J2EE、JavaEE、Jakarta EE 都是指同一件东西，只是有不同的名称。** 它们指的是：**一组用来扩展 Java SE 的企业级规范**。

## 历史

在 Java 的第一个版本中，Java 的企业扩展仅仅是 JDK 核心的一部分。

后来，这个企业扩展就成为 1999 年 Java 2 的一部分，这些扩展是从标准的二进制文件中分离出来的，从此，J2EE 或 Java 2 平台企业版诞生了。J2EE 这个名字将一直使用到 2006 年。

对于 2006年的 Java 5，J2EE 被重新命名为 Java EE（ Java 平台企业版）。这个名字就一直持续到 2017 年 9 月，当时发生了一些重大事件。

2017 年 9 月，Oracle 决定将 Java EE 的权利赠送给 Eclipse 基金会（该语言仍归 Oracle 所有）。

这时候，Eclipse 基金会必须重新命名 Java EE，因为 Oracle 拥有「Java」品牌的所有权， 所以 Eclipse 基金会为了选择新的名字，社区投票选出了：Jakarta EE。在某种程度上，它仍然是 Java EE。

!\[image-20230609115743518]\(Java EE & J2EE & JakartaEE.assets/image-20230609115743518.png)

<https://www.baeldung.com/java-enterprise-evolution>