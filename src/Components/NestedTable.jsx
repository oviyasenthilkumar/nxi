// import React, { useState } from "react";

// const NestedTable = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     parent: "",
//   });
//   const [tableData, setTableData] = useState([
//     {
//       name: "Snow fruits",
//       children: [
//         {
//           name: "Apples",
//           children: [
//             {
//               name: "Srinagar",
//               children: ["Hybrid", "GMO", "Organic"].map((item) => ({
//                 name: item,
//                 description: "Sample description for " + item,
//               })),
//             },
//             {
//               name: "Shimla",
//               children: ["Hybrid", "Organic"].map((item) => ({
//                 name: item,
//                 description: "Sample description for " + item,
//               })),
//             },
//             {
//               name: "Queenstown",
//               children: ["Hybrid", "GMO"].map((item) => ({
//                 name: item,
//                 description: "Sample description for " + item,
//               })),
//             },
//             {
//               name: "Ooty",
//               children: ["Organic"].map((item) => ({
//                 name: item,
//                 description: "Sample description for " + item,
//               })),
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   const handleOpenModal = (parentName) => {
//     setFormData({ ...formData, parent: parentName });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setFormData({ name: "", description: "", parent: "" });
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const addChild = (items, parentName) => {
//     for (let item of items) {
//       if (item.name === parentName) {
//         item.children = item.children || [];
//         item.children.push({
//           name: formData.name,
//           description: formData.description,
//         });
//         return true;
//       }
//       if (item.children && addChild(item.children, parentName)) {
//         return true;
//       }
//     }
//     return false;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedData = [...tableData];
//     if (addChild(updatedData, formData.parent)) {
//       setTableData(updatedData);
//     }
//     handleCloseModal();
//   };

//   const renderRows = (items, level = 0, parentKey = "", rowIndex = 0) => {
//     return items.map((item, index) => {
//       const uniqueKey = `${parentKey}-${item.name || item}-${index}`;
//       return (
//         <React.Fragment key={uniqueKey}>
//           <tr className="bg-gray-800">
//             {[...Array(level)].map((_, i) => (
//               <td key={i} className="p-2"></td>
//             ))}
//             <td className="p-2">↳</td>
//             <td
//               className={`p-2 ${level === 0 ? "font-bold text-red-500" : ""}`}
//               colSpan={4 - level}
//             >
//               {item.name || item}
//             </td>
//             {level < 3 && (
//               <td
//                 className="p-2 cursor-pointer text-green-400"
//                 onClick={() => handleOpenModal(item.name)}
//               >
//                 +
//               </td>
//             )}
//             <td className="p-2">{item.description || ""}</td>
//           </tr>
//           {item.children &&
//             renderRows(
//               item.children,
//               level + 1,
//               uniqueKey,
//               rowIndex + index + 1
//             )}
//         </React.Fragment>
//       );
//     });
//   };

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="w-full border-collapse text-white">
//         <thead>
//           <tr className="bg-gray-900 text-left">
//             <th className="p-2"></th>
//             <th className="p-2">L1</th>
//             <th className="p-2">L2</th>
//             <th className="p-2">L3</th>
//             <th className="p-2">LZ</th>
//             <th className="p-2">+</th>
//             <th className="p-2">Description</th>
//           </tr>
//         </thead>
//         <tbody>{renderRows(tableData)}</tbody>
//       </table>
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
//             <h2 className="text-xl font-bold mb-4 text-center">
//               Add New Entity
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <label className="block mb-2">Parent Name:</label>
//               <input
//                 type="text"
//                 name="parent"
//                 value={formData.parent}
//                 disabled
//                 className="w-full p-2 border border-gray-300 rounded mb-4 bg-gray-200"
//               />
//               <label className="block mb-2">Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded mb-4"
//                 required
//               />
//               <label className="block mb-2">Description:</label>
//               <input
//                 type="text"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded mb-4"
//                 required
//               />
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                   onClick={handleCloseModal}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NestedTable;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NestedTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent: "",
  });
  const [tableData, setTableData] = useState([
    {
      name: "Snow fruits",
      children: [
        {
          name: "Apples",
          children: [
            {
              name: "Srinagar",
              children: ["Hybrid", "GMO", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Shimla",
              children: ["Hybrid", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Queenstown",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Ooty",
              children: ["Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "Dry fruits",
      children: [
        {
          name: "Raisins",
          children: [
            {
              name: "Nashik",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Dindigul",
              children: ["Hybrid", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Theni",
              children: ["GMO", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Figs",
          children: [
            {
              name: "Cairo",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Istanbul",
              children: ["Hybrid", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Mangalore",
              children: ["GMO", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Dates",
          children: [
            {
              name: "Dubai",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Tehran",
              children: ["Hybrid", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Sharjah",
              children: ["GMO", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "Nuts",
      children: [
        {
          name: "Cashew",
          children: [
            {
              name: "Panruti",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Kannur",
              children: ["GMO", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Guntur",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Walnut",
          children: [
            {
              name: "Kalaktang",
              children: ["Hybrid", "Organic", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Dheradhun",
              children: ["Organic", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "Tropical Fruits",
      children: [
        {
          name: "Mangoes",
          children: [
            {
              name: "Alphonso",
              children: ["Hybrid", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Kesar",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Badami",
              children: ["Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Papayas",
          children: [
            {
              name: "Red Lady",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Solo",
              children: ["Organic", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "Medicinal Plants",
      children: [
        {
          name: "Aloe Vera",
          children: [
            {
              name: "Indian Aloe",
              children: ["Organic", "Hybrid"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Tulsi",
          children: [
            {
              name: "Rama Tulsi",
              children: ["Organic", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Krishna Tulsi",
              children: ["Hybrid"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "Spices",
      children: [
        {
          name: "Pepper",
          children: [
            {
              name: "Black Pepper",
              children: ["Organic", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "White Pepper",
              children: ["Hybrid", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Cardamom",
          children: [
            {
              name: "Green Cardamom",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Black Cardamom",
              children: ["Organic", "Hybrid"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "Leafy Greens",
      children: [
        {
          name: "Spinach",
          children: [
            {
              name: "Baby Spinach",
              children: ["Organic", "Hydroponic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Savoy Spinach",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Lettuce",
          children: [
            {
              name: "Romaine Lettuce",
              children: ["Organic", "Hydroponic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Iceberg Lettuce",
              children: ["Hybrid", "GMO"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "Exotic Flowers",
      children: [
        {
          name: "Orchids",
          children: [
            {
              name: "Phalaenopsis",
              children: ["Organic", "Hybrid"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Cattleya",
              children: ["GMO", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Lilies",
          children: [
            {
              name: "Tiger Lily",
              children: ["Organic", "Hybrid"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Easter Lily",
              children: ["GMO", "Organic"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "Precious Metals",
      children: [
        {
          name: "Gold",
          children: [
            {
              name: "24K Gold",
              children: ["Pure", "Alloyed"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "18K Gold",
              children: ["Alloyed", "Recycled"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Platinum",
          children: [
            {
              name: "950 Platinum",
              children: ["Pure", "Alloyed"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "900 Platinum",
              children: ["Alloyed", "Recycled"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
    {
      name: "Premium Fabrics",
      children: [
        {
          name: "Silk",
          children: [
            {
              name: "Mulberry Silk",
              children: ["Handwoven", "Machine-made"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Tussar Silk",
              children: ["Organic", "Dyed"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
        {
          name: "Cashmere",
          children: [
            {
              name: "Pashmina",
              children: ["Handwoven", "Machine-made"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
            {
              name: "Merino Wool",
              children: ["Organic", "Blended"].map((item) => ({
                name: item,
                description: "Sample description for " + item,
              })),
            },
          ],
        },
      ],
    },
  ]);

  const handleOpenModal = (parentName) => {
    setFormData({ ...formData, parent: parentName });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", description: "", parent: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addChild = (items, parentName) => {
    for (let item of items) {
      if (item.name === parentName) {
        item.children = item.children || [];
        item.children.push({
          name: formData.name,
          description: formData.description,
        });
        return true;
      }
      if (item.children && addChild(item.children, parentName)) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = [...tableData];
    if (addChild(updatedData, formData.parent)) {
      setTableData(updatedData);
    }
    handleCloseModal();
  };

  const renderRows = (items, level = 0, parentKey = "", rowIndex = 0) => {
    return items.map((item, index) => {
      const uniqueKey = `${parentKey}-${item.name || item}-${index}`;
      return (
        <React.Fragment key={uniqueKey}>
          <tr className="bg-gray-800 text-white">
            {[...Array(level)].map((_, i) => (
              <td key={i} className="p-2"></td>
            ))}
            <td className="p-2">↳</td>
            <td
              className={`p-2 ${level === 0 ? "font-bold text-red-500" : ""}`}
              colSpan={4 - level}
            >
              {item.name || item}
            </td>
            <td
              className="p-2 cursor-pointer text-green-400"
              onClick={() => handleOpenModal(item.name)}
            >
              +
            </td>
            <td className="p-2">{item.description || ""}</td>
          </tr>
          {item.children &&
            renderRows(
              item.children,
              level + 1,
              uniqueKey,
              rowIndex + index + 1
            )}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <Link to="/entities">
        {" "}
        <button className="relative m-5 border   px-4 py-2  shadow-md  transition cursor-pointer">
          Ui change
        </button>
      </Link>

      <div className="overflow-x-auto p-4 bg-gray-800">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="bg-gray-900 text-left">
              <th className="p-2"></th>
              <th className="p-2">L1</th>
              <th className="p-2">L2</th>
              <th className="p-2">L3</th>
              <th className="p-2">L4</th>
              <th className="p-2">+</th>
              <th className="p-2">Description</th>
              <th className="p-2">Attribute 1</th>
              <th className="p-2">Attribute 2</th>
              <th className="p-2">Attribute 3</th>
              <th className="p-2">Attribute 4</th>
            </tr>
          </thead>
          <tbody>{renderRows(tableData)}</tbody>
        </table>
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-white">
              <h2 className="text-xl font-bold mb-4 text-center">
                Add New Entity
              </h2>
              <form onSubmit={handleSubmit}>
                <label className="block mb-2">Parent Name:</label>
                <input
                  type="text"
                  name="parent"
                  value={formData.parent}
                  disabled
                  className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
                />
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
                  required
                />
                <label className="block mb-2">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white h-20"
                  required
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
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
      </div>
    </>
  );
};

export default NestedTable;
