import React, {FC, useMemo, useState} from 'react';
import {FullProduct} from "@/types/product";
import IconButton from "@/app/(admin)/adminpanel/components/IconButton";
import {LuText} from "react-icons/lu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import ReviewCard from "@/components/cards/ReviewCard";
import {ScrollArea} from "@/components/ui/scroll-area";
import dayjs from "dayjs";
import AdminReviewCard from './AdminReviewCard';

interface IPickReviewProps {
    value: string | undefined,
    setValue: (newValue: string) => void;
    reviews: FullProduct['reviews']
}
const PickReview: FC<IPickReviewProps> = ({
    reviews,
    value,
    setValue
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const pickedReview = useMemo(() => {
        return reviews?.find(review => review?.id === value)
    }, [reviews, value])

    const pickReview = (newValue: string) => {
        setValue(newValue)
        setIsVisible(false)
    }

    return (
        <Dialog
            open={isVisible}
            onOpenChange={(open) => setIsVisible(open)}
        >
            <DialogTrigger asChild>
                {pickedReview ?
                    <AdminReviewCard
                        revieww={pickedReview}
                    />
                    :
                    <IconButton
                        icon={<LuText className={'text-md'} />}
                    >
                        Выбрать отзыв
                    </IconButton>
                }

            </DialogTrigger>
            <DialogContent className="max-w-[805px] min-h-[600px]">
                <DialogHeader>
                    <DialogTitle>Выберите отзыв</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[460px]" >
                    <div
                        className="grid gap-4 grid-cols-2 p-5"
                    >
                        {reviews?.map(review =>
                            <AdminReviewCard
                                onClick={() => pickReview(review.id)}
                                key={review.id}
                                revieww={review}
                            />
                        )}
                    </div>


                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default PickReview;