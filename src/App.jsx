import React, { useState, useEffect } from "react";
import LogoImage from "./assets/Screenshot_1.png";

export default function PurchaseForm() {
  const [form, setForm] = useState({
    date: "",
    itemName: "",
    quantity: "",
    unit: "pcs",
    singlePrice: "",
    totalPrice: "",
    location: "",
    storeName: "",
    phone: "",
  });

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbymZ5eXUTVBjNTqh3UExREMDi3kACRUYE7wkUYHO0-Zox76wYjm8c2OQwUu6mx5gmMbKw/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    if (name === "quantity" || name === "singlePrice") {
      const qty = Number(updatedForm.quantity) || 0;
      const price = Number(updatedForm.singlePrice) || 0;
      updatedForm.totalPrice = qty * price;
    }

    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(form),
      });

      alert("✅Data saved!");

      setForm({
        date: "",
        itemName: "",
        quantity: "",
        unit: "pcs",
        singlePrice: "",
        totalPrice: "",
        location: "",
        storeName: "",
        phone: "",
      });

      fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("❌ There was a problem saving the data!");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (searchText = "") => {
    setIsLoading(true);
    try {
      // Add search parameter to the URL if search text exists
      const url = searchText
        ? `${SCRIPT_URL}?search=${encodeURIComponent(searchText)}`
        : SCRIPT_URL;

      const res = await fetch(url);
      const data = await res.json();
      setRecords(data.records || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("❌ There was a problem loading the data!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchData(search);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <img src={LogoImage} alt="" className="mx-auto h-30 w-100"/>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-400">
          PW Product Purchase Form
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg border border-gray-800 mb-6"
        >
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            name="itemName"
            placeholder="Item Name"
            value={form.itemName}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <div className="flex">
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              className="p-3 border border-gray-700 rounded-l bg-gray-800 text-white w-2/3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="p-3 border border-gray-700 rounded-r bg-gray-800 text-white w-1/3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pcs">pcs</option>
              <option value="kg">kg</option>
              <option value="ream">ream</option>
              <option value="liter">liter</option>
              <option value="dozen">dozen</option>
              <option value="hali">hali</option>
            </select>
          </div>
          <input
            name="singlePrice"
            type="number"
            placeholder="Single Price"
            value={form.singlePrice}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            name="totalPrice"
            type="number"
            placeholder="Total Price"
            value={form.totalPrice}
            readOnly
            className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            name="storeName"
            placeholder="Store Name"
            value={form.storeName}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="col-span-2 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>

       
       

       
      </div>
    </div>
  );
}
