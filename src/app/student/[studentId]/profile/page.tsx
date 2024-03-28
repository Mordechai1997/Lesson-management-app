'use client'
import Student from "@/types/student";
import { getStudent } from "@/services/students";
import { useEffect, useRef, useState } from "react";
import { getClassesOfStudent } from '@/services/classes';
import Class from '@/types/classe';
import ListOfClassesCard from '@/components/ListOfClassesCard';
import RulerBtnProfile from "@/components/RulerBtnProfile";
import BtnAddNewClass from "@/components/BtnAddNewClass";
import ClassForm from "@/components/ClassForm";
import NavBarProfile from "@/components/NavBarProfile";
import BalanceView from "@/components/BalanceView";
import BtnAddNewPay from "@/components/BtnAddNewPay";
import AddPayment from "@/components/AddPayment";

interface PostView {
    params: {
        studentId: string;
    }
}

export default function StudentProfile(props: PostView) {

    const [allClasses, setAllClasses] = useState<Class[]>([]);
    const [student, setStudent] = useState<Student | undefined>();
    const [handleClickBtnAddClass, setHandleClickBtnAddClass] = useState<boolean>(false);
    const [handleClickBtnAddPayment, setHandleClickBtnAddPayment] = useState<boolean>(false);


    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initAllData();
            initialized.current = true
        }
    }, [])

    const initAllData = async () => {

        const classes: Class[] = await getClassesOfStudent(props.params.studentId);
        const tempStudent: Student = await getStudent(props.params.studentId);

        setAllClasses(classes);
        setStudent(tempStudent);
    }
    const handleAddClassBtn = (isInitAllData: boolean = false) => {
        if (isInitAllData)
            initAllData();

        setHandleClickBtnAddPayment(false)
        setHandleClickBtnAddClass(prev => !prev);
    }
    const handleAddPayment = (isInitAllData: boolean = false) => {
        
        if (isInitAllData)
            initAllData();

        setHandleClickBtnAddClass(false);
        setHandleClickBtnAddPayment(prev => !prev);

    }

    return (
        <>
            {
                student &&
                <>
                    <NavBarProfile student={student} />
                    <div className="m-auto w-11/12 divide-y divide-gray-200 dark:divide-gray-700">
                        <BalanceView balance={student.balance} />
                        <div className=' w-full flex'>
                            <BtnAddNewClass handleClickBtn={handleAddClassBtn} isBtnOpen={handleClickBtnAddClass} />
                            <BtnAddNewPay handleClickBtn={handleAddPayment} isBtnOpen={handleClickBtnAddPayment} />
                        </div>
                        {handleClickBtnAddClass && <ClassForm student={student} handleClose={handleAddClassBtn} />}
                        {handleClickBtnAddPayment && <AddPayment student={student} handleClose={handleAddPayment} />}
                        <ListOfClassesCard initAllData={initAllData} classes={allClasses} student={student} />
                    </div>
                </>

            }
        </>

    )
}
