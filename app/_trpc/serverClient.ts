import {appRouter} from "@/server";


export const serverClient = appRouter.createCaller({
    req: undefined as any,
    resHeaders: undefined as any,
    session: {
    // @ts-ignore
        user: {
            isSuperUser: true
        }
    }
})
