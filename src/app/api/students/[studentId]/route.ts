import { NextRequest, NextResponse } from "next/server";
import { firestore } from '@/firebase';
import { title } from "process";
import Post from "@/types/post";
import Student from "@/types/student";

export async function GET(request: NextRequest, context: { params: { studentId: string } }) {
    const document: FirebaseFirestore.DocumentSnapshot = await firestore.collection('students').doc(context.params.studentId).get();
    const data = document.data();
    if (!(document.exists && data)) {
        return new NextResponse("Bad request", { status: 400 });
    }
    return NextResponse.json({
        id: document.id,
        ...data
    })

}

export async function PUT(request: NextRequest, context: { params: { studentId: string } }) {
    try {
        const student: Student = await request.json();
        if (!(context.params.studentId && student )) {
            return new NextResponse("Bad request", { status: 400 });
        }
        const data = await firestore.collection('students').doc(context.params.studentId).set({
           ...student
        })
        return NextResponse.json({
            message: "העדכון עבר בהצלחה",
        })

    } catch (err) {
        return new NextResponse("שגיאה כללית", { status: 500 });
    }

}

export async function DELETE(request: NextRequest, context: { params: { studentId: string } }) {
    try {
        if (!context.params.studentId) {
            return new NextResponse("Bad request", { status: 400 });
        }
        await firestore.collection('students').doc(context.params.studentId).delete();
        return NextResponse.json({
            message: "התלמיד הוגדר כעת כלא פעיל",
        })

    } catch (err) {
        return new NextResponse("Internal error", { status: 500 });
    }

}

