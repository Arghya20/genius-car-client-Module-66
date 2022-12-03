import React from "react";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handelPlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const yourPhone = form.yourPhone.value;
    const email = form.email.value;
    const massage = form.massage.value;
    console.log(firstName, lastName, yourPhone, email, massage);
    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: firstName,
      email,
      yourPhone,
      massage,
    };
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("order placed successfully ✅");
          form.reset();
        }
      })
      .catch((error) => console.log(error.massage));
  };

  return (
    <div>
      <form onSubmit={handelPlaceOrder}>
        <h2 className="text-4xl font-semibold mb-2">
          Your are about to order:{" "}
          <span className="text-orange-600">{title}</span>
        </h2>
        <h3 className="text-xl mb-4">Price: $ {price}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered input-primary w-full max-w-xs  "
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered input-primary w-full max-w-xs "
          />
          <input
            name="yourPhone"
            type="text"
            placeholder="Your Phone"
            className="input input-bordered input-primary w-full max-w-xs "
          />
          <input
            name="email"
            type="email"
            defaultValue={user?.email}
            readOnly
            placeholder="Your Email"
            className="input input-bordered input-primary w-full max-w-xs "
          />
        </div>
        <textarea
          name="massage"
          className="textarea textarea-primary w-1/2 my-3"
          placeholder="Your Massage"
        ></textarea>
        <input
          className="btn flex my-4"
          type="submit"
          value="Place Your Order"
        />
      </form>
    </div>
  );
};

export default Checkout;
