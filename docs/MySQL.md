---
sidebar_position: 15
---

# MySQL

## MySQL 的登录

**服务的启动与停止**

```bash
net start mysql80 # 启动 MySQL 服务的命令
net stop mysql80 # 停止 MySQL 服务的命令
```

**登录**

```bash
mysql -uroot -p
mysql -uroot -P3306 -hlocalhost -p
mysql -uroot -P3306 -h127.0.0.1 -p

# -u 指定用户名
# -P 指定端口号
# -h 指定主机名或ip地址
# -p 指定密码
```

**退出登录**

```bash
quit或exit
```
