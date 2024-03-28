import Image from 'next/image';
import close_icon from '../../public/close_icon.svg';
import payment_icon from '../../public/payment_icon.svg';

interface BtnAddNewPayProps {
    handleClickBtn: () => void;
    isBtnOpen: boolean;
}

export default function BtnAddNewPay(props: BtnAddNewPayProps) {
    return (

        <span
            onClick={() => props.handleClickBtn()}
            className="font-size-small justify-center items-center w-2/5 cursor-pointer m-auto  mb-5 mt-5  bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg justify-center px-4 py-2.5 bg-green-500 hover:bg-green-400 focus:ring-green-500 flex">
            <Image
                className="btn-svg"
                priority
                src={props.isBtnOpen ? close_icon : payment_icon}
                alt="profile icon"
            />
            <p>{props.isBtnOpen ? 'סגירה' : 'שילמו לי'}</p>
        </span>
    )
}
