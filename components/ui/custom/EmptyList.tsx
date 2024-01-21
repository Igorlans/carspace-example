import { FC } from 'react'
import { BiSolidLeaf } from "react-icons/bi"
import { cn } from '@/lib/utils';

interface EmptyListProps {
  className?: string;
  message: string
}

const EmptyList: FC<EmptyListProps> = ({ message, className }) => {
  return (
    <div className={cn('w-full flex flex-col items-center justify-center', className)}>
        <BiSolidLeaf className="text-[45px]"/>
        <p>{ message }</p>
    </div>
  )
}

export default EmptyList