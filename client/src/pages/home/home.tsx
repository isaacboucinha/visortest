import Image from 'next/image';

export default function Home(): JSX.Element {
  return (
    <main
      className={'flex min-h-screen flex-col items-center justify-between p-24'}
    >
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none'>
          <a
            className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
            href='https://www.visor.ai/'
            target='_blank'
            rel='noopener noreferrer'
          >
            By{' '}
            <Image
              src='/visor.ai.svg'
              alt='Visual Logo'
              className='dark:invert'
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className='bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl'>
        <div>
          <span className='inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg'></span>
        </div>
        <h3 className='color-lighter dark:text-white mt-5 text-base font-medium tracking-tight'>
          Writes Upside-Down
        </h3>
        <p className='text-slate-500 dark:text-slate-400 mt-2 text-sm'>
          The Zero Gravity Pen can be used to write in any orientation,
          including upside-down. It even works in outer space.
        </p>
        <button className='--secondary-background-color hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
          Button
        </button>
      </div>

      <div className='z-10 fixed flex justify-center lg:static lg:h-auto lg:w-auto lg:bg-none'>
        <a
          className='pointer-events-none flex place-items-center gap-2 p-30 lg:pointer-events-auto lg:p-0'
          href='https://www.visor.ai/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            src='/visor.ai.svg'
            alt='Visual Logo'
            className='dark:invert'
            width={100}
            height={24}
            priority
          />
        </a>
      </div>

      <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'>
        <a
          href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className={'mb-3 text-2xl font-semibold'}>
            Docs{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={'m-0 max-w-[30ch] text-sm opacity-50'}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className={'mb-3 text-2xl font-semibold'}>
            Learn{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={'m-0 max-w-[30ch] text-sm opacity-50'}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className={'mb-3 text-2xl font-semibold'}>
            Templates{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={'m-0 max-w-[30ch] text-sm opacity-50'}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className={'mb-3 text-2xl font-semibold'}>
            Deploy{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={'m-0 max-w-[30ch] text-sm opacity-50'}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
