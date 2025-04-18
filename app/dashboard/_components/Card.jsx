import React from "react";
import { Loader2 } from "lucide-react";

function Card({ icon, title, value, loading }) {
  return (
    <div className="flex items-center gap-5 bg-orange-200 rounded-3xl shadow-sm p-7 text-orange-950">
      <div className="p-2 h-10 w-10 rounded-full bg-white text-orange-900 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h2 className="font-bold">{title}</h2>
        {loading ? (
          <Loader2 className="animate-spin text-orange-800 mt-1" />
        ) : (
          <h2 className="text-lg">{value}</h2>
        )}
      </div>
    </div>
  );
}

export default Card;
