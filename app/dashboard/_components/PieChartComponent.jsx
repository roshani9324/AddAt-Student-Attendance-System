"use client";
import { getUniqueRecord } from "@/app/_services/service";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts";

function PieChartComponent({ attendanceList }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    calculateAttendancePercentage();
  }, [attendanceList]);

  const calculateAttendancePercentage = () => {
    setLoading(true);

    if (!attendanceList?.length) {
      setNoData(true);
      setLoading(false);
      return;
    }

    const totalSt = getUniqueRecord({ attendanceList });

    const today = Number(moment().format("D"));
    const totalPossibleEntries = totalSt.length * today;

    if (totalPossibleEntries === 0) {
      setNoData(true);
      setLoading(false);
      return;
    }

    const presentPerc = (attendanceList.length / totalPossibleEntries) * 100;

    const chartData = [
      {
        name: "Total Present",
        value: Number(presentPerc.toFixed(1)),
        fill: "#f97316",
      },
      {
        name: "Total Absent",
        value: 100 - Number(presentPerc.toFixed(1)),
        fill: "#14b8a6",
      },
    ];

    setData(chartData);
    setNoData(false);
    setLoading(false);
  };

  return (
    <div className="p-5 rounded-4xl bg-orange-50 border-2 border-orange-200 min-h-[300px]">
      <h1 className="mb-4 ml-2 font-bold text-lg text-orange-900">
        Monthly Attendance
      </h1>
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
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default PieChartComponent;