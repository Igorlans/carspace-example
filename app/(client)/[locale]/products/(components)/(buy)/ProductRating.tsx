"use client"

import { FC } from 'react'
import { useState, useEffect } from 'react';

import { Rating } from 'react-simple-star-rating'

interface ProductRatingProps {
    type?: "display" | "active" | "product";
    className?: string;
    rating?: number;
    onChange?: (rating: number) => void;
}

const ProductRating: FC<ProductRatingProps> = ({ rating, className, type = "active", onChange }) => {
    const [value, setValue] = useState<number>(0)

    useEffect(() => {
        setValue(parseFloat(rating?.toFixed(1) ?? "0"))
    }, [rating])

    const handleRatingChange = (rate: number) => {
        setValue(rate)
        if (onChange) {
            onChange(rate)
        }
    }

    return (
        <div className="flex items-center">

            {
                type === "product" &&
                <div className='text-2xl font-dela text-customPrimary pr-4'>
                    <span>{value}</span> / 5
                </div>
            }
            <div>
                <Rating
                    fillColor="#2C334A"
                    emptyColor="#cbd5e1"
                    allowFraction
                    transition
                    initialValue={value}
                    SVGstyle={{display: "inline"}}
                    readonly={type !== "active"}
                    onClick={handleRatingChange}
                /> 
            </div>
        </div>
    )
}

export default ProductRating