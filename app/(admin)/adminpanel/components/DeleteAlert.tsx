"use client"

import { FC } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {buttonVariants} from '@/components/ui/button'
import { HiOutlineTrash } from "react-icons/hi"
import {cn} from "@/lib/utils";
interface CustomAlertProps {
  action: () => void
}

const DeleteAlert: FC<CustomAlertProps> = ({ action }) => {
  return (
    <AlertDialog>
    <AlertDialogTrigger >
        <div className={cn(buttonVariants({ variant: 'default', size: 'default', className: ''}))}>
            <HiOutlineTrash className={'text-base'} />
        </div>
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
        <AlertDialogDescription>
            Это действие не может быть отменено.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Скасувати</AlertDialogCancel>
        <AlertDialogAction
            onClick={() => action()}
        >Продолжить</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert