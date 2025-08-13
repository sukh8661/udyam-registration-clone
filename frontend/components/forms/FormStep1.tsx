import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormStep1Data } from '../../types';
import { validateAadhaar, validateOTP } from '../../utils/validation';
import styles from '../../styles/components.module.css';

interface FormStep1Props {
  onNext: (data: FormStep1Data) => void;
}

const FormStep1: React.FC<FormStep1Props> = ({ onNext }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger
  } = useForm<FormStep1Data>();

  const aadhaarValue = watch('aadhaarNumber');

  const sendOTP = async () => {
    const isValid = await trigger('aadhaarNumber');
    if (isValid) {
      setLoading(true);
      // Simulate OTP sending
      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
      }, 1000);
    }
  };

  const onSubmit = (data: FormStep1Data) => {
    onNext(data);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Step 1: Aadhaar Verification</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="aadhaarNumber">Aadhaar Number *</label>
          <input
            type="text"
            id="aadhaarNumber"
            maxLength={12}
            placeholder="Enter 12-digit Aadhaar number"
            {...register('aadhaarNumber', {
              required: 'Aadhaar number is required',
              validate: (value) => 
                validateAadhaar(value) || 'Please enter a valid 12-digit Aadhaar number'
            })}
            className={errors.aadhaarNumber ? styles.inputError : ''}
          />
          {errors.aadhaarNumber && (
            <span className={styles.errorMessage}>{errors.aadhaarNumber.message}</span>
          )}
          
          {!otpSent && aadhaarValue && validateAadhaar(aadhaarValue) && (
            <button
              type="button"
              onClick={sendOTP}
              disabled={loading}
              className={styles.otpButton}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          )}
        </div>

        {otpSent && (
          <div className={styles.inputGroup}>
            <label htmlFor="otp">Enter OTP *</label>
            <input
              type="text"
              id="otp"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              {...register('otp', {
                required: 'OTP is required',
                validate: (value) => 
                  validateOTP(value) || 'Please enter a valid 6-digit OTP'
              })}
              className={errors.otp ? styles.inputError : ''}
            />
            {errors.otp && (
              <span className={styles.errorMessage}>{errors.otp.message}</span>
            )}
            
            <p className={styles.otpInfo}>
              OTP has been sent to your mobile number linked with Aadhaar
            </p>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={!otpSent}
            className={styles.nextButton}
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep1;
