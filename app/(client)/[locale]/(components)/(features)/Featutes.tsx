import { FC } from 'react'
import { BenefitsIcons } from './Icons'
import UseTranslation from "@/helplers/UseTranslation";
interface FeatutesProps {
    locale: string;
}

const Featutes: FC<FeatutesProps> = async ({ locale }) => {
  return (
    <section className='container'>
        <ul className='flex items-center flex-col md:flex-row max-w-fit md:max-w-[80%] mx-auto text-customPrimary'>
            <li className='flex items-center w-full gap-x-4'>
                <BenefitsIcons.delivery className='w-11 md:w-14' />
                <div className='flex flex-col'>
                    <span className='text-lg md:text-xl font-dela'><UseTranslation translate={'fastDelivery'} /></span>
                    <p className='text-sm md:text-base'><UseTranslation translate={'fastDeliveryDescr'} /></p>
                </div>
            </li>
            <li className='flex items-center w-full gap-x-4'>
                <BenefitsIcons.security className='w-11 md:w-14' />
                <div className='flex flex-col'>
                    <span className='text-lg md:text-xl font-dela'><UseTranslation translate={'cargoInsurance'} /></span>
                    <p className='text-sm md:text-base'><UseTranslation translate={'cargoInsuranceDescr'} /></p>
                </div>
            </li>
            <li className='flex items-center w-full gap-x-4'>
                <BenefitsIcons.return className='w-11 md:w-14' />
                <div className='flex flex-col'>
                    <span className='text-lg md:text-xl font-dela'><UseTranslation translate={'easyReturn'} /></span>
                    <p className='text-sm md:text-base'><UseTranslation translate={'easyReturnDescr'} /></p>
                </div>
            </li>
        </ul>
    </section>
  )
}


export default Featutes