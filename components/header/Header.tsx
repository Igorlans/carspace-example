"use client"

import {FC} from 'react'
import {useState, useEffect} from 'react'
import ClientProvider from '@/providers/client-provider'
import Image from 'next/image'
import Link from 'next-intl/link'
import Sidebar from './Sidebar'
import CategoryBtn from './buttons/CategoryBtn'
import SearchPannel from '../searchPannel/SearchPannel'
import Burger from '../ui/custom/Burger'
import {trpc} from "@/app/_trpc/client";
import {useTranslations} from "use-intl";
import CartButton from './buttons/CartButton'
import useSetLocale from "@/hooks/useLocale";
import {useLocale} from "next-intl";
import SearchPannelMobile from "@/components/searchPannel/SearchPannelMobile";

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false) // Is sidebar open
    const t = useTranslations("header");
    const setLocale = useSetLocale()
    const locale = useLocale()
    const categories = trpc.category.getCategories.useQuery(locale as 'ru' | 'uz');

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (isOpen) document.body.classList.add("noScroll")
        else document.body.classList.remove("noScroll")
    }, [isOpen])

    const handleResize = () => {
        if (window.innerWidth > 768) setIsOpen(false)
    }


    return (
        <header className='py-6'>
            <Sidebar isOpen={isOpen} onClick={() => setIsOpen(false)}/>
            <div className='container'>
                <div
                    className='bg-white border-b-[1px] border-lightGray pb-[15px] grid grid-cols-[0.3fr_1fr_6fr] md:grid-cols-[1fr_6fr] gap-x-4'
                    style={{zIndex: "100"}}
                >
                    <div className='flex justify-center items-center md:hidden'>
                        <Burger
                            onClick={() => setIsOpen((state) => !state)}
                            isOpen={isOpen}
                        />
                    </div>
                    <Link href="/" className='relative w-full h-full min-w-[94px] flex flex-col items-center justify-center'>
                        <img
                            src="/logo.svg"
                            // fill={true}
                            className='md:max-h-[35px] pb-1'
                            style={{objectFit: "cover"}}
                            // className='w-fit'
                            title="logo"
                            alt="logo"
                        />
                    </Link>
                    <ul className='justify-self-end hidden md:flex gap-x-[20px] font-dela text-sm md:text-base text-customPrimary uppercase'>
                        <Link href="/catalog" className='text-underline'>
                            {t('catalog')}
                        </Link>
                        <Link href="/info/exchange" className='text-underline'>
                            {t('exchange')}
                        </Link>
                        <Link href="/info/delivery" className='text-underline'>
                            {t("delivery")}
                        </Link>
                        <Link href="/info/contactUs" className='text-underline'>
                            {t("contact")}
                        </Link>
                    </ul>

                    <ul className='justify-self-end flex items-center md:hidden gap-x-[20px] text-2xl text-customPrimary uppercase'>
                        <SearchPannelMobile/>
                        <CartButton/>
                        {/* <Link className={'w-[24px] h-[24px]'} href="/order">
                            <LuShoppingCart className={'w-[24px] h-[24px]'}/>
                        </Link> */}
                    </ul>
                </div>
                <div className='bg-white pt-[20px] hidden md:grid gap-x-4 grid-cols-[1fr_3fr_0.7fr] items-center'>
                    <ClientProvider>
                        <CategoryBtn categories={categories.data}/>

                        <SearchPannel/>

                        <div className='justify-self-end flex items-center gap-x-3'>
                            <div
                                className={`flex items-center font-dela gap-x-2 text-sm md:text-base text-customPrimary uppercase`}>
                                <button
                                    className={locale === 'ru' ? 'underline decoration-2 underline-offset-4' : ''}
                                    onClick={() => setLocale('ru')}
                                >RU
                                </button>
                                <div className='w-[2px] h-[16px] rounded-sm bg-customPrimary'></div>
                                <button
                                    className={locale === 'uz' ? 'underline decoration-2 underline-offset-4' : ''}
                                    onClick={() => setLocale('uz')}
                                >UZ
                                </button>
                            </div>
                            <CartButton/>
                        </div>
                    </ClientProvider>
                </div>
            </div>


        </header>
    )
}

export default Header