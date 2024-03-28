'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Student from "@/types/student";
import Class from "@/types/classe";
import customToast from '@/app/customToast';
import { saveStudent, updateBalanceStudent } from "@/services/students";
import { validClass, validStudent } from "@/services/valid";
import { saveClass } from "@/services/classes";


interface AddPaymentProps {
    student: Student;
    handleClose: (initAllClasses: boolean) => void;
}


const AddPayment: React.FC<AddPaymentProps> = ({ student, handleClose }) => {

    const [tatalPayment, setTatalPayment] = useState<number>(0);


    const handleTotalPayment = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Ensure the value is parsed as a number
        const payment = parseFloat(event.target.value);
        // Check if it's a valid number before updating state
        if (!isNaN(payment)) {
            setTatalPayment(payment);
        } else {
            customToast.error("יש להזין ערך מספרי חיובי בלבד");
        }
    };

    const handleSubmit = async () => {
        if (!tatalPayment || tatalPayment < 0 || isNaN(tatalPayment)) {
            customToast.error("יש להזין ערך מספרי חיובי בלבד");
        } else {
            await updateBalanceStudent(student, tatalPayment * -1);
            customToast.success("יתרה לתשלום עודכנה בהצלחה!");
            handleClose(true);
        }
    }

    return (
        <div className="m-auto w-11/12 mt-5">
            <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> סכום ששולם</label>
                <input
                    type="number"
                    id="number-input"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="סכום ששולם"
                    value={tatalPayment <= 0 ? '' : tatalPayment}
                    onChange={handleTotalPayment}
                    required
                />
            </div>

            <div className="flex justify-center items-center mb-5">
                <span className="cursor-pointer m-2 w-auto bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-blue-500 hover:bg-blue-400 focus:ring-blue-500" onClick={handleSubmit}>
                    שילמו לי
                </span>
                <span onClick={() => handleClose(false)} className="cursor-pointer m-2 w-auto bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-gray-400 hover:bg-gray-300 focus:ring-gray-400">
                    ביטול
                </span>
            </div>
        </div>
    );
};

export default AddPayment;
