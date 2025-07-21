---
title: '魔改Hexo Fluid'
publishDate: '2023-10-05 20:23:53'
description: ''
tags: 
  - Hexo
  - Fluid
category: Code
draft: false
---
整理一下本少女在使用hexo fluid时用到的代码  

## 视频Banner

将`themes/fluid/layout/_partials/header/banner.ejs`修改为以下内容：

``` html
<%
var banner_img = page.banner_img || theme.index.banner_img
var banner_img_height = parseFloat(page.banner_img_height || theme.index.banner_img_height)
var banner_mask_alpha = parseFloat(page.banner_mask_alpha || theme.index.banner_mask_alpha)
var subtitle = page.subtitle || page.title
%>

<div id="banner" class="banner" style="background: url('<%- url_for(banner_img) %>') no-repeat center center; background-size: cover;">
  <video autoplay loop muted playsinline poster="<%- url_for(banner_img) %>"
         style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
    <source src="[你的视频背景地址]" type="video/mp4">
  </video>
  <div class="full-bg-img">
    <div class="mask flex-center" style="background-color: rgba(0, 0, 0, <%= parseFloat(banner_mask_alpha) %>)">
      <div class="banner-text text-center fade-in-up">
        <div class="h2">
          <% if(theme.fun_features.typing.enable && in_scope(theme.fun_features.typing.scope)) { %>
            <span id="subtitle" data-typed-text="<%= subtitle %>"></span>
          <% } else { %>
            <span id="subtitle"><%- subtitle %></span>
          <% } %>
        </div>

        <% if (is_post()) { %>
          <%- inject_point('postMetaTop') %>
        <% } %>
      </div>

      <% if (theme.scroll_down_arrow.enable && theme.scroll_down_arrow.banner_height_limit <= banner_img_height && page.layout !== '404') { %>
        <div class="scroll-down-bar">
          <i class="iconfont icon-arrowdown"></i>
        </div>
      <% } %>
    </div>
  </div>
</div>
```

## 添加自定义字体

1. 通过自定义CSS引入字体

```css
@font-face {
  font-family: 'FontName';  /*换成你自己的字体名及路径*/
  src: url('/font/font.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
```

2. 修改`Blog/_config.fluid.yml`

```yaml
font:
  font_size: 18px   # 按需要自定义
  font_family: FontName  # 换成你自己的字体名
  letter_spacing: 0.02em
  code_font_size: 85%
```

## 添加网页背景图片
1. 使用自定义CSS实现  
用上面的方法添加自定义CSS
```css
body {
  background: url(/img/background.jpg);  /*换成你自己的背景图*/
  background-attachment: fixed;
  background-size: cover;  
}
```
可以使用图片的api，个人感觉会拖慢加载速度  

## 复制变色
自定义CSS添加以下内容  
```css
::selection {
    color: #66ccff; /* 设置选中文字的颜色 */
    background: transparent; /* 设置选中文字的背景为透明 */
}
```

## Banner图随网页滑动变透明

Hexo Fluid，随着网页的滑动，Banner图会逐渐变透明  
打字机也会变透明  

自定义js
```javascript
// 获取图片元素
var image = document.getElementById("banner");
var targetDistance = 695; // 设置滑动695px后完全透明
window.addEventListener("scroll", function() {
  var scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var opacity = 1 - (scrollDistance / targetDistance);
  if(opacity < 0) {
    opacity = 0;
  }
  image.style.opacity = opacity.toString();
});
```
或者根据滑动网页的百分比减少不透明度
```javascript
var image = document.getElementById("banner");
var pageHeight = document.body.scrollHeight - window.innerHeight;
window.addEventListener("scroll", function() {
  var scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var opacity = 1 - (scrollDistance / pageHeight);
  if(opacity < 0) {
    opacity = 0;
  } else if(opacity > 1) {
    opacity = 1;
  }
  image.style.opacity = opacity.toString();
});
```
设置banner的淡出样式
```css
#banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

## 文章中代码的字体及背景色

自定义CSS添加以下内容
```css
.markdown-body code {
    tab-size: 4;
    background-color: rgb(251 253 83 / 50%);
    transition: background-color 0.2s ease-in-out;
    font-family: "FontName";  /*改为你自己的字体名*/
}
```
- `background-color`用于设置背景色
- `font-family`用于设置字体

## 滚动条

自定义CSS

``` css
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: #e58a8a;
    background-image: -webkit-linear-gradient( 45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, transparent 75%, transparent);
    border-radius: 2em;
}

::-webkit-scrollbar-corner {
    background-color: transparent;
}

::-moz-selection {
    color: #fff;
    background-color: #e58a8a;
}
```

## 网格背景
两种方法，推荐第一种

### 使用自定义CSS实现  
- ~~代码是从[Gridzzly.com](https://gridzzly.com)抄的~~  
- 推荐为暗色模式进行适配 ~~不然根本看不清~~  
1. 新建CSS文件(不要通过自定义CSS导入)
```css
#board {
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%226mm%22%20height%3D%226mm%22%20viewPort%3D%220%200%205mm%205mm%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%3Cline%20x1%3D%220mm%22%20y1%3D%225mm%22%20x2%3D%226mm%22%20y2%3D%225mm%22%20stroke-width%3D%220.3mm%22%20stroke%3D%22%23d4d4d4%22%2F%3E%20%3Cline%20x1%3D%225mm%22%20y1%3D%220mm%22%20x2%3D%225mm%22%20y2%3D%226mm%22%20stroke-width%3D%220.3mm%22%20stroke%3D%22%23d4d4d4%22%2F%3E%20%3C%2Fsvg%3E");
    background-position: 2px 2px;
}
```

2. 引入CSS  
```html
<link id="custom-css" rel="stylesheet" type="text/css" href="/css/divback.css">
```
建议通过Hexo注入器进行引入

3. 修改`Blog\themes\fluid\layout\_partials\header\navigation.ejs` 目前是第62行，为了给a标签绑定`onclick="toggleCSS()"`
```html navigation.ejs
<a class="nav-link" target="_self" href="javascript:;" aria-label="Color Toggle" onclick="toggleCSS()">
```

4. 导入自定义js
```javascript
function toggleCSS() {
      var linkElement = document.getElementById("custom-css");
      if (linkElement.disabled) {
        linkElement.disabled = false; // 启用CSS文件
      } else {
        linkElement.disabled = true; // 禁用CSS文件
      }
    }
```

### 使用Pattern.css实现  
1. 在`layout.ejs`引入`Pattern.css`
```html
<link href="https://unpkg.com/pattern.css" rel="stylesheet">
```

2. 将`layout.ejs`和`post.ejs`两个文件中的`<div id="board"`(没有向右的尖括号)改为`<div id="board" class="pattern-dots-xl"`(以.pattern-dots-xl为例，可以自己修改class的内容)


## 关于Hexo Fluid的评论

因为出了一点Bug，本站的评论通过修改`Blog/themes/fluid/layout/post.ejs`实现。  
将`post.ejs`中的`<%- inject_point('postComments') %>`替换为 你使用的评论系统 提供的html代码  
以Utterance为例:

```html
<script src="https://utteranc.es/client.js"
        repo="用户名/仓库地址"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

## 关于网站图标

在`_config.fluid.yml`设置没反应，手动将网页图标重命名为`favicon.ico`，复制到`public`文件夹下

## 关于Valine

测试时发现LeanCloud提供的域名会屏蔽中国大陆的访问...  
绑定自己的域名后就能正常访问...  

在LeanCloud的`设置-域名绑定`选项绑定自己的子域名，然后在子域名的DNS上设置`CNAME`记录，解析到LeanCloud提供的域名，之后配置Valine时,使用绑定的子域名  

~~不想打字了~~

## Hitokoto及出处
原版只能显示`hitokoto`(正文)部分，不能显示`from`(出处)部分
1. 修改`themes\fluid\layout\_partials\plugins\typed.ejs`替换为如下内容  
```js
<% if(theme.fun_features.typing.enable && in_scope(theme.fun_features.typing.scope) && page.subtitle !== false) { %>
  <%- js_ex(theme.static_prefix.typed, '/typed.min.js') %>
  <script>
    (function (window, document) {
      var typing = Fluid.plugins.typing;
      var subtitle = document.getElementById('subtitle');
      if (!subtitle || !typing) {
        return;
      }
      var text;
      <% if (is_home() && theme.index.slogan.api && theme.index.slogan.api.enable) { %>
        jQuery.ajax({
          type: '<%= theme.index.slogan.api.method %>',
          url: '<%- theme.index.slogan.api.url %>',
          headers: <%- JSON.stringify(theme.index.slogan.api.headers || {}) %>,
          dataType: 'json',
          success: function(result) {
            var apiText;
            if (result) {
              var keys = '<%= theme.index.slogan.api.keys %>'.split(',');
              if (result instanceof Array) {
                result = result[0];
              }
              for (const k of keys) {
                var value = result[k];
                if (typeof value === 'string') {
                  apiText = value;
                  break;
                } else if (value instanceof Object) {
                  result = value;
                }
              }
              text = apiText ? (result.<%= theme.index.slogan.api.keys %> + ' - ' + result.<%= theme.index.slogan.api.keys2 %>) : (result.<%= theme.index.slogan.api.keys %> + ' - ' + result.<%= theme.index.slogan.api.keys2 %>);
            }
            typing(text);
          },
          error: function(xhr, status, error) {
            if (error) {
              console.error('Failed to request <%= theme.index.slogan.api.url %>:', error);
            }
            typing(text);
          }
        })
      <% } else { %>
        text = subtitle.getAttribute('data-typed-text');
        typing(text);
      <% } %>
    })(window, document);
  </script>
<% } %>
```
2. 修改`_config.fluid.yml`  
添加`keys2`用于控制出处的取值
```yaml
      # 从请求结果获取字符串的取值字段，最终必须是一个字符串，例如返回结果为 {"data": {"author": "fluid", "content": "An elegant theme"}}, 则取值字段为 ['data', 'content']；如果返回是列表则自动选择第一项
      # The value field of the string obtained from the response. For example, the response content is {"data": {"author": "fluid", "content": "An elegant theme"}}, the expected `keys: ['data','content']`; if the return is a list, the first item is automatically selected
      keys: ['hitokoto']
      keys2: ['from']
```

## Hexo ParticleX && Hexo Diaspora
虽然是Fluid，但是为了省事，把ParticleX和Diaspora的也放在这里吧 ~~不然就太水了~~

### Artitalk
`Hexo Particle`X和`Hexo Diaspora`主题，如果使用`hexo new page <页面名> `，并在生成的`.md`文件配置Artitalk的代码，会出现奇怪的Bug

请教ChatGPT之后用下面的代码可以使用Artitalk

```javascript
<script>
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // 找到class为content的div标签
    var contentDiv = document.querySelector('.content');

    // 动态创建div标签用于Artitalk
    var artitalkDiv = document.createElement('div');
    artitalkDiv.id = 'artitalk_main'; // 设置ID为artitalk_main
    contentDiv.appendChild(artitalkDiv); // 将新创建的div添加到class为content的div内

    // 创建script标签
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.staticfile.org/artitalk/3.3.4/js/artitalk.js';

    // 当脚本加载完成后初始化Artitalk
    script.onload = function() {
      // 确保Artitalk已加载
      if (typeof Artitalk !== 'undefined') {
        new Artitalk({
          appId: '你的appId',
          appKey: '你的appKey',
          serverURL: '你的serverURL',
          color1: '#8DC9D3',
          color2: '#FFBFD7',
        });
      }
    };

    // 将script标签添加到body中（也可以根据需要添加到head中）
    document.body.appendChild(script);
  });
})();
</script>
```

把这些添加进生成的`index.md`文件中

这里是把Artitalk添加进`<div class="content">`内，可以根据需要改变class名

在Diaspora主题上有Bug，需要刷新页面才能显示Artitalk，暂时没想到怎么解决

### Valine
~~`2025/7/21: 什么年代了还在Valine...`~~

1. 在`themes\particlex\layout\comment.ejs`的最后添加以下代码：(可使用CDN)

```html
<% if (theme.valine.enable) { %>
<script src="https://cdn.bootcdn.net/ajax/libs/valine/1.5.1/Valine.min.js"></script>
<script>
    new Valine({
        // 请使用你自己的设置
        el: '#vcomments',
        appId: '<%- theme.valine.appId %>',
        appKey: '<%- theme.valine.appKey %>',
        avatar: 'mp',
        path: window.location.pathname,
        serverURLs: '<%- theme.valine.serverURLs %>',
        });
</script>
<% } %>
```

2. 从`themes\particlex\layout\post.ejs`的倒数第三行开始加入以下代码：

   ```html
   <% if (theme.valine.enable) { %>
   <div id="comment">
       <div id="vcomments"></div>
   </div>
   <% } %>
   ```

3. 在`themes\particlex\_config.yml`加入Valine的配置项

   ```yaml
   # Valine
   valine:
       enable: true
       appId: # 你的appId
       appKey: # 你的appKey
       serverURLs: # 你的serverURLs
   ```

所以ParticleX为什么不支持Valine  
高亮好像不支持ejs所以代码块上写的html
