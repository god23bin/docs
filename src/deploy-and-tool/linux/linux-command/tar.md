---
# 这是文章的标题
title: 6. tar 命令
# 这是页面的图标
# icon: command
# 这是侧边栏的顺序
order: 6
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

大家好，我是 god23bin。今天给大家带来的是 Linux 命令系列，**每天只需一分钟，记住一个 Linux 命令不成问题**。今天，我们要介绍的是一个常用且强大的命令：tar。

## 什么是 tar 命令？

`tar` 是 `tape archive` 的缩写，意思是磁带归档，归档可以视为存档。`tar` 命令网上很多都提到，它是一个压缩命令，为什么会这样说呢？

实际上，它是用于创建和提取 tar 归档文件的，最初的设计就是用于将多个文件打包到磁带上进行备份。随着时间的推移，`tar` 命令已经扩展到处理文件和目录的归档和压缩。

`tar` 命令之所以常被称为压缩命令，是因为它通常与压缩算法结合使用，可以在创建归档时对文件进行压缩，以减小归档文件的大小。这种结合使用压缩算法的方式是出于效率和存储空间的考虑，尤其在处理大量文件或传输文件时特别有用。压缩算法通常是通过选项来指定的。在常见的 `tar` 命令中，使用 `-z` 选项表示使用 `gzip` 压缩算法，`-j` 选项表示使用 `bzip2` 压缩算法，而 `-Z` 选项表示使用 `compress` 压缩算法。这些压缩算法可以有效地减小文件的大小，并在需要时进行解压缩还原。所以，现在的 `tar` 命令在许多场景中不仅用于创建和提取归档文件，还常用于压缩和解压缩文件。

## 如何使用 tar 命令？

`tar` 命令的基本语法如下：

```shell
tar [选项参数] 归档文件名 文件/目录名
```

其中，`选项参数` 是可选的，用于指定 `tar` 命令的不同操作。`归档文件名` 是要创建或提取的归档文件的名称。`文件/目录名` 是要打包或提取的文件或目录的名称。

### 创建归档文件

要创建归档文件，可以使用 `-c` 选项并指定要创建的归档文件的名称，然后提供要打包的文件或目录的名称。

`c` 代表 `create`，意味着创建一个新的归档文件来保存指定的文件和目录。使用 `-c` 参数时，通常需要结合 `-f` 参数指定存档文件的名称。`f` 代表 `file`，表示后面紧跟着的参数是存档文件的名称。例如，`-f archive.tar` 指定了归档文件为 `archive.tar`。

```shell
tar -c -f 归档文件.tar 文件/目录
```

举个例子，现在我们在 `/opt/games/gta6` 目录下有一个 crack 目录，我们想将 `crack` 目录归档，保存一下，那么就可以要创建名一个为 `crack.tar` 的归档文件并打包  `crack` 目录，可以执行以下命令：

```shell
tar -c -f crack.tar crack
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230609234409.png)

### 提取（解压）归档文件

要从归档文件中提取文件或目录，可以使用 `-x` 选项并指定要提取的归档文件的名称。

`x` 代表 `extract`，表示从存档文件中提取归档的文件和目录。使用 `-x` 参数时，通常需要结合 `-f` 参数指定要提取的存档文件的名称。

```shell
tar -x -f 归档文件.tar
```

现在，我们把上一步创建的归档文件移动到 `model` 目录下再进行提取，提取所有文件和目录，可以执行以下命令：

```shell
tar -x -f crack.tar
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230609234413.png)

### 压缩归档文件

`tar` 命令还支持将归档文件与压缩算法结合使用以减小文件大小。常见的压缩算法包括 gzip (`-z`)、bzip2 (`-j`) 和 xz (`-J`)。

```shell
tar -c -z -f 归档文件.tar.gz 文件/目录
tar -c -j -f 归档文件.tar.bz2 文件/目录
tar -c -J -f 归档文件.tar.xz 文件/目录
```

现在，我们想要把 `config4gta6` 归档并且压缩，分别使用这 3 种算法压缩，那么可以分别创建名为 `config4gta6.tar.gz` 的 gzip 压缩归档文件、`config4gta6.tar.bz2` 的 bzip2 压缩归档文件和 `config4gta6.tar.xz` 的 xz 压缩归档文件，并打包目录 `config4gta6`，现在就可以依次执行以下命令：

```shell
tar -c -z -f config4gta6.tar.gz config4gta6
tar -c -j -f config4gta6.tar.bz2 config4gta6
tar -c -J -f config4gta6.tar.xz config4gta6
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230609234421.png)

### 解压归档文件

现在是有了 3 个压缩的归档文件了，那么如何解压呢？聪明的你肯定知道了，就是使用 `-x` 选项参数。现在我们先将这 3 个压缩归档文件移动到当前的 `crack` 目录下，在 `crack` 目录中进行解压。

```shell
# 移动 3 个压缩文件到 crack 目录
mv config4gta6.tar.gz config4gta6.tar.bz2 config4gta6.tar.xz crack
```

接着我们可以根据压缩的算法选择用哪个参数来解压，就是通过 `-x` 与 `-z` 或 `-j` 或 `-J` 配合使用。

直接解压 gzip 压缩归档文件到当前目录：

```shell
tar -x -z -f config4gta6.tar.gz
```

解压 bzip2 压缩归档文件到指定目录，配置选项参数 `-C`（大写字母 C，是 Change directory 的缩写，表示改变目录）来指定目录：

```shell
tar -x -j -f config4gta6.tar.bz2 -C /opt/games/gta6/model/crack/bz2dir/
```

解压 xz 压缩归档文件到指定目录：

```shell
tar -x -J -f config4gta6.tar.xz -C xzdir/
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230609234425.png)

### 显示归档文件内容

要查看归档文件中的内容，可以使用 `-t` 选项并指定归档文件的名称。`-t ` 列出存档文件中的内容（list）

```shell
tar -t -f 归档文件.tar
```

我们现在就看看归档的内容，以最开始的 `crack.tar` 为例：

```shell
tar -t -f crack.tar
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230609234428.png)

对于有使用压缩算法压缩的归档文件，也是一样的用法。

```shell
tar -t -f config4gta6.tar.gz
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230609234432.png)

### 其他常用选项

除了上述基本用法，`tar` 命令还提供了许多其他选项，用于执行各种操作和控制归档文件的行为。以下是一些常用的选项：

- `-v`：（verbose，详细的）显示详细输出，列出打包或提取的每个文件的名称。
- `-C`：（Change directory）切换到指定目录后再执行操作，在 `tar` 命令中，一般就是解压的时候，配合这个 -C，可以让我们将文件解压到其他指定的目录中。
- `-u`：（update）仅将较新的文件添加到存档文件中。

## 选项参数的先后顺序

在 `tar` 命令中，选项参数的先后顺序通常没有特定的规定。你可以根据需要灵活地组合和排列选项参数。

还有一些通用的惯例需要知道，这样可以帮助我们更好地使用选项参数：

1. 通常情况下，选项参数以连字符 `-` 开头，例如 `-c`, `-x`, `-v` 等。
2. 单个字母的选项参数可以组合在一起，形成一个选项字符串。例如，`-cvf` 表示同时启用 `-c`, `-v`, `-f` 这三个选项。
3. 选项参数的顺序可能会影响命令的行为。例如，使用 `-f` 选项指定文件名时，应该确保 `-f` 出现在文件名之前，以便正确识别文件名。
4. 一些选项参数可能需要后面紧跟着参数值。例如，`-f` 选项需要指定后面的文件名，例如 `-f archive.tar.gz`。

## 总结

`tar` 最初是 tape archive（磁带归档）的简称，并且在早期主要用于磁带备份，但现在它已经成为一种常见的文件处理工具，可以创建、提取和管理归档文件，并结合压缩算法实现文件的压缩和解压缩功能。

现在，相信聪明的你已经学会了 `tar` 命令！

希望本文能够帮助大家更好地理解和应用 `tar` 命令。如果你对其他 Linux 命令也感兴趣，敬请期待我后续的文章。谢谢大家的阅读！

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**