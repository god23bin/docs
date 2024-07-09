import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/demo/",
  "/knowledge-system",

  {
    text: "计算机基础",
    icon: "laptop-code",
    prefix: "/computer-basic/",
    children: [
      {
        text: "数据结构与算法",
        icon: "snowflake",
        link: "dsa"
      },
      // {
      //   text: "算法",
      //   icon: "code",
      //   prefix: "algorithm/",
      //   children: ["sort", "search", "other"],
      // },
      {
        text: "操作系统",
        icon: "window-restore",
        link: "os"
      },
      {
        text: "计算机网络",
        icon: "wifi",
        link: "cn"
      },
      {
        text: "数据库",
        icon: "database",
        link: "db"
      },
      {
        text: "计算机组成原理",
        icon: "laptop",
        link: "ca"
      }
    ]
  },

  {
    text: "Java",
    icon: "mug-hot",
    prefix: "/java/",
    children: [
      {
        text: "Java 基础",
        link: "java-basic"
      },
      {
        text: "Java 集合",
        link: "java-collection"
      },
      {
        text: "Java IO",
        link: "java-io"
      },
      {
        text: "Java 并发",
        link: "java-concurrent"
      },
      {
        text: "Java 新特性",
        link: "java-new-features"
      },
      {
        text: "Java Web",
        link: "java-web"
      },
      {
        text: "Java 虚拟机",
        link: "java-virtual-machine"
      }
    ]
  },

  {
    text: "框架 | 中间件",
    icon: "mountain",
    prefix: "/framework/",
    children: [
      {
        text: "SSM",
        prefix: "ssm",
        children: [
          {
            text: "MyBatis",
            icon: "m",
            link: "mybatis"
          },
          {
            text: "Spring",
            icon: "leaf",
            link: "spring"
          },
          {
            text: "Spring MVC",
            icon: "leaf",
            link: "springmvc",
          }
        ]
      },
      {
        text: "分布式与微服务",
        prefix: "distributed-and-microservice",
        children: [
          {
            text: "Spring Boot",
            icon: "leaf",
            link: "springboot"
          },
          {
            text: "Spring Cloud",
            icon: "leaf",
            link: "springcloud"
          },
          {
            text: "Dubbo",
            icon: "d",
            link: "dubbo"
          }
        ]
      },
      {
        text: "安全/权限认证框架",
        prefix: "security",
        children: [
          {
            text: "Shiro",
            icon: "s",
            link: "shiro"
          },
          {
            text: "Spring Security",
            icon: "s",
            link: "springsecurity"
          },
          {
            text: "Sa-Token",
            icon: "s",
            link: "satoken"
          }
        ]
      },
      {
        text: "消息中间件",
        prefix: "message",
        children: [
          {
            text: "RabbitMQ",
            icon: "r",
            link: "rabbitmq"
          },
          {
            text: "RocketMQ",
            icon: "rocket",
            link: "rocketmq"
          },
          {
            text: "Kafka",
            icon: "bowling-ball",
            link: "kafka"
          }
        ]
      },
      {
        text: "缓存中间件",
        prefix: "cache",
        children: [
          {
            text: "Redis",
            icon: "registered",
            link: "redis",
          }
        ]
      },
      {
        text: "定时任务调度框架",
        prefix: "schedule",
        children: [
          {
            text: "Quartz",
            icon: "clock",
            link: "quartz"
          },
          {
            text: "Xxl-Job",
            icon: "clock",
            link: "xxljob"
          },
          {
            text: "Elastic-Job",
            icon: "clock",
            link: "elasticjob"
          }
        ]
      },
      {
        text: "搜索引擎",
        prefix: "search-engine",
        children: [
          {
            text: "Elasticsearch",
            icon: "e",
            link: "elasticsearch"
          }
        ]
      },
      {
        text: "日志框架",
        prefix: "log",
        children: [
          {
            text: "Log4j",
            icon: "l",
            link: "log4j"
          },
          {
            text: "Logback",
            icon: "l",
            link: "logback",
          }
        ]
      },
      {
        text: "网络通信框架",
        prefix: "network",
        children: [
          {
            text: "Netty",
            icon: "n",
            link: "netty",
          }
        ]
      },
    ]
  },

  {
    text: "架构与设计",
    icon: "server",
    prefix: "/architecture-and-design/",
    children: [
      {
        text: "设计模式",
        icon: "pen-ruler",
        link: "design-pattern"
      },
      {
        text: "分布式系统",
        icon: "server",
        link: "distributed-system"
      },
      {
        text: "微服务系统",
        icon: "server",
        link: "microservice-system"
      }
    ]
  },

  {
    text: "部署 | 工具",
    icon: "compass",
    prefix: "/deploy-and-tool/",
    children: [
      {
        text: "Linux",
        prefix: "linux",
        children: [
          {
            text: "Linux 基础",
            icon: "l",
            link: "linux-basic"
          },
          {
            text: "Linux 进阶",
            icon: "l",
            link: "linux-advance"
          },
          {
            text: "一分钟学一个 Linux 命令",
            icon: "l",
            link: "linux-command",
          }
        ]
      },
      {
        text: "版本控制",
        prefix: "version-control",
        children: [
          {
            text: "Git",
            icon: "code-compare",
            link: "git"
          },
          {
            text: "Svn",
            icon: "s",
            link: "svn"
          },
        ]
      },
      {
        text: "Web 服务器",
        prefix: "server",
        children: [
          {
            text: "Tomcat",
            icon: "cat",
            link: "tomcat"
          },
          {
            text: "Nginx",
            icon: "n",
            link: "nginx"
          }
        ]
      },
      {
        text: "项目管理",
        prefix: "project",
        children: [
          {
            text: "Maven",
            icon: "m",
            link: "maven"
          }
        ]
      },
      {
        text: "容器",
        prefix: "container",
        children: [
          {
            text: "Docker",
            icon: "d",
            link: "docker"
          },
          {
            text: "Kubernetes",
            icon: "k",
            link: "kubernetes"
          }
        ]
      },
      {
        text: "CI|CD",
        icon: "cicd",
        prefix: "cicd",
        children: [
          {
            text: "Jenkins",
            icon: "j",
            link: "jenkins"
          },
        ]
      },
      {
        text: "内网穿透",
        icon: "pierce",
        prefix: "pierce",
        children: [
          {
            text: "Ngrok",
            icon: "n",
            link: "ngrok"
          },
        ]
      },
    ]
  },

  {
    text: "随笔记录",
    icon: "book",
    link: "record",
  },

  {
    text: "面试",
    icon: "face-smile",
    link: "interview",
  },

  {
    text: "AI汇总",
    icon: "toolbox",
    link: "ai",
  },

  {
    text: "收藏",
    icon: "collection",
    link: "collection",
  }

  // {
  //   text: "指南",
  //   icon: "lightbulb",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "lightbulb",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "lightbulb",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
