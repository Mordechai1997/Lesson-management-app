import Post from "@/types/post";
import { SERVER_URL, BASE_ROUTE } from '../constants';
import Student from "@/types/student";
import { stringify } from "querystring";
import { validStudent } from "@/services/valid";


export async function getStudents() {
    try {
        const responce = await fetch(`${SERVER_URL}/${BASE_ROUTE.STUDENTS}`, {
            cache: 'no-cache'
        })

        const data = await responce.json();
        return data.students;
    }
    catch (err) {
        console.error(err);
    }
}
export async function getStudent(studentId: string) {
    const responce = await fetch(`${SERVER_URL}/${BASE_ROUTE.STUDENTS}/${studentId}`, {
        next: { revalidate: 3 }
    })
    const data = await responce.json();
    return data;
}
export async function saveStudent(student: Student) {
    try {
        let isValid = validStudent(student);
        if (!isValid.success) {
            return isValid;
        }
        const method = student?.id ? 'PUT' : 'POST';

        if (!student?.id) {
            student.createdAt = new Date();
        }

        const responce = await fetch(`${SERVER_URL}/${BASE_ROUTE.STUDENTS}${student?.id ? '/' + student?.id : ''}`, {
            method: method,
            body: JSON.stringify(student),
        })
        if (!responce.ok) {
            alert("Error");
            return null;
        }
        return responce?.json();
    }
    catch (err) {
        console.error(err);
        alert("Error");

    }

}

export async function updateBalanceStudent(student: Student, totalPrice: number) {
    try {

        student.updateAt = new Date();
        student.balance += totalPrice;

        const responce = await fetch(`${SERVER_URL}/${BASE_ROUTE.STUDENTS}/${student?.id}`, {
            method: 'PUT',
            body: JSON.stringify(student),
        })
        if (!responce.ok) {
            alert("Error");
            return null;
        }
        return responce?.json();
    }
    catch (err) {
        console.error(err);
        alert("Error");

    }

}
export async function deleteStudent(idStudent: string) {
    try {
        const responce = await fetch(`${SERVER_URL}/${BASE_ROUTE.STUDENTS}/${idStudent}`, {
            method: 'DELETE',
        })
        if (!responce.ok) {
            alert("Error");
            return null;
        }
        return responce.json();
    }
    catch (err) {
        console.error(err);
        alert("Error");

    }

}
