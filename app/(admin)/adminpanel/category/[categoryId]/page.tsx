import { FC } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs';
import CategoryForm from '../CategoryForm';
import {serverClient} from "@/app/_trpc/serverClient";

interface pageProps {
  params: {
    categoryId: string
  }
}


const breadCrumbs = [
    {text: 'Главная', href: '/adminpanel'},
    {text: 'Категории', href: '/adminpanel/category'},
    {text: 'Создание', href: '/adminpanel/category/create'}
]




const page: FC<pageProps> = async ({ params }) => {
    const category = await serverClient.category.getCategory({id: params.categoryId, language: 'ru'})
    return (
      <div>
          <Breadcrumbs links={breadCrumbs} />

          <CategoryForm category={category} />
      </div>
    )
}

export default page