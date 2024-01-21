"use client"

import Link from 'next-intl/link';
import { FC } from 'react'
import { BsTelephoneFill } from "react-icons/bs"
import { LuShoppingCart } from "react-icons/lu";

import "./style.css"
import {useTranslations} from "use-intl";
import { trpc } from '@/app/_trpc/client';
import { useLocale } from 'next-intl';
import { languageInputValues } from '@/types/types';
import useSetLocale from '@/hooks/useLocale';
interface FooterProps {
  
}

const Footer: FC<FooterProps> = ({}) => {
    const locale = useLocale() as languageInputValues
    const t = useTranslations("footer"), general = useTranslations()
    const setLocale = useSetLocale()
  return (
    <footer className=' bg-customPrimary py-9 mt-[20px] md:mt-[40px]'>
        <div className='container text-white flex flex-col gap-y-4'>
            {/* <div className='md:max-w-[45%] text-xs md:text-sm'>
                {
                    t("description")
                }
            </div> */}

            <div className='grid grid-cols-1 md:grid-cols-4 gap-y-4'>
                <Menu />
                <Catalog locale={locale}/>
                <Contacts />
                <Work />
            </div>

            <div className='border-white border-b-[1.5px] pb-2 md:-mt-4'>
                <div className="justify-self-end flex items-center gap-x-3">
                    <div
                        className={`flex items-center font-dela gap-x-2 text-sm md:text-base text-white uppercase`}>
                        <button
                            className={locale === 'ru' ? 'underline decoration-2 underline-offset-4 ' : ''}
                            onClick={() => setLocale('ru')}
                        >RU
                        </button>
                        <div className='w-[2px] h-[16px] rounded-sm bg-white'></div>
                        <button
                            className={locale === 'uz' ? 'underline decoration-2 underline-offset-4' : ''}
                            onClick={() => setLocale('uz')}
                        >UZ
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <Link href="/info/privacyPolicy" className='text-xs md:text-sm'>
                    {
                        general("privacy")
                    }
                </Link>
            </div>
        </div>
    </footer>
  )
}

const Menu = () => {
    const t = useTranslations("footer")
    const items = useTranslations("header")
    return (
        <div className='flex flex-col gap-y-2'>
            <h3 className='font-dela text-sm md:text-base'>{t("menu")}</h3>
            <ul className='flex flex-col gap-y-1 uppercase text-xs md:text-sm'>
                <Link href="/catalog" className='footer-animated-item'>
                    {items("catalog")}
                </Link>
                <Link href="/info/exchange" className='footer-animated-item'>
                    {items("exchange")}
                </Link>
                <Link href="/info/delivery" className='footer-animated-item'>
                    {items("delivery")}
                </Link>
                <Link href="/info/contactUs" className='footer-animated-item'>
                    {items("contact")}
                </Link>
            </ul>
        </div>
    )
}

const Catalog = ({ locale }:{ locale: languageInputValues}) => {
    const t = useTranslations("footer")
    // const categories = {
    //     ukhod_za_avto: "cllw58qx40000e9t39c0r5nwl",
    //     derzhately_dlia_telefona: "cllz9nqj40000mm08ns4pcnld",
    //     orhanaizerы_y_sumky: "cllqmfzlf000ie961lxkm7xch",
    //     tiunynh_y_vnutrennyi_dekor: "clmozu4u10003jq0875t1xf0s",
    //     avtokhymyia: "cllumafeq0013e99mueaq2erf",
    //     chekhlы_nakydky_y_podushky: "clmozsgig0000jq08zicjouo1"
    // };
    // const idArray: string[] = Object.values(categories)
    const footerCategory = trpc.category.getCategories.useQuery(locale);
    return (
        <div className='flex flex-col gap-y-2'>
            <h3 className='font-dela text-sm md:text-base'>{t("catalog")}</h3>
            <ul className='flex flex-col gap-y-1 uppercase text-xs md:text-sm'>
                {
                    footerCategory?.data?.map(item => (
                        <Link href={`/category/${item.id}`} className='footer-animated-item'>
                            { item.title }
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

const Contacts = () => {
    const t = useTranslations("footer")
    return (
        <div className='flex flex-col gap-y-2'>
            <h3 className='font-dela text-sm md:text-base'>{t("contacts")}</h3>
            <ul className='flex flex-col gap-y-1 uppercase text-xs md:text-sm'>
                <li className='pb-2'>team@carspace.uz</li>
                <div className='footer-animated-item flex gap-x-2 items-center'>
                    <BsTelephoneFill className="text-white" />
                    +998 (95) 822-82-88
                </div>
                <div className='footer-animated-item flex gap-x-2 items-center'>
                    <BsTelephoneFill className="text-white" />
                    +998 (97) 178-77-90
                </div>
            </ul>
        </div>
    )
}

const Work = () => {
    const t = useTranslations("footer")
    return (
        <div className='flex flex-col gap-y-2'>
            <h3 className='font-dela text-sm md:text-base'>{t("work")}</h3>
            <ul className='flex flex-col gap-y-2 uppercase text-xs md:text-sm'>
                <li className='footer-animated-item flex flex-col'>
                    <span>Работаем без выходных</span>
                    <span>09:00 - 22:00</span>
                </li>
            </ul>
        </div>
    )
}
export default Footer