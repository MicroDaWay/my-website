import Layout from '@theme/Layout'
import classes from './index.module.css'
import Line from '../components/Line/Line'

export default function Home() {
  return (
    <Layout>
      <div className={classes.resume}>
        <div className={classes.introduce}>
          <div>
            <div>姓名：刘尉伟</div>
            <div>性别：男</div>
            <div>年龄：23</div>
            <div>求职岗位：前端开发工程师</div>
          </div>
          <div className={classes.right}>
            <div>手机号：180xxxxxxxx</div>
            <div>邮箱：microdaway@outlook.com</div>
            <div>
              个人网站：
              <a href="https://microdaway.github.io">https://microdaway.github.io</a>
            </div>
            <div>求职状态：随时入职</div>
          </div>
        </div>
        <Line title="教育经历" />
        <div>信息管理与信息系统&nbsp;&nbsp;&nbsp;&nbsp;全日制本科</div>
        <div>通过英语四级、英语六级</div>
        <Line title="专业技能" />
        <ol className={classes.skills}>
          <li>熟练掌握 HTML和CSS，熟练掌握弹性布局，能够快速实现Web端和移动端页面搭建</li>
          <li>熟练掌握 JavaScript，理解原型，闭包，异步等概念，熟练掌握 ES6+ 语法</li>
          <li>
            熟悉 Node.js 和常用模块，在此基础上能够使用 Express
            等Web框架进行简单的服务器应用程序开发
          </li>
          <li>熟练掌握 Axios，Fetch 发送网络请求，熟练掌握 Promise 处理异步逻辑</li>
          <li>熟悉 Git 常用命令，能够使用 Git 进行版本控制</li>
          <li>熟悉 Vue2 及 Vue3 全家桶，能够使用 Vue3 结合 TypeScript 进行类型检查</li>
          <li>了解微信小程序和 uni-app 的开发</li>
          <li>了解 ECharts 数据可视化工具的使用</li>
          <li>了解 Java，了解 Linux 的常用命令，熟悉 MySQL 数据库的常用 SQL 语句</li>
        </ol>
        <Line title="项目经历" />
        <div>
          <span className={classes.item}>项目名称：</span>后台管理系统
        </div>
        <div>
          <span className={classes.item}>项目描述：</span>
          该项目是一个后台管理系统，主要用于公司统一管理企业员工，提高管理效率，为企业提供一站式的解决方案，项目包含登录，主页，公司架构，公司角色，权限设计等模块
        </div>
        <div>
          <span className={classes.item}>技术选型：</span>Vue3、TypeScript、Vite、Element
          Plus、Pinia、Vue Router
        </div>
        <div>
          <span className={classes.item}>项目内容：</span>
          <ol className={classes.content}>
            <li>
              Axios 的二次封装，请求拦截器携带 token，响应拦截器简化数据并对请求错误弹出错误信息
            </li>
            <li>
              Pinia 集中状态管理，多个组件共享数据和方法，对用户 token 使用 localStorage 本地化存储
            </li>
            <li>
              划分不同等级的用户，不同等级的用户在登录系统后有不同的路由权限，根据后端的返回数据在前端实现权限管理，如动态路由、权限按钮
            </li>
            <li>统一封装处理各个页面逻辑，如增删改查、工具函数、自定义校验、处理时间格式</li>
            <li>用ECharts做数据可视化展示</li>
            <li>一些性能优化，如路由懒加载、第三方组件库按需导入</li>
          </ol>
        </div>
        <div>
          <span className={classes.item}>项目难点：</span>
          <ol className={classes.content}>
            <li>从0-1进行项目搭建</li>
            <li>对用户权限的访问控制</li>
            <li>使用ECharts实现数据可视化展示</li>
          </ol>
        </div>
        <div>
          <span className={classes.item}>项目收获：</span>
          通过该项目的开发，对搭建整个脚手架，理解这种基于角色的权限控制访问(理解后台系统权限并实现)，对全局组件封装提高开发效率有⼀定理解
        </div>
        <br />

        <div>
          <span className={classes.item}>个人项目</span>
        </div>
        <div>
          <span className={classes.item}>项目名称：</span>校园跑腿微信小程序
        </div>
        <div>
          <span className={classes.item}>项目描述：</span>
          这是一个使用uni-app开发的校园跑腿微信小程序，使用Vue3构建前端页面，后端采用Java、Spring
          Boot3、MySQL数据库开发项目接口
        </div>
        <div>
          <span className={classes.item}>主要功能描述：</span>
          普通用户可以下订单，骑手可以接单，普通用户可以申请成为骑手，管理员需要审核才能让普通用户成为骑手，以及对用户页面和按钮级权限的控制
        </div>
        <div>
          <span className={classes.item}>技术选型：</span>
          Vue3、TypeScript、Pinia、uni-app、Java、Spring Boot3、MySQL
        </div>
        <div>
          <span className={classes.item}>项目难点：</span>
          <ol className={classes.content}>
            <li>用户下单、跑腿接单业务的梳理与设计</li>
            <li>对用户权限的设计</li>
            <li>订单表设计，下单流程开发</li>
            <li>通用组件封装提高开发效率</li>
            <li>后端编码，权限设计与实现，MySQL数据库使用、异常处理、响应数据封装、token生成</li>
          </ol>
        </div>
        <div>
          <span className={classes.item}>项目收获：</span>
          通过该项目的开发，理解前后端分离的概念和开发模式，明白了架构设计以及开发⼈员开发规范的重要性。对Vue3
          Composition
          API的使用更加熟练，对后端框架，后端数据库的设计，token鉴权、文件上传、后端业务设计有了更深的理解
        </div>
        <div>
          <span className={classes.item}>项目仓库地址：</span>
          <ul className={classes.repository}>
            <li>
              后端代码：
              <a href="https://github.com/MicroDaWay/xypt">https://github.com/MicroDaWay/xypt</a>
            </li>
            <li>
              前端代码：
              <a href="https://github.com/MicroDaWay/xypt-web">
                https://github.com/MicroDaWay/xypt-web
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
