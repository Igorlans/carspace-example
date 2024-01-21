'use client'
import { usePathname } from "next-intl/client";
import {$Enums} from "@prisma/client";
import {useRouter} from "next-intl/client";


const useSetLocale = () => {
    const pathname = usePathname()
    const router= useRouter()
    return (locale: $Enums.Language) => router.replace(pathname, {locale: locale});
}
 
export default useSetLocale;