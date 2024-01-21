"use client"

import {FC, useCallback, useEffect, useMemo} from 'react'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Slider} from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {LuSettings2} from "react-icons/lu"
import {languageInputValues} from '@/types/types'
import {useTranslations} from 'next-intl'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {usePathname, useRouter} from "next-intl/client";
import {useSearchParams} from "next/navigation";
import Link from "next-intl/link";
import {FilterOrder} from "@/types/product";

interface FiltersProps {
    locale: languageInputValues,
    min: number,
    max: number,
    order?: FilterOrder,
}

const Filters: FC<FiltersProps> = ({locale, min, max, order}) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [sliderVal, setSliderVal] = useState<number[]>([Number(searchParams.get('min')) || min, Number(searchParams.get('max')) || max])
    const [open, setOpen] = useState<boolean>(false)
    const t = useTranslations("category")

    const setOrder = (newValue: FilterOrder) => {
        const params = new URLSearchParams(searchParams)
        params.set('order', String(newValue))
        router.push(`${pathname}?${params.toString()}`)
    }

    const clearFilter = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('min')
        params.delete('max')
        return `${pathname}?${params.toString()}`
        // router.push(`${pathname}?${params.toString()}`)
        // setOpen(false)
    }

    const setFilter = (min: number, max: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('min', String(min))
        params.set('max', String(max))
        return `${pathname}?${params.toString()}`
        // setOpen(false)
    }

    const priceLink = useMemo(() => {
        const minValue = sliderVal[0]
        const maxValue = sliderVal[1]

        if (minValue === min && maxValue === max) {
            return clearFilter()
        } else {
            return setFilter(minValue, maxValue)
        }

    }, [sliderVal])

    const clearMinMaxLink = useMemo(() => {
        return clearFilter()
    }, [searchParams])

    useEffect(() => {
        setSliderVal([Number(searchParams.get('min')) || min, Number(searchParams.get('max')) || max])
    }, [searchParams]);

    return (
        <div className='grid grid-cols-2 md:grid-cols-2 py-6'>
            <div className='flex flex-col gap-y-4'>
                <Popover open={open} onOpenChange={(open) => setOpen(open)}>
                    <PopoverTrigger>
                        <div className='rounded-md w-fit border border-customPrimary'>
                            <Button
                                asChild
                                variant="customOutline"
                            >
                                <div className='flex items-center gap-x-3'>
                                    <LuSettings2/>
                                    {t("filter")}
                                </div>
                            </Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent align={"start"}>
                        <div className="flex flex-col gap-y-1">
                            <div className='font-norms font-bold text-xl w-fit cursor-default text-customPrimary'>
                                {t("price")}
                            </div>
                            <div className='flex flex-col gap-y-4'>
                                <div className='flex font-norms text-base w-full justify-between items-center'>
                                    <span>{sliderVal[0].toLocaleString("ru")}</span>
                                    <span>{sliderVal[1].toLocaleString("ru")}</span>
                                </div>
                                <div className='flex items-center'>
                                    <Slider
                                        value={sliderVal}
                                        defaultValue={[2000, 5000]}
                                        min={min}
                                        max={max}
                                        onValueChange={(newValue) => setSliderVal([newValue[0], newValue[1]])}
                                    />
                                </div>
                                <div className={'flex gap-2 self-end'}>
                                    <Link href={clearMinMaxLink}>
                                        <Button
                                            onClick={() => setOpen(false)}
                                            variant={'link'}
                                        >
                                            {t("clear")}
                                        </Button>
                                    </Link>
                                    <Link href={priceLink}>
                                        <Button
                                            onClick={() => setOpen(false)}
                                            // onClick={onSubmit}
                                            size={'sm'}
                                        >
                                            OK
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className='justify-self-end'>
                <div className='flex items-center'>
                    <div className='hidden font-norms font-bold text-xl w-fit cursor-default text-customPrimary md:block'>
                        {t("sort")}
                    </div>
                    <Select defaultValue={order}
                            onValueChange={(value) => setOrder(value as FilterOrder)}>
                        <SelectTrigger className="w-[180px] border-[0px]">
                            <SelectValue placeholder={t("sort")}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date_desc">{t("dateDesc")}</SelectItem>
                            <SelectItem value="price_asc">{t("priceAsc")}</SelectItem>
                            <SelectItem value="price_desc">{t("priceDesc")}</SelectItem>
                            <SelectItem value="discount_desc">{t("discountDesc")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default Filters