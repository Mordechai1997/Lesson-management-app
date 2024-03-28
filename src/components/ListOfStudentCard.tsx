'use client'
import Student from "@/types/student";

import RowStudentCard from "./RowStudentCard";

interface ListOfStudentProps {
    students: Student[];
}

export default function ListOfStudentCard(props: ListOfStudentProps) {


    return (

        <div className="m-auto w-11/12 divide-y divide-gray-200 dark:divide-gray-700">
            {
                props?.students?.map((item: Student, index: number) => {
                    return (
                        <RowStudentCard student={item} key={index} fromProfilePage={false}/>
                    )
                })
            }

        </div>

    )
}
