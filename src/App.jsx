import './App.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import UsersList from './UsersList';
import { useState } from 'react';

const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .min(7, 'Email too short!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password too short')
    .required('Required'),
});

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  return (
    <div className="App">
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={UserSchema}
        onSubmit={() => {
          setLoginSuccess(true)
        }}
      >
        {({ errors, touched }) => (
          <Form className="main-form">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? (<div className="error">{errors.email}</div>) : ''}

            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            {errors.password && touched.password ? (<div className="error">{errors.password}</div>) : ''}

            <button type="submit" className="continue-btn">Continue</button>
          </Form>
        )}
      </Formik>
      { !!loginSuccess && <UsersList />}
    </div>
  )
}

export default App
