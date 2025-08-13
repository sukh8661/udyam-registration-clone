export interface FormStep1Data {
  aadhaarNumber: string;
  otp: string;
}

export interface FormStep2Data {
  panNumber: string;
  entrepreneurName: string;
  mobileNumber: string;
  emailId: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ValidationRule {
  required: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}
