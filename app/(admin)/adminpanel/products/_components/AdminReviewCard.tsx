import { FC } from 'react'
import Rating from '@/components/rating/Rating';
import {cn} from '@/lib/utils';
import 'react-photo-view/dist/react-photo-view.css';
import { RouterOutput } from '@/app/_trpc/client';
import dayjs from 'dayjs';
import Image from 'next/image';

// import "./style.css";
import { Button } from '@/components/ui/button';
interface AdminReviewCardProps {
    revieww: RouterOutput["review"]["getModeratedReviews"][number]
    className?: string;
    onClick?: () => void;
}

const AdminReviewCard: FC<AdminReviewCardProps> = ({ revieww, onClick, className}) => {
    return (
        <div
                onClick={onClick}
                className={cn('review-gradient-overlay select-none flex flex-col text-center py-4 px-3 items-center gap-y-1 rounded-[8px] w-full overflow-hidden bg-white productCard', className)}
                style={{width: "100%"}}
            >
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
                                {[revieww?.file, revieww?.file2, revieww?.file3]?.map((item, index) => (
                                    item &&
                                    <div className='relative w-[60px] h-[60px]' key={index}>
                                        <Image
                                            fill
                                            src={item as string} alt=""
                                            className={' rounded cursor-pointer'}
                                        />
                                    </div>
                                ))}
                        </div>
                        : null
                    }
                </div>

                <p className='text-sm md:text-base text-hidden'>
                    {
                        revieww?.comment
                    }
                </p>
            </div>
    )
}

export default AdminReviewCard