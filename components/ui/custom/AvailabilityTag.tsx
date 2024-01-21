"use client"

import { FC } from 'react'
import { useMemo } from 'react'

import { $Enums } from '@prisma/client'
import { useTranslations } from 'next-intl'

interface AvailabilityTagProps {
    availability: keyof typeof $Enums.AvailablityStatus
}

type availabilityValues = {
    status: string
    color: string,
}
const AvailabilityTag: FC<AvailabilityTagProps> = ({ availability }) => {
    const t = useTranslations("availabilityTags")
    const tag: availabilityValues = useMemo(() => renderTag(), [availability])

    function renderTag (): availabilityValues {
        switch (availability) {
            case "IN_STOCK":
                return { status: t("IN_STOCK"), color: "#A8DF8E" };
            case "RUNS_OUT":
                return { status: t("RUNS_OUT"), color: "#F4D160" };
            case "OUT_OF_STOCK":
                return { status: t("OUT_OF_STOCK"), color: "#C70039" };
            default:
                return { status: t("IN_STOCK"), color: "#A8DF8E" };
        }
    }

    return (
        <div className='flex gap-x-[10px] items-center'>
            <div className='w-[10px] h-[10px] rounded-full' style={{backgroundColor: tag.color}}></div>
            {/*<div className='text-xs md:text-sm'>{tag.status}</div>*/}
            <div className='text-[16px] md:text-[16px]'>{tag.status}</div>
        </div>
    )
}

export default AvailabilityTag
