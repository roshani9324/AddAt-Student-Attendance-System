"use client";
import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { addMonths } from "date-fns";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";

function MonthSelection({ selectedMonth }) {
  const today = new Date();
  const nextMonths = addMonths(today, 0);

  const [month, setMonth] = useState(nextMonths);

  useEffect(() => {
    selectedMonth(month);
  }, []);
  

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex gap-2 items-center bg-orange-100 hover:bg-orange-200 cursor-pointer border-1 border-orange-300 shadow-sm rounded-full text-orange-950 ">
            <CalendarDays className="h-5 w-5" />
            {moment(month).format("MMM YYYY")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(value) => {
              selectedMonth(value);
              setMonth(value);
            }}
            className="flex flex-1 justify-center"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MonthSelection;
