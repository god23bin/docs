---
# 这是文章的标题
title: 在 IDEA 中创建 Java Web 项目
# 这是页面的图标
icon: pepper-hot
# 这是侧边栏的顺序
order: 3
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-05-11 13:14:13
# 一个页面可以有多个分类
category:
  - Java
# 一个页面可以有多个标签
tag:
  - Java Web
  - JDBC
---

## 开发环境

以下是我的开发环境

- JDK 1.8
- Maven 3.6.3
- Tomcat 9.0
- IDEA 2019（2019 无所畏惧，即使现在已经 2023 年了哈哈哈）

## 最原始的 Java Web 项目

下面的内容可能会因 IDEA 版本不同，而有些选项不同，但是大同小异。

### 1. 打开 IDEA

点击 `Create New Project` 

![image-20230419230442410](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510215949.png)

### 2. 点击 Java Enterprise

点击左侧 `Java Enterprise` ，默认选项如下图所示。找到 Web Application，勾选上，同时勾上 `Create web.xml`。点击 Next 进入下一步。

![image-20230419214609114](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510215953.png)

### 3. 输入项目信息

输入项目名称和项目存储的位置，下方的配置默认就可以。接着点击 Finish 完成创建。

![image-20230419214806536](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510215956.png)

### 4. 完善项目结构

到这步，已经成功创建了 Web 项目了，目录结构如下图，在 Eclipse 中，`web` 目录的名称是 `WebContent` 。`src` 目录存放 Java 后端代码，`web` 目录存放前端代码。

我们可以在 web 目录下创建 `css，js，image，page` 这几个目录，分别存放对应的文件，其中 page 用于存放前端页面文件，包含 JSP 页面。

在 `web/WEB-INF` 目录下，存放着我们的 `web.xml` 配置文件，在该目录下，我们创建一个 `lib` 目录，用来存放项目需要的依赖包，比如 `servlet`、`jstl` 等。

![image-20230419221026185](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220000.png)

对于 `lib` 目录下的 `.jar` 文件，即项目所需的依赖包，我们可以通过右键 `Add as Library..`，将这些依赖包作为一个 Java 类库给我们使用。

![image-20230419222047017](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220003.png)

### 5. 配置 Tomcat 并启动

配置 Tomcat，由于在创建项目的时候，我们已经配置了 Application Server 这个选项，选择了 Tomcat，所以这里不需要进行配置，点击 IDEA 右上角的三角符号即可启动 Tomcat

![image-20230419232044424](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220006.png)

启动成功自动跳转到浏览器中显示默认的 `index.jsp` 页面。对应的 URL 为：`http://localhost:8080/java_web_demo_war_exploded/`

这里的 URL 是可以修改的，如果你要修改的话，可以点击右上角的 Tomcat 进行配置，如下图所示：

![image-20230419232634863](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220010.png)

比如我把 `Application context` 的内容修改为 `/demo`，那么点击 OK，然后重启 Tomcat，现在访问该 Web 应用，只需输入这样的 URL：`http://localhost:8080/demo/` ，就可以访问了。

## 使用 Maven 来创建并管理 Java Web 项目

### 1. 打开 IDEA

点击 `Create New Project` 

![image-20230419230442410](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220013.png)

### 2. 点击 Maven

点击左侧的 Maven，勾选上 `Create from archetype`，找到 `maven-archetype-webapp` 并选中它，点击 Next 进入下一步。

![image-20230419233328203](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220017.png)

### 3. 输入项目信息

输入项目的相关信息，点击 Next。

![image-20230419233646118](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220023.png)

### 4. 搞定 Maven 信息

搞定 Maven 相关信息，`setting.xml`  文件以及本地 Maven 仓库不能配置时，勾选上右边的 Override 选项就可以配置了。完成后点击 Finish。

![image-20230419233849310](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220027.png)

### 5. 开启自动导入依赖包，确保 pom.xml 信息正确

点击 `Enable Auto-Import`，让 IDEA 自动刷新导入在 `pom.xml` 文件中引入的项目需要的依赖包。确保 `pom.xml` 文件中的配置是正确的。

![image-20230419234443014](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220030.png)

### 6. 完善项目结构

完善整个项目的结构，分别创建 `src/main/java`、`src/main/resources`、`src/main/webapp/WEB-INF/classes` 和 `src/main/webapp/WEB-INF/lib` 这 4 个目录，如下图所示。

![image-20230419235146425](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220034.png)

`java` 目录用于存放 Java 代码。

`resources` 目录用于存放各种资源文件或者配置文件。

`classes` 目录用于存储项目编译后的 Java 的字节码文件，即 `.class` 文件。

`lib` 目录用于存放外部引入的 `jar` 包，当 Maven 仓库无法引入相关依赖时，那么就可以将对应的 `jar` 包放到这个 lib 目录中。

### 7. 配置 classes 和 lib 目录

配置 `classes` 以及 `lib` 目录

首先进入项目结构，可以通过快捷键 `Ctrl + Alt + Shift + S` 进入，也可以通过下图所示的方式进入。

![image-20230420000000459](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220037.png)

进入后点击左侧的 `Modules` ，选中你的项目，即当前模块，再点击 `Paths` 选项，选择刚才创建了 `classes` 目录的所在路径，点击 Apply。

![image-20230420000356614](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220114.png)

接着点击 `Dependencies` ，配置依赖包（依赖项），如下图所示。

![image-20230420001651200](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220042.png)

### 8. 配置 Tomcat 并启动

点击右上角的 `ADD CONFIGURATION`，进行 Tomcat 的配置，即告诉 IDEA， Tomcat 的所在位置，部署的访问路径等信息。

![image-20230420001920951](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220046.png)

点击 `+` 号添加一个新的 Tomcat 的配置项，选择本地的 Tomcat。

![image-20230420002210558](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220049.png)

Name 中输入你喜欢的配置名；Application Server 选择你自己的 Tomcat，其他的默认就 OK。

![image-20230420002527394](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220052.png)

接着点击 `Deployment`，点击 `+` 号，配置部署项，当 Tomcat 启动的时候就部署我们的 Web 项目。

![image-20230420002944889](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220055.png)

完成配置，并启动。

![image-20230420003242562](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230510220100.png)

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**