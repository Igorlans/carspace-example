import SectionTitle from '@/components/sectionTitle/SectionTitle'
import MainCardSlider from './(mainSlider)/MainCardSlider'
import {serverClient} from '@/app/_trpc/serverClient';
import UseTranslation from "@/helplers/UseTranslation";
import {languageInputValues} from "@/types/types";


const New = async ({locale}: { locale: languageInputValues }) => {

    const bestsellers = await serverClient.product.getProductByType({
        type: "onFresh",
        language: locale
    })

    return (
        <section className='relative md:container'>
            <SectionTitle className='text-center'><UseTranslation translate={'news'}/></SectionTitle>
            <MainCardSlider
                slides={bestsellers}
                swiperId={"swiper-new"}
            />
        </section>
    )
}

export default New
