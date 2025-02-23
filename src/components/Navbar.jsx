import React from 'react'
const Navbar = () => {
  return (
    <>
    <div className="flex justify-between  bg-slate-600 px-10 ">
    <div className='font-bold duration-50 text-center text-2xl'>
        <span>&lt;Taala</span>
        <span className='text-green-600'>Key</span>
        <span>/&gt;</span>
    </div>
    <nav className='place-content-center'>
      <ul className='flex gap-5 font-bold'>
        <li className='hover:text-slate-200 duration-200'>Home</li>
        <li className='hover:text-slate-200 duration-200'>Contact</li>
        <li className='hover:text-slate-200 duration-200'>About</li>
      </ul>
    </nav>
    </div>
    </>
  )
}

export default Navbar
