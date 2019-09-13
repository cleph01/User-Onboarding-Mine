import React, { useState , useEffect } from 'react'

import { withFormik, Form, Field } from 'formik'

import * as yup from 'yup'

import axios from 'axios'


const OnboardingForm = (props) => {

    const [users, setUsers] = useState([])
  
    useEffect( () => {
      if(props.status){
        setUsers([...users, props.status]) //<-- Not Sure What this does
      }
    }, [props.status])
  
    // console.log(props.status)
  
    // console.log(users)
  
    return (
      <Form>

        <h2 style={{textAlign:'center'}}>User Onboarding</h2><br />

        {props.touched.name && props.errors.name && <p className='error'>{props.errors.name}</p>}
        <Field type="text" name="name" placeholder="Name" />
        
        {props.touched.email && props.errors.email && <p className='error'>{props.errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />

        {props.touched.password && props.errors.password && <p className='error'>{props.errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
        
        {props.touched.tos && props.errors.tos && <p className='error'>{props.errors.tos}</p>}
        <label>
          <Field type="checkbox" name="tos" />
            <span>Terms of Service</span>
        </label>

        <button type="submit">Submit</button>
  
        { users.map( (user, index) => {
  
          return <div key={index}>name: {user.name}</div>
        }
        )}
  
      </Form>
    )
  }
  
  export default withFormik({ 
    //Values come from Formik automatically --- magic?
    mapPropsToValues: (currentValuesFromOurForm) => {
      //this makes these inputs 'controlled', sets the values automatically for us
      return { 
        //these keys line up with the 'name' attribute in our Fields
        name: currentValuesFromOurForm.name || '',
        email: currentValuesFromOurForm.email || '',
        password: currentValuesFromOurForm.password || '',
        tos: currentValuesFromOurForm.tos || false
      }
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('You Forgot name Foo!'),
      email: yup.string().email().required('You Forgot email Foo!'),
      password: yup.string().required('You Forgot Password Foo!'),
      tos: yup.boolean().oneOf([true], 'Terms of Service Must Be Checked')
    }),
    handleSubmit: (values, {setStatus}) => {
      axios.post('https://reqres.in/api/users', values)
      .then(( res ) => {
        
        setStatus(res.data)
        // console.log(res)
      })
      .catch (( err ) => {
        console.log("Error: ", err)
      })
      
      console.log(values)
    }
  
  })(OnboardingForm)
  