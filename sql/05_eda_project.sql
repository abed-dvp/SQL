-- EXPLORATORY DATA ANALYSIS PATTERNS

-- Range
SELECT MIN(event_date), MAX(event_date)
FROM layoffs_clean;

-- Biggest events
SELECT company, total_laid_off
FROM layoffs_clean
ORDER BY total_laid_off DESC
LIMIT 10;

-- Totals by company
SELECT company,
       SUM(total_laid_off) AS total_laid_off
FROM layoffs_clean
GROUP BY company
ORDER BY total_laid_off DESC;

-- Monthly rolling total
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
  SUM(monthly_layoffs) OVER (ORDER BY month) AS rolling_total
FROM monthly;