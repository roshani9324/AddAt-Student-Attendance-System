"use client";
import React, { useEffect, useState } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import globalApi from "@/app/_services/globalApi";
import StudentListTable from "./_components/StudentListTable";

const Student = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    GetAllStudentsList();
  }, []);

  const GetAllStudentsList = () => {
    globalApi.GetAllStudents().then((res) => {
      setStudentList(res);
    });
  };

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl flex justify-between items-center text-orange-900">
        Students
        <AddNewStudent refreshData={GetAllStudentsList} />
      </h1>

      <StudentListTable
        studentList={studentList}
        refreshData={GetAllStudentsList}
      />
    </div>
  );
};

export default Student;
