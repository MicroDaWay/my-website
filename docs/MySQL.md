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

**等值连接**

```sql
SELECT employee_id,e.department_id
FROM employees e,departments d
WHERE e.department_id = d.department_id;

SELECT employee_id,last_name,department_name,city
FROM employees e,departments d,locations l
WHERE e.department_id = d.department_id AND d.location_id = l.location_id;
```

**非等值连接**

```sql
SELECT employee_id,salary,grade_level
FROM employees e,job_grades jobs
WHERE salary BETWEEN lowest_sal AND highest_sal
ORDER BY salary DESC;
```

**自连接**

```sql
SELECT e1.employee_id,e1.salary,e2.employee_id,e2.salary
FROM employees e1,employees e2
WHERE e1.manager_id = e2.employee_id;
```

SQL92 语法实现外连接：使用 + ，但是 MySQL 不支持 SQL92 语法中外连接的写法

```sql
# MySQL 不支持这种写法
SELECT employee_id,department_name
FROM employees e,departments d
WHERE e.department_id = e.department_id(+);
```

SQL99 实现 7 中 JOIN 操作

**内连接**

```sql
SELECT last_name,department_name
FROM employees e
JOIN departments d
ON e.department_id = d.department_id;

SELECT last_name,department_name,d.location_id
FROM employees e
JOIN departments d
ON e.department_id = d.department_id
JOIN locations l
ON d.location_id = l.location_id;
```

**左外连接**

```sql
SELECT last_name,department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id;
```

**右外连接**

```sql
SELECT last_name,department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.department_id;
```

**满外连接**

MySQL 不支持 FULL JOIN

UNION 和 UNION ALL 的使用

- UNION：会执行去重操作
- UNION ALL：不会执行去重操作
- 结论：如果明确知道合并数据后的结果数据不存在重复数据，或者不需要去除重复的数据，则尽量使用 UNION ALL 语句，以提高数据查询的效率

```sql
# MySQL 不支持 FULL JOIN
SELECT last_name,department_name
FROM employees e
FULL JOIN departments d
ON e.department_id = d.department_id;

# 正确写法
SELECT last_name,department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id
UNION ALL
SELECT last_name,department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.department_id
WHERE e.department_id IS NULL;

或者

SELECT last_name,department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.department_id
UNION ALL
SELECT last_name,department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id
WHERE d.department_id IS NULL;
```

```sql
SELECT last_name,department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.department_id
WHERE e.department_id IS NULL;
```

```sql
SELECT last_name,department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id
WHERE d.department_id IS NULL;
```

```sql
SELECT last_name,department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id
WHERE d.department_id IS NULL
UNION ALL
SELECT last_name,department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.department_id
WHERE e.department_id IS NULL;
```

SQL99 语法的新特性 1：自然连接

NATURAL JOIN：它会帮你自动查询两张连接表中所有相同的字段，然后进行等值连接

```sql
SELECT last_name,department_name
FROM employees e
JOIN departments d
ON e.department_id = d.department_id
AND e.manager_id = d.manager_id;

等价于

SELECT last_name,department_name
FROM employees
NATURAL JOIN departments;
```

SQL99 语法的新特性 2：USING

```sql
SELECT last_name,department_name
FROM employees e
JOIN departments d
ON e.department_id = d.department_id

等价于

SELECT last_name,department_name
FROM employees e
JOIN departments d
USING (department_id);
```

## 流程控制函数

```sql
SELECT employee_id,IF(salary >= 6000,'高工资','低工资') as "details"
FROM employees;
```

```sql
SELECT employee_id,salary * (1 + IF(commission_pct IS NOT NULL,commission_pct,0)) * 12 as "annual_salary"
FROM employees;
```

```sql
SELECT employee_id,salary,
CASE
    WHEN salary >= 10000 THEN "高收入"
    WHEN salary >= 8000 THEN "中等收入"
    WHEN salary >= 5000 THEN "一般收入"
    ELSE "低收入"
END "薪资状况"
FROM employees;

SELECT employee_id,salary,
CASE department_id
    WHEN 10 THEN salary * 1.1
    WHEN 20 THEN salary * 1.2
    WHEN 30 THEN salary * 1.3
    ELSE salary * 1.4
END "薪资"
FROM employees;
```

## 加密解密

PASSWORD() 在 MySQL8.0 中被弃用

ENCODE()、DECODE() 在 MySQL8.0 中被弃用

```sql
# MySQL8.0 中被弃用
SELECT PASSWORD('hello');

SELECT ENCODE('microdaway','secret'),DECODE(ENCODE('microdaway','secret'),'secret');
```

```sql
SELECT MD5('test'),SHA('hello');
```

## 五大常用的聚合函数

AVG、SUM、MAX、MIN、COUNT 都会过滤 null

```sql
SELECT AVG(salary),SUM(salary)
FROM employees;

SELECT MAX(salary),MIN(salary)
FROM employees;

SELECT COUNT(employee_id),COUNT(1),COUNT(*)
FROM employees;

SELECT AVG(commission_pct),SUM(commission_pct) / COUNT(commission_pct),
SUM(commission_pct) / COUNT(*)
FROM employees;
```

**GROUP BY**

结论：

- SELECT 中出现的非组函数的字段必须声明在 GROUP BY 中，反之，GROUP BY 中声明的字段可以不出现在 SELECT 中
- GROUP BY 声明在 FROM 后面、WHERE 后面、ORDER BY 前面、LIMIT 前面
- MySQL 中 GROUP BY 中使用 WITH ROLLUP
- 在 MySQL5.7 中使用 ROLLUP 时，不能同时使用 ORDER BY 子句进行结果排序，即 ROLLUP 和 ORDER bY 是互相排斥的

```sql
SELECT department_id,AVG(salary)
FROM employees
GROUP BY department_id;

SELECT department_id,job_id,AVG(salary)
FROM employees
GROUP BY department_id,job_id;

SELECT department_id,AVG(salary)
FROM employees
GROUP BY department_id WITH ROLLUP;
```

## HAVING 的使用与 SQL 语句的执行流程

```sql
SELECT department_id,MAX(salary)
FROM employees
GROUP BY department_id
HAVING MAX(salary) > 10000
ORDER BY MAX(salary) DESC;
```

**SQL 语句执行过程**

```sql
SELECT ...,(存在聚合函数)         ②

FROM ...
(LEFT | RIGHT) JOIN ...
ON ... 多表的连接条件
WHERE 不包含聚合函数的过滤条件     ①
GROUP BY ...
HAVING 包含聚合函数的过滤条件

ORDER BY ... (ASC | DESC)        ③
LIMIT ...
```

## 数据库的创建、修改、删除

**创建数据库**

```sql
CREATE DATABASE IF NOT EXISTS mytest1;

SHOW CREATE DATABASE mytest1;

# 创建数据库并指定字符集
CREATE DATABASE IF NOT EXISTS mytest2 CHARACTER SET 'gbk';

# 修改数据库字符集
ALTER DATABASE mytest2 CHARACTER SET 'utf8mb4';
```

**显示所有的数据库**

```sql
SHOW DATABASES;
```

**切换数据库**

```sql
USE mytest1;
```

**显示当前的数据库**

```sql
SELECT DATABASE();
```

**删除数据库**

```sql
DROP DATABASE IF EXISTS mytest2;
```

```sql
SHOW TABLES FROM mysql;
```

## 创建表

```sql
CREATE TABLE IF NOT EXISTS my_emp1 (
id INT,
emp_name VARCHAR(15),
hire_date DATE
);

DESC my_emp1;

SHOW CREATE TABLE my_emp1;

CREATE TABLE my_emp2
AS
SELECT employee_id,last_name,salary
FROM employees;

SELECT *
FROM my_emp2;

CREATE TABLE my_emp3
AS
SELECT employee_id,last_name,department_name
FROM employees e
JOIN departments d
ON e.department_id = d.department_id;

# 创建一个表employee_copy，实现对employees表的复制，包括表数据
CREATE TABLE employee_copy
AS
SELECT *
FROM employees;

# 创建一个表employee_blank，实现对employees表的复制，不包括表数据
CREATE TABLE employee_blank
AS
SELECT *
FROM employees
WHERE 1 = 2;
```

## 修改表

**添加字段**

```sql
# 默认添加到最后
ALTER TABLE my_emp1
ADD salary DOUBLE(10,2);

# 添加到第一位
ALTER TABLE my_emp1
ADD phone_number VARCHAR(11) FIRST;

# 添加到指定字段后面
ALTER TABLE my_emp1
ADD email VARCHAR(20) AFTER emp_name;
```

**修改字段：数据类型、长度、默认值**

```sql
ALTER TABLE my_emp1
MODIFY email VARCHAR(30);

ALTER TABLE my_emp1
MODIFY email VARCHAR(30) DEFAULT 'xxx@outlook.com';
```

**重命名字段**

```sql
ALTER TABLE my_emp1
CHANGE email my_email VARCHAR(40);

ALTER TABLE my_emp1
CHANGE salary my_salary DOUBLE(8,2);
```

**删除字段**

```sql
ALTER TABLE my_emp1
DROP COLUMN my_salary;
```

**重命名表**

```sql
RENAME TABLE my_emp1
TO my_emp11;

ALTER TABLE my_emp11
RENAME TO my_emp1;
```

**删除表**

不光将表结构删除掉，同时表中的数据也删除掉，释放表空间

```sql
DROP TABLE IF EXISTS my_emp3;
```

**清空表**

清空表中的所有数据，但是表结构保留

```sql
TRUNCATE TABLE employee_copy;
```
