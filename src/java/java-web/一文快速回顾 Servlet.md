---
# 这是文章的标题
title: 一文快速回顾 Servlet
# 这是页面的图标
icon: battle-net
# 这是侧边栏的顺序
order: 1
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
  - Servlet
---

## 什么是Servlet？

**前置知识**：

Web 服务器：可以指硬件上的，也可以指软件上的。从硬件的角度来说， Web 服务器指的就是一台存储了网络服务软件的计算机；从软件的角度来说， Web 服务器指的是一种软件，比如 Tomcat。

Servlet 容器：目前主流的 Servlet 容器软件包括 Tomcat、Jetty、Jboss 等。

Web 服务器 ≠ Servlet 容器，Tomcat 是一种 Web 服务器，同时它还是一个 Servlet 容器。

翻开 Servlet 源码，有这样的一句话：

> A servlet is a small Java program that runs within a Web server. Servlets receive and respond to requests from Web clients, usually across HTTP, the HyperText Transfer Protocol.
>
> 一个 Servlet 就是一个小型的运行在 Web 服务器里面的 Java 程序。每个 Servlet 都会接收并且响应来自 Web 客户端的每一个请求，请求指的是 HTTP 请求（超文本传输协议）。

**Servlet （ Server Applet）可以说是一种在 Web 服务器中的 Java 应用程序，这种程序与我们平常写的 Java 程序的区别在于，它封装了对 HTTP 请求的处理，同时需要 Servlet 容器的支持。**

本质上，Servlet 就是按 Servlet 规范编写的 Java 类，特别之处就是它可以处理相关的 HTTP 请求。它的规范，或者说标准，是由 Sun 定义的，**具体的细节是在 Servlet 容器中实现的**，没错，比如 Tomcat（老伙计又出来了）。

## Servlet 的孩子们

在 `javax.servlet` 包中，定义了 Servlet 、ServletConfig 这两个接口，这两个接口定义了 Servlet 的基本方法以及相关的配置信息。

Servlet 接口：

```java
public interface Servlet {

    // 初始化的方法，当Servlet对象实例化后，Servlet容器会调用该方法来完成初始化工作
    public void init(ServletConfig config) throws ServletException;

    // 服务的方法，用于处理客户端（浏览器）发送的请求，并返回响应，简单点，处理业务逻辑的
    public void service(ServletRequest req, ServletResponse res)
            throws ServletException, IOException;

    // 销毁的方法，当Servlet对象将要从Servlet容器中移除时，Servlet容器会调用该方法，就会将Servlet对象进行垃圾回收，释放内存资源
    public void destroy();
    
    // 用于获取Servlet对象的配置信息，返回ServletConfig对象
    public ServletConfig getServletConfig();
    
    // 用于获取Servlet自身的信息，比如作者，版本
    public String getServletInfo();
}


```

init()、service()、destroy()，这 3 个方法的定义，也是定义了 **Servlet 的生命周期**，这个后面讲。

ServletConfig 接口：

```java
public interface ServletConfig {

    // 获取Servlet对象的名称
    public String getServletName();

    // 获取Servlet对象的上下文
    public ServletContext getServletContext();

    // 根据初始化的参数名获取其参数值
    public String getInitParameter(String name);

    // 获取所有初始化的参数名的枚举集合
    public Enumeration<String> getInitParameterNames();
}
```

还定义了一个名为 **GenericServlet** 的抽象类，这个抽象类实现了 Servlet、ServletConfig 和 Serializable 接口，它为 Servlet、ServletConfig 提供了一些实现，但没有对 HTTP 请求处理进行实现，对于 HTTP 请求的处理，是由 GenericServlet 的子类—— **HttpServlet** 实现的。

HttpServlet 也是一个抽象类，它对 HTTP 请求中的 GET、POST 等请求提供了具体的实现，所以一般情况下，咱们自己写的 Servlet 基本都是去继承 HttpServlet，进而进行下一步操作。

HttpServlet 抽象类：

```java
public abstract class HttpServlet extends GenericServlet {
    
    ...
    
    // 并没有具体实现，所以我们自己写的时候需要重写这些方法，来实现我们处理 HTTP 请求的逻辑
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException
    {
        String protocol = req.getProtocol();
        String msg = lStrings.getString("http.method_get_not_supported");
        if (protocol.endsWith("1.1")) {
            resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, msg);
        } else {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, msg);
        }
    }
    
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

        String protocol = req.getProtocol();
        String msg = lStrings.getString("http.method_post_not_supported");
        if (protocol.endsWith("1.1")) {
            resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, msg);
        } else {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, msg);
        }
    }

}
```

## Servlet 和 JSP 的关系

- Servlet 先出现，JSP 后出现。
- Servlet 可以处理页面的问题，返回页面给客户端，但是它主要用于处理业务逻辑。由于没有 JSP 的时候，页面和逻辑都是 Servlet 处理的，代码耦合度是非常高的，操作也是很复杂，所以 JSP 的出现就是解决这种问题，将 HTML、CSS、JS 直接写到 JSP 页面中。

## 在 IDEA 中创建 Servlet 程序

### 新建 Web 项目并进行配置

新建一个 Web 项目，File -> New -> Project... -> Java -> Java EE -> Web Application

![image-20230218225632903](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230309231612.png)

1. 在 `web/WEB-INF` 下面新建两个文件夹，即 classes 和 lib 目录。
2. 按 Ctrl + Alt + Shift + S 进入 Project Structure 进行配置（配置刚刚新建的两个目录）。
3. 配置编译后的 class 文件输出路径。
4. 配置依赖项（Web 应用依赖的 Jar 包）位置。

![image-20230218230823465](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230309231618.png)

5. 将 tomcat/lib 目录下的 servlet-api.jar 复制到刚刚创建的 lib 目录下（是吧，**具体的细节是在 Servlet 容器中实现的**）
6. 配置 Tomcat

![image-20230218232433772](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230309231625.png)

还可以配置访问地址（当前项目的访问路径），通过 `Application context` 这个配置项进行配置，我这里一开始默认是 `demo_servlet_war_exploded` ，修改成 `demo_servlet`，于是访问路径会变成 `localhost:8080/demo_servlet`

![image-20230218232800482](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230309231629.png)

### 编写 Servlet

在你喜欢的地方创建一个 Servlet，不过目前我把它放在 `cn.god23bin.demo.controller` 包下。

HelloServlet：继承 HttpServlet，并重写 doGet() 和 doPost() 方法。

```java
public class HelloServlet extends HttpServlet {
    /**
     * 处理 GET 方式的 HTTP 请求
     * @param req 请求对象
     * @param resp 响应对象
     * @throws ServletException 异常对象
     * @throws IOException IO异常对象
     * @return 返回 HTML 页面
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        out.println("<html>");
        out.println("   <head><title>Hello Servlet</title></head>");
        out.println("   <body>Servlet 实例对象： "+ this.getClass() + "</body>");
        out.println("</html>");
        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
```

**为什么我们只需要重写 doGet()/doPost()，不需要重写 service() 方法？**

因为 HttpServlet 的 service() 方法已经具体实现了，在该方法判断请求是什么类型的（通过 if else 进行判断，判断 GET、POST、PUT、DELETE 等），然后再分出一个个单独的方法来调用，所以我们只需要重写 doGet()/doPost() 就行了。

### 配置 Servlet

想要 Servlet 正常运行，那么需要进行配置，告知 Web 服务器哪一个请求调用哪一个 Servlet 对象进行处理。专业的说法：「注册 Servlet」

**在 Servlet 3.0 之前，是通过 web.xml 对 Servlet 进行配置的，3.0 开始，可以通过注解进行配置。**

#### web.xml 的方式

在我们创建这个 Web 应用的时候，该版本为 Servlet 4.0，可以从这个 web.xml 中看到版本信息。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

</web-app>
```

使用 xml 配置文件进行配置，主要用到这么几个标签：

- `<servlet>`：声明一个 Servlet 对象
- `<servlet-name>`：指定 Servlet 的名称，命名的作用
- `<servlet-class>`：指定 Servlet 对象的全限定类名（全路径、完整的位置）
- `<servlet-mapping>`：声明 Servlet 对象后，需要映射访问 Servlet 的 URL（统一资源定位符）
- `<url-pattern>`：指定映射访问的 URL，一般自己根据业务进行编写请求的路径

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>cn.god23bin.demo.controller.HelloServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>

</web-app>
```

此时，启动 Tomcat，访问 `http://localhost:8080/demo_servlet/hello`，得到 Servlet 处理的返回结果：

```html
Servlet 实例对象： class cn.god23bin.demo.controller.HelloServlet
```

#### @WebServlet 的方式

`@WebServlet` 注解，直接加在自己编写的 Servlet 类上，通过它的属性进行配置，比如 name 属性，urlPatterns 属性和 initParams 属性。这里配置了两个请求映射路径 `/no_web` 和 `/web_no`，这两个路径都由当前的 Servlet 对象来处理。

```java
@WebServlet(name = "NoServlet", urlPatterns = {"/no_web", "/web_no"})
public class NoWebXmlServlet extends HttpServlet {
    /**
     * 处理 GET 方式的 HTTP 请求
     * @param req 请求对象
     * @param resp 响应对象
     * @throws ServletException 异常对象
     * @throws IOException IO异常对象
     * @return 返回 HTML 页面
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        out.println("<html>");
        out.println("   <head><title>No Web XML Servlet</title></head>");
        out.println("   <body>Servlet 实例对象-使用注解的方式配置的： "+ this.getClass() + "</body>");
        out.println("</html>");
        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}

```

此时访问 `http://localhost:8080/demo_servlet/no_web` 和 `http://localhost:8080/demo_servlet/web_no` 都会得到 Servlet 处理的返回结果：

```html
Servlet 实例对象-使用注解的方式配置的： class cn.god23bin.demo.controller.NoWebXmlServlet
```

![Tomcat中Servlet处理过程](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230309231637.png)

#### 这两个如何选择？

按目前的形势，看个人喜欢，我是喜欢写注解的方式来进行配置。

## 关于对请求和响应的封装

每当有一个 HTTP 请求过来，Servlet 容器就会将当前 HTTP 请求的信息封装为一个 HttpServletRequest 对象，而每一个 HttpServletResponse 对象将会转成 HTTP 响应返回给客户端。

### HttpServletRequest 接口

在 Servlet API 中，定义了一个 HttpServletRequest 接口，它继承自 ServletRequest 接口。HttpServletRequest 对象专门用于封装 HTTP 请求消息。

HTTP 请求消息分为**请求行、请求头和请求体**三部分，所以 HttpServletRequest 接口中定义了获取请求行、请求头和请求体的相关方法。

1. **获取请求行信息**

HTTP 请求的请求行中包含请求方法、请求资源名、请求路径等信息，HttpServletRequest 接口定义了一系列获取请求行信息的方法，如下表：

| 返回值类型 | 方法声明         | 描述                                                         |
| ---------- | ---------------- | ------------------------------------------------------------ |
| String     | getMethod()      | 该方法用于获取 HTTP 请求方式（如 GET、POST 等）。            |
| String     | getRequestURI()  | 该方法用于获取请求行中的资源名称部分，即位于 URL 的主机和端口之后，参数部分之前的部分。 |
| String     | getQueryString() | 该方法用于获取请求行中的参数部分，也就是 URL 中 “?” 以后的所有内容。 |
| String     | getContextPath() | 返回当前 Servlet 所在的应用的名字（上下文）。对于默认（ROOT）上下文中的 Servlet，此方法返回空字符串""。 |
| String     | getServletPath() | 该方法用于获取 Servlet 所映射的路径。                        |
| String     | getRemoteAddr()  | 该方法用于获取客户端的 IP 地址。                             |
| String     | getRemoteHost()  | 该方法用于获取客户端的完整主机名，如果无法解析出客户机的完整主机名，则该方法将会返回客户端的 IP 地址。 |

2. **获取请求头信息**

当浏览器发送请求时，需要通过请求头向服务器传递一些附加信息，例如客户端可以接收的数据类型、压缩方式、语言等。为了获取请求头中的信息， HttpServletRequest 接口定义了一系列用于获取 HTTP 请求头字段的方法，如下表：

| 返回值类型  | 方法声明                | 描述                                                         |
| ----------- | ----------------------- | ------------------------------------------------------------ |
| String      | getHeader(String name)  | 该方法用于获取一个指定头字段的值。 如果请求消息中包含多个指定名称的头字段，则该方法返回其中第一个头字段的值。 |
| Enumeration | getHeaders(String name) | 该方法返回指定头字段的所有值的枚举集合， 在多数情况下，一个头字段名在请求消息中只出现一次，但有时可能会出现多次。 |
| Enumeration | getHeaderNames()        | 该方法返回请求头中所有头字段的枚举集合。                     |
| String      | getContentType()        | 该方法用于获取 Content-Type 头字段的值。                     |
| int         | getContentLength()      | 该方法用于获取 Content-Length 头字段的值 。                  |
| String      | getCharacterEncoding()  | 该方法用于返回请求消息的字符集编码 。                        |

3. **获取请求参数信息**

在实际开发中，我们经常需要获取用户提交的表单数据，例如用户名和密码等。为了方便获取表单中的请求参数，ServletRequest 定义了一系列获取请求参数的方法，如下表：

| 返回值类型  | 方法声明                         | 功能描述                                                     |
| ----------- | -------------------------------- | ------------------------------------------------------------ |
| String      | getParameter(String name)        | 返回指定参数名的参数值。                                     |
| String [ ]  | getParameterValues (String name) | 以字符串数组的形式返回指定参数名的所有参数值（HTTP 请求中可以有多个相同参数名的参数）。 |
| Enumeration | getParameterNames()              | 以枚举集合的形式返回请求中所有参数名。                       |
| Map         | getParameterMap()                | 用于将请求中的所有参数名和参数值装入一个 Map 对象中返回。    |

#### 测试 API

```java
@WebServlet(name = "ReqInfoServlet", urlPatterns = "/reqInfo")
public class ReqInfoServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter out = resp.getWriter();
        out.println(
                "请求行------------------------------------<br/>" +
                "请求方式："     + req.getMethod() + "<br/>" +
                "客户端的 IP 地址："    + req.getRemoteAddr() + "<br/>" +
                "应用名字（上下文）："  + req.getContextPath() + "<br/>" +
                "URI："                + req.getRequestURI() + "<br/>" +
                "请求字符串："          + req.getQueryString() + "<br/>" +
                "Servlet所映射的路径：" + req.getServletPath() + "<br/>" +
                "客户端的完整主机名："   + req.getRemoteHost() + "<br/>"
        );
        out.println("<br/>");
        out.println("请求头------------------------------------<br/>");
        // 获得所有请求头字段的枚举集合
        Enumeration<String> headers = req.getHeaderNames();
        while (headers.hasMoreElements()) {
            // 获得请求头字段的值
            String value = req.getHeader(headers.nextElement());
            out.write(headers.nextElement() + ":" + value + "<br/>");
        }
        out.println("<br/>");
        out.println("请求参数----------------------------------<br/>");
        out.println("keyword：" + req.getParameter("keyword"));
        out.println("value：" + req.getParameter("value"));
        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
```

![image-20230219225436865](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230309231651.png)

### HttpServletResponse 接口

在 Servlet API 中，定义了一个 HttpServletResponse 接口，它继承自 ServletResponse 接口。HttpServletResponse 对象专门用来封装 HTTP 响应消息。

HTTP 响应消息由**响应行、响应头、响应体**三部分组成，所以 HttpServletResponse 接口中定义了向客户端发送响应状态码、响应头、响应体的方法。

1. **响应行相关的方法**

当 Servlet 返回响应消息时，需要在响应消息中设置状态码。因此，HttpServletResponse 接口定义了发送状态码的方法，如下表：

| 返回值类型 | 方法                    | 描述                                               |
| ---------- | ----------------------- | -------------------------------------------------- |
| void       | setStatus（int status） | 用于设置 HTTP 响应消息的状态码，并生成响应状态行。 |
| void       | sendError（int sc）     | 用于发送表示错误信息的状态码。                     |

2. **响应头相关的方法**

HttpServletResponse 接口中定义了一系列设置 HTTP 响应头字段的方法，如下表：

| 返回值类型 | 方法                                 | 描述                                                         |
| ---------- | ------------------------------------ | ------------------------------------------------------------ |
| void       | addHeader(String name,String value)  | 用于增加响应头字段，其中，参数 name 用于指定响应头字段的名称，参数 value 用于指定响应头字段的值。 |
| void       | setHeader (String name,String value) | 用于设置响应头字段，其中，参数 name 用于指定响应头字段的名称，参数 value 用于指定响应头字段的值。 |
| void       | addIntHeader(String name,int value)  | 用于增加值为 int 类型的响应头字段，其中，参数 name 用于指定响应头字段的名称，参数 value 用于指定响应头字段的值，类型为 int。 |
| void       | setIntHeader(String name, int value) | 用于设置值为 int 类型的响应头字段，其中，参数 name 用于指定响应头字段的名称，参数 value 用于指定响应头字段的值，类型为 int。 |
| void       | setContentType(String type)          | 用于设置 Servlet 输出内容的 MIME 类型以及编码格式。          |
| void       | setCharacterEncoding(String charset) | 用于设置输出内容使用的字符编码。                             |

3. **响应体相关的方法**

由于在 HTTP 响应消息中，大量的数据都是通过响应体传递的。因此 ServletResponse 遵循以 I/O 流传递大量数据的设计理念，在发送响应消息体时，定义了两个与输出流相关的方法。

| 返回值类型          | 方法              | 描述                     |
| ------------------- | ----------------- | ------------------------ |
| ServletOutputStream | getOutputStream() | 用于获取字节输出流对象。 |
| PrintWriter         | getWriter()       | 用于获取字符输出流对象。 |

> 注意：getOutputStream() 和 getWriter() 方法互相排斥，不可同时使用，否则会发生 IllegalStateException 异常。

这里就自己去手动测试一波吧！

## Servlet 的生命周期

生命周期，从 Servlet 创建到开始工作处理请求，再到被销毁进行垃圾回收的过程。从 Service 接口提供的方法也体现出来了。

- Servlet 初始化后，Servlet 容器就会调用 **init ()** 方法。
- Servlet 调用 **service()** 方法来处理客户端的请求。
- Servlet 要销毁前，Servlet 容器就会调用 **destroy()** 方法。
- 最后，Servlet 是由 JVM 的垃圾回收器进行垃圾回收的。

init() 方法被设计成只调用一次，它在第一次创建 Servlet 时被调用，在后续每次用户请求时不再被调用。因此，它是用于一次性初始化。

service() 方法是执行实际任务的主要方法。每次服务器接收到一个 Servlet 请求时，服务器会产生一个新的线程并调用服务。service() 方法检查 HTTP 请求类型，并在适当的时候调用 doGet、doPost、doPut，doDelete 等方法。

destroy() 方法只会被调用一次，在 Servlet 生命周期结束时被调用。destroy() 方法可以让我们写一些操作，比如关闭数据库连接。在调用 destroy() 方法之后，servlet 对象被标记为垃圾。

## 过滤器

除了Servlet本身，Java Web应用中还有两个重要的组件：过滤器（Filter）和监听器（Listener）。下面分别回顾。

### 什么是过滤器？

Servlet 过滤器是再 Servlet 2.3 规范中加入的功能。过滤器可以动态地**拦截请求和响应**，以变换或使用包含在请求或响应中的信息。

某些情况下，我们需要再业务代码执行前获取请求中的某些信息，就可以使用过滤器。

简而言之：

- 在客户端的请求访问服务器中的资源之前，拦截这些请求。
- 在服务器的响应发送回客户端之前，处理这些响应。

如果我们使用一个过滤器不能解决业务需求，那么就用多个，多个过滤器可以对请求和响应进行多次处理。多个过滤器组合而成的就是「过滤器链」，请求会依次按照过滤器的顺序一一进入，直到最后一个过滤器为止。当返回响应的时候，也是一样，从最后一个过滤器依次传递到第一个过滤器，最后到达客户端。

### 过滤器相关的接口

有 3 个接口需要知道，就是 Filter 接口、FilterConfig 接口、FilterChain 接口。

每一个过滤器都要直接或间接地实现 Filter 接口，在 Filter 中定义了 3 个方法，分别是 init()、doFilter()、destroy() 方法。

```java
public interface Filter {
    // 初始化方法，初始化的时候会被调用
    public default void init(FilterConfig filterConfig) throws ServletException {}

    // 对请求进行过滤处理
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException;

    // 销毁方法，释放资源
    public default void destroy() {}
}
```

FilterConifg 接口由 Servlet 容器实现，主要用于获取过滤器中的配置信息。

```java
public interface FilterConfig {

    // 获取过滤器名称
    public String getFilterName();

    // 获取Servlet上下文
    public ServletContext getServletContext();

    // 根据初始化的参数名获取的参数值
    public String getInitParameter(String name);

    // 获取所有初始化参数名的枚举类型集合
    public Enumeration<String> getInitParameterNames();

}
```

FilterChain 接口仍然由 Servlet 容器实现，这个接口只有一个方法。

```java
public interface FilterChain {

    // 用于将过滤后的请求传递给下一个过滤器，如果这个过滤器是最后一个，那么将请求传递给目标资源（比如交给了某个Servlet）
    public void doFilter(ServletRequest request, ServletResponse response)
            throws IOException, ServletException;

}
```

### 编写一个过滤器

一个过滤器需要实现 Filter 接口，实现该接口后，需要对它的 3 个方法进行实现，其中对于初始化和销毁的方法，如果没有什么特别的需要处理，可以是空实现（空方法）。

编写过滤器和编写 Servlet 也是差不多的，需要一个 Java 类来作为过滤器，并通过 web.xml 进行配置，过滤器也有它对应的标签，不过我这里目前使用注解的方式对自己的过滤器进行配置。

直接在过滤器这个类上使用 `@WebFilter` 注解进行配置，有 filterName 属性，urlPatterns 属性（映射路径，是一个数组），initParams 属性（用于配置过滤器初始化参数的）等等。

HelloFilter：

```java
@WebFilter(filterName = "第一个过滤器", 
        urlPatterns = {"/count", "/add"}, 
        initParams = {@WebInitParam(name = "count", value = "23"), @WebInitParam(name = "add", value = "32")})
public class HelloFilter implements Filter {
    
    private Integer iCount;
    private Integer iAdd;
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 通过 filterConfig 对象获取我们给过滤器配置的初始化参数
        String count = filterConfig.getInitParameter("count");
        String add = filterConfig.getInitParameter("add");
        iCount = Integer.valueOf(count);
        iAdd = Integer.valueOf(add);
        System.out.println("第一个过滤器初始化完成！");
        System.out.println("获取初始化的参数------count：" + iCount + "-add：" + iAdd);
    }

    @Override
    public void destroy() {
        System.out.println("第一个过滤器已经销毁");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // 处理过滤请求
        iCount++;
        iAdd++;
        // 将 ServletRequest 转成 HttpServletRequest
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        // 获取上下文
        ServletContext context = req.getServletContext();
        // 将访问数量的值放入上下文
        context.setAttribute("iCount", iCount);
        context.setAttribute("iAdd", iAdd);
        // 传递到下一个过滤器
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
```

上面的代码中，配置了过滤的请求路径有 `/count` 和 `/add` ，当客户端访问这两个路径时，就会进入该过滤器，第一次访问就会执行初始化方法，接着会执行 `doFilter` 方法，将两个变量自增存储到 Servlet 上下文中（上下文可以理解成整个 Servlet 容器**存取**数据的区域（环境），可以被其他 Servlet 共享），最后传递到下一个过滤器，如果没有下一个过滤器，就直接到目标资源。

现在，写多一个 Servlet，作为请求访问的目标资源，如下：

```java
@WebServlet(urlPatterns = {"/count", "/add"})
public class AServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("处理业务，这里就是目标资源");
        ServletContext context = req.getServletContext();
        Integer iCount = (Integer) context.getAttribute("iCount");
        Integer iAdd = (Integer) context.getAttribute("iAdd");
        System.out.println("欢迎访问" + iCount + "---" + iAdd);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
```

重新运行 Tomcat，访问 `http://localhost:8080/demo_servlet/count` 和 `http://localhost:8080/demo_servlet/add`

控制台输出如下：

```console
第一个过滤器初始化完成！
获取初始化的参数------count：23-add：32
[2023-02-19 03:21:32,340] Artifact demo-servlet:war exploded: Artifact is deployed successfully
[2023-02-19 03:21:32,340] Artifact demo-servlet:war exploded: Deploy took 562 milliseconds
处理业务，这里就是目标资源
欢迎访问24---33
处理业务，这里就是目标资源
欢迎访问25---34

```

### 应用

**字符编码过滤器**

示例：这里有一个 Servlet，获取请求中携带的参数并返回其拼接到 HTML 中的内容返回给客户端。这个 Servlet 作为处理 `/addSomething` 的 POST 请求。

```java
@WebServlet(name = "AddServlet", urlPatterns = "/addSomething")
public class AddServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("name");
        String author = req.getParameter("author");
        PrintWriter out = resp.getWriter();
        out.print("<h2>名称：" + name +"</h2>");
        out.print("<h2>作者：" + author +"</h2>");
        out.flush();
        out.close();
    }
}
```

此时，如果没有进行字符编码的过滤操作，重新设置字符集的话，返回的结果是有中文乱码的。所以需要一个字符编码过滤器，对请求和响应进行操作。

CharacterFilter：这个字符编码过滤器指定了需要过滤的 Servlet 是哪一个（通过 servletNames 指定），并配置了初始化的一个名为 encoding 的参数，其值为 UTF-8。在过滤的方法中，设置请求和响应的字符编码为 UTF-8，这样后续到达目标资源的请求和响应的编码格式就是支持中文的 UTF-8 编码了。

```java
@WebFilter(servletNames = "AddServlet", initParams = @WebInitParam(name = "encoding", value = "UTF-8"))
public class CharacterFilter implements Filter {

    private String encoding;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 获取配置的初始化参数值
        encoding = filterConfig.getInitParameter("encoding");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        if (encoding != null) {
            // 设置 request 编码格式
            servletRequest.setCharacterEncoding(encoding);
            servletResponse.setContentType("text/html; charset=" + encoding);
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
```

测试结果：

![image-20230219171038839](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230309231746.png)

当然，过滤器还有其他应用场景：

- 认证和授权：验证用户是否具有访问某个资源的权限
- 日志记录：记录客户端请求和服务器响应的详细信息，用于调试和监控
- 数据压缩和解压缩：压缩响应数据以减少网络带宽的使用
- 图像处理：对请求的图像进行处理，如缩放、裁剪等
- 过滤器链：将多个过滤器组合起来形成一个过滤器链，依次处理客户端请求和服务器响应

## 监听器

### 什么是监听器？

有这么一个需求：就是当某件事发生的时候，我们可以做出某些动作。如何实现呢？那就是通过监听器实现。

Servlet 监听器可以监听 Web 应用程序的某些事件，并当某件事（比如应用程序的启动和关闭）发生的时候，我们进行相关的处理。

### 监听什么？

可以监听 ServletContext 的相关操作，可以监听 HTTP Session （HTTP 会话）的操作，可以监听客户端发送过来的请求（请求到 Servlet）。

监听器是监听 Web 容器的有效事件，所以它是由容器管理的。总共有 8 个Listener 接口 和 6 个 Event 类

### 如何监听？

它们都有各自的监听器：

- 监听 ServletContext（Servlet 上下文 - application）：**ServletContextListener**

- 监听 HTTP Session：**HttpSessionListener**

- 监听客户端的请求（request）：**ServletRequestListener**

### 监听器的相关接口

**对于 ServletContext 上下文的监听，有 2 个接口**：ServletContextListener 和 ServletAttributeListener 接口。

1. ServletContextListener 接口：

```java
public interface ServletContextListener extends EventListener {

    // 通知所有的 Servlet 上下文监听器对象，Web 应用程序已经被加载，之后才继续加载 过滤器或者 Servlet，可以调用该方法了
    public default void contextInitialized(ServletContextEvent sce) {
    }

    // 在所有的 Servlet 和 过滤器都被销毁后，通知所有的 Servlet 上下文监听器对象，Web 应用程序已经被销毁，可以调用该方法了
    public default void contextDestroyed(ServletContextEvent sce) {
    }
}
```

2. ServletContextAttributeListener 接口：

```java
public interface ServletContextAttributeListener extends EventListener {
    
    // 当有新的属性被加入到 Servlet 上下文后，就通知所有的上下文监听器调用这个方法
    public default void attributeAdded(ServletContextAttributeEvent scae) {
    }

    // 当已有属性被移除后，通知所有上下文监听器调用这个方法
    public default void attributeRemoved(ServletContextAttributeEvent scae) {
    }

    // 当已有属性的被替换后，通知所有上下文监听器调用这个方法
    public default void attributeReplaced(ServletContextAttributeEvent scae) {
    }
}
```

**对于 HTTP Session 的监听，有 4 个接口**：HttpSessionListener，HttpSessionActivationListener，HttpBindingListener 和 HttpSessionAttributeListener 接口。

3. HttpSessionListener 接口：

```java
public interface HttpSessionListener extends EventListener {

    // 通知正在监听的对象，HttpSession 已经被创建并且初始化了，可以调用该方法了
    public default void sessionCreated(HttpSessionEvent se) {
    }

    // 通知正在监听的对象，HttpSession 已经被销毁了，可以调用该方法了
    public default void sessionDestroyed(HttpSessionEvent se) {
    }
}
```

4. HttpSessionActivationListener 接口：

这里涉及到的事件就是 **Session 的钝化以及活化**。

钝化：其实就是使用序列化和反序列化技术把 Session 从内存保存到硬盘。

活化：反过来，把 Session从硬盘加载到内存。

举个例子，如果 A 类没有实现 Serializable 接口，那么当 Session 钝化时就不会钝化 A 对象，而是把 A 对象从 Session 中移除再钝化。活化的时候，A 对象是不存在的。

```java
public interface HttpSessionActivationListener extends EventListener {

    // 通知正在监听的对象，Session 对象将要钝化，可以调用该方法了
    public default void sessionWillPassivate(HttpSessionEvent se) {
    }

    // 通知正在监听的对象，Session 对象刚刚活化，可以调用该方法了
    public default void sessionDidActivate(HttpSessionEvent se) {
    }
}
```

5. HttpBindingListener 接口：

该接口监听 HTTP 会话中对象的绑定信息。

```java
public interface HttpSessionBindingListener extends EventListener {

    // 通知正在监听的对象，当有对象加入（绑定）到 Session 范围时，可以调用该方法了
    public default void valueBound(HttpSessionBindingEvent event) {
    }

    // 通知正在监听的对象，当有对象从 Session 范围移除（解绑）时，可以调用该方法了
    public default void valueUnbound(HttpSessionBindingEvent event) {
    }
}
```

6. HttpSessionAttributeListener 接口：

```java
public interface HttpSessionAttributeListener extends EventListener {

    // 当有新的属性被加入到 Session 后，就通知所有的 HttpSession 监听器调用这个方法
    public default void attributeAdded(HttpSessionBindingEvent se) {
    }

    // 当有新的属性从 Session 中移除后，就通知所有的 HttpSession 监听器调用这个方法
    public default void attributeRemoved(HttpSessionBindingEvent se) {
    }

    // 当已有属性的被替换后，就通知所有的 HttpSession 监听器调用这个方法
    public default void attributeReplaced(HttpSessionBindingEvent se) {
    }
}
```

**对于 Servlet 请求的监听（客户端请求的监听），有 2 个接口**：ServletRequestListener 和 ServletRequestAttributeListener 接口。

7. ServletRequestListener 接口：

```java
public interface ServletRequestListener extends EventListener {
    
    // 通知正在监听的对象，ServletRequest 已经被加载和初始化，可以调用该方法了
    public default void requestInitialized (ServletRequestEvent sre) {
    }

    // 通知正在监听的对象，ServletRequest 已经被销毁，可以调用该方法了
    public default void requestDestroyed (ServletRequestEvent sre) {
    }


}
```

8. ServletRequestAttributeListener 接口：

```java
public interface ServletRequestAttributeListener extends EventListener {
    
    // 当有新的属性被加入到 ServletRequest 后，就通知所有的 ServletRequest 监听器调用这个方法
    public default void attributeAdded(ServletRequestAttributeEvent srae) {
    }

    // 当有新的属性从 ServletRequest 中移除后，就通知所有的 ServletRequest 监听器调用这个方法
    public default void attributeRemoved(ServletRequestAttributeEvent srae) {
    }

    // 当已有属性的被替换后，就通知所有的 ServletRequest 监听器调用这个方法
    public default void attributeReplaced(ServletRequestAttributeEvent srae) {
    }
}
```

### 编写一个监听器

可以看到，这些监听器无非就是监听那么几个对象的创建、销毁、其对象属性的创建、销毁、替换等等的事件。

HelloListener：该监听器实现了 ServletContextListener, ServletRequestListener 接口，并实现了接口定义的方法。

```java
@WebListener
public class HelloListener implements ServletContextListener, ServletRequestListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext context = sce.getServletContext();
        System.out.println("输出这句话说明 Servlet 上下文已经创建了：" + context);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        ServletContext context = sce.getServletContext();
        System.out.println("输出这句话说明 Servlet 上下文已经销毁了：" + context);
    }

    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        ServletRequest request = sre.getServletRequest();
        System.out.println("输出这句话说明 ServletRequest 已经创建了：" + request.getProtocol());
    }

    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        ServletRequest request = sre.getServletRequest();
        System.out.println("输出这句话说明 ServletRequest 已经销毁了：" + request.getProtocol());
    }
}

```

当 Web 应用程序启动时，Servlet 上下文就会创建，该监听器就会监听到该事件，打印输出我们写的内容，同理每一次的 HTTP 请求也是，会被监听。控制台输出如下：

```console
输出这句话说明 Servlet 上下文已经创建了：org.apache.catalina.core.ApplicationContextFacade@6df13dcc
第一个过滤器初始化完成！
获取初始化的参数------count：23-add：32
[2023-02-19 09:48:11,272] Artifact demo-servlet:war exploded: Artifact is deployed successfully
[2023-02-19 09:48:11,272] Artifact demo-servlet:war exploded: Deploy took 735 milliseconds
输出这句话说明 ServletRequest 已经创建了：HTTP/1.1
输出这句话说明 ServletRequest 已经销毁了：HTTP/1.1
输出这句话说明 ServletRequest 已经创建了：HTTP/1.1
输出这句话说明 ServletRequest 已经销毁了：HTTP/1.1
```

### 应用

统计在线用户数：

```java
public class UserCounterListener implements HttpSessionListener {

    private static int activeUsers = 0;

    public static int getActiveUsers() {
        return activeUsers;
    }

    public void sessionCreated(HttpSessionEvent event) {
        activeUsers++;
    }

    public void sessionDestroyed(HttpSessionEvent event) {
        activeUsers--;
    }
}
```

监听器可以用于以下场景：

- 统计在线用户数：监听 HttpSession 的创建和销毁事件，并记录当前在线用户数
- 初始化应用程序：监听 ServletContext 的创建事件，并在应用程序启动时执行初始化操作
- 缓存预热：监听 ServletContext 的创建事件，并在应用程序启动时预加载缓存数据

## 总结

**1. 编写 Servlet 的几种方式：**

- 实现 Servlet 接口（很少用）
  - 需要实现接口里的方法
  - 可以通过重写 init()、service()、destroy() 等方法来实现 Servlet 的生命周期管理
- 继承 GenericServlet 类（很少用）
  - GenericServlet 实现了 Servlet 接口除了 service() 方法
  - 可以通过重写 service() 方法来实现 Servlet 的具体逻辑
- 继承 HttpServlet 方法（最常用）
  - HttpServlet 继承了 GenericServlet 类，提供了处理 HTTP 请求的方法
  - 可以通过重写 doGet()、doPost() 等方法来实现 Servlet 的具体逻辑

**2. Servlet 处理 HTTP 请求的过程**

我们一般编写 Servlet 是通过继承 HttpServlet 类并重写其中的 doGet()、doPost() 等方法来处理HTTP请求的。

当客户端向服务器发送 HTTP 请求时，Servlet 容器会创建一个 HttpServletRequest 对象和一个 HttpServletResponse 对象，并将这两个对象作为参数传递给 Servlet 的 service() 方法。service() 方法会根据请求方法（GET、POST等）调用 doGet()、doPost() 等方法来处理请求。

**3. 过滤器和监听器**

过滤器是一个 Java 类，它可以拦截客户端请求和服务器响应，对它们进行处理，然后将它们传递给目标 Servlet 或 JSP 页面。

监听器也是一个 Java 类，它可以监听 Web 应用中的事件，如 ServletContext、HttpSession、ServletRequest 等对象的创建、销毁和属性更改等事件。

## 最后的最后

**由本人水平所限，难免有错误以及不足之处， `屏幕前的靓仔靓女们` 如有发现，恳请指出！**

**最后，谢谢你看到这里，谢谢你认真对待我的努力，希望这篇博客对你有所帮助！**

**你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**