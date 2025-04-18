"use client";
import { getUniqueRecord } from "@/app/_services/service";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";

function StatusList({ attendanceList }) {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentPercentage, setPresentPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (attendanceList?.length) {
      const totalSt = getUniqueRecord({ attendanceList });
      const total = totalSt.length;
      const today = Number(moment().format("D"));
      const presentPerc = (attendanceList.length / (total * today)) * 100;

      setTotalStudents(total);
      setPresentPercentage(presentPerc);
    } else {
      setTotalStudents(0);
      setPresentPercentage(0);
    }

    setLoading(false);
  }, [attendanceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      <Card
        icon={<GraduationCap />}
        title="Total Students"
        value={totalStudents}
        loading={loading}
      />
      <Card
        icon={<TrendingUp />}
        title="Total Present"
        value={presentPercentage.toFixed(1) + " %"}
        loading={loading}
      />
      <Card
        icon={<TrendingDown />}
        title="Total Absent"
        value={
          totalStudents > 0
            ? (100 - presentPercentage).toFixed(1) + " %"
            : "0.0 %"
        }
        loading={loading}
      />
    </div>
  );
}

export default StatusList;