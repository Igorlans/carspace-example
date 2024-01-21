'use client'
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import {CgMenu} from 'react-icons/cg'
import {HiOutlineHome} from 'react-icons/hi'
import {RiLogoutBoxLine} from 'react-icons/ri'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";
import NavLink from "@/app/(admin)/adminpanel/components/NavLink";

const Header = () => {
    const router = useRouter()

    return (
        <Card className={'mt-2 w-full p-6 flex justify-between border-blue-200'}>
            <div className={'flex items-center justify-center gap-12'}>
                <div className={'hidden md:flex gap-6 items-center'}>
                    <NavLink className={'uppercase'} href={'/adminpanel'}>Главная</NavLink>
                    <NavLink className={'uppercase'} href={'/adminpanel/category'}>Категории</NavLink>
                    <NavLink className={'uppercase'} href={'/adminpanel/products'}>Продукты</NavLink>
                    <NavLink className={'uppercase'} href={'/adminpanel/orders'}>Заказы</NavLink>
                    <NavLink className={'uppercase'} href={'/adminpanel/promocodes'}>Промокоды</NavLink>
                    <NavLink className={'uppercase'} href={'/adminpanel/questions'}>Вопросы</NavLink>
                    <NavLink className={'uppercase'} href={'/adminpanel/reviews'}>Отзывы</NavLink>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className={'md:hidden'}>
                    <CgMenu className={'text-3xl'}/>
                    {/*МЕНЮ*/}
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'mr-2 min-w-[200px]'}>
                    <DropdownMenuLabel className={'text-lg py-4'}>МЕНЮ</DropdownMenuLabel>
                    <DropdownMenuSeparator/>

                    <DropdownMenuItem className={'text-lg py-4'} onClick={() => router.push('/adminpanel')}>
                        <NavLink isMobile href={'/adminpanel'}>
                            <div className={'flex items-center gap-2'}>
                                <HiOutlineHome className={'text-xl'}/>
                                Главная
                            </div>
                        </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className={'text-lg py-4'} onClick={() => signOut()}>
                        <div className={'flex items-center gap-2'}>
                            <RiLogoutBoxLine className={'text-xl'}/>
                            Выйти
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button className={'hidden md:block'} variant={'outline'} onClick={() => signOut()}>
            Выйти
            </Button>


        </Card>
    );
};

export default Header;
