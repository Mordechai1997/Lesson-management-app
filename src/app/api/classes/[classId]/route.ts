import { NextRequest, NextResponse } from "next/server";
import { firestore } from '@/firebase';
import { title } from "process";
import Post from "@/types/post";
import Student from "@/types/student";
import Class from "@/types/classe";

export async function PUT(request: NextRequest, context: { params: { classId: string } }) {
    try {
        const myClass: Class = await request.json();
        if (!(context.params.classId && myClass)) {
            return new NextResponse("Bad request", { status: 400 });
        }
        const data = await firestore.collection('classes').doc(context.params.classId).set({
            ...myClass
        })
        return NextResponse.json({
            message: "העדכון עבר בהצלחה",
        })

    } catch (err) {
        return new NextResponse("שגיאה כללית", { status: 500 });
    }

}
export async function GET(request: NextRequest, context: { params: { classId: string } }) {
    try {
        const document: FirebaseFirestore.QuerySnapshot = await firestore.collection('classes')
            .orderBy('date', 'desc')
            .where('studentID', '==', context.params.classId)
            .where('isPaid', '==', false)
            .get();
            
        const classes = document.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        return NextResponse.json({ classes })
    }
    catch (err) {
        console.log(err);
        return new NextResponse((err as Error).message, { status: 500 });
    }
}