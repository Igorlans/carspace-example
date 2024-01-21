import { FC } from 'react'
import { BsCheck2 } from "react-icons/bs";

interface SelectedDecorProps {
  type: "default" | "checked"
}

const SelectedDecor: FC<SelectedDecorProps> = ({ type }) => {
  return (
    <div className='w-full h-full absolute border-2 rounded-[4px] border-customPrimary'>
      {
        type === "checked" &&
          <div className='absolute bottom-0 right-0 w-6 pl-1 bg-customPrimary'>
              <BsCheck2 className="text-white" />
          </div>
      }
    </div>
  )
}

export default SelectedDecor