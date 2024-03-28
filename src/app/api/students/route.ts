import Post from "@/types/post";
import { NextRequest, NextResponse } from "next/server";
import { firestore } from '@/firebase';
import Student from "@/types/student";

export async function GET() {
    try {
        const snapshot: FirebaseFirestore.QuerySnapshot = await firestore.collection('students')
            .orderBy('createdAt', 'desc')
            .where('isActive', '==', true)
            .get();

        const students = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        return NextResponse.json({ students })
    }
    catch (err) {
        console.log(err);
        return new NextResponse((err as Error).message, { status: 500 });
    }
}
export async function POST(request: NextRequest) {
    try {
        const student: Student = await request.json();
        if (!student) {
            return new NextResponse("Bad request", { status: 400 });
        }
        await firestore.collection('students').doc().set({
            ...student
        })
        return NextResponse.json({
            message: "יששש!! התלמיד החדש התווסף בהצלחה",
        })

    } catch (err) {
        return new NextResponse((err as Error).message, { status: 500 });
    }

}