import {HiOutlineHome} from "react-icons/hi";
import Breadcrumbs from "@/app/(admin)/adminpanel/components/Breadcrumbs";
import PageTitle from "@/app/(admin)/adminpanel/components/PageTitle";
import BannerImage from "./components/BannerImage";
import {serverClient} from "@/app/_trpc/serverClient";


const Page = async () => {
    const breadCrumbs = [
        {text: 'Главная', href: '/adminpanel'},
    ]
    const images = await serverClient.banner.getBanner()
    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />

            <PageTitle
                title={'Главная'}
                description={'Редактирование главной страницы'}
                icon={<HiOutlineHome className={'text-3xl'}/>}
            />

            <BannerImage images={images}/>
        </div>
    );
};

export default Page;