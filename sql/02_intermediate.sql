-- INTERMEDIATE PRACTICE

-- JOIN
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
JOIN departments d
  ON e.department_id = d.department_id;

-- LEFT JOIN
SELECT c.customer_name, o.order_id, o.amount
FROM customers c
LEFT JOIN orders o
  ON c.customer_id = o.customer_id;

-- CASE
SELECT first_name,
       salary,
       CASE
         WHEN salary >= 95000 THEN 'High'
         WHEN salary >= 80000 THEN 'Medium'
         ELSE 'Standard'
       END AS salary_band
FROM employees;

-- SUBQUERY
SELECT first_name, salary
FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);

-- WINDOW FUNCTION
SELECT first_name,
       department_id,
       salary,
       AVG(salary) OVER (PARTITION BY department_id) AS department_avg
FROM employees;

-- RANKING
SELECT first_name,
       department_id,
       salary,
       DENSE_RANK() OVER (
         PARTITION BY department_id
         ORDER BY salary DESC
       ) AS salary_rank
FROM employees;