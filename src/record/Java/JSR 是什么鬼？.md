---
# 这是文章的标题
title: JSR 是什么鬼？
# 这是页面的图标
icon: tree
# 这是侧边栏的顺序
# order: 2
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-05-16 09:45:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - Java
---

相信大家在学习 Java 的过程中，或多或少都见过 JSR 这个词。本篇文章就科普下什么是 JSR。

## 什么是 JSR ？

JSR（Java Specification Requests），是指 Java 规范请求（或者活规范提案）。这个请求（提案）是提给 JCP 的（Java Community Process）。那什么是 JCP 呢？

JCP 官网在这：[https://jcp.org/en/home/index](https://jcp.org/en/home/index)

JCP 是一家专门为 Java 技术开发标准技术规范的组织机构。

> The JCP is the mechanism for developing standard technical specifications for Java technology.

任何人都可以在官网上进行注册并参与到审查和提供 Java 规范请求（JSR）的反馈中来，也都可以注册成为 JCP 成员，然后参与 JSR 的专家组，甚至提交自己的 JSR 提案。

> Anyone can register for the site and participate in reviewing and providing feedback for the Java Specification Requests (JSRs), and anyone can sign up to become a JCP Member and then participate on the Expert Group of a JSR or even submit their own JSR Proposals.

科普完毕，本篇文章到此结束，谢谢大家！

开玩笑，怎么可能呢。

## 什么是 JCP ？

Java 社区过程（JCP）是国际 Java 社区标准化和批准 Java 技术规范的一个过程，简而言之，是一个开放的国际组织。

JCP 采用包容性、基于共识的方法确保高质量规范的开发。JCP 批准的规范必须附带**参考实现**（以证明规范可以实现）和**技术兼容性套件**（一套用于测试实现是否符合规范的测试、工具和文档，称为技术兼容性套件）。

经验表明，生产技术规范的最佳方式是使用开放和包容性的过程来共同开发**规范和实现**（specification and implementation），由一群具有各种观点的行业专家提供信息，与此同时，社区和公众也有机会参与审查和评论，并且有强有力的技术领导者来确保**技术目标、其他相关规范以及用户的期望**能够相互集成。

有一个称为**执行委员会**（ [Executive Committee (EC)](https://jcp.org/en/participation/committee)）的组织，代表着 Java 社区的各个主要利益相关者和其他成员，专门负责批准 Java 规范通过 JCP 的各个阶段，并协调 Java 规范和其相关测试套件之间的差异。

提交一个 JSR 的过程，有如下的阶段：

![阶段](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230420215144.png)

下面说说有哪些 JSR。

> 习惯说成 JSR 规范，或者 JSR 标准。

> 可以看看这里 [JCP - 百度百科](https://baike.baidu.com/item/Java%20Community%20Process/19279280)

## 有哪些 JSR ？

我们可以从官网上看到所有的 JSR 规范：[https://jcp.org/en/jsr/all](https://jcp.org/en/jsr/all)

以 JSR 303 规范为例，Bean Validation 规范

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230420215148.png)

点击 Bean Validation，就可以进入详情页面，可以看到该规范的详细信息，包括该规范走 JCP 流程的整个阶段，阶段包含的各种文件，团队人员等等。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230420215152.png)

Java SE 下的规范：

- JSR 3：**[JavaTM Management Extensions (JMXTM) Specification](https://www.jcp.org/en/jsr/detail?id=3)**
- JSR 5：**[XML Parsing Specification](https://www.jcp.org/en/jsr/detail?id=5)**
- JSR 6：**[Unified Printing API (Java Print Service API)](https://www.jcp.org/en/jsr/detail?id=6)**
- JSR 10：**[Preferences API Specification](https://www.jcp.org/en/jsr/detail?id=10)**
- JSR 13：**[Decimal Arithmetic Enhancement](https://www.jcp.org/en/jsr/detail?id=13)**

- .......

具体可见：[https://www.jcp.org/en/jsr/platform?listBy=2&listByType=platform](https://www.jcp.org/en/jsr/platform?listBy=2&listByType=platform)

Java EE 下的规范：

- JSR 5：**[XML Parsing Specification](https://www.jcp.org/en/jsr/detail?id=5)**
- JSR 16：**[J2EE Connector Architecture](https://www.jcp.org/en/jsr/detail?id=16)**
- JSR 19：**[Enterprise JavaBeans 2.0](https://www.jcp.org/en/jsr/detail?id=19)**
- JSR 45：**[Debugging Support for Other Languages](https://www.jcp.org/en/jsr/detail?id=45)**
- JSR 52：**[A Standard Tag Library for JavaServer Pages](https://www.jcp.org/en/jsr/detail?id=52)**

- ...

具体可见：[https://www.jcp.org/en/jsr/platform?listBy=3&listByType=platform](https://www.jcp.org/en/jsr/platform?listBy=3&listByType=platform)

## 最后

所以，现在知道 JSR 是什么了吧。就是 Java 规范提案，当你自己提交了一个规范，那么成功经过 JCP 的 review 和 comment 以及一系列流程后，你的规范就会成为行业上的标准，软件厂商就会来按照你提供的这种标准进行具体的实现，你也将名留青史！

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230420225848.png)
