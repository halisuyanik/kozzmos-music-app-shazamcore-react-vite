import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FiSearch} from 'react-icons/fi';
const Searchbar = () => {
  const [searched, setSearched]=useState('');
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    navigate(`/search/${searched}`)

  }
  return(
    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 w-[280px] text-slate-500 focus-within:text-slate-700">
    <div className='flex flex-row justify-start items-center bg-white rounded-lg '>
      <FiSearch aria-hidden='true' className='w-5 h-5 ml-4'></FiSearch>
      <input className=' flex-1  border-none outline-none placeholder-gray-500 text-base p-2 text-black'
       type='search' name='search-field' value={searched} onChange={(e)=>setSearched(e.target.value)} autoComplete='off'
       id='search-field' placeholder='Ne dinlemek istiyorsun?'/>
    </div>
  </form>
  )
  
};

export default Searchbar;
