import React, {FC, HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

interface ITitleProps{
    children: React.ReactNode,
    className?: HTMLAttributes<'div'>['className'],
    icon?: React.ReactNode,
}
const Title: FC<ITitleProps> = ({children, className, icon}) => {
    return (
        <div className={cn('flex items-center gap-3 text-lg font-bold uppercase', className)}>
            {icon}
            {children}
        </div>
    );
};

export default Title;