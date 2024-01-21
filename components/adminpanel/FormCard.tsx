import React, {FC, Ref} from 'react';
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";


interface IFormCardProps {
    children: React.ReactNode,
    className?: string,
}

const FormCard: FC<IFormCardProps> = ({children, className,  ...props}) => {
    return (
        <Card className={cn('p-8 border-blue-200', className)} {...props}>
            {children}
        </Card>
    );
};

export default FormCard;