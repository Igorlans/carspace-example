import { FC } from 'react'

import "./style.css"

interface ReviewGridProps {
  children: React.ReactNode
}

const ReviewGrid: FC<ReviewGridProps> = ({ children }) => {
  return (
    <div className='review-grid'>
        { children }
    </div>
  )
}

export default ReviewGrid