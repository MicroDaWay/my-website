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

```sql
# 使用mysql数据库
USE mysql;

# 修改'root'@'localhost'用户的密码规则和密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

# 刷新权限
FLUSH PRIVILEGES;
```

## SQL 语言的规则与规范

**基本规则**

- SQL 可以写在一行或者多行，为了提高可读性，各子句分行写，必要时使用缩进
- 每条命令以 ; 或 \g 或 \G 结束
- 关键字不能被缩写也不能分行
- 关于标点符号
  - 必须保证所有的()、单引号、双引号是成对结束的
  - 必须使用英文状态下的半角输入方式
  - 字符串型和日期时间类型的数据可以使用单引号(' ')表示
  - 列的别名，尽量使用双引号(" ")，而且不建议省略 as

**SQL 大小写规范(建议遵守)**

- MySQL 在 Windows 环境下是大小写不敏感的
- MySQL 在 Linux 环境下是大小写敏感的
  - 数据库名、表名、表的别名、变量名是严格区分大小写的
  - 关键字、函数名、列名(或字段名)、列的别名(字段的别名) 是忽略大小写的。
- 推荐采用统一的书写规范：
  - 数据库名、表名、表别名、字段名、字段别名等都小写
  - SQL 关键字、函数名、绑定变量等都大写

**注释**

```bash
单行注释：# 注释文字(MySQL特有的方式)
单行注释：-- 注释文字(--后面必须包含一个空格)
多行注释：/* 注释文字 */
```

**命名规则**

- 数据库、表名不得超过 30 个字符，变量名限制为 29 个
- 必须只能包含 A–Z, a–z, 0–9, \_共 63 个字符
- 数据库名、表名、字段名等对象名中间不要包含空格
- 同一个 MySQL 软件中，数据库不能同名同一个库中，表不能重名同一个表中，字段不能重名
- 必须保证你的字段没有和保留字、数据库系统或常用方法冲突。如果坚持使用，请在 SQL 语句中使用`(着重号)引起来
- 保持字段名和类型的一致性，在命名字段并为其指定数据类型的时候一定要保证一致性。假如数据类型在一个表里是整数，那在另一个表里可就别变成字符型了

## 导入数据

在命令行客户端登录 mysql，使用 source 指令导入

```bash
mysql> source C:\Users\MicroDaWay\Documents\基础篇\资料\atguigudb.sql
```

## 基本的 SELECT 语句

```sql
SELECT 1 + 1,3;
```

**选择全部列**

```sql
SELECT * FROM employees;
```

**选择特定的列**

```sql
SELECT employee_id,email
FROM employees;
```

**列的别名**

```sql
SELECT employee_id as "emp_id",department_id as "dept_id"
FROM employees;
```

**去除重复行**

```sql
SELECT DISTINCT department_id
FROM employees;
```

**空值参与运算**

```sql
SELECT employee_id,salary * (1 + IFNULL(commission_pct,0)) * 12 as "年薪"
FROM employees;
```

**着重号**

```sql
SELECT * FROM `order`;
```

**查询常数**

```sql
SELECT '测试',salary
FROM employees;
```

## 显示表结构

```sql
DESCRIBE employees;
DESC employees;
```

## 过滤数据

```sql
SELECT *
FROM employees
WHERE salary >= 10000;
```

## 运算符

**加法与减法运算符**

- 一个整数类型的值对整数进行加法和减法操作，结果还是一个整数
- 一个整数类型的值对浮点数进行加法和减法操作，结果是一个浮点数
- 加法和减法的优先级相同，进行先加后减操作与进行先减后加操作的结果是一样的
- 在 Java 中，+ 的左右两边如果有字符串，那么表示字符串的拼接。但是在 MySQL 中 + 只表示数值相加。如果遇到非数值类型，先尝试转成数值，如果转失败，就按 0 计算。(补充：MySQL 中字符串拼接要使用字符串函数 CONCAT()实现)

**乘法与除法运算符**

- 一个数乘以整数 1 和除以整数 1 后仍得原数
- 一个数乘以浮点数 1 和除以浮点数 1 后变成浮点数，数值与原数相等
- 一个数除以整数后，不管是否能除尽，结果都为一个浮点数
- 一个数除以另一个数，除不尽时，结果为一个浮点数，并保留到小数点后 4 位
- 乘法和除法的优先级相同，进行先乘后除操作与先除后乘操作，得出的结果相同
- 在数学运算中，0 不能用作除数，在 MySQL 中，一个数除以 0 为 NULL

**等号运算符**

- 等号运算符(=)判断等号两边的值、字符串或表达式是否相等，如果相等则返回 1，不相等则返回
  0。
- 在使用等号运算符时，遵循如下规则：
  - 如果等号两边的值、字符串或表达式都为字符串，则 MySQL 会按照字符串进行比较，其比较的是每个字符串中字符的 ANSI 编码是否相等
  - 如果等号两边的值都是整数，则 MySQL 会按照整数来比较两个值的大小
  - 如果等号两边的值一个是整数，另一个是字符串，则 MySQL 会将字符串转化为数字进行比较
  - 如果等号两边的值、字符串或表达式中有一个为 NULL，则比较结果为 NULL
- 对比：SQL 中赋值符号使用 :=

**空运算符**

```sql
SELECT *
FROM employees
WHERE commission_pct IS NULL;
```

**非空运算符**

```sql
SELECT *
FROM employees
WHERE commission_pct IS NOT NULL;
```

**最小值运算符**

```sql
SELECT LEAST(1,2,3),LEAST('a','b','c');
```

**最大值运算符**

```sql
SELECT GREATEST(1,2,3),GREATEST('a','b','c');
```

**BETWEEN AND 运算符**

```sql
SELECT salary
FROM employees
WHERE salary BETWEEN 5000 AND 10000;
```

**IN 运算符**

```sql
SELECT salary
FROM employees
WHERE salary IN (5000,6000,7000);
```

**NOT IN 运算符**

```sql
SELECT salary
FROM employees
WHERE salary NOT IN (5000,6000,7000);
```

**LIKE 运算符**

%：匹配 0 个或多个字符

\_：只能匹配一个字符

```sql
SELECT first_name
FROM employees
WHERE first_name LIKE '%b%' AND first_name LIKE '%t%';

SELECT first_name
FROM employees
WHERE first_name LIKE '__b%';
```

**ESCAPE**

```sql
SELECT first_name
FROM employees
WHERE first_name LIKE '_$_b%' ESCAPE '$';
```

**使用正则表达式查询**

```sql
SELECT first_name
FROM employees
WHERE first_name REGEXP '^a';
```

**逻辑非运算符**

```sql
SELECT *
FROM employees
WHERE salary NOT IN (5000,6000);
```

**逻辑与运算符**

```sql
SELECT *
FROM employees
WHERE salary > 5000 AND department_id = 60;
```

**逻辑或运算符**

```sql
SELECT *
FROM employees
WHERE salary > 5000 OR department_id = 60;
```

**逻辑异或运算符**

```sql
SELECT *
FROM employees
WHERE salary > 5000 XOR department_id = 60;
```

## 排序

ASC(ascend): 升序

DESC(descend)：降序

列的别名只能在 ORDER BY 中使用，不能在 WHERE 中使用

**单列排序**

```sql
SELECT employee_id,salary
FROM employees
ORDER BY salary ASC;

SELECT employee_id,salary,salary * 12 as "annual_salary"
FROM employees
ORDER BY annual_salary DESC;
```

**多列排序**

```sql
SELECT employee_id,department_id,salary * 12 as "annual_salary"
FROM employees
WHERE department_id IN (50,60,70)
ORDER BY department_id ASC,annual_salary DESC;
```

## 分页

需求：每页显示 pageSize 条记录，此时显示第 pageNo 页

公式：LIMIT (pageNo -1) \* pageSize,pageSize;

LIMIT 的格式：LIMIT 位置偏移量,条目数

结构 LIMIT 0,条目数 等价于 LIMIT 条目数

```sql
SELECT employee_id,salary
FROM employees
LIMIT 0,10;

等价于

SELECT employee_id,salary
FROM employees
LIMIT 10;
```

```sql
SELECT employee_id,salary
FROM employees
LIMIT 31,2;

MySQL8.0新特性

SELECT employee_id,salary
FROM employees
LIMIT 2 OFFSET 31;
```

## 多表查询

建议：从 sql 优化的角度，建议多表查询时，每个字段前都指明其所在的表

如果给表起了别名，一旦在 SELECT 或 WHERE 中使用表名的话，则必须使用表的别名，而不能再使用表的原名

如果有 n 个表实现多表的查询，则需要至少 n-1 个连接条件

```sql
SELECT employee_id,e.department_id
FROM employees e,departments d
WHERE e.department_id = d.department_id;

SELECT employee_id,last_name,department_name,city
FROM employees e,departments d,locations l
WHERE e.department_id = d.department_id AND d.location_id = l.location_id;
```
