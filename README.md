# Jiraya

[TOC]

# 🏠架构
- react
  - react@16.9.0
- jsx:
  - es6、7、8
- syntax compiler:
  - @babel/core@7.5.5
  - babel-loader@8.0.6
- css:
  - 全局less变量注入 sass-resource-loader
  - less\sass
- bundle:
  - webpack@4.39.1
- language:
  - typescript@3.5.3

---

# Run in development

``` bash
#
yarn proxy dev

#
yarn proxy production

#
yarn test

```

---

# Make a release
_多环境打包使用 `+` 分割_

```bash
# 打包 📦 npm run build
yarn build test

# 多环境
yarn build uat+production

```

---
