"use client"

import { FC } from 'react'

import ReviewGrid from '@/components/layouts/ReviewGrid'
import ReviewCard from '@/components/cards/ReviewCard'
import Review from '@/components/review/Review'
import { Button } from '@/components/ui/button'
import {
    FullProduct,
    FullReview
} from '@/types/product'
import dayjs from "dayjs";

interface ReviewsProps {
  product: FullProduct
  reviews: FullReview
}

const Reviews: FC<ReviewsProps> = ({ product, reviews }) => {

  return (
    <div className='pt-4 max-w-[1100px]'>
        <ReviewGrid>
            {
                reviews?.map((item, i) => (
                    <ReviewCard
                        className='h-[240px] md:h-[280px]'
                        key={item.id}
                        revieww={item}
                    />
                ))
            }
        </ReviewGrid>
        <div className='pt-4'>
            <Review
                productId={product?.id}
            >
                <Button
                    variant="primary"
                    size="lg"
                >оставить отзыв</Button>
            </Review>
        </div>
    </div>
  )
}

export default Reviews
