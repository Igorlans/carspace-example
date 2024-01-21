import Banner from "./(components)/Banner"
import BestSellers from "./(components)/BestSellers"
import Featutes from "./(components)/(features)/Featutes"
import About from "./(components)/About"
import New from "./(components)/New"
import Benefits from "./(components)/Benefits"
import Category from "./(components)/(category)/Category"
import Reviews from "./(components)/Reviews"
import { serverClient } from '@/app/_trpc/serverClient'
import type { languageInputValues } from "@/types/types"


export const revalidate = 300

export default async function Home({params}: {params: {locale: languageInputValues}}) {
  const images = await serverClient.banner.getBanner()
  const moderatedReviews = await serverClient.review.getModeratedReviews()

  return (
    <div className='sectionGap'>
      <Banner images={images?.desktop} className="hidden md:block" height="h-[50vw]"/>
      <Banner images={images?.mobile} className="block md:hidden" height="h-[65vw]"/>
      <Featutes locale={params.locale}/>
      <BestSellers locale={params.locale} />
      <About locale={params.locale}/>
      <New locale={params.locale}/>
      <Benefits />
      <Category locale={params.locale}/>
      <Reviews locale={params.locale} reviews={moderatedReviews}/>
    </div>
  )
}
