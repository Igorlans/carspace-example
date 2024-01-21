'use client'
import {FC, Fragment, ReactNode} from "react";
import {FiChevronRight} from 'react-icons/fi'
import Link from "next-intl/link";

interface IBackButtonProps {
    links: {
        text: string | undefined | ReactNode;
        href: string
    }[]
}

const Breadcrumbs: FC<IBackButtonProps> = ({links}) => {
    const linkLength = links.length;

    return (
        <div className={'flex gap-1 items-center flex-wrap text-sm md:gap-3 md:text-base'}>
            {links?.map((link, index) =>
                <Fragment key={index}>
                    <Link
                        href={link.href}
                        className={'text-gray-400 hover:underline underline-offset-4'}
                    >
                        {link.text}
                    </Link>
                    {
                        index + 1 < linkLength &&
                        <FiChevronRight
                            size={16}
                            className={'p-0 text-gray-500'}
                        />

                    }
                </Fragment>
            )}
        </div>

    );
};

export default Breadcrumbs;