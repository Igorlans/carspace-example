'use client'
import Link from "next/link";
import {LinkProps} from "next/link";
import {FC, HTMLAttributes} from "react";
import {usePathname} from "next/navigation";

interface INavLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: HTMLAttributes<'div' | 'a'>['className'];
    isMobile?: boolean;
}
const NavLink: FC<INavLinkProps> = ({children, isMobile=false, ...props}) => {

    const pathname = usePathname();
    const isActive = pathname === props.href;

    if (isMobile) {
        return (
            <div className={isActive ? 'text-blue-600' : ''}>
                {children}
            </div>
        );
    } else {
        return (
            <Link {...props} className={isActive ? 'text-blue-600' : ''}>
                {children}
            </Link>
        );

    }


};

export default NavLink;