"use client";
import { getUniqueRecord } from "@/app/_services/service";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartComponent({ attendanceList, totalPresentData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    formatAttendanceListCount();
  }, [attendanceList, totalPresentData]);

  const formatAttendanceListCount = () => {
    setLoading(true);

    if (!attendanceList || !totalPresentData) {
      setNoData(true);
      setLoading(false);
      return;
    }

    const totalStudent = getUniqueRecord({ attendanceList });

    const result = totalPresentData.map((item) => ({
      day: item.day,
      presentCount: item.presentCount,
      absentCount: Number(totalStudent?.length) - Number(item.presentCount),
    }));

    if (result.length === 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }

    setData(result);
    setLoading(false);
  };

  return (
    <div className="p-5 border-2 border-orange-200 rounded-4xl shadow-sm bg-orange-50 min-h-[300px]">
      <h1 className="mb-4 ml-2 font-bold text-lg text-orange-900">Attendance</h1>

      <div className="w-full h-[300px] flex items-center justify-center">
        {loading ? (
          <p className="text-orange-500 text-lg font-medium animate-pulse">
            Loading attendance data...
          </p>
        ) : noData ? (
          <p className="text-orange-700 text-lg font-semibold">
            No attendance data available.
          </p>
        ) : (
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="presentCount" name="Present Students" fill="#f97316" />
              <Bar dataKey="absentCount" name="Absent Students" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default BarChartComponent;
