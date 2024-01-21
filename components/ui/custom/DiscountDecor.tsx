import { FC } from 'react'

interface DiscountDecorProps {
    discount: number | string;
    className?: string;
}

const DiscountDecor: FC<DiscountDecorProps> = ({ discount, className }) => {
  return (
    <div className={`z-10 absolute bg-customRed py-1 md:py-1 px-2 md:px-4 font-dela font-normal text-base md:text-xl text-white ${className}`}>
        { discount }
    </div>
  )
}

export default DiscountDecor