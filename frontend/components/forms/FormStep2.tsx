import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormStep2Data } from '../../types';
import { validatePAN, validateMobile, validateEmail } from '../../utils/validation';
import styles from '../../styles/components.module.css';

interface FormStep2Props {
  onNext: (data: FormStep2Data) => void;
  onPrevious: () => void;
}

const FormStep2: React.FC<FormStep2Props> = ({ onNext, onPrevious }) => {
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormStep2Data>();

  const onSubmit = async (data: FormStep2Data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onNext(data);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Step 2: PAN & Personal Details</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="panNumber">PAN Number *</label>
          <input
            type="text"
            id="panNumber"
            maxLength={10}
            placeholder="Enter PAN (e.g., ABCDE1234F)"
            style={{ textTransform: 'uppercase' }}
            {...register('panNumber', {
              required: 'PAN number is required',
              validate: (value) => 
                validatePAN(value.toUpperCase()) || 'Please enter a valid PAN number (Format: ABCDE1234F)'
            })}
            className={errors.panNumber ? styles.inputError : ''}
          />
          {errors.panNumber && (
            <span className={styles.errorMessage}>{errors.panNumber.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="entrepreneurName">Name of Entrepreneur *</label>
          <input
            type="text"
            id="entrepreneurName"
            placeholder="Enter full name as per PAN"
            {...register('entrepreneurName', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters long'
              }
            })}
            className={errors.entrepreneurName ? styles.inputError : ''}
          />
          {errors.entrepreneurName && (
            <span className={styles.errorMessage}>{errors.entrepreneurName.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="mobileNumber">Mobile Number *</label>
          <input
            type="tel"
            id="mobileNumber"
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            {...register('mobileNumber', {
              required: 'Mobile number is required',
              validate: (value) => 
                validateMobile(value) || 'Please enter a valid 10-digit mobile number'
            })}
            className={errors.mobileNumber ? styles.inputError : ''}
          />
          {errors.mobileNumber && (
            <span className={styles.errorMessage}>{errors.mobileNumber.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="emailId">Email ID *</label>
          <input
            type="email"
            id="emailId"
            placeholder="Enter email address"
            {...register('emailId', {
              required: 'Email is required',
              validate: (value) => 
                validateEmail(value) || 'Please enter a valid email address'
            })}
            className={errors.emailId ? styles.inputError : ''}
          />
          {errors.emailId && (
            <span className={styles.errorMessage}>{errors.emailId.message}</span>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={onPrevious}
            className={styles.prevButton}
          >
            ← Previous
          </button>
          <button
            type="submit"
            disabled={loading}
            className={styles.nextButton}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep2;
