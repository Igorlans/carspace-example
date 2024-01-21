"use client"

import {FC, useEffect} from 'react'

import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from '@/components/ui/button'
import { LuFileEdit } from "react-icons/lu"
import DeleteAlert from '../../components/DeleteAlert'
import { toast } from 'react-hot-toast'
import { apiRequest } from '@/lib/apiRequest'
import EmptyList from '../../components/EmptyList'
import {useRouter} from "next/navigation";
import {RouterOutput} from "@/app/_trpc/client";

interface CategoryTableProps {
  category: RouterOutput['category']['getCategories'] | undefined
}

const CategoryTable: FC<CategoryTableProps> = ({ category }) => {
    const router = useRouter()
    const categoryDelete = async (id: string) => {
        try {
          await toast.promise(apiRequest({
              url: "/api/category",
              method: "DELETE",
              data: {
                id
              }
          }), {
              loading: "Удаление категории",
              success: () => {
                  router.refresh()
                  return "Категорию удалено"
              },
              error: (e) => {
                  console.log(e);
                  return "Ошибка удаления категории"
              }
          }
          )
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        router.refresh()
    }, [])

    return (
        <Table>
            <TableCaption>
              {
                category?.length === 0 ?
                  <EmptyList message='Список категорій порожній' /> : 
                  <>Список усіх категорій</>
              }
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">№</TableHead>
                <TableHead>Название</TableHead>
                <TableHead className='text-right'>Редактировать</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                  category?.map((item, i) => (
                      <TableRow key={i}>
                          <TableCell className="font-medium">{i+1}</TableCell>
                          <TableCell>{item?.title}</TableCell>
                          <TableCell className='flex gap-x-2 float-right'>
                            <Link href={`/adminpanel/category/${item.id}`}>
                              <Button className='h-10 w-10 p-1'>
                                  <LuFileEdit className={'text-base'} />
                              </Button>
                            </Link>
                              <DeleteAlert action={() => categoryDelete(item.id)}/>
                          </TableCell>
                      </TableRow>
                  ))
              }
            </TableBody>

        </Table>
  )
}

export default CategoryTable