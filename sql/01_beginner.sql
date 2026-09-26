-- BEGINNER PRACTICE

-- 1) SELECT
SELECT first_name, last_name, salary
FROM employees;

-- 2) DISTINCT
SELECT DISTINCT department_id
FROM employees;

-- 3) WHERE
SELECT *
FROM employees
WHERE salary >= 90000;

-- 4) LIKE
SELECT *
FROM employees
WHERE first_name LIKE 'G%';

-- 5) GROUP BY
SELECT department_id, COUNT(*) AS employee_count, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id;

-- 6) HAVING
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 85000;

-- 7) ORDER BY + LIMIT
SELECT first_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 3;