"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { LuCross, LuSearch, LuX } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { FullProduct } from "@/types/product";
import Link from "next-intl/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "use-intl";
import { ScrollArea } from "@/components/ui/scroll-area";

const SearchPannelMobile = () => {
  const t = useTranslations("header");
  const [open, setOpen] = useState<boolean>(false); // Is sidebar open
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <LuSearch
          className={cn(
            "text-lightGray text-[24px] transition-colors",
            open ? "" : "text-black"
          )}
        />
      </DialogTrigger>

      <DialogContent className={"min-w-[100vw] px-5 top-[0px] translate-y-0"}>
        <DialogHeader>{t("search")}</DialogHeader>
        <div className={`relative w-full mt-5`}>
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${t("isearch")}...`}
            className={cn(
              `transition-all pl-10 flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50`
            )}
          />
          {query ? (
            <LuX
              onClick={() => setOpen(false)}
              className={cn(
                "absolute right-3 top-[13px] text-lightGray text-[18px] transition-colors text-black"
              )}
            />
          ) : null}
          {isFetching && open && (
            <Loader2 className="absolute left-3 top-3.5 h-4 w-4 animate-spin" />
          )}
        </div>
        <ScrollArea className="w-full bg-white rounded-lg max-h-[250px]">
          {products?.length ? (
            products?.map((product) => (
              <Link
                href={`/products/${product.id}`}
                className={"flex w-full gap-5 p-4 hover:bg-gray-100"}
                key={product.id}
                onClick={() => setOpen(false)}
              >
                <div className={"min-w-[50px] h-[50px] relative"}>
                  <Image
                    fill={true}
                    sizes={"20vw"}
                    className={"object-cover rounded"}
                    src={product.variants[0]?.image?.url as unknown as string}
                    alt={product.variants[0].title as unknown as string}
                  />
                </div>
                <div>
                  <div>{product?.variants[0]?.title}</div>
                  <div className="flex gap-4 items-end mt-2">
                    <div className="font-bold text-[14px] leading-none">
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
              </Link>
            ))
          ) : (
            <div className={"w-full hover:bg-gray-100 p-4"}>
              {t("notfound")}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SearchPannelMobile;
