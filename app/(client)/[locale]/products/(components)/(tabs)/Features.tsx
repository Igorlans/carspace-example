import {FC} from 'react'

import {TableRow} from './tabsUi'
import {FullProduct} from "@/types/product";

interface FeaturesProps {
    specs: FullProduct['specs']
}

const Features: FC<FeaturesProps> = ({specs}) => {
    if (!specs?.length) return

    return (
        <div className='max-w-[1100px] flex flex-col gap-y-6 pt-6 pb-4'>
            <div className='font-norms font-bold text-xl text-underline w-fit cursor-default text-customPrimary'>
                Технические характеристики
            </div>
            <ul className='flex flex-col gap-y-2 productCard rounded-[8px] p-4'>
                {
                    specs?.map((item, i) => (
                        <TableRow
                            key={i}
                            title={item.title as string}
                            descr={item.value as string}
                            decorated={i % 2 === 0}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default Features