"use client"

import { FC } from 'react'
import { LuTrash2 } from 'react-icons/lu'
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
import { useTranslations } from 'next-intl'

interface CustomAlertProps {
  action: () => void
}

const DeleteAlert: FC<CustomAlertProps> = ({ action }) => {
  const button = useTranslations("buttons")
  const t = useTranslations("validation")
  return (
    <AlertDialog>
    <AlertDialogTrigger >
      <LuTrash2 className="text-xl text-lightGray" />
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>{t("deleteAllertTitle")}</AlertDialogTitle>
        <AlertDialogDescription>
            {
              t("deleteAllertDescr")
            }
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>{button("cancel")}</AlertDialogCancel>
        <AlertDialogAction
            onClick={() => action()}
        >{button("nextStep")}</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert