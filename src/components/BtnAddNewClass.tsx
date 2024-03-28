import Image from 'next/image';
import close_icon from '../../public/close_icon.svg';
import add_icon from '../../public/add_icon.svg';
import payment_icon from '../../public/payment_icon.svg';

interface BtnAddNewClassProps {
    handleClickBtn: () => void;
    isBtnOpen: boolean;
}

export default function BtnAddNewClass(props: BtnAddNewClassProps) {

    return (
        <span
            className="font-size-small justify-center items-center w-2/5 cursor-pointer m-auto  mb-5 mt-5  bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg justify-center px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-500 flex"
            onClick={() => props.handleClickBtn()}>
            <Image
                className="btn-svg"
                priority
                src={props.isBtnOpen ? close_icon : add_icon}
                alt="profile icon"
            />

            <p>{props.isBtnOpen ? 'סגירה' : 'הוספת שיעור'}</p>

        </span >

    )
}
