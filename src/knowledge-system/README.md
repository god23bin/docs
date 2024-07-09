---
title: 知识体系一览
index: false
icon: brain
tags:
  - 知识体系
date: 2023-11-24 17:34:24
# 填入 false 会禁用侧边栏 https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#navbar
sidebar: false
---

[[toc]]

## 计算机基础

- [x] 数据结构与算法
- [x] 计算机网络
- [x] 操作系统
- [ ] 计算机组成原理

## 软件工程

- [ ] 软件开发原则
- [ ] 设计模式
- [ ] 敏捷开发
- [ ] UML
- [ ] 软件测试

## 数据库

### 关系型数据库

- [x] MySQL
- [ ] Oracle

### 非关系型数据库

- K-V 存储
  - [x] Redis
- 文档数据库
  - [ ] MongoDB
- 列式数据库
  - [ ] HBase
- 全文搜索引擎
  - [ ] ElasticSearch

## Linux

- [ ] 一分钟学会一个 Linux 命令

## Java

- [x] Java 基础
- [x] Java 集合
- [ ] Java IO
- [x] Java 并发
- [ ] Java 网络编程
- [x] Java 虚拟机
- [ ] Java 新版本特性
  - [x] Java 8 新特性
  - [ ] Java 11 新特性
  - [ ] Java 17 新特性


## 基础框架

### Java 开发框架

- [x] Spring Framework
- [x] Spring MVC
- [x] Spring Boot

### ORM 框架

- [x] MyBatis
- [x] Spring Data JPA

## 高并发/高性能

> 高并发关注单位时间能够处理的请求数量（QPS），高性能关注单个请求的处理时间，高性能系统必然能够支撑高并发的，这俩概念以及涉及到的技术不是很好分开来，这里就归为一类了~
>
> 以下分类 部分参考 《从零开始学架构 - 李运化》

### 缓存

- [x] 分布式缓存：Redis
- [ ] 本地缓存：Caffeine

### 消息队列

- [x] Apache Kafka
- [ ] Apache RabbitMQ
- [ ] Apache RocketMQ

### 池化技术

- [ ] 数据库连接池：Driud
- [x] 线程池

### 存储高性能：读写分离 and 分库分表

- [ ] MyCat
- [ ] Apache ShardingSphere

### 计算高性能

- [ ] 单机高性能：网络编程模型
- [ ] 集群高性能：负载均衡

## 分布式

### 分布式理论

- [x] CAP 理论
- [x] Base 理论

### 分布式一致性算法

- [x] 一致性 Hash 算法
- [x] Paxos 算法
- [x] Raft 算法
- [ ] ZAB 算法

### 分布式事务

- 基本方案
  - [x] 2PC
  - [x] 3PC
  - [x] TCC
- 分布式事务框架
  - [ ] Seata
  - [ ] ByteTCC
  - [ ] TCC-transaction

### 分布式 ID 生成

### 分布式锁

### 分布式 RPC 框架

- [ ] Dubbo
- [ ] gRPC
- [ ] thrift

### 分布式协调服务（注册中心）

- [ ] Zookeeper
- [ ] Eureka

### 分布式定时任务

- [ ] Quartz
- [ ] XXL-JOB
- [ ] Elastic-job (当当网)

### 分布式配置中心

- [ ] Spring Cloud Config
- [ ] Alibaba Nacos
- [ ] Ctrip Apollo

### 分布式搜索引擎

- [ ] ElasticSearch
- [ ] Soir

### 分布式日志收集

- [ ] Elastic Stack
- [ ] Loki

### 分布式网关

- [ ] Spring Cloud GateWay
- [ ] Netflix Zuul
- [ ] Kong

## 高可用

> 以下分类参考 《从零开始学架构 - 李运化》

### 存储高可用

- [ ] 主备复制
- [ ] 主从复制
- [ ] 主备倒换与主从倒换
- [ ] 主主复制
- [ ] 数据集群
- [ ] 数据分区

### 计算高可用

- [ ] 主备
- [ ] 主从
- [ ] 对称集群
- [ ] 非对称集群

### 业务高可用

- 系统级的故障应对方案
  - [ ] 异地多活
- 接口级的故障应对方案
  - [ ] 熔断和降级
    - [ ] Netflix Hystrix
  - [ ] 限流
  - [ ] 排队

## 微服务

- [x] 分布式和微服务的区别
- [ ] Spring Cloud Netflix
- [ ] Sprint Cloud Alibaba

## 其他中间件

### Web Server

> 关于 Application Server 和 HTTP Server 的区别可以参考 [https://www.zhihu.com/question/32212996](https://www.zhihu.com/question/32212996)

- Application Server
  - [ ] Apache Tomcat
- HTTP Server
  - [ ] Nginx
  - [ ] Apache HTTP Server

### 权限认证

- [ ] Spring Security
- [ ] Shiro

### 数据库中间件

- [ ] MySQL binlog 增量订阅 & 消费组件：Canal

### 网络通信框架

- [ ] Netty

## 工具

### Java 集成开发环境 (IDE)

- [x] IntelliJ IDEA
- [x] Eclipse

### 项目管理

- [ ] Maven
- [ ] Gradle

### 版本控制

- [ ] Git
- [ ] SVN

### 容器

- [ ] Docker
- [ ] K8s