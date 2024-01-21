import React, {FC, HTMLAttributes} from 'react';
import {cn} from "@/lib/utils";
const List: FC<HTMLAttributes<'div'>> = ({children, ...props}) => {
    return (
        <div className={cn('flex flex-col gap-6', props.className)}>
            {children}
        </div>
    );
};

export default List;