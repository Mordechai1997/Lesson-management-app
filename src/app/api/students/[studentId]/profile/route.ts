import { NextRequest, NextResponse } from "next/server";
import { firestore } from '@/firebase';
import { title } from "process";
import Post from "@/types/post";
import Student from "@/types/student";

export async function GET(request: NextRequest, context: { params: { studentId: string } }) {
    try {

        const document: FirebaseFirestore.QuerySnapshot = await firestore.collection('classes')
            .orderBy('date', 'desc')
            .where('studentID', '==', context.params.studentId)
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
