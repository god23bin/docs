---
# 这是文章的标题
title: 8. find 和 grep 命令
# 这是页面的图标
# icon: command
# 这是侧边栏的顺序
order: 8
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

大家好，我是 god23bin。欢迎来到《**一分钟学一个 Linux 命令**》系列，**每天只需一分钟，记住一个 Linux 命令不成问题**。今天需要你花两分钟时间来学习下，因为今天要介绍的是两个常用的搜索命令：`find` 和 `grep` 命令。

## find

### 什么是 find 命令？

`find` 命令用于在指定的目录下搜索文件和目录。它提供了丰富的搜索条件和选项，可以根据文件名、文件类型、文件大小、修改时间等属性进行搜索。`find` 命令通常用于查找特定文件或根据条件进行批量操作。

find命令通常进行的是从根目录 `/` 开始的全盘搜索，所以不要在高峰时期使用 `find` 命令。

### 如何使用 find 命令？

`find` 命令的使用相对较复杂，但掌握了基本语法后，你就能灵活使用它。

基本语法：

```shell
find 目录路径 [选项参数] [搜索条件]
```

- 目录路径：指定要查找的目录路径。
- 选项参数：用于指定匹配条件，例如文件名、类型。
- 搜索条件：用于指定要搜索的文件和目录，满足这个条件的就会被搜索出来。

### 举例说明

假设我们想找到在 `/opt/games` 目录下所有以 `.txt` 扩展名结尾的文件，则可以使用以下命令：

```shell
find /opt/games -name "*.txt"
```

这将在 `/opt/games` 目录及其子目录中搜索所有以 `.txt` 结尾的文件，并将它们列出。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000047.png)

如果要在当前目录及其子目录中查找所有以 `.txt` 结尾的文本文件，则可以使用以下命令：

```shell
find . -name "*.txt"
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000044.png)

### 常用选项参数

- `-name`：按文件名进行匹配。
- `-type`：按文件类型进行匹配。
- `-size`：按文件大小进行匹配。
- `-user`：按文件所属用户进行匹配。
- `-mtime`：（modified）按文件最后内容的修改时间进行匹配。
- `-perm`：（permission）按文件权限进行匹配。
- `-exec`：（execute）对搜索的结果执行命令。

#### 例子

1. 搜索 `/home` 目录及其子目录中包含 `god23bin` 结尾的目录和文件：

```shell
find /home -name "*god23bin*"
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000052.png)

2. 搜索 `/opt/games` 目录下的所有类型为目录的文件（注意：**目录也是一种特殊的文件**）

```shell
find /opt/games -type d
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000054.png)

`-type` 后面可以使用的类型：

- `d`：目录
- `f`：文件
- `l`：符号链接（软链接）

3. 查找 `/boot` 目录及其子目录下所有大小大于 1MB 的文件：

```shell
find /boot -size +1M
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000057.png)

`-size` 后面的搜索条件写法：

- `-100c`：小于 100B 的文件

- `+10k`：大于 10KB 的文件
- `-5M`：小于 5MB 的文件
- `+2G`：大于 2GB 的文件
- 以此类推，`-` 表示小于，`+` 表示大于，或者直接指定大小

> `-size [+-]size[cwbkMG]`：按文件大小查找，支持使用 `+` 或 `-` 表示大于或小于指定大小，单位可以是 `c`（字节）、`w`（字数）、`b`（块数）、`k`（KB）、`M`（MB）或 `G`（GB）

4. 查找 `/home` 目录及其子目录下所有属于 god23bin 这个用户的文件（目录）：

```shell
find /home -user god23bin
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000059.png)

5. 搜索 `/opt` 目录及其子目录下最近 7 天内发生过修改的文件（目录）：

```shell
find /opt -mtime -7
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615223137.png)

`-7` 代表 7 天内，那么自然而然，`+7` 代表 7 天之前：

```shell
find /opt -mtime +7
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615215823.png)

> `-mtime [+-]days`：按修改时间查找，支持使用 `+` 或 `-` 表示在指定天数前或后，days 是一个整数表示天数。

### 按权限进行匹配

这里先说下，`-perm` 后面的内容使用数字或符号来表示文件权限，举个例子 `/u+rw`，这里的 `/u` 表示用户（所有者）权限，`rw` 表示具有读写权限，中间的 `+` 用来表示「具有」

> 还有其他几个字母：`/g`，组（group）权限；`/o`，（other）其他用户权限；`/a`，（all）所有用户权限。
>
> 读写可执行：`r`（read），`w`（write），`x`（execute）
>
> `-` 表示没有：比如 `/u-rw`，指用户没有读写权限

1. 搜索当前目录及其子目录下所有具有读写权限的文件（目录）：

```shell
find /opt -perm /u+rw
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000105.png)

2. 搜索当前目录及其子目录下其他用户具有读写权限的目录：

```shell
find /opt -type d -perm /o+rw
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000107.png)

### 对搜索的结果执行命令

`-exec` 选项参数可以对搜索到的结果执行特定的命令。

1. 搜索 `/opt/games/gta6` 目录下的所有 txt 文件，将这些文件复制到 `/opt/games/gta6/backup` 目录下：

```shell
find /opt/games/gta6 -name "*.txt" -exec cp {} /opt/games/gta6/backup \;
```

> 注意：`-exec` 参数需要使用 `\;` 作为命令的结尾

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615221553.png)

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615222617.png)

2. 删除 `/opt/games/gta6/backup` 目录下匹配的 txt 文件：

```shell
find /opt/games/gta6/backup -name "*.txt" -exec rm {} \;
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615222731.png)

3. 给大家们猜猜这是什么意思：

```shell
find ~/autofunctions -name "auto*.sh" -exec nohup bash {} &
```

> 猜不出也没关系，后面再来学！

## grep

### 什么是 grep 命令？

`grep` 命令是 `global regular expression print` 的缩写，用于在文件、多个文件或输入流中进行正则匹配，它会匹配我们在命令行中指定的「文本模式」（Pattern），并将结果输出打印。

换句话说，它会按我们提供的文本模式去搜索文件的内容。

### 如何使用 grep 命令？

`grep` 命令的使用非常简单，你只需在终端中输入 `grep`，并指定要搜索的模式和文件名。

基本语法：

```shell
grep [选项参数] 文本模式 文件名
```

### 举例说明

现在我们在 `opt/games/gta6` 目录下，有一个名为 `readme.txt` 的文件，像搜索里面包含关键字 "`VI`" 的行，那么可以使用以下命令：

```shell
grep "VI" readme.txt
```

这将在文件中查找包含 "`VI`" 的行，并将其打印输出。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000111.png)

当然，文本模式可以不用加双引号，也是可行的：

```shell
grep VI readme.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000113.png)

### 常用选项参数

- `-i`：（ignore）忽略大小写进行匹配。
- `-n`：（number）显示匹配行的行号。
- `-v`：（reverse）反向匹配，打印不包含模式的行。
- `-r`：（recursive）递归搜索指定目录及其子目录下的文件。

#### 例子

1. 在 `readme.txt` 中搜索 "`vi`"，忽略大小写：

```shell
grep -i "vi" readme.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000116.png)

2. 在 `readme.txt` 中搜索 `http` ，显示所在的行号：

```shell
grep -n http readme.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000118.png)

3. 在 `show.txt` 中进行反向匹配，打印不包含文本模式 “`我`” 的行：

```shell
grep -v 我 show.txt
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000121.png)

4. 当前目录及其子目录中递归搜索包含关键字 `go` 的行：

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000123.png)

### 在标准输入流中搜索指定模式

> [Linux 中的标准输入输出、重定向、管道符-简书](https://www.jianshu.com/p/4ff1d7f2e4bd)

基本写法：

```shell
command | grep pattern
```

这里，`command` 是生成输出的命令，`pattern` 是要搜索的模式，`|` 是管道符，可以将两个命令分隔开，`|`左边命令的输出就会作为 `|` 右边命令的输入

比如在读取 `show.txt` 的时候搜索 `god23bin`：

```shell
cat show.txt | grep god23bin
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230615000127.png)

这种用法，我一般是在大量日志输出中想找到错误信息的时候会用到：

```shell
tail -2000f project-test.log | grep -i error
```

## 搜索中使用单引号、双引号的区别

有读者问我，说单引号双引号的区别？

这个问的很好阿！没区别，基本上你要搜索的内容，可以用单引号、双引号，给引起来，也可以不用。 除非你搜索的内容比如有特殊的符号，比如空格，这时候就需要引号给整个内容给引起来，可以是单引号也可以是双引号：

```shell
grep "i love you" file.txt

grep 'i love you' file.txt
```

当然，如果你要搜索的内容包含了单引号，那么就需要用双引号引起来，比如搜索 `i love 'you'`：

```shell
grep "i love 'you' " file.txt
```

对于 `find` 也是，搜索文件或目录，引号也是没区别的，比如：

```shell
find . -name dir
等价于
find . -name 'dir'
等价于 
find . -name "dir"
```

## 总结

现在，通过两分钟的快速学习，相信你已经学费了 `find` 和 `grep` 命令的基本使用了！

`find` 主要用于搜索文件和目录，而 `grep` 命令主要用于搜索文件的内容。当然，这里实际上还只是冰山一角，剩下的交给你去探索吧！

如果你对其他 Linux 命令也感兴趣，敬请期待我后续的文章。谢谢大家的阅读！

## 最后的最后

**希望各位屏幕前的**`靓仔靓女们`**给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**

