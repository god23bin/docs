---
# 这是文章的标题
title: 4. mkdir 和 touch 命令
# 这是页面的图标
# icon: command
# 这是侧边栏的顺序
order: 4
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

大家好，我是god23bin。欢迎来到《**一分钟学一个 Linux 命令**》系列，今天需要你花两分钟时间来学习下，因为今天要讲的是两个命令，`mkdir` 和 `touch` 命令。前一个命令是操作目录的，后一个命令是操作文件的。

> 建议学完手敲一篇加深记忆噢！

## mkdir

### 什么是 mkdir 命令？

`mkdir` 是 `make directory` 的缩写，顾名思义，创建目录（文件夹）。无论是在日常工作还是在编写脚本时，创建新的目录都是一项基础而重要的操作。`mkdir` 命令允许我们在任意位置创建新的目录。

### 如何使用 mkdir 命令？

使用 `mkdir` 命令非常简单，只需要在终端输入 `mkdir`，后面紧跟要创建的目录的名称就可以创建一个目录了。执行该命令后，系统会在当前工作目录下创建一个新的目录。

**基本语法：`mkdir 目录名`**

以下是一个示例：

```shell
mkdir gta6
```

执行上述命令后，系统将在当前工作目录下创建一个名为 `gta6` 的新目录。

![image-20230604233337726](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002806.png)

### 举例说明

让我们通过一些具体示例来更好地理解 `mkdir` 命令的使用。

1. 创建多个目录：

```shell
mkdir dir1 dir2 dir3
```

执行上述命令后，将在当前目录下创建三个目录，分别为`dir1`、`dir2`和`dir3`。

![image-20230604233805532](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002810.png)

### 常用选项参数

`-p`：递归创建目录，如果父目录不存在则一并创建。

`-m`：创建目录的同时设置权限。

#### 例子

1. 递归创建目录，即创建多级目录，不存在的目录也会一并创建。

假设当前所在目录是 `/opt/games`，则我们为 `gta6` 目录创建一个多级的子目录：

```shell
mkdir -p gta6/model/objs
```

使用`-p`选项参数，`mkdir`命令可以创建多级目录。上述命令将在`/home/user/documents/linux`路径下创建一个名为`commands`的新目录。如果路径中的某个目录不存在，系统会自动创建相应的目录。

![image-20230604234411712](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002816.png)

2. 创建具有特定权限的目录：

```shell
mkdir -m 700 importance
```

使用`-m`选项参数，我们可以为新创建的目录指定特定的权限。上述命令将在当前工作目录下创建一个名为`public`的新目录，并将其权限设置为`755`。

![image-20230604234923473](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002818.png)

## touch

### 什么是 touch 命令？

`touch` 命令是一个简单而实用的命令，通过 `touch` 命令，我们可以创建一个新的空文件，或者修改现有文件的访问时间、修改时间或创建时间。

**可能有的人会注意到，touch 不是触碰的意思吗？为什么会是创建一个新的文件呢？创建不应该是 create 吗？或者为什么不是 make file 这样类似 make directory 呢？**

我也是有这个疑惑的，综合网上的说法，结论大致是这样的：

> [为什么linux 创建文件是touch 而不是create - 思否](https://segmentfault.com/q/1010000020867399)

![image-20230605003912359](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605004434.png)

### 如何使用 touch 命令？

使用起来也是很简单，基本语法如下：

```shell
touch 文件名
```

执行该命令后，系统会在当前工作目录下创建一个空的文件了。

![image-20230604235539025](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002821.png)

### 举例说明

让我们通过一些示例来更好地理解 `touch` 命令的使用。

1. 创建多个文件：

```shell
touch f1.txt f2.txt f3.txt
```

![image-20230605000037672](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002823.png)

2. 修改文件的时间戳：

```shell
touch -c f1.txt
```

执行上述命令后，将修改 `file.txt` 文件的访问时间和修改时间为当前时间。如果文件不存在，则不创建新文件。

我们可以通过 `stat 文件名.文件类型` 查看一个文件的创建时间、访问时间、修改时间：

```shell
stat f1.txt
```

输出：

```shell
  File: ‘f1.txt’
  Size: 0               Blocks: 0          IO Block: 4096   regular empty file
Device: 803h/2051d      Inode: 103291361   Links: 1
Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)
Context: unconfined_u:object_r:usr_t:s0
Access: 2023-06-05 00:01:37.087062955 +0800
Modify: 2023-06-05 00:01:37.087062955 +0800
Change: 2023-06-05 00:01:37.087062955 +0800
 Birth: -
```

Access 表示访问时间，Modify 表示修改时间，Change 表示状态改动时间（简单理解，就是文件发生改变时的时间）

![image-20230605001058851](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002825.png)

> 关于 Linux 下文件的时间，可以看这里：[Linux下文件的三种时间标记：访问时间、修改时间、状态改动时间](https://www.cnblogs.com/Cccarl/p/6994372.html)

### 常用选项参数

`touch` 命令还提供了一些常用的选项参数，用于进一步控制其行为。以下是一些常用选项参数及其示例：

- `-a`：仅修改文件的访问时间，由于修改了文件的访问时间，所以状态改动时间也会跟着更新。

  ```shell
  touch -a f1.txt
  ```

![image-20230605001541851](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002828.png)

- `-m`：仅修改文件的修改时间，同理，状态改动时间也会跟着更新。

  ```shell
  touch -m f1.txt
  ```

![image-20230605001902786](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002830.png)

- `-r`：根据参考文件的时间戳修改文件的时间戳。

  ```shell
  touch -r reference.txt file.txt
  ```

![image-20230605002203192](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230605002832.png)

## 总结

通过本文的介绍，我们学习了 `mkdir` 命令和 `touch` 命令在 Linux 中的作用和使用方法。

`mkdir` 命令允许我们快速创建新的目录，方便组织和管理文件。我们学会了基本的使用方法，包括在当前工作目录下创建目录、创建多级目录（即使不存在也创建）和设置权限并创建目录。

`touch` 命令用于创建空文件或修改文件的时间戳，是一个非常实用的命令。还有我们可以通过 `stat 文件名.文件类型` 来查看一个文件的时间戳。

现在，相信你聪明的你已经学会了！希望本文能够帮助大家更好地理解和应用 `mkdir` 和 `touch` 命令。如果你对其他 Linux 命令也感兴趣，敬请期待我后续的文章。谢谢大家的阅读！

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**