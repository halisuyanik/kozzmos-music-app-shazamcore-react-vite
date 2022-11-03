import {useState} from 'react';




import {links} from '../assets/constants';
import {RiCloseLine} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
const NavLinks=()=>(

    <div className='mt-10'>
    {links.map((item)=>(
      <NavLink  className='flex flex-row justify-start items-center my-8 text-sm font-medium
      text-slate-700 hover:text-white' key={item.name} to={item.to}
      onClick={()=>handleClick && handleClick()}>
        <item.icon className='w-6 h-6 mr-2'></item.icon>
       {item.name}
     </NavLink>
    ))}
  </div>
  
)
const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen]=useState(false);
  return(<>
   <div className='md:flex hidden flex-col w-[240px] py-10 px-4  bg-green'>
   <p className='text-white px-4 text-3xl'>KOZZMOS</p>
    <NavLinks></NavLinks>
   </div>

   <div className='absolute md:hidden block top-6 right-3'>
    {mobileMenuOpen?(
    <RiCloseLine onClick={()=>setMobileMenuOpen(false)} className='w-6 h-6 text-white mr-2'></RiCloseLine>
    ):<HiOutlineMenu onClick={()=>setMobileMenuOpen(true)} className='w-6 h-6 text-white mr-2'></HiOutlineMenu>}
   </div>

   <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl
    from-white/10 to-[#064e3b] backdrop-blur-lg z-10 p6 md:hidden 
    smooth-transition ${mobileMenuOpen?'left-0':'-left-full'}`}>
    <p className='text-white px-4 text-3xl'>KOZZMOS</p>
    <NavLinks handleClick={()=>setMobileMenuOpen(false)}></NavLinks>
   </div>
   </>)
};

export default Sidebar;
