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
quit
或
exit
```

## MySQL5.7 字符集的设置

C:\ProgramData\MySQL\MySQL Server 5.7\my.ini

```bash
[mysql] # 大概在63行左右，在其下添加
...
default-character-set=utf8 # 默认字符集

[mysqld] # 大概在76行左右，在其下添加
...
character-set-server=utf8
collation-server=utf8_general_ci
```

## 可能出现连接问题

在连接 MySQL8.0 时可能会出现 plugin caching_sha2_password cannot be loaded 错误

出现这个问题的原因是 MySQL8.0 之前的版本中加密规则是 mysql_native_password，而在 MySQL8.0 之后，加密规则是 caching_sha2_password，解决问题方法有两种，第一种是升级图形界面工具版本，第二种是把 MySQL8.0 用户登录密码加密规则还原成 mysql_native_password

```bash
# 使用mysql数据库
USE mysql;

# 修改'root'@'localhost'用户的密码规则和密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

# 刷新权限
FLUSH PRIVILEGES;
```

## SQL 语言的规则与规范

基本规则

- SQL 可以写在一行或者多行，为了提高可读性，各子句分行写，必要时使用缩进
- 每条命令以 ; 或 \g 或 \G 结束
- 关键字不能被缩写也不能分行
- 关于标点符号
  - 必须保证所有的()、单引号、双引号是成对结束的
  - 必须使用英文状态下的半角输入方式
  - 字符串型和日期时间类型的数据可以使用单引号（' '）表示
  - 列的别名，尽量使用双引号（" "），而且不建议省略 as

SQL 大小写规范 （建议遵守）

- MySQL 在 Windows 环境下是大小写不敏感的
- MySQL 在 Linux 环境下是大小写敏感的
  - 数据库名、表名、表的别名、变量名是严格区分大小写的
  - 关键字、函数名、列名(或字段名)、列的别名(字段的别名) 是忽略大小写的。
- 推荐采用统一的书写规范：
  - 数据库名、表名、表别名、字段名、字段别名等都小写
  - SQL 关键字、函数名、绑定变量等都大写

注释

```bash
单行注释：# 注释文字(MySQL特有的方式)
单行注释：-- 注释文字(--后面必须包含一个空格)
多行注释：/* 注释文字 */
```

命名规则

- 数据库、表名不得超过 30 个字符，变量名限制为 29 个
- 必须只能包含 A–Z, a–z, 0–9, \_共 63 个字符
- 数据库名、表名、字段名等对象名中间不要包含空格
- 同一个 MySQL 软件中，数据库不能同名；同一个库中，表不能重名；同一个表中，字段不能重名
- 必须保证你的字段没有和保留字、数据库系统或常用方法冲突。如果坚持使用，请在 SQL 语句中使用`（着重号）引起来
- 保持字段名和类型的一致性，在命名字段并为其指定数据类型的时候一定要保证一致性。假如数据类型在一个表里是整数，那在另一个表里可就别变成字符型了

## 导入数据

在命令行客户端登录 mysql，使用 source 指令导入

```bash
mysql> source C:\Users\MicroDaWay\Documents\基础篇\资料\atguigudb.sql
```

## 基本的 SELECT 语句

```bash
SELECT 1 + 1,3;
```

```bash
SELECT * FROM employees;
```

```bash
SELECT employee_id,email
FROM employees;
```
