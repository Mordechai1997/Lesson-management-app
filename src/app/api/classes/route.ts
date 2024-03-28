import Post from "@/types/post";
import { NextRequest, NextResponse } from "next/server";
import { firestore } from '@/firebase';
import Student from "@/types/student";
import Class from "@/types/classe";

export async function POST(request: NextRequest) {
    try {
        const myClass: Class = await request.json();
        if (!myClass) {
            return new NextResponse("Bad request", { status: 400 });
        }
        await firestore.collection('classes').doc().set({
            ...myClass
        })
        return NextResponse.json({
            message: "יששש!! השיעור החדש התווסף בהצלחה",
        })

    } catch (err) {
        return new NextResponse((err as Error).message, { status: 500 });
    }

}
