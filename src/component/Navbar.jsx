import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="bg-[#0d223e] py-3 flex justify-between text-white">
        <div className="logo">
            <span className="font-bold text-xl mx-9 cursor-pointer">iTask</span>
        </div>
        <ul className="flex gap-8  mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>About</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
