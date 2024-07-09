---
# 这是文章的标题
title: 一文快速入门 Apache Shiro
# 这是页面的图标
# icon: 
# 这是侧边栏的顺序
order: 1
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-05-20 09:45:13
# 一个页面可以有多个分类
category:
  - 安全框架
# 一个页面可以有多个标签
tag:
  - Shiro
  - Java
---

> 官网：<https://shiro.apache.org/>

## 什么是 Apache Shiro ？

Apache Shiro 是 Apache 软件基金会下的一个顶级开源项目。

Shiro 是一个应用程序安全框架，它为应用程序开发人员提供了非常干净和简单的方法来支持其应用程序中的四个安全基石：**身份验证（认证）、授权、企业会话管理（Session Manager）和密码学（Cryptography）**。

*   Authentication：认证，就是证明用户的身份，通常称为用户「登录」，能成功登录就是认证成功，反之亦然。
*   Authorization：授权，即访问控制。
*   Cryptography：密码学加密，保护或隐藏数据以防窥探。
*   Session Management：会话管理，每个用户的时间敏感状态（per-user time-sensitive state）

## Apache Shiro 的特点

Apache Shiro 的目标是成为最全面、最容易使用的 Java 安全框架。以下是一些框架的要点：

*   最容易理解的 Java 安全 API：类名称和接口名称是直观的和有意义的。任何东西都是可插入的，但所有东西都存在好默认值的。
*   支持跨一个或多个可插拔数据源（LDAP、JDBC、Active目录等）的身份验证（或者说登录）。
*   基于角色或细粒度的权限执行授权（或者说访问控制），也可以使用可插拔的数据源。
*   提供一流的缓存支持，以提高应用程序的性能。
*   内置的基于 POJO 的企业会话管理。在 Web 和非 Web 环境中都可以使用，或在任何需要单点登录（SSO）或集群或分布式会话的环境中也都可以使用。
*   异构客户端会话访问。我们不再被迫去使用 `HTTP Session` 或有状态会话的对象来共享会话状态（它们通常不必要地将应用程序绑定到特定的环境中）。Flash 小程序、C# 应用程序、Java Web 启动程序和 Web 应用程序等，现在都可以全部共享会话状态，而不管部署环境是怎样的。
*   简单的单点登录（SSO）支持支持上述企业会话管理。如果会话跨多个应用程序进行联合，则用户的身份验证状态也可以被共享。登录到任何应用程序，其他应用程序都识别该登录。
*   使用最简单的加密 API 保护数据，为我们提供超越 Java 默认为密码和散列提供的能力和简单性。
*   一个令人难以置信的健壮且低配置的 Web 框架，它可以保护任何 url 或资源，自动处理登录和注销，执行「记住我」服务，等等。
*   所需的依赖项的数量极低：独立配置只需要 `slf4j-api.jar` 和一个 slf4j 的绑定 .jar。Web 配置还需要 `commons-beanutils-core.jar`。基于特性的依赖关系可以在需要时添加，比如 Ehcache 缓存、基于 Quartz 的会话验证、Spring 依赖关系注入等）

## 为什么使用 Shiro？

*   易上手（**Easy To Use**）：对新手来说友好，能够快速上手使用 Shiro。

*   很全面（**Comprehensive**）：没有任何一个其他的安全框架能像 Apache Shiro 所声称的那样具有广泛的范围，它能提供一站式（one stop shop）的服务。

*   很灵活（**Flexible**）：Apache Shiro 可以在任何应用程序环境中工作。它既可以在 Web、EJB 和 IoC 环境中工作，也可以在其他环境中工作。Shiro 没有强制要求任何规范，甚至也没有许多的依赖关系。

*   支持 Web（**Web Capable**）：Apache Shiro 提供了出色的 Web 应用程序支持，允许我们基于应用程序 URL 和 Web 协议（例如REST）创建灵活的安全策略，同时还提供了一组 JSP 库来控制页面输出。

*   可插拔（**Pluggable**）：Shiro 干净的 API 和设计模式使它很容易与许多其他框架和应用程序集成。我们可以看到 Shiro 与 Spring、Grails、Wicket、Tapestry、Mule、ApacheCamel、Vaadin 等框架无缝集成。

*   有人给 Shiro 提供支持（**Supported**）：Apache Shiro 是 Apache 软件基金会的一部分，该组织被证明以其社区的最大利益为出发点。项目开发和用户团体有友好的公民随时准备提供帮助。

## Shiro 核心概念

Shiro 的体系结构有三个主要概念，分别是 **Subject**、**SecurityManager** 和 **Realms**。

### Subject

如果你之前有接触过或了解过 Shiro，那么对 Subject 肯定有一些疑问的。

我接收到的知识就是：**Subject 代表当前用户**

一脸懵逼，Subject 单词翻译过来是「主题、科目、主语、主体」，在我看来，这三个翻译的中文要和当前用户扯上关系的就只有「主语和主体」了。

> 主谓宾：主语、谓语和宾语

我们看看官网是怎么说的：

> When you’re securing your application, probably the most relevant questions to ask yourself are, “Who is the current user?” or “Is the current user allowed to do X”? It is common for us to ask ourselves these questions as we're writing code or designing user interfaces: applications are usually built based on user stories, and you want functionality represented (and secured) based on a per-user basis. So, the most natural way for us to think about security in our application is based on the current user. Shiro’s API fundamentally represents this way of thinking in its Subject concept.

大概意思就是我们在编写代码或者设计用户接口时，我们经常会问自己一些问题，特别是关于安全的，比如当前用户是谁？允许当前用户做这个操作吗？我们的应用程序是基于用户的，所以，我们在应用程序中考虑安全性的最自然的方式是基于当前用户。Shiro 的 API 基本上代表了其 Subject 概念中的这种思维方式。

因此，Subject 这个词是一个安全术语，基本意思是「当前执行的用户」。

之所以不使用 User，是因为 User 一词通常与人有关。在安全的世界中，Subject 一词可以指人，也可以指第三方进程、守护进程帐户或任何类似的东西。

> A *Subject* is just a security-specific "view" of an application User. We actually wanted to call it 'User' since that "just makes sense", but we decided against it: too many applications have existing APIs that already have their own User classes/frameworks, and we didn’t want to conflict with those. Also, in the security world, the term `Subject` is actually the recognized nomenclature.

所以才用 Subject，不用 User 这个词。

Subject 它的意思只是「当前正在与软件交互的东西」。不过，对于大多数意图和目的，我们可以将其视为 Shiro 的「用户」概念。

我们可以在代码中的任何位置轻松地获取 Shiro Subject：

```java
import org.apache.shiro.subject.Subject;
import org.apache.shiro.SecurityUtils;
...
Subject currentUser = SecurityUtils.getSubject();
```

我们只要拿到了 Subject 对象，那么就可以使用 Shiro 为当前的用户做 90%  的操作了，比如登录（Login）、退出（Logout）、访问他们的 Session，执行授权检查等。

### SecurityManager

在 Subject 幕后对应着的是 SecurityManager。在 Subject 为当前用户进行所有的安全操作的同时，SecurityManager 就在为所有的用户进行安全操作的管理。SecurityManager 是整个 Shiro 架构的核心并且扮演者一个「保护伞」的角色，因为它引用着许多内置的安全组件，这些组件形成一种对象图（Object Graph）。实际上，只要 SecurityManager 和它内部的对象图被配置后，那么我们就可以不用管它了，只需专注于 Subject 的 API 就行。

那么我们如何去配置 SecurityManager 呢？好吧，实际上，这也是取决于我们应用程序的环境，比如说，在一个 Web 应用程序中，通常会配置一个特定的 Shiro Servlet Filter 在 web.xml 文件中来实现 SecurityManager 对象的配置；又比如，在一个独立的应用程序中，就需要通过另一种方式来配置 SecurityManager 了。除此之外，还有着很多种配置的方式可选。

每一个应用程序都只需有一个 SecurityManager 就可以，也就是单例的 SecurityManager 对象。

像 Shiro 中的几乎所有东西一样，默认的 SecurityManager 实现是 POJO，并且可以使用任何与 POJO 兼容的配置机制进行配置——普通 Java 代码、Spring XML、YAML、.properties 和 .ini 文件等。

### Realm

Realm 充当 Shiro 和应用程序安全数据之间的「桥梁」或「连接器」。

也就是说，当应用程序需要与用户帐户等安全相关的数据进行实际交互以执行authentication（身份认证，即登录）和 authorization（授权，即访问控制）时，Shiro 会从为应用程序配置的一个或多个 Realm 中查找其中的许多内容。

从这个意义上说，Realm 本质上是一个特定于安全的 DAO，它封装了数据源的连接细节，并根据需要将相关的数据提供给 Shiro 使用。在我们配置 Shiro 时，就必须至少指定一个 Realm 用于身份认证和授权，即你至少需要一个 Realm（可以指定多个 Realm）。

Shiro 提供开箱即用的 Realms 来连接许多安全的数据源，如 LDAP、关系数据库（JDBC）、文本配置源（如 ini 和 properties 文件）等。如果默认的 Realm 不满足我们的需求，我们可以插入自己的 Realm 实现来表示自定义的数据源。

## 身份认证

身份认证是验证用户身份的过程。

也就是说，当用户使用应用程序进行身份认证时，他们正在证明自己实际上就是他们所说的那个人。这经常被称为「登录」。这通常是一个三步走的过程：

1.  收集用户的标识信息（称为 principals，翻译成中文为「**主体**」，是的，并不是你学过的「原则、校长」的意思）和支持身份证明（称为 credentials，翻译成中文为「**凭据**」）。
2.  向系统提交主体和凭据（principals and credentials）。
3.  如果提交的凭据与系统对该用户身份（主体）的期望相匹配，则认为该用户已通过身份认证。如果它们不匹配，则认为用户未通过身份认证。

每个人都熟悉的这个过程的一个常见示例是用户名/密码组合。比如登录 QQ，你需要输入你的 QQ 账号和 QQ 密码进行认证，就是证明这个账号是我的，QQ 账号就是主体，QQ 密码就是凭据。如果存储在 QQ 服务器中的密码与你指定的密码相匹配，则认为你已通过身份验证，反之亦然。

Shiro 以一种简单直观的方式支持相同的认证流程。正如我们所说的，Shiro 有一个以 Subject 为中心的API，在应用程序运行时想用 Shiro 做的所有事情几乎都是通过与当前执行的 Subject 进行交互来实现的。因此，使用 Subject 登录，只需调用其登录方法，传递一个 AuthenticationToken 对象给登录方法，该对象表示用户提交的主体和凭据（就比如 QQ 账号和 QQ 密码）。

```java
// 1. 获取用户提交的 QQ 账号和 QQ 密码
AuthenticationToken token = new UsernamePasswordToken(qqAcount, qqPassword);

// 2. 获取当前的 Subject
Subject currentUser = SecurityUtils.getSubject();

// 3. 登录操作
currentUser.login(token);
```

可以看到，上面的 Shiro API 很容易反映出通用的工作流程（获取主体和凭据、获取 Subject、进行登录）。后续的其他操作也都将和现在一样通俗易懂。

当调用 Subject 的登录方法时，SecurityManager 将接收 AuthenticationToken，并将其发送到一个或多个配置的 Realm，以允许每个 Realm 根据需要执行身份认证检查。每个 Realm 都有能力根据需要对提交的 AuthenticationToken 做出反应。

现在需要思考的是，如果登录尝试失败，会发生什么？如果用户指定的密码不正确怎么办？这时候，我们就可以通过运行时 Shiro 抛出的 AuthenticationException 做出反应来处理失败的情况，如下示例：

```java
try {
    // 3. 登录操作
    currentUser.login(token);
} catch (IncorrectCredentialsException ice) {
    // 凭据不正确的情况
    ...
} catch (LockedAccountException lae) {
    // 账号被锁定的情况
    ...
}
...
catch (AuthenticationException ae) {
    // 其他情况
    ...
} 
```

上面捕捉的异常我们可以细粒度选择，也可以直接捕捉顶级的 AuthenticationException，视情况而定。

Subject 成功登录后，用户就被视为已通过身份认证了，意味着他们能够使用我们的应用程序了。不过，这仅仅是证明了他们的身份并不意味着他们可以在应用程序中为所欲为。这就涉及到「访问控制」了，或者另一种说法「权限控制」。

我们该如何控制用户的行为？允许用户可以做什么或不允许用户做什么？

在我们决定允许用户可以做的事情被称为授权（authorization）。接下来我们将介绍Shiro如何启用授权。

## 授权

**授权**（authorization）本质上是**访问控制**（access control），控制用户可以在应用程序中访问哪些内容，比如控制用户可以访问某些资源、某些网页等。大多数情况下是通过使用**角色和权限**（roles and permission）等概念来实现访问控制。

在用户的角度来说，通常允许用户根据分配给他们的角色和/或权限来做某事或不做某事。

在应用程序的角度来说，我们的应用程序可以根据对这些角色和权限的检查来判断某个用户是否具能够做某事或不做某事，进而实现控制哪些功能能够使用。

Subject API 可以让我们轻松地进行角色和权限检查。

比如进行**角色检查**：

```java
if (subject.hasRole(“administrator”)) {
    // 显示可进入后台管理的按钮
} else {
    // 隐藏可进入后台管理的按钮
} 
```

权限的检查判断，实际上是授权的另一种体现的方式。毕竟我们上面说的授权是给用户分配角色和权限，现在这里是进行权限的检查，进而判断有没有某种权限。

不过，上面的代码写法是硬编码的，我们直接写死了 `administrator` 这个角色，如果我们想在应用程序运行时去新增或删除角色，这是做不到的，想实现这种在运行时能够新增或删除角色，那么需要依赖其他的东西。那么依赖什么东西呢？答案就是依赖权限。

Shiro 支持**权限**（permission）的概念。「进入大会员页面、创建一个自荐专栏、进入高手频道」等，这些都是一种功能，当将这些功能出现「哪种情况下允许或不允许」时，就是权限来反应的了。

进行**权限检查**：

```java
if (subject.isPermitted(“back:enter”)) {
    // 显示可进入后台管理的按钮
} else {
    // 隐藏可进入后台管理的按钮
} 
```

这样，任何被分配了 `back:enter` 权限的角色或用户都可以单击「后台管理」按钮，这些角色和权限的分配甚至可以在运行时更改，为您提供了一个非常灵活的安全模型。

字符串 `back:enter` 是遵守某些解析约定的权限字符串。Shiro 通过它的WildcardPermission 来支持这种开箱即用的约定。这种约定在创建安全策略上是非常灵活的，并且支持实例级别（instance-level）的访问控制。

进行**实例级别**的权限检查：

```java
if (subject.isPermitted(“user:delete:god23bin”)) {
    // 删除 ‘god23bin’ 这个用户
} else {
    // 不删除 ‘god23bin’
}
```

这个例子说明，如果你需要，你就可以控制对单个资源的访问，甚至可以控制到非常细粒度的实例级别。如果你愿意，你甚至可以发明自己的权限语法。

与身份认证一样，上述调用最终会到达 SecurityManager，SecurityManager 将咨询一个或多个 Realm 以做出访问控制决策。这允许 Realm 根据需要同时响应身份认证和授权的操作。

这是 Shiro 授权能力的简要概述。

## 会话管理

Apache Shiro 提供了安全框架世界中独一无二的东西：可用于任意的应用（从小型守护程序独立应用程序到最大的集群web应用程序）程序和任意的架构层的一致会话 API（consistent Session API）。也就是说，Shiro 为任意的应用程序开启了会话编程范式。这意味着，如果不需要 Servlet 或 EJB 容器，那么希望使用会话的应用程序开发人员将不再被迫使用它们。或者，如果使用这些容器，开发人员现在可以选择在任何层中使用统一一致的 Session API，而不是特定于 Servlet 或 EJB 的机制。

但 Shiro 会话最重要的好处之一可能是它们独立于容器。这具有微妙但极其强大的含义。例如，让我们考虑会话集群。有多少种特定于容器的方法可以对会话进行集群以实现容错和故障切换？Tomcat 的做法与 Jetty 不同，Jetty 的做法与 Websphere 等不同。但使用 Shiro 会话，您可以获得一个独立于容器的集群解决方案。Shiro 的体系结构允许可插拔会话数据存储，如企业缓存、关系数据库、NoSQL 系统等。这意味着您可以配置一次会话集群，无论您的部署环境是 Tomcat、Jetty、JEE Server 还是独立应用程序，它都将以相同的方式工作。没有必要根据应用程序的部署方式重新配置应用程序。

Shiro 会话的另一个好处是，如果需要，可以在客户端技术之间共享会话数据。例如，如果需要，Swing 桌面客户端可以参与同一个 web 应用程序会话——如果最终用户同时使用这两个会话，则会很有用。那么，如何在任何环境中访问受试者的会话呢？有两种 Subject 方法，如下例所示。

获取 Subject 的 Session：

```java
Session session = subject.getSession();
Session session = subject.getSession(boolean create);
```

如您所见，这些方法在概念上与 HttpServletRequest API 相同。第一个方法将返回Subject的现有会话，或者如果还没有，它将创建一个新会话并返回它。第二个方法接受一个布尔参数，该参数确定如果还不存在，是否会创建新会话。一旦您获得了Subject的Session，您就可以将其几乎等同于 HttpSession 来使用。Shiro 团队认为 HttpSession API 对 Java 开发人员来说最舒服，所以我们保留了它的大部分感觉。当然，最大的区别在于，您可以在任何应用程序中使用 Shiro 会话，而不仅仅是 Web 应用程序。清单11显示了这种熟悉程度。

```java
Session session = subject.getSession();
session.getAttribute(“key”, someValue);
Date start = session.getStartTimestamp();
Date timestamp = session.getLastAccessTime();
session.setTimeout(millis);
```

## 密码学加密

加密是隐藏或混淆数据的过程，因此窥探者无法理解。Shiro在加密方面的目标是简化JDK的加密支持并使其可用。

需要注意的是，加密技术一般并不特定于主题，因此Shiro的API中有一个领域不是特定于主题的。您可以在任何地方使用Shiro的加密支持，即使没有使用Subject。Shiro真正关注加密支持的两个领域是加密哈希（又称消息摘要）和加密密码。让我们更详细地看一下这两个。

### 哈希技术

如果您使用过 JDK 的 MessageDigest 类，您很快就会意识到使用它有点麻烦。它有一个笨拙的基于工厂的静态方法 API，而不是面向对象的方法，您被迫捕获可能永远不需要捕获的检查异常。如果您需要对消息摘要输出进行十六进制编码或 Base64 编码，您就可以自己操作了——JDK 不支持这两种方法。Shiro用一个干净直观的 Hash API解决了这些问题。

例如，让我们考虑一个相对常见的情况，即MD5对文件进行哈希并确定该哈希的十六进制值。这被称为“校验和”，在提供文件下载时经常使用——用户可以对下载的文件执行自己的MD5哈希，并断言他们的校验和与下载网站上的校验和匹配。如果它们匹配，用户可以充分假设文件在传输过程中没有被篡改。

没有 Shiro ，你可能这样加密：

1.  将文件转换为字节数组。JDK中没有任何帮助，因此您需要创建一个助手方法来打开FileInputStream，使用字节缓冲区，并抛出适当的IOExceptions等。

2.  使用MessageDigest类对字节数组进行散列，处理适当的异常：

```java
try {
    MessageDigest md = MessageDigest.getInstance("MD5");
    md.digest(bytes);
    byte[] hashed = md.digest();
} catch (NoSuchAlgorithmException e) {
    e.printStackTrace();
} 
```

3.  将散列字节数组编码为十六进制字符。JDK中也没有任何帮助，因此您需要创建另一个辅助方法，并可能在实现中使用逐位操作和移位。

对于如此简单和相对常见的事情来说，这是一项相当大的工作量。下面是如何对Shiro做同样的事情。

```java
String hex = new Md5Hash(myFile).toHex(); 
```

当你使用Shiro来简化所有的工作时，它会非常简单，也更容易理解发生了什么。SHA-512散列和密码的Base64编码同样简单。

```java
String encodedPassword = new Sha512Hash(password, salt, count).toBase64();
```

### Ciphers

密码是可以使用密钥可逆地转换数据的密码算法。我们使用它们来保护数据的安全，尤其是在传输或存储数据时，数据特别容易被窥探。

如果您曾经使用过 JDK Cryptography API，特别是 javax.crypto.Cipher 类，您就会知道它可能是一个极其复杂的野兽。对于初学者来说，每个可能的密码配置总是由javax.crypto.Cipher 的一个实例表示。需要进行公钥/私钥加密吗？你使用密码。需要使用块密码进行流操作吗？你使用密码。需要创建一个AES 256位密码来保护数据安全吗？你使用 Cipher 。你就明白了。

如何创建所需的 Cipher 实例？您创建了一个复杂的、非直观的令牌分隔的密码选项字符串，称为“转换字符串”，并将此字符串传递给cipher.getInstance静态工厂方法。使用这种密码选项字符串方法，没有类型安全性来确保您使用的是有效的选项。这也意味着没有JavaDoc可以帮助您理解相关选项。而且，即使您知道配置是正确的，也需要进一步处理已检查的异常，以防您的String公式不正确。正如您所看到的，使用JDK密码是一项相当繁琐的任务。这些技术在很久以前曾经是Java API的标准，但时代已经改变了，我们想要一种更简单的方法。

Shiro试图通过引入其密码服务API来简化密码的整个概念。密码服务是大多数开发人员在保护数据时所需要的：一个简单、无状态、线程安全的API，可以在一次方法调用中对数据进行整体加密或解密。您所需要做的就是提供您的密钥，并且您可以根据需要进行加密或解密。例如，可以使用256位AES加密，如下面的清单13所示。

```java
AesCipherService cipherService = new AesCipherService();
cipherService.setKeySize(256);
//create a test key:
byte[] testKey = cipherService.generateNewKey();

//encrypt a file’s bytes:
byte[] encrypted = cipherService.encrypt(fileBytes, testKey);
```

与JDK的密码API相比，Shiro示例更简单：

1.  您可以直接实例化CipherService——没有奇怪或令人困惑的工厂方法。

2.  密码配置选项表示为JavaBeans兼容的getter和setter——没有奇怪且难以理解的“转换字符串”。

3.  加密和解密在单个方法调用中执行。

4.  没有强制检查的异常。如果您愿意，请捕获Shiro的CryptoException。

Shiro的CipherService API还有其他优点，例如支持基于字节数组的加密/解密（称为“块”操作）以及基于流的加密/解码（例如，加密音频或视频）。

Java加密不需要痛苦。Shiro的加密技术支持旨在简化您保护数据安全的工作。

## 在 Web 应用中使用 Shiro

只需在 `web.xml` 中定义一个 ShiroServlet 过滤器，就可以实现 Web 应用程序的安全保障。

```xml
<filter>
    <filter-name>ShiroFilter</filter-name>
    <filter-class>
        org.apache.shiro.web.servlet.IniShiroFilter
    </filter-class>
    <!-- no init-param means load the INI config
        from classpath:shiro.ini --> 
</filter>

<filter-mapping>
     <filter-name>ShiroFilter</filter-name>
     <url-pattern>/*</url-pattern>
</filter-mapping>
```

这个过滤器可以读取前面提到的 shiro.ini 配置，因此无论部署环境如何，我们都可以获得一致的配置体验。

一旦配置 `/*`，那么此处的 Shiro 过滤器将过滤每个请求，并确保在请求期间可以访问特定于请求的 Subject。因为它过滤每个请求，所以可以执行特定于安全性的逻辑，以确保只允许满足特定条件的请求通过。

### 特定的 URL 过滤器链

通过使用 URL 过滤器链接功能，Shiro 能够支持特定于安全的过滤器规则。它允许我们为任何匹配的URL模式指定特定的过滤器链。这意味着我们可以使用 Shiro 的过滤机制来执行安全规则（或规则组合），这比单独在web.xml 中定义过滤器要灵活得多。

特定的 URL 过滤器链的配置：

```ini
[urls]
/assets/** = anon
/user/signup = anon
/user/** = user
/rpc/rest/** = perms[rpc:invoke], authc
/** = authc
```

如上面配置所示，有一个\[urls] INI 部分可用于 web 应用程序。对于每一行，等号左侧的值表示与上下文相关的 web 应用程序路径。右边的值定义了一个 Filter 链——一个有序的、逗号分隔的 Servlet 过滤器列表，用于为给定的路径执行。每个过滤器都是一个普通的 Servlet 过滤器，但你在上面看到的过滤器名称（anon、user、perms、authc）是 Shiro 提供的开箱即用的特殊安全相关过滤器。我们可以混合和匹配这些安全过滤器，以创建非常自定义的安全体验。还可以指定我们可能拥有的任何其他现有 Servlet 过滤器。

与使用 web.xml（定义一个过滤器块，然后定义一个单独的断开连接的过滤器模式块）相比，这有多好？使用 Shiro 的方法，可以更容易地看到为给定匹配路径执行的过滤器链。如果你愿意，你可以在 web.xml 中只定义Shiro 过滤器，并在 Shiro.ini 中定义所有其他过滤器和过滤器链，以获得比 web.xml 更简洁、更易于理解的过滤器链定义机制。即使你没有使用 Shiro 的任何安全功能，仅凭这一点便利就可以让 Shiro 值得使用。

### Web Session 管理

#### 默认Http会话

对于 web 应用程序，Shiro 默认其会话基础设施使用我们都习惯的现有 Servlet Container 会话。也就是说，当我们调用方法 subject.getSession（）和 subject.gtSession（boolean）时，Shiro 将返回 Servlet Container 的HttpSession 实例支持的 session 实例。这种方法的美妙之处在于，调用 subject.getSession（）的业务层代码与 ShiroSession 实例交互——它不知道自己正在使用基于 web 的 HttpSession 对象。当在体系结构层之间保持干净的分离时，这是一件非常好的事情。

#### Shiro在Web层中的本地会话

如果您在 web 应用程序中启用了 Shiro 的本机会话管理，因为您需要 Shiro 的企业会话功能（如容器独立集群），那么您当然希望 HttpServletRequest.getSession（）和HttpSession API 与“本机”会话一起工作，而不是与servlet 容器会话一起工作。如果您必须重构任何使用 HttpServletRequest 和 HttpSession API 的代码来代替 Shiro 的 Session API，那将非常令人沮丧。Shiro 当然不会指望你会这么做。相反，Shiro 完全实现了 Servlet 规范的 Session 部分，以支持 web 应用程序中的本机会话。这意味着每当您调用相应的 HttpServletRequest 或 HttpSession 方法调用时，Shiro 都会将这些调用委托给其内部本机会话 API。最终的结果是，即使您使用的是 Shiro的“本地”企业会话管理，您也不必更改 web 代码——这确实是一个非常方便（也是必要的）的功能。

## 十分钟初体验 Shiro

> 从最简单的命令行应用程序到最庞大的企业 Web 和集群应用程序，Shiro 都可以在这些程序上跑起来。

我们将在一个简单的 main 方法中使用最简单的示例，这样帮助我们了解API。

### 获取当前正在执行的用户

```java
Subject currentUser = SecurityUtils.getSubject();
```

这里的 Subject 是跟用户数据有关联的，那么拿到 Subject 对象后，我们能做什么？

### 获取 Session

```java
Session session = currentUser.getSession();
session.setAttribute( "someKey", "aValue" );
```

当然，需要注意这里的 Session 可以是 HttpSession，也可以不是。

现在有了 Subject 和 Session，那么安全的事呢？检查是否允许做某事，检查角色和权限？

```java
if ( !currentUser.isAuthenticated() ) {
    //collect user principals and credentials in a gui specific manner
    //such as username/password html form, X509 certificate, OpenID, etc.
    //We'll use the username/password example here since it is the most common.
    //(do you know what movie this is from? ;)
    UsernamePasswordToken token = new UsernamePasswordToken("lonestarr", "vespa");
    //this is all you have to do to support 'remember me' (no config - built in!):
    token.setRememberMe(true);
    currentUser.login(token);
}
```

上面的写法是最简的了，没有比这更简的写法了。

但是如果他们的登录尝试失败了呢？您可以捕捉各种特定的异常，告诉您确切地发生了什么，并允许您处理并做出相应的反应和反应：

```java
try {
    currentUser.login( token );
    //if no exception, that's it, we're done!
} catch ( UnknownAccountException uae ) {
    //username wasn't in the system, show them an error message?
} catch ( IncorrectCredentialsException ice ) {
    //password didn't match, try again?
} catch ( LockedAccountException lae ) {
    //account for that username is locked - can't login.  Show them a message?
}
    ... more types exceptions to check if you want ...
} catch ( AuthenticationException ae ) {
    //unexpected condition - error?
}
```

好了，所以到现在为止，我们已经有了一个登录的用户。我们还能做些什么呢？ 假设他们是谁：

```java
//print their identifying principal (in this case, a username):
log.info( "User [" + currentUser.getPrincipal() + "] logged in successfully." );
```

我们还可以判断他们是否有特定的角色：

```java
if ( currentUser.hasRole( "schwartz" ) ) {
    log.info("May the Schwartz be with you!" );
} else {
    log.info( "Hello, mere mortal." );
}
```

我们还可以看看他们是否有权对某种类型的实体采取行动：

```java
if ( currentUser.isPermitted( "lightsaber:wield" ) ) {
    log.info("You may use a lightsaber ring.  Use it wisely.");
} else {
    log.info("Sorry, lightsaber rings are for schwartz masters only.");
}
```

此外，我们还可以执行一个非常强大的实例级权限检查——能够查看用户是否有能力访问一种类型的特定实例：

```java
if ( currentUser.isPermitted( "winnebago:drive:eagle5" ) ) {
    log.info("You are permitted to 'drive' the 'winnebago' with license plate (id) 'eagle5'.  " +
                "Here are the keys - have fun!");
} else {
    log.info("Sorry, you aren't allowed to drive the 'eagle5' winnebago!");
}
```

最后，当用户使用该应用程序完成操作时，他们可以注销：

```java
currentUser.logout(); //removes all identifying information and invalidates their session too.
```

但你可能会问自己，“但是谁负责在登录期间获取用户数据（用户名和密码、角色和权限等），以及谁在运行时执行这些安全检查？”好吧，通过实现Shiro所谓的\[Realm]（realm.html“领域”），并将该领域插入Shiro的配置中

这种类型的配置超出了这个快速入门的范围，因为它的目标是让您熟悉API和Shiro的概念。 当您准备提供更详细的细节时，您肯定需要阅读身份验证指南和授权指南。然后可以转到其他文档，特别是参考手册，以回答任何其他问题。

### 下载 Shiro

戳我：<https://shiro.apache.org/download.html>

## 总结

术语：

**Subject**：应用程序用户的安全特定用户“视图”。它可以是人、第三方进程、连接到应用程序的服务器，甚至是cron作业。基本上，它是与您的应用程序通信的任何东西或任何人。

**Principals**：一个识别 Subject 的属性。可以是名字、姓、社会安全号、用户名

**Credentials**：用于验证身份的秘密数据。密码，生物识别数据，x509证书

**Realms**：安全特定的DAO，数据访问对象，与后端数据源对话的软件组件。如果您在LDAP中有用户名和密码，那么您将有一个与LDAP通信的LDAP领域。其想法是，您将使用每个后端数据源的一个领域，而Shiro将知道如何与这些领域一起协调来完成您必须做的事情。

参考：

<https://shiro.apache.org/>

<https://www.infoq.com/articles/apache-shiro/>

<https://shiro.apache.org/10-minute-tutorial.html>

<https://shiro.apache.org/java-authentication-guide.html>