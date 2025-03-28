// import { useState, useEffect } from "react";
// import Header from "../Components/Header";
// import tableData from "./AssociationTable.json";
// import { PlusCircle, Pencil } from "lucide-react";

// const ProcessingEditor = () => {
//   const [expandedRows, setExpandedRows] = useState({});
//   const [processingData, setProcessingData] = useState([]);
//   const [processingDetails, setProcessingDetails] = useState([]);
//   const [arrayEntities, setArrayEntities] = useState([]);
//   const [dynamicTableData, setDynamicTableData] = useState([]);

//   useEffect(() => {
//     const dummyProcessingData = [
//       {
//         id: "01",
//         pre: "-",
//         suc: "02",
//         inputs: ["Apricot", "Groundnut"],
//         processingBrief: "Primary base pulp",
//         outputs: "Apricot pulp",
//       },
//       {
//         id: "02",
//         pre: "01",
//         suc: "03",
//         inputs: ["Dates", "Walnut"],
//         processingBrief: "Filler mix",
//         outputs: "Dates mix",
//       },
//       {
//         id: "03",
//         pre: "01",
//         suc: "04",
//         inputs: ["Rasthali", "Groundnut"],
//         processingBrief: "Taste enhance mix",
//         outputs: "Banana pulp",
//       },
//       {
//         id: "04",
//         pre: "03",
//         suc: "-",
//         inputs: ["Walnut", "Groundnut"],
//         processingBrief: "Hydration for baking",
//         outputs: "Nuts milk",
//       },
//     ];
//     setProcessingData(dummyProcessingData);

//     const dummyProcessingDetails = [
//       {
//         id: "01",
//         scope: "Washed and dried only",
//         limits: "50 - 60 gas",
//         processingDetails: "...",
//       },
//       {
//         id: "02",
//         scope: "Soaked overnight",
//         limits: "Min 6 hours",
//         processingDetails: "..",
//       },
//       { id: "03", scope: "..", limits: "..", processingDetails: ".." },
//       { id: "04", scope: "..", limits: "..", processingDetails: ".." },
//     ];
//     setProcessingDetails(dummyProcessingDetails);

//     const dummyArrayEntities = [
//       { category: "Snow Fruits", items: ["Apricot"] },
//       { category: "Dry Fruits", items: ["Dates"] },
//       { category: "Nuts", items: ["Walnut", "Groundnut"] },
//       { category: "Bananas", items: ["Rasthali"] },
//     ];
//     setArrayEntities(dummyArrayEntities);

    
//     setDynamicTableData(tableData);
//   }, []);

//   const toggleRow = (id) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };
//   return (
//     <div>
//       <Header />
//       <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
//         <h1 className="text-3xl font-semibold mb-6">Associations Directory</h1>
//         <DynamicTable
//           data={dynamicTableData}
//           expandedRows={expandedRows}
//           toggleRow={toggleRow}
//         />
//         <ArrayEntitiesTable data={arrayEntities} />
//         <ProcessingTables
//           processingData={processingData}
//           setProcessingData={setProcessingData}
//         />
//         <ProcessingDetailsTable processingDetails={processingDetails} />
//       </div>
//     </div>
//   );
// };

// const DynamicTable = ({ data, expandedRows, toggleRow }) => {
//   const renderRows = (items, level = 0) => {
//     return items.map((item) => (
//       <>
//         <tr key={item.id} className="text-gray-200 bg-gray-800 ">
//           <td
//             className="border border-gray-700 p-2 cursor-pointer w-10"
//             onClick={() => toggleRow(item.id)}
//           >
//             {item.children && item.children.length > 0
//               ? expandedRows[item.id]
//                 ? "▾"
//                 : "▸"
//               : ""}
//           </td>
//           <td
//             className={`border border-gray-700 p-2 pl-${
//               (level + 1) * 6
//             } font-medium`}
//             style={{ paddingLeft: `${level * 20}px` }}
//           >
//             <span className="text-gray-400 mr-2">L{level + 1}</span> {item.name}
//           </td>
//           <td className="border border-gray-700 p-2">
//             {item.description || ""}
//           </td>
//         </tr>
//         {expandedRows[item.id] && item.children
//           ? renderRows(item.children, level + 1)
//           : null}
//       </>
//     ));
//   };

//   return (
//     <div className=" p-5 rounded-lg overflow-auto shadow-lg mb-6">
//       <table className="w-full border border-gray-700 text-left">
//         <thead>
//           <tr className="bg-gray-700 text-gray-300">
//             <th className="border border-gray-700 p-3 w-10">#</th>
//             <th className="border border-gray-700 p-3">Association Name</th>
//             <th className="border border-gray-700 p-3">
//               Association Description
//             </th>
//           </tr>
//         </thead>
//         <tbody>{renderRows(data)}</tbody>
//       </table>
//     </div>
//   );
// };
// const ArrayEntitiesTable = ({ data }) => {
//   return (
//     <div className=" p-5 rounded-lg overflow-auto shadow-lg mb-6">
//       <h2 className="text-2xl font-semibold mb-4">Array Entities</h2>
//       <table className="w-full border border-gray-700 text-left">
//         <thead>
//           <tr className="bg-gray-700 text-gray-300">
//             {data.map((entity, index) => (
//               <th key={index} className="border border-gray-700 p-3">
//                 {entity.category}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="bg-gray-800 text-gray-200">
//             {data.map((entity, index) => (
//               <td key={index} className="border border-gray-700 p-2">
//                 {entity.items.join(", ")}
//               </td>
//             ))}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const ProcessingTables = ({ processingData, setProcessingData }) => {
//    const [rotated, setRotated] = useState(false);
//   const handleInputChange = (id, field, value) => {
//     const updatedData = processingData.map((item) =>
//       item.id === id ? { ...item, [field]: value } : item
//     );
//     setProcessingData(updatedData);
//   };
//   const addNewRow = () => {
//     const newRow = {
//       id: (processingData.length + 1).toString().padStart(2, "0"),
//       pre: "",
//       suc: "",
//       inputs: "",
//       processingBrief: "",
//       outputs: "",
//     };
//     setProcessingData([...processingData, newRow]);
//   };

//   return (
//     <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6">
//       <h2 className="text-2xl font-semibold mb-4">Tabulations</h2>
//       <div className="rounded-lg overflow-auto shadow-lg mb-6">
       
//         <table className="w-full border border-gray-700 text-left">
//           <thead className="bg-gray-700 text-gray-300">
//             <tr>
//               {Object.keys(processingData[0] || {}).map((key) => (
//                 <th key={key} className="border border-gray-700 p-3">
//                   {key}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {processingData.map((item) => (
//               <tr key={item.id} className="bg-gray-800 text-gray-200">
//                 {Object.keys(item).map((field) => (
//                   <td key={field} className="border border-gray-700 p-2">
//                     <input
//                       type="text"
//                       className="text-white w-full"
//                       value={item[field]}
//                       onChange={(e) =>
//                         handleInputChange(item.id, field, e.target.value)
//                       }
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//             {/* Button Row */}
//             <tr>
//               <td
//                 colSpan={Object.keys(processingData[0] || {}).length}
//                 className="p-3 text-left"
//               >
//                 <button
//                   title="Add New"
//                   className="group cursor-pointer outline-none duration-300"
//                   onMouseEnter={() => setRotated(true)}
//                   onMouseLeave={() => setRotated(false)}
//                   onClick={addNewRow}
//                 >
//                   <PlusCircle
//                     size={30}
//                     className={`stroke-zinc-400 fill-none duration-300 group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 ${
//                       rotated ? "rotate-90" : ""
//                     }`}
//                   />
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
// // editable functions 
// // const ProcessingTables = ({
// //   processingData,
// //   setProcessingData,
// //   editableRow,
// //   setEditableRow,
// // }) => {
  
// //   const addNewRow = () => {
// //     const newRow = {
// //       id: (processingData.length + 1).toString().padStart(2, "0"),
// //       pre: "",
// //       suc: "",
// //       inputs: "",
// //       processingBrief: "",
// //       outputs: "",
// //     };
// //     setProcessingData([...processingData, newRow]);
// //   };

// //   return (
// //     <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6">
// //       <h2 className="text-2xl font-semibold mb-4">Tabulations</h2>
// //       <table className="w-full border border-gray-700 text-left">
// //         <thead className="bg-gray-700 text-gray-300">
// //           <tr>
// //             <th className="border border-gray-700 p-3">Edit</th>
// //             {Object.keys(processingData[0] || {}).map((key) => (
// //               <th key={key} className="border border-gray-700 p-3">
// //                 {key}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {processingData.map((item) => (
// //             <tr key={item.id} className="bg-gray-800 text-gray-200">
// //               <td className="border border-gray-700 p-2 text-center">
// //                 <button
// //                   onClick={() =>
// //                     setEditableRow(editableRow === item.id ? null : item.id)
// //                   }
// //                 >
// //                   <Pencil size={18} className="text-gray-400 cursor-pointer" />
// //                 </button>
// //               </td>
// //               {Object.keys(item).map((field) => (
// //                 <td key={field} className="border border-gray-700 p-2">
// //                   {editableRow === item.id ? (
// //                     <input
// //                       type="text"
// //                       className="text-white w-full bg-gray-700 p-1"
// //                       value={item[field]}
// //                       onChange={(e) =>
// //                         handleInputChange(item.id, field, e.target.value)
// //                       }
// //                     />
// //                   ) : (
// //                     item[field]
// //                   )}
// //                 </td>
// //               ))}
// //             </tr>
// //           ))}
// //           <tr>
// //             <td
// //               colSpan={Object.keys(processingData[0] || {}).length + 1}
// //               className="p-3 text-left"
// //             >
// //               <button
// //                 title="Add New"
// //                 className="group cursor-pointer outline-none duration-300"
// //                 onClick={addNewRow}
// //               >
// //                 <PlusCircle
// //                   size={30}
// //                   className="stroke-zinc-400 fill-none duration-300 group-hover:fill-zinc-800"
// //                 />
// //               </button>
// //             </td>
// //           </tr>
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// const ProcessingDetailsTable = ({ processingDetails }) => {
//   return (
//     <div className=" p-5 rounded-lg overflow-auto shadow-lg mb-6">
//       <h2 className="text-2xl font-semibold mb-4">Processing Detailing</h2>
//       <table className="w-full border border-gray-700 text-left">
//         <thead className="bg-gray-700 text-gray-300">
//           <tr>
//             <th className="border border-gray-700 p-3">ID#</th>
//             <th className="border border-gray-700 p-3">Scope</th>
//             <th className="border border-gray-700 p-3">Limits</th>
//             <th className="border border-gray-700 p-3">Processing Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {processingDetails.map((item) => (
//             <tr key={item.id} className="bg-gray-800 text-gray-200">
//               <td className="border border-gray-700 p-2">{item.id}</td>
//               <td className="border border-gray-700 p-2">{item.scope}</td>
//               <td className="border border-gray-700 p-2">{item.limits}</td>
//               <td className="border border-gray-700 p-2">
//                 {item.processingDetails}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default ProcessingEditor;
import { useState, useEffect } from "react";
import Header from "../Components/Header";
import tableData from "./AssociationTable.json";
import { PlusCircle, Pencil } from "lucide-react";

const ProcessingEditor = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [processingData, setProcessingData] = useState([]);
  const [processingDetails, setProcessingDetails] = useState([]);
  const [arrayEntities, setArrayEntities] = useState([]);
  const [dynamicTableData, setDynamicTableData] = useState([]);

  useEffect(() => {
    const dummyProcessingData = [
      {
        id: "01",
        pre: "-",
        suc: "02",
        inputs: ["Apricot", "Groundnut"],
        processingBrief: "Primary base pulp",
        outputs: "Apricot pulp",
      },
      {
        id: "02",
        pre: "01",
        suc: "03",
        inputs: ["Dates", "Walnut"],
        processingBrief: "Filler mix",
        outputs: "Dates mix",
      },
      {
        id: "03",
        pre: "01",
        suc: "04",
        inputs: ["Rasthali", "Groundnut"],
        processingBrief: "Taste enhance mix",
        outputs: "Banana pulp",
      },
      {
        id: "04",
        pre: "03",
        suc: "-",
        inputs: ["Walnut", "Groundnut"],
        processingBrief: "Hydration for baking",
        outputs: "Nuts milk",
      },
    ];
    setProcessingData(dummyProcessingData);

    // const dummyProcessingDetails = [
    //   {
    //     id: "01",
    //     scope: "Washed and dried only",
    //     limits: "50 - 60 gas",
    //     processingDetails: "...",
    //   },
    //   {
    //     id: "02",
    //     scope: "Soaked overnight",
    //     limits: "Min 6 hours",
    //     processingDetails: "..",
    //   },
    //   { id: "03", scope: "..", limits: "..", processingDetails: ".." },
    //   { id: "04", scope: "..", limits: "..", processingDetails: ".." },
    // ];
    // setProcessingDetails(dummyProcessingDetails);

    const dummyArrayEntities = [
      { category: "Snow Fruits", items: ["Apricot"] },
      { category: "Dry Fruits", items: ["Dates"] },
      { category: "Nuts", items: ["Walnut", "Groundnut"] },
      { category: "Bananas", items: ["Rasthali"] },
    ];
    setArrayEntities(dummyArrayEntities);

    
    setDynamicTableData(tableData);
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div>
      <Header />
      <div className="p-6  min-h-screen">
        <h1 className="text-3xl font-semibold mb-6">Associations Directory</h1>
        <DynamicTable
          data={dynamicTableData}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
        />
        <ArrayEntitiesTable data={arrayEntities} />
        <ProcessingTables
          processingData={processingData}
          setProcessingData={setProcessingData}
        />
        <ProcessingDetailsTable processingDetails={processingDetails} />
      </div>
    </div>
  );
};

const DynamicTable = ({ data, expandedRows, toggleRow }) => {
  const renderRows = (items, level = 0) => {
    return items.map((item) => (
      <>
        <tr key={item.id} className=" ">
          <td
            className="border border-gray-400 p-2 cursor-pointer w-10"
            onClick={() => toggleRow(item.id)}
          >
            {item.children && item.children.length > 0
              ? expandedRows[item.id]
                ? "▾"
                : "▸"
              : ""}
          </td>
          <td
            className={`border border-gray-400 p-2 pl-${
              (level + 1) * 6
            } font-medium`}
            style={{ paddingLeft: `${level * 20}px` }}
          >
            <span className="text-gray-400 mr-2">L{level + 1}</span> {item.name}
          </td>
          <td className="border border-gray-400 p-2">
            {item.description || ""}
          </td>
        </tr>
        {expandedRows[item.id] && item.children
          ? renderRows(item.children, level + 1)
          : null}
      </>
    ));
  };

  return (
    <div className=" p-5 rounded-lg overflow-auto shadow-lg mb-6">
      <table className="w-full border border-gray-400 text-left">
        <thead>
          <tr className="">
            <th className="border border-gray-400 p-3 w-10">#</th>
            <th className="border border-gray-400 p-3">Association Name</th>
            <th className="border border-gray-400 p-3">
              Association Description
            </th>
          </tr>
        </thead>
        <tbody>{renderRows(data)}</tbody>
      </table>
    </div>
  );
};
const ArrayEntitiesTable = ({ data }) => {
  return (
    <div className=" p-5 rounded-lg overflow-auto shadow-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Array Entities</h2>
      <table className="w-full border border-gray-400 text-left">
        <thead>
          <tr className=" text-gray-800">
            {data.map((entity, index) => (
              <th key={index} className="border border-gray-400 p-3">
                {entity.category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className=" text-gray-800">
            {data.map((entity, index) => (
              <td key={index} className="border border-gray-400 p-2">
                {entity.items.join(", ")}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};


const ProcessingTables = ({ processingData, processingDetails, setProcessingData }) => {
  const [selectedProcessingId, setSelectedProcessingId] = useState(null);

  const handleRowClick = (id) => {
    setSelectedProcessingId(selectedProcessingId === id ? null : id);
  };
  const addNewRow = () => {
    const newId = (processingData.length + 1).toString().padStart(2, "0"); // Generate new ID
    const newRow = {
      id: newId,
      pre: "",
      suc: "",
      inputs: [],
      processingBrief: "",
      outputs: "",
    };
    setProcessingData([...processingData, newRow]);
  };

  
  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Tabulations</h2>
      <table className="w-full border border-gray-400 text-left">
        <thead>
          <tr>
            <th className="border border-gray-400 p-3">ID#</th>
            <th className="border border-gray-400 p-3">Predecessor</th>
            <th className="border border-gray-400 p-3">Successor</th>
            <th className="border border-gray-400 p-3">Inputs</th>
            <th className="border border-gray-400 p-3">Processing Brief</th>
            <th className="border border-gray-400 p-3">Outputs</th>
          </tr>
        </thead>
        <tbody>
          {processingData.map((item) => (
            <tr key={item.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleRowClick(item.id)}>
              <td className="border border-gray-400 p-2">{item.id}</td>
                            {/* Dropdown for Predecessor */}
                            <td className="border border-gray-400 p-2">
                <select
                  className="p-1"
                  value={item.pre || ""}
                  onChange={(e) => handleSelectChange(item.id, "pre", e.target.value)}
                >
                  <option value="">None</option>
                  {processingData.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.id}
                    </option>
                  ))}
                </select>
              </td>

              {/* Dropdown for Successor */}
              <td className="border border-gray-400 p-2">
                <select
                  className=" p-1"
                  value={item.suc || ""}
                  onChange={(e) => handleSelectChange(item.id, "suc", e.target.value)}
                >
                  <option value="">None</option>
                  {processingData.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.id}
                    </option>
                  ))}
                </select>
              </td>

              <td className="border border-gray-400 p-2">{item.pre}</td>
              <td className="border border-gray-400 p-2">{item.suc}</td>
              <td className="border border-gray-400 p-2">{item.inputs.join(", ")}</td>
              <td className="border border-gray-400 p-2">{item.processingBrief}</td>
              <td className="border border-gray-400 p-2">{item.outputs}</td>
            </tr>
          ))}
           {/* Add New Row Button */}
      <button
        className="mb-4 px-4 py-2  text-blue-500 rounded "
        onClick={addNewRow}
      >
        + 
      </button>
        </tbody>
      </table>

      {/* Separate Section for Processing Details */}
      {selectedProcessingId && (
        <ProcessingDetailsTable selectedId={selectedProcessingId} processingDetails={processingDetails} />
      )}
    </div>
  );
};

const ProcessingDetailsTable = ({ selectedId }) => {
  const [processingDetails, setProcessingDetails] = useState([]);

  useEffect(() => {
    const dummyProcessingDetails = [
      { id: "01", scope: "Washed and dried only", limits: "50 - 60 gas", processingDetails: "..." },
      { id: "02", scope: "Soaked overnight", limits: "Min 6 hours", processingDetails: ".." },
      { id: "03", scope: "Filtered and blended", limits: "Proper blending", processingDetails: "..." },
      { id: "04", scope: "Dried & Packed", limits: "Storage up to 6 months", processingDetails: "..." },
    ];
    setProcessingDetails(dummyProcessingDetails);
  }, []);

  if (!selectedId) return null;

  const selectedDetails = processingDetails.find((item) => item.id === selectedId);
  if (!selectedDetails) return null;

  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg bg-gray-100 mt-6">
      <h2 className="text-xl font-semibold mb-4">Processing Details</h2>
      <table className="w-full border border-gray-400 text-left">
        <thead>
          <tr>
            <th className="border border-gray-400 p-3">Scope</th>
            <th className="border border-gray-400 p-3">Limits</th>
            <th className="border border-gray-400 p-3">Processing Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2">{selectedDetails.scope}</td>
            <td className="border border-gray-400 p-2">{selectedDetails.limits}</td>
            <td className="border border-gray-400 p-2">{selectedDetails.processingDetails}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )}
export default ProcessingEditor;