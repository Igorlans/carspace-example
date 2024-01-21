"use client"

import {FC, useEffect} from 'react'

import { useState } from 'react';
import ReviewForm from './ReviewForm';
import FullReview from './FullReview';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RouterOutput } from '@/app/_trpc/client';
  
interface ReviewProps {
    productId?: string | null;
    review?: RouterOutput["review"]["getModeratedReviews"][number] | null
    children: React.ReactNode
}

const Review: FC<ReviewProps> = ({ children, productId, review }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (isOpen) {
            // Pushing the change to the end of the call stack
            const timer = setTimeout(() => {
                document.body.style.pointerEvents = "";
            }, 0);

            return () => clearTimeout(timer);
        } else {
            document.body.style.pointerEvents = "auto";
        }
    }, [isOpen]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
          <DialogTrigger className='w-full'>{ children }</DialogTrigger>
          <DialogContent onPointerDownOutside={(event) => event.preventDefault()} onInteractOutside={(event) => event.preventDefault()}>
            <DialogHeader>
                {
                    review ? 
                        <FullReview revieww={review} /> :
                        <>                     
                            <DialogTitle>Опишите ваш опыт!</DialogTitle>
                            <DialogDescription>
                            Оставьте свой отзыв и оценку, чтобы мы могли лучше понять, что нам стоит улучшить, и чем вы уже довольны.
                            </DialogDescription>
                            {
                                productId &&
                                    <ReviewForm setOpen={setIsOpen} productId={productId} />
                            }
                        </>

                }
            </DialogHeader>
          </DialogContent>
        </Dialog>
    )
}

export default Review