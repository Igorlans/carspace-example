"use client";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { LuSearch } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { FullProduct } from "@/types/product";
import Link from "next-intl/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const SearchPannel = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<FullProduct[]>([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce<string>(query, 400);
  const locale = useLocale();
  const { refetch: refetchProducts, isFetching } =
    trpc.product.searchProduct.useQuery({
      query: query,
      language: locale as "ru" | "uz",
      limit: 5,
    });

  const searchProducts = async () => {
    const { data: searched } = await refetchProducts();
    setProducts(searched || []);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchProducts();
  }, [debouncedQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className={`relative`}>
          <LuSearch className="absolute left-3 top-2.5 text-lightGray text-[24px]" />
          <Input
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              "pl-12 flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
          {isFetching && (
            <Loader2 className="absolute right-3 top-3.5 h-4 w-4 animate-spin" />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        onOpenAutoFocus={() => inputRef?.current?.focus()}
        style={{
          width: inputRef.current?.clientWidth,
          marginTop: 10,
        }}
      >
        {products?.length ? (
          products?.map((product) => (
            <Link
              href={`/products/${product.id}`}
              className={"flex w-full hover:bg-gray-100 p-4 items-center gap-4"}
              key={product.id}
            >
              <div className={"w-[50px] h-[50px] relative"}>
                <Image
                  fill={true}
                  sizes={"30vw"}
                  className={"object-cover rounded"}
                  src={product?.images[0]?.url}
                  alt={product?.images[0]?.name as string}
                />
              </div>
              <div>
                <div>
                  <div>{product?.variants[0]?.title}</div>
                  <div className="flex gap-4 items-end mt-2">
                    <div className="font-bold text-[16px] leading-none">
                      {product?.variants[0].price.toLocaleString("ru")} сум
                    </div>
                    <div
                      className="text-[14px] leading-none text-lightGray"
                      style={{ display: "flex", flexWrap: "nowrap" }}
                    >
                      <div className="text-[14px] leading-none text-lightGray line-through mr-1">
                        {product?.variants[0]?.oldPrice && (
                          <>
                            {product?.variants[0].oldPrice.toLocaleString("ru")}{" "}
                          </>
                        )}
                      </div>
                      {product?.variants[0]?.oldPrice && <> сум </>}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className={"w-full hover:bg-gray-100 p-4"}>
            Продуктів не знайдено
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SearchPannel;
