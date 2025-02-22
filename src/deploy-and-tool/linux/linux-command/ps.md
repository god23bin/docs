---
# 这是文章的标题
title: 9. ps 命令
# 这是页面的图标
# icon: command
# 这是侧边栏的顺序
order: 9
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

大家好，我是 god23bin。欢迎来到《**一分钟学一个 Linux 命令**》系列，**每天只需一分钟，记住一个 Linux 命令不成问题**。今天要说的是 `ps` 命令。

## 什么是 ps 命令？

`ps` 的英文全称是 `process status`，意思是进程状态。

`ps` 命令是一个常用的 Linux 命令，用于查看当前系统中运行的进程信息。它提供了关于进程的各种详细信息，如进程 ID（PID）、进程状态、CPU 使用情况、内存占用、运行时间等。

## 如何使用 ps 命令？

`ps` 命令的基本语法如下：

```shell
ps [选项参数]
```

可以通过添加不同的选项来获取不同类型的进程信息。

直接输入 `ps`，显示当前进程：

```shell
ps
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618231448.png)

输出结果包含 4 列信息：PID、TTY、TIME、CMD

- PID：（Process ID）唯一的进程 ID
- TTY：（Teletypewriter）它指的是终端类型或终端设备，用于用户与计算机进行交互的输入输出设备，例如终端窗口或控制台。
- TIME：进程运行过程中占用 CPU 的总时间（以分钟和秒为单位），简单理解就是 CPU 运行这个进程消耗的时间。
- CMD：启动进程的命令的名称

有时候当我们执行 `ps` 命令时，TIME 显示为 `00:00:00`。这意味着该进程尚未使用 CPU ，所以没有 CPU 执行的总时间。

对于上面的 `bash`，就是这种情况，因为 `bash` 只是其他需要借助 `bash` 运行的进程的父进程，所以它本身并没有使用 CPU，也就没有 CPU 执行时间了。

上面的输出实际上不是很有用，因为它包含的信息不多。一般我们都是加上参数的。

## 举例说明

以下是一些常用的 `ps` 命令示例：

1. 显示所有正在运行的进程：

```shell
ps -e
```

该命令等价于 `ps -A`，这里的 `e` 和 `A` 分别是 `every` 和 `all` 的意思，所以等价。

2. 显示与终端无关的所有进程：

我们打开一个新的终端，在新的终端中输入 `man ps`，接着我们回到原来的终端，输入以下命令：

```shell
ps -a
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618232131.gif)

输出显示：

```shell
   PID TTY          TIME CMD
 23290 pts/1    00:00:00 man
 23301 pts/1    00:00:00 less
 23324 pts/0    00:00:00 ps
```

> 注意：`pst/1 ` 表示一个伪终端（pseudo-terminal），同理 `pst/0` 也是，0 和 1 只是终端的索引，当开启多个窗口时，将递增下去。

现在我们就可以在终端 0 看到终端 1 的进程了（man 命令和 less 命令的进程）

## 常用选项参数

以下是一些常用的 `ps` 命令选项参数：

- `-e`：（every）显示所有进程，而不仅仅是当前用户的进程
- `-u`：（user）显示面向用户的进程的详细信息，如进程所有者、CPU 使用率、内存使用率等
- `-f`：（full-format）以全格式的列表显示进程的信息，包括进程之间的层级关系
- `-p`：（pid）查找具有指定进程 ID 的进程
- `-C`：（Command）查找具有指定命令名称的进程
- `-aux`：以详细格式显示所有正在运行的进程，其中 `x` 指的是在没有控制终端的情况下列出进程，这些显示的主要是启动并运行在后台的进程

### 例子

1. 显示所有进程信息：

```shell
ps -e
```

这将显示所有进程的信息，无论是当前用户的还是其他用户的。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618232135.png)

2. 显示进程的详细信息：

```shell
ps -u
```

该命令将显示进程的详细信息，包括进程所有者、CPU 使用率、内存使用率等。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618232138.png)

可以看到输出更多列了，每列的意思是这样的：

- USER：进程所有者的用户名
- PID：进程的唯一标识符，即进程 ID
- %CPU：进程使用的 CPU 资源的百分比
- %MEM：进程使用的内存资源的百分比
- VSZ：（Virtual Memory Size）进程的虚拟内存大小（以 KB 为单位）
- RSS：（Resident Set Size）进程占用的物理内存大小（以 KB 为单位）
- TTY：进程所关联的终端
- STAT：进程的状态（例如，R 表示运行，S 表示睡眠，Z 表示僵尸（Zombie）等）
- START：进程启动的时间
- TIME：进程运行过程中占用 CPU 的总时间
- COMMAND：启动进程的命令名称

3. 显示进程之间的层级关系：

```shell
ps -f
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618232141.png)

- UID：进程所有者的用户 ID
- PID：进程的唯一 ID
- PPID：（Parent Process ID）父进程的标识符
- C：与 `%CPU` 的意思相同，进程使用的 CPU 资源的百分比，或者说进程的 CPU 使用率
- STIME：与 `START` 的意思相同，进程启动的时间
- TTY：与进程相关联的终端
- TIME：进程运行过程中占用 CPU 的总时间
- CMD：启动进程的命令名称

我们可以通过 `-ef` 来查看更多的进程的信息：

```shell
ps -ef
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618232144.png)

4. 查找具有指定进程 ID 的进程：

```shell
ps -p PID
```

将 `PID` 替换为要查找的进程的实际进程 ID。这将显示具有指定进程 ID 的进程的信息。

比如现在我知道了一个进程的 PID 是 `1333`，想看详细信息，那么可以输入：

```shell
ps -p 1333 -f
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618232147.png)

5. 查找具有指定命令名称的进程：

```shell
ps -C command_name
```

将 `command_name` 替换为要查找的进程的命令名称。这将显示具有指定命令名称的进程的信息。

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618232149.png)

## ps 与其他命令一起使用

ps 可以通过管道符 `|` 和其他命令结合使用。

比如要将 `ps` 命令的输出，将这些输出通过管道交给 `grep` 命令进行匹配，找到我们想要的进程，起到一个过滤输出显示结果的作用，比如像找到属于 `root` 用户的进程，就可以输入：

```shell
ps -ef | grep root
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618232151.png)

想找到 `bash` 命令的进程，那么就可以输入：

```shell
ps -ef | grep bash
```

![](https://pic-bed-of-god23bin.oss-cn-shenzhen.aliyuncs.com/img/20230618232153.png)

## 总结

`ps` 命令的使用，相信你通过这一分钟的学习已经掌握了，这是个很常用的命令，它有很多选项，但实际上，我们平常一般只用到 `ps -aux` 或者 `ps -ef` 来查看相关的正在运行的进程信息，或者当某些情况下想要找到某个进程，定位某个进程，就会使用 `ps -ef | grep 进程名或者命令名` 来进行匹配定位。

以上就是 `ps` 命令的基本内容，希望本文能够帮助大家更好地理解和应用 `ps` 命令。如果你对其他 Linux 命令也感兴趣，敬请期待我后续的文章。谢谢大家的阅读！

## 最后的最后

**希望各位屏幕前的靓仔靓女们给个三连！你轻轻地点了个赞，那将在我的心里世界增添一颗明亮而耀眼的星！**

**咱们下期再见！**