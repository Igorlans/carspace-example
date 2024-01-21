import { FC } from 'react'
import Banner from './(components)/Banner'
import { languageInputValues } from '@/types/types'
import {FullCategory} from "@/types/category";

interface categoryLayotProps {
  locale: languageInputValues
  category: FullCategory;
  children: React.ReactNode
}

const CategoryLayot: FC<categoryLayotProps> = async ({ children, locale, category }) => {
  return (
    <div className='overflow-hidden'>
      <Banner
        img={category?.Banner ?? "/images/banner.jpg"}
        title={`${category?.title}`}
      />
      { children }
    </div>
  )
}

export default CategoryLayot