import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Class from "@/types/classe";
import ClassForm from "./ClassForm";
import Student from "@/types/student";

interface RowClasseCardProps {
    classe: Class;
    student: Student;
    initAllData: () => void;

}

const RowClasseCard: React.FC<RowClasseCardProps> = ({ classe, student, initAllData }) => {
    const initialized = useRef(false);
    const [dateClasse, setDateClasse] = useState<string>(classe.date);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [handleClickBtnAddClass, setHandleClickBtnAddClass] = useState<boolean>(false);

    useEffect(() => {
        if (!initialized.current && classe.date) {
            initDateClass();
            initialized.current = true;
        }
    }, []);

    const initDateClass = () => {

        setTotalPrice((classe.count ?? 0) * (classe.price ?? 0));
    };



    const renderPaymentStatus = () => {
        const paymentStatus = classe.isPaid ? 'שולם' : 'לא שולם';
        const colorClass = classe.isPaid ? 'text-green-500' : 'text-red-500';
        return (
            <p className={`text-m font-medium ${colorClass}`}>{paymentStatus}</p>
        );
    };
    const handleClickBtn = (isInitData: boolean = false) => {
        if (isInitData)
            initAllData()
        setHandleClickBtnAddClass(prev => !prev);
    }
    return (
        <>

            <span className="pb-3 sm:pb-4">
                <div className="flex items-center  mb-2">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate dark:text-white">
                            מתאריך: {dateClasse}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            תשלום: {totalPrice}₪
                        </p>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate dark:text-white">
                            {renderPaymentStatus()}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            לפי מחיר: {classe.price}₪ מספר שיעורים: {classe.count}
                        </p>
                    </div>
                    <span>
                        <span onClick={() => handleClickBtn()}>
                            <span className="w-auto bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-500">
                                <svg className="btn-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </span>
                    </span>
                </div>
            </span>
            {handleClickBtnAddClass && <ClassForm student={student} class={classe} handleClose={handleClickBtn} />}
        </>
    );
};

export default RowClasseCard;
