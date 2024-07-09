import { sidebar } from "vuepress-theme-hope";

// 导出侧边栏对象
export default sidebar({
  // "/": [
  //   "",
  //   {
  //     text: "案例",
  //     icon: "laptop-code",
  //     prefix: "demo/",
  //     link: "demo/",
  //     children: "structure",
  //   },
  //   {
  //     text: "文档",
  //     icon: "book",
  //     prefix: "guide/",
  //     children: "structure",
  //   },
  //   "slides",
  // ],

  "/computer-basic/dsa/": [
    {
      text: "数据结构与算法",
      icon: "snowflake",
      prefix: "",
      link: "/computer-basic/dsa/",
      children: "structure"
    },
  ],

  "/computer-basic/os/": [
    {
      text: "操作系统",
      icon: "os",
      prefix: "",
      children: "structure"
    },
  ],

  "/computer-basic/cn/": [
    {
      text: "计算机网络",
      icon: "network",
      prefix: "",
      children: "structure"
    },
  ],

  "/computer-basic/db/": [
    {
      text: "数据库",
      icon: "database",
      prefix: "",
      children: "structure"
    },
  ],

  "/computer-basic/ca/": [
    {
      text: "计算机组成原理",
      icon: "computer",
      prefix: "",
      children: "structure"
    },
  ],

  "/java/java-basic": "structure",

  "/java/java-web": "structure",

  "/framework/ssm/spring/": [
    {
      text: "Spring",
      icon: "leaf",
      prefix: "",
      children: "structure"
    },
  ],

  "/framework/security/shiro/": [
    {
      text: "Shiro",
      icon: "s",
      prefix: "",
      children: "structure"
    },
  ],

  "/framework/schedule/quartz/": [
    {
      text: "Quartz",
      icon: "q",
      prefix: "",
      children: "structure"
    },
  ],

  // "/ssm/spring": "structure",

  // "/securtity/shrio/": "structure",

  // "/schedule/quartz": "structure",


  // 一分钟学一个 Linux 命令的侧边栏
  // "/linux/linux-command": "structure",
  "/deploy-and-tool/": "structure",

  "/record/": "structure",
});
