'use client';
import Student from '@/types/student';
import Link from 'next/link';
import { useState } from 'react';
import edit_icon from '../../public/edit_icon.svg';
import home_icon from '../../public/home_icon.svg';
import delete_icon from '../../public/delete_icon.svg';
import view_icon from '../../public/view_icon.svg';



import Image from 'next/image';

interface NavBarProfileProps {
    student: Student;

}

export default function NavBarProfile(props: NavBarProfileProps) {
    const [navbar, setNavbar] = useState(false);

    const fullName = props.student.firstName + ' ' + props.student.lastName;
    return (
        <nav className="w-full shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <h2 className="text-2xl flex items-center font-bold flex">
                            <Link href={{ pathname: `/student/${props.student?.id}/viewForm` }} >
                                <Image
                                    className='btn-svg ml-2 cursor-pointer'
                                    priority
                                    src={view_icon}
                                    alt="profile icon"
                                />
                            </Link>
                            <span>{fullName}</span>
                        </h2>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-y-0">
                            <li className="500 ml-2">
                                <Link href="/" className="flex cursor-pointer">
                                    <Image
                                        className='btn-svg ml-2'
                                        priority
                                        src={home_icon}
                                        alt="profile icon"
                                    />
                                    <p className='ml-2'>עמוד הבית </p>
                                </Link>
                            </li>
                            <li className="500 ml-2">
                                <Link href="/about" className="flex cursor-pointer">
                                    <Image
                                        className='btn-svg ml-2'
                                        priority
                                        src={edit_icon}
                                        alt="profile icon"
                                    />
                                    <p className='ml-2'>עדכון פרטים </p>
                                </Link>
                            </li>
                            <li className="500 flex cursor-pointer ml-2">
                                <Image
                                    className='btn-svg ml-2'
                                    priority
                                    src={delete_icon}
                                    alt="profile icon"
                                />
                                <p className='ml-2'>מחיקה</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}