import React, { useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, product: "Product 1", amount: 2, total: 200 },
    { id: 2, product: "Product 2", amount: 1, total: 200 },
  ]);

  return (
    <div>
      <h1>Order Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.amount}</td>
              <td>{order.total}</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
