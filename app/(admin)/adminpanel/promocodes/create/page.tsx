import { FC } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs';
import PromocodeForm from '../PromocodeForm';

interface pageProps {
  
}


const breadCrumbs = [
    {text: 'Главная', href: '/adminpanel'},
    {text: 'Промокоды', href: '/adminpanel/promocodes'},
    {text: 'Создание', href: '/adminpanel/promocodes/create'}
]

const page: FC<pageProps> = async ({}) => {
    return (
      <div>
          <Breadcrumbs links={breadCrumbs} />

          <PromocodeForm />
      </div>
    )
}

export default page