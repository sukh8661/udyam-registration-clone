const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FormSubmission = sequelize.define('FormSubmission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  aadhaarNumber: {
    type: DataTypes.STRING(12),
    allowNull: false,
    unique: true,
    validate: {
      len: [12, 12],
      isNumeric: true,
    },
  },
  otp: {
    type: DataTypes.STRING(6),
    allowNull: false,
    validate: {
      len: [6, 6],
      isNumeric: true,
    },
  },
  panNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      len: [10, 10],
      is: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    },
  },
  entrepreneurName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100],
    },
  },
  mobileNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      len: [10, 10],
      isNumeric: true,
    },
  },
  emailId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'form_submissions',
  timestamps: true,
});

module.exports = FormSubmission;
