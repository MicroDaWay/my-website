import Layout from '@theme/Layout'
import classes from './index.module.css'
import Line from '../components/Line'

export default function Home() {
  return (
    <Layout>
      <div className={classes.resume}>
        <h2>刘尉伟</h2>
        <p>
          <span>性别：男</span>
          <span className={classes.age}>年龄：23</span>
          <span className={classes.phone}>手机号：180xxxxxxxx</span>
          <span className={classes.email}>邮箱：microdaway@outlook.com</span>
        </p>
        <p>
          <span>求职岗位：前端工程师</span>
          <span className={classes.status}>求职状态：随时入职</span>
          <span className={classes.website}>
            个人网站：
            <a href="https://microdaway.github.io">https://microdaway.github.io</a>
          </span>
        </p>
        <Line title="教育经历" />
        <p>信息管理与信息系统&nbsp;&nbsp;&nbsp;&nbsp;全日制本科</p>
        <p>通过英语四级、英语六级</p>
        <Line title="专业技能" />
        <ol className={classes.skills}>
          <li>熟练掌握 HTML+CSS，熟练掌握弹性布局，能够快速实现Web端和移动端页面搭建</li>
          <li>熟练掌握 JavaScript，理解原型，闭包，异步等概念，熟练掌握 ES6+ 语法</li>
          <li>
            熟悉 Node.js 和常用模块，在此基础上能够使用 Express 等 Web
            框架进行简单的服务器应用程序开发
          </li>
          <li>熟练掌握 axios，fetch 发送网络请求，熟练掌握 Promise 处理异步逻辑</li>
          <li>熟悉 git 常用命令，能够使用 git 进行版本控制</li>
          <li>熟悉 Vue2 及 Vue3 全家桶，能够使用 Vue3 结合 TypeScript 进行类型检查</li>
          <li>了解微信小程序和uni-app的开发</li>
          <li>了解 Echarts 数据可视化工具的使用</li>
          <li>了解 Java，了解 Linux 的常用命令，熟悉 MySQL 数据库的常用 SQL 语句</li>
        </ol>
        <Line title="项目经历" />
        <h3>基于Vue3的后台管理系统</h3>
        <p>项目描述：该项目是一个后台管理系统，主要用于数据管理及数据可视化的展示</p>
        <p>技术选型：Vue3、TypeScript、Vite、Element Plus、Pinia、Vue Router</p>
        <p>项目难点：从0-1进行搭建，对用户权限的访问控制，使用Echarts实现数据大屏</p>
        <p>
          项目收获：通过该项目的开发，搭建整个脚手架，理解了基于角色的权限控制访问，理解后台管理系统的权限管理，熟悉了Vue3组合式API的使用
        </p>
        <h3>基于Vue3的移动端购物网站</h3>
        <p>项目描述：该项目是一个移动端购物网站，实现移动端的购物网站，进行移动端适配</p>
        <p>主要功能：商品浏览、商品搜索、购物车管理、下单支付、用户评价等</p>
        <p>技术选型：Vue3、TypeScript、Vite、Element Plus、Pinia、Vue Router</p>
        <p>
          项目收获：通过该项目的开发，学会通过使用 vueuse
          工具库来快速实现一些功能，对项目的开发流程更加熟悉
        </p>
        <h3>基于Vue3的校园跑腿微信小程序</h3>
        <p>项目描述：这是一个使用uni-app开发的微信小程序，这是一个全栈项目</p>
        <p>
          主要功能描述：普通用户可以下订单，骑手可以接单，普通用户可以申请成为骑手，管理员需要审核才能让普通用户成为骑手，以及对用户页面和按钮级权限的控制
        </p>
        <p>技术选型：Vue3、TypeScript、Pinia、uni-app、Java、Spring Boot3、MySQL</p>
        <p>项目难点：对订单状态的管理、以及对用户权限的管理</p>
        <p>
          项目收获：对项目的开发流程，前后端的分工职责有了更深的理解，学会了将图片上传到阿里云的对象存储中
        </p>
        <p>
          项目仓库地址：
          <a href="https://github.com/MicroDaWay/xypt" target="_blank">
            https://github.com/MicroDaWay/xypt
          </a>
          ，
          <a href="https://github.com/MicroDaWay/xypt-web" target="_blank">
            https://github.com/MicroDaWay/xypt-web
          </a>
        </p>
      </div>
    </Layout>
  )
}
