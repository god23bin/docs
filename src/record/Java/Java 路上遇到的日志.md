---
# 这是文章的标题
title: Java 路上遇到的日志
# 这是页面的图标
icon: pencil
# 这是侧边栏的顺序
# order: 2
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-06-09 09:45:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - Java
---

当你开始学习 Java 开发时，日志是一个你必须要处理的重要问题。在开发过程中，你需要记录应用程序的运行状态，以便在出现问题时能够追踪和调试。Java 提供了多种日志框架，本文将介绍其中最常用的几种，包括 Java 自带的日志框架、Log4j、Logback 等。

## 什么是日志？

日志，在日常生活中就是每天记录下我们自己做了什么。实际上就相当于日记：

> <u>**2023 年 6 月 7 日**</u>						**星期三**					 天气：<u>**阴转大雨**</u>
>
> 		今天，小明和我一起去上学，在路上遇到了 god23bin，他 ...
>
> 今天真是愉快的一天。

是吧，这就是一篇日志，记录了今天的事情。

**那么在软件开发中，日志是一种记录应用程序运行状态的工具。** 开发人员可以使用日志来记录应用程序的行为、状态和错误信息，以便在出现问题时能够追踪和调试。

https://www.jianshu.com/p/546e9aace657

https://zhuanlan.zhihu.com/p/442504826

日志通常包括以下几个方面的信息：

- 时间戳：记录日志的时间。
- 日志级别：表示日志的重要程度。常见的日志级别有 `DEBUG`、`INFO`、`WARN`、`ERROR`、`FATAL` 等。
- 日志内容：记录应用程序的状态、行为或错误信息。

## Java 自带的日志框架

从 JDK 1.4 开始，Java 自带了一个简单的日志框架，它包含了 `java.util.logging.Logger` 类和 `java.util.logging.Handler` 类，简称 JUL（`java.util.logging`）。

Logger 类用于记录日志，Handler 类用于将日志记录到不同的目的地，如控制台或文件。

以下是一个使用 Java 自带日志框架的例子：

```java
import java.util.logging.Level;
import java.util.logging.Logger;

public class HelloWorld {

    // 首先通过 Logger 的 getLogger() 方法获取 Logger 对象
    private static final Logger LOGGER = Logger.getLogger(HelloWorld.class.getName());

    public static void main(String[] args) {
        // 设置日志级别
        LOGGER.setLevel(Level.INFO);
        // 打印各种级别的日志
        LOGGER.severe("severe message");
        LOGGER.warning("warning message");
        LOGGER.info("info message");
        LOGGER.config("config message");
        LOGGER.fine("fine message");
        LOGGER.finer("finer message");
        LOGGER.finest("finest message");
    }
}
```

在上面的例子中，我们首先通过 Logger 的 `getLogger()` 方法获取 Logger 对象，然后使用 `setLevel()` 方法设置日志级别。接着，我们使用不同的日志级别记录了一些信息。在程序运行时，日志信息将会输出到控制台。

**JUL 一共 7 个日志级别**：

JUL 中，`Level` 类定义了一组可用于控制日志输出的标准日志级别。调用方（客户端）通常应该使用预定义的 Level 常量，如 `Level.SEVERE`。

1. Level.SEVERE：最高级别的日志，主要记录错误信息
2. Level.WARNING：级别排行第二，记录警告信息
3. Level.INFO：级别排行第三，最常用的日志级别，记录普通消息，比如请求信息、连接信息、参数信息等等
4. Level.CONFIG：级别排行第四，记录配置信息，加载配置文件、读取配置参数都可以使用CONFIG记录
5. Level.FINE ：debug 时记录的 日志消息，记录运行时的状态、传递的参数等等
6. Level.FINER：debug 时记录的 日志消息，记录运行时的状态、传递的参数等等
7. Level.FINEST：debug 时记录的 日志消息，记录运行时的状态、传递的参数等等

其中，还有两个，可以用来开启和关闭日志。

1. Level.ALL：所有记录都开启
2. Level.OFF： 关闭日志记录

其中，FINE、FINER、FINEST都是记录 debug 信息的，三者取其一即可；

JUL 虽然简单，但也有一些缺点。比如，格式化日志信息比较困难，扩展性不够。**因此，我们一般是选择使用第三方日志框架的。**

## 第三方日志框架

日志框架出现的历史顺序为：

1. `log4j`
2. `JUL`
3. `JCL`
4. `SLF4J`
5. `logback`
6. `log4j2`

## Log4j

Log4j 是一个流行的日志框架，它提供了丰富的功能和灵活性，现在最新版就是 Log4j2 了，它是对 Log4j 进行了升级。

> Log4j 官网：[https://logging.apache.org/log4j/2.x/](https://logging.apache.org/log4j/2.x/)
>
> Log4j 下载地址：[https://logging.apache.org/log4j/2.x/download.html](https://logging.apache.org/log4j/2.x/download.html)

### 引入依赖项

以 Maven 构建的项目中引入 Log4j 依赖项：

`pom.xml`：

```xml
<dependencies>
  <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.20.0</version>
  </dependency>
  <dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.20.0</version>
  </dependency>
</dependencies>
```

Log4j 支持多种输出方式，如控制台、文件、数据库等。它还可以根据不同的日志级别将日志信息输出到不同的目的地。

### 配置

### 示例

以下是一个使用 Log4j 的例子：

```java
import org.apache.log4j.Logger;

public class HelloWorld {

    // 依旧是 Logger 对象，不过此处的 Logger 对象不是 JDK 自带的
    private static final Logger LOGGER = Logger.getLogger(HelloWorld.class);

    public static void main(String[] args) {
        LOGGER.debug("debug message");
        LOGGER.info("info message");
        LOGGER.warn("warn message");
        LOGGER.error("error message");
        LOGGER.fatal("fatal message");
    }
}
```

在上面的例子中，我们使用 getLogger 方法获取 Logger 对象，然后使用不同的日志级别记录了一些信息。在程序运行时，日志信息将会输出到控制台。

## Logback

### 引入依赖项

### 配置

Logback 是一个基于 Log4j 的日志框架，它提供了更好的性能和更丰富的功能。与 Log4j 相比，Logback 的配置更加简单，扩展性更好。

### 示例

以下是一个使用 Logback 的例子：

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {

    private static final Logger LOGGER = LoggerFactory.getLogger(HelloWorld.class);

    public static void main(String[] args) {
        LOGGER.debug("debug message");
        LOGGER.info("info message");
        LOGGER.warn("warn message");
        LOGGER.error("error message");
    }
}
```

在上面的例子中，我们使用 getLogger 方法获取 Logger 对象，然后使用不同的日志级别记录了一些信息。在程序运行时，日志信息将会输出到控制台。

## 总结与建议

在 Java 开发中，日志是一个非常重要的问题。本文介绍了 Java 自带的日志框架、Log4j 和 Logback 等常用的日志框架。通过本文的学习，你应该能够了解日志的基本概念和用法，并能够使用这些日志框架记录应用程序的状态和错误信息。

在实际开发中，建议使用 Logback，因为它提供了更好的性能和更丰富的功能。此外，为了提高日志的可读性和可维护性，建议记录有意义的日志信息，并根据不同的日志级别选择合适的输出方式。