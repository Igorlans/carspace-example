import {FC, ReactNode} from 'react'
import Image from 'next/image';
import { cn } from '@/lib/utils';
interface CategoryBannerProps {
  title: string | ReactNode;
  float?: "center" | "bottom"
}

const CategoryBanner: FC<CategoryBannerProps> = ({ title, float = "center" }) => {
    const floatStyles = float === "center" ? "justify-center items-center" : "justify-end items-end"
    return (
        <div className={cn('relative w-[100%] h-[220px] py-8 md:py-11 px-8 md:px-16  flex-col hidden md:flex', floatStyles)}>
            <h1 className='font-dela uppercase text-center text-lg md:text-3xl text-white'>{title}</h1>
            <Image 
                src="/images/categoryBG.jpeg"
                fill={true}
                className='brightness-[70%]'
                style={{objectFit: 'cover', zIndex: "-5"}}
                alt='product'
            />
        </div>
      )
}

export default CategoryBanner