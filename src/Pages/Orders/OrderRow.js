import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const OrderRow = ({ order, handleDelete, handelStatusUpdate }) => {
  const {
    _id,
    serviceName,
    service,
    price,
    customer,
    email,
    yourPhone,
    massage,
    status,
  } = order;

  const [orderService, setOrderService] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/services/${service}`)
      .then((res) => res.json())
      .then((data) => setOrderService(data));
  }, [service]);

  return (
    <tr>
      <th>
        <label>
          <button onClick={() => handleDelete(_id)} className="btn btn-ghost">
            X
          </button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded w-24 h-24">
              {orderService?.img && (
                <img
                  src={orderService?.img}
                  alt="Avatar Tailwind CSS Component"
                />
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <button
              onClick={() => handelStatusUpdate(_id)}
              className="text-sm opacity-50 bg-sky-500 px-2 rounded-full text-white py-1 cursor-pointer"
            >
              {status ? status : "pending"}
            </button>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="badge badge-ghost badge-sm">$ {price}</span>
      </td>
      <td>{email}</td>
      <th>
        <button className="btn btn-ghost btn-xs">{massage}</button>
      </th>
    </tr>
  );
};

export default OrderRow;
