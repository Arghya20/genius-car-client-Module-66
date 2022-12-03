import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [asc, setIsasc] = useState(true);
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  useEffect(() => {
    fetch(
      `http://localhost:5000/services?search=${search}&order=${
        asc ? "asc" : "dsc"
      }`
    )
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [asc, search]);
  const handleSearch = () => {
    setSearch(searchRef.current.value);
  };
  return (
    <div>
      <div className="text-center w-1/2 mx-auto mb-8">
        <p className="text-2xl font-bold text-orange-600">Services</p>
        <h2 className="text-5xl font-semibold">Our Service Area</h2>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.{" "}
        </p>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search here"
          className="input input-bordered input-primary w-full max-w-xs"
        />

        <button onClick={handleSearch} className="btn mr-4 ml-2 bg-purple-500">
          Search
        </button>
        <button className="btn" onClick={() => setIsasc(!asc)}>
          {asc ? "dsc" : "asc"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
