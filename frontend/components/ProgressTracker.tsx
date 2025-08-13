import React from 'react';
import styles from '../styles/components.module.css';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      <div className={styles.stepIndicators}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`${styles.stepIndicator} ${
              index + 1 <= currentStep ? styles.completed : ''
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <p className={styles.stepText}>Step {currentStep} of {totalSteps}</p>
    </div>
  );
};

export default ProgressTracker;
