---
title: '使用Cloudflare Pages搭建图床'
publishDate: '2024-02-08 23:10:56'
description: ''
tags:
  - Code
  - Cloudflare
category: Code
draft: false
---

> ⚠️警告⚠️
>
> `pages.dev`域名被移动运营商屏蔽，请谨慎使用！

使用`Cloudflare Pages`搭建图床

除了图床也可以放各种各样的文件

限制：

- 最多100个`pages.dev`域名

- 每月最多部署500次

- 每个`Cloudflare Pages`最多20000个文件，单个文件最大`25 MiB`

## 使用方法

1. 新建Git仓库，上传你的文件

   在仓库根目录中新建一个`_headers`文件，内容如下

   ```
   /*
     Access-Control-Allow-Origin: *
   ```

   注意：最好把`Access-Control-Allow-Origin: *`中的`*`替换为你的网站URL

   不替换就是所有人都能跨域访问

2. 新建一个`Cloudflare Pages`，选择上面仓库的某个分支并部署

   此时你就得到了一个图床

