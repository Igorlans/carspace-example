import { FC } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs';
import CategoryForm from '../CategoryForm';

interface pageProps {
  
}


const breadCrumbs = [
    {text: 'Главная', href: '/adminpanel'},
    {text: 'Категории', href: '/adminpanel/category'},
    {text: 'Создание', href: '/adminpanel/category/create'}
]

const page: FC<pageProps> = async ({}) => {
    return (
      <div>
          <Breadcrumbs links={breadCrumbs} />

          <CategoryForm />
      </div>
    )
}

export default page