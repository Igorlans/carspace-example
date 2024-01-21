import React, {FC} from 'react';

interface IPageTitleProps {
    description?: string | null;
    title: string;
    children?: React.ReactNode
    icon?: React.ReactNode
}
const PageTitle: FC<IPageTitleProps> = ({title, description, children, icon}) => {
    return (
        <div className={'flex gap-6 flex-wrap justify-between items-center border-b border-blue-200 pb-3'}>
            <div className={'flex-col'}>
                <div className={'flex gap-3 items-center text-black text-3xl font-bold mb-3 uppercase'}>
                    {icon}
                    {title}
                </div>
                {description &&
                    <div className={'text-gray-500 text-sm'}>
                        {description}
                    </div>
                }
            </div>
            {children}
        </div>

    );
};

export default PageTitle;