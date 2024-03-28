import Student from "@/types/student";
import Class from "@/types/classe";

export function validStudent(student: Student) {
    if (!student.firstName)
        return { success: false, message: 'שדה שם פרטי הוא חובה ' };
    if (!student.lastName)
        return { success: false, message: 'שדה שם משפחה הוא חובה ' };
    if (!student.price)
        return { success: false, message: 'שדה מחיר לשיעור הוא חובה ' };
    if (!student.discountPercentage && student.discountPercentage !== 0)
        return { success: false, message: 'שדה אחוז הנחה הוא חובה ' };
    if (student.classMinutes < 1)
        return { success: false, message: 'שדה דקות בשיעור חייב להיות מעל 0 ' };
    return { success: true, message: '' };
}

export function validClass(myClass: Class) {
    if (!myClass.price)
        return { success: false, message: 'לא הוגדר מחיר לשיעור ' };
    if (!myClass.count)
        return { success: false, message: 'יש לבחור מספר שיעורים ' };
    if (!myClass.date)
        return { success: false, message: 'שדה תאריך שיעור הוא חובה ' };


    return { success: true, message: '' };
}