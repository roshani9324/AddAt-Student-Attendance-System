"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import globalApi from "@/app/_services/globalApi";
import { toast } from "sonner";

ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50, 100];

function StudentListTable({ studentList, refreshData }) {
  const CustomButton = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild> 
          <Button className="bg-orange-400 hover:bg-orange-600 cursor-pointer rounded-full">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteRecord(props?.data?.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "id",
      filter: true,
      flex: 1,
    },
    {
      field: "name",
      filter: true,
      flex: 1,
    },
    {
      field: "address",
      filter: true,
      flex: 1,
    },
    {
      field: "contact",
      filter: true,
      flex: 1,
    },
    {
      field: "action",
      cellRenderer: CustomButton,
    },
  ]);

  const [rowData, setRowData] = useState();
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    if (studentList) {
      setRowData(studentList);
    }
  }, [studentList]);

  const deleteRecord = (id) => {
    globalApi.DeleteStudentRecord(id).then((res) => {
      if (res) {
        toast("Record Deleted Successfully!");
        refreshData();
      }
    });
  };

  return (
    <div className="my-6">
      <div style={{ height: 500 }}>
        <div className="p-2 rounded-full border-1 border-orange-300 shadow-sm flex gap-2 mb-4 max-w-sm bg-orange-100 text-orange-950">
          <Search />
          <input
            type="text"
            placeholder="Search for Anything . . . ."
            className="outline-none w-full pr-2"
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default StudentListTable;
