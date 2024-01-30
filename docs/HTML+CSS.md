---
sidebar_position: 2
---

# HTML+CSS

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

像素(px)：

- 显示器的图形实际上是由一个一个的小点点构成的，每一个小点就是一个像素
- 每一台设备的像素大小是不同的，越清晰的设备像素就越小
- 当我们面向移动端开发时，会面临一个问题，同样是 12px，在 pc 端里可能正合适，但是在手机中浏览时，就会变得特别的小

百分比(%)：

- 设置后元素的属性会根据父元素指定属性的百分比计算

em：

- 1em = 1font-size(参照当前元素的字体大小)

rem(root em)：

- 1rem = 1 根元素的 font-size(参照 html 根元素的字体大小)

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

盒子模型(box model)

网页的布局指就是将元素摆放到网页的不同的位置

布局就得先确定元素的大小

在网页中每一个元素都是一个矩形，或者可以直接将其想象为是一个盒子，每一个盒子，都由以下几个部分组成：

- 内容区(content)
  - 内容区在元素最内部，用来容纳子元素
  - 内容区的大小由 width 和 height 设置
- 内边距(padding)
  - 内容区和边框之间的距离称为内边距
- 边框(border)
  - 边框是盒子边界，离开边框就属于盒子的外部了
  - 边框会影响到盒子可见框的大小
- 外边距(margin)
  - 盒子与盒子之间的距离称为外边距
  - 外边距不会影响盒子的大小，但是它会影响盒子的位置(实际大小)

设置边框：

- 要设置边框，涉及到三个样式
- border-width 边框的宽度
- border-color 边框的颜色
- border-style 边框的样式

## 盒子模型-边框

- border-width 用来指定边框的宽度
- 10px 20px 30px 40px 上 右 下 左
- 10px 20px 30px 上 左右 下
- 10px 20px 上下 左右
- 10px 上下左右

除了 border-width 以外，也可以通过 border-xxx-width 来分别设置某个边框的宽度，xxx 可以是 top right bottom left

边框的样式：

- solid 实线
- dotted 点状虚线
- dashed 虚线
- double 双线

border 简写属性，可以同时设置边框的三个样式

border: solid red 10px;

## 盒子模型-内边距

内容区和边框之间的距离称为内边距

共有四个方向的内边距：

- padding-top 上内边距
- padding-bottom 下内边距
- padding-left 左内边距
- padding-right 右内边距

默认情况下，背景颜色会延伸到内边距上，所以我们无法直观的看到内边距

内边距也会影响到盒子可见框的大小

一个元素的可见框的大小由：内容区、内边距和边框共同决定的

padding 简写属性，可以同时设置四个方向的内边距

- 10px 20px 30px 40px 上 右 下 左
- 10px 20px 30px 上 左右 下
- 10px 20px 上下 左右
- 10px 上下左右

## 可见框计算

盒子的可见框指可见的部分，大小由内容区、内边距、边框共同决定

box-sizing 用来指定盒子可见框的计算方式，可选值：

- content-box 默认值，width 和 height 用来设置内容区的大小
- border-box 设置该值后，width 和 height 用来设置盒子可见框的大小

## 盒子模型的外边距

外边距同样有四个方向

- margin-top 上外边距，值越大元素越靠下
- margin-bottom
- margin-left 左外边距，值越大元素越靠右
- margin-right

由于我们的浏览器默认是按照自左向右，自上向下的顺序来排列元素的，所以当我们设置上和左外边距时，是改变元素自身的位置，但是设置下和右时，会改变其他元素的位置

## 外边距折叠

垂直方向的相邻外边距会发生外边距折叠的现象

兄弟元素间外边距会取较大值(这样设计是为了避免两个元素之间的距离过远)

父子元素间子元素外边距会传递给父元素，这样会导致布局出问题，需要避免该问题

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
        width: 100px;
        height: 100px;
        background-color: #bfa;
        margin-top: 50px;
      }
    </style>
  </head>
  <body>
    <div class="box01">
      <div class="box02"></div>
    </div>
  </body>
</html>
```

## 水平居中

可以将 margin 的值设置为 auto，设置 auto 后，元素的外边距由浏览器自动计算

当我们将 margin-left 或 margin-right 中的一个设置为 auto 时，则浏览器会自动使其尽量的大

如果将 margin-left 和 margin-right 同时设置为 auto，则浏览器会使元素左右的外边距相同，也就是元素会在其父元素中水平居中

通过将一个块元素的左右外边距设置为 auto，以使其在父元素中水平居中

默认情况下，垂直外边距设置为 auto 时，浏览器会自动取 0 为外边距

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 800px;
        height: 200px;
        border: 2px solid red;
      }

      .box02 {
        width: 100px;
        height: 100px;
        background-color: #bfa;
        /* margin-left: auto; */
        /* margin-right: auto; */
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="box01">
      <div class="box02"></div>
    </div>
  </body>
</html>
```

## 行内元素的盒子模型

内容区

- 行内元素的大小被内容撑开，无法通过 width 和 height 来设置行内元素的宽度和高度

内边距

- 行内元素可以设置内边距，但是垂直方向的内边距不会影响布局

边框

- 行内元素可以设置边框，但是垂直方向的边框不会影响页面的布局

外边距

- 行内元素可以设置水平方向的外边距

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      span {
        width: 200px;
        height: 100px;
        background-color: skyblue;
        padding: 100px 100px;
        border: 5px solid red;
        margin: 50px;
      }

      div {
        width: 200px;
        height: 200px;
        background-color: orange;
      }
    </style>
  </head>
  <body>
    <span>span01</span>
    <span>span02</span>
    <span>span03</span>
    <span>span04</span>
    <div></div>
  </body>
</html>
```

## overflow

当子元素大小超过父元素内容区时，子元素会从父元素中溢出(overflow)

在 css 中通过 overflow 这个样式，来处理溢出内容

overflow

- 设置元素如何处理溢出内容
- 可选值：
  - visible，默认值 溢出内容直接在元素以外的位置显示
  - hidden 隐藏溢出的内容
  - scroll 生成双方向滚动条，通过滚动条来查看完整内容
  - auto 根据需要生成滚动条

## display 和 visibility

display

- 用来设置元素的类型
- 可选值：
  - inline 将元素设置为行内元素
  - block 将元素设置为块元素
  - inline-block 行内块元素
    - 行内块兼具行内元素和块元素的特点
    - 不独占一行，又可以设置宽高
    - 注意：行内块的特点和文本很像，所以布局时尽量少用
  - none 隐藏元素

visibility

- 用来设置一个元素的可见性
- 可选值：
  - visible 默认值，元素可见
  - hidden 元素是隐藏的，在页面中不可见，但是依然占据页面的位置

## 重置样式

为了开发起来更加便利，编写 CSS 样式前，我们通常都需要对默认样式进行重置

方式一：

```
* {
  margin: 0;
  padding: 0;
}
```

方式二：

- 使用 reset.css
- https://meyerweb.com/eric/tools/css/reset/reset.css
- 直接清除掉默认样式

方式三：

- 使用 normalize.css
- https://necolas.github.io/normalize.css/8.0.1/normalize.css
- 没有直接清除掉所有样式，而是将默认样式统一

## 文本样式

text-align

- 文本的水平对齐方式
- 可选值：
  - left 默认值 左对齐
  - center 居中对齐
  - right 右对齐
  - justify 两端对齐

网页中，图片 行内块 都可以使用文本对齐的方式

text-indent

- 首行缩进
- 可以设置负值
- 正值文字向右移动
- 负值文字向左移动
- 可以利用负值隐藏网页中的一些文字

text-decoration

- 文本修饰
- 可选值：
  - none 默认值 没有修饰
  - underline 下划线
  - overline 上划线

## 溢出的文本内容

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      p {
        width: 100px;
        background-color: #bfa;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    </style>
  </head>
  <body>
    <p>今天天气真不错</p>
  </body>
</html>
```

## 行高

line-height 用来设置元素的行高

行就是用来放文字的，行高就是文字所在行的高度

文字默认是在行高中垂直居中

行间距 = 行高 - 字体大小

行高可以设置一个数字，那么行高将会是字体大小对应的倍数

## 垂直对其

在网页中，每个文字被显示时都会有一个文本框与之对应

当我们设置元素的 font-size 时，实际上就是在设置文本框的大小

在文本框存在一个位置叫做基线(baseline)

文字的垂直对齐：默认每个文字和父元素在垂直方向都是沿着基线对齐的

vertical-align

- 设置元素垂直对齐的方式
- 可选值：
  - baseline 默认值 子元素和父元素的基线对齐
  - top 子元素文本框的顶部和父元素文本框的顶部对齐
  - bottom 子元素文本框的底部和父元素文本框的底部对齐
  - middle 将元素的中线和父元素基线高度+x 高度一半的位置对齐
- 开发中经常通过 vertical-align 来消除图片下边的空白

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      p {
        font-size: 40px;
        border: 1px orange solid;
      }

      span {
        font-size: 20px;
        border: 1px red solid;
        vertical-align: middle;
      }
    </style>
  </head>
  <body>
    <p>落霞与孤鹜齐飞，秋x<span>水</span>共长天一色</p>
  </body>
</html>
```

## 文字样式

font-size

- 字体的大小

font-weight

- 字重
- 可选值：
  - normal 默认值 正常的粗细
  - bold 加粗
  - lighter 细的

font-style

- 字体的样式
- 可选值
  - normal 默认值 正常的
  - italic 斜体

font-family

- 字体族，指定使用什么字体
- 字体的分类
  - serif 衬线字体
  - sans-serif 非衬线字体
  - monospace 等宽字体
- 当我们将字体设置为上述类型时，浏览器会自动选择相应的字体来显示

font

- 简写属性
- 可以同时设置字体相关的所有样式
- 语法：
  - font: 任意 font-size/line-height font-family
  - 例如：font: bold italic 40px/1.5 Arial, "Microsoft YaHei", sans-serif;

## font-face

- 通过它可以将远程字体提供给用户使用
- 注意：
  - 使用的时候要慎重
  - 下载字体需要花费时间，如果字体文件太大，用户可能无法第一时间下载完成
  - 使用字体可能会涉及到版权问题，小心律师函

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      @font-face {
        /* src表示服务器中字体的路径 */
        src: url(./font.ttf);
        /* 字体的名字，自定义 */
        font-family: 'test';
      }

      p {
        font-size: 20px;
        font-family: test;
      }
    </style>
  </head>
  <body>
    <p>今天天气真不错</p>
  </body>
</html>
```

## 图标字体

在网页中，经常能够看到一些小图标，可以使用图片来表示这些图标

但是图片存在着一些不足：

- 不便于缩放
- 颜色无法改变

如果这些小图标，可以任意缩放，同时又可以任意的修改颜色，那就好了！

在网页中文字可以任意缩放和改变颜色！(文字是矢量图)

如果我们的小图标能够像文字一样，那就好了！

图标字体(iconfont)

- 所谓的图标字体，指将小图标制作为字体文件
- 可以使用一些第三方的库
  - https://fontawesome.com/
- 使用步骤：
  - 下载
  - 解压缩
  - 复制 css 和 webfonts 目录到项目下
  - 在页面中引入 all.css
  - 在页面中添加标签

iconfont.cn

- 打开 https://www.iconfont.cn/，注册登录
- 选择你需要的图标，添加至项目中
- 进入项目，下载图标
- 将样式表和字体文件添加到项目中
- 引入 css
- 通过类使用
  - `<i class="iconfont  icon-xxx"></i>`
  - `<i class="iconfont">&#xyyyy;</i>`

## 轮廓、圆角和阴影

outline

- 轮廓线
- 和边框非常像，但是 outline 不会影响到元素可见框的大小

border-radius

- 同时指定四个圆角的半径
- 左上、右上、右下、左下

box-shadow

- 可以用来为元素指定阴影
- 取值：
  - box-shadow: x 轴偏移量 y 轴偏移量 模糊半径 扩散半径 阴影的颜色;
  - 可以设置一个 inset 来表示内部阴影

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
        background-color: deepskyblue;
        box-shadow: 10px 10px 20px 10px rgba(0, 0, 0, 0.5);
        /* box-shadow: inset 10px 10px 20px 10px rgba(0, 0, 0, 0.5); */
      }

      /* .box01:hover {
        outline: 10px solid red;
      } */

      .box02 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    <!-- <div class="box02"></div> -->
  </body>
</html>
```

## 文档流

文档流(normal flow) 正常布局流

- https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Normal_Flow
- 文档流是网页中的位置，我们所创建的元素默认都存在于文档流中
- 文档流中的元素，必须要遵循文档流的规则在页面中排列
- 块元素
  - 块元素在文档流中自上向下垂直排列
  - 块元素的默认宽度会将父元素撑满(默认值为 auto)
  - 块元素的默认高度被内容撑开
- 行内元素
  - 行内元素在文档流中会自左向右水平排列，如果一行不足以容纳所有元素
  - 则会另起一行继续自左向右水平排列(和我们日常的书写相同)
  - 行内元素的默认宽度和高度都被内容撑开

## 包含块(containing block)

在文档流中，包含块就是离当前元素最近的祖先块元素

## 水平布局的等式

子元素会在父元素内容区中排列

在文档流中，块元素的水平排列，必须要遵循如下一个等式：

- 子元素可见框宽度 + 子元素的水平外边距 = 包含块内容区的宽度
- margin-left + 可见框 + margin-right = 包含块内容区的宽度
- 当所有的属性值中没有 auto，此时浏览器会自动调整右外边距以使等式强制满足
- 当只有一个属性值设置为 auto，则浏览器会自动调整该值以使等式满足
- 当左右外边距为 auto，而 width 有值时，则左右外边距会设置为相等的值，以使等式满足
- 当外边距和 width 同时设置为 auto，则设置 auto 的外边距就是 0

在文档流中，块元素的垂直排列，不需要遵循等式！

## 浮动的简介

浮动是一种传统的网页的布局方式

通过浮动可以使得元素脱离文档流而横向排列

float

- 设置元素浮动
- 可选值：
  - none，默认值 元素不浮动
  - left，向左浮动
  - right，向右浮动
- 浮动的特点：
  - 设置浮动后，元素会脱离文档流，其后的元素会自动上移
  - 设置浮动后，元素会向其包含块的左侧或右侧移动
  - 如果一行之内无法容纳所有的浮动元素，则后边的元素会自动换到下一行
  - 浮动元素不会超过它上边浮动的兄弟元素，最多一边齐
  - 浮动元素不会盖住文字，文字会环绕在浮动元素的周围

## 浮动的特点

浮动后，之前的布局等式就失效了

元素脱离文档流后的特点：

- 块元素：
  - 块元素不再独占一行，而是水平排列
  - 宽度和高度都被内容撑开
- 行内元素：
  - 设置浮动后行内元素可以设置宽度和高度

总结：脱离文档流后，块元素不再独占一行，宽高被内容撑开，行内元素变成块元素

脱离文档流后，就不再需要区分行内元素和块元素

## 高度塌陷问题

在文档流中的元素，可以将其他元素的高度撑开！

当元素浮动，它会脱离文档流，脱离文档流后，无法撑开父元素的高度，导致父元素高度塌陷

父元素高度塌陷，其后的元素会自动上移，导致布局变得混乱

高度塌陷是我们使用浮动布局时必须要解决的问题！

如何解决该问题？

- 可以直接将父元素的高度写死
  - 这样一来父元素高度写死，无法根据子元素高度的变化而变化

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        border: 5px solid red;
      }

      .box02 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }

      .box03 {
        width: 200px;
        height: 200px;
        background-color: skyblue;
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

## BFC(Block Formatting Context)

- 块级格式化环境
- https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
- 可以将 BFC 理解为一个隐藏的属性，当开启 BFC 后元素会具备如下的特征：

  - 开启 BFC 后，子元素的垂直外边距不会传递给父元素
  - 开启 BFC 后，元素不会被浮动元素所覆盖
  - 开启 BFC 后，元素可以包含浮动的子元素

- 如何开启 BFC：
  - 需要用一些其他的样式来间接的开启 BFC
  - 由于 BFC 是通过一些样式间接开启的，所以都会有一些副作用
  - 而我们要做的是找到一种可以开启 BFC，同时副作用又比较小的
- 例如：
  - 浮动会开启元素的 BFC
  - 将 overflow 设置为一个非 visible 的值
  - display: flow-root

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        /* float: left; */
        /* overflow: hidden; */
        display: flow-root;
        border: 5px solid red;
      }

      .box02 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }

      .box03 {
        width: 300px;
        height: 300px;
        background-color: skyblue;
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
        background-color: skyblue;
        display: flow-root;
      }

      .box02 {
        width: 100px;
        height: 100px;
        background-color: orange;
        margin-top: 50px;
      }

      .box03 {
        float: left;
        width: 100px;
        height: 100px;
        background-color: #bfa;
      }

      .box04 {
        display: flow-root;
        width: 200px;
        height: 200px;
        background-color: brown;
      }
    </style>
  </head>
  <body>
    <div class="box01">
      <div class="box02"></div>
    </div>

    <div class="box03"></div>
    <div class="box04"></div>
  </body>
</html>
```

## clear

- 清除浮动元素对当前元素所产生的影响
- 可选值：
  - left 清除左侧浮动元素对当前元素的影响
  - right 清除右侧浮动元素对当前元素的影响
  - both 清除最大一侧浮动元素对当前元素的影响

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: skyblue;
      }

      .box02 {
        float: right;
        width: 300px;
        height: 300px;
        background-color: orange;
      }

      .box03 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
        clear: both;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    <div class="box02"></div>
    <div class="box03"></div>
  </body>
</html>
```

## clearfix

解决高度塌陷问题

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        border: 5px solid red;
      }

      .box02 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }

      .clearfix::after {
        display: block;
        content: '';
        clear: both;
      }
    </style>
  </head>
  <body>
    <div class="box01 clearfix">
      <div class="box02"></div>
    </div>
  </body>
</html>
```

解决高度塌陷和外边距折叠问题

```css
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}
```

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        border: 5px solid red;
      }

      .box02 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }

      /* .clearfix::after {
        display: block;
        content: '';
        clear: both;
      } */

      .box03 {
        width: 200px;
        height: 200px;
        background-color: dodgerblue;
      }

      /* .box03::before {
        content: '';
        display: table;
      } */

      .box04 {
        width: 100px;
        height: 100px;
        background-color: brown;
        margin-top: 50px;
      }

      .clearfix::before,
      .clearfix::after {
        content: '';
        display: table;
        clear: both;
      }
    </style>
  </head>
  <body>
    <div class="box01 clearfix">
      <div class="box02"></div>
    </div>

    <div class="box03 clearfix">
      <div class="box04"></div>
    </div>
  </body>
</html>
```

## 相对定位

布局手段：

- 盒子模型(纵向)
- 浮动(横向)
- 定位

定位(position)

- 通过定位可以将一个元素摆放到页面中的任意位置
- CSS 中共有四种定位方式：
  - 相对定位
  - 绝对定位
  - 固定定位
  - 粘滞定位

position

- 用来设置元素的定位方式
- 可选值：
  - static，默认值，元素没有开启定位
  - relative，开启元素的相对定位
  - absolute，开启元素的绝对定位
  - fixed，开启元素的固定定位
  - sticky，开启粘滞定位

相对定位：

- 将元素的 position 属性设置为 relative 则开启了元素的相对定位
- 相对定位的特点：
  - 开启相对定位而不设置元素的偏移量，此时元素不会发生任何变化
  - 开启相对定位不会使得元素脱离文档流，不会改变元素的性质
  - 相对定位元素是参照于其原来的位置进行定位的
  - 相对定位会提升元素的层级

偏移量

- 开启了定位的元素可以通过偏移量来设置元素的位置
- 偏移量一共有四个：
  - top
    - 元素上边距离定位位置上边的距离
  - bottom
    - 元素下边距离定位位置下边的距离
  - left
    - 元素左边距离定位位置左边的距离
  - right
    - 元素右边距离定位位置右边的距离
- 偏移量通常只使用两个即可定位一个元素的位置

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
        background-color: #bfa;
      }

      .box02 {
        position: relative;
        top: 50px;
        left: 50px;
        width: 200px;
        height: 200px;
        background-color: orange;
      }

      .box03 {
        width: 200px;
        height: 200px;
        background-color: tomato;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    <div class="box02"></div>
    <div class="box03"></div>
  </body>
</html>
```

## 绝对定位

- 将元素的 position 设置为 absolute，则开启了元素的绝对定位
- 特点：
  - 开启绝对定位后，如果不设置偏移量，元素的位置不会发生变化
  - 开启绝对定位后，元素会脱离文档流，同时元素性质发生变化
  - 绝对定位元素是参照于离它最近的开启了定位的祖先元素进行定位
  - 如果所有的祖先元素都没有开启定位，则相对于浏览器窗口进行定位
  - 所以在开发中，经常在为一个元素开启绝对定位后，同时也给它的父元素开启相对定位
  - 绝对定位会提升元素的层级

**绝对定位是参照于它的包含块进行定位的**

绝对定位元素的包含块是谁

- 绝对定位元素的包含块是离它最近的开启了定位的祖先元素
- 如果所有的祖先都没有开启定位，则它的包含块是初始包含块
- 初始包含块的大小和视口是相同的

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
        background-color: #bfa;
      }

      .box02 {
        position: absolute;
        left: 0;
        top: 0;
        width: 200px;
        height: 200px;
        background-color: orange;
      }

      .box03 {
        width: 200px;
        height: 200px;
        background-color: tomato;
      }

      .box04 {
        position: relative;
        width: 400px;
        height: 400px;
        background-color: deepskyblue;
      }

      .box05 {
        /* position: relative; */
        width: 300px;
        height: 300px;
        background-color: brown;
        margin-left: auto;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    <div class="box04">
      <div class="box05">
        <div class="box02"></div>
      </div>
    </div>
    <div class="box03"></div>
  </body>
</html>
```

## 垂直水平居中

盒子模型的等式

- margin-left + 可见框宽度 + margin-right = 包含块的内容区宽度

当元素开启了绝对定位后，两个新的等式诞生了！

- left + margin-left + 可见框宽度 + margin-right + right = 包含块的内容区宽度
- top + margin-top + 可见框高度 + margin-bottom + bottom = 包含块的内容区高度

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        position: relative;
        width: 800px;
        height: 400px;
        border: 5px solid red;
      }

      .box02 {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 200px;
        height: 200px;
        background-color: #bfa;
        margin: auto;
      }
    </style>
  </head>
  <body>
    <div class="box01">
      <div class="box02"></div>
    </div>
  </body>
</html>
```

## z-index

开启了定位后，可以通过 z-index 来设置元素的层级

z-index 的值越大，元素的层级就越高，层级越高越优先显示

如果层级一样，则优先显示下边的元素

z-index 可以设置为负值，设置负值后定位元素将会被文档流中的元素覆盖！

注意：祖先元素的层级再高，也无法盖住后代元素

## 固定定位

将 position 设置为 fixed 则开启了元素的固定定位

固定定位也是一种绝对定位，它的大部分的特点和绝对定位是相同的

不同点在于固定定位总是参照于浏览器的窗口进行定位

一旦定位，不会随窗口进行滚动

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        height: 2000px;
      }

      .box01 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }

      .box02 {
        width: 200px;
        height: 200px;
        background-color: orange;
      }

      .box03 {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 200px;
        height: 200px;
        background-color: deepskyblue;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    <div class="box02"></div>
    <div class="box03"></div>
  </body>
</html>
```

## 粘滞定位

将元素的 position 设置为 sticky 则开启了元素的粘滞定位，粘滞定位的特点和相对定位类似

定位参照物：粘滞定位相对于离它最近的拥有滚动条的祖先元素来定位

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        height: 2000px;
      }

      .box01 {
        position: sticky;
        top: 50px;
        width: 1000px;
        height: 200px;
        background-color: orange;
        margin: 100px auto;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, accusantium. Necessitatibus
      soluta doloremque fugiat aspernatur distinctio excepturi expedita, magni nobis, vel vitae
      neque facere voluptas a id culpa consequuntur corporis.
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius sint dolor, ad, commodi
      consequuntur harum quidem, modi impedit quisquam saepe similique labore dolorum nemo aut!
      Obcaecati alias labore vitae sint.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque distinctio consectetur,
      nulla dolorem error sunt ullam placeat ratione ad incidunt esse ipsa, enim, facilis nam eum
      repellendus quia laborum.
    </p>
  </body>
</html>
```

## 布局方法总结

传统的布局手段

盒子模型(box model)

- 盒子模型主要用来确定元素的大小和间距的
- 主要用来处理元素的纵向排列

浮动(float)

- 浮动本来是用来处理文本环绕图片这种类似效果的，后来被用到了元素的水平排列上
- 因为它不是被设计用来布局的，所以使用浮动时会存在一些问题(高度塌陷问题)
- 主要用来处理元素的横向排列
- 注意：盒子模型和浮动主要用来进行宏观的布局

定位(position)

- 通过定位可以将一个元素摆放到网页的任意位置
- 主要用来处理网页中的小东西

## 定位的总结

相对定位

- 不脱离文档流
- 相对定位参照于元素在文档流中的位置进行定位
- 相对定位更多的是配合绝对定位来使用

绝对定位

- 脱离文档流
- 绝对定位元素是参照于它的包含块来定位的
- 在网页中定位的主要手段就是绝对定位

固定定位

- 脱离文档流

offset(偏移量)

- 四个偏移量，可以有四种组合方式
- top left 通过左上角定位
- top right 通过右上角定位
- bottom left 通过左下角定位
- bottom right 通过右下角定位

## 弹性盒简介

弹性盒是 CSS3 中新添加的布局方式，通过它可以更加方便的完成我们对网页的布局

通过弹性盒模型，可以便捷的完成网页中的各种布局

弹性容器

- 要使用弹性盒必须先将元素设置为弹性容器
- display: flex 块级弹性容器
- display: inline-flex 行内弹性容器

弹性子元素(弹性项)

- 弹性容器的子元素都会自动变成弹性子元素
- 弹性子元素都会沿着弹性容器的主轴排列

主轴

- 主轴就是弹性子元素的排列方向

侧轴(辅轴)

- 侧轴是与主轴垂直方向的轴

## 主轴和侧重的设置

主轴

- 主轴就是弹性子元素排列方向
- 如何设置主轴方向：
  - flex-direction
    - 可选值：
      - row 主轴是自左向右水平排列
      - column 主轴是自上向下垂直排列
      - row-reverse 主轴是自右向左水平排列
      - column-reverse 主轴是自下向上垂直排列
- 设置元素是否换行
  - flex-wrap
    - 可选值：
      - nowrap 元素不会自动换行
      - wrap 自动换行
      - wrap-reverse 反向换行
- flex-flow：
  - flex-direction 和 flex-wrap 的简写属性
  - 可以同时设置两个样式并且没有顺序和数量的要求

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        /* box-sizing: border-box; */
      }

      ul {
        display: flex;
        /* flex-direction: row;
        flex-wrap: wrap; */
        flex-flow: row wrap;

        width: 300px;
        border: 5px solid red;
        list-style: none;
      }

      li {
        flex-shrink: 0;
        line-height: 100px;
        text-align: center;
      }

      li:first-child {
        width: 100px;
        height: 100px;
        background-color: #bfa;
      }

      li:nth-child(2) {
        width: 100px;
        height: 100px;
        background-color: orange;
      }

      li:nth-child(3) {
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
      }

      li:nth-child(4) {
        width: 100px;
        height: 100px;
        background-color: skyblue;
      }

      li:nth-child(5) {
        width: 100px;
        height: 100px;
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </body>
</html>
```

## 主轴和侧轴的对齐方式

justify-content

- 设置元素在主轴上的对齐方式
- 可选值：
  - start 默认值，元素靠主轴起始位置对齐
  - end 元素靠主轴的结束位置对齐
  - center 沿主轴方向居中对齐
  - space-between 将主轴方向空白位置分配到两个元素之间
  - space-around 将主轴方向空白位置分配到元素周围
  - space-evenly 将主轴方向的空白分配到元素的一侧

align-items

- 设置元素在侧轴上的对齐方式
- stretch 拉伸，元素会自动拉伸将侧轴撑满
- start 元素靠侧轴的起始位置对齐
- end 元素靠侧轴的结束位置对齐
- center 元素在侧轴上居中对齐

align-content

- 设置元素在侧轴上空白空间的分配
- space-between 将侧轴方向空白位置分配到两个元素之间
- space-around 将侧轴方向空白位置分配到元素周围
- space-evenly 将侧轴方向的空白分配到元素的一侧

元素居中的方式：

- 利用 margin:0 auto 来实现水平居中
- 利用定位来实现水平和垂直居中
- 利用弹性盒来实现水平和垂直居中

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      ul {
        display: flex;
        flex-flow: wrap;
        /* justify-content: center; */
        /* align-items: center; */
        align-content: space-evenly;
        width: 300px;
        height: 600px;
        border: 5px solid red;
        list-style: none;
      }

      li {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        line-height: 100px;
        text-align: center;
      }

      li:first-child {
        background-color: #bfa;
      }

      li:nth-child(2) {
        background-color: orange;
      }

      li:nth-child(3) {
        background-color: yellowgreen;
      }

      li:nth-child(4) {
        background-color: skyblue;
      }

      li:nth-child(5) {
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </body>
</html>
```

## 弹性子元素的伸缩

弹性子元素的样式(弹性项的样式)

flex-basis

- 弹性子元素的基础大小，会根据主轴的方向自动设置 width 或 height
- 主轴水平，设置宽度
- 主轴垂直，设置高度
- 可选值：
  - auto 默认值 以元素 width 或 height 为准

flex-shrink

- 弹性子元素的收缩系数
- 当父元素容纳不下所有子元素时，如何自动缩小元素大小
- 元素的收缩是根据 flex-basis 和 flex-shrink 综合计算的
- 收缩系数越大，元素基础大小越大，元素就缩的越多
- 默认值为 1，可以根据需要设置，如果设置为 0 则表示不收缩

flex-grow

- 弹性子元素的生长系数
- 当容器中有富余空间时，如何分配到子元素
- 默认值 0，元素默认不会变大

flex

- 上述三个属性的简写属性
- 属性顺序：
  - grow shrink basis
- 可选值：
  - initial 默认值 0 1 auto
  - auto 相当于 1 1 auto
  - none 相当于 0 0 auto

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      ul {
        display: flex;
        width: 800px;
        border: 5px solid red;
        list-style: none;
      }

      li {
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        /* flex-basis: 200px; */
        /* flex-grow: 1; */
        /* flex: 0 0 200px; */
        flex: auto;
      }

      li:first-child {
        background-color: #bfa;
        /* flex-grow: 1; */
      }

      li:nth-child(2) {
        background-color: orange;
        /* flex-grow: 2; */
      }

      li:nth-child(3) {
        background-color: yellowgreen;
        /* flex-grow: 3; */
      }

      li:nth-child(4) {
        background-color: skyblue;
        /* flex-grow: 4; */
      }

      li:nth-child(5) {
        background-color: yellow;
        /* flex-grow: 5; */
      }
    </style>
  </head>
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </body>
</html>
```

## align-items 和 order

align-self

- 弹性子元素的样式
- 用来单独设置某个弹性子元素的对齐方式

order

- 用来指定弹性子元素的位置

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      ul {
        display: flex;
        align-items: start;
        width: 800px;
        height: 600px;
        border: 5px solid red;
        list-style: none;
      }

      li {
        width: 100px;
        /* height: 100px; */
        line-height: 100px;
        text-align: center;
      }

      li:first-child {
        align-self: stretch;
        background-color: #bfa;
        order: 4;
      }

      li:nth-child(2) {
        background-color: orange;
        order: 5;
        align-self: end;
      }

      li:nth-child(3) {
        background-color: yellowgreen;
        order: 1;
      }

      li:nth-child(4) {
        background-color: skyblue;
        order: 2;
      }

      li:nth-child(5) {
        background-color: yellow;
        order: 3;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </body>
</html>
```

## 背景相关的样式

background-color

- 背景颜色

background-image

- 背景图片

background-repeat

- 背景的重复方式
- 可选值：
  - repeat 默认值，背景图片会沿元素的水平垂直双方向重复
  - repeat-x 水平方向重复
  - repeat-y 垂直方向重复
  - no-repeat 不重复
  - space 背景图片充满元素，无法完整充满使用空白隔开
  - round 背景图片自动缩放以充满元素

background-position

- 设置背景图片的位置
- 可选值：
  - top bottom left right center
  - 以从上述关键字中任选两个来设置一个背景图片的位置
  - 如果只传了一个关键字，则第二个默认为 center

background-position：水平偏移量 垂直偏移量

- 水平偏移量 值越大，背景图片越右移，可以设置负值
- 垂直偏移量 值越大，背景图片越下移，可以设置负值

## 雪碧图

当我们第一次使用按钮时，在按钮上会有这种闪烁的现象出现，这是因为，浏览器在加载外部资源时，是以懒加载的形式来完成的，像 hover active 这些图片都是在按钮状态触发时才加载的，网速即使再快也需要时间来完成加载，在图片加载完成前，超链接处在没有背景图片可以显示的状态，所以会显示空白

我们可以通过 CSS-Sprite 来解决这个问题，所谓 CSS-Sprite 就是指，将多个小的图片统一放入到一个大图片(雪碧图)中，然后通过偏移量来切换不同的图片，使用 CSS-Sprite 可以将多个小图片进行整合，减少客户端发送请求的次数，提升用户体验，在早期的网页中，几乎所有的小图标都是通过雪碧图来实现的，随着图标字体的广泛使用，雪碧图的使用也变得相对少了一些

雪碧图

- 雪碧图是位图，位图放大后会失真
- 雪碧图无法修改颜色
- 雪碧图支持彩色图标

图标字体

- 图标字体是矢量图，可以任意放大缩小不会失真
- 图标字体可以任意修改颜色
- 图标字体只支持单色图标

## background-size

background-size

- 用来设置背景图片的尺寸
- contain
  - 缩放图片使得图片可以在元素中完整显示，但是元素有的地方可能会不显示背景
- cover
  - 缩放图片使得图片可以将元素撑满，但是图片可能会显示不全(可能会改变图片比例)

注意：简写时 background-size 必须设置在 background-position 的后面，使用 / 分隔

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 400px;
        height: 400px;
        background: #bfa url(./016.jpg) no-repeat 0 0 / 300px;
        /* background-size: 100% auto; */
        /* background-size: 100% 100%; */
        /* background-size: contain; */
        /* background-size: cover; */
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## 剩余背景样式

background-origin

- 设置背景图片定位的原点
- 可选值：
  - `padding-box` 默认值，背景相对于内边距定位
  - `border-box` 背景相对于边框定位
  - `content-box` 背景相对于内容区定位

background-clip

- 设置背景图片显示的区域
- 可选值：
  - `border-box` 默认值，背景会延伸到边框的下面
  - `padding-box` 背景会延伸到内边距的下面
  - `content-box` 背景只会在内容区中显示

注意：简写时 background-clip 必须设置在 background-origin 的后面，使用空格分隔

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 400px;
        height: 400px;
        border: 10px double red;
        padding: 20px;
        background: #bfa url(./016.jpg) no-repeat padding-box content-box;
        background-size: cover;
        /* background-clip: content-box;
        background-origin: border-box; */
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## 表格(table)

和日常生活中使用的表格一样，在网页中也可以创建表格，可以通过表格来表示一些格式化的数据

`caption` 表格的标题

`thead` 表格的头部

`tbody` 表格主体

`tfoot` 表格的底部

`tr` 表示一行

`th` 用来表示表头中的单元格

`td` 表示一个单元格

`rowspan` 纵向合并单元格

`colspan` 横向合并单元格

如果在 table 中没有写 tbody，则浏览器会自动创建 tbody，并将所有的 tr 都放入到 tbody 中

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      table {
        border: 1px solid #000;
        border-collapse: collapse;
        width: 500px;
      }

      caption {
        font-size: 20px;
        font-weight: bold;
      }

      th,
      td {
        border: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <table>
      <caption>
        学生列表
      </caption>
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>住址</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>孙悟空</td>
          <td>男</td>
          <td>18</td>
          <td>花果山</td>
        </tr>
        <tr>
          <td>2</td>
          <td>猪八戒</td>
          <td>男</td>
          <td>28</td>
          <td>高老庄</td>
        </tr>
        <tr>
          <td>3</td>
          <td>沙和尚</td>
          <td>男</td>
          <td>38</td>
          <td>流沙河</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">总计：</td>
          <td rowspan="2">3人</td>
        </tr>
        <tr>
          <td colspan="4">总计：</td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>
```

## 表格的对齐

文字在 td 中会自动垂直居中

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        display: table-cell;
        vertical-align: middle;
        width: 400px;
        height: 400px;
        border: 5px solid red;
      }

      .box02 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="box01">
      <div class="box02"></div>
    </div>
  </body>
</html>
```

## 表单简介

在网页中，通过表单来将信息提交给服务器，使用 form 标签来创建一个表单，action 用来指定表单要提交到哪

文本框

- input type 属性为 text
- 如果希望表单中的数据真的被提交给服务器，必须为表单项指定 name 属性

提交按钮

- input type 属性为 submit
- 可以通过 value 属性来修改按钮上的文字

## 表单项

使用 input type 属性为 password 来创建密码框，密码框中的内容不会以明文显示，避免密码被偷看

默认情况下，表单中的数据会通过 url 地址来发送，url 地址中?后的内容被称为查询字符串(query string)，例如：?username=admin&password=123123，查询字符串是一个一个的名值对结构，一个数据名对应一个值，多个名值对之间使用&隔开，数据发送给服务器后，服务器可以根据数据名获取对应的值

单选框

- 使用 input type 属性为 radio 来创建一个单选框
- 单选框是通过 name 属性来分组的，相同 name 属性的为一组
- 像这种选择框，不需要用户填写内容，还必须为表单项指定 value，value 最终会成为提交给服务器的值

多选框

- 使用 input type 属性为 checkbox 来创建多选框

下拉列表

- 使用 select 来创建下拉列表
- 添加 multiple 属性后可以将下拉列表设置为多选的下拉列表

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form>
      <div>用户名： <input type="text" name="username" /></div>
      <div>密码： <input type="password" name="password" /></div>
      <div>
        性别：
        <input type="radio" name="gender" value="1" />男
        <input type="radio" name="gender" value="0" />女
      </div>
      <div>
        爱好：
        <input type="checkbox" name="hobby" value="1" />唱
        <input type="checkbox" name="hobby" value="2" />跳
        <input type="checkbox" name="hobby" value="3" />rap
        <input type="checkbox" name="hobby" value="4" />篮球
      </div>
      <div>
        你最喜欢的编程语言：
        <select name="language">
          <option value="JS">JavaScript</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
        </select>
      </div>
      <div>
        <input type="submit" value="登录" />
      </div>
    </form>
  </body>
</html>
```

## 表单的属性

placeholder

- 用来设置文本框的占位符

value

- 文本框中可以通过 value 来指定默认值

disabled

- 禁用表单项，不会被提交

readonly

- 表单项无法修改，但是可以提交

checked

- 设置单选和多选是否默认选中

selected

- 设置默认选中的下拉项

## 表单补充

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form>
      <div>用户名： <input type="text" name="username" placeholder="admin" readonly /></div>
      <div>密码： <input type="password" name="password" /></div>
      <div>
        性别：
        <label> <input type="radio" name="gender" value="1" />男 </label>
        <input type="radio" name="gender" value="0" id="female" checked /><label for="female"
          >女</label
        >
      </div>
      <div>
        爱好：
        <input type="checkbox" name="hobby" value="1" checked />唱
        <input type="checkbox" name="hobby" value="2" checked />跳
        <input type="checkbox" name="hobby" value="3" />rap
        <input type="checkbox" name="hobby" value="4" />篮球
      </div>
      <div>
        你最喜欢的编程语言：
        <select name="language">
          <option value="JS">JavaScript</option>
          <option value="Java" selected>Java</option>
          <option value="C++">C++</option>
        </select>
      </div>
      <div>
        <input type="submit" value="登录" />
        <input type="reset" />
        <input type="button" value="按钮" />
      </div>
      <div>
        <textarea cols="30" rows="10"></textarea>
      </div>
      <div>
        <button type="submit">登录</button>
        <button type="reset">重置</button>
        <button type="button">按钮</button>
      </div>
    </form>
  </body>
</html>
```

## 居中的总结

**使用盒子模型**

- 直接通过盒子模型 margin: 0 auto; 来实现居中
- 原理：
  - 利用了盒子模型在水平布局时的等式
  - 左右外边距 + 可见框宽度 = 包含块宽度
- 缺点：
  - 不能处理垂直居中问题
  - 居中的元素必须指定宽度

**使用定位**

- 通过如下代码来实现：
  ```css
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  ```
- 原理：
  - 利用定位后新的等式来实现居中
  - 左右偏移量 + 左右外边距 + 可见框的宽度 = 包含块的宽度
  - 上下偏移量 + 上下外边距 + 可见框的高度 = 包含块的高度
- 缺点：
  - 设置的样式稍微多一些
  - 必须指定元素的大小

**通过表格来居中**

- 将父元素的 display 设置 table-cell，然后通过 vertical-align:middle 来实现垂直居中
- 然后再通过子元素的 margin:0 auto; 来实现居中
- 也可以将子元素转换为 inline-block，然后通过 text-align:center 来实现水平居中
- 缺点：
  - 父元素设置为单元格后，默认宽度被内容撑开

**通过弹性盒来居中**

- 代码：
  ```css
  display: flex;
  justify-content: center;
  align-items: center;
  ```
- 缺点：
  - 几乎没有

## CSS 绘制三角形

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 0;
        height: 0;
        /* border-top: 10px solid red; */
        border-bottom: 10px solid orange;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## 隐藏一个元素

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        /* display: none; */
        /* visibility: hidden; */
        /* opacity: 0; */
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    111
  </body>
</html>
```

## 变形简介

通过变形可以对元素的位置，大小、角度等进行修改

transform

- 用来设置变形
- 需要通过不同的变形函数来实现元素的变形
- translateX() x 轴平移
- translateY() y 轴平移
- 设置平移时，如果使用百分比单位，百分比是相对于元素自身大小计算的
- 当我们对元素进行变形时，只会影响到元素自身，不会影响其他元素的位置

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        position: absolute;
        left: 50%;
        top: 50%;
        /* margin-left: -100px;
        margin-top: -100px; */
        width: 200px;
        height: 200px;
        background-color: #bfa;
        transform: translateX(-50%) translateY(-50%);
      }

      .box02 {
        width: 200px;
        height: 200px;
        background-color: tomato;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    <div class="box02"></div>
  </body>
</html>
```

## 平移

perspective

- 用来设置透视的效果
- 需要一个长度作为值，长度表示人眼和屏幕的距离

translateZ

- 用来设置 z 轴平移
- z 轴平移视觉上会感觉到元素大小的变化

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        perspective: 800px;
      }

      .box01 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
        transition: all 0.5s;
      }

      .box01:hover {
        /* transform: translateX(100px) translateY(200px) translateZ(200px); */
        /* transform: translate3d(100px, 200px, 200px); */
        transform: translate(100px, 200px);
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## 旋转

- `rotateX` 沿 x 轴旋转
- `rotateY` 沿 y 轴旋转
- `rotateZ` 沿 z 轴旋转
- 单位：
  - deg 度
  - turn 圈
- `transform-origin` 指定变形的原点

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        perspective: 800px;
      }

      .box01 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
        transition: all 3s;
        transform-origin: left bottom;
      }

      .box01:hover {
        /* transform: rotateZ(90deg); */
        transform: rotateZ(1turn);
        /* transform: translateX(100px) rotateZ(45deg); */
        /* transform: rotateZ(45deg) translateX(100px); */
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## 缩放

`scaleX`

- x 轴缩放

`scaleY`

- y 轴缩放

`scale`

- x 轴 y 轴都缩放

`scaleZ`

- z 轴缩放(需要 3d 下才能看出效果)

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
        margin: 200px auto;
        transition: all 1s;
      }

      .box01:hover {
        /* transform: scaleX(2); */
        /* transform: scaleY(2.5); */
        transform: scale(0.5);
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## 立方体

https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        perspective: 800px;
      }

      ul {
        position: relative;
        width: 200px;
        height: 200px;
        list-style: none;
        margin: 200px auto;
        transform-style: preserve-3d;
        transition: all 1s;
      }

      ul:hover {
        transform: rotateY(45deg) scaleZ(2);
      }

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 200px;
        height: 200px;
        color: #fff;
        font-size: 30px;
      }

      li:nth-child(1) {
        background-color: orange;
        z-index: 1;
        transform: translateZ(100px);
      }

      li:nth-child(2) {
        background-color: #bfa;
        transform: rotateY(90deg) translateZ(100px);
      }

      li:nth-child(3) {
        background-color: tomato;
        transform: rotateX(90deg) translateZ(100px);
      }

      li:nth-child(4) {
        background-color: deepskyblue;
        transform: rotateX(-90deg) translateZ(100px);
      }

      li:nth-child(5) {
        background-color: yellowgreen;
        transform: rotateY(-90deg) translateZ(100px);
      }

      li:nth-child(6) {
        background-color: brown;
        z-index: -1;
        transform: rotateY(180deg) translateZ(100px);
      }
    </style>
  </head>
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
    </ul>
  </body>
</html>
```

## 过渡(transition)

通过过渡可以使得元素在样式发生变化时，一点一点的改变

`transition-property`

- 应用过渡效果的属性
- all 表示所有样式

`transition-duration`

- 过渡效果所花费的时间
- 单位：
  - s 秒
  - ms 毫秒

`transition-delay`

- 过渡效果的延时

`transition-timing-function`

- 指定过渡的时间曲线
- 可选值：
  - ease 默认值 先加速然后减速
  - linear 匀速运动
  - ease-in 加速运动
  - ease-out 减速运动
  - 贝塞尔曲线 自定义运动方式 https://cubic-bezier.com/
  - steps() 分步执行动画

`transition`

- 过渡的简写属性，可以同时设置过渡的所有样式
- transition-duration 必须写在 transition-delay 的前面

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
        background-color: #bfa;
        /* transition-property: width, background-color;
        transition-duration: 1s;
        transition-delay: 2s;
        transition-timing-function: linear; */
        /* transition: all steps(5, jump-start) 1s 5s; */
        transition: all linear 1s 5s;
      }

      .box01:hover {
        width: 400px;
        background-color: orange;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    <div class="box02"></div>
  </body>
</html>
```

## 动画简介

`animation-name`

- 指定动画的名字

`animation-duration`

- 一次动画执行的时间

`animation-iteration-count`

- 动画执行的次数
- infinite 一直执行

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 100px;
        height: 100px;
        background-color: #bfa;
        animation-name: move;
        animation-duration: 5s;
      }

      @keyframes move {
        from {
          margin-left: 0;
        }

        to {
          margin-left: 500px;
        }
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## 关键帧

通过 keyframes 来定义关键帧

- from 表示动画的开始位置
- to 表示动画的结束位置

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 100px;
        height: 100px;
        background-color: #bfa;
        animation-name: move;
        animation-duration: 5s;
        animation-iteration-count: infinite;
      }

      @keyframes move {
        25% {
          margin-top: 100px;
          margin-left: 0;
        }

        50% {
          margin-top: 100px;
          margin-left: 500px;
        }

        75% {
          margin-left: 500px;
          margin-top: 0;
        }

        100% {
          margin-left: 0;
          margin-top: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## 动画样式

`animation-delay`

- 动画的延时

`animation-timing-function`

- 时间函数

`animation-direction`

- 动画的方向
- 可选值：
  - normal 默认值
  - reverse 动画反向执行
  - alternate 动画正向反向交替执行
  - alternate-reverse 和 alternate 相反

`animation-fill-mode`

- 动画的填充模式
- 可选值：
  - none 默认值 延迟时元素保持不变，动画执行结束恢复原状
  - forwards 延迟时元素保持不变，动画执行结束保持 to 的状态
  - backwards 延迟时元素变为 from 状态，动画执行结束恢复原状
  - both 延迟时元素变成 from 状态，动画执行结束保持 to 的状态

`animation-play-state`

- 动画的播放状态
- 可选值：
  - paused 暂停
  - running 运行

`animation`

- 简写属性可以同时设置所有动画相关的样式
- animation-duration 必须设置在 animation-delay 前面

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 100px;
        height: 100px;
        background-color: #bfa;
        /* animation-name: move; */
        /* animation-duration: 5s; */
        /* animation-iteration-count: 2; */
        /* animation-delay: 5s; */
        /* animation-timing-function: ease; */
        /* animation-direction: alternate-reverse; */
        /* animation-fill-mode: both; */
        /* animation-play-state: running; */
        animation: move 5s 3s;
      }

      .box01:hover {
        animation-play-state: paused;
      }

      @keyframes move {
        from {
          margin-left: 0;
          background-color: deepskyblue;
        }

        to {
          margin-left: 500px;
          background-color: orange;
        }
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## 精灵动画

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        width: 132px;
        height: 271px;
        background-image: url(./mitu.png);
        animation: mitu 1s steps(4) infinite;
      }

      @keyframes mitu {
        from {
          background-position: 0 0;
        }

        to {
          background-position: -528px 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

## steps

设置 steps 时，from 不算一步

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .box01 {
        width: 100px;
        height: 100px;
        background-color: #bfa;
        animation: move 5s steps(2) forwards;
      }

      @keyframes move {
        from {
          margin-left: 100px;
        }

        to {
          margin-left: 500px;
          background-color: orange;
        }
      }

      .box02 {
        position: absolute;
        top: 0;
        left: 500px;
        width: 5px;
        height: 300px;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
    <div class="box02"></div>
  </body>
</html>
```

## 钟表练习

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .clock {
        position: relative;
        width: 500px;
        height: 500px;
        border: 2px solid #000;
        border-radius: 50%;
        margin: 100px auto;
        background-image: url(./clock.png);
        background-size: contain;
      }

      .hour {
        position: absolute;
        bottom: 50%;
        left: 50%;
        width: 4px;
        height: 25%;
        background-color: orange;
        transform-origin: bottom;
        animation: clock-run 43200s linear infinite;
      }

      .minute {
        position: absolute;
        bottom: 50%;
        left: 50%;
        width: 3px;
        height: 35%;
        background-color: red;
        transform-origin: bottom;
        animation: clock-run 3600s linear infinite;
      }

      .second {
        position: absolute;
        bottom: 50%;
        left: 50%;
        width: 2px;
        height: 45%;
        background-color: #000;
        transform-origin: bottom;
        animation: clock-run 60s linear infinite;
      }

      @keyframes clock-run {
        from {
          transform: rotateZ(0deg);
        }

        to {
          transform: rotateZ(1turn);
        }
      }
    </style>
  </head>
  <body>
    <div class="clock">
      <div class="hour"></div>
      <div class="minute"></div>
      <div class="second"></div>
    </div>
  </body>
</html>
```

## 布局回顾

原始的布局方式(table)

网格布局(grid)

- 网格布局的方式和 table 类似
- 网格布局将网页分为了一行一行和一列一列的，通过对这些行和列的设置帮助我们完成布局
- 网格布局比较适用于复杂的布局
- 相较于弹性盒，无需设置多余的结构
- 结构简单，样式复杂

弹性盒(flex)

- 弹性盒擅于单行单列
- 多行多列布局时，需要使用不同的结构组合使用
- 结构复杂，样式简单

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <table border width="50%">
      <tr height="100">
        <td colspan="2">网页的头部</td>
      </tr>
      <tr height="300">
        <td width="100">菜单</td>
        <td>
          <table border width="100%" height="300">
            <tr hight="100">
              <td colspan="3">上半部分</td>
            </tr>
            <tr hight="100">
              <td>图片</td>
              <td>图片</td>
              <td>图片</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr height="100">
        <td colspan="2">底部</td>
      </tr>
    </table>
  </body>
</html>
```

## 网格布局简介

网格容器

- 要使用网格布局必须先设置网格容器
- 使用 display:grid 或 display:inline-grid
- 默认情况下，我们开启的是一个单列的网格布局

`grid-template-columns`

- 用来设置网格布局的列数

`grid-template-rows`

- 用来设置网格布局的行数

`repeat()`

- 重复设置

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .outer {
        display: grid;
        /* grid-template-columns: 100px 200px 100px 400px; */
        /* grid-template-columns: 100px auto 200px 200px; */
        /* grid-template-columns: 1fr 1fr 1fr 1fr; */
        /* grid-template-columns: repeat(2, 1fr 2fr); */
        grid-template-columns: 2fr repeat(2, 1fr 2fr);
        grid-template-rows: 100px 200px;
        width: 800px;
        border: 5px solid red;
      }

      .box01 {
        background-color: #bfa;
      }

      .box02 {
        background-color: orange;
      }

      .box03 {
        background-color: deepskyblue;
      }

      .box04 {
        background-color: tomato;
      }

      .box05 {
        background-color: brown;
      }

      .box06 {
        background-color: chocolate;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="box01">box01</div>
      <div class="box02">box02</div>
      <div class="box03">box03</div>
      <div class="box04">box04</div>
      <div class="box05">box05</div>
      <div class="box06">box06</div>
    </div>
  </body>
</html>
```

## 网格的合并

网格项

- 网格容器的子元素都会自动变为网格项
- `grid-column-start` 网格列的起始位置
- `grid-column-end` 网格列的结束位置
- `grid-row-start` 网格行的起始位置
- `grid-row-end` 网格行的结束位置

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .outer {
        display: grid;
        grid-template-columns: repeat(2, 1fr 2fr);
        grid-template-rows: 100px 200px 100px;
        width: 800px;
        border: 5px solid red;
      }

      .box01 {
        background-color: #bfa;
      }

      .box02 {
        background-color: orange;
        grid-column-start: 2;
        /* grid-column-end: -1; */
        grid-column-end: span 2;
        grid-row-start: 1;
        grid-row-end: 3;
      }

      .box03 {
        background-color: deepskyblue;
      }

      .box04 {
        background-color: tomato;
      }

      .box05 {
        background-color: brown;
      }

      .box06 {
        background-color: chocolate;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="box01">box01</div>
      <div class="box02">box02</div>
      <div class="box03">box03</div>
      <div class="box04">box04</div>
      <div class="box05">box05</div>
      <div class="box06">box06</div>
    </div>
  </body>
</html>
```

## 网格布局练习

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        display: grid;
        grid-template-columns: 100px 150px 150px 150px;
        grid-template-rows: 100px 150px 150px 100px;
      }

      .box01 {
        grid-column-start: 1;
        grid-column-end: -1;
        background-color: #bfa;
      }

      .box02 {
        grid-row-start: 2;
        grid-row-end: 4;
        background-color: orange;
      }

      .box03 {
        grid-column-start: 2;
        grid-column-end: -1;
        background-color: tomato;
      }

      .box04 {
        background-color: deepskyblue;
      }

      .box05 {
        background-color: brown;
      }

      .box06 {
        background-color: chocolate;
      }

      .box07 {
        grid-column-start: 1;
        grid-column-end: -1;
        background-color: yellowgreen;
      }
    </style>
  </head>
  <body>
    <div class="box01">网页的头部</div>
    <div class="box02">菜单</div>
    <div class="box03">上半部分</div>
    <div class="box04">图片</div>
    <div class="box05">图片</div>
    <div class="box06">图片</div>
    <div class="box07">底部</div>
  </body>
</html>
```

## 网格的样式

可以通过 z-index 来调整网格项的层级

`grid-column`

- 同时设置列开始和列结束
- grid-column: 列开始/列结束

`grid-row`

- 同时设置行开始和行结束
- grid-row: 行开始/行结束

`grid-area`

- 同时设置行列的开始和结束
- grid-area: 行开始/列开始/行结束/列结束

`column-gap`

- 列间距

`row-gap`

- 行间距

`gap`

- 同时指定行间距和列间距
- grid-gap: 行间距 列间距

`justify-items`

- 设置网格中元素水平方向的对齐方式

`align-items`

- 设置网格中元素垂直方向的对齐方式

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        display: grid;
        grid-template-columns: 100px 150px 150px 150px;
        grid-template-rows: 100px 150px 150px 100px;
        /* column-gap: 10px;
        row-gap: 20px; */
        gap: 20px 10px;
      }

      .box01 {
        /* grid-column: 1/-1;
        grid-row: 1/2; */
        grid-area: 1/1/2/-1;
        background-color: #bfa;
        z-index: 1;
      }

      .box02 {
        grid-row: 2/4;
        grid-column: 1/2;
        background-color: orange;
      }

      .box03 {
        grid-column: 2/-1;
        background-color: tomato;
      }

      .box04 {
        background-color: deepskyblue;
      }

      .box05 {
        background-color: brown;
      }

      .box06 {
        background-color: chocolate;
      }

      .box07 {
        grid-column: 1/-1;
        background-color: yellowgreen;
      }
    </style>
  </head>
  <body>
    <div class="box01">网页的头部</div>
    <div class="box02">菜单</div>
    <div class="box03">上半部分</div>
    <div class="box04">图片</div>
    <div class="box05">图片</div>
    <div class="box06">图片</div>
    <div class="box07">底部</div>
  </body>
</html>
```

**网格布局水平垂直居中**

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box01 {
        display: grid;
        justify-items: center;
        align-items: center;
        /* place-items: center; */
        width: 500px;
        height: 500px;
        border: 5px solid red;
      }

      .box02 {
        width: 100px;
        height: 100px;
        background-color: #bfa;
      }
    </style>
  </head>
  <body>
    <div class="box01">
      <div class="box02"></div>
    </div>
  </body>
</html>
```

## 网格的对齐

`justify-items / align-items`

- 设置网格项在轨道中的对齐方式

`justify-content / align-content`

- 设置网格项的整体对齐方式

`justify-self / align-self`

- 单独设置某一个网格项在轨道中的对齐方式

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .outer {
        display: grid;
        grid-template-columns: repeat(3, 200px);
        grid-template-rows: 100px 100px;
        justify-content: center;
        align-content: center;
        /* justify-items: center;
        align-items: center; */
        gap: 10px;
        width: 800px;
        height: 300px;
        border: 5px solid red;
      }

      .outer div {
        border: 2px solid deepskyblue;
      }

      .box01 {
        justify-self: center;
        align-self: center;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="box01">box01</div>
      <div class="box02">box02</div>
      <div class="box03">box03</div>
      <div class="box04">box04</div>
      <div class="box05">box05</div>
      <div class="box06">box06</div>
    </div>
  </body>
</html>
```

## 命名网格线

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .outer {
        display: grid;
        grid-template-columns: [a] 200px [b] 200px [c] 200px [d];
        grid-template-rows: [head-row-start] 100px [head-row-end side-row-start] 100px [side-row-end];
        gap: 10px;
        width: 800px;
        border: 5px solid red;
      }

      .outer div {
        border: 2px solid deepskyblue;
      }

      .box01 {
        grid-column: a/c;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="box01">box01</div>
      <div class="box02">box02</div>
      <div class="box03">box03</div>
      <div class="box04">box04</div>
      <div class="box05">box05</div>
      <div class="box06">box06</div>
    </div>
  </body>
</html>
```

## 命名区域布局

`grid-template-areas`

- 可以设置命名的区域如何在容器中排布

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .outer {
        display: grid;
        grid-template-columns: 200px 200px 200px 200px;
        grid-template-rows: 100px 150px 150px 100px;
        grid-template-areas:
          'header header header .'
          'side main main main'
          'side main main main'
          'footer footer footer footer';
        gap: 10px;
        border: 5px solid red;
      }

      .outer div {
        border: 2px solid deepskyblue;
      }

      .box01 {
        grid-area: header;
      }

      .box02 {
        grid-area: side;
      }

      .box03 {
        grid-area: main;
      }

      .box04 {
        grid-area: footer;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="box01">头部</div>
      <div class="box02">侧边栏</div>
      <div class="box03">主要内容</div>
      <div class="box04">底部</div>
    </div>
  </body>
</html>
```

## 自动行列

`grid-auto-flow`

- 网格项的排列方式
- 可选值：
  - row 默认值，优先填充行，行满了会自动创建新行
  - column 优先填充列，列满了会自动换到下一列，此时不会自动生成行
  - dense 紧凑的，容器中有位置，后边的元素就会自动的补位(适用于瀑布流布局)

`grid-auto-rows`

- 指定自动行的高度

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .outer {
        display: grid;
        grid-auto-flow: dense;
        /* grid-template-rows: repeat(3, 100px); */
        /* grid-auto-columns: 200px; */
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 100px 200px 300px;
        gap: 10px;
        width: 800px;
        border: 5px solid red;
      }

      .outer div {
        border: 2px solid deepskyblue;
      }

      .box02 {
        grid-row: 2/3;
      }

      .box03 {
        grid-column: 3/4;
      }

      .box05 {
        grid-column: 3/4;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="box01">box01</div>
      <div class="box02">box02</div>
      <div class="box03">box03</div>
      <div class="box04">box04</div>
      <div class="box05">box05</div>
      <div class="box06">box06</div>
      <div class="box07">box07</div>
      <div class="box08">box08</div>
      <div class="box09">box09</div>
      <div class="box10">box10</div>
      <div class="box11">box11</div>
      <div class="box12">box12</div>
    </div>
  </body>
</html>
```

## 网格补充

`minmax(最小值, 最大值)`

- 用来设置行和列的大小
- 可选值：
  - 像素、auto、min-content、max-content

`repeat()`

- 自动重复设置行和列
- 第一个值：
  - auto-fill 自动计算列，尽可能多的生成列
  - auto-fit 自动计算列，尽量让列可以容纳下所有元素

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .outer {
        display: grid;
        /* grid-template-columns: 100px 200px minmax(300px, auto); */
        /* grid-template-columns: 100px 200px minmax(auto, min-content); */
        /* grid-template-columns: repeat(auto-fill, minmax(50px, auto)); */
        grid-template-columns: repeat(auto-fit, minmax(50px, auto));
        grid-auto-rows: minmax(100px, auto);
        gap: 10px;
        border: 5px solid red;
      }

      .outer div {
        border: 2px solid deepskyblue;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="box01">box01</div>
      <div class="box02">box02</div>
      <div class="box03">box03</div>
      <div class="box04">box04</div>
      <div class="box05">box05</div>
      <div class="box06">box06</div>
      <div class="box07">box07</div>
      <div class="box08">box08</div>
      <div class="box09">box09</div>
      <div class="box10">box10</div>
      <div class="box11">box11</div>
      <div class="box12">box12</div>
    </div>
  </body>
</html>
```

## 移动端

- 像素(px)
  - 像素是屏幕上一个一个会发光的小点
  - 物理像素
    - 会发光的小点
  - CSS 像素
    - 我们编写样式时使用 px
  - 我们编写样式时使用的是 CSS 像素，屏幕呈现图像时使用的是物理像素
    - 默认情况下在 pc 中，一个 CSS 像素对应一个物理像素(1 : 1)
  - 当我们在浏览器中或系统中对网页进行缩放时，像素比会发生变化
    - 比如：当我们将网页放大 1.5 倍时，CSS 像素是不变的
    - 而物理像素会变为原来的 1.5 倍大 (1 : 1.5)
- 视口(viewport)
  - 浏览器的可视区域称为视口
- 移动端
  - 移动端的项目通常都会运行在手机中
    - 手机屏幕清晰度都是非常的高的(物理像素越小，清晰度就越高)
  - 例子：
    - 显示器
      - 宽 两尺半 1920px
    - 手机
      - 宽 半尺 1170px
    - 从这个粗糙的案例我们能够得出一个结论：
      - 手机的单个像素要远远地小于显示器的！
    - 同样是 12px 的字体，在显示器中看起来正合适
      - 但是到了手机中，就是看不清的
      - 也就是说，如果将 pc 端的页面直接在手机中呈现，效果是很差的！
    - 为了使得 pc 端页面可以在手机中正常显示
      - 在显示 pc 端页面时，移动端的浏览器会自动将视口宽度转换为 980px
      - 如果 pc 端页面大小超过了 980px，浏览器会自动对页面进行缩小，使得网页可以在浏览器中完整呈现
      - 但是即使这样，网页在移动端浏览器中的体验依然非常的不好
    - 移动端浏览器，默认的像素比是：
      - 980 : xxx
      - 980 : 1170
      - 980 : 1080
    - 为了在移动端有一个更好的体验，公司可以为手机设置一个专门的页面
    - 每一个移动设备在出厂时，都会设计一个最佳的像素的比，只有达到最佳的像素比时，才能确保网页在移动端中有一个最佳的效果。
    - 例如：
      - iPhone 12 pro 的像素比是 1:3 1 个 css 像素 对应 3 个物理像素
    - 要使得浏览器有一个最佳效果，必须先使得网页变成最佳像素比
      - 目前：980 : 1170 390 : 1170
      - 期望：1 : 3
      - 可以通过调整视口的大小来改变像素比
      - `<meta name="viewport" content="width=390px">`
        - 当一个视口的宽度可以使得像素比变为最佳像素比时，这个视口(宽)就被称为完美视口
        - iPhone12 pro 的完美视口就是 390
        - 但是！不同手机的完美视口是不同的，如果简单粗暴设置为 390，这样一来只能在该手机中取得最佳效果
          - 其他手机就不行了！
        - 我们希望我们的页面在不同的设备中都能以完美视口来呈现
          - 在 12pro，视口是 390
          - 在 se 中， 视口是 375
          - 在 max 中， 视口是 414
        - `<meta name="viewport" content="width=device-width">` 可以确保网页在任何设备下都会有一个完美视口！
        - 记住！凡是开发需要在移动端中访问的页面，都要加上完美视口
- 适配问题
  - 开启完美视口后，任何移动设备都能获得一个最佳的浏览效果
    - 但是，这样却导致了不同设备下视口宽度不同
    - 同样是 390px，在 iphone 12 pro 下是全屏，但到 iphone se 下就出现了滚动条，到了 iPad 下就剩下了一半了！
    - 这样一来，我们就不能在移动端项目中再使用 px 作为单位了！
  - 可以使用 vw 来解决这个问题，vw - viewport width 视口宽度
    - 1vw = 1% 视口宽度
- 实际开发中，设计图的宽度都是像素为单位的，有 375 750 1125 414 ...
  - 在将设计图转换为页面时，单位 vw
  - 以 750px 宽的设计图为例 750px = 100vw 1px = 0.1333333vw
  - 如何显示 688px x 91px 的元素 89.44vw x 11.83vw

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: calc(100vw / 750);
      }

      body {
        font-size: 32rem;
      }

      .box01 {
        width: 688rem;
        height: 92rem;
        background-color: #bfa;
      }
    </style>
  </head>
  <body>
    <div class="box01"></div>
  </body>
</html>
```

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
