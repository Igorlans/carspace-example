import { publicProcedure, router } from "@/server/trpc";
import {TRPCError} from "@trpc/server";
import {z} from "zod";
import prisma from "@/prisma/client";
import { 
    OrderItemValues, 
    orderShcema,
    promocodeSchema
} from "@/types/order";
import {createCrmOrder} from "@/server/routers/order/functions/createCrmOrder";
export const orderRouter = router({
    makeOrder: publicProcedure.input(orderShcema).mutation(async ({input}) => {
        try {
            if (!input) throw new TRPCError({message: 'There is no product id', code: 'NOT_FOUND'})

            await prisma.order.create({
                data: {
                    name: input.name,
                    phone: input.phone,
                    promocode: input.promocode,
                    totalPrice: input.totalPrice,
                    items: JSON.stringify(input.items)
                }
            })

            const promocode = await prisma.promocode.findUnique({
                where: {
                    code: input.promocode
                }
            })


            const crmResponse = await createCrmOrder(input, promocode)
            return {crm: crmResponse}

        } catch (e) {
            console.log(e);
        }
    }),

    getOrders: publicProcedure.query(async () => {
        const orders = await prisma.order.findMany({})
        return orders.map(order => ({
            ...order,
            items: JSON.parse(order.items as string) as OrderItemValues[]
        }))
    }),
    getOrderById: publicProcedure.input(z.object({
        id: z.string()
    })).query(async ({ input: {id} }) => {
        try {
            if (!id) throw new TRPCError({message: 'There is no product id', code: 'NOT_FOUND'})
            const order = await prisma.order.findUnique({
                where: {
                    id
                }
            })
            return {
                ...order,
                items: JSON.parse(order?.items as string) as OrderItemValues[]
            }
        } catch (e) {
            console.log(e);
        }
    }),

    savePromocode: publicProcedure.input(promocodeSchema).mutation(async ({ input }) => {
        if (!input) throw new TRPCError({message: 'There is no product id', code: 'NOT_FOUND'})
        try {
            if (!input.id) {
                const newPromocode = await prisma.promocode.create({
                    data: input
                })
            } else {
                const newPromocode = await prisma.promocode.update({
                    where: {
                        id: input.id
                    },
                    data: input
                })
            }
        } catch (e) {
            console.log(e);
        }
    }),
    deletePromocode: publicProcedure.input(z.object({
        id: z.string()
    })).mutation(async ({ input }) => {
        if (!input.id) throw new TRPCError({message: 'There is no product id', code: 'NOT_FOUND'})
        try {
            const newPromocode = await prisma.promocode.delete({
                where: {
                    id: input.id
                }
            })
        } catch (e) {
            console.log(e);
        }
    }),

    getPromocodes: publicProcedure.query(async () => {
        try {
            const promocodes = await prisma.promocode.findMany({})
            return promocodes
        } catch (e) {
            console.log(e);
        }
    }),
    getPromocodeById: publicProcedure.input(z.object({
        id: z.string()
    })).query(async ({ input }) => {
        try {
            const promocode = await prisma.promocode.findUnique({
                where: {
                    id: input.id
                }
            })
            return promocode
        } catch (e) {
            console.log(e);
        }
    })
})