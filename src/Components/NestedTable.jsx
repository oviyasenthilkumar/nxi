import React, { useState } from "react";
import { Link } from "react-router-dom";
import tableData from "./TableData"; // Import the JSON data
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import Header from "./Header";
import { PlusCircle, Plus } from "lucide-react";

const NestedTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    attributes: [{ name: "attribute1", value: "" }],
    parent: "",
  });
  const [data, setData] = useState(tableData);
  const [rotated, setRotated] = useState(false);

  const toggleExpand = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleOpenModal = (parentPath) => {
    setFormData({
      name: "",
      description: "",
      attributes: [{ name: "attribute1", value: "" }],
      parent: parentPath
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      description: "",
      attributes: [{ name: "attribute1", value: "" }],
      parent: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (index, value) => {
    setFormData(prev => {
      const newAttributes = [...prev.attributes];
      newAttributes[index] = { ...newAttributes[index], value };
      return { ...prev, attributes: newAttributes };
    });
  };

  const addAttribute = () => {
    if (formData.attributes.length < 4) {
      setFormData(prev => ({
        ...prev,
        attributes: [...prev.attributes, { name: `attribute${prev.attributes.length + 1}`, value: "" }]
      }));
    }
  };

  const addChild = (items, parentPath, currentPath = []) => {
    for (let item of items) {
      const newPath = [...currentPath, item.name];

      if (newPath.join(" > ") === parentPath) {
        item.children = item.children || [];
        const attributesObject = formData.attributes.reduce((acc, attr, index) => {
          acc[`attribute${index + 1}`] = attr.value;
          return acc;
        }, {});

        item.children.push({
          name: formData.name,
          description: formData.description,
          ...attributesObject,
          children: [],
        });
        return true;
      }

      if (item.children && addChild(item.children, parentPath, newPath)) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = [...data];
    const attributesObject = formData.attributes.reduce((acc, attr, index) => {
      acc[`attribute${index + 1}`] = attr.value;
      return acc;
    }, {});

    if (formData.parent === "") {
      updatedData.push({
        name: formData.name,
        description: formData.description,
        ...attributesObject,
        children: [],
      });
    } else {
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

      // Get attribute keys excluding name, description, and children
      const attributeKeys = Object.keys(item).filter(key => 
        key.startsWith('attribute') && item[key] !== undefined
      );

      return [
        <tr
          key={newPath.join(" > ")}
          className={`text-black ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
        >
          {[...Array(level)].map((_, i) => (
            <td key={i} className="p-2"></td>
          ))}
          <td
            className={`p-2 flex items-center gap-2 ${
              level === 0 ? "font-bold text-red-500" : ""
            }`}
          >
            <span
              className="cursor-pointer"
              onClick={() => toggleExpand(newPath.join(" > "))}
            >
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

          {[...Array(depth - level - 1)].map((_, i) => (
            <td key={i} className="p-2"></td>
          ))}

          <td className="p-2">{item.description || "-"}</td>
          
          {[...Array(4)].map((_, index) => (
            <td key={`attr${index + 1}`} className="p-2">
              {item[`attribute${index + 1}`] || "-"}
            </td>
          ))}
        </tr>,

        isExpanded && item.children && renderRows(item.children, level + 1, newPath),

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
            {[...Array(4)].map((_, i) => (
              <td key={`empty_attr${i}`} className="p-2"></td>
            ))}
          </tr>
        ),

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
            {[...Array(4)].map((_, i) => (
              <td key={`empty_attr${i}`} className="p-2"></td>
            ))}
          </tr>
        )
      ].filter(Boolean);
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Data</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">Parent Name:</label>
                  <input
                    type="text"
                    name="parent"
                    value={formData.parent}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded bg-gray-200 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Description:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 h-20"
                    required
                  ></textarea>
                </div>

                <div className="space-y-3">
                  {formData.attributes.map((attr, index) => (
                    <div key={index}>
                      <label className="block mb-2 text-gray-700">
                        Attribute {index + 1}:
                      </label>
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) => handleAttributeChange(index, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                        placeholder={`Enter attribute ${index + 1}`}
                      />
                    </div>
                  ))}
                  
                  {formData.attributes.length < 4 && (
                    <button
                      type="button"
                      onClick={addAttribute}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mt-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Attribute
                    </button>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NestedTable;
