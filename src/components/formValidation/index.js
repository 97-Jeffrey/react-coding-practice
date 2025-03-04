import { useState } from 'react';
import '../../styles/form.css'


const FormValidation = () =>{
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password:'',
        confirmPassword:''
    })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const handleUserInfo = (e) =>{
        const { name, value} = e.target;
        console.log(name, value)
        setUserInfo(prev=> ({...prev, [name]: value}))
        setErrors(prev=> ({...prev, [name]: formValidation(name, value)}))

    }

    const formValidation = (type, value) =>{
        let error = ''
        switch(type){
            case 'name':
                if(value.length<2) error='name should be at least 2 characters long';
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
                break;
            case 'password':
                if (value.length < 8) error = 'Password must be at least 8 characters';
                break;
            case 'confirmPassword':
                if(value !==userInfo.password) error='Password should match';
                break;
            default:
                break
        }

        return error;

    }

    const handleFormSubmit =(e)=>{
        e.preventDefault();

        const newErrors ={...errors}
        // Object.keys(userInfo).forEach(info=> {
        //     const error = formValidation(info, userInfo[info])
        //     if(error) newErrors[info] = error
        // })

        if(Object.values(newErrors).filter(field=> field.length>0).length ===0){
            setSubmitted(true)
            setUserInfo({
                name: '',
                email: '',
                password:'',
                confirmPassword:''
            })

        }else{
            setErrors(newErrors)
        }





    }

    const isFormValid =
    Object.values(userInfo).every(field=> field) &&  
    Object.values(errors).every((error) => !error);



    return (
        <>
           <div className='container'>

            <form onSubmit={handleFormSubmit} className='form'>
               
               <div className='input-container'>
                   <label htmlFor='name'>Name</label>
                   <input 
                      id='name' 
                      placeholder='name' 
                      name='name'
                      required
                      value={userInfo.name} 
                      onChange={handleUserInfo}
                    />
                    {errors.name && <div>{errors.name}</div>}

               </div>

               <div className='input-container'>
                   <label htmlFor='email'>Email</label>
                   <input 
                        id='email' 
                        placeholder='email' 
                        name='email'
                        required
                        value={userInfo.email} 
                        onChange={handleUserInfo}
                    />
                     {errors.email && <div>{errors.email}</div>}

               </div>

               <div className='input-container'>
                   <label htmlFor='password'>Password</label>
                   <input 
                       id='password' 
                       placeholder='password' 
                       name='password'
                       required
                       value={userInfo.password} 
                       type='password'
                       onChange={handleUserInfo}
                    />
                    {errors.password && <div>{errors.password}</div>}

               </div>

               <div className='input-container'>
                   <label htmlFor='confirm-password'>Confirm Password</label>
                   <input 
                        id='confirm-password' 
                        placeholder='confirm password' 
                        name='confirmPassword'
                        required
                        value={userInfo.confirmPassword} 
                        type='password'
                       onChange={handleUserInfo}
                    />
                    {errors.confirmPassword && <div>{errors.confirmPassword}</div>}

               </div>
               <button type='submit' disabled={!isFormValid}>Submit</button>
               </form>

               {submitted && <div>Success! You have successfully registered.</div>}

           </div>
        </>
    )
}

export default FormValidation;