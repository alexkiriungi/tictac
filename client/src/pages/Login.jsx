import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Spinner, TextInput, Label } from 'flowbite-react';
import OAuth from '../components/OAuth';
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
  const [ formData, setFormData ] = useState({});
  const navigate = useNavigate();
  const { loading, error:errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 flex-col max-w-3xl mx-auto md:flex-row md:items-center gap-6 '>
        {/* Left side of the Login page */}
       <div className='flex-1' >
        <Link to='/' className='font-bold dark:text-white text-5xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-pink-500
            via-purple-500 to-indigo-500 rounded-lg text-white'>Tic</span>Tac
          </Link>
          <p className='mt-5 text-sm font-semibold'>
            Aloha! Welcome Back to TicTac, where memories are cherished with a snap
          </p>
       </div>
      
        {/* Right side of the sign up page */}
        <div className="flex-1" >
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput 
              type='text'
              placeholder='name@example.com'
              id='email'
              onChange={handleChange} />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput 
              type='password'
              placeholder='********'
              id='password'
              onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Login'
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-3'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-400'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
