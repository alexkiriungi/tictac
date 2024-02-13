import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Spinner, TextInput, Label } from 'flowbite-react';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [ formData, setFormData ] = useState({});
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrorMessage(null);
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/log-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 flex-col max-w-3xl mx-auto md:flex-row md:items-center gap-6 '>
        {/* Left side of the sign up page */}
       <div className='flex-1' >
        <Link to='/' className='font-bold dark:text-white text-5xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-pink-500
            via-purple-500 to-indigo-500 rounded-lg text-white'>Tic</span>Tac
          </Link>
          <p className='mt-5 text-sm font-semibold'>
            Welcome to TicTac, where memories are cherished with a snap
          </p>
       </div>
      
        {/* Right side of the sign up page */}
        <div className="flex-1" >
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Username' />
              <TextInput 
              type='text'
              placeholder='username'
              id='username'
              onChange={handleChange} />
            </div>
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
              placeholder='password'
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
                ) : 'Sign Up'
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-3'>
            <span>Have an account?</span>
            <Link to='/log-in' className='text-blue-400'>
              Log In
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
