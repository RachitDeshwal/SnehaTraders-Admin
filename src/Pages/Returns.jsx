import { useState, useEffect } from "react";
import axios from "axios";
import { SiEbox } from "react-icons/si";
import Sidebar from "../components/Sidebar.jsx";
import Nav from "../components/Nav.jsx";
import { serverURL } from "../main.jsx";

const Returns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({});
  const [orderData, setOrderData] = useState({});
  const [usersData, setUsersData] = useState({});

  const fetchAllReturns = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${serverURL}/api/returns/allreturns`, {
        withCredentials: true,
      });
      const returnList = result.data.reverse();
      setReturns(returnList);
      // fetch related data for all returns
      fetchAllDetails(returnList);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDetails = async (returnList) => {
    try {
      for (const ret of returnList) {
        if (ret.product && !productData[ret.product])
          getProductData(ret.product);
        if (ret.order && !orderData[ret.order]) getOrderData(ret.order);
        if (ret.user && !usersData[ret.user]) getUserData(ret.user);
      }
    } catch (err) {
      console.log("Error fetching details:", err);
    }
  };

  const getProductData = async (id) => {
    try {
      const res = await axios.get(`${serverURL}/api/product/get/${id}`, {
        withCredentials: true,
      });
      setProductData((prev) => ({ ...prev, [id]: res.data }));
    } catch (err) {
      console.log(err);
    }
  };

  const getOrderData = async (id) => {
    try {
      const res = await axios.get(`${serverURL}/api/order/get/${id}`, {
        withCredentials: true,
      });
      setOrderData((prev) => ({ ...prev, [id]: res.data }));
    } catch (err) {
      console.log(err);
    }
  };

  const getUserData = async (id) => {
    try {
      const res = await axios.get(`${serverURL}/api/user/get/${id}`, {
        withCredentials: true,
      });
      setUsersData((prev) => ({ ...prev, [id]: res.data }));
    } catch (err) {
      console.log(err);
    }
  };

  const updateReturnStatus = async (id, field, value) => {
    try {
      await axios.put(
        `${serverURL}/api/returns/update/${id}`,
        { [field]: value },
        { withCredentials: true }
      );
      fetchAllReturns(); // refresh after update
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllReturns();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] text-white">
      <Nav />
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="lg:w-[85%] md:w-[70%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[30px] py-[50px] px-[30px] ml-[150px]">
          <h2 className="text-[40px] mb-[20px] text-white font-semibold">
            All Return Requests
          </h2>

          {loading ? (
            <p className="text-center text-lg text-gray-200">Loading...</p>
          ) : returns.length === 0 ? (
            <p className="text-center text-gray-300">
              No return requests found.
            </p>
          ) : (
            returns.map((ret) => {
              const product = productData[ret.product];
              const order = orderData[ret.order];
              const user = usersData[ret.user];

              return (
                <div
                  key={ret._id}
                  className="w-[90%] bg-[#3f3735] rounded-xl p-[20px] flex flex-col lg:flex-row gap-[20px] justify-between items-start lg:items-center"
                >
                  <div className="flex gap-[15px] items-start">
                    <img
                      className="w-[100px] h-[100px]  text-black   rounded-lg"
                      src={product?.image1}
                    />
                    <div>
                      <p className="text-gray-400 text-[18px] font-semibold">
                        {product?.name?.toUpperCase() || "Product"}
                      </p>
                      <p className="text-sm text-gray-300">
                        Reason: {ret.reason}
                      </p>
                      <p className="text-sm text-gray-300">
                        Requested by: {user?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-400">
                        Order ID: {order?._id || ret.order}
                      </p>
                      <p className="text-sm text-gray-400">
                        Date: {new Date(ret.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px] text-[15px]">
                    <label className="font-semibold">Status:</label>
                    <select
                      value={ret.status}
                      className="px-[8px] py-[6px] rounded-md bg-[#735344] border border-[#96eef3]"
                      onChange={(e) =>
                        updateReturnStatus(ret._id, "status", e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Refunded">Refunded</option>
                    </select>

                    <label className="font-semibold mt-[10px]">
                      Admin Note:
                    </label>
                    <textarea
                      className="w-[200px] h-[80px] bg-[#735344] rounded-md p-[5px] text-sm text-white border border-[#96eef3]"
                      value={ret.adminNote || ""}
                      placeholder="Add admin note..."
                      onChange={(e) =>
                        updateReturnStatus(ret._id, "adminNote", e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Returns;
