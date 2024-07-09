---
# 这是文章的标题
title: Java 中的日期时间总结
# 这是页面的图标
icon: mug-hot
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

## 前言

大家好，我是 god23bin，在日常开发中，我们经常需要处理日期和时间，日期和时间可以说是一定会用到的，现在总结下 Java 中日期与时间的基本概念与一些常用的用法。

## 基本概念

1. **日期**（年月日，某一天）：`2023-01-05`

2. **时间**（时分秒，可具体到某一天某一刻）：`18:00:00`、`2023-01-05 18:00:00`

3. **本地时间**：平常我们说的，比如现在说明天早上七点钟，这里说的时间就是本地时间，在咱们中国，指的就是北京时间。但是在明天早上七点钟，对于其他国家的人来说，他们的本地时间就不一样了。

4. **时区**：由于世界各个国家与地区经度不同，本地时间也有所不同，所以划分了不同的时区，目前划分的是24个时区，咱们就位于东八区。目前需要了解的时区的表达方式知道两种就可以了。
   - 以 `GMT` 或者 `UTC` 加时区偏移量表示，例如：`GMT+08:00` 或者 `UTC+08:00` 表示东八区
   - 以 `洲/城市` 表示，例如，`Asia/Shanghai`，表示上海所在地的时区。不过这里的城市名称不是任意的城市，而是由国际标准组织规定的城市。

## Java 8 之前日期时间相关的类

在 Java 8 之前，主要使用的日期和时间 API 包括：

1. `java.util.Date`
2. `java.util.Calendar`
3. `java.text.SimpleDateFormat`

### 1. Date

`Date` 是 Java 中表示日期和时间的类，一般用于获取当前的日期和时间，比如更新数据库中记录的时候，需要更新某个日期时间，那么就直接 `new Date()`，这样实例化的 Date 对象就是当前的这一时刻。

```java
Date date = new Date();
// 可以打印当前日期时间
System.out.println(date.toString()); // 控制台输出 Thu Jan 05 18:41:11 CST 2023
```

### 2. SimpleDateFormat

`SimpleDateFormat` 是 Java 中用于**格式化日期和时间**的类，此处所谓格式化，就是字面意思，统一格式，即它允许你将日期和时间按照指定的格式转换成字符串，也可以将对应格式的字符串解析成日期和时间对象。

主要用法就是：

1. 格式化日期和时间
2. 解析字符串格式的日期和时间

#### format 方法-格式化日期时间，从 Date 到 String

**使用 `public final String format(Date date)` 方法格式化日期时间**。上面输出的格式，不是我们想要的，所以需要进行日期时间的格式化。

最常用的一个格式化的模型是：`yyyy-MM-dd HH:mm:ss`

其中，`yyyy`  是年份，`MM` 是月份，`dd` 是天数，后面同理，`HH:mm:ss` 是时、分、秒。

```java
// 常用的格式化
String pattern1 = "yyyy-MM-dd HH:mm:ss";
SimpleDateFormat sdf1 = new SimpleDateFormat(pattern1);
System.out.println(sdf1.format(date3)); // 输出 2023-01-05 18:19:50

String pattern2 = "yyyy年MM月dd日 HH时mm分ss秒";
SimpleDateFormat sdf2 = new SimpleDateFormat(pattern2);
System.out.println(sdf2.format(date3)); // 输出 2023年01月05日 18时19分50秒
```

#### parse 方法-字符串日期时间解析，从 String 到 Date

**使用 `public Date parse(String source)` 方法将 String 转成 Date**

```java
String input = "2023-01-01 00:00:01";
String pattern1 = "yyyy-MM-dd HH:mm:ss";
SimpleDateFormat sdf3 = new SimpleDateFormat(pattern1);
try {
    // 将 String 类型的日期解析成 Date 类型的日期
    Date parsed = sdf3.parse(input);
    System.out.println(parsed);
} catch (ParseException e) {
    e.printStackTrace();
}
```

### 3. Calendar

`Calendar` 是 Java 中用于处理日期和时间的抽象基类。它提供了一个类似于日历的机制，允许我们进行日期和时间的计算、格式化和解析。

简而言之，这个类主要用于日期的计算，比如你想得到此刻前一天的日期。

`Calendar` 是一个抽象类，不能直接实例化。所以我们需要使用 `getInstance()` 方法获取 `Calendar` 的实例：

```java
Calendar calendar = Calendar.getInstance();
```

当我们有一个 `Calendar` 对象后，就可以表示日期和时间了，通过设置各个字段，如年、月、日、时、分、秒等来表示一个具体的日期和时间。

```java
calendar.set(Calendar.YEAR, 2023);          // 设置年份为2023
calendar.set(Calendar.MONTH, Calendar.MAY); // 设置月份为5（从0开始，5表示六月）
calendar.set(Calendar.DAY_OF_MONTH, 16);    // 设置日期为16号
```

#### 日期和时间的计算

`Calendar`允许你进行日期和时间的加减操作，例如：

```java
calendar.add(Calendar.DAY_OF_MONTH, 7); // 增加7天
```

这将在当前日期的基础上增加 7 天。

下表列出了 Java 中 Calendar 类常用的方法及其描述：

| 方法                           | 描述                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| `get(int field)`               | 返回给定字段的值。例如，`calendar.get(Calendar.MONTH)` 返回月份。 |
| `set(int field, int value)`    | 设置给定字段的值。例如，`calendar.set(Calendar.YEAR, 2023)` 设置年份为2023。 |
| `add(int field, int amount)`   | 增加或减少给定字段的值。例如，`calendar.add(Calendar.DAY_OF_MONTH, 1)` 将日期增加一天。 |
| `getTime()`                    | 返回表示此Calendar时间点的Date对象。                         |
| `setTime(Date date)`           | 使用指定的Date对象设置此Calendar的时间点。                   |
| `getTimeInMillis()`            | 返回以毫秒为单位表示此Calendar时间点的时间值。               |
| `setTimeInMillis(long millis)` | 使用指定的时间值设置此Calendar的时间点。                     |
| `getTimeZone()`                | 返回此Calendar使用的时区。                                   |
| `setTimeZone(TimeZone zone)`   | 设置此Calendar的时区。                                       |
| `isLenient()`                  | 返回Calendar是否宽松，即是否允许非法日期。                   |
| `setLenient(boolean lenient)`  | 设置Calendar是否宽松。                                       |
| `getActualMaximum(int field)`  | 返回给定字段的最大允许值。例如，`calendar.getActualMaximum(Calendar.DAY_OF_MONTH)` 返回当前月份的最大天数。 |

## Java 8 引入的新的日期时间相关的类

当 Java 8 引入 `java.time` 包时，它引入了一些新的日期和时间 API，这些 API 旨在提供更强大、更易于使用、线程安全且具有本地化支持的日期和时间处理方式。

以下是这些 API 的概述：

1. `LocalDate`：表示**日期**，但不包含时间和时区信息。它提供了各种方法来处理日期，如创建、解析、格式化、计算日期差等。
2. `LocalTime`：表示**时间**，但不包含日期和时区信息。它用于处理时间，包括小时、分钟、秒和毫秒。
3. `LocalDateTime`：它是 `LocalDate` 和 `LocalTime` 的组合，表示**日期和时间**，但仍不包含时区信息。它是处理日期和时间的主要类之一。
4. `ZonedDateTime`：表示带有**时区**信息的**日期和时间**。它是 `LocalDateTime` 的扩展，可以处理时区的转换和计算。
5. `Duration`：表示**时间段的持续时间**，以秒和纳秒为单位。它用于测量两个时间点之间的时间差。
6. `Period`：表示日期之间的时间段，以年、月和日为单位。它用于测量两个日期之间的时间差。
7. `DateTimeFormatter`：主要用于将日期和时间**格式化为字符串**，或将字符串**解析为日期和时间**。它提供了各种预定义的格式化方式，并支持自定义格式。

### 1. LocalDate

直接通过调用其相关静态方法就可以进行相关的日期处理：

```java
LocalDate now = LocalDate.now(); 	          // 获取当前日期
LocalDate date = LocalDate.of(2023, 5, 15); // 创建指定日期
LocalDate parsedDate = LocalDate.parse("2023-05-15"); // 解析日期
int year = date.getYear(); 	// 获取年份
int month = date.getMonthValue(); // 获取月份
int day = date.getDayOfMonth(); 	// 获取日期
```

### 2. LocalTime

同理，也是类似的，对时间进行处理：

```java
LocalTime time = LocalTime.now(); 		  // 获取当前时间
LocalTime specificTime = LocalTime.of(14, 30, 0);   // 创建指定时间
LocalTime parsedTime = LocalTime.parse("14:30:00"); // 解析时间
int hour = time.getHour(); 	// 获取小时
int minute = time.getMinute(); 	// 获取分钟
int second = time.getSecond(); 	// 获取秒
```

### 3. LocalDateTime

处理日期和时间：

```java
LocalDateTime dateTime = LocalDateTime.now(); // 获取当前日期和时间
LocalDateTime specificDateTime = LocalDateTime.of(2023, 5, 15, 14, 30); // 创建指定日期和时间
LocalDateTime parsedDateTime = LocalDateTime.parse("2023-05-15T14:30:00"); // 解析日期和时间，字母'T'用于分隔日期部分和时间部分。它的作用是明确表示日期和时间的分界线。
```

### 4. ZonedDateTime

处理带有时区的日期和时间，我们可以使用 `ZoneId.of("时区标识")` 来获取相应的时区对象：

```java
ZoneId zone = ZoneId.of("America/New_York"); 		// 创建时区
ZonedDateTime zonedDateTime = ZonedDateTime.now(zone); 	// 获取带有时区的当前日期和时间
```

带有时区信息的日期时间通常采用以下的格式：

```console
2023-09-08T11:30:00+08:00[Asia/Shanghai]
```

这个例子表示的是 `2023年9月8日11点30分`，位于`亚洲/上海`时区，时区偏移量为`+08:00`，也就是东八区。在这种表示中，日期时间后面跟着时区信息，方括号内的部分为时区标识。

下面是一些常见的时区标识及其对应的时区：

| 时区标识              | 时区             |
| --------------------- | ---------------- |
| `Asia/Shanghai`       | 中国上海时区     |
| `America/New_York`    | 美国纽约时区     |
| `Europe/London`       | 英国伦敦时区     |
| `America/Los_Angeles` | 美国洛杉矶时区   |
| `Asia/Tokyo`          | 日本东京时区     |
| `Europe/Paris`        | 法国巴黎时区     |
| `Australia/Sydney`    | 澳大利亚悉尼时区 |
| `Africa/Cairo`        | 埃及开罗时区     |
| `Pacific/Honolulu`    | 美国檀香山时区   |
| `Asia/Dubai`          | 阿拉伯迪拜时区   |

### 5. Duration

测量时间段的持续时间：

```java
LocalDateTime start = LocalDateTime.of(2023, 9, 8, 11, 0);
LocalDateTime end = LocalDateTime.of(2023, 9, 8, 11, 30);
Duration duration = Duration.between(start, end); 	// 计算两个时间点之间的时间差
long minutes = duration.toMinutes(); 			// 获取分钟数
```

### 6. Period

测量日期之间的时间段：

```java
LocalDate startDate = LocalDate.of(2023, 9, 1);
LocalDate endDate = LocalDate.of(2023, 9, 8);
Period period = Period.between(startDate, endDate); // 计算两个日期之间的时间差
int days = period.getDays(); 			  // 获取天数
```

### 7. DateTimeFormatter

格式化日期和时间：

```java
LocalDateTime dateTime = LocalDateTime.now();
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formattedDateTime = dateTime.format(formatter); // 格式化为字符串
LocalDateTime parsedDateTime = LocalDateTime.parse("2023-05-15 14:30:00", formatter); // 解析字符串为日期和时间
```

### 新日期时间 API 中常用的方法

以下是 Java 8 中新日期时间 API 中常用的方法，用于处理日期和时间的创建、获取字段值、计算差异、格式化和解析等：

| 方法                                                         | 描述                           |
| ------------------------------------------------------------ | ------------------------------ |
| `LocalDate.now()`                                            | 获取当前日期。                 |
| `LocalTime.now()`                                            | 获取当前时间。                 |
| `LocalDateTime.now()`                                        | 获取当前日期和时间。           |
| `LocalDate.of(int year, int month, int day)`                 | 创建指定日期。                 |
| `LocalTime.of(int hour, int minute)`                         | 创建指定时间。                 |
| `LocalDateTime.of(int year, int month, int day, int hour, int minute)` | 创建指定日期和时间。           |
| `LocalDate.parse(CharSequence text)`                         | 解析日期字符串。               |
| `LocalTime.parse(CharSequence text)`                         | 解析时间字符串。               |
| `LocalDateTime.parse(CharSequence text)`                     | 解析日期时间字符串。           |
| `LocalDate.getYear()`                                        | 获取年份。                     |
| `LocalDate.getMonthValue()`                                  | 获取月份。                     |
| `LocalDate.getDayOfMonth()`                                  | 获取日期。                     |
| `LocalTime.getHour()`                                        | 获取小时。                     |
| `LocalTime.getMinute()`                                      | 获取分钟。                     |
| `LocalTime.getSecond()`                                      | 获取秒。                       |
| `LocalDateTime.plus(Duration amount)`                        | 增加持续时间。                 |
| `LocalDateTime.minus(Duration amount)`                       | 减少持续时间。                 |
| `Duration.between(Temporal startInclusive, Temporal endExclusive)` | 计算两个时间点之间的时间差。   |
| `Period.between(LocalDate startDateInclusive, LocalDate endDateExclusive)` | 计算两个日期之间的时间差。     |
| `DateTimeFormatter.ofPattern(String pattern)`                | 创建日期时间格式化器。         |
| `Temporal.format(DateTimeFormatter formatter)`               | 格式化为字符串。               |
| `TemporalAccessor.parse(CharSequence text, DateTimeFormatter formatter)` | 解析字符串为日期或时间。       |
| `ZoneId.of(String zoneId)`                                   | 创建时区。                     |
| `ZonedDateTime.now(ZoneId zone)`                             | 获取带有时区的当前日期和时间。 |


## 开发中的用到的两个注解

一般前端传递**日期时间字符串**，我们后端进行接收，就需要将日期时间字符串转成我们需要的 **Date 类型的日期时间**，即 **String 到 Date 的转化**

当我们从数据库中查出日期时间，是 **Date 类型的日期时间**，返回给前端就提供 JSON 数据，就需要讲 Date 类型的日期时间转成 **字符串类型的日期时间**，即 **Date 到 String 的转化**

有两个注解可以解决这两件事：**Spring 提供的 `@DateTimeFormat` 和 Jackson 提供的 `@JsonFormat`**

Jackson 相关依赖：

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.13.4</version>
</dependency>

<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-annotations -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.13.4</version>
</dependency>

<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.13.4.2</version>
</dependency>
```

说明：

- `@DateTimeFormat` ：**将 String 转成 Date**，主要用于处理前端传递的 String 类型的日期时间转成 Java 中的 Date 类型的日期时间对象
- `@JsonFormat`：**将 Date 转成 String**，主要用于处理后端从数据库中查出的 Date 类型的日期时间，它可以用于标记 Java 类的属性，以指定日期在 JSON 中的格式。

日常用在各种域对象的日期属性上，比如 DTO、VO、PO。

```java
public class A {

    @JsonFormat(pattern = "yyyy年MM月", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy年MM月")
    private Date startTime;

    @JsonFormat(pattern = "yyyy年MM月", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy年MM月")
    private Date endTime;
    
}

public class B {

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startTime;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endTime;
    
}
```

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**