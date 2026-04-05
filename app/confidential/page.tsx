import Link from 'next/link';

export const metadata = {
  title: 'Confidential Project | badrudev',
  description: 'This project is under NDA and cannot be shared publicly.',
};

export default function ConfidentialPage() {
  return (
    <main className='min-h-screen w-full flex flex-col items-center justify-center px-6 text-center gap-6'>
      <div className='flex flex-col items-center gap-4 max-w-md'>
        <span className='text-5xl'>🔒</span>
        <h1 className='text-3xl font-bold tracking-tighter uppercase font-lexend'>
          Confidential Project
        </h1>
        <p className='text-muted leading-relaxed'>
          This project is protected under a non-disclosure agreement. I&apos;m
          unable to share the source code or live demo publicly, but feel free
          to reach out if you&apos;d like to discuss it further.
        </p>
        <Link
          href='/'
          className='mt-4 px-6 py-3 rounded-full border border-current text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300'
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
