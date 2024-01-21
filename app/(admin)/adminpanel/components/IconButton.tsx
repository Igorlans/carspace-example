'use client'

import React, {FC} from "react";
import {Button, ButtonProps} from "@/components/ui/button";
interface IIconButtonProps extends ButtonProps {
    icon: React.ReactNode
}
const IconButton: FC<IIconButtonProps> = ({icon, children, ...props}) => {
    return (
        <Button
            {...props}
        >
            <div
                className={'flex items-center gap-2'}
            >
                {icon}
                {children}
            </div>
        </Button>
    );
};

export default IconButton;