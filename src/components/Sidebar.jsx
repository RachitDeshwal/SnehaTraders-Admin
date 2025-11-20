import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { TbTruckReturn } from "react-icons/tb";

const Sidebar = () => {
  let navigate = useNavigate();
  return (
    <div className="w-[20%] min-h-[100vh] border-r-[1px] py-[60px] fixed left-0 top-0 ">
      <div className="flex flex-col gap-4 pt-[40px] pl-[20%] text-[15px] ">
        <div
          className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] "
          onClick={() => navigate("/add")}
        >
          <IoIosAddCircleOutline className="h-[30px] w-[30px]" />
          <p className="hidden md:block ">Add Items </p>
        </div>
        <div
          className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] "
          onClick={() => navigate("/lists")}
        >
          <CiViewList className="h-[30px] w-[30px]" />
          <p className="hidden md:block ">List Items </p>
        </div>
        <div
          className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] "
          onClick={() => navigate("/orders")}
        >
          <SiTicktick className="h-[30px] w-[30px]" />
          <p className="hidden md:block ">View Orders </p>
        </div>
        <div
          className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89] "
          onClick={() => navigate("/returns")}
        >
          <TbTruckReturn className="h-[30px] w-[30px]" />
          <p className="hidden md:block ">View Return </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
