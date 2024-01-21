import { TbCheckbox } from "react-icons/tb"

export const CheckItem = ( { title } : { title: string } ) => {
    return (
        <li className='w-full h-[50px] cursor-pointer hover:opacity-80 duration-300 flex text-[16px] font-norms items-center gap-x-[20px] px-[13px] py-2 bg-lightBlue rounded-[10px] md:w-fit text-customPrimary'>
            <TbCheckbox className="text-[30px] shrink-0"/>
            <span className="text-base">{title}</span>
        </li>
    )
}
export const TextItem = ( { title, descr } : { title: string, descr: string } ) => {
    return (
        <li className='flex flex-col font-norms gap-y-[20px] text-customPrimary'>
            <h3 className='w-fit cursor-default font-dela text-[25px]'>{title}</h3>
            <p className='text-[16px] font-light'>{descr}</p>
        </li>
    )
}

export const TableRow = ( { title, descr, decorated = false } : { title: string, descr: string, decorated?: boolean } ) => {
    return (
        <li className={`grid font-light grid-cols-2 py-3 px-4 rounded-[4px] ${decorated && "bg-[#F8F9FF]"}`}>
            <h3 className='cursor-default text-sm md:text-xl'>{title}</h3>
            <p className='text-sm md:text-xl justify-self-end md:justify-self-start text-right md:text-left'>{descr}</p>
        </li>
    )
}
