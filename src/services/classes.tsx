import Post from "@/types/post";
import { SERVER_URL, BASE_ROUTE } from '../constants';
import Student from "@/types/student";
import { stringify } from "querystring";
import { validClass, validStudent } from "@/services/valid";
import Class from "@/types/classe";


export async function getClassesOfStudent(studentId: string) {
    const responce = await fetch(`${SERVER_URL}/${BASE_ROUTE.STUDENTS}/${studentId}/${BASE_ROUTE.PROFILE}`, {
        next: { revalidate: 3 }
    })
    const data = await responce.json();
    return data.classes;
}
export async function saveClass(myClass: Class) {
    try {
        let isValid = validClass(myClass);
        if(!isValid.success){
            return isValid;
        }
        const method = myClass?.id ? 'PUT' : 'POST';
        
        if(!myClass?.id){
            myClass.create = new Date();
        }

        const responce = await fetch(`${SERVER_URL}/${BASE_ROUTE.CLASSES}${myClass?.id ? '/' + myClass?.id : ''}`, {
            method: method,
            body: JSON.stringify(myClass),
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
