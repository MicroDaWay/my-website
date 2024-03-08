import classes from './index.module.css'
import Line from '../components/Line/Line'
import Layout from '@theme/Layout'

const Implement = () => {
  return (
    <Layout>
      <div className={classes.implement}>
        <Line title="基本信息" />
        <div className={classes.basicInfo}>
          <div>
            <div>姓名：刘尉伟</div>
            <div>性别：男</div>
            <div>年龄：23</div>
            <div>求职岗位：实施实习</div>
          </div>
          <div className={classes.right}>
            <div>手机号：180xxxxxxxx</div>
            <div>邮箱：microdaway@outlook.com</div>
            <div>
              个人网站：
              <a href="https://microdaway.github.io" target="_blank">
                https://microdaway.github.io
              </a>
            </div>
            <div>求职状态：立即到岗</div>
          </div>
        </div>
        <Line title="教育背景" />
        <div className={classes.education}>
          <div>
            山东财经大学燕山学院&nbsp;&nbsp;&nbsp;&nbsp;信息管理与信息系统&nbsp;&nbsp;&nbsp;&nbsp;全日制本科
          </div>
          <div>荣誉奖项：连续三年获得校级奖学金</div>
          <div>语言技能：通过英语四级、英语六级</div>
          <div>其他技能：计算机二级证书，初级会计证书</div>
          <div className={classes.time}>2020.09~至今</div>
        </div>
        <Line title="专业技能" />
        <ol className={classes.skills}>
          <li>掌握基础的软件开发知识</li>
          <li>掌握关系型数据库基础知识，及基本的 SQL 语句的使用</li>
          <li>熟悉 Windows 系统的安装、操作及维护</li>
          <li>了解 Linux 操作系统，掌握 Linux 的常用命令</li>
          <li>熟练使用计算机以及Office办公软件</li>
          <li>
            熟悉前端开发技术，如 HTML、CSS、JavaScript、Vue2 和 Vue3 及其周边的生态，了解
            React、微信小程序和 uni-app 的开发
          </li>
        </ol>
        <Line title="自我评价" />
        <div>
          本人积极向上，勤奋好学，吃苦耐劳，能承受工作压力，有高度责任感，有良好的学习能力及强烈的学习欲望，工作认真负责，有耐心，有职业责任感，思维灵活，善于接受新知识，愿意共同成长，具有良好的团队合作精神
        </div>
      </div>
    </Layout>
  )
}

export default Implement
