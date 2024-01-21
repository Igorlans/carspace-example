import type { ImageInputValue } from "@/types/types"
import { Banner } from "@prisma/client"

export interface FullBannerImage {
    mobile: ImageInputValue[];
    desktop: ImageInputValue[]
}
export default function transformBannerImage (images: Banner[]): FullBannerImage {
    const mobile = images && images?.length > 0 ? images?.map(item => ({
        url: item.urlMobile,
        id: item.id,
        link: item.link,
        name: item.name ?? "Банер"
    })) : []
    const desktop = images && images?.length > 0 ? images?.map(item => ({
        url: item.urlDesktop,
        id: item.id,
        link: item.link,
        name: item.name ?? "Банер"
    })) : []
    return {
        mobile,
        desktop
    }
}