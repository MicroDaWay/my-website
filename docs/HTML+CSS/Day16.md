---
sidebar_position: 16
---

## 媒体查询

- @media 设备类型{}
  - all 任意类型的设备
  - screen 带有屏幕的设备
  - print 打印设备
  - speech 屏幕阅读器
- min-width 指定最小视口，大于等于指定值时，样式生效
- max-width 指定最大视口，小于等于指定值时，样式生效
- , 或
- not 非
- and 与
- only
  - 主要是避免一些兼容性的问题
- 媒体查询(media query)
  - 通过媒体查询可以为不同的设备，不同的屏幕大小设置不同的样式

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 
        @media screen {
          body {
            color: orange;
          }
        }
      */

      /* 
        @media print {
          body {
            color: red;
          }
        }
      */

      /* 
        @media speech {
          body {
            color: blue;
          }
        }
      */

      /* 
        @media all {
          body {
            color: tomato;
          }
        }
      */

      /* 
        @media (min-width: 500px) {
          body {
            color: red;
          }
        }
      */

      /* 
        @media not print {
          body {
            color: red;
          }
        }
      */

      /* 
        @media screen, print {
          body {
            color: brown;
          }
        }
      */

      /* 
        @media (min-width: 500px) and (max-width: 800px) {
          body {
            color: red;
          }
        }
      */

      @media only screen {
        body {
          color: red;
        }
      }
    </style>
  </head>
  <body>
    今天天气真不错
  </body>
</html>
```
