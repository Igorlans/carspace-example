import {OrderItemValues} from "@/types/order";
import {FullProduct, FullVariant} from "@/types/product";

export const formItemData = (item: FullProduct, variant: FullVariant | null, listName?: string) => {
    const itemCategory = item.category.title;
    const itemCategoryId = item.categoryId;

    return ({
        'item_name': variant?.title,
        'item_id': variant?.sku,
        'price': variant?.price,
        'quantity': 1,
        'item_category': itemCategory,
        'item_list_name': listName || itemCategory,
        'item_list_id': listName || itemCategoryId,
        'item_variant': variant?.title,
    })
}

export type GTMItemData = ReturnType<typeof formItemData>

export const formBasketItemData = (item: OrderItemValues) => {
    return {
        'item_name': item.title,
        'item_id': item.variantId,
        'price': Number(item?.price),
        'quantity': Number(item?.quantity),
    }
}

export type GTMBasketItemData = ReturnType<typeof formBasketItemData>
