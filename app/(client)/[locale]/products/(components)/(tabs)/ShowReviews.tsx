'use client'
import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl';
import { TbChevronsRight } from "react-icons/tb";


interface ShowReviewsProps {
  onClick: () => void;
}

const ShowReviews: FC<ShowReviewsProps> = ({onClick}) => {

  const t = useTranslations("buttons")

  return (
      <div className='flex flex-col gap-y-4'>
          <div className='rounded-[4px]'>
            <div className="uppercase font-bold text-[18px] text-customPrimary hover:opacity-80 duration-300 cursor-pointer" onClick={onClick}>
              {t("showReviews")} <TbChevronsRight className="text-[24px] inline relative bottom-[2px]" />

            </div>
            {/*<Button
              variant="customOutline"
              className='rounded-[4px] h-[50px] text-[18px] text-customPrimary'
              size="full"
              onClick={onClick}
            >{t("showReviews")}</Button>*/}
          </div>
      </div>
  )
}

export default ShowReviews
