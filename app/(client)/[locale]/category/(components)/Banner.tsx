import {FC, ReactNode} from 'react'
import Image from 'next/image'
interface BannerProps {
  title: string | ReactNode,
  img: string
}

const Banner: FC<BannerProps> = ({ title, img }) => {
  return (
    <div className='relative w-[100vw] h-[220px] flex flex-col justify-center items-center'>
        <h1 className='font-dela uppercase text-center text-2xl md:text-3xl text-white'>{title}</h1>
        <Image 
            src={img}
            fill={true}
            className='brightness-[80%]'
            style={{objectFit: 'cover', zIndex: "-5"}}
            alt='product'
        />
    </div>
  )
}

export default Banner