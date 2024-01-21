"use client"
import {FC} from 'react'
import {useState} from 'react'
import Link from 'next-intl/link'
import Burger from '@/components/ui/custom/Burger'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {FullCategory} from "@/types/category";
import {useTranslations} from "use-intl";

interface CategoryBtnProps {
    categories: FullCategory[] | undefined
}

const CategoryBtn: FC<CategoryBtnProps> = ({categories}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const t = useTranslations("header")
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-fit'>
                <div className='bg-white select-none'>
                    <div
                        className='w-fit flex items-center gap-x-[10px] font-dela text-sm md:text-base text-customPrimary uppercase border-[1px] border-darkGray py-[10px] px-[20px] rounded-[10px]'>
                        <Burger isOpen={isOpen} onClick={() => {
                        }}/>
                        <span>{t('categories')}</span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-full min-w-[12.5rem]'>
                {
                    categories?.map(item => (
                        <Link key={item.id} href={`/category/${item.id}`}>
                            <DropdownMenuItem>{item?.title}</DropdownMenuItem>
                        </Link>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoryBtn