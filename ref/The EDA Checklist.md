# The EDA Checklist

## Inspect Data Quickly

## Core Concept: Initial Reconnaissance
Data inspection is the mandatory first step of Exploratory Data Analysis (EDA). These 5 methods (`head`, `tail`, `sample`, `shape`, `info`) form the standard operating procedure for loading any new dataset.

---

## 1. Visual Inspection
Never assume the data loaded correctly just because Pandas didn't throw an error.

```python
import pandas as pd
df = pd.read_csv('employees.csv')

# 1. Check the top 5 rows (default) to verify headers mapped correctly
df.head()

# 2. Check the last 10 rows to ensure file integrity at the EOF marker
df.tail(10)

# 3. Check 5 random rows to verify data isn't uniquely structured at the edges
df.sample(5, random_state=42) # random_state ensures reproducibility
```

---


![Quick DataFrame Inspection Methods](https://s13n-curr-images-bucket.s3.ap-south-1.amazonaws.com/pandas/14-2-61-inspection-map.png)

## 2. Dimensionality with `.shape`
`.shape` is not a method; it is a DataFrame attribute derived from the underlying NumPy architecture. Therefore, it does not use parentheses `()`.

```python
dimensions = df.shape
print(f"The dataset has {dimensions[0]} rows and {dimensions[1]} columns.")
```

---

## 3. Deep Dive with `.info()`
`df.info()` is the diagnostic x-ray of your DataFrame. You must learn to read its output fluently.

```python
df.info()

# Expected output breakdown:
# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 100 entries, 0 to 99                <- Validates exact row count
# Data columns (total 3 columns):                 <- Validates exact column count
#  #   Column   Non-Null Count  Dtype  
# ---  ------   --------------  -----  
#  0   ID       100 non-null    int64             <- Perfect column, no missing data
#  1   Name     98 non-null     object            <- String column, 2 missing values!
#  2   Salary   100 non-null    float64           <- Decimal column
```
*(Cruciual takeaway: Comparing the `Non-Null Count` against the `RangeIndex` immediately exposes columns with missing `NaN` data).*

---

## Pro-Tip: Memory Usage
By default, `df.info()` estimates memory. To get the exact RAM usage of the DataFrame (crucial for large files), pass `memory_usage='deep'`.

```python
df.info(memory_usage='deep')
```


---

# Group Data with groupby

## 1. Why Group?
Data is only valuable if it tells a story. Raw data is often too noisy. 
By grouping data, we find patterns across categories. We move from looking at individual "data points" to looking at "segment behavior".

## 2. Analogy: The Laundry Service
The "Split-Apply-Combine" pattern is the industry standard for grouped operations:
- **Split**: Subdividing the data based on a key (e.g., Color).
- **Apply**: Calculating something for each group (e.g., counting items).
- **Combine**: Merging results back into a clean summary table.


![GroupBy: Split-Apply-Combine](https://s13n-curr-images-bucket.s3.ap-south-1.amazonaws.com/pandas/14-2-17-groupby-sac.png)

## 3. Key Concepts
- **`df.groupby('Col')`**: Returns a `DataFrameGroupBy` object (The "Lazy" object).
- **Aggregation Functions**: Tools like `.sum()`, `.mean()`, `.count()`, and `.min()/max()`.
- **Selecting Columns**: Using `df.groupby('Col')['Value_Col']` to target specific data. 
- **The `numeric_only` Rule**: In modern Pandas (2.0+), if you calculate a mean or sum on a group with text columns, you **must** specify `numeric_only=True` or Pandas will throw a `TypeError`.

## 4. Under the Hood: The "Lazy" GroupBy
What happens when you run `grouped = df.groupby('City')`?
1.  **No Calculation (Yet)**: Pandas does **not** calculate anything initially. It simply scans the 'City' column and creates a "map" of which rows belong to which city.
2.  **The Metadata Map**: It creates a hash table where the keys are the cities and the values are lists of row numbers (indices).
3.  **Efficiency**: This "Lazy Evaluation" is incredibly fast because Pandas waits until you specify the math (like `.mean()`) before it actually looks at the numeric data.

## 5. Detailed Examples

### 1. Basic Summation
```python
import pandas as pd
data = {'Region': ['North', 'South', 'North', 'South'], 'Sales': [1000, 2000, 1500, 3000]}
df = pd.DataFrame(data)

# Total sales per region
region_totals = df.groupby('Region')['Sales'].sum()
```

### 2. Multi-column Selection
```python
# Multiple metrics for one group (e.g., Sales and Units)
stats = df.groupby('Region')[['Sales', 'Units']].mean()
```

## 6. Common Pitfalls
- **The "Lost" Columns**: When you group by 'Department', any column that isn't the group key OR a numeric value will be dropped by default aggregation (like `.mean()`) because you can't find the "average" of a String.
- **The Forgotten Aggregation**:
    ```python
    res = df.groupby('City') 
    print(res) # Output: <pandas.core.groupby.generic.DataFrameGroupBy object...>
    ```
    *Fix*: Always follow groupby with an action like `.sum()` or `.mean()`.
- **Numeric vs. Non-numeric**: Attempting to `.mean()` on a column of Strings will result in an error or an empty result in newer Pandas versions (Numeric-only rule).


---

# Get Summary Statistics with describe

## 1. Why describe()?
In exploratory data analysis (EDA), `describe()` is often the very first command an analyst runs after loading data. It provides a statistical snapshot that reveals data quality issues (like negative prices or extreme outliers) and structural trends instantly.

## 2. Analogy: The Executive Summary
- **The 30,000-ft View**: Seeing the whole forest, not the individual trees.
- **The Vital Signs**: Checking the "Pulse" of the dataset.


![What .describe() Returns](https://s13n-curr-images-bucket.s3.ap-south-1.amazonaws.com/pandas/14-2-23-describe-output.png)

## 3. Key Concepts
- **`.describe()`**: Automatically identifies numerical columns and calculates a 5-number summary (Min, Q1, Median, Q3, Max) plus the Count, Mean, and Std.
- **Percentiles**: The 25%, 50%, and 75% marks. 
    - *Example*: 75% means "75% of the values in this column are BELOW this number."
- **Non-Numerical Data**: By default, `describe()` ignores text columns. To see a summary of strings (Unique count, Top value, Frequency), use `df.describe(include='all')`.

## 4. Under the Hood: Handling Holes (NaN)
How does Pandas summarize data when some entries are missing?
1.  **Silent Exclusion**: Unlike raw Python math, Pandas statistics methods **ignore `NaN`** by default.
2.  **The Denominator logic**: When calculating the `mean`, Pandas divides the sum by the count of *valid* numbers, not the total number of rows.
3.  **Memory Efficiency**: `describe()` is a "Reduction" operation. It processes the entire column and returns a very small Series or DataFrame, making it extremely memory-efficient for reporting.

## 5. Detailed Examples

### 1. Basic Numerical Summary
```python
import pandas as pd
df = pd.DataFrame({'Age': [20, 30, 40, 50, 1000]}) # 1000 is an outlier!

print(df.describe())
# Look at the 'max'. If it's 1000 for 'Age', you instantly know there's a data entry error.
```

### 2. Including Text/Category Data
*For strings, it shows `unique` (how many categories), `top` (most common), and `freq` (how often 'top' appears).*
```python
df = pd.DataFrame({'Status': ['Active', 'Active', 'Pending']})
print(df.describe(include='object'))
```

### 3. Customizing Percentiles
```python
# See more specific slices (10th and 90th percentile)
df.describe(percentiles=[0.1, 0.9])
```

## 6. Common Pitfalls
- **The "Missing" Columns**: Expecting to see 'Name' in the numerical summary. (Pandas splits them; you need `include='all'`).
- **Standard Deviation Confusion**: Forgetting that `std` measures how spread out the data is. A `std` of 0 means every single row has the exact same value.
- **Transposing**: For very wide DataFrames (many columns), the report is hard to read. Use `df.describe().T` to flip it and read columns as rows.


---

# Handling outliers using Pandas logic

## Core Concept: Extreme Value Management
Machine Learning models are sensitive to massive numbers. A single typo (e.g., `Salary = 5,000,000` instead of `50,000`) can pull the statistical averages of an entire dataset wildly off-target. Outliers must be algorithmically identified and managed.

---

## 1. Algorithmic Detection: The IQR Method

The Interquartile Range (IQR) focuses on the "middle 50%" of your data, ignoring the extremes to find a stable baseline.

```python
import pandas as pd

# Assume 'df' holds 'Income' data
Q1 = df['Income'].quantile(0.25)
Q3 = df['Income'].quantile(0.75)
IQR = Q3 - Q1

# The standard multiplier is 1.5. A multiplier of 3.0 represents extreme outliers.
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
```

![Detecting Outliers with the IQR Method](https://s13n-curr-images-bucket.s3.ap-south-1.amazonaws.com/images/1773396036807-8c39878f8265.png)

---

## 2. Hard Removal: Trimming

By leveraging standard boolean indexing, we can permanently drop rows containing outliers. This is aggressive and reduces dataset size.

```python
# 1. Ask the question: Which rows are "normal"?
is_normal_mask = (df['Income'] >= lower_bound) & (df['Income'] <= upper_bound)

# 2. Extract only the normal rows
trimmed_df = df[is_normal_mask]
```

---

## 3. Soft Mitigation: Clipping (Winsorization)

Instead of dropping the entire row—which might contain perfectly valid data in other columns like `Age` or `Education`—we compress the extreme value down to the boundary limits.

```python
# The built in .clip() method takes the lower and upper arguments
df['Income_Clipped'] = df['Income'].clip(lower=lower_bound, upper=upper_bound)

# Example: If the upper bound is $150,000
# A raw income of $500,000 becomes $150,000.
# A raw income of $40,000 remains $40,000.
```

---

## 4. Alternate Detection: The Z-Score Method
While IQR is robust (resistant to outliers), the Z-Score method assumes your data is normally distributed (a bell curve). It measures how many standard deviations a value is away from the mean. A Z-score > 3 or < -3 is generally considered an outlier.

```python
mean_income = df['Income'].mean()
std_income = df['Income'].std()

# Calculate Z-scores manually
df['Z_Score'] = (df['Income'] - mean_income) / std_income

# Filter to keep only rows within 3 standard deviations
z_score_trimmed_df = df[(df['Z_Score'] > -3) & (df['Z_Score'] < 3)]
```


---

# Use corr() and cov() for Correlation & Covariance Matrices

## Core Concept: Multivariate Relationships
When building predictive models, identifying "features" (variables) that have strong mathematical relationships with your "target" (the thing you are trying to predict) is crucial. `df.corr()` automates this discovery process across millions of data points instantly.

---

## 1. Generating a Correlation Matrix

The `.corr()` method evaluates every numeric column against every other numeric column in the DataFrame. Non-numeric columns (like Strings/Objects) are automatically ignored.

```python
import pandas as pd

housing = pd.DataFrame({
    'Price':        [450000, 320000, 580000, 275000, 710000, 390000],
    'Square_Feet':  [1800, 1350, 2200, 1100, 2800, 1600],
    'Num_Bedrooms': [3, 2, 4, 2, 5, 3],
    'Age_of_Home':  [15, 32, 8, 45, 5, 22],
    'Address':      ['101 Maple St', '202 Oak Ave', '303 Pine Rd', '404 Elm Dr', '505 Cedar Ln', '606 Birch Blvd']
})

# Assume a real estate DataFrame 'housing'
# Columns: ['Price', 'Square_Feet', 'Num_Bedrooms', 'Age_of_Home', 'Address']

# Calculate the Pearson correlation matrix
matrix = housing.corr(numeric_only=True)

# Look at how everything relates specifically to 'Price'
price_factors = matrix['Price']

# Output Example:
# Price           1.000   (Perfect correlation with itself)
# Square_Feet     0.895   (Strong positive relationship)
# Num_Bedrooms    0.650   (Moderate positive relationship)
# Age_of_Home    -0.420   (Moderate negative relationship - older is cheaper)
```

### Pearson vs Spearman vs Kendall
- `method='pearson'` (Default): Measures linear relationships. Assumes data is normally distributed.
- `method='spearman'`: Measures monotonic relationships using rank-order. Better for data with extreme outliers or non-linear curves.
- `method='kendall'`: Another rank-based calculation, highly resilient to small sample sizes.

```python
# Use Spearman if you have massive, unclipped outliers
robust_matrix = housing.corr(method='spearman', numeric_only=True)
```

---


![Interpreting Correlation with .corr()](https://s13n-curr-images-bucket.s3.ap-south-1.amazonaws.com/pandas/14-2-70-corr-interpret.png)

## 2. Generating a Covariance Matrix

Covariance measures the joint variability of two variables. 

```python
# Calculate the Covariance matrix
cov_matrix = housing.cov(numeric_only=True)
```

**Why don't we use Covariance visually?**
Because it is heavily influenced by scale. If you measure house prices in US Dollars and `Square_Feet` in inches, the covariance will be a massive, uninterpretable multi-million integer. If you measure house prices in Millions of Dollars and `Square_Feet` in Acres, the covariance will be a tiny fraction. 

Correlation (`.corr()`) solves this by dividing the covariance by the standard deviations of both variables, mathematically trapping the result between `-1` and `1` regardless of the scale. 

*Rule of thumb: Read `.corr()` with your eyes. Feed `.cov()` to your algorithms.*


---

## 1. What is a Heatmap?
A heatmap visualizes 2-dimensional data by replacing numbers with corresponding colors from a gradient scale. The darker or lighter the color, the higher or lower the underlying value. It is the perfect chart for analyzing patterns in matrix-like data (such as pivot tables).

## 2. Using sns.heatmap()
To create a heatmap, you need 2D data (like a Pandas DataFrame, a Numpy 2D array, or a list of lists). Seaborn’s `sns.heatmap()` maps these numbers to a color palette automatically.

```python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Creating a 2D matrix of data
data = pd.DataFrame({
    'Jan': [100, 150, 200],
    'Feb': [110, 160, 210],
    'Mar': [120, 170, 220]
}, index=['2020', '2021', '2022'])

# Create a basic heatmap
sns.heatmap(data)
plt.title("Basic Heatmap")
plt.show()
```

## 3. Customizing the Heatmap
Heatmaps are highly customizable to improve readability. 

- **annot=True**: Drops the actual numerical values on top of the colored blocks.
- **cmap**: Changes the color palette (e.g., `'coolwarm'`, `'Blues'`, `'viridis'`).
- **linewidths**: Adds thin lines between cells to separate them clearly.
- **fmt**: Formats the annotated text (e.g., `fmt='.1f'` for 1 decimal place, `fmt='d'` for integers).

![Customized heatmap with annotations and a coolwarm palette](https://s13n-curr-images-bucket.s3.ap-south-1.amazonaws.com/14.3/images/LO-14.3.14.png)

```python
# A customized, highly readable heatmap
sns.heatmap(data, annot=True, cmap='coolwarm', linewidths=1, fmt='d')
plt.title("Customized Monthly Data")
plt.show()
```

## 4. Key Considerations
When choosing a `cmap`, think about your data semantics:
- **Sequential**: `Blues` or `Greens` (good for data ranging from 0 to a high number).
- **Diverging**: `coolwarm` or `RdYlGn` (good for data that has a neutral midpoint, like temperatures or correlations ranging from -1 to 1).


---

## 1. Adding Basic Text
The `plt.text(x, y, s)` function places a string `s` directly onto the chart's coordinate grid at the designated `x` and `y` exact locations.

```python
import matplotlib.pyplot as plt

plt.scatter([1, 2, 3], [10, 20, 30])

# Place text exactly at x=1.5, y=25
plt.text(1.5, 25, "Notice the linear upward trend!", fontsize=12, color='red')
plt.show()
```

## 2. Dynamic Annotations with Arrows
The `plt.annotate()` function is vastly superior for data storytelling. It places text floating away from the data, and draws an arrow from the text pointing perfectly at an anomaly.

It takes several key parameters:
- `text`: The string you want to display.
- `xy`: A tuple `(x, y)` representing the coordinate you want the tip of the arrow to touch (the data point).
- `xytext`: A tuple `(x, y)` representing the coordinate where the floating text block should be drawn.
- `arrowprops`: A dictionary containing styling instructions for the arrow.

![Diagram explaining xy vs xytext coordinates for annotate](https://s13n-curr-images-bucket.s3.ap-south-1.amazonaws.com/14.3/images/LO-14.3.18.png)

## 3. Implementing plt.annotate()

```python
import matplotlib.pyplot as plt

years = [2018, 2019, 2020, 2021, 2022]
sales = [100, 110, 45, 120, 130] # Massive drop in 2020

plt.plot(years, sales, marker='o')

# Annotate the 2020 drop
plt.annotate(
    text="Pandemic Drop",
    xy=(2020, 45),              # Arrow points EXACTLY at this data coordinate
    xytext=(2019, 90),          # Text sits high and to the left
    arrowprops=dict(facecolor='black', shrink=0.05) # Draw a black arrow
)

plt.title("Yearly Sales Revenue")
plt.show()
```

## 4. Arrowprops Dictionary
The `arrowprops` dictionary accepts many styling keys. The `shrink=0.05` argument is particularly useful—it slightly shortens the arrow so it doesn't impale the data point, leaving a clean sliver of empty space between the arrowhead and the marker.


---

## 1. Generating the Correlation Matrix
Before plotting, you must calculate the underlying math. Calling `.corr()` on a Pandas DataFrame calculates the Pearson correlation coefficient calculated between every single pair of numerical columns.

```python
import pandas as pd
import seaborn as sns

# Load a dataset
penguins = sns.load_dataset('penguins')

# Calculate the correlation matrix (numeric_only is required to ignore text columns)
corr_matrix = penguins.corr(numeric_only=True)
print(corr_matrix)
```

## 2. Visualizing with sns.heatmap()
You pass the resulting `corr_matrix` directly into `sns.heatmap()`. Because correlations are bounded between -1.0 and 1.0, you must carefully configure the visual parameters to optimize readability.

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(8, 6))

sns.heatmap(
    corr_matrix, 
    annot=True,          # Show the actual correlation numbers 
    cmap='coolwarm',     # Use a diverging color scheme (Red/Blue)
    vmin=-1,             # Anchor the color scale minimum at -1
    vmax=1,              # Anchor the color scale maximum at 1
    center=0,            # Ensure 0 (no correlation) is exactly in the middle color
    fmt=".2f"            # Round to 2 decimal places
)

plt.title("Penguin Feature Correlation Heatmap")
plt.show()
```

## 3. Why vmin and vmax matter
If you don't explicitly set `vmin=-1` and `vmax=1`, Seaborn will automatically set the color scale based on whatever the highest and lowest numbers happen to be in your specific dataset (e.g., -0.3 to 0.8). This makes comparing different datasets impossible and visually misrepresents the strength of the correlation (making a weak 0.4 correlation look dark red because it happened to be the highest value).

![Two identical heatmaps showing the difference between automatic limits and enforced limits](https://s13n-curr-images-bucket.s3.ap-south-1.amazonaws.com/14.3/images/LO-14.3.22.png)


---
