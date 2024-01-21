"use client"

import { FC } from 'react'

import { useState, useEffect } from 'react';

import { Rating as RatingLib } from 'react-simple-star-rating'


interface RatingProps {
    type?: "display" | "active" | "product";
    styles?: {
        [key: string]: string
    }
    className?: string;
    rating?: number;
    onChange?: (rating: number) => void;
}

const Rating: FC<RatingProps> = ({ rating, styles={width: "30px"}, type = "active", onChange }) => {
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
                <div className='text-[18px] md:text-[28px] lg:text-[28px] font-dela text-customPrimary pr-4'>
                    <span>{value}</span> / 5
                </div>
            }
            <div>
                {/*<RatingLib
                    fillColor="#2C334A"
                    emptyColor="#cbd5e1"
                    allowFraction
                    transition
                    initialValue={value}
                    SVGstyle={{
                        display: "inline",
                        ...styles
                    }}
                    readonly={type !== "active"}
                    onClick={handleRatingChange}
                /> */}
                <RatingLib
                    fillColor="#E38630"
                    emptyColor="#cbd5e1"
                    allowFraction
                    transition
                    initialValue={value}
                    SVGstyle={{
                        display: "inline",
                        ...styles
                    }}
                    readonly={type !== "active"}
                    onClick={handleRatingChange}
                />
            </div>
        </div>
    )
}

export default Rating
