import { FC } from 'react'
interface BenefitCardProps {
  title: string;
  descr: string;
  icon: React.ReactNode
}

const BenefitCard: FC<BenefitCardProps> = ({ title, descr, icon }) => {
    return (
        <div className="productCard select-none p-[12px] md:p-[20px] rounded-[8px] overflow-hidden bg-white text-center">
            <div className="grid grid-rows-[45px_50px] md:grid-rows-[65px_50px_70px] justify-items-center h-[100px] md:h-[200px]">
                <div className='relative w-full h-full'>
                    { icon }
                </div>
                <h1 className='font-bold text-sm md:text-xl'>{ title }</h1>
                <p className='text-customSecondary text-xs md:text-sm mt-2 hidden md:block'>{ descr }</p>
            </div>
        </div>
    )
}

export default BenefitCard