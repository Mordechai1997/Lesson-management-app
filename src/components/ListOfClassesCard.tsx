'use client'
import Student from "@/types/student";

import RowStudentCard from "./RowStudentCard";
import Class from "@/types/classe";
import RowClasseCard from "./RowClasseCard";

interface ListOfClassesProps {
    classes: Class[];
    student: Student;
    initAllData: () => void;
}

export default function ListOfClassesCard(props: ListOfClassesProps) {


    return (

        <div className="m-auto w-11/12 divide-y divide-gray-200 dark:divide-gray-700">
            {
                props?.classes?.map((item: Class, index: number) => {
                    return (
                        <RowClasseCard initAllData={props.initAllData} classe={item} key={index} student={props.student} />
                    )
                })
            }

        </div>

    )
}
