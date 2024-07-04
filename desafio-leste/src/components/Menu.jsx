import Link from 'next/link';

const Menu = () => {
  return (
    <nav className='flex gap-4'>
      <ul className='flex gap-10'>
        <li>
          <Link
            href='/contatos'
            className='text-2xl text-gray-800 hover:text-font-first transition duration-300 ease-in-out'
          >
            Contatos
          </Link>
        </li>
        <li>
          <Link
            href='/dashboard'
            className='text-2xl text-gray-800 hover:text-font-first
             transition duration-300 ease-in-out'
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
