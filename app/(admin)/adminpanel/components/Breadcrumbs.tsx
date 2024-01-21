'use client'
import {LinkProps} from "next/link";
import {FC, Fragment} from "react";
import {FiChevronRight} from 'react-icons/fi'
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface IBackButtonProps {
    links: {
        text: string;
        href: LinkProps['href'] | undefined
    }[]
}
const Breadcrumbs: FC<IBackButtonProps> = ({links}) => {
    const router = useRouter()
    const linkLength = links.length;

    return (
        <div className={'flex gap-1 items-center mb-4 flex-wrap md:gap-3'}>
            {links?.map((link, index) =>
                <Fragment key={index}>
                    <Button
                        onClick={() => router.push(link.href as string)}
                        variant={'link'}
                        size={'sm'}
                        className={'h-7 p-0 text-gray-400 md:h-9'}
                    >
                        <div>
                            {link.text}
                        </div>
                    </Button>
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