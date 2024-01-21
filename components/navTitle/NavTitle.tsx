'use client'
import {FC} from 'react'
import "./style.css"
import {useRouter, usePathname} from "next-intl/client";


interface NavTitleProps {
    link: string;
    children: React.ReactNode
}

const NavTitle: FC<NavTitleProps> = ({children, link}) => {
    const router = useRouter()
    const pathname = usePathname()

    const handleBack = () => {
        const t = pathname.split("/")[1]
        router.back()
        router.back()
    }

    return (
        <div
            onClick={handleBack}
            className='md:mt-[40px]'
        >
            <h2 className='nav-title font-dela text-lg md:text-xl flex items-center gap-x-4 text-lightGray cursor-pointer uppercase w-full mb-4 md:mb-5'>
                <svg className='w-[10px] md:w-[13px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 34"
                     fill="none">
                    <path d="M16.5 32L1.5 17L16.5 2" stroke="#2C334A" stroke-width="4" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
                <div className="nav-text-underline">
                    {children}
                </div>
            </h2>
        </div>
    )
}

export default NavTitle