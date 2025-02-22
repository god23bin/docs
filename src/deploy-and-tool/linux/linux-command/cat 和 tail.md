---
# 这是文章的标题
title: 7. cat 和 tail 命令
# 这是页面的图标
# icon: command
# 这是侧边栏的顺序
order: 7
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-01-01
# 一个页面可以有多个分类
category:
  - Linux 命令
# 一个页面可以有多个标签
tag:
  - 创建目录
  - 复制目录
  - 创建文件
  - 修改文件
---

## 前言

大家好，我是 god23bin。今天我给大家带来的是 Linux 命令系列，**每天只需一分钟，记住一个 Linux 命令不成问题**。今天，需要你花费两分钟时间，因为我们要介绍的是两个常用的查看文件内容的命令：`cat` 和 `tail` 命令。

## cat

### 什么是 cat 命令？

`cat` 命令源自于  `concatenate files and print` 这个词组，意思为「连接文件并输出」。

`cat` 命令用于连接一个或多个文件，并将结果输出到终端或其他文件，这样我们就能在终端直接看到输出的内容。`cat` 命令适合查看内容较少、纯文本的文件。

### 如何使用 cat 命令？

`cat` 命令的使用非常简单。你只需在终端中输入 `cat`，并指定要连接的文件名。

基本语法：

```shell
cat [选项参数] 文件名
```

如果想要同时查看多个文件的话，那么可以这样：

```shell
cat 文件名1, 文件名2
```

这样就能将这两个文件连接起来了，并输出到终端。

### 举例说明

假设我们在 `/opt/games/gta6` 目录下，现在有一个 `show.txt` 的文本文件，我们想查看该文件的内容，那么可以在终端输入以下命令：

```shell
cat show.txt
```

这将在终端中显示 `show.txt` 文件的内容。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234212.png)

### 常用选项参数

- `-n`（--number）：显示行号。
- `-b`（--number-nonblank）：显示行号，空行没有行号。
- `-s`（--squeeze-blank）：显示行号，多个空行压缩合并成一行，显示空行行号。
- `-T`（--show-tabs）：在文件中显示制表符（将 TAB 字符显示为 `^I` 符号）

#### 例子

1. `cat` 某个文件的同时显示行号：

```shell
cat -n show.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234217.png)

2. `cat` 某个文件的同时显示行号，空行不显示行号：

```shell
cat -b show.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234222.png)

3. `cat` 某个文件的同时显示行号，多个空行合并成一行显示行号：

这里我修改 show.txt 的内容，多加上几个空行，接着使用 -s 命令输出内容。

```shell
cat -s show.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234227.png)

4. 显示在文件中的制表符：

```shell
cat -T show.txt
```

这将在文件中的制表符位置显示 `^I` 符号。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234232.png)

### 清空指定文件内容

我们可以借助「空设备文件」和「输出重定向操作符」，清空指定文件的内容。

```shell
cat /dev/null > show.txt
```

此时再 `cat show.txt` 就看不到任何内容了。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234238.png)

### 写入内容到文件

借助「输出重定向操作符」写入内容到指定的文件，遇到 EOF 中止符后才结束写入并保存。

```shell
cat > show.txt << EOF
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234243.png)

## tail

### 什么是 tail 命令？

`tail` 的意思就是「尾部、尾巴」，顾名思义，该命令用于显示文件的尾部内容，默认会显示指定文件的末尾 10 行的内容。

`tail` 命令通常用于查看日志文件或实时监控日志文件的更新。

### 如何使用 tail 命令？

使用 `tail` 命令非常简单。你只需在终端中输入 `tail`，并指定要查看内容的文件名。

基本语法：

```shell
tail [选项参数] 文件名
```

同样，`tail` 也可以指定多个文件，如果指定了多个文件，那么会在显示的每个文件内容前面加上文件名来加以区分。

### 举例说明

依旧在 `/opt/games/gta6` 目录下，现在有一个 `readme.txt` 的文本文件，我们想查看该文件的尾部内容，那么可以在终端输入以下命令：

```shell
tail readme.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234247.png)

默认输出显示 10 行的尾部内容。

指定多个文件：

```shell
tail show.txt readme.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234250.png)

### 常用选项参数

- `-n`：指定要显示的尾部行数。
- `-f`：（follow）持续跟踪显示文件尾部最新的内容，比如你查看日志文件的时候，当日志发生变化，就能实时看到日志的输出显示。

#### 例子

1. 指定显示文件尾部 20 行的内容

```shell
tail -n 20 readme.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230612234252.png)

2. 持续跟踪文件尾部最新内容

```shell
tail -f sys-user.log
```

一般这样就会跟踪 `sys-user.log` 日志文件的尾部最新的内容，我们就能看到会持续输出的日志。

**不过，目前这样只能输出尾部 10 行的内容，跟踪也只能看 10 行，我们想看更多行怎么办呢？**一般在查看日志的时候，日志的输出是比较多的，我一般是跟踪 1000 行，那么可以在终端输入：

```shell
tail -1000f sys-user.log
```

这样，就能够指定跟踪尾部最新的 1000 行的内容了！

## 总结

现在，相信聪明的你已经掌握了这两个命令了！你可以开始在终端中尝试使用 `cat` 和 `tail` 命令，自己捣鼓玩玩！掌握 `cat` 和 `tail` 命令的基本用法和常见选项参数，将使我们更加高效地查看相关文件的内容。

这里需要注意的是这两个命令都有 `-n` 参数，`cat` 的 `-n` 是用来**显示行号**的，而 `tail` 的 `-n` 是用来指定**显示多少行**的。

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**