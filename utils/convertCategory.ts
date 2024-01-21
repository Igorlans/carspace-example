import {$Enums, Prisma} from "@prisma/client";

export const fullCategoryIncludeArgs = {
    include: {
        textFields_ru: true,
        textFields_uz: true
    }
}

export type FullCategory = Prisma.CategoryGetPayload<typeof fullCategoryIncludeArgs>


export const convertCategory = (category: FullCategory, language: $Enums.Language) => {
        const translation = category[`textFields_${language}`] || category[`textFields_ru`]
        const formedCategory = {
            ...category,
            title: translation?.title,
            title_uz: category.textFields_uz?.title,
        }
        const { textFields_ru, textFields_uz, ...otherProps} = formedCategory
        return otherProps
}

export const convertCategories = (categories: FullCategory[], language: $Enums.Language) => {
    return categories?.map(category => convertCategory(category, language))
}