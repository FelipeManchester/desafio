import Link from 'next/link';
import React from 'react';

const Menu = () => {
  return (
    <nav>
      <ul className='flex gap-4'>
        <Link href={'/contatos'}>Contatos</Link>
        <Link href={'/dashboard'}>Dashboard</Link>
      </ul>
    </nav>
  );
};

export default Menu;
