import React, { useState , useEffect } from 'react'

import { withFormik, Form, Field } from 'formik'

import * as yup from 'yup'

import axios from 'axios'


const UserForm = (props) => {

    const [users, setUsers] = useState([{}])
  
    useEffect( () => {
      if(props.status){
        setUsers([...users, props.status]) //<-- Not Sure What this does
      }
    }, [props.status])
  
    // console.log(props.status)
  
    // console.log(users)
  
    return (
      <Form>
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

        {props.touched.diet && props.errors.diet && <p className='error'>{props.errors.diet}</p>}
        <Field component="select" name="diet">
          <option value="" disabled>Select Diet:</option>{/* <-- This is our placeholder*/}
          <option value="carnivore">Carnivore</option>
          <option value="herbivore">Herbivore</option>
          <option value="omnivore">Omnivore</option>
        </Field>
  
        
  
        <Field component="textarea" name="notes" placeholder="Notes" />
  
        <button type="submit">Submit</button>
  
        {animals.map(animal => {
  
          return <div>name: {animal.name}</div>
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
        diet: currentValuesFromOurForm.diet || '',
        vaccinations: currentValuesFromOurForm.vaccinations || false,
        notes: currentValuesFromOurForm.notes || ''
      }
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('You Forgot name Foo!'),
      email: yup.number().required('You Forgot email Foo!').positive(),
      diet: yup.string().required('You Forgot Diet Foo!'),
      vaccinations: yup.boolean().oneOf([true], 'Animal Must Be Vaccinated')
    }),
    handleSubmit: (values, {setStatus}) => {
      axios.post('https://reqres.in/api/animals', values)
      .then(( res ) => {
        console.log(res)
      })
      .catch (( err ) => {
        console.log("Error: ", err)
      })
      
      console.log(values)
    }
  
  })(UserForm )
  