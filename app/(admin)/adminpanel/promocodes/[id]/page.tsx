import { FC } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs';
import PromocodeForm from '../PromocodeForm';
import {serverClient} from "@/app/_trpc/serverClient";
interface pageProps {
    params: {
        id: string
    }
}

const breadCrumbs = [
    {text: 'Главная', href: '/adminpanel'},
    {text: 'Промокоды', href: '/adminpanel/promocodes'},
    {text: 'Создание', href: '/adminpanel/promocodes/create'}
]

const page: FC<pageProps> = async ({ params }) => {
    const promocode = await serverClient.order.getPromocodeById({
        id: params.id
    })
    return (
      <div>
          <Breadcrumbs links={breadCrumbs} />

          <PromocodeForm promocode={promocode}/>
      </div>
    )
}

export default page