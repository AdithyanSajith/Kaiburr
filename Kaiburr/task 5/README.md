# Consumer Complaint Classification

## 📸 Screenshots

Below are screenshots demonstrating the classification workflow, results, and steps, with name and date/time visible:

<img src="Screenshots/Screenshot 2025-10-19 040625.png" alt="Step 1" width="600"/>
<img src="Screenshots/Screenshot 2025-10-19 041334.png" alt="Step 2" width="600"/>
<img src="Screenshots/Screenshot 2025-10-19 041352.png" alt="Step 3" width="600"/>
<img src="Screenshots/Screenshot 2025-10-19 041418.png" alt="Step 4" width="600"/>
<img src="Screenshots/Screenshot 2025-10-19 041440.png" alt="Step 5" width="600"/>
<img src="Screenshots/Screenshot 2025-10-19 041457.png" alt="Step 6" width="600"/>
<img src="Screenshots/Screenshot 2025-10-19 041513.png" alt="Step 7" width="600"/>

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
