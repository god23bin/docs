---
# 这是文章的标题
title: 5. mv 和 cp 命令
# 这是页面的图标
# icon: command
# 这是侧边栏的顺序
order: 5
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

大家好，我是god23bin。欢迎来到《**一分钟学一个 Linux 命令**》系列，今天需要你花两分钟时间来学习下，因为今天要讲的是两个命令，`mv` 和 `cp` 命令。

## mv

### 什么是 mv 命令？

`mv` 是英文单词 `move` 的缩写，顾名思义，可以用来移动东西，那么移动什么呢？答案就是可以**移动文件或目录**，将其从一个位置移到另一个位置。当然，它还能给**文件或目录重命名**。

`mv` 是一个非常强大且常用的命令，可以帮助我们在文件系统中对文件和目录进行灵活的操作。

### 如何使用 mv 命令？

`mv` 命令的基本语法如下：

```shell
mv 源文件或目录 目标文件或目标位置
```

其中，`源文件或目录` 是要移动或重命名的文件或目录的路径，`目标文件或目标位置` 是文件或目录要被重命名为的新名称，或者是文件或目录要被移动到的位置。

### 举例说明

1. 移动文件到指定目录：

```shell
mv car.ini /opt/games/gta6/model
```

执行上述命令后，`car.ini` 将被移动到 `/opt/games/gta6/model` 目录中。

![image-20230605234851188](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230607230457.png)

2. 重命名指定的文件：

```shell
mv car.ini boat.ini
```

执行上述命令后，`car.ini` 的名称将被更改为 `boat.ini`。

![image-20230605235242894](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230607230503.png)

3. 移动目录到指定位置：

现在我们回到 `opt/games/gta6` 目录下，一次性创建多级目录 `config/env/64bit`，接着在 `64bit` 目录中创建一个 `64bit.conf` 文件。现在，我们就可以移动整个 `config` 目录了。

```shell
mv config model
# 当然还可以是绝对路径，下面这句也可以
mv config /opt/games/gta6/model
```

执行上述命令后，将目录 `config` 整个目录移动到了 `/opt/games/gta6/model` 目录中了。

![image-20230606000428202](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230607230509.png)

4. 重命名目录：

```shell
mv config config4gta6
```

执行上述命令后，将目录 `config` 的名称更改为 `config4gta6`。

![image-20230606001030542](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230607230513.png)

### 常见选项参数

- `-i`：覆盖目标文件前询问用户是否确认。
- `-f`：强制执行移动或重命名操作，当发生覆盖时是不进行确认提示，就不会询问是否覆盖，简而言之，强制覆盖。
- `-u`：当源文件比目标文件的创建时间更加新时，才执行覆盖操作

以下是一些示例：

```shell
mv -i file.txt /path/to/destination/
mv -f old_file.txt new_file.txt
mv -u directory /path/to/destination/
```

通过使用这些选项参数，我们可以根据需要更好地控制 `mv` 命令的行为。

## cp

### 什么是 cp？

`cp` 是英文单词 `copy` 的缩写（可不是 `couple` 噢），用于复制文件和目录。它是一个常用且功能强大的命令，可以帮助我们在文件系统中创建副本或者说备份文件。

### 如何使用 cp 命令？

`cp` 命令的语法如下：

```shell
cp 源文件或目录 目标文件或目标位置
```

其中，`源文件或目录` 表示要复制的文件或目录的路径，`目标文件或目标位置` 表示复制后的文件或目录路径。

可以发现，基本和 `mv` 命令很像。

### 举例说明

1. 复制文件到指定位置

要复制文件，只需使用 `cp` 命令并提供源文件的路径以及目标文件的路径即可。复制文件时，会创建一个与源文件内容相同的新文件，并将其保存到目标位置。

```shell
cp 源文件 目标位置
```

例如，在 `/opt/games/gta6/model` 目录下，将文件 `boat.ini` 从当前目录复制到目标目录 `/opt/games/gta6/model/objs/`：

```shell
cp boat.ini /opt/games/gta6/model/objs/
```

![image-20230607224123210](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230607230521.png)

复制过去的同时也可以重新命名新文件名，例如将 `boat.ini` 命名为 `boat2.ini`：

```shell
cp boat.ini /opt/games/gta6/model/objs/boat2.ini
```

2. 复制目录到指定位置

`cp` 命令也可以用于复制目录及其内容。要复制整个目录，可以使用 `-r` 或 `--recursive` （递归拷贝复制）选项。

```shell
cp -r 源目录 目标位置
```

例如，在 `/opt/games/gta6/model` 目录下，将目录 `config4gta6` 复制到目标目录 `/opt/games/gta6/model/objs/`：

```shell
cp -r config4gta6 /opt/games/gta6/model/objs/
```

![image-20230607225024606](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230607230527.png)

3. 强制覆盖文件

如果目标位置已经存在同名文件，`cp` 命令默认会询问是否覆盖。可以使用 `-f` 选项来强制覆盖目标文件而不进行询问。

```shell
cp -f boat.ini /opt/games/gta6/model/objs/boat2.ini
```

![image-20230607230057234](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230607230534.png)

## 总结

通过两分钟的学习，我们学到了 `mv` 和 `cp` 命令的基本用法，并通过举一些例子来加深印象。

其中，`mv` 命令可以用于移动或重命名文件和目录，是一个非常实用的命令。掌握了 `mv` 命令，我们可以更方便地管理文件和目录的位置和名称。而  `cp` 命令也是类似的，使用 `cp` 复制文件和目录，帮助我们进行文件的复制和备份操作。

现在，相信你聪明的你已经学会了！希望本文能够帮助大家更好地理解和应用 `mv` 和 `cp` 命令。如果你对其他 Linux 命令也感兴趣，敬请期待我后续的文章。谢谢大家的阅读！

## 最后的最后

**希望各位屏幕前的靓仔靓女们给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**