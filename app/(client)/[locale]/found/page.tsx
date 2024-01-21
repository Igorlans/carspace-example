import { languageInputValues } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import UseTranslation from "@/helplers/UseTranslation";

export default async function NotFound ({params}: {params: { locale: languageInputValues}}) {
    return (
        <div className="container h-[70vh]">
            <div className="relative w-full h-full">
                <Image 
                    src="/images/404decor.png"
                    fill
                    objectFit="cover"
                    className="-mt-24 md:-mt-32"
                    // style={{objectFit: "cover"}}
                    alt="not-foung"
                />

                <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-dela text-center flex flex-col gap-y-1 text-customPrimary">
                    <h1 className="text-[40px] md:text-[80px] uppercase">404</h1>
                    <h2 className="text-base md:text-[30px] uppercase">
                        <UseTranslation translate={'title'} namespace={'notFound'} />
                    </h2>
                    <Link href="/" className="font-norms underline mt-2 text-base md:text-lg">
                        <UseTranslation translate={'link'} namespace={'notFound'} />
                    </Link>
                </div>
            </div>
        </div>
    )
}