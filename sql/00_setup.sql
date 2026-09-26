-- Abed Codelab SQL sample database
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS orders;

CREATE TABLE departments (
  department_id INTEGER PRIMARY KEY,
  department_name VARCHAR(50)
);

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  department_id INTEGER,
  salary INTEGER,
  active INTEGER
);

CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  customer_name VARCHAR(100),
  country VARCHAR(50)
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  order_date DATE,
  amount DECIMAL(10,2),
  status VARCHAR(30)
);

INSERT INTO departments VALUES
(1,'Product'),(2,'Data'),(3,'Operations'),(4,'Marketing');

INSERT INTO employees VALUES
(1,'Ada','Lovelace',2,98000,1),
(2,'Guido','Rossum',2,92000,1),
(3,'Grace','Hopper',2,105000,1),
(4,'Linus','Torvalds',1,88000,1),
(5,'Margaret','Hamilton',1,96000,1),
(6,'Tim','Berners-Lee',4,72000,1),
(7,'Barbara','Liskov',3,84000,1),
(8,'Donald','Knuth',3,84000,0);

INSERT INTO customers VALUES
(1,'Northstar GmbH','Germany'),
(2,'Tulip Labs','Netherlands'),
(3,'Atlas SAS','France'),
(4,'Nordic AB','Sweden');

INSERT INTO orders VALUES
(101,1,'2026-01-10',1200,'paid'),
(102,1,'2026-02-03',850,'paid'),
(103,2,'2026-02-17',1500,'paid'),
(104,2,'2026-03-02',300,'cancelled'),
(105,3,'2026-03-11',2300,'paid'),
(106,4,'2026-03-22',700,'paid'),
(107,4,'2026-04-05',950,'paid');