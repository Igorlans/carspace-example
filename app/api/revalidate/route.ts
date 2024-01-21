import {NextRequest} from "next/server";
import {revalidatePath} from "next/cache";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const path = searchParams.get('path')
    if (path) {
        revalidatePath(path)
        return new Response(JSON.stringify({revalidated: true}))
    } else {
        return new Response(JSON.stringify({revalidated: true}))
    }
}