import React from 'react'
import { useForm } from 'react-hook-form';

const RHF = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();
     console.log("Rerendering in RHF....")
  return (
    <div>
   <h3>React Hook Form</h3>
    <form onSubmit={handleSubmit((data) => console.log(data))}>
        
            <input {...register('firstName')} />
            
            <input {...register('lastName', { required: true })} />

            {errors.lastName && <p>Last name is required.</p>}

            <input {...register('age', { min: { value: 1, message: "Age Must be at least 1" } })} />

            {errors.age && <p style={{color:"red"}}>{errors.age.message}</p>}
            <input type="submit" />
    </form>
    </div>
  )
}

export default RHF