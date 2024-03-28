'use client'
import * as Loader from "react-loader-spinner";
interface isProcessProps {
    isProcess: boolean
}
export default function LoadingPage( props:  isProcessProps) {
    return <div className="flex justify-center items-center w-full h-screen">
        {
            props.isProcess && <Loader.BallTriangle
                height={100}
                width={100}
                radius={5}
                color="rgb(250 204 21)"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        }

    </div>
}