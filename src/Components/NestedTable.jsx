import React, { useState } from "react";
import { Link } from "react-router-dom";
import tableData from "./TableData"; // Import the JSON data
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import Header from "./Header";
import { PlusCircle } from "lucide-react";

const NestedTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    attribute1: "",
    attribute2: "",
    attribute3: "",
    attribute4: "",
    parent: "",
  });
  const [data, setData] = useState(tableData);
  const [rotated, setRotated] = useState(false);

  const toggleExpand = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleOpenModal = (parentPath) => {
    setFormData({ ...formData, parent: parentPath });
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      description: "",
      parent: "",
      attribute1: "",
      attribute2: "",
      attribute3: "",
      attribute4: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const addChild = (items, parentPath, currentPath = []) => {
  //   for (let item of items) {
  //     const newPath = [...currentPath, item.name]; // Build full path

  //     if (newPath.join(" > ") === parentPath) {
  //       // Match full path
  //       item.children = item.children || [];
  //       item.children.push({
  //         name: formData.name,
  //         description: formData.description,
  //       });
  //       return true;
  //     }

  //     if (item.children && addChild(item.children, parentPath, newPath)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };
  const addChild = (items, parentPath, currentPath = []) => {
    for (let item of items) {
      const newPath = [...currentPath, item.name];

      if (newPath.join(" > ") === parentPath) {
        item.children = item.children || [];
        item.children.push({
          name: formData.name,
          description: formData.description,
          attribute1: formData.attribute1,
          attribute2: formData.attribute2,
          attribute3: formData.attribute3,
          attribute4: formData.attribute4,
          children: [], // Ensure new entries have a children array
        });
        return true;
      }

      if (item.children && addChild(item.children, parentPath, newPath)) {
        return true;
      }
    }
    return false;
  };



//  const handleSubmit = (e) => {
//    e.preventDefault();
//    const updatedData = [...data];

//    if (formData.parent === "") {
//      // If parentPath is empty, add new L1 parent
//      updatedData.push({
//        name: formData.name,
//        description: formData.description,
//        children: [],
//      });
//    } else {
//      // Otherwise, add a child at the correct level
//      addChild(updatedData, formData.parent);
//    }

//    setData(updatedData);
//    handleCloseModal();
//  };
const handleSubmit = (e) => {
  e.preventDefault();
  const updatedData = [...data];

  if (formData.parent === "") {
    // If no parent is selected, add as a top-level parent
    updatedData.push({
      name: formData.name,
      description: formData.description,
      attribute1: formData.attribute1,
      attribute2: formData.attribute2,
      attribute3: formData.attribute3,
      attribute4: formData.attribute4,
      children: [],
    });
  } else {
    // Add as a child of the selected parent
    addChild(updatedData, formData.parent);
  }

  setData(updatedData);
  handleCloseModal();
};

 const renderRows = (items, level = 0, parentPath = []) => {
  return items.flatMap((item, index, arr) => {
    const newPath = [...parentPath, item.name];
    const isExpanded = expanded[newPath.join(" > ")];
    const isLastItem = index === arr.length - 1;
    const hasChildren = item.children && item.children.length > 0;

    return [
      // Main row with attributes
      <tr
        key={newPath.join(" > ")}
        className={`text-black ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
      >
        {[...Array(level)].map((_, i) => (
          <td key={i} className="p-2"></td>
        ))}
        {/* <td className="p-2">↳</td> */}
        <td
          className={`p-2 flex items-center gap-2 ${
            level === 0 ? "font-bold text-red-500" : ""
          }`}
        >
          <span
            className="cursor-pointer"
            onClick={() => toggleExpand(newPath.join(" > "))}
          >
            {/* {hasChildren ? (
              isExpanded ? (
                <IoMdArrowDropdown />
              ) : (
                <IoMdArrowDropright />
              )
            ) : (
              <IoMdArrowDropright />
            )} */}
            {hasChildren || isExpanded ? (
              isExpanded ? (
                <IoMdArrowDropdown />
              ) : (
                <IoMdArrowDropright />
              )
            ) : (
              <IoMdArrowDropright />
            )}
          </span>
          <span>{item.name}</span>
        </td>

        {/* Dynamic columns to maintain proper table width */}
        {[...Array(depth - level - 1)].map((_, i) => (
          <td key={i} className="p-2"></td>
        ))}

        {/* Fetch and display the attributes */}
        <td className="p-2">{item.description || "-"}</td>
        <td className="p-2">{item.attribute1 || "-"}</td>
        <td className="p-2">{item.attribute2 || "-"}</td>
        <td className="p-2">{item.attribute3 || "-"}</td>
        <td className="p-2">{item.attribute4 || "-"}</td>
      </tr>,

      // Recursively render children if expanded
      ...(isExpanded
        ? renderRows(item.children || [], level + 1, newPath)
        : []),

      // "+" row for adding new children under expanded parent
      isExpanded && (
        <tr key={`${newPath.join(" > ")}_add`} className="bg-gray-200">
          {[...Array(level + 1)].map((_, i) => (
            <td key={i} className="p-2"></td>
          ))}
          <td
            className="p-2 text-green-400 cursor-pointer text-center"
            onClick={() => handleOpenModal(newPath.join(" > "))}
          >
            <button
              title="Add New"
              className="group cursor-pointer outline-none duration-300"
              onMouseEnter={() => setRotated(true)}
              onMouseLeave={() => setRotated(false)}
            >
              <PlusCircle
                size={30}
                className={`stroke-zinc-400 fill-none duration-300 group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 ${
                  rotated ? "rotate-90" : ""
                }`}
              />
            </button>
          </td>
          {[...Array(depth - level - 1)].map((_, i) => (
            <td key={i} className="p-2"></td>
          ))}
          <td className="p-2"></td>

          {/* Empty attribute columns for alignment */}
          <td className="p-2"></td>
          <td className="p-2"></td>
          <td className="p-2"></td>
          <td className="p-2"></td>
        </tr>
      ),

      // "+" row below last L1 item
      level === 0 && isLastItem && (
        <tr key={`${newPath.join(" > ")}_add_L1`} className="bg-gray-200">
          <td
            className="p-2 text-green-400 cursor-pointer text-center"
            onClick={() => handleOpenModal("")}
          >
            <button
              title="Add New"
              className="group cursor-pointer outline-none duration-300"
              onMouseEnter={() => setRotated(true)}
              onMouseLeave={() => setRotated(false)}
            >
              <PlusCircle
                size={30}
                className={`stroke-zinc-400 fill-none duration-300 group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 ${
                  rotated ? "rotate-90" : ""
                }`}
              />
            </button>
          </td>
          {[...Array(depth)].map((_, i) => (
            <td key={i} className="p-2"></td>
          ))}
          <td className="p-2"></td>

          {/* Empty attribute columns for alignment */}
          <td className="p-2"></td>
          <td className="p-2"></td>
          <td className="p-2"></td>
          <td className="p-2"></td>
        </tr>
      ),
    ];
  });
};

  const maxDepth = (items, depth = 1) => {
    return items.reduce((max, item) => {
      if (item.children) {
        return Math.max(max, maxDepth(item.children, depth + 1));
      }
      return max;
    }, depth);
  };


  const depth = maxDepth(data);

  return (
    <>
  <Header />
  <div className="p-4 bg-gray-100 text-gray-900">
    <h2 className="text-xl font-bold">Nested Arrays Directory</h2>
    <table className="w-full border-collapse mt-2 bg-white shadow-md">
      <thead>
        <tr className="bg-gray-300">
          <th className="p-2 "># ID</th>
          <th className="p-2 ">Array Name</th>
          <th className="p-2 ">Dimension Description</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-50 text-center ">
          <td className="p-2">Array 1</td>
          <td className="p-2">Vegetables</td>
          <td className="p-2">...</td>
        </tr>
        <tr className="bg-white text-center ">
          <td className="p-2">Array 2</td>
          <td className="p-2">Fruits</td>
          <td className="p-2">...</td>
        </tr>
        <tr className="bg-gray-50 text-center ">
          <td className="p-2">Array 3</td>
          <td className="p-2">Nuts</td>
          <td className="p-2">...</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="overflow-x-auto p-4 bg-gray-100">
    <h2 className="text-xl font-bold text-gray-900 m-2">Nested Arrays Creator-Editor</h2>
    <table className="w-full border-collapse bg-white shadow-md">
      <thead>
        <tr className="bg-gray-300 text-left">
          {[...Array(depth)].map((_, i) => (
            <th key={i} className="p-2 ">L{i + 1}</th>
          ))}
          <th className="p-2 ">Description</th>
          <th className="p-2 ">Attribute 1</th>
          <th className="p-2 ">Attribute 2</th>
          <th className="p-2 ">Attribute 3</th>
          <th className="p-2 ">Attribute 4</th>
        </tr>
      </thead>
      <tbody>{renderRows(data)}</tbody>
    </table>
  </div>

  {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-5 rounded-lg w-[30%] shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">Add New Data</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-700">Parent Name:</label>
          <input
            type="text"
            name="parent"
            value={formData.parent}
            disabled
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-gray-200 text-gray-900"
          />

          <label className="block mb-2 text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-900"
            required
          />

          <label className="block mb-2 text-gray-700">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-900 h-20"
            required
          ></textarea>

          <label className="block mb-2 text-gray-700">Attribute 1:</label>
          <input
            type="text"
            name="attribute1"
            value={formData.attribute1}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-900"
          />

          <label className="block mb-2 text-gray-700">Attribute 2:</label>
          <input
            type="text"
            name="attribute2"
            value={formData.attribute2}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-900"
          />

          <label className="block mb-2 text-gray-700">Attribute 3:</label>
          <input
            type="text"
            name="attribute3"
            value={formData.attribute3}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-900"
          />

          <label className="block mb-2 text-gray-700">Attribute 4:</label>
          <input
            type="text"
            name="attribute4"
            value={formData.attribute4}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-900"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</>

    // <>
    //   {/* <Link to="/entities">
    //     <button className="relative m-5 border px-4 py-2 shadow-md transition cursor-pointer">
    //       UI Change
    //     </button>
    //   </Link> */}
    //   <Header />
    //   {/* Nested Arrays Directory Table */}
    //   <div className="p-4 bg-gray-700 text-white">
    //     <h2 className="text-xl font-bold">nested arrays directory</h2>
    //     <table className="w-full border-collapse mt-2">
    //       <thead>
    //         <tr className="bg-gray-900">
    //           <th className="p-2"># id</th>
    //           <th className="p-2">array name</th>
    //           <th className="p-2">dimension description</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr className="bg-gray-800 text-center">
    //           <td className="p-2">array 1</td>
    //           <td className="p-2">vegetables</td>
    //           <td className="p-2">...</td>
    //         </tr>
    //         <tr className="bg-gray-800 text-center">
    //           <td className="p-2">array 2</td>
    //           <td className="p-2">fruits</td>
    //           <td className="p-2">...</td>
    //         </tr>
    //         <tr className="bg-gray-800 text-center">
    //           <td className="p-2">array 3</td>
    //           <td className="p-2">nuts</td>
    //           <td className="p-2">...</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>

    //   <div className="overflow-x-auto p-4 bg-gray-700">
    //     <h2 className="text-xl font-bold text-white m-2">
    //       {" "}
    //       nested arrays creator-editor{" "}
    //     </h2>
    //     <table className="w-full border-collapse text-white">
    //       <thead>
    //         <tr className="bg-gray-900 text-left">
    //           {/* <th className="p-2"></th> Indentation column */}
    //           {[...Array(depth)].map((_, i) => (
    //             <th key={i} className="p-2">
    //               L{i + 1}
    //             </th>
    //           ))}
    //           <th className="p-2">Description</th> {/* Keep description */}
    //           <th className="p-2">Attribute 1</th>
    //           <th className="p-2">Attribute 2</th>
    //           <th className="p-2">Attribute 3</th>
    //           <th className="p-2">Attribute 4</th>
    //         </tr>
    //       </thead>
    //       <tbody>{renderRows(data)}</tbody>
    //     </table>
    //   </div>

    //   {/* {showModal && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //       <div className="bg-white p-5 rounded-lg w-[30%]">
    //         <h2 className="text-xl font-bold">Add New Data</h2>
    //         <form onSubmit={handleSubmit}>
    //           <label className="block mb-2">Parent Name:</label>
    //           <input
    //             type="text"
    //             name="parent"
    //             value={formData.parent}
    //             disabled
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
    //           />

    //           <label className="block mb-2">Name:</label>
    //           <input
    //             type="text"
    //             name="name"
    //             value={formData.name}
    //             onChange={handleInputChange}
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
    //             required
    //           />

    //           <label className="block mb-2">Description:</label>
    //           <textarea
    //             name="description"
    //             value={formData.description}
    //             onChange={handleInputChange}
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white h-20"
    //             required
    //           ></textarea>

    //           <div className="flex justify-end gap-2">
    //             <button
    //               type="button"
    //               className="bg-gray-500 text-white px-4 py-2 rounded"
    //               onClick={handleCloseModal}
    //             >
    //               Cancel
    //             </button>
    //             <button
    //               type="submit"
    //               className="bg-blue-500 text-white px-4 py-2 rounded"
    //             >
    //               Save
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   )} */}
    //   {showModal && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //       <div className="bg-white p-5 rounded-lg w-[30%]">
    //         <h2 className="text-xl font-bold">Add New Data</h2>
    //         <form onSubmit={handleSubmit}>
    //           <label className="block mb-2">Parent Name:</label>
    //           <input
    //             type="text"
    //             name="parent"
    //             value={formData.parent}
    //             disabled
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
    //           />

    //           <label className="block mb-2">Name:</label>
    //           <input
    //             type="text"
    //             name="name"
    //             value={formData.name}
    //             onChange={handleInputChange}
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
    //             required
    //           />

    //           <label className="block mb-2">Description:</label>
    //           <textarea
    //             name="description"
    //             value={formData.description}
    //             onChange={handleInputChange}
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white h-20"
    //             required
    //           ></textarea>

    //           {/* Attribute Fields */}
    //           <label className="block mb-2">Attribute 1:</label>
    //           <input
    //             type="text"
    //             name="attribute1"
    //             value={formData.attribute1}
    //             onChange={handleInputChange}
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
    //           />

    //           <label className="block mb-2">Attribute 2:</label>
    //           <input
    //             type="text"
    //             name="attribute2"
    //             value={formData.attribute2}
    //             onChange={handleInputChange}
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
    //           />

    //           <label className="block mb-2">Attribute 3:</label>
    //           <input
    //             type="text"
    //             name="attribute3"
    //             value={formData.attribute3}
    //             onChange={handleInputChange}
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
    //           />

    //           <label className="block mb-2">Attribute 4:</label>
    //           <input
    //             type="text"
    //             name="attribute4"
    //             value={formData.attribute4}
    //             onChange={handleInputChange}
    //             className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
    //           />

    //           <div className="flex justify-end gap-2">
    //             <button
    //               type="button"
    //               className="bg-gray-500 text-white px-4 py-2 rounded"
    //               onClick={handleCloseModal}
    //             >
    //               Cancel
    //             </button>
    //             <button
    //               type="submit"
    //               className="bg-blue-500 text-white px-4 py-2 rounded"
    //             >
    //               Save
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    // </>
  );
};

export default NestedTable;
