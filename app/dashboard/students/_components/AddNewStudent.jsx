"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import globalApi from "@/app/_services/globalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const AddNewStudent = ({ refreshData }) => {
  const { register, handleSubmit, reset } = useForm();

  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAllBranchesList();
  }, []);

  const GetAllBranchesList = () => {
    globalApi.GetAllBranches().then((res) => {
      if (res) {
        setBranches(res);
      }
    });
  };

  const onSubmit = (data) => {
    setLoading(true);

    globalApi.CreateNewStudent(data).then((res) => {
      if (res) {
        reset();
        refreshData();
        setOpen(false);
        toast("New Student Added!");
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="bg-orange-500 hover:bg-orange-600 cursor-pointer rounded-full"
      >
        + Add New Student
      </Button>

      <Dialog open={open}>
        <DialogContent className="bg-orange-200 rounded-4xl border-2 border-orange-900">
          <DialogHeader>
            <DialogTitle className="text-center">Add New Student</DialogTitle>
            <DialogDescription className="sr-only">
              Add new student details
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-1">
              <label className="text-orange-950 font-semibold ml-1">
                Full Name
              </label>
              <Input
                className="mt-1 bg-orange-50 text-orange-900 rounded-xl border border-orange-900 
               focus:outline-none focus:ring-0 focus:border-orange-900 
               focus-visible:ring-0 focus-visible:border-orange-900"
                placeholder="Ex. Steave Carry"
                {...register("name", { required: true })}
              />
            </div>

            <div className="py-1">
              <label className="text-orange-950 font-semibold ml-1">
                Contact Number
              </label>
              <Input
                className="mt-1 bg-orange-50 text-orange-900 rounded-xl border border-orange-900 
               focus:outline-none focus:ring-0 focus:border-orange-900 
               focus-visible:ring-0 focus-visible:border-orange-900"
                placeholder="Ex. 236523xxxx"
                {...register("contact")}
              />
            </div>

            <div className="py-1">
              <label className="text-orange-950 font-semibold ml-1">
                Address
              </label>
              <Input
                className="mt-1 bg-orange-50 text-orange-900 rounded-xl border border-orange-900 
               focus:outline-none focus:ring-0 focus:border-orange-900 
               focus-visible:ring-0 focus-visible:border-orange-900"
                placeholder="Ex. 525 N Tryon Street, NC"
                {...register("address")}
              />
            </div>

            <div className="py-1 mt-3 gap-4 flex items-center">
              <label className="text-orange-950 font-semibold ml-1">
                Select Branch
              </label>
              <select
                className="bg-orange-50 text-orange-900 rounded-xl border border-orange-900 p-1 px-2 outline-none"
                {...register("branch", { required: true })}
              >
                {branches.map((item, index) => (
                  <option value={item.branch} key={index}>
                    {item.branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <Button
                type="button"
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
                className="bg-gray-400 hover:bg-gray-500 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 rounded-xl"
              >
                {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
