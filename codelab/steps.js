window.SQL_STEPS = [
  {
    title:"SELECT",
    intro:"Choose the columns you want to see.",
    learn:["SELECT controls the output columns.","FROM tells SQL which table to read.","Use * when you intentionally want every column."],
    example:"SELECT first_name, last_name, salary\nFROM employees;",
    challenge:"Return first_name and salary for every employee.",
    starter:"SELECT \nFROM employees;",
    solution:"SELECT first_name, salary\nFROM employees;",
    takeaway:"SELECT answers: which columns should appear in the result?"
  },
  {
    title:"DISTINCT",
    intro:"Remove duplicate values from a result.",
    learn:["DISTINCT applies to the selected combination of columns.","It is useful for discovering categories or unique IDs."],
    example:"SELECT DISTINCT department_id\nFROM employees;",
    challenge:"Return the unique active values from employees.",
    starter:"SELECT DISTINCT \nFROM employees;",
    solution:"SELECT DISTINCT active\nFROM employees;",
    takeaway:"DISTINCT de-duplicates the selected output."
  },
  {
    title:"WHERE",
    intro:"Filter rows before aggregation.",
    learn:["WHERE evaluates each row.","Combine filters with AND / OR.","Comparison operators include =, !=, >, <, >= and <=."],
    example:"SELECT first_name, salary\nFROM employees\nWHERE salary >= 90000;",
    challenge:"Return first_name and salary for active employees earning at least 90000.",
    starter:"SELECT first_name, salary\nFROM employees\nWHERE ;",
    solution:"SELECT first_name, salary\nFROM employees\nWHERE active = 1 AND salary >= 90000;",
    takeaway:"WHERE decides which raw rows are allowed into the next stage."
  },
  {
    title:"LIKE & IN",
    intro:"Match patterns or a set of allowed values.",
    learn:["LIKE uses % for any sequence of characters.","IN is cleaner than many OR conditions."],
    example:"SELECT first_name\nFROM employees\nWHERE first_name LIKE 'G%';",
    challenge:"Return employees whose department_id is 1 or 2.",
    starter:"SELECT first_name, department_id\nFROM employees\nWHERE department_id ;",
    solution:"SELECT first_name, department_id\nFROM employees\nWHERE department_id IN (1, 2);",
    takeaway:"Use LIKE for patterns and IN for membership."
  },
  {
    title:"GROUP BY",
    intro:"Summarize rows by category.",
    learn:["GROUP BY changes the grain of the result.","Aggregate functions include COUNT, SUM, AVG, MIN and MAX."],
    example:"SELECT department_id, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department_id;",
    challenge:"Count employees per department.",
    starter:"SELECT department_id, COUNT(*) AS employee_count\nFROM employees\n;",
    solution:"SELECT department_id, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department_id;",
    takeaway:"GROUP BY collapses many rows into one row per group."
  },
  {
    title:"ORDER BY & LIMIT",
    intro:"Sort results and keep only the rows you need.",
    learn:["ASC is ascending; DESC is descending.","LIMIT is applied after sorting."],
    example:"SELECT first_name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 3;",
    challenge:"Return the two lowest-paid employees.",
    starter:"SELECT first_name, salary\nFROM employees\nORDER BY salary ;\nLIMIT ;",
    solution:"SELECT first_name, salary\nFROM employees\nORDER BY salary ASC\nLIMIT 2;",
    takeaway:"Sort first, then limit."
  },
  {
    title:"WHERE vs HAVING",
    intro:"Filter rows with WHERE; filter groups with HAVING.",
    learn:["WHERE runs before GROUP BY.","HAVING runs after aggregation."],
    example:"SELECT department_id, AVG(salary) AS avg_salary\nFROM employees\nWHERE active = 1\nGROUP BY department_id\nHAVING AVG(salary) > 85000;",
    challenge:"Show departments with at least 2 employees.",
    starter:"SELECT department_id, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department_id\n;",
    solution:"SELECT department_id, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department_id\nHAVING COUNT(*) >= 2;",
    takeaway:"WHERE filters input rows; HAVING filters grouped output."
  },
  {
    title:"JOIN",
    intro:"Combine related tables using a key.",
    learn:["INNER JOIN keeps matched rows.","ON defines the relationship between tables.","Aliases make multi-table queries easier to read."],
    example:"SELECT e.first_name, d.department_name\nFROM employees e\nJOIN departments d\n  ON e.department_id = d.department_id;",
    challenge:"Return employee first_name, salary and department_name.",
    starter:"SELECT e.first_name, e.salary, d.department_name\nFROM employees e\nJOIN departments d\n  ON ;",
    solution:"SELECT e.first_name, e.salary, d.department_name\nFROM employees e\nJOIN departments d\n  ON e.department_id = d.department_id;",
    takeaway:"A JOIN combines tables horizontally using a relationship."
  },
  {
    title:"LEFT JOIN",
    intro:"Keep every row from the left table, even when no match exists.",
    learn:["LEFT JOIN is useful when missing matches are meaningful.","Unmatched right-side columns become NULL."],
    example:"SELECT c.customer_name, o.order_id\nFROM customers c\nLEFT JOIN orders o\n  ON c.customer_id = o.customer_id;",
    challenge:"Return customer_name, order_id and amount for all customers.",
    starter:"SELECT c.customer_name, o.order_id, o.amount\nFROM customers c\nLEFT JOIN orders o\n  ON ;",
    solution:"SELECT c.customer_name, o.order_id, o.amount\nFROM customers c\nLEFT JOIN orders o\n  ON c.customer_id = o.customer_id;",
    takeaway:"LEFT JOIN preserves the left table."
  },
  {
    title:"UNION",
    intro:"Stack compatible result sets vertically.",
    learn:["UNION removes duplicates.","UNION ALL preserves duplicates.","Both queries need compatible column counts and types."],
    example:"SELECT first_name AS name FROM employees\nUNION\nSELECT customer_name AS name FROM customers;",
    challenge:"Create one list containing employee first names and customer names.",
    starter:"SELECT first_name AS name FROM employees\nUNION\n;",
    solution:"SELECT first_name AS name FROM employees\nUNION\nSELECT customer_name AS name FROM customers;",
    takeaway:"JOIN combines columns; UNION stacks rows."
  },
  {
    title:"CASE",
    intro:"Add conditional logic inside a query.",
    learn:["CASE behaves like if / elif / else.","Always close it with END."],
    example:"SELECT first_name, salary,\nCASE\n  WHEN salary >= 95000 THEN 'High'\n  WHEN salary >= 80000 THEN 'Medium'\n  ELSE 'Standard'\nEND AS salary_band\nFROM employees;",
    challenge:"Label employees as Active or Inactive using the active column.",
    starter:"SELECT first_name,\nCASE\n  WHEN active = 1 THEN 'Active'\n  ELSE \nEND AS status\nFROM employees;",
    solution:"SELECT first_name,\nCASE\n  WHEN active = 1 THEN 'Active'\n  ELSE 'Inactive'\nEND AS status\nFROM employees;",
    takeaway:"CASE turns business rules into query logic."
  },
  {
    title:"Subqueries",
    intro:"Use the result of one query inside another.",
    learn:["A scalar subquery returns one value.","Subqueries are common in WHERE, SELECT and FROM."],
    example:"SELECT first_name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);",
    challenge:"Return employees whose salary equals the maximum salary.",
    starter:"SELECT first_name, salary\nFROM employees\nWHERE salary = ();",
    solution:"SELECT first_name, salary\nFROM employees\nWHERE salary = (SELECT MAX(salary) FROM employees);",
    takeaway:"A subquery lets one query depend on another query's result."
  },
  {
    title:"Window Functions",
    intro:"Calculate across related rows without collapsing them.",
    learn:["OVER() creates the window.","PARTITION BY resets the calculation by group.","Unlike GROUP BY, the original rows remain visible."],
    example:"SELECT first_name, department_id, salary,\nAVG(salary) OVER (PARTITION BY department_id) AS dept_avg\nFROM employees;",
    challenge:"Show each employee with the maximum salary in their department.",
    starter:"SELECT first_name, department_id, salary,\nMAX(salary) OVER ( ) AS dept_max\nFROM employees;",
    solution:"SELECT first_name, department_id, salary,\nMAX(salary) OVER (PARTITION BY department_id) AS dept_max\nFROM employees;",
    takeaway:"Window functions add group-level context while preserving row-level detail."
  },
  {
    title:"Ranking",
    intro:"Rank rows within a group.",
    learn:["ROW_NUMBER gives unique sequence numbers.","RANK leaves gaps after ties.","DENSE_RANK does not leave gaps."],
    example:"SELECT first_name, department_id, salary,\nDENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank\nFROM employees;",
    challenge:"Assign ROW_NUMBER within each department from highest to lowest salary.",
    starter:"SELECT first_name, department_id, salary,\nROW_NUMBER() OVER ( ) AS row_num\nFROM employees;",
    solution:"SELECT first_name, department_id, salary,\nROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS row_num\nFROM employees;",
    takeaway:"Choose the ranking function based on how ties should behave."
  },
  {
    title:"CTEs",
    intro:"Name an intermediate query to make complex SQL easier to read.",
    learn:["A CTE begins with WITH.","The CTE exists only for the statement that follows it.","CTEs are excellent for staged transformations."],
    example:"WITH stats AS (\n  SELECT department_id, AVG(salary) AS avg_salary\n  FROM employees\n  GROUP BY department_id\n)\nSELECT * FROM stats;",
    challenge:"Build a CTE with total order amount per customer, then return totals above 1500.",
    starter:"WITH customer_totals AS (\n  SELECT customer_id, SUM(amount) AS total_amount\n  FROM orders\n  \n)\nSELECT * FROM customer_totals\nWHERE total_amount > 1500;",
    solution:"WITH customer_totals AS (\n  SELECT customer_id, SUM(amount) AS total_amount\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT * FROM customer_totals\nWHERE total_amount > 1500;",
    takeaway:"CTEs turn a long query into named, understandable stages."
  },
  {
    title:"Data Cleaning Pattern",
    intro:"Use SQL to detect duplicates and standardize raw data.",
    learn:["Preserve raw data first.","Use ROW_NUMBER to diagnose duplicates.","Standardize whitespace and blanks before destructive changes."],
    example:"SELECT TRIM(customer_name) AS clean_name\nFROM customers;",
    challenge:"Return customer_name trimmed and country uppercased.",
    starter:"SELECT \nFROM customers;",
    solution:"SELECT TRIM(customer_name) AS customer_name, UPPER(country) AS country\nFROM customers;",
    takeaway:"Cleaning should be auditable: diagnose, transform, then validate."
  },
  {
    title:"EDA: Rolling Totals",
    intro:"Combine aggregation, CTEs and window functions for analysis.",
    learn:["First aggregate to the analysis grain.","Then use a window function for cumulative metrics."],
    example:"WITH daily AS (\n  SELECT order_date, SUM(amount) AS daily_amount\n  FROM orders\n  GROUP BY order_date\n)\nSELECT order_date, daily_amount,\nSUM(daily_amount) OVER (ORDER BY order_date) AS running_total\nFROM daily;",
    challenge:"Create a running total of paid order amounts by order_date.",
    starter:"WITH daily AS (\n  SELECT order_date, SUM(amount) AS daily_amount\n  FROM orders\n  WHERE \n  GROUP BY order_date\n)\nSELECT order_date, daily_amount,\nSUM(daily_amount) OVER (ORDER BY order_date) AS running_total\nFROM daily;",
    solution:"WITH daily AS (\n  SELECT order_date, SUM(amount) AS daily_amount\n  FROM orders\n  WHERE status = 'paid'\n  GROUP BY order_date\n)\nSELECT order_date, daily_amount,\nSUM(daily_amount) OVER (ORDER BY order_date) AS running_total\nFROM daily;",
    takeaway:"A strong EDA query often combines several simple SQL concepts."
  },
  {
    title:"MySQL Advanced Features",
    intro:"Stored procedures, triggers and events move SQL from querying into database automation.",
    learn:["Stored procedure = reusable server-side SQL logic.","Trigger = automatic reaction to INSERT/UPDATE/DELETE.","Event = scheduled database task.","These features should be practiced in MySQL Workbench, not the browser SQLite runtime."],
    example:"-- MySQL example\nCALL GetEmployeesByDepartment(2);",
    challenge:"Open sql/03_advanced_mysql.sql and identify one use case for each: procedure, trigger and event.",
    starter:"-- Conceptual step: no browser execution required.",
    solution:"-- Procedure: reusable parameterized query\n-- Trigger: automatic audit/update action\n-- Event: scheduled maintenance or aggregation",
    executable:false,
    takeaway:"Advanced database features automate logic around your data, not just retrieval."
  }
];