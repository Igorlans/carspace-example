import ProductForm from "@/app/(admin)/adminpanel/products/_components/ProductForm";
import {$Enums} from "@prisma/client";
import Breadcrumbs from "@/app/(admin)/adminpanel/components/Breadcrumbs";
import {serverClient} from "@/app/_trpc/serverClient";

const breadCrumbs = [
    {text: 'Главная', href: '/adminpanel'},
    {text: 'Товары', href: '/adminpanel/products'},
    {text: 'Создание товара', href: ''},
]

const Page = async ({ params }: { params: { language: $Enums.Language } }) => {

    const categories = await serverClient.category.getCategories(params.language)

    return (
        <>
            <Breadcrumbs links={breadCrumbs} />
            <ProductForm language={params.language} categories={categories} />
        </>
    );
};

export default Page;