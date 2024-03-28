'use client'

import Student from "@/types/student";
import Link from "next/link"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { deleteStudent } from "@/services/students";
import customToast from '@/app/customToast';
import { useRouter } from "next/navigation";

interface RulerBtnProfileProps {
    student: Student;

}

export default function RulerBtnProfile(props: RulerBtnProfileProps) {
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
        <div className="w-full flex justify-center items-center">
            <Link href={{ pathname: `/student/${props.student?.id}/viewForm` }} >
                <span className="m-2 w-auto bg-blue-300 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-100 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-blue-200 hover:bg-blue-300 focus:ring-blue-400">
                    <svg className="btn-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="3.5" stroke="#222222" />
                        <path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="#222222" />
                    </svg>
                </span>
            </Link>
            <Link href={{ pathname: `/student/${props.student?.id}/edit` }} >
                <span className="m-2 w-auto bg-yellow-300 hover:bg-yellow-200 focus:ring-4 focus:outline-none focus:ring-yellow-100 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-yellow-200 hover:bg-yellow-300 focus:ring-yellow-400">
                    <svg className="btn-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </Link>
            <Link href='/'>
                <span className="m-2 w-auto bg-yellow-300 hover:bg-yellow-200 focus:ring-4 focus:outline-none focus:ring-yellow-100 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-yellow-200 hover:bg-yellow-300 focus:ring-yellow-400">
                    <svg className="btn-svg"
                        viewBox="0 0 360 360" >
                        <path d="M352.163,163.115L198.919,9.871c-10.449-10.449-27.389-10.449-37.838,0L7.837,163.115c-7.652,7.652-9.94,19.16-5.8,29.158
	c4.142,9.998,13.898,16.516,24.719,16.516h20.762v114.574c0,19.112,15.493,34.603,34.603,34.603h195.758
	c19.11,0,34.603-15.492,34.603-34.603V208.789h20.762c10.821,0,20.578-6.519,24.719-16.516
	C362.103,182.275,359.815,170.767,352.163,163.115z M220.431,307.785h-80.862v-45.583c0-22.33,18.102-40.431,40.431-40.431
	s40.431,18.1,40.431,40.431V307.785z"/>
                    </svg>
                </span>
            </Link>
            <span className="w-fit h-fit cursor-pointer m-2 w-auto bg-red-400 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red-200 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-red-500 hover:bg-red-300 focus:ring-red-400">
                <Popup trigger={
                    <svg
                        className="btn-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        </div>
    )
}
