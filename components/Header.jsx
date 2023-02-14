import Image from 'next/image'
import { CiSearch } from 'react-icons/ci'

export default function Header() {
  return (
    <div className='flex items-center justify-between max-w-6xl'>
        { /* Logo */ }

        <div className=''>
            <div className='cursor-pointer h-24 w-24 relative hidden lg:inline-grid'>
                <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
                layout='fill'
                className='object-contain'
                />
            </div>
            <div className='cursor-pointer h-24 w-10 relative lg:hidden'>
                <Image 
                src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
                layout='fill'
                className='object-contain'
                />
            </div>
        </div>


        { /* Search */ }

        <div className='relative'>
            <div className='absolute top-3 left-3'>
                <CiSearch />
            </div>
                <input className='bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md' type="text" placeholder='search'/>
         </div> 


        { /* Nav-items */ }
        <h1>Toyosi</h1>
    </div>
  )
}
