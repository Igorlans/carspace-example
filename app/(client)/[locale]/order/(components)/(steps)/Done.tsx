'use client'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import type { OrderValues } from '@/types/order'

import Link from 'next-intl/link'

import { useTranslations } from 'next-intl'

interface DoneProps {
  form: UseFormReturn<OrderValues>
}

const Done: FC<DoneProps> = ({}) => {
  const t = useTranslations("oderDone")
  return (
    <div className='w-full h-full sectionGap'>
      <div className='flex flex-col items-center text-center gap-y-4'>
          <svg xmlns="http://www.w3.org/2000/svg" width="71" height="70" viewBox="0 0 71 70" fill="none">
            <path d="M64.6673 32.3167V35C64.6637 41.2896 62.6271 47.4095 58.8612 52.447C55.0953 57.4845 49.8019 61.1697 43.7704 62.9531C37.739 64.7364 31.2927 64.5222 25.3929 62.3426C19.4931 60.1629 14.4559 56.1345 11.0326 50.8581C7.60934 45.5818 5.98338 39.3402 6.39721 33.0643C6.81104 26.7883 9.2425 20.8143 13.329 16.0331C17.4154 11.252 22.9379 7.91988 29.0729 6.53377C35.2078 5.14766 41.6264 5.78183 47.3715 8.34168" stroke="#007745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M64.6667 11.6667L35.5 40.8625L26.75 32.1125" stroke="#007745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h1 className='font-dela text-xl md:text-3xl uppercase'>{t("thanks")}!</h1>
          <h3 className='font-norms font-bold md:text-lg'>{t("contact")}</h3>
          <Link href="/" className='font-norms text-sm md:text-base text-underline'>{t("toHome")}</Link>
      </div>
    </div>
  )
}

export default Done