import {OrderValues} from "@/types/order";
import {Promocode} from "@prisma/client";
import { checkPhoneUz } from '@/utils/checkPhoneUz';
import { checkCrmTrashUz } from '@/utils/checkCrmTrashUz';


export const createCrmOrder = async (order: OrderValues, promocode: Promocode | null) => {

    const itemsSum = order.items.reduce((acc, item) => {
        return acc + Number(item.price as string) * Number(item.quantity as string)
    }, 0) / 1000

    const totalPrice = order.totalPrice / 1000

    let discountFields = {}
    const discountAmount = Number((itemsSum - totalPrice).toFixed(2)) ;
    const discountPercent = Number(((discountAmount / itemsSum) * 100).toFixed(2));
    if (promocode) {
        if (promocode.type === 'PERCENT') {
            discountFields = {discountManualPercent: discountPercent}
        } else if (promocode.type === 'FIXED'){
            discountFields = {discountManualAmount: discountAmount}
        }
    }

    const promocodeFieldArray = order.promocode ?  {promocode: order.promocode} : {}

    const [phone, phoneCond] = checkPhoneUz(order.phone)
    // console.log('Validated number', phone);

    const orderData = {
        site: 'carspace',
        order: {
            ...discountFields,
            firstName: order.name,
            phone: phone,
            items: order.items.map(item => ({
                purchasePrice: Number(item.price) / 1000,
                initialPrice: Number(item.price) / 1000,
                quantity: item.quantity,
                productName: item.title,
                offer: {
                    externalId: item.sku,
                    xmlId: item.crmId,
                }
            })),
            customFields: {
                ...promocodeFieldArray
            }
            // source: {
            //     source: 'source',
            //     medium: 'medium',
            //     campaign: 'campaign',
            //     keyword: 'keyword',
            //     content: 'content',
            // },
        },
    };

    const apiUrl = 'https://uzshopping.retailcrm.ru/api/v5/orders/create';
    const requestData = new URLSearchParams({
        site: orderData.site,
        order: JSON.stringify(orderData.order),
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY': '3B5GFyjM1veHAbkBKB6EMefW41bvjUlf'
        },
        body: requestData,
    };

    // Makes check on created orders with such phone number (trash check)
    const apiUrlGet = 'https://uzshopping.retailcrm.ru/api/v5/orders';
    const trashCond = await checkCrmTrashUz(apiUrlGet, requestOptions.headers['X-API-KEY'], phone, 2);

    if(trashCond === true){
      return {orderData, response: {}}
    }

    try {
        const fetch = await import('node-fetch')
        const response = await fetch.default(apiUrl, requestOptions);
        const responseData = await response.json();

        console.log(responseData)
        return {orderData, response: responseData};
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
}
