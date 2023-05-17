import '../styles/global.css'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const strengthLabels = ['weak', 'average', 'strong', 'tooStrong'];

const styles = [
    'bg-rose-400 w-3/12 duration-100 rounded',
    'bg-orange-400 w-6/12 duration-100 rounded',
    'bg-amber-400 w-9/12 duration-100 rounded',
    'bg-green-400 w-full duration-100 rounded',
]

export const createUserSchema = z.object({
    email: z.string()
        .nonempty('Cannot be blank')
        .email('Wrong format')
        .transform((email) =>{
        return email.toLocaleLowerCase();
        }),
    password: z.string()
        .min(6, 'Password must have at least 6 characteres')
})

export default function Register() {

    const navigate = useNavigate();

    const [strength, setStrenght] = useState('');

    const [style, setStyle] = useState('');

    const [error, setError] = useState('');

    const { register, handleSubmit, formState: {errors}  } = useForm({
        resolver: zodResolver(createUserSchema)
    })

    const onSubmit = async (values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential;
                navigate('/');
            })
            .catch(e => {
                if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setError('E-mail already in use');
                }
            })
    };

    const getStrength = (password) => {
        let indicator = -1, upper = false, lower = false, numbers = false, special = false;
        for ( let i = 0; i < password.length; i++ ) {
            const char = password .charCodeAt(i);
            if (!upper && char >= 65 && char <= 90) {
                upper = true;
                indicator ++
            }

            if (!lower && char >= 97 && char <= 122) {
                lower = true;
                indicator ++
            }

            if (!numbers && char >= 48 && char <= 57) {
                numbers = true;
                indicator ++
            }

            if (!special && char >= 33 && char <= 47) {
                special = true;
                indicator ++
            }
        }
        setStrenght(strengthLabels[indicator]);
        setStyle(styles[indicator]);
        console.log(strength);
    };

    const handleChange = e => getStrength(e.target.value);

    return (
        <main className='h-screen bg-slate-800 flex justify-center items-center flex-col'>
        <h1 className='h-10 text-3xl text-slate-200 mb-10'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col min-w-1/6 gap-2 flex flex-col '>
            <label htmlFor="" className='text-slate-300 font-semibold '>Email</label>
            <input type="text" {...register('email')} className='bg-slate-900 rounded h-10 text-slate-400 pl-2' />
            { error !== '' && <p className='text-xs text-red-500'>{ error }</p>}
            { errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p> }
            <label htmlFor="" className='text-slate-300 font-semibold'>Password</label>
            <input type="password" className='bg-slate-900 rounded h-10 text-slate-400 pl-2' {...register('password')} onChange={handleChange} />
            { errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p> }
            <div className='h-1.5 bg-slate-700 flex duration-75 rounded'>
                <div className={ style }></div>
            </div>
            <button className='h-10 bg-emerald-600 rounded font-semibold text-slate-300' type='submit'>Register</button>
        </form>
        <p className='text-slate-300 mt-5'>Already have an account? <Link to='/' className='ml-2 text-cyan-600'>Sign In</Link></p>
        </main>
    )
}