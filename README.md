# SQL — Beginner to Advanced

A hands-on SQL learning repository based on the learning sequence of Alex The Analyst's **Learn SQL Beginner to Advanced in Under 4 Hours**.

This version is independently written for study and practice. It keeps the video's progression from SQL fundamentals to intermediate and advanced querying, then ends with data-cleaning and exploratory-data-analysis projects.

> 🚀 Interactive Codelab: https://abed-dvp.github.io/SQL/  
> 🎥 Source video: https://www.youtube.com/watch?v=OT1RErkfLNQ  
> 📚 Original course files: https://github.com/AlexTheAnalyst/MySQL-YouTube-Series

---

## What you'll learn

### Beginner
- SELECT and DISTINCT
- WHERE and comparison operators
- LIKE, IN and logical conditions
- GROUP BY and aggregate functions
- ORDER BY
- WHERE vs HAVING
- LIMIT
- aliases

### Intermediate
- INNER and LEFT JOIN
- self joins and multi-table thinking
- UNION
- string functions
- CASE
- subqueries
- window functions
- ROW_NUMBER, RANK and DENSE_RANK
- PARTITION BY

### Advanced
- CTEs
- multiple CTEs
- temporary tables
- stored procedures
- triggers
- scheduled events

### Projects
- Data cleaning workflow
- Exploratory data analysis
- duplicate detection
- standardization
- null handling
- rolling totals
- ranking and trend analysis

---

# 1. Setup

The video teaches MySQL + MySQL Workbench. For local practice, install MySQL Community Server and MySQL Workbench.

The browser Codelab in this repository uses a bundled SQLite-compatible engine so that most query concepts can run directly in GitHub Pages without a backend. MySQL-only features such as stored procedures and scheduled events are clearly marked.

The sample dataset used in this repository is intentionally small and self-contained so you can focus on SQL syntax and reasoning.

---

# 2. SELECT

SELECT chooses the columns you want to return.

    SELECT first_name, last_name
    FROM employees;

Return every column:

    SELECT *
    FROM employees;

Return unique values:

    SELECT DISTINCT department_id
    FROM employees;

You can also calculate values in SELECT:

    SELECT first_name, salary, salary * 1.10 AS salary_after_raise
    FROM employees;

**Mental model:** SELECT answers “which columns or expressions should appear in my result?”

---

# 3. WHERE

WHERE filters rows before grouping or aggregation.

    SELECT *
    FROM employees
    WHERE salary > 70000;

Multiple conditions:

    SELECT *
    FROM employees
    WHERE department_id = 2
      AND salary >= 60000;

Common operators:

| Operator | Meaning |
|---|---|
| = | equal |
| <> or != | not equal |
| > | greater than |
| < | less than |
| >= | greater than or equal |
| <= | less than or equal |
| BETWEEN | inside a range |
| IN | matches one of several values |
| LIKE | pattern matching |

Pattern example:

    SELECT *
    FROM employees
    WHERE first_name LIKE 'A%';

---

# 4. GROUP BY and aggregate functions

GROUP BY collapses rows into groups so you can summarize them.

    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id;

Important aggregate functions:

- COUNT()
- SUM()
- AVG()
- MIN()
- MAX()

Example:

    SELECT department_id,
           COUNT(*) AS employee_count,
           AVG(salary) AS avg_salary,
           MAX(salary) AS max_salary
    FROM employees
    GROUP BY department_id;

---

# 5. ORDER BY

ORDER BY sorts the final result.

    SELECT first_name, salary
    FROM employees
    ORDER BY salary DESC;

Multiple sort keys:

    SELECT department_id, first_name, salary
    FROM employees
    ORDER BY department_id ASC, salary DESC;

---

# 6. WHERE vs HAVING

This distinction matters a lot:

- WHERE filters individual rows **before** GROUP BY.
- HAVING filters aggregated groups **after** GROUP BY.

Example:

    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    WHERE active = 1
    GROUP BY department_id
    HAVING AVG(salary) > 65000;

---

# 7. LIMIT and aliases

LIMIT controls how many rows are returned.

    SELECT *
    FROM employees
    ORDER BY salary DESC
    LIMIT 5;

Aliases rename output columns or tables:

    SELECT e.first_name,
           e.salary AS annual_salary
    FROM employees AS e;

---

# 8. JOINs

JOINs combine related tables.

INNER JOIN keeps matching rows:

    SELECT e.first_name, d.department_name
    FROM employees AS e
    INNER JOIN departments AS d
      ON e.department_id = d.department_id;

LEFT JOIN keeps every row from the left table:

    SELECT e.first_name, d.department_name
    FROM employees AS e
    LEFT JOIN departments AS d
      ON e.department_id = d.department_id;

A good JOIN habit is to ask:

1. What is the grain of each table?
2. What key relates them?
3. Can the join duplicate rows?
4. Which table must be preserved?

---

# 9. UNION

UNION stacks compatible result sets vertically.

    SELECT first_name AS name
    FROM employees
    UNION
    SELECT customer_name AS name
    FROM customers;

UNION removes duplicates. UNION ALL keeps duplicates.

---

# 10. String functions

Useful functions include:

- LENGTH()
- UPPER()
- LOWER()
- TRIM()
- REPLACE()
- SUBSTRING()
- CONCAT() in MySQL

Example:

    SELECT
        UPPER(first_name) AS upper_name,
        LENGTH(first_name) AS name_length
    FROM employees;

MySQL full name:

    SELECT CONCAT(first_name, ' ', last_name) AS full_name
    FROM employees;

---

# 11. CASE

CASE adds conditional logic to a query.

    SELECT first_name,
           salary,
           CASE
             WHEN salary >= 90000 THEN 'High'
             WHEN salary >= 65000 THEN 'Medium'
             ELSE 'Standard'
           END AS salary_band
    FROM employees;

Think of CASE as SQL's if / elif / else.

---

# 12. Subqueries

A subquery is a query inside another query.

Filter against a calculated value:

    SELECT first_name, salary
    FROM employees
    WHERE salary > (
        SELECT AVG(salary)
        FROM employees
    );

Subqueries can appear in:

- WHERE
- SELECT
- FROM

Use them when the outer query needs the result of another query.

---

# 13. Window functions

Window functions calculate across related rows **without collapsing them**.

Department average next to each employee:

    SELECT
        first_name,
        department_id,
        salary,
        AVG(salary) OVER (
            PARTITION BY department_id
        ) AS department_avg_salary
    FROM employees;

This is the key difference from GROUP BY: the original rows stay visible.

---

# 14. ROW_NUMBER, RANK and DENSE_RANK

    SELECT
        first_name,
        department_id,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC
        ) AS row_num,
        RANK() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC
        ) AS salary_rank,
        DENSE_RANK() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC
        ) AS dense_salary_rank
    FROM employees;

Use:

- ROW_NUMBER when every row needs a unique sequence.
- RANK when ties should share a rank and leave gaps.
- DENSE_RANK when ties should share a rank without gaps.

---

# 15. CTEs

A Common Table Expression gives a temporary name to a query block.

    WITH department_stats AS (
        SELECT
            department_id,
            AVG(salary) AS avg_salary
        FROM employees
        GROUP BY department_id
    )
    SELECT *
    FROM department_stats
    WHERE avg_salary > 65000;

CTEs often make complex queries easier to read than deeply nested subqueries.

---

# 16. Temporary tables

Temporary tables are useful when an intermediate result is reused multiple times.

    CREATE TEMPORARY TABLE high_salary_employees AS
    SELECT *
    FROM employees
    WHERE salary >= 80000;

    SELECT *
    FROM high_salary_employees;

Use a temp table when an intermediate dataset has a meaningful lifecycle across several queries in the same session.

---

# 17. Stored procedures, triggers and events

These are MySQL-specific operational features.

### Stored procedure

A stored procedure saves reusable SQL logic and can accept parameters.

Typical use cases:

- repeated reporting queries
- standardized database operations
- encapsulating multi-step logic

### Trigger

A trigger automatically runs after or before INSERT, UPDATE or DELETE.

Typical use cases:

- audit logging
- automatically maintaining derived data
- enforcing database-side rules

### Event

A MySQL Event Scheduler can run SQL at a scheduled time.

Typical use cases:

- periodic cleanup
- scheduled aggregation
- maintenance jobs

These features are explained in the Codelab but should be executed in a real MySQL environment rather than the in-browser practice engine.

---

# 18. Project — Data Cleaning

A reliable SQL cleaning workflow is:

1. Preserve the raw table.
2. Create a staging copy.
3. Detect duplicates.
4. Remove duplicate records.
5. Standardize text and categories.
6. Convert invalid blanks to NULL.
7. Fix data types.
8. Investigate missing values.
9. Remove unusable rows or columns only when justified.
10. Validate the cleaned result.

Duplicate detection with ROW_NUMBER:

    WITH duplicates AS (
        SELECT *,
               ROW_NUMBER() OVER (
                   PARTITION BY company, location, industry, event_date
                   ORDER BY company
               ) AS row_num
        FROM layoffs_raw
    )
    SELECT *
    FROM duplicates
    WHERE row_num > 1;

Standardize text:

    SELECT
        TRIM(company) AS company,
        NULLIF(TRIM(industry), '') AS industry
    FROM layoffs_raw;

The important idea is not “delete nulls.” It is to understand what each missing or inconsistent value means before changing it.

---

# 19. Project — Exploratory Data Analysis

EDA starts with simple questions and becomes progressively deeper.

Start with ranges:

    SELECT
        MIN(event_date) AS first_date,
        MAX(event_date) AS last_date
    FROM layoffs_clean;

Largest events:

    SELECT company, total_laid_off
    FROM layoffs_clean
    ORDER BY total_laid_off DESC
    LIMIT 10;

Totals by company:

    SELECT company, SUM(total_laid_off) AS total_laid_off
    FROM layoffs_clean
    GROUP BY company
    ORDER BY total_laid_off DESC;

Rolling totals:

    WITH monthly AS (
        SELECT
            SUBSTRING(event_date, 1, 7) AS month,
            SUM(total_laid_off) AS monthly_layoffs
        FROM layoffs_clean
        GROUP BY SUBSTRING(event_date, 1, 7)
    )
    SELECT
        month,
        monthly_layoffs,
        SUM(monthly_layoffs) OVER (
            ORDER BY month
        ) AS rolling_total
    FROM monthly;

This project combines GROUP BY, CTEs and window functions into an analysis workflow.

---

# Interactive Codelab

The live **Abed Codelab** turns the course into guided SQL practice.

It includes:

- step-by-step lessons
- editable SQL
- real in-browser SQL execution
- table-formatted query results
- automatic answer checking for executable lessons
- solutions
- local progress tracking
- light and dark mode
- MySQL-only labels for stored procedures, triggers and events

**Launch:** https://abed-dvp.github.io/SQL/

The browser runtime is bundled during the GitHub Pages deployment so the Codelab does not depend on a live database server.

---

# Repository structure

    SQL/
    ├── README.md
    ├── index.html
    ├── codelab/
    │   ├── index.html
    │   ├── app.js
    │   ├── steps.js
    │   ├── styles.css
    │   └── README.md
    ├── sql/
    │   ├── 00_setup.sql
    │   ├── 01_beginner.sql
    │   ├── 02_intermediate.sql
    │   ├── 03_advanced_mysql.sql
    │   ├── 04_data_cleaning_project.sql
    │   └── 05_eda_project.sql
    └── .github/workflows/pages.yml

---

# Recommended learning method

For each topic:

1. Read the short explanation.
2. Predict what the query will return.
3. Write the query yourself.
4. Run it in the Codelab.
5. Check the result.
6. Explain why the result is correct.
7. Re-write the query later without looking.

The goal is not to memorize SQL keywords. The goal is to learn how to translate a data question into a correct query.

---

## Credits

Learning sequence inspired by Alex The Analyst's **Learn SQL Beginner to Advanced in Under 4 Hours** and its companion MySQL YouTube Series repository.

All tutorial explanations, examples, exercises and the browser Codelab in this repository are independently written for personal study and practice.
