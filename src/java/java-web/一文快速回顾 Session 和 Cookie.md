---
# 这是文章的标题
title: 一文快速回顾 Session 和 Cookie
# 这是页面的图标
icon: cookie
# 这是侧边栏的顺序
order: 2
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-03-09 13:14:13
# 一个页面可以有多个分类
category:
  - Java
# 一个页面可以有多个标签
tag:
  - Java Web
  - Session
  - Cookie
---

## 前言

在 Web 应用程序中（通俗点，可以理解成一个网站），Session 和 Cookie 是两个非常重要的概念，主要用于实现用户身份认证、数据传递等功能。今天就来讲讲这两个东西。

对于当时刚开始接触到这两个概念的我来说，这两个东西是非常模糊的，当然，这样也和我自己 Java 基础不牢固有关，导致在学习 Java Web 的过程中，埋下了许多地雷。现如今，从新梳理下，希望能给屏幕前的你带来收获。

本篇文章目标人群是学了后忘了的，学了后想要巩固的。当然，还没学，那就更好啦，直接看这一篇就够了！（大神请绕道）

## Session 的概念

Session 是 Web 应用程序中的一种会话管理机制，用于存储和维护用户的会话状态。

**那问题来了，什么是「会话」？**

> 会话是指在用户与服务器之间的一系列请求和响应之间的交互过程。

当用户访问 Web 应用时，服务器会创建一个唯一的会话 ID，并将其存储在用户的浏览器中的 Cookie 中。在接下来的请求中，浏览器会将会话 ID 作为参数发送给服务器，以便服务器可以识别用户并将其请求与之前的请求相关联。

## 为什么会有 Session？

由于 **HTTP 协议是无状态的**，当用户在网站中进行多次请求，服务器并不能判断这些请求是不是来自同一用户，所以出现了一种技术，这种技术称为「**会话跟踪技术**」。

会话跟踪技术就能解决这个问题。与无状态的通信相比，会话是一种有状态的通信，这种通信至少需要一方来维护当前的状态信息和历史信息。

而 **Session 就是其中一种会话跟踪技术**，当然，后面说的 Cookie 也是。

，并将 Session ID 存储在 Cookie 中或者 URL 参数中。

## Session 的原理

Session 的原理是基于服务器端的存储和管理，因此相对来说比较安全。在用户访问 Web 应用程序时，服务器会为每个用户创建一个唯一的 Session ID，服务器会将 Session ID 和对应的会话状态存储在内存或者数据库中，同时也返回一份 Session ID 给浏览器，让浏览器存储在 Cookie 中，并在一定时间内保持有效。当用户进行后续的请求时，服务器会根据 Session ID 来识别用户，并获取和维护用户的会话状态。最后，当用户关闭浏览器或者超过一定时间没有活动时，服务器会自动销毁对应的 Session。

Session 的优点是安全性相对较高，存储容量可以存储任意数据类型，并且可以设置失效时间。但是它也存在一些缺点：

- 存储在服务器端，需要占用服务器资源（比如内存资源）
- 失效时间短，一般只有数分钟或数小时
- 难以跨域共享，不同域名的服务器无法共享 Session

## 代码如何写？

**那服务器这边是怎样去存储和管理的呢？代码是怎样写的呢？**

在 Java Web 中，可以使用 Servlet API 中封装好的 Session 对象（HttpSession）来进行操作。

在Servlet API中，HttpSession 由 Servlet容器（比如 Tomcat）创建，它可以存储任意的 Java 对象，我们可以通过  `setAttribute()` 方法将对象绑定到 Session 中，之后通过  `getAttribute()` 方法获取绑定在 Session 中的对象。

也就是说，可以在一次会话的多次请求间共享数据，将数据保存在服务器端的对象中。

- 获取 Session 对象

我们可以通过 HttpServletRequest 的 getSession() 方法来获取 HttpSession 对象。如果 HttpSession 对象不存在，则会创建一个新的 Session 对象。

### Session 常用方法

以下是一些常用的 Session 对象的方法：

- `setAttribute(String name, Object value)`：将一个名为 name，值为 value 的对象绑定到 Session 中。

- `getAttribute(String name)`：获取 Session 中绑定的名为 name 的对象。
- `removeAttribute(String name)`：从 Session 中删除名为 name 的对象。
- `getId()`：获取 Session 的唯一标识符。
- `getCreationTime()`：获取 Session 的创建时间。
- `getLastAccessedTime()`：获取 Session 的最后访问时间。
- `setMaxInactiveInterval(int interval)`：设置 Session 的最大不活动时间间隔，单位为秒。
- `getMaxInactiveInterval()`：获取 Session 的最大不活动时间间隔。

示例代码：

`SessionServlet`：

```java
@WebServlet(name = "SessionServlet", urlPatterns = "/session")
public class SessionServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取 Session 对象
        HttpSession session = req.getSession();
        // 将用户名存储到 Session 中
        session.setAttribute("username", req.getParameter("username"));
        // 重定向到另一个页面
        resp.sendRedirect("anotherPage.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
```

这里使用了 `@WebServlet` 来配置这个 Servlet，处理的请求映射的路径为 `/session`，主要进行了 Session 对象的相关操作，存储了用户信息，重定向到另一个页面，通过 Session，此时在另一个页面，就能够获取到存储的信息。

`anotherPage.jsp`

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="true" %>
<html>
<head>
    <title>这里是有Session的</title>
</head>
<body>
    <%
        String username = (String) session.getAttribute("username");
    %>
    <h2>从Session中获取的信息：<%=username%></h2>
</body>
</html>
```

### 生成唯一 ID 返回给浏览器

```java
@WebServlet(name = "SessionIdServlet", urlPatterns = "/sessionId")
public class SessionIdServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        // 获取 SessionID
        String sessionId = session.getId();
        // 创建名为JSESSIONID的 Cookie
        Cookie cookie = new Cookie("JSESSIONID", sessionId);
        // 设置 Cookie 效时间为30分钟
        cookie.setMaxAge(30 * 60);
        // 将 Cookie 追加到响应中返回给浏览器
        resp.addCookie(cookie);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
```

通过浏览器向这个路径 `/sessionId` 发起请求，就会接收到服务器返回的响应，这里的响应就有我们进行处理的名为 JSESSIONID 的 Cookie

![image-20230228235001252](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230310235110.png)

## Cookie 的概念

Cookie 和 Session 总是会被拿来比较的。Cookie 和 Session 都是用来跟踪浏览器用户身份的会话技术，或者说一种机制。它们都可以实现在多个页面之间共享用户的状态。

## Cookie 的原理

Cookie 是一种在客户端（浏览器）保存数据的机制。

浏览器第一次发送请求到服务器，服务器就创建 Cookie（**上面的代码中我们写了**），该 Cookie 中包含着信息，可以是用户的信息（用户偏好设置、广告偏好），然将该 Cookie 发送到浏览器。

浏览器之后再次访问服务器时就会携带服务器创建的 Cookie，**这不需要我们做任何操作，不需要写任何代码，浏览器帮我们实现了在每一次的请求中都携带上 Cookie**。服务器端通过 Cookie 中携带的数据区分不同的用户。

Cookie 的优点是可以长时间保存，并且可以在客户端设置，但是它也存在一些缺点：

- 安全性相对较差，容易被不法分子获取
- 存储容量有限，一般只能存储 ASCII 码
- 失效时间可以设置，但是客户端可以随时清除 Cookie

## 总结

Session 是一种服务器端的存储机制，它将用户状态信息存储在服务器上，每个用户都有一个独立的 Session。

在用户第一次访问服务器的时候，服务器会为其创建一个 Session，并将 Session ID 放到一个名为 JSESSIONID 的 Cookie 中发送给浏览器。

Cookie 是一种客户端（浏览器）存储机制，它将用户状态信息存储在客户端浏览器上。我们知道，用户第一次访问服务器的时候，服务器会将一些数据（比如 JSESSIONID）写入 Cookie 并发送给客户端，客户端在后续的请求中会将 Cookie 发送给服务器。

在存储容量方面，Cookie 的存储容量较小，一般只能存储 ASCII 码，而 Session 可以存储任意数据类型。在安全性方面，Session 相对于 Cookie 更加安全，因为 Session 存储在服务器，客户端无法直接访问。在跨域共享方面，Cookie 可以跨域共享，而 Session 只能在同一域名下共享。

## 最后的最后

**由本人水平所限，难免有错误以及不足之处， `屏幕前的靓仔靓女们` 如有发现，恳请指出！**

**最后，谢谢你看到这里，谢谢你认真对待我的努力，希望这篇博客对你有所帮助！**

**你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**