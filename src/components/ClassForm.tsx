// Imports
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Student from "@/types/student";
import Class from "@/types/classe";
import customToast from '@/app/customToast';
import { saveStudent, updateBalanceStudent } from "@/services/students";
import { validClass, validStudent } from "@/services/valid";
import { saveClass } from "@/services/classes";

// Interfaces / Types
interface TimeState {
    minute: string;
    hour: string;
}

interface ClassFormProps {
    student: Student;
    handleClose: (initAllClasses: boolean) => void;
    class?: Class;
}

// Utility Functions
const custCountToTime = (count: number, minuteClass: number) => {
    const allMinutes = Math.floor(count * minuteClass); // Round down
    let newTimeState: TimeState;

    if (!isNaN(allMinutes)) {
        if (allMinutes >= 60) {
            newTimeState = {
                hour: Math.floor(allMinutes / 60).toString().padStart(2, '0'),
                minute: (allMinutes % 60).toString().padStart(2, '0')
            };
        } else {
            newTimeState = {
                hour: "00",
                minute: allMinutes.toString().padStart(2, '0')
            };
        }
    } else {
        newTimeState = {
            hour: "00",
            minute: "00"
        };
    }

    return newTimeState;
};

const custTimeToCount = (time: string, minuteClass: number) => {
    const [hour, minute] = time.split(":");
    const hours = parseInt(hour);
    const minutes = parseInt(minute);

    if (!isNaN(hours) && !isNaN(minutes)) {
        const valueCount: number = ((hours * 60) + minutes) / minuteClass;
        return Number(valueCount.toFixed(2));
    }

    return 0;
};

// Component Definition
const ClassForm: React.FC<ClassFormProps> = (props) => {
    const router = useRouter();

    const isUpdating: boolean = !!props.class;

    // State variables and hooks
    const [description, setDescription] = useState<string>(props.class?.comment || '');
    const [date, setDate] = useState<string>(props.class?.date?.toString() || new Date().toISOString().substr(0, 10));
    const [isPaid, setIsPaid] = useState<boolean>(props.class?.isPaid || false);
    const [timeState, setTimeState] = useState<TimeState>({ minute: "00", hour: "00" });
    const [count, setCount] = useState<number>(props.class?.count || 0);
    const [totalPrice, setTotalPrice] = useState<number>(props.class ? (props.class?.price * props.class?.count) : 0);

    useEffect(() => {
        if (props.class?.count) {
            customToast.info("יש לשים לב בעדכון שיעור שהיתרה מתעדכנת בהתאם");
            setTimeState(custCountToTime(props.class?.count, props.student.classMinutes))
        }
    }, []);

    // Handler functions
    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueCount = parseFloat(event.target.value);
        const price = props.student.price || 0;

        if (valueCount > 0) {
            const newTimeState: TimeState = custCountToTime(valueCount , props.student.classMinutes);
            setTimeState(newTimeState);
            setCount(valueCount);
            setTotalPrice(Number((valueCount * price).toFixed(2)));
        } else {
            resetForm();
        }
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueTime = event.target.value;
        const valueCount = custTimeToCount(event.target.value , props.student.classMinutes);
        const price = props.student.price || 0;

        if (valueCount > 0) {
            const [hour, minute] = valueTime.split(":");
            const newTimeState: TimeState = { hour, minute };
            setTimeState(newTimeState);
            setCount(valueCount);
            setTotalPrice(Number((valueCount * price).toFixed(2)));
        } else {
            resetForm();
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handlePaidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPaid(event.target.checked);
    };

    const resetForm = () => {
        setTimeState({ minute: "00", hour: "00" });
        setCount(0);
        setTotalPrice(0);
    };

    // Form submission function
    const handleSubmit = async () => {
        const currentDate = new Date();

        let tempClass: Class = {
            id: props?.class?.id,
            studentID: props.student.id ? props.student.id : '',
            price: props.student.price ? props.student.price : 0,
            count: count,
            date: date,
            comment: description,
            isPaid: isPaid,
            AmountPaid: "",
            isActive: true,
            update: currentDate,
        };

        let isValid = validClass(tempClass);

        if (!isValid.success) {
            customToast.error(isValid.message);
            return;
        }

        const response = await saveClass(tempClass);

        // If not paid and creating a new class, update balance
        if (!isUpdating && !isPaid)
            await updateBalanceStudent(props.student, totalPrice);
        // If updating and paid status changed, update balance accordingly
        else if (isUpdating && props.class && props.class.isPaid !== isPaid) {
            if (isPaid)
                await updateBalanceStudent(props.student, totalPrice * -1);
            else
                await updateBalanceStudent(props.student, totalPrice);
        }

        customToast.success(response.message);
        props.handleClose(true);
    };
    const renderPaymentStatus = () => {
        const paymentStatus = isPaid ? 'שולם' : 'לא שולם';
        const colorClass = isPaid ? 'text-green-500' : 'text-red-500';
        return (
            <p className={`text-m font-medium ${colorClass}`}>{paymentStatus}</p>
        );
    };
    // JSX rendering
    return (
        <div className="m-auto w-11/12 mt-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> מספר שיעורים</label>
                    <input
                        type="number"
                        id="number-input"
                        disabled={isUpdating}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="מספר שיעורים"
                        value={count <= 0 ? '' : count}
                        onChange={handleCountChange}
                        required
                    />
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="lesson-duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">משך שיעור</label>
                    <input
                        disabled={isUpdating}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="time"
                        id="lesson-duration"
                        name="lesson-duration"
                        min="00:00"
                        max="09:00"
                        onChange={handleTimeChange}
                        value={`${timeState.hour}:${timeState.minute}`}
                        step={3600}
                        required
                    />
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="lesson-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> תאריך השיעור</label>
                    <input
                        type="date"
                        name="lesson-date"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={date}
                        onChange={handleDateChange}
                    />
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="total-price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">מחיר סופי לתשלום</label>
                    <div id="total-price" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {totalPrice}
                    </div>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="lesson-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">תיאור חופשי</label>
                    <textarea
                        value={description}
                        name="lesson-description"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows={1}
                        placeholder="תיאור חופשי"
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>

                <div className="flex justify-center items-center relative z-0 w-full mb-5 group">
                    <span>
                        <label
                            htmlFor="lesson-paid"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            {renderPaymentStatus()}
                        </label>
                        <label className="switch cursor-pointer ">
                            <input
                                className="cursor-pointer"
                                checked={isPaid}
                                onChange={handlePaidChange}
                                type="checkbox" />
                            <span className="slider round cursor-pointer"></span>
                        </label>
                    </span>
                </div>
            </div>

            <div className="flex justify-center items-center mb-5">
                <span className="cursor-pointer m-2 w-auto bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-blue-500 hover:bg-blue-400 focus:ring-blue-500" onClick={handleSubmit}>
                    {props.class ? 'עדכן' : 'הוסף'}
                </span>
                <span onClick={() => props.handleClose(false)} className="cursor-pointer m-2 w-auto bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-gray-400 hover:bg-gray-300 focus:ring-gray-400">
                    ביטול
                </span>
            </div>
        </div>
    );
};

export default ClassForm;
