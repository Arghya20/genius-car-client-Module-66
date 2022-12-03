import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { _id, img, title, price } = service;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="flex justify-evenly items-center mt-4 text-orange-600 px-1">
          {" "}
          <p className="text-xl font-semibold">Price: $ {price}</p>
          <Link to={`/checkout/${_id}`}>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
