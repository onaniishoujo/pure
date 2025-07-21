---
title: '如何使用Toga制作奇怪的安卓App'
publishDate: '2024-03-22 21:03:52'
description: ''
tags:
  - Python
  - Toga
category: Code
draft: false
---

使用Python的Toga框架，快速制作一些"奇怪的"安卓App

~~比如给某位幸运的同学做个 同城约*~~  ~~哈哈哈哈~~

## 安装框架

```bash
pip install briefcase
```

## 新建项目

```bash
briefcase new
```

## 编写代码

在`src`目录中找到`app.py`，这里给一个插入图片的示例，图片文件要放在`src/应用名/resources`目录下

```python
import toga
from toga.style import Pack
from toga.style.pack import COLUMN
from toga.images import Image

class MyApp(toga.App):
    def startup(self):
        main_box = toga.Box(style=Pack(direction=COLUMN))

        image = Image('./resources/hi.jpg')
        image_view = toga.ImageView(image, style=Pack(flex=1))
        main_box.add(image_view)

        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = main_box
        self.main_window.show()

def main():
    return MyApp()
```

## 打包Apk

```bash
briefcase create android
briefcase build android
```

到这里会打包一个Apk，这个时候就可以安装了

```bash
briefcase package android
```

上面这个命令会生成一个`.aab`文件，个人感觉没什么用

### ~~发给某幸运儿~~

~~然后就被骂了哈哈哈哈哈哈~~

这里还有一个展示html页面的代码，Windows11测试通过，安卓没试过

```python
import toga

class MyApp(toga.App):
    def startup(self):
        webview = toga.WebView()
        web=r"""<h1>这里放你的html内容</h1>"""
        webview.set_content("example.com", web)

        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = webview
        self.main_window.show()

def main():
    return MyApp()
```

