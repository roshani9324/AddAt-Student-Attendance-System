"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { user } = useKindeBrowserClient();
  const firstLetter = user?.given_name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="shadow-sm border p-4 flex justify-between bg-orange-100">
      <div></div>

      <div>
        {user?.picture ? (
          <Image
            src={user.picture}
            width={35}
            height={35}
            alt="user"
            className="rounded-full"
          />
        ) : (
          <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-orange-300 text-white font-semibold">
            {firstLetter}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
