import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import Nav from "../components/Nav.jsx";
import { serverURL } from "../main.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // === Fetch all orders ===
  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        `${serverURL}/api/order/list`,
        {},
        { withCredentials: true }
      );
      setOrders(result.data.reverse());
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  // === Fetch all products ===
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/product/list`, {
        withCredentials: true,
      });
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  // === Change order status ===
  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        `${serverURL}/api/order/status`,
        { orderId, status: e.target.value },
        { withCredentials: true }
      );
      if (result.data) fetchAllOrders();
    } catch (err) {
      console.log(err);
    }
  };

  // === Match product by ID ===
  const getProductById = (productId) => {
    return products.find((prod) => prod._id === productId);
  };

  useEffect(() => {
    fetchAllOrders();
    fetchAllProducts();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] text-white">
      <Nav />
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="lg:w-[85%] md:w-[70%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] px-[20px] w-[70%] ml-[150px] mr-[20px]">
          <div className="text-[28px] md:text-[40px] mb-[20px] text-white">
            All Orders List
          </div>

          {orders.length === 0 ? (
            <p className="text-gray-200">No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div
                key={index}
                className="w-[90%] bg-[#3f3735] rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-[15px] md:px-[25px] gap-[20px]"
              >
                {/* === Product Images Section === */}
                <div className="flex gap-3 overflow-x-auto max-w-[300px]">
                  {order.items.map((item, idx) => {
                    const product = getProductById(item._id);

                    return (
                      <img
                        key={idx}
                        src={product?.image1}
                        alt={item.name || "Product"}
                        className="w-[70px] h-[70px] object-cover rounded-lg border border-gray-300 bg-white"
                      />
                    );
                  })}
                </div>

                {/* === Order Item Details === */}
                <div>
                  <div className="flex flex-col gap-[5px] text-[16px] text-[#56dbfc]">
                    {order.items.map((item, i) => (
                      <p key={i}>
                        {item.name?.toUpperCase() || "UNKNOWN"} ×{" "}
                        {item.quantity}
                        <span className="text-gray-300 ml-1">
                          ({item.size})
                        </span>
                      </p>
                    ))}
                  </div>
                  <div className="text-[15px] text-green-100 mt-[10px]">
                    <p>
                      {order.address.firstName + " " + order.address.lastName}
                    </p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        ", " +
                        order.address.pincode}
                    </p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>

                {/* === Order Info === */}
                <div className="text-[15px] text-green-100 flex flex-col gap-1">
                  <p>Items: {order.items.length}</p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p className="text-[20px] text-white font-semibold">
                    ₹{order.amount}
                  </p>
                </div>

                {/* === Order Status Dropdown === */}
                <select
                  value={order.status}
                  className="px-[10px] py-[8px] bg-[#836057] rounded-lg border border-[#96eef3] text-white"
                  onChange={(e) => statusHandler(e, order._id)}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out of delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
