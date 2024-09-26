<div align="center">
  <h1>watermark-lite</h1>
  <span>💻 A lightweight watermark plugin</span>
</div>

<br>

[![github stars][github-stars-src]][github-stars-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Xiaohe / [github@xiaohe0601](https://github.com/xiaohe0601) / [gitee@xiaohe0601](https://gitee.com/xiaohe0601)

### 🎉 Features

- 🪶 Lightweight and easy-to-use API design

- 🖌️ Rich customization options

- 🔐 Monitors DOM behavior and automatically rebuilds the watermark

- 🧀 Full support for TypeScript

- 👌 No framework restrictions

### 🚁 Installation

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

### 🛹 Usage

#### Basic Usage

```ts
import { Watermark } from "watermark-lite";

const wm = new Watermark();

// Display the watermark
wm.mount({
  text: "watermark text"
});

// To modify the watermark text or style, just call the `mount` method again
wm.mount({
  text: "modified watermark text"
});

// Remove the watermark
wm.unmount();
```

#### Custom Watermark Style

```ts
wm.mount({
  text: "watermark text",
  fontSize: "14px",
  fontFamily: "inherit",
  color: "#000000",
  opacity: 0.15,
  angle: 15
});
```

#### Custom Watermark Parent Element

By default, the watermark is mounted under `document.body`. You can change the parent element using the `parentEl`
parameter, which supports passing in an element id or `HTMLElement`

```ts
wm.mount({
  text: "watermark text",
  parentEl: "app"
});
```

#### About Single-Page Applications

For single-page applications, make sure to call the `unmount` method at the appropriate time
to avoid repeated listeners and potential memory leaks

```ts
// The following is an example using Vue3, but the plugin itself is not limited to any framework

import { onBeforeUnmount, onMounted } from "vue";
import { Watermark } from "watermark-lite";

const wm = new Watermark();

onMounted(() => {
  wm.mount({
    text: "watermark text"
  });
});

onBeforeUnmount(() => {
  wm.unmount();
});
```

#### Configuration Options

| Parameter    | Description                                         | Type                   | Default           |
|--------------|-----------------------------------------------------|------------------------|-------------------|
| el           | watermark element id                                | string                 | watermark         |
| text         | watermark text                                      | string                 | default watermark |
| x            | watermark starting x-coordinate (px)                | number                 | `0`               |
| y            | watermark starting y-coordinate (px)                | number                 | `0`               |
| rows         | number of watermark rows                            | number                 | auto-calculated   |
| cols         | number of watermark columns                         | number                 | auto-calculated   |
| xGap         | watermark x-axis spacing (px)                       | number                 | `50`              |
| yGap         | watermark y-axis spacing (px)                       | number                 | `50`              |
| zIndex       | `z-index` of the watermark                          | number / string        | `99999`           |
| itemIdPrefix | prefix for watermark item ids                       | string                 | watermark-item    |
| itemWidth    | width of the watermark item (px)                    | number                 | `100`             |
| itemHeight   | height of the watermark item (px)                   | number                 | `100`             |
| fontSize     | watermark font size                                 | string                 | 14px              |
| fontFamily   | watermark font                                      | string                 | inherit           |
| color        | watermark text color                                | string                 | #000000           |
| opacity      | watermark opacity (range: `0` ~ `1`)                | number                 | `0.15`            |
| angle        | watermark angle (range: `0` ~ `360`)                | number                 | `15`              |
| parentEl     | parent element for watermark                        | string / `HTMLElement` | `document.body`   |
| monitor      | monitor watermark changes and automatically rebuild | boolean                | `true`            |

#### Type Definitions

> See [jsdocs.io](https://www.jsdocs.io/package/watermark-lite)

### 🐶 Discussion & Communication

- ❓：For questions or bug feedback, you can submit an [issues](https://github.com/xiaohe0601/watermark-lite/issues)
  and PRs are welcome~
- 📫：[xiaohe0601@outlook.com](mailto:xiaohe0601@outlook.com)
- 🐧：Not yet available

### 🏆 License

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