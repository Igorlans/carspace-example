import { FC } from 'react'

import Rating from '../rating/Rating'
import { RouterOutput } from '@/app/_trpc/client'
import {PhotoProvider, PhotoView} from "react-photo-view";
import dayjs from 'dayjs'
import { ScrollArea } from '../ui/scroll-area';

interface FullReviewProps {
    revieww: RouterOutput["review"]["getModeratedReviews"][number]
}

const FullReview: FC<FullReviewProps> = ({ revieww }) => {

    return (
        <div className='select-none flex flex-col text-center py-4 px-3 items-center gap-y-1 rounded-[8px] overflow-hidden bg-white'>
            <h3 className="font-bold text-base md:text-lg">{revieww?.name}</h3>
                <span className="text-lightGray text-sm md:text-base">{dayjs(Number(revieww?.createdAt)).format('DD.MM.YYYY')}</span>
                <div className='pb-2'>
                    <Rating
                        rating={revieww?.rating}
                        type="display"
                    />
                </div>
                <div>
                    {[revieww?.file, revieww?.file2, revieww?.file3] ?
                        <div className={'flex gap-4'}>
                            <PhotoProvider>
                                {[revieww?.file, revieww?.file2, revieww?.file3]?.map((item, index) => (
                                    item &&
                                    <PhotoView key={index} src={item as string | undefined}>
                                        <img src={item as string | undefined} alt=""
                                            className={'w-[60px] h-[60px] rounded cursor-pointer'}/>
                                    </PhotoView>
                                ))}
                            </PhotoProvider>
                        </div>
                        : null
                    }
                </div>
                <ScrollArea className={'max-h-[35vh] mt-4'}>
                    <p className='text-sm md:text-base max-h-[500px]'>
                        {
                            revieww?.comment
                        }
                    </p>
                </ScrollArea>
        </div>
    )
}

export default FullReview
