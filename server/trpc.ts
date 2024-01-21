import {initTRPC, TRPCError} from "@trpc/server";
import {Context} from "@/server/context";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware(async (opts) => {
    const { ctx,  } = opts;
    console.log('is auth check session ========', ctx.session)

    if (!ctx.session?.user?.isSuperUser) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return opts.next({
        ctx: {
            user: ctx.session.user,
        },
    });
});
// you can reuse this for any procedure

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

export const router = t.router;

