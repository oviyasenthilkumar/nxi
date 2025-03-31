import React from 'react';
import { Plus } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from "react";
import Header from "../Components/Header";
import tableData from "./AssociationTable.json";
import { PlusCircle, Pencil } from "lucide-react";



// json data

const associationsData = {
  L1: {
    associations: [
      {
        id: 1,
        name: "apple shakes",
        categories: {
          "snow fruits": ["apple", "pears", "apricot", "peach"],
          "dry fruits": ["raisins", "figs", "dates"],
          nuts: ["cashew", "walnut", "almond", "groundnut", "pistachio"],
          bananas: [
            "malavazhai",
            "karpuravalli",
            "yeallaki",
            "sevazhai",
            "rasthali",
            "poovam",
          ],
        },
        selected: {
          "snow fruits": ["peach"],
          "dry fruits": ["figs"],
          nuts: ["cashew", "almond"],
          bananas: ["karpuravalli"],
        },
      },
      {
        id: 2,
        name: "dates dessert",
        categories: {
          "snow fruits": ["apple", "pears", "apricot", "peach"],
          "dry fruits": ["raisins", "figs", "dates"],
          nuts: ["cashew", "walnut", "almond", "groundnut", "pistachio"],
          bananas: [
            "malavazhai",
            "karpuravalli",
            "yeallaki",
            "sevazhai",
            "rasthali",
            "poovam",
          ],
        },
        selected: {
          "snow fruits": ["apricot"],
          "dry fruits": ["dates"],
          nuts: ["walnut", "groundnut"],
          bananas: ["rasthali"],
        },
      },
      {
        id: 3,
        name: "nuts overload",
        categories: {
          "snow fruits": ["apple", "pears", "apricot", "peach"],
          "dry fruits": ["raisins", "figs", "dates"],
          nuts: ["cashew", "walnut", "almond", "groundnut", "pistachio"],
          bananas: [
            "malavazhai",
            "karpuravalli",
            "yeallaki",
            "sevazhai",
            "rasthali",
            "poovam",
          ],
        },
        selected: {
          "snow fruits": ["apple"],
          "dry fruits": ["raisins"],
          nuts: ["pistachio", "almond"],
          bananas: ["yeallaki"],
        },
      },
      {
        id: 4,
        name: "banana smooth",
        categories: {
          "snow fruits": ["apple", "pears", "apricot", "peach"],
          "dry fruits": ["raisins", "figs", "dates"],
          nuts: ["cashew", "walnut", "almond", "groundnut", "pistachio"],
          bananas: [
            "malavazhai",
            "karpuravalli",
            "yeallaki",
            "sevazhai",
            "rasthali",
            "poovam",
          ],
        },
        selected: {
          "snow fruits": ["pears"],
          "dry fruits": ["dates"],
          nuts: ["groundnut", "walnut"],
          bananas: ["poovam"],
        },
      },
    ],
  },
};


const CustomDropdown = ({ options, value, onChange, multiple = false, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? value : [];
      const index = newValue.indexOf(option);
      if (index === -1) {
        onChange([...newValue, option]);
      } else {
        onChange(newValue.filter(item => item !== option));
      }
    } else {                    
      onChange(option);
      setIsOpen(false);
    }
  };

  const displayValue = multiple 
    ? (Array.isArray(value) ? value.join(", ") : "")
    : value;

  return (
    <div className="relative" ref={dropdownRef} onClick={e => e.stopPropagation()}>
      <div
        className="w-full p-2 rounded   cursor-pointer flex justify-start items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {displayValue || placeholder}
        </span>
        <span className="">{isOpen ? "▾" : "▸"}</span>
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 rounded shadow-lg max-h-48 overflow-auto bg-white">
          {options.map((option) => (
            <div
              key={option}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                multiple
                  ? value?.includes(option) ? "bg-gray-100" : ""
                  : value === option ? "bg-gray-100" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {multiple && (
                <input
                  type="checkbox"
                  checked={value?.includes(option)}
                  onChange={() => {}}
                  className="mr-2"
                />
              )}
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProcessingEditor = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [processingData, setProcessingData] = useState([]);
  const [processingDetails, setProcessingDetails] = useState([]);
  const [arrayEntities, setArrayEntities] = useState([]);
  const [dynamicTableData, setDynamicTableData] = useState([]);
  const [selectedL1Association, setSelectedL1Association] = useState(null);

  useEffect(() => {
    const dummyProcessingData = [
      {
        id: "01",
        pre: "-",
        suc: "02",
        inputs: [],
        processingBrief: "Primary base pulp",
        outputs: "Apricot pulp",
      },
      {
        id: "02",
        pre: "01",
        suc: "03",
        inputs: [],
        processingBrief: "Filler mix",
        outputs: "Dates mix",
      },
      {
        id: "03",
        pre: "01",
        suc: "04",
        inputs: [],
        processingBrief: "Taste enhance mix",
        outputs: "Banana pulp",
      },
      {
        id: "04",
        pre: "03",
        suc: "-",
        inputs: [],
        processingBrief: "Hydration for baking",
        outputs: "Nuts milk",
      },
    ];
    setProcessingData(dummyProcessingData);

    const dummyProcessingDetails = [
      { id: "01", scope: "Washed and dried only", limits: "50 - 60 gas", processingDetails: "..." },
      { id: "02", scope: "Soaked overnight", limits: "Min 6 hours", processingDetails: ".." },
      { id: "03", scope: "Filtered and blended", limits: "Proper blending", processingDetails: "..." },
      { id: "04", scope: "Dried & Packed", limits: "Storage up to 6 months", processingDetails: "..." },
    ];
    setProcessingDetails(dummyProcessingDetails);
    
    setDynamicTableData(tableData);
  }, []);

  // Update array entities when selected association changes
  useEffect(() => {
    if (selectedL1Association) {
      // Transform the selected data into array entities format
      const newArrayEntities = Object.entries(selectedL1Association.selected)
        .filter(([_, items]) => items && items.length > 0)
        .map(([category, items]) => ({
          category,
          items: items
        }));
      setArrayEntities(newArrayEntities);

      // Clear existing inputs in processing data
      setProcessingData(prevData => 
        prevData.map(item => ({
          ...item,
          inputs: []
        }))
      );
    } else {
      setArrayEntities([]);
    }
  }, [selectedL1Association]);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLevelSelect = (level, association) => {
    if (level === 'L1') {
      console.log('Selected association:', association); // Debug log
      setSelectedL1Association(association);
      
      // Transform the selected data into array entities format
      const newArrayEntities = Object.entries(association.selected)
        .filter(([_, items]) => items && items.length > 0)
        .map(([category, items]) => ({
          category,
          items: items
        }));
      setArrayEntities(newArrayEntities);

      // Clear existing inputs in processing data
      setProcessingData(prevData => 
        prevData.map(item => ({
          ...item,
          inputs: []
        }))
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="p-6 min-h-screen">
        <h1 className="text-3xl font-semibold mb-6">Associations Directory</h1>
        <DynamicTable
          data={dynamicTableData}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
          onLevelSelect={handleLevelSelect}
        />
        <ArrayEntitiesTable 
          data={arrayEntities} 
          selectedAssociation={selectedL1Association}
        />
        <ProcessingTables
          processingData={processingData}
          processingDetails={processingDetails}
          setProcessingData={setProcessingData}
          setProcessingDetails={setProcessingDetails}
          arrayEntities={arrayEntities}
        />
      </div>
    </div>
  );
};

// const DynamicTable = ({ data, expandedRows, toggleRow }) => {
//   const [selectedRowId, setSelectedRowId] = useState(null);
//   const [hoveredRowId, setHoveredRowId] = useState(null);

//   const handleRowClick = (id) => {
//     setSelectedRowId(id === selectedRowId ? null : id);
//   };

//   const renderRows = (items, level = 0) => {
//     return items.map((item) => (
//       <>
//         <tr   key={item.id}
//         className={`cursor-pointer ${
//           selectedRowId === item.id
//             ? "bg-yellow-500" // Selected row color
//             : hoveredRowId === item.id
//             ? "bg-gray-100" // Hover color
//             : ""
//         }`}
//         onMouseEnter={() => setHoveredRowId(item.id)}
//         onMouseLeave={() => setHoveredRowId(null)}>
//           <td
//             className=" p-2 cursor-pointer w-10"
//             onClick={() => toggleRow(item.id)}
//           >
//             {item.children && item.children.length > 0
//               ? expandedRows[item.id]
//                 ? "▾"
//                 : "▸"
//               : ""}
//           </td>
//           <td
//             className={` p-2 font-medium cursor-pointer ${
//               selectedRowId === item.id ? "bg-yellow-500" : ""
//             }`}
//             style={{ paddingLeft: `${level * 20}px` }}
//             onClick={() => handleRowClick(item.id)}
//           >
//             <span className=" mr-2">L{level + 1}</span> {item.name}
//           </td>
//           <td className=" p-2">{item.description || ""}</td>
//         </tr>
//         {expandedRows[item.id] && item.children
//           ? renderRows(item.children, level + 1)
//           : null}
//       </>
//     ));
//   };

//   return (
//     <div className=" p-5 rounded-lg overflow-auto shadow-lg mb-6">
//       <table className="w-full text-left">
//         <thead>
//           <tr className="">
//             <th className=" p-3 w-10 bg-gray-300">#</th>
//             <th className=" p-3 bg-gray-300">Association Name</th>
//             <th className=" p-3 bg-gray-300">
//               Association Description
//             </th>
//           </tr>
//         </thead>
//         <tbody>{renderRows(data)}</tbody>
//       </table>
//     </div>
//   );
// };

// oviya's code
const DynamicTable = ({
  data,
  expandedRows,
  toggleRow,
  onLevelSelect,
  currentLevel,
  selectedAssociation,
  onAddNew,
}) => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const handleRowClick = (id, level, association, event) => {
    if (event.target.closest(".expand-button")) {
      toggleRow(id);
      return;
    }
    setSelectedRowId(id === selectedRowId ? null : id);
    
    // If it's an L1 association, find the corresponding data from associationsData
    if (level === 'L1') {
      const l1Association = associationsData.L1.associations.find(a => a.name.toLowerCase() === association.name.toLowerCase());
      if (l1Association) {
        onLevelSelect(level, l1Association);
      }
    }
  };

  const renderRows = (items, level = 0, parentItem = null) => {
    const currentLevelStr = `L${level + 1}`;

    return (
      <>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <tr
              className={`cursor-pointer ${
                selectedRowId === item.id
                  ? "bg-yellow-500"
                  : hoveredRowId === item.id
                  ? "bg-gray-100"
                  : ""
              }`}
              onMouseEnter={() => setHoveredRowId(item.id)}
              onMouseLeave={() => setHoveredRowId(null)}
            >
              <td
                className="p-2 cursor-pointer w-10 expand-button"
                onClick={(e) =>
                  handleRowClick(item.id, currentLevelStr, item, e)
                }
              >
                {(item.children && item.children.length > 0) || level < 2
                  ? expandedRows[item.id]
                    ? "▾"
                    : "▸"
                  : ""}
              </td>
              <td
                className={`p-2 font-medium cursor-pointer ${
                  selectedRowId === item.id ? "bg-yellow-500" : ""
                }`}
                style={{ paddingLeft: `${level * 20}px` }}
                onClick={(e) =>
                  handleRowClick(item.id, currentLevelStr, item, e)
                }
              >
                <span className="mr-2">L{level + 1}</span> {item.name}
              </td>
              <td className="p-2">{item.description || ""}</td>
            </tr>
            {expandedRows[item.id] && (
              <>
                {item.children && renderRows(item.children, level + 1, item)}
                {level < 2 &&
                  (!item.children || item.children.length === 0) && (
                    <tr className="hover:bg-gray-100">
                      <td className="p-2"></td>
                      <td
                        className="p-2 font-medium cursor-pointer text-blue-500 hover:text-blue-700"
                        style={{ paddingLeft: `${(level + 1) * 20}px` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddNew(`L${level + 2}`, item);
                        }}
                      >
                        <Plus className="w-4 h-4 inline mr-1" />
                        Add New L{level + 2}
                      </td>
                      <td className="p-2"></td>
                    </tr>
                  )}
              </>
            )}
            {index === items.length - 1 && level < 2 && parentItem && (
              <tr className="hover:bg-gray-100">
                <td className="p-2"></td>
                <td
                  className="p-2 font-medium cursor-pointer text-blue-500 hover:text-blue-700"
                  style={{ paddingLeft: `${level * 20}px` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddNew(`L${level + 1}`, parentItem);
                  }}
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Add New L{level + 1}
                </td>
                <td className="p-2"></td>
              </tr>
            )}
          </React.Fragment>
        ))}
        {level === 0 && (
          <tr className="hover:bg-gray-100">
            <td className="p-2"></td>
            <td
              className="p-2 font-medium cursor-pointer text-blue-500 hover:text-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                onAddNew("L1");
              }}
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Add New L1
            </td>
            <td className="p-2"></td>
          </tr>
        )}
      </>
    );
  };

  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6">
      <table className="w-full text-left">
        <thead>
          <tr className="">
            <th className="p-3 w-10 bg-gray-300">#</th>
            <th className="p-3 bg-gray-300">Association Name</th>
            <th className="p-3 bg-gray-300">Description</th>
          </tr>
        </thead>
        <tbody>{renderRows(data)}</tbody>
      </table>
    </div>
  );
};

const ArrayEntitiesTable = ({ data = [], selectedAssociation }) => {
  if (!selectedAssociation) {
    return (
      <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6 text-gray-800">
        <h2 className="text-3xl font-bold mb-4">Assot Detailing</h2>
        <p className="text-gray-600">Please select an L1 association from the Associations Directory</p>
      </div>
    );
  }

  // Transform the selected data into array entities format
  const selectedData = Object.entries(selectedAssociation.selected)
    .filter(([_, items]) => items && items.length > 0)
    .map(([category, items]) => ({
      category,
      items: items
    }));

  if (!selectedData.length) {
    return (
      <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6 text-gray-800">
        <h2 className="text-3xl font-bold mb-4">Assot Detailing</h2>
        <p className="text-gray-600">No mappings available for {selectedAssociation.name}</p>
      </div>
    );
  }

  // Find the maximum number of items in any category
  const maxRows = Math.max(...selectedData.map(entity => entity.items.length));

  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-4">Assot Detailing</h2>
      <p className="mb-2">Selected Items for {selectedAssociation.name}</p>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300 text-black">
            {selectedData.map((entity, index) => (
              <th key={index} className="p-3 font-semibold text-left">
                {entity.category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(maxRows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="cursor-pointer hover:bg-gray-100">
              {selectedData.map((entity, colIndex) => (
                <td key={colIndex} className="p-3">
                  {entity.items[rowIndex] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const ProcessingTables = ({ processingData, processingDetails, setProcessingData, setProcessingDetails, arrayEntities }) => {
  const [selectedProcessingId, setSelectedProcessingId] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [savedRow, setSavedRow] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [newRow, setNewRow] = useState(null);

  // Get all available input options from array entities
  const inputOptions = useMemo(() => {
    const options = new Set();
    arrayEntities.forEach(entity => {
      entity.items.forEach(item => {
        if (item && item !== '-') {
          options.add(item);
        }
      });
    });
    return Array.from(options);
  }, [arrayEntities]);

  const handleRowClick = (e, id) => {
    if (!e.target.closest('button') && !e.target.closest('input')) {
      setSelectedProcessingId(selectedProcessingId === id ? null : id);
      setEditingRow(null);
      setSavedRow(null);
      setTempData(null);
    }
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation();
    if (editingRow === id) {
      if (tempData) {
        const updatedData = processingData.map((item) =>
          item.id === id ? tempData : item
        );
        setProcessingData(updatedData);
      }
      setEditingRow(null);
      setSavedRow(id);
      setTempData(null);
      setSelectedProcessingId(null);
      setTimeout(() => {
        setSavedRow(null);
      }, 2000);
    } else {
      setEditingRow(id);
      setSavedRow(null);
      setSelectedProcessingId(null);
      const currentRow = processingData.find(item => item.id === id);
      setTempData(currentRow);
    }
  };

  const handleInputChange = (id, field, value) => {
    if (tempData) {
      const newTempData = {
        ...tempData,
        [field]: field === 'inputs' ? Array.from(value) : value
      };
      setTempData(newTempData);
    }
  };

  const handleNewRowInputChange = (field, value) => {
    if (newRow) {
      const updatedNewRow = {
        ...newRow,
        [field]: field === 'inputs' ? Array.from(value) : value
      };
      setNewRow(updatedNewRow);
    }
  };

  const handleNewRowKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (newRow) {
        setProcessingData([...processingData, newRow]);
        setNewRow(null);
      }
    }
  };

  const addNewRow = () => {
    const newId = (processingData.length + 1).toString().padStart(2, "0");
    const emptyRow = {
      id: newId,
      pre: "",
      suc: "",
      inputs: [],
      processingBrief: "",
      outputs: "",
    };
    setNewRow(emptyRow);
  };

  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Tabulations</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-3 bg-gray-300">id#</th>
            <th className="p-3 bg-gray-300">pre</th>
            <th className="p-3 bg-gray-300">suc</th>
            <th className="p-3 bg-gray-300">inputs</th>
            <th className="p-3 bg-gray-300">processing brief</th>
            <th className="p-3 bg-gray-300">outputs</th>
            <th className="p-3 bg-gray-300">action</th>
          </tr>
        </thead>
        <tbody>
          {processingData.map((item) => (
            <tr 
              key={item.id} 
              className={`cursor-pointer ${
                selectedProcessingId === item.id 
                  ? 'bg-[#f0b100]' 
                  : editingRow === item.id 
                    ? 'bg-gray-100' 
                    : 'hover:bg-gray-100'
              }`} 
              onClick={(e) => handleRowClick(e, item.id)}
            >
              <td className="p-2">{item.id}</td>
              <td className="p-2">
                {editingRow === item.id ? (
                  <CustomDropdown
                    options={["-", ...processingData.map(row => row.id)]}
                    value={tempData?.pre || item.pre}
                    onChange={(value) => handleInputChange(item.id, "pre", value)}
                    placeholder="Select predecessor"
                  />
                ) : (
                  item.pre
                )}
              </td>
              <td className="p-2">
                {editingRow === item.id ? (
                  <CustomDropdown
                    options={["-", ...processingData.map(row => row.id)]}
                    value={tempData?.suc || item.suc}
                    onChange={(value) => handleInputChange(item.id, "suc", value)}
                    placeholder="Select successor"
                  />
                ) : (
                  item.suc
                )}
              </td>
              <td className="p-2">
                {editingRow === item.id ? (
                  <CustomDropdown
                    options={inputOptions}
                    value={tempData?.inputs || item.inputs}
                    onChange={(value) => handleInputChange(item.id, "inputs", value)}
                    multiple={true}
                    placeholder="Select inputs"
                  />
                ) : (
                  item.inputs.join(", ")
                )}
              </td>
              <td className="p-2">
                {editingRow === item.id ? (
                  <input
                    type="text"
                    className="w-full p-1 rounded bg-gray-100"
                    value={tempData?.processingBrief || item.processingBrief}
                    onChange={(e) => handleInputChange(item.id, "processingBrief", e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  item.processingBrief
                )}
              </td>
              <td className="p-2">
                {editingRow === item.id ? (
                  <input
                    type="text"
                    className="w-full p-1 rounded bg-gray-100"
                    value={tempData?.outputs || item.outputs}
                    onChange={(e) => handleInputChange(item.id, "outputs", e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  item.outputs
                )}
              </td>
              <td className="p-2">
                <button
                  onClick={(e) => handleEditClick(e, item.id)}
                  className={`px-3 py-1 rounded ${
                    editingRow === item.id 
                      ? 'text-blue-400' 
                      : savedRow === item.id 
                        ? 'text-green-400' 
                        : 'text-blue-400'
                  }`}
                >
                  {editingRow === item.id 
                    ? 'Save' 
                    : savedRow === item.id 
                      ? 'Saved!' 
                      : 'Edit'}
                </button>
              </td>
            </tr>
          ))}
          {newRow && (
            <tr className="">
              <td className="p-2 text-gray-300">{newRow.id}</td>
              <td className="p-2">
                <CustomDropdown
                  options={["-", ...processingData.map(row => row.id)]}
                  value={newRow.pre}
                  onChange={(value) => handleNewRowInputChange("pre", value)}
                  placeholder="Select predecessor"
                />
              </td>
              <td className="p-2">
                <CustomDropdown
                  options={["-", ...processingData.map(row => row.id)]}
                  value={newRow.suc}
                  onChange={(value) => handleNewRowInputChange("suc", value)}
                  placeholder="Select successor"
                />
              </td>
              <td className="p-2">
                <CustomDropdown
                  options={inputOptions}
                  value={newRow.inputs}
                  onChange={(value) => handleNewRowInputChange("inputs", value)}
                  multiple={true}
                  placeholder="Select inputs"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  className="w-full p-1 rounded border"
                  placeholder="Enter processing brief"
                  value={newRow.processingBrief}
                  onChange={(e) => handleNewRowInputChange("processingBrief", e.target.value)}
                  onKeyDown={handleNewRowKeyDown}
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  className="w-full p-1 rounded border"
                  placeholder="Enter outputs"
                  value={newRow.outputs}
                  onChange={(e) => handleNewRowInputChange("outputs", e.target.value)}
                  onKeyDown={handleNewRowKeyDown}
                />
              </td>
              <td className="p-2">
                <button
                  onClick={() => {
                    setProcessingData([...processingData, newRow]);
                    setNewRow(null);
                  }}
                  className="px-3 py-1 text-blue-400 rounded"
                >
                  Save
                </button>
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="7" className="p-2">
              <button
                className="px-4 py-2 text-blue-400 hover:bg-gray-200 rounded"
                onClick={addNewRow}
              >
                + 
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {selectedProcessingId && !editingRow && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Processing Details</h3>
          <ProcessingDetailsTable 
            selectedId={selectedProcessingId} 
            processingDetails={processingDetails} 
            setProcessingDetails={setProcessingDetails} 
          />
        </div>
      )}
    </div>
  );
};

const ProcessingDetailsTable = ({ selectedId, processingDetails, setProcessingDetails }) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRowData, setNewRowData] = useState({
    scope: "",
    limits: "",
    processingDetails: ""
  });

  if (!selectedId) return null;

  const selectedDetails = processingDetails.filter((item) => item.id === selectedId);

  const handleCellClick = (field, value) => {
    setEditingCell(field);
    setEditValue(value);
  };

  const handleCellBlur = () => {
    if (editingCell && editValue !== selectedDetails[editingCell]) {
      const updatedDetails = processingDetails.map(item =>
        item.id === selectedId
          ? { ...item, [editingCell]: editValue }
          : item
      );
      setProcessingDetails(updatedDetails);
    }
    setEditingCell(null);
    setEditValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCellBlur();
    }
  };

  const handleNewRowInputChange = (field, value) => {
    setNewRowData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewRowKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      const updatedData = {
        ...newRowData,
        [field]: e.target.value
      };
      
      // Save the row immediately when Enter is pressed
      const newDetailRow = {
        id: selectedId,
        ...updatedData
      };
      
      setProcessingDetails(prev => [...prev, newDetailRow]);
      setNewRowData({
        scope: "",
        limits: "",
        processingDetails: ""
      });
      setShowNewRow(false);
    }
  };

  const addNewDetailRow = () => {
    setShowNewRow(true);
    setNewRowData({
      scope: "",
      limits: "",
      processingDetails: ""
    });
  };

  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg bg-gray-100 mt-6">
      <h2 className="text-xl font-semibold mb-4">Processing Details</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="bg-gray-300 p-4 text-base">Scope</th>
            <th className="bg-gray-300 p-4 text-base">Limits</th>
            <th className="bg-gray-300 p-4 text-base">Processing Details</th>
          </tr>
        </thead>
        <tbody>
          {selectedDetails.map((detail, index) => (
            <tr key={index}>
              <td 
                className="p-4 border border-gray-300 cursor-pointer hover:bg-gray-50 text-base"
                onClick={() => handleCellClick("scope", detail.scope)}
              >
                {editingCell === "scope" && detail.id === selectedId ? (
                  <input
                    type="text"
                    className="w-full p-2 border rounded bg-white"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleCellBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                ) : (
                  detail.scope
                )}
              </td>
              <td 
                className="p-4 border border-gray-300 cursor-pointer hover:bg-gray-50 text-base"
                onClick={() => handleCellClick("limits", detail.limits)}
              >
                {editingCell === "limits" && detail.id === selectedId ? (
                  <input
                    type="text"
                    className="w-full p-2 border rounded bg-white"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleCellBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                ) : (
                  detail.limits
                )}
              </td>
              <td 
                className="p-4 border border-gray-300 cursor-pointer hover:bg-gray-50 text-base"
                onClick={() => handleCellClick("processingDetails", detail.processingDetails)}
              >
                {editingCell === "processingDetails" && detail.id === selectedId ? (
                  <input
                    type="text"
                    className="w-full p-2 border rounded bg-white"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleCellBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                ) : (
                  detail.processingDetails
                )}
              </td>
            </tr>
          ))}
          {showNewRow && (
            <tr className="bg-gray-50">
              <td className="p-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded bg-white"
                  placeholder="Enter scope"
                  value={newRowData.scope}
                  onChange={(e) => handleNewRowInputChange("scope", e.target.value)}
                  onKeyDown={(e) => handleNewRowKeyDown(e, "scope")}
                  autoFocus
                />
              </td>
              <td className="p-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded bg-white"
                  placeholder="Enter limits"
                  value={newRowData.limits}
                  onChange={(e) => handleNewRowInputChange("limits", e.target.value)}
                  onKeyDown={(e) => handleNewRowKeyDown(e, "limits")}
                />
              </td>
              <td className="p-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded bg-white"
                  placeholder="Enter processing details"
                  value={newRowData.processingDetails}
                  onChange={(e) => handleNewRowInputChange("processingDetails", e.target.value)}
                  onKeyDown={(e) => handleNewRowKeyDown(e, "processingDetails")}
                />
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="3" className="p-4">
              <button
                className="px-4 py-2 text-blue-500 hover:bg-gray-200 rounded"
                onClick={addNewDetailRow}
              >
                + 
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProcessingEditor;