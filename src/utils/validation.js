export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^(\+?233|0)[2-9]\d{8}$/;
  return re.test(phone);
};

export const validateSurveyRequest = (values) => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Full name is required';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!validatePhone(values.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid Ghana phone number';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.projectLocation) {
    errors.projectLocation = 'Project location is required';
  }

  if (!values.surveyType) {
    errors.surveyType = 'Please select a survey type';
  }

  return errors;
};