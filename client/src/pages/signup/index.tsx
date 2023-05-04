import { useState } from 'react';

import styles from './signup.module.css';

import { signupUser } from '@/services/client.service';

import Button from '@/components/button/button.component';
import Conditional from '@/components/conditional/conditional.component';

class SignupPageErrors {
  invalidFirstName: boolean;
  invalidLastName: boolean;
  invalidPassword: boolean;
  invalidEmail: boolean;
  invalidPasswordConfirmation: boolean;

  unspecifiedError?: string;

  constructor() {
    this.invalidFirstName = false;
    this.invalidLastName = false;
    this.invalidPassword = false;
    this.invalidEmail = false;
    this.invalidPasswordConfirmation = false;

    this.unspecifiedError = '';
  }
}

export default function LoginPage(): JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState(new SignupPageErrors());

  const validateForm = (): boolean => {
    const currentErrors = new SignupPageErrors();

    // TODO better validation
    // validate names
    currentErrors.invalidFirstName = firstName === '';
    currentErrors.invalidLastName = lastName === '';

    // validate email
    currentErrors.invalidEmail = email === '' || email.length < 10;

    // validate password
    currentErrors.invalidPassword = password === '' || password.length < 8;

    // validate password
    currentErrors.invalidPasswordConfirmation =
      password !== passwordConfirmation;

    setErrors(currentErrors);

    return !(
      currentErrors.invalidFirstName ||
      currentErrors.invalidLastName ||
      currentErrors.invalidEmail ||
      currentErrors.invalidPassword ||
      currentErrors.invalidPasswordConfirmation
    );
  };

  const signup = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // validate form
    const formIsValid = validateForm();
    if (formIsValid) {
      signupUser({ email, firstName, lastName, password })
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
      className={'flex min-h-screen flex-col items-center justify-center p-12'}
    >
      <div
        className={`${styles.form_container} w-2/4 flex flex-col items-center justify-center rounded-lg px-8 pt-6 pb-8 mb-4 ring-1 bg-white ring-slate-900/5 shadow-xl`}
      >
        <div className='w-3/4 max-w-xl'>
          <form className=' px-8 pt-6 pb-8 mb-4' onSubmit={signup}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='firstName'
              >
                First Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='firstName'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type='text'
                placeholder='Enter your first name'
              />
              <Conditional showIf={errors.invalidFirstName}>
                <p className='text-red-500 text-xs italic'>
                  Please tells us your name.
                </p>
              </Conditional>
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='lastName'
              >
                Last Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='lastName'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type='text'
                placeholder='Enter your last name'
              />
              <Conditional showIf={errors.invalidLastName}>
                <p className='text-red-500 text-xs italic'>
                  Please tells us your name.
                </p>
              </Conditional>
            </div>
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
            <div className='mb-2'>
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
                placeholder='Choose a password'
              />
              <Conditional showIf={errors.invalidPassword}>
                <p className='text-red-500 text-xs italic'>
                  Please provide a valid password (8 characters minimum)
                </p>
              </Conditional>
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='passwordConfirmation'
              >
                Confirm your password
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='passwordConfirmation'
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                }}
                type='password'
                placeholder='Passwords must match'
              />
              <Conditional showIf={errors.invalidPasswordConfirmation}>
                <p className='text-red-500 text-xs italic'>
                  Passwords don&apos;t match
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
              <Button type='submit'>Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
