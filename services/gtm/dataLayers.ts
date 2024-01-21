import {mainCurrency} from "@/config";
import {GTMBasketItemData, GTMItemData} from "@/services/gtm/getDataFromItem";

type WindowWithDataLayer = Window & {
    dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const setViewDataLayer = (product: GTMItemData) => {

    const dataLayerLayout = {
        'event': 'view_item',
        'ecommerce': {
            'currency': mainCurrency,
            'value': Number(product.price),
            'items': [
                product
            ]
        },
    }

    console.log('view_item', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

export const setClickDataLayer = (product: GTMItemData) => {

    const dataLayerLayout = {
        'event': 'select_item',
        'ecommerce': {
            'item_list_id': product.item_list_id,
            'item_list_name':  product.item_list_name,
            'items': [
                product
            ]
        },
    }

    console.log('select_item', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);

}

export const setAddToCartDataLayer = (productToAdd: GTMItemData) => {
    const dataLayerLayout = {
        'event': 'add_to_cart',
        'ecommerce': {
            'currency': mainCurrency,
            'value': Number(productToAdd?.price),
            'items': [
                productToAdd
            ]
        },
    }

    console.log('add to cart', dataLayerLayout)

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);

    // if (window?.fbq) {
    //     window?.fbq('track', 'AddToCart', {
    //         content_name: productToAdd.item_name,
    //         content_category: productToAdd.item_category,
    //         content_ids: [productToAdd.item_id],
    //         content_type: productToAdd.item_category,
    //         value: Number(productToAdd.price),
    //         currency: currCode
    //     })
    // }

}

export const setRemoveFromCartDataLayer = (productToDel: GTMBasketItemData) => {
    const dataLayerLayout = {
        'event': 'remove_from_cart',
        'ecommerce': {
            'currency': mainCurrency,
            'value': productToDel.price,
            'items': [
                productToDel
            ]
        },
    }
    console.log('remove_from_cart', dataLayerLayout)

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

export const setViewCartDataLayer = (products: GTMBasketItemData[], total: number) => {
    const dataLayerLayout = {
        'event': 'view_cart',
        'ecommerce': {
            'currency': mainCurrency,
            'value': total,
            'items': [
                ...products
            ]
        },
    }
    console.log('view_cart', dataLayerLayout)

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);
}

export const setBeginCheckoutDataLayer = (products: GTMBasketItemData[], total: number) => {
    const dataLayerLayout = {
        'event': 'begin_checkout',
        'ecommerce': {
            'currency': mainCurrency,
            'value': total,
            'items': [
                ...products
            ]
        },
    }
    console.log('begin_checkout', dataLayerLayout)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);

    // if (window?.fbq) {
    //     const contenetIds = basketProducts?.map(item => item?.item_id)
    //     window?.fbq('track', 'InitiateCheckout', {
    //         content_ids: contenetIds,
    //         value: Number(price),
    //         currency: currCode
    //     })
    // }
}

export const setPurchaseDataLayer = (products: GTMBasketItemData[], total: number) => {
    const dataLayerLayout = {
        'event': 'purchase',
        'ecommerce': {
            'currency': mainCurrency,
            'value': total,
            'items': [
                ...products
            ]
        },
    }
    console.log('purchase', dataLayerLayout)

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'ecommerce': null});
    window.dataLayer.push(dataLayerLayout);

    // if (window?.fbq) {
    //     const contenetIds = basketProducts?.map(item => item?.item_id)
    //     window?.fbq('track', 'Purchase', {
    //         content_ids: contenetIds,
    //         value: Number(purchase.revenue),
    //         currency: currCode
    //     })
    // }
}

