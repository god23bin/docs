---
# 这是文章的标题
title: 1. ls 命令
# 这是页面的图标
# icon: command
# 这是侧边栏的顺序
order: 1
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-01-01
# 一个页面可以有多个分类
category:
  - Linux 命令
# 一个页面可以有多个标签
tag:
  - 展示
  - 列出
  - 显示
  - 命令
---

## 前言

大家好，我是 god23bin。今天我给大家带来的是 Linux 命令系列，**每天只需一分钟，记住一个 Linux 命令不成问题**。今天，我们要介绍的是一个常用而又强大的命令：ls（list）。

## 什么是 ls 命令？

`ls` 命令来自英文单词 `list`，动词意思译为「列出」。

`ls` 命令用于列出指定目录中的文件和子目录及其属性信息，是最常被使用到的 Linux 命令之一。它可以帮助我们查看当前目录下的内容，提供了多种选项参数，可以以不同的方式显示文件和目录的详细信息。

## 如何使用 ls 命令？

使用 `ls` 命令非常简单，只需要在终端中键入 `ls`，并指定要列出内容的目录路径。执行该命令后，终端将显示该目录下的文件和子目录的列表。

默认不添加任何参数的情况下，`ls` 命令会列出当前工作目录中的文件信息，常与 `cd` 或 `pwd` 命令搭配使用，十分方便，这两个命令下两期讲~

## 举例说明

假设我们当前的工作目录是 `/home/god23bin/Documents`，我们可以在终端中输入以下命令：

```shell
ls
```

执行该命令后，终端将显示当前目录下的所有文件和子目录的列表：

```shell
directory  file.txt  follow-god23bin  god23bin.txt
```

这表示在 `/home/god23bin/Documents` 目录下，存在两个文件 `file.txt` 和 `god23bin.txt`，以及两个子目录 `directory` 和 `follow-god23bin`。

> 便于读者参考学习，我这里进行截图，后续也都将如此，便不再述说

![image-20230529222700323](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230529230830.png)

## 常用选项参数

ls命令还提供了多种选项参数，可以以不同的方式显示文件和目录的信息。以下是一些常用的选项参数：

- `-a`：显示所有文件，包括以 `.` 开头的隐藏文件。
- `-l`：以长格式显示文件和目录的详细信息，包括权限、所有者、大小等。
- `-h`：与 `-l` 选项一起使用，以人类可读的方式显示文件大小。
- `-R`：递归地列出目录及其子目录中的所有文件和目录。
- `-t`：按照修改时间排序，最新修改的文件或目录显示在前面。
- `-F`：在文件名后面添加标识符，以区分文件类型，例如添加 `/` 表示目录，添加 `*` 表示可执行文件。
- `-A`：不显示当前目录和父目录

### 例子

1. 显示当前目录下的所有文件和子目录：

```shell
ls
```

输出：

```shell
directory  file.txt  follow-god23bin  god23bin.txt
```

2. 显示当前目录（.）下的所有文件和子目录，**包括隐藏文件、当前目录的父目录**（..）：

```shell
ls -a
```

输出：

```shell
.  ..  directory  file.txt  follow-god23bin  god23bin.txt  .hiddenfile  .love
```

> `.` 符号表示当前目录，`..` 表示父目录，即上一级目录
>
> `.` 开头的文件是隐藏文件

3. 以长格式显示当前目录下的文件和子目录的详细信息：

```shell
ls -l
```

输出：

```shell
drwxr-xr-x. 2 root root    6 May 29 22:23 directory
-rw-r--r--. 1 root root 1341 May 29 22:49 file.txt
drwxr-xr-x. 2 root root    6 May 29 22:21 follow-god23bin
-rw-r--r--. 1 root root  103 May 29 22:47 god23bin.txt
```

> 显示的单位是字节，比如 `directory` 目录（属于特殊文件）和 `follow-god23bin` 目录的大小是 6 个字节，而 `file.txt` 文件大小是 1341 个字节，`god23bin.txt` 文件大小是 103 个字节。

4. 以人类可读的方式显示当前目录下的文件和子目录的详细信息：

```shell
ls -lh
```

输出：

```shell
drwxr-xr-x. 2 root root    6 May 29 22:23 directory
-rw-r--r--. 1 root root 1.4K May 29 22:49 file.txt
drwxr-xr-x. 2 root root    6 May 29 22:21 follow-god23bin
-rw-r--r--. 1 root root  103 May 29 22:47 god23bin.txt
```

> 显示的单位是字节， `file.txt` 文件大小不再显示 1341 而是显示 1.4 K，即 1.4 KB

5. 递归地列出当前目录及其子目录中的所有文件和目录：

```shell
ls -R
```

输出：

```shell
.:
directory  file.txt  follow-god23bin  god23bin.txt

./directory:
file1.txt  subdirectory1

./directory/subdirectory1:

./follow-god23bin:
learn.txt  subdirectrory2
```

6. 按照修改时间排序，显示当前目录下的文件和子目录：

```shell
ls -t
```

输出：

```shell
follow-god23bin  directory  file.txt  god23bin.txt
```

7. 在文件名后面添加标识符，以区分文件类型：

```shell
ls -F
```

输出：

```shell
directory/  file.txt  follow-god23bin/  god23bin.txt
```

8. 不显示当前目录（.）和父目录（..）：

```shell
ls -A
```

输出：

```shell
directory  file.txt  follow-god23bin  god23bin.txt  .hiddenfile  .love
```

以上演示了 `ls` 命令的一些常见用法和选项参数。

现在，你掌握了吗？相信你肯定掌握了 `list` ，列出，`ls` 命令。

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**