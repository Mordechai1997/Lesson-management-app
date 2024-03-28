
'use client'
import Student from "@/types/student";
import { getStudent } from "@/services/students";
import StudentForm from "@/components/StudentForm";
import { useEffect, useState } from "react";
import ViewForm from "@/components/ViewForm";

interface PostView {
  params: {
    studentId: string;
  }
}

export default function StudentEdit(props: PostView) {
  const [student, setStudent] = useState<Student | undefined>();

  useEffect(() => {
    initStudent();
  }, []);

  const initStudent = async () => {
    const tempStudent: Student = await getStudent(props.params.studentId);
    setStudent(tempStudent);
  };

  return (
    <>
      {student && <ViewForm student={student} />}
    </>
  );
}

