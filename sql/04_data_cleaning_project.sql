-- DATA CLEANING PROJECT PATTERNS

-- 1) Preserve raw data
CREATE TABLE layoffs_staging AS
SELECT * FROM layoffs_raw;

-- 2) Detect duplicates
WITH duplicate_check AS (
  SELECT *,
         ROW_NUMBER() OVER (
           PARTITION BY company, location, industry, total_laid_off, event_date
           ORDER BY company
         ) AS row_num
  FROM layoffs_staging
)
SELECT *
FROM duplicate_check
WHERE row_num > 1;

-- 3) Standardize text
UPDATE layoffs_staging
SET company = TRIM(company);

-- 4) Convert blanks to NULL
UPDATE layoffs_staging
SET industry = NULL
WHERE TRIM(industry) = '';

-- 5) Validate
SELECT
  COUNT(*) AS rows_after_cleaning,
  COUNT(DISTINCT company) AS companies
FROM layoffs_staging;