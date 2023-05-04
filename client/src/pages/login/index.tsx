import { useEffect, useState } from 'react';

import styles from './login.module.css';

import { loginUser } from '@/services/client.service';
import { useAuth } from '@/contexts/auth.context';

import Button from '@/components/button/button.component';
import Conditional from '@/components/conditional/conditional.component';

class LoginPageErrors {
  invalidPassword: boolean;
  invalidEmail: boolean;

  unspecifiedError?: string;

  constructor() {
    this.invalidPassword = false;
    this.invalidEmail = false;

    this.unspecifiedError = '';
  }
}

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(new LoginPageErrors());

  const { isAuthenticated, tryGetCurrentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      if (isAuthenticated) return;
    }

    // setLoading(true);

    // try to login
    tryGetCurrentUser()
      .then((success) => {
        if (!success) return;

        window.location.pathname = '/chat';
      })
      .finally(() => {
        // setLoading(false);
      });
  }, [isAuthenticated, tryGetCurrentUser]);

  const validateForm = (): boolean => {
    const currentErrors = new LoginPageErrors();

    // TODO better validation
    // validate email
    currentErrors.invalidEmail = email === '' || email.length < 10;

    // validate password
    currentErrors.invalidPassword = password === '' || password.length < 8;

    setErrors(currentErrors);

    return !(currentErrors.invalidEmail || currentErrors.invalidEmail);
  };

  const login = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // validate form
    const formIsValid = validateForm();

    if (formIsValid) {
      loginUser(email, password)
        .then((result) => {
          // TODO check result
          window.location.pathname = '/chat';
        })
        .catch((err: Error) => {
          errors.unspecifiedError = err.message;
          setErrors(errors);
        });
    }
  };

  return (
    <main
      className={
        'flex min-h-screen flex-col items-center justify-center p-12 py-24'
      }
    >
      <div
        className={`${styles.form_container} w-2/4 flex flex-col items-center justify-center rounded-lg px-8 pt-6 pb-8 mb-4 ring-1 bg-white ring-slate-900/5 shadow-xl`}
      >
        <div className='w-3/4 max-w-xl'>
          <form className=' px-8 pt-6 pb-8 mb-4' onSubmit={login}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type='text'
                placeholder='Enter your email'
              />
              <Conditional showIf={errors.invalidEmail}>
                <p className='text-red-500 text-xs italic'>
                  Please provide a valid email.
                </p>
              </Conditional>
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type='password'
                placeholder='********'
              />
              <Conditional showIf={errors.invalidPassword}>
                <p className='text-red-500 text-xs italic'>
                  Please provide a valid password. It needs to have at least 8
                  characters.
                </p>
              </Conditional>
            </div>
            <div className='items-center justify-center text-center'>
              <Conditional showIf={errors.unspecifiedError !== ''}>
                <p className='text-red-500 text-xs italic'>
                  An unknown error occurred: {errors.unspecifiedError}
                </p>
              </Conditional>
            </div>
            <div className='flex items-center justify-center pt-8'>
              <Button type='submit'>Sign in</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
