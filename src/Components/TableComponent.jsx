
// import { useState } from "react";

// const associations = [
//   { id: "L1", name: "Apple Shake" },
//   { id: "L2", name: "Dates Dessert" },
//   { id: "L3", name: "Nuts Overload" },
//   { id: "L4", name: "Banana Smoothie" },
// ];

// const snowFruits = ["Apple", "Pears", "Apricot", "Peach"];
// const dryFruits = ["Raisins", "Figs", "Dates"];
// const nuts = ["Cashew", "Walnut", "Almond", "Groundnut", "Pistachio"];
// const bananas = [
//   "Malavazhai",
//   "Karpooravalli",
//   "Yellaki",
//   "Sevazhai",
//   "Rasthali",
// ];

// const L2Associations = [
//   { id: "L2-1", name: "AP Special" },
//   { id: "L2-2", name: "TN Special" },
// ];

// const L2Data = {
//   apricot: ["Srinagar"],
//   dates: ["Dubai", "Tehran", "Sharjah"],
//   walnut: ["Kalakntang", "Dheradhun"],
//   groundnut: ["Cudallore", "Nellore"],
//   rasthali: ["Salem", "Erode"],
// };

// const L3Associations = [
//   { id: "L3-1", name: "Regular" },
//   { id: "L3-2", name: "Hybrid" },
//   { id: "L3-3", name: "Organic" },
// ];

// const L3Data = {
//   Srinagar: ["Hybrid", "GMO"],
//   Tehran: ["Hybrid", "Organic"],
//   Kalakntang: ["Hybrid", "Organic", "GMO"],
//   Cudallore: ["Hybrid", "Organic", "GMO"],
//   Erode: ["Organic", "GMO"],
// };

// export default function TableComponent() {
//   const [currentLevel, setCurrentLevel] = useState("L1");

//   const renderTable = () => {
//     let data = [];
//     let headers = ["# ID", "Name of Association"];
//     let rowData = [];

//     if (currentLevel === "L1") {
//       headers.push("Snow Fruits", "Dry Fruits", "Nuts", "Bananas");
//       data = associations;
//       rowData = [snowFruits, dryFruits, nuts, bananas];
//     } else if (currentLevel === "L2") {
//       headers.push(...Object.keys(L2Data));
//       data = L2Associations;
//       rowData = Object.values(L2Data);
//     } else if (currentLevel === "L3") {
//       headers.push(...Object.keys(L3Data));
//       data = L3Associations;
//       rowData = Object.values(L3Data);
//     }

//     return (
//       <table className="border-collapse border w-full text-sm">
//         <thead>
//           <tr className="bg-gray-200">
//             {headers.map((header, index) => (
//               <th key={index} className="border p-1 text-left">
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, rowIndex) => (
//             <tr key={item.id} className="border">
//               <td className="border p-1">{item.id}</td>
//               <td className="border p-1">{item.name}</td>
//               {rowIndex === 0 &&
//                 rowData.map((col, index) => (
//                   <td key={index} className="border p-1" rowSpan={data.length}>
//                     {col.map((value) => (
//                       <div key={value}>
//                         <input type="checkbox" className="mr-1" /> {value}
//                       </div>
//                     ))}
//                   </td>
//                 ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-2">Hierarchy - {currentLevel}</h2>
//       <div className="flex gap-2 mb-2">
//         <button
//           onClick={() => setCurrentLevel("L1")}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           L1
//         </button>
//         <button
//           onClick={() => setCurrentLevel("L2")}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           L2
//         </button>
//         <button
//           onClick={() => setCurrentLevel("L3")}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           L3
//         </button>
//       </div>
//       {renderTable()}
//       <div className="mt-2 flex justify-between">
//         <button className="bg-gray-500 text-white px-3 py-1 rounded">
//           Save
//         </button>
//         <button className="bg-green-500 text-white px-3 py-1 rounded">
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";

const associations = [
  { id: "L1", name: "Apple Shake" },
  { id: "L2", name: "Dates Dessert" },
  { id: "L3", name: "Nuts Overload" },
  { id: "L4", name: "Banana Smoothie" },
];

const L2Associations = [
  { id: "L2-1", name: "AP Special" },
  { id: "L2-2", name: "TN Special" },
];

const L2Data = {
  apricot: ["Srinagar"],
  dates: ["Dubai", "Tehran", "Sharjah"],
  walnut: ["Kalakntang", "Dheradhun"],
  groundnut: ["Cudallore", "Nellore"],
  rasthali: ["Salem", "Erode"],
};

const L3Associations = [
  { id: "L3-1", name: "Regular" },
  { id: "L3-2", name: "Hybrid" },
  { id: "L3-3", name: "Organic" },
];

const L3Data = {
  Srinagar: ["Hybrid", "GMO"],
  Tehran: ["Hybrid", "Organic"],
  Kalakntang: ["Hybrid", "Organic", "GMO"],
  Cudallore: ["Hybrid", "Organic", "GMO"],
  Erode: ["Organic", "GMO"],
};

const associationData = {
  L1: {
    snowFruits: ["Apple", "Pears"],
    dryFruits: ["Raisins"],
    nuts: ["Cashew"],
    bananas: ["Malavazhai"],
  },
  L2: {
    snowFruits: ["Apricot"],
    dryFruits: ["Figs"],
    nuts: ["Walnut"],
    bananas: ["Karpooravalli"],
  },
  L3: {
    snowFruits: ["Peach"],
    dryFruits: ["Dates"],
    nuts: ["Almond"],
    bananas: ["Yellaki"],
  },
  L4: {
    snowFruits: ["Mango"],
    dryFruits: ["Figs", "Dates"],
    nuts: ["Pistachio"],
    bananas: ["Sevazhai"],
  },
};

export default function TableComponent() {
  const [currentLevel, setCurrentLevel] = useState("L1");
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const handleAssociationClick = (id) => {
    setSelectedAssociation(id === selectedAssociation ? null : id);
  };

  const handleCheckboxChange = (id, category, value) => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      if (!updated[id]) updated[id] = {};
      if (!updated[id][category]) updated[id][category] = new Set();

      if (updated[id][category].has(value)) {
        updated[id][category].delete(value);
      } else {
        updated[id][category].add(value);
      }

      return { ...updated };
    });
  };

  const getTableData = () => {
    if (currentLevel === "L1") return associations;
    if (currentLevel === "L2") return L2Associations;
    if (currentLevel === "L3") return L3Associations;
    return [];
  };

  const isNextEnabled = () => {
    return Object.values(checkedItems).some((category) =>
      Object.values(category).some((set) => set.size > 0)
    );
  };

  const handleNext = () => {
    if (!isNextEnabled()) return;
    if (currentLevel === "L1") setCurrentLevel("L2");
    else if (currentLevel === "L2") setCurrentLevel("L3");
  };

  const renderTable = () => {
    let data = getTableData();
    let headers = [
      "# ID",
      "Name of Association",
      "Snow Fruits",
      "Dry Fruits",
      "Nuts",
      "Bananas",
    ];

    return (
      <table className="border-collapse border w-full text-sm">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, index) => (
              <th key={index} className="border p-1 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const categoryValues = [
              associationData[item.id]?.snowFruits || [],
              associationData[item.id]?.dryFruits || [],
              associationData[item.id]?.nuts || [],
              associationData[item.id]?.bananas || [],
            ];

            const maxRows = Math.max(
              ...categoryValues.map((arr) => arr.length),
              1
            );

            return Array.from({ length: maxRows }).map((_, rowIndex) => (
              <tr
                key={`${item.id}-${rowIndex}`}
                className={`border ${
                  selectedAssociation === item.id ? "bg-orange-200" : ""
                }`}
              >
                {rowIndex === 0 && (
                  <>
                    <td rowSpan={maxRows} className="border p-1">
                      {item.id}
                    </td>
                    <td
                      rowSpan={maxRows}
                      className="border p-1 cursor-pointer text-blue-600 underline"
                      onClick={() => handleAssociationClick(item.id)}
                    >
                      {item.name}
                    </td>
                  </>
                )}
                {categoryValues.map((values, index) => (
                  <td key={index} className="border p-1">
                    {values[rowIndex] ? (
                      <label>
                        <input
                          type="checkbox"
                          className="mr-1"
                          checked={
                            checkedItems[item.id]?.[headers[index + 2]]?.has(
                              values[rowIndex]
                            ) || false
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              item.id,
                              headers[index + 2],
                              values[rowIndex]
                            )
                          }
                        />
                        {values[rowIndex]}
                      </label>
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
              </tr>
            ));
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Hierarchy - {currentLevel}</h2>
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setCurrentLevel("L1")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          L1
        </button>
        <button
          onClick={() => setCurrentLevel("L2")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          L2
        </button>
        <button
          onClick={() => setCurrentLevel("L3")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          L3
        </button>
      </div>
      {renderTable()}
      <div className="mt-2 flex justify-between">
        <button className="bg-gray-500 text-white px-3 py-1 rounded">
          Save
        </button>
        <button
          className={`px-3 py-1 rounded ${
            isNextEnabled()
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
          onClick={handleNext}
          disabled={!isNextEnabled()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
