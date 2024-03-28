
'use client';
interface BalanceViewProps {
    balance: number;
}

export default function BalanceView(props: BalanceViewProps) {
    const balance = props.balance * -1;
    return (
        <div className="m-auto w-11/12 ">

            {
                balance > 0 ?
                    <span className="flex justify-center items-center mx-0 my-5">
                        יתרת זכות :
                        <p className='text-green-500'>{balance}</p>
                    </span> : <span className="flex justify-center items-center mx-0 my-5">
                        יתרה לתשלום :
                        <p className={`${ balance < 0 ? 'text-red-500' : ''}`}>{balance}</p>
                    </span>
            }

        </div >
    )
}
