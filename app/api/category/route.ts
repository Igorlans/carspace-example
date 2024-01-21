import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import type { ICategorySchema } from "@/app/(admin)/adminpanel/category/formSchema";
import {Category} from "@prisma/client";
const translit = require('translitit-cyrillic-russian-to-latin');

export async function GET(req: Request) {
    const category = await prisma.category.findMany({
        include: {
            textFields_ru: true,
            textFields_uz: true,
        }
    })
    
    return new Response(JSON.stringify({data: category}))
}

export async function POST(req: Request) {
    try {
        const body: ICategorySchema = await req.json()
        if (!body?.title_uz) throw new Error("Title is required")
        if (!body?.title) throw new Error("Title is required")

        const slug = translit(body.title)

        const newCategory = await prisma.category.create({
            data: {
                textFields_ru: {
                    create: {
                        language: 'ru',
                        title: body.title
                    }
                },
                textFields_uz: {
                    create: {
                        language: 'uz',
                        title: body.title_uz
                    }
                },
                slug
            }
        })

        return NextResponse.json({message: 'Категорію створено', data: newCategory}, {
            status: 201
        })

    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}

export async function PUT(req: Request) {
    try {
        const body: { title: string, title_uz: string, id: string } = await req.json()
        if (!body) throw new Error("Body is required")

        const slug = translit(body.title)

        const newCategory = await prisma.category.update({
            where: {
                id: body.id
            },
            data: {
                textFields_ru: {
                    create: {
                        language: 'ru',
                        title: body.title
                    }
                },
                textFields_uz: {
                    create: {
                        language: 'uz',
                        title: body.title_uz
                    }
                },
                slug
            }
        })


        return NextResponse.json({message: 'Категорію оновлено', data: newCategory}, {
            status: 201
        })

    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}
export async function DELETE(req: Request) {
    try {
        const body: Category = await req.json()
        if (!body) throw new Error("Body is required")

        const newCategory = await prisma.category.delete({
            where: {
                id: body.id
            }
        })

        return NextResponse.json({message: 'Категорію видалено', data: newCategory}, {
            status: 201
        })

    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}