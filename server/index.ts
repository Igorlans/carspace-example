import {router} from "@/server/trpc";
import {categoryRouter} from "@/server/routers/category";
import {productRouter} from "@/server/routers/product/product";
import { orderRouter } from "@/server/routers/order/order";
import {questionRouter} from "@/server/routers/question/question";
import { bannerRouter } from "./routers/banner";
import { reviewRouter } from "./routers/review";

export const appRouter = router({
    category: categoryRouter,
    product: productRouter,
    order: orderRouter,
    banner: bannerRouter,
    question: questionRouter,
    review: reviewRouter
})

export type AppRouter = typeof appRouter;