"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import moment from "moment";
import globalApi from "@/app/_services/globalApi";
import { toast } from "sonner";
import { getUniqueRecord } from "@/app/_services/service";

ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth }) {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: "studentId", filter: true },
    { field: "name", filter: true },
  ]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(
    moment(selectedMonth).year(),
    moment(selectedMonth).month()
  );
  const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  useEffect(() => {
    if (attendanceList) {
      const userList = getUniqueRecord({attendanceList});
      setRowData(userList);

      // Reset column definitions before adding new ones
      const baseCols = [
        { field: "studentId", filter: true },
        { field: "name", filter: true },
      ];

      const dayCols = daysArray.map((date) => ({
        field: date.toString(),
        width: 50,
        editable: true, 
      }));

      setColDefs([...baseCols, ...dayCols]);

      userList.forEach((obj) => {
        daysArray.forEach((date) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });
    }
  }, [attendanceList]);

  // used to check if user is present or not
  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.day == day && item.studentId == studentId
    );
    return result ? true : false;
  };

  // used to mark student attendance
  const onMarkAttendance = (day, studentId, present) => {
    const date = moment(selectedMonth).format("MM/YYYY");
    if (present) {
      const data = {
        day: day,
        studentId: studentId,
        present: present,
        date: date,
      };
      globalApi.MarkAttendance(data).then((res) => {
        console.log(res);
        toast("Student Id: " + studentId + " Marked as Present");
      });
    } else {
      globalApi.MarkAbsent(studentId, day, date).then((res) => {
        toast("Student Id: " + studentId + " Marked as Absent");
      });
    }
  };

  return (
    <div>
      <div style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) =>
            onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)
          }
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;
