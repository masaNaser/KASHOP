import * as yup from 'yup';

export const RegisterSchema = yup.object({
   username: yup.string().required('Username is required'),
   fullName: yup.string().required('Full name is required'),
   email: yup.string().email('Invalid email format').required('Email is required'),
   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
   confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
   phoneNumber: yup.string().required('Phone number is required'),
}) 
 

