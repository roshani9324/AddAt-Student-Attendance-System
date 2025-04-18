"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutDashboard, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SideNav = () => {
  const { user } = useKindeBrowserClient();

  const menulist = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings2,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();
  const firstLetter = user?.given_name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="border shadow-md h-screen p-5 bg-orange-50">
      {/* Logo Section */}
      <div className="flex gap-1 items-center">
        <div className="relative w-[80px] h-[50px]">
          <Image src="/logo.svg" alt="logo" fill />
        </div>

        <h1 className="text-3xl italic font-bold text-orange-700">AddAt</h1>
      </div>

      <hr className="my-5" />

      {/* Menu List */}
      {menulist.map((menu) => (
        <Link key={menu.id} href={menu.path} className="block">
          <h2
            className={`flex items-center gap-4 px-4 py-3 text-md text-slate-600 
            hover:bg-orange-300 hover:text-slate-950 rounded-xl cursor-pointer my-2 ${
              path == menu.path && "bg-orange-300 text-slate-950"
            }`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      {/* User Profile */}
      <div className="mt-5 flex items-center gap-3 fixed bottom-8 p-2">
        {user?.picture ? (
          <Image
            src={user.picture}
            width={35}
            height={35}
            alt="User Profile"
            className="rounded-full"
            unoptimized
          />
        ) : (
          <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-orange-300 text-white font-semibold">
            {firstLetter}
          </div>
        )}
        <div>
          <h2 className="text-sm font-bold">
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className="text-xs text-slate-500">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
