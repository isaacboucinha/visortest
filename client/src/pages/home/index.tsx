import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/button/button.component';

export default function Home(): JSX.Element {
  return (
    <main
      className={
        'flex min-h-screen flex-col items-center justify-center p-12 py-24'
      }
    >
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm p-16 px-6'>
        <h1 className='text-xl text-center'>
          Welcome to VisualBot, a chat bot integration with ChatGPT-3
        </h1>
        <div className='flex h-28 w-full justify-center'>
          <a
            className='pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto lg:p-0'
            href='https://www.visor.ai/'
            target='_blank'
            rel='noopener noreferrer'
          >
            By{' '}
            <Image
              src='/visor.ai.svg'
              alt='Visual.ai Logo'
              className='dark:invert'
              width={200}
              height={46}
              priority
            />
          </a>
        </div>
      </div>

      <div className='bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl'>
        <h2 className='text-center color-lighter dark:text-white mt-5 text-base font-semibold tracking-tight'>
          To get started, login to your account. If you don&apos;t have one,
          sign up before that.
        </h2>
        <p className='text-center text-base font-medium tracking-tight'>
          By creating an account, you will be able to keep track of your
          previous conversations.
        </p>
        <div className='flex justify-center'>
          <Link className='px-6 py-8' href='/login' passHref>
            <Button>Login</Button>
          </Link>
          <Link className='px-6 py-8' href='/signup' passHref>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
