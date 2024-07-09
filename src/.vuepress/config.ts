import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Java知识体系宝库",
  description: "致力于打造 Java 后端完整的知识体系，持续更新中...",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
