import { FC } from 'react'
import CategoryBanner from '../(categoryBanner)/CategoryBanner'
import CategoryCard from './CategoryCard'
import SectionTitle from '@/components/sectionTitle/SectionTitle'
import "./style.css"
import { serverClient } from '@/app/_trpc/serverClient'
import { languageInputValues } from '@/types/types'
import UseTranslation from "@/helplers/UseTranslation";

interface CategoryProps {
  locale: languageInputValues;
}

const Category: FC<CategoryProps> = async ({ locale }) => {
  const category = await serverClient.category.getCategories(locale)
  const categories = {
      ukhod_za_avto: "cllw58qx40000e9t39c0r5nwl",
      derzhately_dlia_telefona: "cllz9nqj40000mm08ns4pcnld",
      orhanaizerы_y_sumky: "cllqmfzlf000ie961lxkm7xch",
      tiunynh_y_vnutrennyi_dekor: "clmozu4u10003jq0875t1xf0s",
      avtokhymyia: "cllumafeq0013e99mueaq2erf",
      chekhlы_nakydky_y_podushky: "clmozsgig0000jq08zicjouo1"
  };
  return (
    <section className='flex flex-col gap-y-0 md:gap-y-11'>
        <CategoryBanner 
            title={<UseTranslation translate={'productsCategory'} />}
            float="bottom"
        />
        <SectionTitle align="left" className='text-center md:text-left block md:hidden'><UseTranslation translate={'productsCategory'} /></SectionTitle>
        <div className='category-grid container'>
            <CategoryCard
              title={category.find(item => item.id === categories.ukhod_za_avto)?.title ?? "Тюнинг и внутренний декор"}
              categoryId={category.find(item => item.id === categories.ukhod_za_avto)?.id ?? "clmozu4u10003jq0875t1xf0s"}
              img={category.find(item => item.id === categories.ukhod_za_avto)?.Banner ?? "/images/category/tiunynh_y_vnutrennyi_dekor.jpeg"}
              area='lefttopleft'
            />
            <CategoryCard
              title={category.find(item => item.id === categories.avtokhymyia)?.title ?? "Автохимия"}
              categoryId={category.find(item => item.id === categories.avtokhymyia)?.id ?? "cllumafeq0013e99mueaq2erf"}
              img={category.find(item => item.id === categories.avtokhymyia)?.Banner ?? "/images/category/avtokhymyia.jpg"}
              area="lefttopright"
            />
            <CategoryCard
              title={category.find(item => item.id === categories.chekhlы_nakydky_y_podushky)?.title ?? "Чехлы, накидки и подушки"}
              categoryId={category.find(item => item.id === categories.chekhlы_nakydky_y_podushky)?.id ?? "clmozsgig0000jq08zicjouo1"}
              img={category.find(item => item.id === categories.chekhlы_nakydky_y_podushky)?.Banner ?? "/images/category/chekhlы_nakydky_y_podushky.jpg"}
              area="leftbottom"
            />
            <CategoryCard
              title={category.find(item => item.id === categories.derzhately_dlia_telefona)?.title ?? "Держатели для телефона"}
              categoryId={category.find(item => item.id === categories.derzhately_dlia_telefona)?.id ?? "cllz9nqj40000mm08ns4pcnld"}
              img={category.find(item => item.id === categories.derzhately_dlia_telefona)?.Banner ?? "/images/category/derzhately_dlia_telefona.jpg"}
              area="righttop"
            />
            <CategoryCard
              title={category.find(item => item.id === categories.tiunynh_y_vnutrennyi_dekor)?.title ?? "Уход за авто"}
              categoryId={category.find(item => item.id === categories.tiunynh_y_vnutrennyi_dekor)?.id ?? "clmozu4u10003jq0875t1xf0s"}
              img={category.find(item => item.id === categories.tiunynh_y_vnutrennyi_dekor)?.Banner ?? "/images/category/ukhod_za_avto.jpg"}
              area="rightbottomleft"
            />
            <CategoryCard
              title={category.find(item => item.id === categories.orhanaizerы_y_sumky)?.title ?? "Органайзеры и сумки"}
              categoryId={category.find(item => item.id === categories.orhanaizerы_y_sumky)?.id ?? "cllqmfzlf000ie961lxkm7xch"}
              img={category.find(item => item.id === categories.orhanaizerы_y_sumky)?.Banner ?? "/images/category/orhanaizerы_y_sumky.jpg"}
              area="rightbottomright"
            />
        </div>
    </section>
  )
}

export default Category