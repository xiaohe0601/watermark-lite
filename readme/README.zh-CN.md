<div align="center">
  <h1>watermark-lite</h1>
  <span>💻 一个轻量级水印插件</span>
</div>

<br>

[![github stars][github-stars-src]][github-stars-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

小何 / [github@xiaohe0601](https://github.com/xiaohe0601) / [gitee@xiaohe0601](https://gitee.com/xiaohe0601)

[English](../README.md) | 简体中文

### 🎉 特性

- 🪶 轻量化，简单易用的API设计

- 🖌️ 丰富的自定义配置项

- 🔐 监听DOM行为，自动重建水印

- 🧀 全面支持TypeScript

- 👌 无框架限制

### 🚁 安装

#### PNPM

``` shell
pnpm add watermark-lite
```

#### YARN

``` shell
yarn add watermark-lite
```

#### NPM

``` shell
npm install watermark-lite
```

### 🛹 使用

#### 简单使用

```ts
import { Watermark } from "watermark-lite";

const wm = new Watermark();

// 显示水印
wm.mount({
  text: "水印文字"
});

// 如果需要修改水印文字或者样式，再次调用 `mount` 方法即可
wm.mount({
  text: "修改后的水印文字"
});

// 去除水印
wm.unmount();
```

#### 自定义水印样式

```ts
wm.mount({
  text: "水印文字",
  fontSize: "14px",
  fontFamily: "inherit",
  color: "#000000",
  opacity: 0.15,
  angle: 15
});
```

#### 自定义水印挂载父元素

水印默认挂载到 `document.body` 下，通过 `parentEl` 参数可以修改水印挂载父元素，支持传入元素id或者 `HTMLElement`

```ts
wm.mount({
  text: "水印文字",
  parentEl: "app"
});
```

#### 关于单页面应用

单页面应用需要在合适的时机调用 `unmount` 方法以防止重复监听以及内存泄漏风险

```ts
// 下面以Vue3举例，但是插件本身不局限于任何框架

import { onBeforeUnmount, onMounted } from "vue";
import { Watermark } from "watermark-lite";

const wm = new Watermark();

onMounted(() => {
  wm.mount({
    text: "水印文字"
  });
});

onBeforeUnmount(() => {
  wm.unmount();
});
```

#### 配置项

| 参数           | 说明                       | 类型                     | 默认值               |
|--------------|--------------------------|------------------------|-------------------|
| el           | 水印元素id                   | string                 | watermark         |
| text         | 水印文字                     | string                 | default watermark |
| x            | 水印起始位置x坐标（单位：px）         | number                 | `0`               |
| y            | 水印起始位置y坐标（单位：px）         | number                 | `0`               |
| rows         | 水印行数                     | number                 | 自动计算              |
| cols         | 水印列数                     | number                 | 自动计算              |
| xGap         | 水印x轴间距（单位：px）            | number                 | `50`              |
| yGap         | 水印y轴间隔（单位：px）            | number                 | `50`              |
| zIndex       | 水印的 `z-index`            | number / string        | `99999`           |
| itemIdPrefix | 水印子项id前缀                 | string                 | watermark-item    |
| itemWidth    | 水印子项宽度（单位：px）            | number                 | `100`             |
| itemHeight   | 水印子项高度（单位：px）            | number                 | `100`             |
| fontSize     | 水印字体大小                   | string                 | 14px              |
| fontFamily   | 水印字体                     | string                 | inherit           |
| color        | 水印文字颜色                   | string                 | #000000           |
| opacity      | 水印透明度（取值范围：`0` ~ `1`）    | number                 | `0.15`            |
| angle        | 水印倾斜角度（取值范围：`0` ~ `360`） | number                 | `15`              |
| parentEl     | 水印挂载父元素                  | string / `HTMLElement` | `document.body`   |
| monitor      | 是否监听水印改变并自动重建            | boolean                | `true`            |

#### 类型定义

> 请查看 [jsdocs.io](https://www.jsdocs.io/package/watermark-lite)

### 🐶 讨论交流

- ❓：若有疑问或BUG反馈，可提交[issues](https://github.com/xiaohe0601/watermark-lite/issues)，也欢迎PR~
- 📫：[xiaohe0601@outlook.com](mailto:xiaohe0601@outlook.com)
- 🐧：暂未开通

### 🏆 开源协议

- MIT [LICENSE](./LICENSE)

<!-- Badges -->

[github-stars-src]: https://img.shields.io/github/stars/xiaohe0601/watermark-lite?style=flat&colorA=080f12&colorB=1fa669&logo=GitHub

[github-stars-href]: https://github.com/xiaohe0601/watermark-lite

[npm-version-src]: https://img.shields.io/npm/v/watermark-lite?style=flat&colorA=080f12&colorB=1fa669

[npm-version-href]: https://npmjs.com/package/watermark-lite

[npm-downloads-src]: https://img.shields.io/npm/dm/watermark-lite?style=flat&colorA=080f12&colorB=1fa669

[npm-downloads-href]: https://npmjs.com/package/watermark-lite

[bundle-src]: https://img.shields.io/bundlephobia/minzip/watermark-lite?style=flat&colorA=080f12&colorB=1fa669&label=minzip

[bundle-href]: https://bundlephobia.com/result?p=watermark-lite

[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669

[jsdocs-href]: https://www.jsdocs.io/package/watermark-lite

[license-src]: https://img.shields.io/github/license/xiaohe0601/watermark-lite.svg?style=flat&colorA=080f12&colorB=1fa669

[license-href]: https://github.com/xiaohe0601/watermark-lite/blob/main/LICENSE