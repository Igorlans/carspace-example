import { FC } from 'react'
import { BiSolidLeaf } from "react-icons/bi"
interface EmptyListProps {
  message: string
}

const EmptyList: FC<EmptyListProps> = ({ message }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <BiSolidLeaf className="text-[52px]"/>
        <p>{ message }</p>
    </div>
  )
}

export default EmptyList