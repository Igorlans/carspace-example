'use client'
import { FC } from 'react'
import Image from 'next/image';

import "./style.css"
import { Button } from '@/components/ui/button';
import {useTranslations} from "use-intl";
import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  img: string;
  categoryId: string;
  area: "lefttopleft" | "lefttopright" | "righttop" | "leftbottom" | "rightbottomleft" | "rightbottomright";
}

const CategoryCard: FC<CategoryCardProps> = ({ title, img, area, categoryId }) => {
    const t = useTranslations( "buttons")
  return (
        <div
            style={{gridArea: area}}
        >
            <div className='gradient-overlay relative rounded-[10px] overflow-hidden w-full h-full min-h-[200px]'>

                <Image 
                    src={img}
                    fill={true}
                    style={{objectFit: 'cover'}}
                    className='transition-transform duration-300'
                    alt='product'
                />
                
                <div className="z-50 w-full px-11 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className='carcard-content flex flex-col items-center gap-y-2'>
                        <p className='font-dela text-base md:text-xl text-white'>
                            { title }
                        </p>
                        <Link href={`/category/${categoryId}` ?? "#"} className='w-full max-w-[200px]'>
                            <Button
                                variant="primary"
                                className='w-full text-xs md:text-base h-8 md:h-10 bg-white text-primary hover:bg-white'
                                size="full"
                            >{t("showProducts")}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CategoryCard