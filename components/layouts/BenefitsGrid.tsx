import { FC } from 'react'
import "./style.css"

interface BenefitsGridProps {
  children: React.ReactNode
}

const BenefitsGrid: FC<BenefitsGridProps> = ({ children }) => {
    return (
      <div className='flex flex-col'>
        <div className={`benefits-grid`}>
            { children }
        </div>
      </div>
      )
}

export default BenefitsGrid