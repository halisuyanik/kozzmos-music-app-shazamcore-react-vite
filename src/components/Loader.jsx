import {loader} from '../assets';



const Loader = ({title}) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img className='w-32 h32 object-contain' src={loader} alt="loader" ></img>
    <h1 className='font-bol text-2xl text-white mt-2'>{title || "Yükleniyor..."}</h1>
  </div>
);

export default Loader;
