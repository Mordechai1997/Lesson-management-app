'use client'

import Link from "next/link"

interface BtnAddNewStudentProps {
    url: string
}

export default function BtnAddNewStudent( props:  BtnAddNewStudentProps ) {

    return (
        <div>
            <Link href={props.url}>
                <span className="justify-center items-center m-auto w-11/12 mb-5 mt-5  bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg justify-center px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-500 flex">
                    <svg className="btn-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" strokeWidth="1.5" />
                        <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>תלמיד חדש</span>
                </span>
            </Link>
        </div>
    )
}
