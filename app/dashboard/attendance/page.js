"use client";
import BranchSelect from "@/app/_components/BranchSelect";
import MonthSelection from "@/app/_components/MonthSelection";
import globalApi from "@/app/_services/globalApi";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import AttendanceGrid from "./_components/AttendanceGrid";

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedBranch, setSelectedBranch] = useState();
  const [attendanceList, setAttendanceList] = useState();

  // used to fetch attendance list based on the given month and branch
  const onSearchHandler = () => {
    const month = moment(selectedMonth).format("MM/YYYY");
    console.log(month);
    globalApi.GetAttendanceList(selectedBranch, month).then((res) => {
      console.log(res);
      setAttendanceList(res);
    });
  };

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl flex justify-between items-center text-orange-900">
        Attendance
      </h1>

      {/* Search Option */}
      <div className="flex gap-6 items-center p-4 px-5 my-5 border rounded-full shadow-sm bg-orange-50">
        <div className="flex gap-2 items-center">
          <label className="font-semibold text-orange-900 ">
            Select Month:
          </label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>


        <div className="flex gap-2 items-center">
          <label className="font-semibold text-orange-900 ">
            Select Branch:
          </label>
          <BranchSelect selectedBranch={(value) => setSelectedBranch(value)} />
        </div>

        <div>
          <Button
            className="flex gap-2 items-center bg-orange-300 hover:bg-orange-400 cursor-pointer border-1 border-orange-400 shadow-sm rounded-full text-orange-950 text-md h-[37px]"
            onClick={() => onSearchHandler()}
          >
            <Search className="h-5 w-5" />
            Search
          </Button>
        </div>
      </div>

      {/* Student Attendance Grid */}
      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} />

    </div>
  );
}

export default Attendance;
