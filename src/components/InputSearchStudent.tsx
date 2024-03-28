'use client'
interface InputSearchStudentProps {
    searchStudent: (searchText: string) => void;
}
export default function InputSearchStudent(props: InputSearchStudentProps) {

    return (
        <div className="m-auto w-11/12 mt-5">
            <input
                onChange={(e)=>props.searchStudent(e.target.value)}
                aria-describedby="helper-text-explanation" className="m-auto w-11/12 mt-5  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="חיפוש תלמיד" />
        </div>
    )
}
