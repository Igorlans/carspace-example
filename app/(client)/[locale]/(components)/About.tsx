"use client"

import { FC } from 'react'
import { useState } from 'react'

import Image from 'next/image'
import SectionTitle from '@/components/sectionTitle/SectionTitle'
import { Button } from '@/components/ui/button'

import {useTranslations} from "use-intl";

interface AboutProps {
  locale: string;
}

const About: FC<AboutProps> = ({}) => {
    const t = useTranslations()
    const button = useTranslations("buttons")
    const [isReadMore, setIsReadMore] = useState(false);
    return (
      <section className='container'>
          <SectionTitle align="left" className='text-center md:text-left'>{t("aboutUs")}</SectionTitle>
          <div className='flex flex-col-reverse md:grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20'>
            <p className={`box-blur ${isReadMore ? `readMoreActive` : null} relative text-sm md:text-lg`}>
              CarSpace - это место, где страсть к автомобилям и качественным автоаксессуарам сходятся в единое целое.
              Наша компания специализируется на продаже автоаксессуаров, которые преобразят ваш автомобиль, сделают его уникальным и улучшат вашу ежедневную поездку.
              <br /><br />
              Наши товары отличаются высоким качеством, надежностью и доступными ценами. Мы тщательно отбираем каждый товар, чтобы убедиться, что он соответствует самым высоким стандартам, и предоставляем нашим клиентам только лучшее.
              <br /><br />
              Присоединяйтесь к семье CarSpace и позвольте нам помочь вам сделать ваш автомобиль по-настоящему уникальным. Благодарим вас за выбор нас, и не забывайте следить за нашими новинками и акциями!
              <br /><br />
              С любовью к автомобилям,
              <br />
              Команда CarSpace
            </p>
            <div className='relative rounded-[10px] overflow-hidden md:max-h-[450px] md:min-h-[450px] h-[60vw] md:h-full'>
                <Image 
                    src="/images/carspaceAboutUsImage.jpeg"
                    fill={true}
                    style={{objectFit: 'cover'}}
                    alt='product'
                />
            </div>
          </div>
          <div className='flex md:hidden justify-center md:justify-start mt-4'>
            <Button
                variant="primary"
                className='text-xs md:text-base h-9 md:h-10 max-w-[50%]'
                size="full"
                onClick={() => setIsReadMore(state => !state)}
            >{isReadMore ? button("hide") : button("showMore")}</Button>
          </div>
      </section>
    )
}

export default About