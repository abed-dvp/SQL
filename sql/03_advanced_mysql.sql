-- ADVANCED MYSQL NOTES

-- CTE
WITH department_stats AS (
  SELECT department_id,
         AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department_id
)
SELECT *
FROM department_stats
WHERE avg_salary > 85000;

-- TEMPORARY TABLE (MySQL)
CREATE TEMPORARY TABLE high_salary_employees AS
SELECT *
FROM employees
WHERE salary >= 90000;

SELECT * FROM high_salary_employees;

-- STORED PROCEDURE example (run in MySQL Workbench)
/*
DELIMITER //
CREATE PROCEDURE GetEmployeesByDepartment(IN dept INT)
BEGIN
  SELECT *
  FROM employees
  WHERE department_id = dept;
END //
DELIMITER ;
*/

-- TRIGGER example
/*
CREATE TRIGGER employee_audit
AFTER UPDATE ON employees
FOR EACH ROW
INSERT INTO employee_audit_log(employee_id, changed_at)
VALUES (NEW.employee_id, NOW());
*/

-- EVENT example
/*
CREATE EVENT cleanup_old_logs
ON SCHEDULE EVERY 1 DAY
DO
  DELETE FROM logs
  WHERE created_at < NOW() - INTERVAL 90 DAY;
*/