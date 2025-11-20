import React from "react";
import Nav from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";

import axios from "axios";
import { useEffect, useState } from "react";
import { serverURL } from "../main.jsx";

const Lists = () => {
  const [lists, setLists] = useState([]);
  const fetchList = async () => {
    try {
      const result = await axios.get(
        `${serverURL}/api/product/list`,
        {},
        { withCrediantials: true }
      );
      setLists(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const removeList = async (id) => {
    try {
      const result = await axios.post(
        `${serverURL}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      );
      if (result.data) {
        fetchList();
      } else {
        console.log("failed remove list");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] text-white">
      <Nav />

      <div className="w-full h-full flex">
        <Sidebar />

        <div className="w-full lg:w-[82%] h-full lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[30px] px-[10px] sm:px-[30px] sm:w-[70%] md:px-[40px] ml-[150px] mr-[20px]">
          <div className="text-[22px] sm:text-[28px] md:text-[40px] mb-[20px]">
            All listed Products
          </div>

          {lists.length > 0 ? (
            lists.map((item, index) => (
              <div
                key={index}
                className="w-full max-w-[700px] bg-[#3f3735] flex items-center justify-between rounded-lg p-[10px] md:p-[20px] gap-[10px] sm:gap-[20px]"
              >
                {/* Image */}
                <img
                  src={item.image1}
                  alt=""
                  className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-lg object-cover"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col gap-[2px]">
                  <div className="text-[14px] sm:text-[16px] md:text-[20px] text-[#bef0f3]">
                    {item.name}
                  </div>
                  <div className="text-[13px] sm:text-[15px] md:text-[17px] text-[#bef3da]">
                    {item.category}
                  </div>
                  <div className="text-[13px] sm:text-[15px] md:text-[17px] text-[#bef3da]">
                    ₹{item.price}
                  </div>
                </div>

                {/* Remove button */}
                <button
                  className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px] flex items-center justify-center rounded-md hover:bg-red-300 hover:text-black cursor-pointer"
                  onClick={() => removeList(item._id)}
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lists;
