# 原创艺术品交易平台 · 演示站

买家侧的静态演示站,Astro 5 构建,无后端。

## 开发

```bash
npm install
npm run dev
```

## 构建与部署

```bash
npm run build     # 输出到 dist/
```

纯静态,不需要后端,也不需要环境变量。任意静态托管均可。

- 构建命令:`npm run build`
- 输出目录:`dist`
- Node 20+

## 目录

```
src/
  pages/        路由（Astro 文件路由，目录即 URL）
  layouts/      页面骨架
  components/   站点组件
  scripts/      客户端交互
  lib/
    data/       作品与艺术家数据
    art/        作品图的生成与绘制
    catalog.ts  筛选、分面计数、排序、搜索
  styles/       设计变量与基础样式
```

其他命令:`npm test`、`npm run preview`、`npx tsc --noEmit -p tsconfig.json`。

## 许可

版权所有 © 2026 NorthernDream,保留所有权利。详见 [LICENSE](LICENSE)。
