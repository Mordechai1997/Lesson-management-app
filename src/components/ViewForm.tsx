'use client'

import { saveStudent } from "@/services/students";
import { validStudent } from "@/services/valid";
import Student from "@/types/student";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import customToast from '@/app/customToast';
import Link from "next/link";

interface ViewFormProps {
    student?: Student
}

export default function ViewForm(props?: ViewFormProps) {
    const { push } = useRouter();

    const [firstName, setFirstName] = useState<string>(props?.student?.firstName || '');
    const [lastName, setLastName] = useState<string>(props?.student?.lastName || '');
    const [description, setDescription] = useState<string>(props?.student?.description || '');
    const [color, setColor] = useState<string>(props?.student?.color || "");

    const [price, setPrice] = useState<number>(0);
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        initStateFromProps();
    }, [])

    const initStateFromProps = () => {
        
        if (props?.student) {
            const student: Student = props?.student;
            if (student.price)
                setPrice(student.price);
            if (student.discountPercentage)
                setDiscountPercentage(student.discountPercentage);
            if (student.totalPrice)
                setTotalPrice(student.totalPrice);
        }

    }





    return (
        <div className="m-auto w-11/12 mt-5">
            <div className="relative z-0 w-full mb-5 group">
                <input
                    disabled
                    value={firstName}
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">שם פרטי</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    disabled
                    value={lastName}
                    type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">שם משפחה</label>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">מחיר לשיעור</label>
                    <input
                        disabled
                        value={price > 0 ? price : ''}
                        type="number" id="number-input" aria-describedby="helper-text-explanation" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="מחיר לשיעור" required />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="discountPercentage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">אחוז הנחה %</label>
                    <input
                        disabled
                        id="discountPercentage"
                        value={discountPercentage > -1 ? discountPercentage : ''}
                        type="number" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="אחוזי הנחה" />
                </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="total-price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">מחיר סופי לתשלום</label>
                <div id="total-price" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {totalPrice}
                </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="color" disabled
                    value={color}
                    className="rounded-lg  w-full"
                />
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <textarea disabled
                    value={description}
                    name="Description"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    rows={10}
                    placeholder="תיאור חופשי"
                ></textarea>
            </div>
            <div>
                <Link href={`/student/${props?.student?.id}/profile`} className="cursor-pointer m-2 w-auto bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-gray-400 hover:bg-gray-300 focus:ring-gray-400">
                    חזרה 
                </Link>
            </div>
        </div>
    );
}
