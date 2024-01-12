---
sidebar_position: 1
---

## HTML 简介

HTML 负责网页的结构

Hyper Text Markup Language(超文本标记语言)

- 文本：在计算机中使用纯文本编辑器编写的内容被称为文本
  - word 编写的内容不是纯文本，而是富文本
- 网页的扩展名为.html，一个网页最终由浏览器渲染呈现
- 标记：标记用来告诉浏览器网页中的不同内容
  - 在网页中使用 HTML 标签作为标记，来标记出不同的内容
  - HTML 标签：
    - 成对出现：`<标签名></标签名>`

HTML 就是通过不同的标签来标识出网页中的不同内容，学习 HTML 就是学习各种标签

## 网页的基本结构

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

!DOCTYPE html

- 文档声明，用来声明当前网页的版本，这个用来表示当前网页是遵循 HTML5 规范的
- DOC 指 Document，表示文档，文档就是网页，一个网页就是一个文档
- TYPE 指类型

html

- html 根标签，一个网页有且只有一个根标签，其他标签都应该在根标签的内部

head

- html 的子标签(子元素)
- head 表示网页的头部，可以在 head 中设置网页的各种数据，head 中的内容不会在网页中直接显示
- meta
  - head 的子元素，用来设置网页的元数据
  - charset="UTF-8"，主要用来避免乱码问题
- title
  - head 的子元素，用来设置网页的标题，会显示在标签上

body

- html 的子标签(子元素)
- 网页中所有可见的内容都应该写在 body 的里边

## 注释

注释，注释中的内容不会在网页中显示，只会显示在源码中 `<!-- 注释 -->`

通过注释可以对代码进行解释说明，也可以隐藏页面中一些不希望显示的内容

作为一个程序员，要养成良好的编写注释的习惯，注释要求简单明了

注释不能进行嵌套！

## HTML 语法

标签：

- 一个标签，也被称为是一个元素
- 成对出现：`<标签名>标签体</标签名>`
- 自结束标签：`<标签名>`
- 自结束标签：`<标签名 />`

属性：

- 在开始标签(或自结束标签)中可以为元素设置属性
- 属性用来描述元素，属性是一个名值对结构，属性名="属性值"
- 一个元素可以同时指定多个属性，多个属性之间使用空格分离
- 有些属性，属性名和属性值相同，此时可以省略属性值

HTML 中不区分大小写，但是建议用小写

## 元素间的关系

父元素

- 直接包含子元素的元素是父元素

子元素

- 直接被父元素包含的元素

祖先元素

- 直接或间接包含后代元素的元素是祖先元素
- 父元素也是祖先元素

后代元素

- 直接或间接被祖先元素包含的元素是后代元素
- 子元素也是后代元素

兄弟元素

- 拥有相同的父元素的元素是兄弟元素

## 常用标签

title 表示标题标签，文字会显示到标签页上，搜索引擎在抓取页面中，会通过 title 的内容来识别网页的主要内容，这部分主要是 SEO 相关的知识(SEO 搜索引擎优化)

- p 标签表示一个段落
- br 表示换行
- hr 表示水平线

标题标签

- 一共有 6 级标题，从 h1~h6
- h1 最大，h6 最小，从语义上讲，h1 最重要，h2 其次，h3 再次...
- 注意：对于 HTML 标签来说，我们关注的是标签语义，而不是它的样式
- 在 SEO 中 h1 的重要性仅次于 title，搜索引擎也会通过 h1 来识别页面的主要信息，通常一个页面只有一个 h1

可以通过实体在网页中来表示一些特殊符号

- 语法：&实体的名字;
- 常用：
  - `&lt;` 小于号
  - `&gt;` 大于号
  - `&nbsp;` 空格
  - `&copy;` 版权符号

在 HTML 中会忽略多个空格和换行，多个空格和换行只会被识别为一个空格

标签列表：https://developer.mozilla.org/en-US/docs/Web/HTML/Element

列表：

- 有序列表

  - 使用 ol 来创建有序列表
  - 在 ol 中使用 li 来表示列表项

- 无序列表

  - 使用 ul 来创建无序列表
  - 在 ul 中使用 li 来表示列表项

- 定义列表
  - 定义列表用来描述一些内容
  - 使用 dl 来创建一个定义列表
  - 使用 dt 来定义被描述的内容
  - 使用 dd 来对内容进行描述

## 语义化标签

网页除了需要被人看以外，还需要爬虫程序爬取，w3c 就希望能够帮助程序更好的爬取这个页面，于是它就添加了很多不同的语义化标签来帮助程序来识别页面

- main 主要内容，一个页面中最好只有一个 main 标签
- header 头部内容
- footer 底部内容
- article 表示一个独立的内容
- aside 侧边栏，和主体独立的内容
- nav 表示导航
- section 独立的区块

通过这些语义化标签，可以对网页中的不同内容进行描述，方便爬虫程序识别页面，但是大部分情况下我们不会大量使用这些标签

实际开发中，比较常见的情况是，使用 div 代替所有标签

## 答疑

预格式(保留文本自身的格式)

- 在网页中，那些需要保留原本格式的内容，需要使用 pre 标签，对于我们来说使用最多的场景就是在网页中编写代码
- 实际使用过程中，还会结合 code 标签一起使用

实体：https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references

## 图片标签

img

- 图片标签，用来向页面中引入图片
- 是自结束标签
- 属性：
  - src
    - 表示要引入图片的路径，需要一个路径作为参数
  - alt
    - 是对图片的描述
    - 帮助搜索引擎来识别图片
    - 如果不写 alt，则搜索引擎不会对图片进行收录
  - width
    - 图片的宽度
  - height
    - 图片的高度
    - width 和 height 两个属性只修改一个时，另外一个会等比例缩放
    - 实际开发如果需要修改图片大小，建议只修改一个

## 图片的格式

jpg

- 支持颜色丰富，不支持透明
- 用来显示照片

gif

- 支持的颜色少，支持简单透明，支持动图
- 用来显示颜色单一的图片，或动图

png

- 支持的颜色多，支持透明
- 用来显示颜色丰富的图片，支持透明效果
- 在网页中使用的比较多

webp

- 是谷歌专门为浏览器推出的一种格式
- 兼具上述格式所有优点，部分浏览器不支持这种格式(越来越少了)

base64

- 通过 base64 来对图片进行编码，编码后可以直接在网页中引入图片
- 通过 base64 对图片编码后，图片可以和网页一起加载，加快图片的加载速度
- 可以使用 base64 来加载一些对速度要求比较高的图片，但是不要大量使用

选择图片的原则：

- 图片大小一致，用显示效果好的
- 显示效果一致，用最小的
- 保证效果的同时，确保图片尽可能小

## 路径

路径有两种：

- 绝对路径
  - https://microdaway.github.io/img/avatar.jpg
- 相对路径
  - 相对路径，用来引入我们自己项目内的图片
  - 相对路径需要使用 ./ 开头或 ../ 开头
  - ./ 表示当前目录，./ 可以省略
  - ../ 表示当前目录的上一级目录

## 超链接

使用 a 标签来定义一个超链接

通过超链接可以跳转到其他的页面

属性：

- href：

  - 指定要跳转的位置
  - 需要一个路径作为参数

- target：
  - 指定页面打开的位置
  - 可选值：
    - \_self：默认值，在当前页面打开链接
    - \_blank：在新的标签页打开链接

内部跳转的超链接，通过修改 href 属性可以使超链接在页面内部进行跳转

- \# 表示跳转到页面的顶部
- #id 表示跳转到页面的指定位置

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <h1>背影</h1>
    <p>我与父亲不相见已二年余了，我最不能忘记的是他的背影。</p>
    <p>
      那年冬天，祖母死了，父亲的差使也交卸了，正是祸不单行的日子。我从北京到徐州，打算跟着父亲奔丧回家。到徐州见着父亲，看见满院狼藉的东西，又想起祖母，不禁簌簌地流下眼泪。父亲说：“事已如此，不必难过，好在天无绝人之路！”
    </p>
    <p>
      回家变卖典质，父亲还了亏空；又借钱办了丧事。这些日子，家中光景很是惨澹，一半为了丧事，一半为了父亲赋闲。丧事完毕，父亲要到南京谋事，我也要回北京念书，我们便同行。
    </p>
    <p id="p1">
      到南京时，有朋友约去游逛，勾留了一日；第二日上午便须渡江到浦口，下午上车北去。父亲因为事忙，本已说定不送我，叫旅馆里一个熟识的茶房陪我同去。他再三嘱咐茶房，甚是仔细。但他终于不放心，怕茶房不妥帖；颇踌躇了一会。其实我那年已二十岁，北京已来往过两三次，是没有什么要紧的了。他踌躇了一会，终于决定还是自己送我去。我再三劝他不必去；他只说：“不要紧，他们去不好！”
    </p>
    <p id="p2">
      我们过了江，进了车站。我买票，他忙着照看行李。行李太多，得向脚夫行些小费才可过去。他便又忙着和他们讲价钱。我那时真是聪明过分，总觉他说话不大漂亮，非自己插嘴不可，但他终于讲定了价钱；就送我上车。他给我拣定了靠车门的一张椅子；我将他给我做的紫毛大衣铺好座位。他嘱我路上小心，夜里要警醒些，不要受凉。又嘱托茶房好好照应我。我心里暗笑他的迂；他们只认得钱，托他们只是白托！而且我这样大年纪的人，难道还不能料理自己么？我现在想想，我那时真是太聪明了。
    </p>
    <p id="p3">
      我说道：“爸爸，你走吧。”他往车外看了看，说：“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子，走过去自然要费事些。我本来要去的，他不肯，只好让他去。我看见他戴着黑布小帽，穿着黑布大马褂，深青布棉袍，蹒跚地走到铁道边，慢慢探身下去，尚不大难。可是他穿过铁道，要爬上那边月台，就不容易了。他用两手攀着上面，两脚再向上缩；他肥胖的身子向左微倾，显出努力的样子。这时我看见他的背影，我的泪很快地流下来了。我赶紧拭干了泪。怕他看见，也怕别人看见。我再向外看时，他已抱了朱红的橘子往回走了。过铁道时，他先将橘子散放在地上，自己慢慢爬下，再抱起橘子走。到这边时，我赶紧去搀他。他和我走到车上，将橘子一股脑儿放在我的皮大衣上。于是扑扑衣上的泥土，心里很轻松似的。过一会儿说：“我走了，到那边来信！”我望着他走出去。他走了几步，回过头看见我，说：“进去吧，里边没人。”等他的背影混入来来往往的人里，再找不着了，我便进来坐下，我的眼泪又来了。
    </p>
    <p>
      近几年来，父亲和我都是东奔西走，家中光景是一日不如一日。他少年出外谋生，独力支持，做了许多大事。哪知老境却如此颓唐！他触目伤怀，自然情不能自已。情郁于中，自然要发之于外；家庭琐屑便往往触他之怒。他待我渐渐不同往日。但最近两年不见，他终于忘却我的不好，只是惦记着我，惦记着我的儿子。我北来后，他写了一信给我，信中说道：“我身体平安，惟膀子疼痛厉害，举箸提笔，诸多不便，大约大去之期不远矣。”我读到此处，在晶莹的泪光中，又看见那肥胖的、青布棉袍黑布马褂的背影。唉！我不知何时再能与他相见！
    </p>

    <a href="#">回到顶部</a>
    <a href="#p1">到南京时</a>
    <a href="#p2">我们过了江</a>
    <a href="#p3">爸爸，你走吧</a>
  </body>
</html>
```

## 内联框架

iframe

- 内联框架，用来向一个网页中引入另一个网页
- 属性：
  - src 来指定要引入的网页的路径

**内联框架.html**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <iframe name="my-website" src="https://microdaway.github.io/" width="500" height="200"></iframe>
    <hr />
    <iframe src="./超链接.html" width="500" height="200"></iframe>
  </body>
</html>
```

**超链接.html**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <a href="https://microdaway.github.io/img/avatar.jpg" target="_parent">头像1</a>
    <a
      href="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      target="my-website"
      >头像2</a
    >
    <a href="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">头像3</a>
  </body>
</html>
```

## 块元素和行内元素

在 HTML 中，元素可以被分为块元素和行内元素

块元素(block)

- 块元素会独占页面的一行自上向下垂直排列
- 块元素用来对网页进行布局，将一个页面分成一块一块的
- 最常用的块元素：div

行内元素(inline)

- 行内元素只会占自身的大小，自左向右水平排列
- 行内元素一般用来放置文字
- 最常用的行内元素：span

替换元素

- img、iframe

元素的嵌套规则：

- 块元素中可以放置块元素，也可以放置行内元素
- 行内元素中尽量不要放置块元素
- a 元素中可以放置除它自身外的任何元素
- p 元素中不能放置块元素

注意：浏览器在渲染页面时，会自动修复 HTML 中的语法错误

## CSS 简介

CSS：层叠样式表，通过 CSS 可以为网页中的元素设置各种样式，让页面变得更加漂亮

内联样式(行内样式)：

- 可以直接将 CSS 编写到元素的 style 属性中
- 一个网页分为三个部分：
  - 结构、表现和行为
  - 一个设计优良的网页，最好要把结构、表现和行为三者分离
- 将样式直接编写到 style 属性中，使得代码变得不容易维护，不推荐使用

内部样式表

- 可以通过 style 标签来创建一个内部样式表
- 将样式编写到 style 标签中，降低了代码的耦合，使代码易于维护
- 内部样式表只能在当前页面中生效，无法在不同的页面中进行复用

外部样式表

- 外部样式表，指将样式编写到外部的 CSS 文件中
- 然后通过 link 标签引入外部的样式
- 通过外部样式表，将结构和表现完全分离，使代码易于维护
- 同时代码可以在不同的页面之间进行复用
- 并且外部文件可以利用到浏览器的缓存机制，加快用户的访问速度

## CSS 基本语法

CSS 注释：/\* 注释 \*/

基本语法：选择器、声明块

选择器：选择器用来指定要设置样式的元素

声明块：

- 声明块用来设置样式
- 声明块由一对大括号括起来
- 声明块里边是一个一个的声明
- 声明是一个名值对：
  - 一个样式名对应一个(或多个)样式值，之间使用 : 连接使用 ; 结尾

文档：https://developer.mozilla.org/en-US/docs/Web/CSS/Reference

## 基本选择器

元素选择器

- 根据标签名选中多个元素
- 语法：标签名{}
- 例子：p{} div{} h1{}

id 选择器

- 根据元素的 id 属性选中一个元素
- 语法：#id\{ \}
- 例子：#p1\{ \} #box\{ \} #head\{ \}

类选择器(最常用的选择器)

- 根据元素的 class 属性选中元素
- 语法：.class\{ \}
- 例子：.p1\{ \} .box\{ \} .head\{ \}

通配选择器

- 选择页面中的所有元素
- 语法：\*\{ \}

## 属性选择器

- 用来根据元素的属性来选中元素
- 语法：
  - [属性名] 选中具有该属性的元素
  - [属性名=属性值] 选中指定属性值的元素
  - [属性名^=属性值] 选中属性值以指定内容开头的元素
  - [属性名$=属性值] 选中属性值以指定内容结尾的元素
  - [属性名*=属性值] 选中属性值包含指定内容的元素

可以将多个选择器连着一起写，这样则要求元素必须同时满足多个选择器

交集选择器

- 作用：选中同时符合多个选择器的元素
- 语法：选择器 1 选择器 2 选择器 3\{ \}
- 例子：
  - div[title=hello]\{ \}
  - div.box\{ \}

CSS 练习：https://flukeout.github.io/

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* [title] {
        color: red;
      } */

      /* [title='p1'] {
        color: red;
      } */

      /* [title^='p'] {
        color: red;
      } */

      /* [title$='1'] {
        color: red;
      } */

      /* [title*='p'] {
        color: red;
      } */

      div[title='pdd'] {
        color: red;
      }
    </style>
  </head>
  <body>
    <p title="p1">p1</p>
    <p title="p2">p2</p>
    <div title="div1">div1</div>
    <div title="div2">div2</div>
    <div title="pdd">div3</div>
  </body>
</html>
```

## 分组和关系选择器

分组选择器

- 作用：同时选中多个选择器对应的元素
- 语法：选择器 1,选择器 2,选择器 3,...选择器 n\{ \}

关系选择器

- 根据元素之间的关系来选中元素
- 元素之间有哪些关系：父子、祖先后代、兄弟

子元素选择器

- 作用：选中指定元素的子元素
- 语法：父元素 > 子元素\{ \}

后代元素选择器

- 作用：选中指定元素的后代元素
- 语法：祖先 后代\{ \}

兄弟元素选择器

- 作用：选中指定的兄弟元素
- 语法：
  - 兄 + 弟\{ \}
    - 选中紧随其后的一个兄弟元素
  - 兄 ~ 弟\{ \}
    - 选中后边的所有兄弟元素

## 伪类选择器

伪类是一个特殊的类，用来表示元素的状态，伪类使用 : 开头

像超链接，一个链接有没有被访问过就是一种特殊的状态

在 CSS 中，可以使用 :visited 来表示访问过的超链接

a 的伪类：

- :link
  - 表示正常的超链接(未访问过的超链接)
- :visited
  - 访问过的链接
- :hover
  - 鼠标移入的元素
- :active
  - 鼠标点击的元素

visited 用来表示访问过的链接，它是根据用户的历史记录进行判断，由于隐私的原因，通过 visited 只能改变文字的颜色

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      a:link {
        color: deepskyblue;
      }

      a:visited {
        color: red;
      }

      a:hover {
        color: orange;
      }

      a:active {
        color: black;
      }
    </style>
  </head>
  <body>
    <a href="https://microdaway.github.io/">访问过的</a>
    <a href="https://microdaway123.github.io/">未访问过的</a>
  </body>
</html>
```

## 结构伪类

文档：https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

结构伪类：

- :root
  - 根元素
- :empty
  - 空元素
- :first-child
  - 第一个子元素
- :first-of-type
  - 同类型中的第一个子元素
- :last-child
  - 最后一个子元素
- :last-of-type
  - 同类型中的最后一个子元素
- :nth-child
  - 第 n 个子元素
  - even 表示偶数，相当于 2n
  - odd 表示奇数，相当于 2n+1
- :nth-of-type
  - 同类型中第 n 个子元素
- :nth-last-child
  - 倒数第 n 个元素
- :nth-last-of-type
  - 同类型中倒数第 n 个元素
- :only-child
  - 唯一的子元素
- :only-of-type
  - 同类型中唯一的子元素

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=\, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01,
      .box02 {
        width: 100px;
        height: 100px;
        border: 2px solid red;
      }

      div:empty {
        background-color: #bfa;
      }

      /* li:first-child {
        color: orange;
      } */

      /* li:first-of-type {
        color: orange;
      } */

      /* li:last-child {
        color: orange;
      } */

      /* li:last-of-type {
        color: orange;
      } */

      /* li:nth-child(2n) {
        color: orange;
      } */

      /* li:nth-of-type(1) {
        color: orange;
      } */

      /* li:only-child {
        color: orange;
      } */

      li:only-of-type {
        color: orange;
      }
    </style>
  </head>
  <body>
    <p>hello</p>
    <li>body中的li</li>
    <div class="box01">box01</div>
    <hr />
    <div class="box02"></div>

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>

    <ul>
      <li>我是唯一的li</li>
    </ul>
  </body>
</html>
```

## 否定伪类

:not

- 否定伪类，除了某些元素

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* p:not(:nth-child(3)) {
        color: tomato;
      } */

      p:not(.p1) {
        color: tomato;
      }
    </style>
  </head>
  <body>
    <p>锄禾日当午</p>
    <p>汗滴禾下土</p>
    <p class="p1">谁知盘中餐</p>
    <p>粒粒皆辛苦</p>
  </body>
</html>
```

## 伪元素

伪元素表示的是页面中特殊的位置

伪元素使用::开头

- `::before`
  - 元素的开始位置(开始标签之后)
- `::after`
  - 元素的结束位置(结束标签之前)
- `::first-letter`
  - 首字母
- `::first-line`
  - 第一行
- `::selection`
  - 选中的文字的样式

通过 before、after 可以选中元素开始或结束的位置，从而为其添加内容

注意：这里的内容是通过 CSS 添加的！不算是网页中的正式内容

通过它可以为元素添加一些统一的符号

也可以在特殊场景下通过它们来调整一下页面的样式

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div::before {
        content: 'before';
        color: red;
      }

      div::after {
        content: 'after';
        color: red;
      }
    </style>
  </head>
  <body>
    <div>我是一个div</div>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      p::first-letter {
        font-size: 30px;
        color: red;
      }

      p::first-line {
        background-color: orange;
      }

      p::selection {
        color: deepskyblue;
      }
    </style>
  </head>
  <body>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, dolorem assumenda. Aliquid
      adipisci, aperiam, modi eius quidem, harum officiis vitae sit laboriosam iste officia omnis
      voluptatibus impedit nulla inventore error!
    </p>
  </body>
</html>
```

## 样式的继承

设置给祖先元素的样式，也会同时应用到其后代元素上

继承的存在大大的简化了样式的编写

但并不是所有的样式都会发生继承！

所有的布局、背景、边框等相关的样式都不会发生继承

## 选择器的权重

样式的冲突

当我们使用不同的选择器，选中同一个元素并设置相同的样式时，就发生了样式的冲突

当样式冲突发生时，哪个样式生效由选择器的优先级(权重)决定：

- 继承的样式：没有优先级
- 通配选择器: 0,0,0,0
- 元素和伪元素选择器：0,0,0,1
- 类和伪类选择器：0,0,1,0
- id 选择器：0,1,0,0
- 内联样式：1,0,0,0

比较优先级时，需要将多个选择器的优先级一起计算

优先级高的优先显示，优先级的累加无法跨越数量级

如果优先级一样，则优先显示靠下的样式

如果为样式添加 !important，则该样式会获得最高的优先级，优先于其他样式显示，慎用！

注意：分组选择器优先级都是单独计算的！

## 长度单位

像素（px）：

- 显示器的图形实际上是由一个一个的小点点构成的，每一个小点就是一个像素
- 每一台设备的像素大小是不同的，越清晰的设备像素就越小
- 当我们面向移动端开发时，会面临一个问题，同样是 12px，在 pc 端里可能正合适，但是在手机中浏览时，就会变得特别的小

百分比（%）：

- 设置后元素的属性会根据父元素指定属性的百分比计算

em：

- 1em = 1font-size（参照当前元素的字体大小）

rem（root em）：

- 1rem = 1 根元素的 font-size（参照 html 根元素的字体大小）

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 200px;
        height: 200px;
        background-color: orange;
      }

      .box02 {
        font-size: 100px;
        width: 1em;
        height: 1em;
        background-color: #bfa;
      }

      html {
        font-size: 150px;
      }

      .box03 {
        width: 1rem;
        height: 1rem;
        background-color: brown;
      }
    </style>
  </head>
  <body>
    <div class="box01">
      <div class="box02"></div>
    </div>

    <div class="box03"></div>
  </body>
</html>
```

## 颜色单位

颜色名

- 可以直接使用颜色名来设置颜色
- 比如：red、blue、green、yellow、orange...

rgb 值

- rgb 值指通过三种不同的颜色的组合，来调配出不同的颜色
- red green blue
- 语法：RGB(红色, 绿色, 蓝色)
- 取值范围：0-255

rgba()

- r 红色
- g 绿色
- b 蓝色
- a 不透明度，需要一个 0-1 之间的值

hsl() 也是设置颜色的方式

- h 色相 0 - 360
- s 饱和度 0% - 100%
- l 亮度 0% - 100%

hsla()

- a 不透明度，需要一个 0-1 之间的值

## 十六进制颜色

使用十六进制来表示颜色：

- 十进制 0 1 2 3 4 5 6 7 8 9 10
- 二进制 0 1 10 11 100 101 110 111
- 八进制 0 1 2 3 4 5 6 7 10 11 12 ... 17 20
- 十六进制 0 1 2 3 4 5 6 7 8 9 a b c d e f

可以通过三个两位的十六进制数字来表示一个颜色

- 语法：#红色绿色蓝色
- 每一个颜色的取值范围 00 - ff
- 例子：
  - 红色：#ff0000
  - 绿色：#00ff00
- 如果 rgb 值是两两重复的，可以进行简写
  - #aabbcc -> #abc
  - #bbffaa -> #bfa

## 盒子模型简介
