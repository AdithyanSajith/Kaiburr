# Consumer Complaint Classification

This project demonstrates text classification on the Consumer Complaint Database. The goal is to classify complaints into four categories:

- Credit reporting, credit repair services, or other personal consumer reports
- Debt collection
- Consumer Loan
- Mortgage

## Features
- Fast, vectorized text preprocessing
- TF-IDF vectorization (unigrams & bigrams, 3000 features)
- Multi-model training: Logistic Regression, Random Forest, Linear SVM
- Model evaluation with accuracy, classification report, and confusion matrix
- Example prediction for new complaint text

## Usage
1. Place your `complaints.csv` file in the same directory as the notebook.
2. Open and run `newtask.ipynb` in Jupyter or VS Code.
3. The notebook will automatically detect the complaint text column and process the data.

## Requirements
- Python 3.7+
- pandas, numpy, matplotlib, seaborn
- scikit-learn

Install requirements with:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn
```

## Notes
- The code is optimized for speed and large datasets.
- If you encounter a KeyError for the complaint text column, check your CSV for the correct column name (should be 'Consumer complaint' or 'Consumer complaint narrative').

## Example Prediction Output
```
🔍 Predicted category: Credit reporting, repair, or other
```
