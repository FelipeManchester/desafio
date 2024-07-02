import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

const Header = () => {
  return (
    <Link
      href='/#'
      className='flex flex-col sm:flex-row w-full items-center sm:items-baseline justify-center'
    >
      <Logo className='w-56 flex-shrink-0 mb-6' />
      <h1 className='text-4xl text-font-first font-bold'>
        <span className='text-7xl'>C</span>ontact
      </h1>
    </Link>
  );
};

export default Header;
