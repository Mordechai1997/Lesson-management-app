'use client'
import Student from "@/types/student";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteStudent } from "@/services/students";
import customToast from '@/app/customToast';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import profile_icon from '../../public/profile_icon.svg'
import Image from "next/image";

interface RowStudentCardProps {
    student: Student;
    fromProfilePage: boolean;
}

export default function RowStudentCard(props: RowStudentCardProps) {

    const { push } = useRouter();

    const handleDelete = async (id: string) => {

        if (!id) {
            customToast.error("שגחאה כללית")
            return;
        }

        const res = await deleteStudent(id);
        if (res && res.message) {
            customToast.success(res.message);
            push('/');
        }
        else
            customToast.error("Error")

    }
    return (

        <span className="pb-3 sm:pb-4" style={{ color: `${props.student.color ? props.student.color : '#black'}` }}>
            <div className="flex items-center">
                {
                    props.fromProfilePage ||
                    <Link href={{ pathname: `/student/${props.student.id}/profile` }} >
                        <span className="m-2 w-auto bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-200 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-yellow-500 hover:bg-yellow-300 focus:ring-yellow-400">
                            <Image
                                className="btn-svg"
                                priority
                                src={profile_icon}
                                alt="profile icon"
                            />
                        </span>
                    </Link>
                }


                <div className="flex-1 min-w-0">
                    {
                        props.fromProfilePage ?
                            <p className="text-sm font-medium truncate dark:text-white">
                                {props?.student.firstName + " " + props?.student.lastName}
                            </p>
                            :
                            <Link href={{ pathname: `/student/${props.student.id}/profile` }} >
                                <p className="text-sm font-medium truncate dark:text-white">
                                    {props?.student.firstName + " " + props?.student.lastName}
                                </p>
                            </Link>
                    }
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {props?.student.description}
                    </p>
                </div>
                <span>
                    <Link href={{ pathname: `/student/${props.student.id}/edit` }} >
                        <span className="m-2 w-auto bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-500">
                            <svg className="btn-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </Link>
                    {
                        props.fromProfilePage || <span className="w-fit h-fit cursor-pointer m-2 w-auto bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-red-500 hover:bg-red-400 focus:ring-red-500">
                            <Popup trigger={
                                <svg
                                    className="btn-svg"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>}>
                                <div>
                                    <p>האם את/ה בטוח/ה שברצונך למחוק את התלמיד לצמיתות?</p>
                                    <button
                                        className="w-fit h-fit cursor-pointer m-1 w-auto bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-blue-500 hover:bg-blue-400 focus:ring-blue-500"
                                        onClick={() => handleDelete(props.student.id ? props.student.id : '')}>כן</button>

                                </div>
                            </Popup>
                        </span>
                    }

                </span>
            </div>


        </span>
    )


}
