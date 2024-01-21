"use client"

import { FC } from 'react'
import { useState, useRef } from 'react';

import Description from "./Description"
import Features from './Features';
import Reviews from './Reviews';
import Questions from './Questions';

import {
    FullProduct,
    FullReview
} from '@/types/product';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface TabsProps {
  product: FullProduct
  reviews: FullReview
}

enum TabIndex {
    description = "description",
    feature = "feature",
    reviews = "reviews",
    question = "question",
}
type activeTab = keyof typeof TabIndex;
interface TabsData {
    id: activeTab;
    title: string;
}

const Tabs: FC<TabsProps> = ({ product, reviews }) => {
    const [activeTab, setActiveTab] = useState<activeTab>(TabIndex.description)
    const tabsRef = useRef<any>(null)
    const t = useTranslations("product")
    const tabs: TabsData[] = [
        {id: TabIndex.description, title: t("description")},
        {id: TabIndex.feature, title: t("features")},
        {id: TabIndex.reviews, title: t("reviews")},
        {id: TabIndex.question, title: t("questions")},
    ]

    function setReviewsTabActive(){
      setActiveTab(TabIndex.reviews)
      setTimeout(() => {
        if(tabsRef.current && typeof tabsRef.current === 'object'){
          tabsRef['current'].scrollIntoView({
            behavior: 'smooth'
          })
        }
      }, 1500);
    }

    function renderTabs (activeTab: activeTab): React.ReactNode {
        switch (activeTab) {
            case TabIndex.description:
                return <Description landing={product.landing} product={product} setReviewsTabActive={setReviewsTabActive}/>
            case TabIndex.feature:
                return <Features specs={product.specs}/>
            case TabIndex.reviews:
                return <Reviews product={product} reviews={reviews} />
            case TabIndex.question:
                return <Questions questions={product.questions}/>
            default:
                return <Description landing={product.landing} product={product} setReviewsTabActive={setReviewsTabActive}/>
        }
    }


    const viewTab = renderTabs(activeTab)
    return (
      <div className='mt-[27px] md:mt-[94px] lg:mt-[94px]' ref={tabsRef}>
            <div className='hidden md:block pb-4'>
                <div className='md:container tabs'>
                    {
                        tabs.map((tab, index) => (
                                <button
                                  key={index}
                                  className={`text-underline whitespace-nowrap font-dela pb-1 text-[20px] md:text-[20px] uppercase ${activeTab === tab.id && "tab--active text-customPrimary"}`}
                                  onClick={() => setActiveTab(tab.id)}
                                >
                                      {tab.title}
                                </button>
                        ))
                    }
                </div>
            </div>

            <div className='container block md:hidden pb-[27px]'>
                <div className='flex flex-col py-4 pl-2 pr-4 items-start  gap-y-[10px] bg-lightBlue'>
                    {
                        tabs.map((tab, i) => (
                            <button
                                className={cn('flex items-center gap-x-[5px] h-[40px] text-[16px] font-bold w-full text-left text-customPrimary rounded-[4px] overflow-hidden bg-white shadow-sm', tab.id === activeTab && "shadow-md")}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <div className={cn('h-[40px] w-[4px] py-2', tab.id === activeTab && "bg-productTabsActive")}></div>
                                {tab.title}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className='container overflow-hidden'>
                { viewTab }
            </div>
      </div>
    )
}

export default Tabs
