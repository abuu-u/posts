import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
  name: yup.string().required('Reuired field'),
  password: yup.string().required('Reuired field'),
})
