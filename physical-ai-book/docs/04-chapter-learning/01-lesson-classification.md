---
title: "Learning from Data: Classification"
description: "Teach robots to recognize patterns using machine learning classification algorithms"
sidebar_position: 1
difficulty: "Intermediate/Advanced"
duration_minutes: 100
prerequisites: ["Navigation Systems (Lesson 3.3)"]
hardware_budget: "Included"
keywords: ["machine learning", "classification", "scikit-learn", "training data"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Collect training data from robot sensors
- Train classification models with scikit-learn
- Evaluate model performance
- Deploy trained models on robot
- Understand overfitting and generalization

## Core Concepts

### Classification Task

Classification assigns inputs to predefined categories:
- **Example**: Classify surface type (tile, carpet, wood)
- **Input**: Sensor data (accelerometer readings)
- **Output**: Predicted category

### Training Process

1. **Collect**: Gather labeled training data
2. **Prepare**: Extract features, split train/test
3. **Train**: Fit model to training data
4. **Evaluate**: Measure accuracy on test data
5. **Deploy**: Use model on robot

### Algorithms

**k-Nearest Neighbors:**
- Simple, interpretable
- Stores training data, classifies by nearest neighbors
- Good for small datasets

**Decision Trees:**
- Creates interpretable rules
- Fast prediction
- Prone to overfitting

**Random Forest:**
- Multiple trees voted together
- More robust
- Better generalization

## Code Example: Surface Classification

```python
"""
Train robot to recognize walking surfaces using scikit-learn
"""

import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle

# Training data: accelerometer readings from different surfaces
# Format: [ax, ay, az] in g-force
data = np.array([
    [0.1, 0.2, 9.8],  # Tile sample 1
    [0.15, 0.18, 9.8],  # Tile sample 2
    [0.2, 1.5, 9.7],  # Carpet sample 1
    [0.25, 1.8, 9.6],  # Carpet sample 2
    # ... collect more samples from your robot ...
])

# Labels: 0=tile, 1=carpet, 2=wood
labels = np.array([0, 0, 1, 1, 2, 2])

# Split: 80% training, 20% testing
X_train, X_test, y_train, y_test = train_test_split(
    data, labels, test_size=0.2, random_state=42
)

# Train Random Forest
model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Model Accuracy: {accuracy:.1%}")

# Save for deployment
with open('surface_classifier.pkl', 'wb') as f:
    pickle.dump(model, f)
```

## Hands-On Exercise: Train Surface Classifier

**Data Collection:**
1. Mount accelerometer on robot
2. Move slowly on each surface (10 passes each)
3. Record 50+ samples per surface
4. Save as CSV file

**Training:**
1. Load CSV data into Python
2. Train model with scikit-learn
3. Check accuracy (aim for >80%)

**Deployment:**
1. Upload trained model to robot
2. Test on new surfaces
3. Measure real-world accuracy

## Troubleshooting

### Low test accuracy
- Collect more training data
- Add more features (gyroscope, etc.)
- Use simpler model (kNN instead of Random Forest)

### Perfect training but poor test accuracy
- **Overfitting**: Too many features, not enough data
- **Fix**: Collect more samples, reduce features

## Next Steps

You've implemented **supervised learning**! Lesson 4.2 covers **reinforcement learning** - learning through trial and error.

---

Next: Lesson 4.2 - Reinforcement Learning Intro!
