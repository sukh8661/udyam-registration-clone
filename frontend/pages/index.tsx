import React, { useState } from 'react';
import Head from 'next/head';
import FormStep1 from '../components/forms/FormStep1';
import FormStep2 from '../components/forms/FormStep2';
import ProgressTracker from '../components/ProgressTracker';
import { FormStep1Data, FormStep2Data } from '../types';
import styles from '../styles/components.module.css';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    step1?: FormStep1Data;
    step2?: FormStep2Data;
  }>({});

  const handleStep1Next = (data: FormStep1Data) => {
    setFormData(prev => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  const handleStep2Next = async (data: FormStep2Data) => {
    setFormData(prev => ({ ...prev, step2: data }));
    
    // Submit to backend
    try {
      const response = await fetch('/api/form/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData.step1, ...data })
      });
      
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      alert('Error submitting form. Please try again.');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  return (
    <>
      <Head>
        <title>Udyam Registration Form</title>
        <meta name="description" content="Udyam Registration Portal Clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Udyam Registration</h1>
            <p>Ministry of Micro, Small and Medium Enterprises</p>
          </header>

          <ProgressTracker currentStep={currentStep} totalSteps={2} />

          {currentStep === 1 && (
            <FormStep1 onNext={handleStep1Next} />
          )}

          {currentStep === 2 && (
            <FormStep2 
              onNext={handleStep2Next} 
              onPrevious={handlePrevious} 
            />
          )}
        </div>
      </main>
    </>
  );
}
