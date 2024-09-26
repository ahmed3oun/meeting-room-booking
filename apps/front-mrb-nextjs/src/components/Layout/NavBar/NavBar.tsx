'use client';
import { useCallback, useState } from 'react';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { StyledNavLink } from '@/components/Layout/NavBar/NavLink';
import Login from '@/components/Login/Login';
import isLoggedIn from '@/_services/is-logged-in'


export default function NavBar() {

    const [_isLoggedIn] = useState<boolean | undefined>(isLoggedIn());

    const [navbarItems] = useState<any[]>([
        { scroll: true, ref: '/#home', label: 'Home', isShown: true },
        { scroll: true, ref: '/#about', label: 'About', isShown: true },
        { scroll: true, ref: '/#contact', label: 'Contact', isShown: true },
        {
            scroll: false,
            ref: '/rooms',
            label: 'Spaces',
            prefetch: false,
            isShown: true
        },
        {
            scroll: false,
            ref: '/booking/all',
            label: 'Bookings',
            prefetch: false,
            isShown: _isLoggedIn
        },
        {
            scroll: false,
            ref: '/setting-account',
            label: 'Profile',
            prefetch: false,
            isShown: _isLoggedIn
        }
    ]);
    const [isMenuShown, setIsMenuShown] = useState(false);
    const pathname = usePathname();
    const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname);
    const toggleOpen = useCallback(
        () => setIsMenuShown(!isMenuShown),
        [isMenuShown]
    );
    return (
        <>
            <button
                className="block md:hidden absolute right-8 top-6 z-50"
                onClick={toggleOpen}
            >
                <div className="space-y-2.5">
                    {(isMenuShown
                        ? [
                            'rotate-45 translate-y-[14.5px]',
                            'opacity-0 h-0',
                            '-rotate-45 translate-y-[-14.5px]',
                        ]
                        : ['', '', '']
                    ).map((className, index) => (
                        <span
                            key={index}
                            className={
                                'block h-[3px] w-8 bg-gray-800 rounded transform transition duration-500 ease-in-out ' +
                                className
                            }
                        ></span>
                    ))}
                </div>
            </button>
            <nav
                className={`${isMenuShown ? 'max-md:w-full' : 'max-md:w-0 max-md:opacity-0'
                    } w-full transition-all duration-500 ease-in-out md:block overflow-hidden max-md:absolute max-md:animate-sideways-once max-md:h-screen max-md:bg-gray-800 max-md:pt-24 z-40 top-0 right-0`}
            >
                <ul className="flex flex-col items-center md:flex-row gap-10 md:gap-4 min-[900px]:gap-5 lg:gap-8 start text-md leading-[22px] px-6">
                    {navbarItems.map(({ ref, label, scroll, prefetch, isShown }) => (
                        <li key={ref} className="relative">
                            {isShown && <StyledNavLink
                                isActive={ref === linkRef}
                                href={ref}
                                onClick={() => {
                                    setLinkRef(ref);
                                    setIsMenuShown(false);
                                }}
                                scroll={scroll}
                                prefetch={prefetch}
                            >
                                {label}
                            </StyledNavLink>}
                            <span className="absolute -bottom-5 md:hidden w-48 left-[calc(50%_-_theme(space.24))]" />
                        </li>
                    ))}
                    <li className="order-first md:order-last justify-end grow">
                        <div className="flex flex-nowrap text-highlight gap-2 sm:justify-end justify-center items-center">
                            
                                <Login onActionClick={() => setIsMenuShown(false)} />

                            
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}
