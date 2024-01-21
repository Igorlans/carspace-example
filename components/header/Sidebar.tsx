import { FC } from 'react'

import Image from 'next/image';
import Link from 'next-intl/link';
import {
  LuX, 
  LuLayoutGrid,
  LuInfo
} from 'react-icons/lu';
import "./style.css"
import useSetLocale from "@/hooks/useLocale";
import { trpc } from '@/app/_trpc/client';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { languageInputValues } from '@/types/types';
import { usePathname } from 'next-intl/client';
import { cn } from '@/lib/utils';
interface SidebarProps {
  onClick: () => void;
  isOpen: boolean
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClick }) => {
  const pathname = usePathname()
  const activeCategoryId = pathname.split("/")[2];
  const setLocale = useSetLocale()
  const items = useTranslations("header")
  const locale = useLocale() as languageInputValues
  const categories = trpc.category.getCategories.useQuery(locale);
  return (
    <div className={`container flex flex-col gap-y-6 pb-[120px] font-light text-lg sidebar ${isOpen && 'sidebar--open onScroll'}`}>
      <div className='grid grid-cols-[1fr_1fr] items-center pt-9 border-b-[1px] border-lightGray pb-[15px]'
        style={{zIndex: "100"}}
      >
          <Link href="/"
            onClick={onClick}
            className='relative w-full h-full max-w-[100px] min-w-[54px]'
          >
                <Image 
                    src="/logo.svg"
                    fill
                    title="logo"
                    alt="logo"
                />
          </Link>
          <div className='justify-self-end' onClick={onClick}> 
            <LuX className="text-3xl text-lightGray" />
          </div>
      </div>

      {
        categories.data &&
          <div className='flex flex-col gap-y-4 border-b-[1px] border-lightGray pb-[15px]'>
            <div className='px-2 flex text-xl items-center gap-x-4 fornt-norms font-bold text-customPrimary'>
                <LuLayoutGrid className="text-2xl "/>
                Категории
            </div>
            <ul className='flex flex-col gap-y-1 category-scroll'>
              {
                categories?.data.map(item => (
                  <Link href={`/category/${item.id}`} onClick={onClick} key={item.id} className={cn('flex items-center px-2 py-1 rounded-[4px]', activeCategoryId === item.id && "bg-customPrimary text-white")}>
                      {item.title}
                  </Link>
                ))
              }
            </ul>
          </div>
      }

      <div className='px-2 flex text-xl items-center gap-x-4 fornt-norms font-bold text-customPrimary'
        onClick={onClick}
      >
            <LuInfo className="text-2xl "/>
            Информация
      </div>

      <ul className='px-2 flex flex-col gap-y-1'>
        <Link href="/catalog" onClick={onClick}>{items("catalog")}</Link>
        <Link href="/info/exchange" onClick={onClick}>{items("exchange")}</Link>
        <Link href="/info/delivery" onClick={onClick}>{items("delivery")}</Link>
        <Link href="/info/contactUs" onClick={onClick}>{items("contact")}</Link>
      </ul>

      
      <div
          className={`px-2 flex items-center font-dela gap-x-2 text-sm md:text-base text-customPrimary uppercase`}>
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

    </div>
  )
}

export default Sidebar