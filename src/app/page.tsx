'use client'
import _ from 'lodash';
import Student from "@/types/student";
import ListOfStudentCard from "@/components/ListOfStudentCard"
import BtnAddNewStudent from "@/components/BtnAddNewStudent";
import { getStudents } from "@/services/students";
import { useEffect, useRef, useState } from "react";
import InputSearchStudent from "@/components/InputSearchStudent";

export default function Home() {

  const [allData, setAllData] = useState<Student[]>([]);
  const [allStudent, setAllStudent] = useState<Student[]>([]);

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initAllData();
      initialized.current = true
    }
  }, [])

  const initAllData = async () => {
    const students: Student[] = await getStudents();
    setAllData(students)
    setAllStudent(students)
  }

  const searchStudent = (searchText: string, allDataStunts: Student[]) => {

    searchText = searchText.toLocaleLowerCase();

    const newArray = allDataStunts.filter((item: Student) => {
      const lastNameMatch = item.lastName.toLowerCase().includes(searchText);
      if (lastNameMatch) return lastNameMatch;

      const firstNameMatch = item.firstName.toLowerCase().includes(searchText);
      if (firstNameMatch) return firstNameMatch;

      const fullNameMatch = (item.firstName.toLowerCase() + ' ' + item.lastName.toLowerCase()).includes(searchText);
      if (fullNameMatch) return fullNameMatch;

      const descriptionMatch = item.description ? item.description.toLowerCase().includes(searchText) : false;
      if (descriptionMatch) return descriptionMatch;

      return false;
    });

    setAllStudent(newArray)
  }
  const debounceSearch = useRef(_.debounce(searchStudent, 300));

  const handleSearchChange = (searchText: string) => {
    debounceSearch.current(searchText, allData); // Debounced search
  };

  return (
    <div>
      <BtnAddNewStudent url='/student/new'/>
      <InputSearchStudent searchStudent={handleSearchChange} />
      <ListOfStudentCard students={allStudent}  />
    </div>
  )
}
