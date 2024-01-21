import { FC } from 'react'
import "./style.css"
interface ProductGridProps {
    children: React.ReactNode
}

const ProductGrid: FC<ProductGridProps> = ({ children }) => {
  return (
    <div className='product-grid pb-4'>
        { children }
    </div>
  )
}

export default ProductGrid