"use client"

import {Check, ChevronsUpDown, Search} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {FC, useEffect, useRef, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce";
import {trpc} from "@/app/_trpc/client";
import * as React from "react";
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList} from "@/components/ui/command";
import {Command as CommandPrimitive} from "cmdk";
import {Loader2} from 'lucide-react';

interface IRelatedProducts {
    value: { id: string, name: string }[],
    setValue: (newValue: { id: string, name: string}[]) => void;
}
interface IProductOption {
    label: string | undefined,
    value: string;
}

const RelatedProducts: FC<IRelatedProducts> = ({value, setValue}) => {
    const pickedProduct = value[0]
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState<IProductOption[]>([])
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce<string>(query, 400)

    const {refetch: refetchProducts, isFetching } = trpc.product.searchProduct.useQuery({query: query, language: 'ru', limit: 5});


    const searchProducts = async () => {
        const {data: searched} = await refetchProducts()
        const productsOptions = searched?.map(product => ({label: product?.variants[0].title, value: product.id}))
        const filteredOptions = productsOptions?.filter(option => option.value !== pickedProduct?.id)
        // if (!productsOptions) return
        setProducts(filteredOptions || [])
    }

    useEffect(() => {
        searchProducts()
    }, [debouncedQuery, pickedProduct])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[400px] justify-between"
                >
                    {
                        pickedProduct?.name ||
                        "Выберите продукт..."
                    }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
                    {/*<div className="flex items-center border-b px-3">*/}
                    {/*    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />*/}
                    {/*    <Input*/}
                    {/*        value={query}*/}
                    {/*        onChange={(event) => setQuery(event.target.value)}*/}
                    {/*        className={cn(*/}
                    {/*            "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <Command shouldFilter={false}>
                        <div className="flex items-center border-b px-3">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <CommandPrimitive.Input
                                value={query}
                                onValueChange={(search) => setQuery(search)}
                                className={cn(
                                    "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                )}
                            />
                            {
                                isFetching && <Loader2 className="h-4 w-4 animate-spin" />
                            }
                        </div>
                        <CommandList>
                            {
                                value[0]?.id &&
                                <CommandGroup heading={'Выбраный продукт'}>
                                    <CommandItem
                                        value={value[0]?.id}
                                        onSelect={(currentValue) => {
                                            setValue( [])
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4"
                                            )}
                                        />
                                        {pickedProduct.name}
                                    </CommandItem>
                                </CommandGroup>

                            }

                            <CommandGroup heading={'Продукты'}>
                                <CommandEmpty>Продукты не найдены.</CommandEmpty>
                                {products.map((product) => (
                                    <CommandItem
                                        value={product.value}
                                        key={product.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === pickedProduct?.id ? [] : [{id: currentValue, name: product.label as string}])
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                pickedProduct?.id === product.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {product.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>

                        </CommandList>
                    </Command>

                {/*<Command>*/}
                {/*   */}
                {/*    <CommandInput  value={query} onValueChange={(search) => setQuery(search)} placeholder="Поиск продуктов..."/>*/}
                {/*    <CommandGroup>*/}
                {/*        {products?.map((product) => (*/}
                {/*            <CommandItem*/}
                {/*                key={product.value}*/}
                {/*                onSelect={(currentValue) => {*/}
                {/*                    setValue(currentValue === value[0]?.id ? [] : [{id: currentValue}])*/}
                {/*                    setOpen(false)*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                <Check*/}
                {/*                    className={cn(*/}
                {/*                        "mr-2 h-4 w-4",*/}
                {/*                        value[0]?.id === product.value ? "opacity-100" : "opacity-0"*/}
                {/*                    )}*/}
                {/*                />*/}
                {/*                {product.label}*/}
                {/*            </CommandItem>*/}
                {/*        ))}*/}
                {/*    </CommandGroup>*/}
                {/*</Command>*/}
            </PopoverContent>
        </Popover>
    )
}

export default RelatedProducts;
