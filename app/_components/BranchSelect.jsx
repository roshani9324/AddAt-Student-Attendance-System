"use client";
import React, { useEffect, useState } from "react";
import globalApi from "@/app/_services/globalApi";

function BranchSelect({ selectedBranch }) {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    globalApi.GetAllBranches().then((res) => {
      if (res && res.length > 0) {
        setBranches(res);
        selectedBranch(res[0].branch);
      }
    });
  }, []);
  

  return (
    <div>
      <div>
        <select
          className="bg-orange-100 hover:bg-orange-200 cursor-pointer border-1 border-orange-300 shadow-sm rounded-full text-orange-950 p-1.5 px-2 outline-none"
          onChange={(e) => selectedBranch(e.target.value)}
        >
          {branches.map((item, index) => (
            <option value={item.branch} key={index}>
              {item.branch}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BranchSelect;
