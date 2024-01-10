import Layout from '@theme/Layout'
import classes from './index.module.css'
import Line from '../components/Line'

export default function Home() {
  return (
    <Layout>
      <div className={classes.resume}>
        <h2>刘尉伟</h2>
        <p>
          <span>手机号：18058574628</span>
          <span className={classes.email}>邮箱：microdaway@outlook.com</span>
        </p>
        <p>
          <span>求职岗位：前端工程师</span>
          <span className={classes.website}>
            个人网站：
            <a href="https://microdaway.github.io" target="_blank">
              https://microdaway.github.io
            </a>
          </span>
        </p>
        <Line title="教育经历" />
        <p>信息管理与信息系统</p>
        <p>全日制本科 数据科学与计算机学院</p>
        <p>通过英语四级、英语六级</p>
        <Line title="专业技能" />
        <ol className={classes.skills}>
          <li>熟练使用 HTML 和 CSS，理解并掌握盒子模型，熟练使用Flex布局，能够对移动端进行适配</li>
          <li>熟练使用 JavaScript，理解原型、闭包、异步等概念，熟练使用 ES6 语法</li>
          <li>熟练使用 Promise 处理异步逻辑</li>
          <li>熟练使用 Node.js，能够使用 express 编写服务器</li>
          <li>熟练使用 axios，fetch 发送请求</li>
          <li>熟悉 git 常用命令，能够使用 git 进行版本控制</li>
          <li>能够使用 TypeScript 进行类型检查</li>
          <li>
            熟练使用 Vue3 进行项目开发，包括封装组件、状态管理 Pinia、路由 Vue Router、前端组件库
            Element Plus等
          </li>
          <li>了解微信小程序和 uni-app 的开发</li>
          <li>了解 Echarts 数据可视化工具的使用</li>
          <li>了解 Java，了解 Linux 的常用命令，熟悉 MySQL 数据库的常用 SQL 语句</li>
        </ol>
        <Line title="项目经历" />
        <h3>后台管理系统</h3>
        <p>从0-1搭建一个后台管理系统，实现一些增删改查的业务，功能类似于 vue-element-admin</p>
        <p>技术栈：Vue3、Pinia、Vue Router、Vite、Element Plus</p>
        <p>使用 Echarts 数据可视化实现数据大屏</p>
        <p>核心功能：根据不同的用户展示不同的菜单和按钮，实现菜单和按钮的权限控制</p>
        <h3>移动端购物网站</h3>
        <p>实现移动端的购物网站，进行移动端适配</p>
        <p>主要功能：商品浏览、搜索、购物车管理、下单支付、用户评价等</p>
        <p>技术栈：Vue3、Pinia、Vue Router、Vite</p>
        <p>
          使用 vueuse 中的一些工具快速实现一些功能，例如使用 useInfiniteScroll
          实现无限滚动，同时可以进行节流处理，实现搜索功能时使用 refDebounced 进行防抖处理
        </p>
        <h3>校园跑腿微信小程序</h3>
        <p>使用uni-app开发校园跑腿微信小程序，这是一个全栈项目，由本人独立开发完成</p>
        <p>技术栈：Vue3、uni-app、Pinia、Spring Boot3、Java、MySQL数据库</p>
        <p>
          项目描述：普通用户可以下订单，骑手可以接单，普通用户可以申请成为骑手，管理员需要审核才能让普通用户成为骑手，里面也有一些页面和按钮级权限的控制，只有相应的用户才能进行访问
        </p>
        <p>
          实现了对 uni-request
          的二次封装，修改用户头像时将头像上传到阿里云中，以及对订单状态的控制，用户权限的控制等
        </p>
      </div>
    </Layout>
  )
}
