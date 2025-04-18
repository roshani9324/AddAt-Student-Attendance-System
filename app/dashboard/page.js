"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MonthSelection from "../_components/MonthSelection";
import BranchSelect from "../_components/BranchSelect";
import globalApi from "../_services/globalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import PieChartComponent from "./_components/PieChartComponent";

const BarChartComponent = dynamic(
  () => import("./_components/BarChartComponent"),
  {
    ssr: false,
    loading: () => <p>Loading Chart...</p>,
  }
);

function Dashboard() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedBranch, setSelectedBranch] = useState();
  const [attendanceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState([]);
  const [formattedMonth, setFormattedMonth] = useState("");

  useEffect(() => {
    if (selectedMonth) {
      setFormattedMonth(moment(selectedMonth).format("MM/YYYY"));
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (formattedMonth && selectedBranch) {
      GetTotalPresentCountByDay();
      getStudentAttendance();
    }
  }, [formattedMonth, selectedBranch]);

  const getStudentAttendance = () => {
    globalApi.GetAttendanceList(selectedBranch, formattedMonth).then((res) => {
      setAttendanceList(res);
    });
  };

  const GetTotalPresentCountByDay = () => {
    globalApi
      .TotalPresentCountByDay(selectedBranch, formattedMonth)
      .then((res) => {
        console.log("Total Present Count Response:", res);
        setTotalPresentData(res);
      })
      .catch((err) => console.error("API Fetch Error:", err));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl text-orange-900">Dashboard</h1>

        <div className="flex gap-4 items-center">
          <MonthSelection selectedMonth={(v) => setSelectedMonth(v)} />
          <BranchSelect selectedBranch={(v) => setSelectedBranch(v)} />
        </div>
      </div>

      <StatusList attendanceList={attendanceList} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <BarChartComponent
            attendanceList={attendanceList}
            totalPresentData={totalPresentData}
          />
        </div>

        <div>
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
