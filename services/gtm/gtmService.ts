import {FullProduct, FullVariant} from "@/types/product";
import {
    setAddToCartDataLayer, setBeginCheckoutDataLayer,
    setClickDataLayer, setPurchaseDataLayer,
    setRemoveFromCartDataLayer, setViewCartDataLayer,
    setViewDataLayer
} from "@/services/gtm/dataLayers";
import {formBasketItemData, formItemData} from "@/services/gtm/getDataFromItem";
import {OrderItemValues} from "@/types/order";

class GtmService {
    viewItem(item: FullProduct, variant: FullVariant | null, listName?: string) {
        const formItem = formItemData(item, variant, listName)
        setViewDataLayer(formItem)
    }

    selectItem(item: FullProduct, variant: FullVariant | null, listName?: string) {
        const formItem = formItemData(item, variant, listName)
        setClickDataLayer(formItem)
    }

    addToCart(item: FullProduct, variant: FullVariant | null, listName?: string) {
        const formItem = formItemData(item, variant, listName)
        setAddToCartDataLayer(formItem)
    }

    removeFromCart(item: OrderItemValues) {
        setRemoveFromCartDataLayer(formBasketItemData(item))
    }

    viewCart(items: OrderItemValues[]) {
        const formedBasketItems = items?.map(item => {
            return formBasketItemData(item)
        })

        const price = formedBasketItems?.reduce((acc, item) => {
            return acc += item?.price * item?.quantity
        }, 0)

        setViewCartDataLayer(formedBasketItems, price)
    }

    beginCheckout(items: OrderItemValues[]) {
        const formedBasketItems = items?.map(item => {
            return formBasketItemData(item)
        })

        const price = formedBasketItems?.reduce((acc, item) => {
            return acc += item?.price * item?.quantity
        }, 0)

        setBeginCheckoutDataLayer(formedBasketItems, price)
    }

    purchase(items: OrderItemValues[]) {
        const formedBasketItems = items?.map(item => {
            return formBasketItemData(item)
        })

        const price = formedBasketItems?.reduce((acc, item) => {
            return acc += item?.price * item?.quantity
        }, 0)

        setPurchaseDataLayer(formedBasketItems, price)
    }
}

export const gtmService = new GtmService()

export default GtmService;
