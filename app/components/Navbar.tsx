'use client';

import { Link, Surface } from '@heroui/react';

export default function NavbarComponent() {
  return (
    <Surface className='flex justify-between py-4 px-5 sm:py-5 sm:px-10 fixed top-0 left-0 right-0 z-50'>
      <Link href='/' className='no-underline font-bold text-xl'>
        badru.dev
      </Link>
      {/* <div className='flex gap-4 justify-center items-center'>
        <Link className='no-underline hover:underline' href='/projects'>
          Maybe the Chatbot would be here
        </Link>
      </div> */}
    </Surface>
  );
}
