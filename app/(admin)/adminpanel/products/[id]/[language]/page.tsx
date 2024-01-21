import ProductForm from "@/app/(admin)/adminpanel/products/_components/ProductForm";
import {$Enums} from "@prisma/client";
import {serverClient} from "@/app/_trpc/serverClient";
import Breadcrumbs from "@/app/(admin)/adminpanel/components/Breadcrumbs";


const Page = async ({params}: { params: { language: $Enums.Language, id: string } }) => {
    const product = await serverClient.product.getOneProduct({id: params.id, language: params.language})
    const categories = await serverClient.category.getCategories(params.language)

    const breadCrumbs = [
        {text: 'Главная', href: '/adminpanel'},
        {text: 'Товары', href: '/adminpanel/products'},
        {text: product.variants[0].title || 'Редактирование товара', href: undefined},
    ]

    return (
        <>
            <Breadcrumbs links={breadCrumbs}/>

            <ProductForm
                //@ts-ignore
                product={product}
                language={params.language}
                categories={categories}
            />
        </>
    )

};

export default Page;