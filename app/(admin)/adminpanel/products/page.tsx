import Breadcrumbs from "@/app/(admin)/adminpanel/components/Breadcrumbs";
import PageTitle from "@/app/(admin)/adminpanel/components/PageTitle";
import {LuList} from "react-icons/lu";
import ProductTable from "@/app/(admin)/adminpanel/products/_components/ProductTable";
import {serverClient} from "@/app/_trpc/serverClient";
import Link from "next/link";
import IconButton from "@/app/(admin)/adminpanel/components/IconButton";
import {AiOutlinePlus} from "react-icons/ai";

const breadCrumbs = [
    {text: 'Главная', href: '/adminpanel'},
    {text: 'Товары', href: '/adminpanel/products'},
]

const Page = async () => {

    const products = await serverClient.product.getAllProducts({
        language: 'ru'
    })

    return (
        <>
            <Breadcrumbs links={breadCrumbs} />

            <PageTitle
                title={'Товары'}
                description={'Список всех товаров'}
                icon={<LuList className={'text-3xl'}/>}
            >
                <Link href={"/adminpanel/products/create/ru"}>
                    <IconButton
                        icon={<AiOutlinePlus className={'text-base'} />}
                    >
                        Добавить
                    </IconButton>
                </Link>
            </PageTitle>
            <ProductTable products={products} />

        </>
    );
};

export default Page;