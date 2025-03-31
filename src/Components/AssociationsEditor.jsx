import React, { useState } from "react";
import tableData from "./AssociationTable.json";
import Header from "../Components/Header";
import { Plus } from "lucide-react";

const associationsData = {
  L1: {
    associations: [
      {
        id: 1,
        name: "apple shake",
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
          "snow fruits": [],
          "dry fruits": [],
          nuts: [],
          bananas: [],
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
          "snow fruits": [],
          "dry fruits": [],
          nuts: [],
          bananas: [],
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
          "snow fruits": [],
          "dry fruits": [],
          nuts: [],
          bananas: [],
        },
      },
    ],
  },
  L2: {
    associations: [
      {
        id: 5,
        name: "AP special",
        parentAssociation: "dates dessert",
        categories: {
          apricot: ["Srinagar", "Dubai", "Sharjah"],
          dates: ["Tehran", "Dheradun"],
          walnut: ["Kalanktang"],
          groundnut: ["Cuddalore", "Nellore"],
          rasthali: ["Salem", "Erode"],
        },
        selected: {
          apricot: ["Srinagar"],
          dates: [],
          walnut: ["Kalanktang"],
          groundnut: ["Cuddalore"],
          rasthali: [],
        },
      },
      {
        id: 6,
        name: "TN special",
        parentAssociation: "dates dessert",
        categories: {
          apricot: ["Srinagar", "Dubai", "Sharjah"],
          apple: ["Srinagar", "Dubai", "Sharjah"],
          dates: ["Tehran", "Dheradun"],
          walnut: ["Kalanktang"],
          groundnut: ["Cuddalore", "Nellore"],
          rasthali: ["Salem", "Erode"],
        },
        selected: {
          apricot: [],
          dates: ["Tehran"],
          walnut: [],
          groundnut: [],
          rasthali: ["Erode"],
        },
      },
    ],
  },
  L3: {
    associations: [
      {
        id: 7,
        name: "Regular",
        parentAssociation: "TN special",
        categories: {
          Srinagar: ["Hybrid", "GMO"],
          Tehran: ["Hybrid", "Organic"],
          Kalanktang: ["Hybrid", "Organic", "GMO"],
          Cuddalore: ["Hybrid", "Organic", "GMO"],
          Erode: ["Organic"],
        },
        selected: {
          Srinagar: ["Hybrid"],
          Tehran: ["Organic"],
          Kalanktang: ["GMO"],
          Cuddalore: ["Hybrid"],
          Erode: ["Organic"],
        },
      },
      {
        id: 8,
        name: "Hybrid",
        parentAssociation: "TN special",
        categories: {
          Srinagar: ["Hybrid", "GMO"],
          Tehran: ["Hybrid", "Organic"],
          Kalanktang: ["Hybrid", "Organic", "GMO"],
          Cuddalore: ["Hybrid", "Organic", "GMO"],
          Erode: ["Organic"],
        },
        selected: {
          Srinagar: [],
          Tehran: [],
          Kalanktang: [],
          Cuddalore: [],
          Erode: [],
        },
      },
      {
        id: 9,
        name: "Organic",
        parentAssociation: "TN special",
        categories: {
          Srinagar: ["Hybrid", "GMO"],
          Tehran: ["Hybrid", "Organic"],
          Kalanktang: ["Hybrid", "Organic", "GMO"],
          Cuddalore: ["Hybrid", "Organic", "GMO"],
          Erode: ["Organic"],
        },
        selected: {
          Srinagar: [],
          Tehran: [],
          Kalanktang: [],
          Cuddalore: [],
          Erode: [],
        },
      },
    ],
  },
};

// You might also want to add some helper constants for the categories
const tableHeaders = {
  L1: ["snow fruits", "dry fruits", "nuts", "bananas"],
  L2: ["apricot", "dates", "walnut", "groundnut", "rasthali"],
  L3: ["Srinagar", "Tehran", "Kalanktang", "Cuddalore", "Erode"],
};
// const DynamicTable = ({ data, expandedRows, toggleRow }) => {
//   const renderRows = (items, level = 0) => {
//     return items.map((item) => (
//       <>
//         <tr
//           key={item.id}
//           className={` p-2 ${level % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}
//         >
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
//             className={` p-2 pl-${(level + 1) * 6} font-medium`}
//             style={{ paddingLeft: `${level * 20}px` }}
//           >
//             <span className="text-gray-400 mr-2">L{level + 1}</span> {item.name}
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
//     <div className=" p-5 rounded-lg overflow-auto  mb-6">
//       <table className="w-full  text-left">
//         <thead>
//           <tr className="bg-gray-300 text-black">
//             <th className=" p-3 w-10">#</th>
//             <th className=" p-3">Association Name</th>
//             <th className=" p-3">Association Description</th>
//           </tr>
//         </thead>
//         <tbody>{renderRows(data)}</tbody>
//       </table>
//     </div>
//   );
// };
// Initial state for selections
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
    onLevelSelect(level, association);
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
                        <Plus className="w-4 h-4 inline mr-1" /> for{" "}
                        {item.name}
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
                  <Plus className="w-4 h-4 inline mr-1" /> for{" "}
                  {parentItem.name}
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
              <Plus className="w-4 h-4 inline mr-1" /> New Root
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
const initialSelections = {
  L1: {},
  L2: {},
  L3: {},
};

export { associationsData, tableHeaders, initialSelections };

const AssociationsEditor = () => {
  const [currentLevel, setCurrentLevel] = useState("L1");
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [showMappingTable, setShowMappingTable] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [directoryData, setDirectoryData] = useState(
    associationsData.L1.associations.map((l1Assoc) => ({
      ...l1Assoc,
      children: associationsData.L2.associations
        .filter((l2Assoc) => l2Assoc.parentAssociation === l1Assoc.name)
        .map((l2Assoc) => ({
          ...l2Assoc,
          children: associationsData.L3.associations.filter(
            (l3Assoc) => l3Assoc.parentAssociation === l2Assoc.name
          ),
        })),
    }))
  );

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLevelSelect = (level, association) => {
    setCurrentLevel(level);
    setSelectedAssociation(association);
    setShowMappingTable(true);
  };

  const handleAddNewRow = (level, parentAssociation = null) => {
    const newAssociation = {
      id: Date.now(),
      name: "",
      description: "",
      categories: associationsData[level].associations[0].categories,
      selected: {},
      parentAssociation: parentAssociation?.name || null,
    };

    // Initialize selected based on categories
    Object.keys(newAssociation.categories).forEach((category) => {
      newAssociation.selected[category] = [];
    });

    setCurrentLevel(level);
    setSelectedAssociation(newAssociation);
    setShowMappingTable(true);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!selectedAssociation) return;

    // Create a deep copy of the current directory data
    const newDirectoryData = JSON.parse(JSON.stringify(directoryData));

    // Update associationsData first
    const levelAssociations = associationsData[currentLevel].associations;
    const existingIndex = levelAssociations.findIndex(
      (a) => a.id === selectedAssociation.id
    );

    if (existingIndex >= 0) {
      levelAssociations[existingIndex] = selectedAssociation;
    } else {
      levelAssociations.push(selectedAssociation);
    }

    // Function to find and update/add association in the directory tree
    const updateAssociationInTree = (items, association, level) => {
      if (level === "L1") {
        const index = items.findIndex((item) => item.id === association.id);
        if (index >= 0) {
          items[index] = { ...items[index], ...association };
        } else {
          items.push({ ...association, children: [] });
        }
      } else if (level === "L2" || level === "L3") {
        for (let item of items) {
          if (item.name === association.parentAssociation) {
            if (!item.children) item.children = [];
            const childIndex = item.children.findIndex(
              (child) => child.id === association.id
            );
            if (childIndex >= 0) {
              item.children[childIndex] = {
                ...item.children[childIndex],
                ...association,
              };
            } else {
              item.children.push({ ...association, children: [] });
            }
            break;
          } else if (item.children && level === "L3") {
            for (let child of item.children) {
              if (child.name === association.parentAssociation) {
                if (!child.children) child.children = [];
                const l3Index = child.children.findIndex(
                  (l3) => l3.id === association.id
                );
                if (l3Index >= 0) {
                  child.children[l3Index] = { ...association };
                } else {
                  child.children.push({ ...association });
                }
                break;
              }
            }
          }
        }
      }
      return items;
    };

    // Update the directory data based on the current level
    const updatedItems = updateAssociationInTree(
      newDirectoryData,
      selectedAssociation,
      currentLevel
    );

    // Update the state with the new directory data
    setDirectoryData(updatedItems);
    setHasChanges(false);
    setShowMappingTable(false);
  };

  const handleCancel = () => {
    setSelectedAssociation(null);
    setShowMappingTable(false);
    setHasChanges(false);
  };

  const handleAssociationChange = (field, value) => {
    setSelectedAssociation((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleCheckboxChange = (category, item) => {
    if (!selectedAssociation) return;

    const updatedAssociation = { ...selectedAssociation };
    if (!updatedAssociation.selected[category]) {
      updatedAssociation.selected[category] = [];
    }

    if (updatedAssociation.selected[category].includes(item)) {
      updatedAssociation.selected[category] = updatedAssociation.selected[
        category
      ].filter((i) => i !== item);
    } else {
      updatedAssociation.selected[category].push(item);
    }

    setSelectedAssociation(updatedAssociation);
    setHasChanges(true);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Associations Directory</h1>

        {/* Directory Table */}
        <DynamicTable
          data={directoryData}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
          onLevelSelect={handleLevelSelect}
          currentLevel={currentLevel}
          selectedAssociation={selectedAssociation}
          onAddNew={handleAddNewRow}
        />

        {/* Mapping Table */}
        {showMappingTable && (
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedAssociation?.id ? "Edit Association" : "New Association"}
            </h2>

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedAssociation?.name || ""}
                  onChange={(e) =>
                    handleAssociationChange("name", e.target.value)
                  }
                  placeholder="Enter association name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedAssociation?.description || ""}
                  onChange={(e) =>
                    handleAssociationChange("description", e.target.value)
                  }
                  placeholder="Enter association description"
                />
              </div>
            </div>

            {/* Mapping Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 border">Category</th>
                    <th className="p-3 border">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(selectedAssociation?.categories || {}).map(
                    ([category, items]) => (
                      <tr key={category}>
                        <td className="p-3 border font-medium">{category}</td>
                        <td className="p-3 border">
                          <div className="grid grid-cols-2 gap-2">
                            {items.map((item) => (
                              <label key={item} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="mr-2"
                                  checked={
                                    selectedAssociation?.selected[
                                      category
                                    ]?.includes(item) || false
                                  }
                                  onChange={() =>
                                    handleCheckboxChange(category, item)
                                  }
                                />
                                <span>{item}</span>
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSave}
                disabled={!hasChanges}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const styles = `
  .breadcrumb-item {
    @apply cursor-pointer hover:text-blue-400 transition-colors duration-200;
  }

  .breadcrumb-separator {
    @apply text-gray-500 mx-2;
  }

  .modal-input {
    @apply w-full bg-gray-700 text-white p-2 rounded;
  }

  .modal-label {
    @apply block text-gray-300 mb-2;
  }

  .modal-button {
    @apply px-4 py-2 rounded text-white;
  }

  .modal-button-primary {
    @apply bg-blue-500 hover:bg-blue-600;
  }

  .modal-button-secondary {
    @apply bg-gray-600 hover:bg-gray-500;
  }
`;

export default AssociationsEditor;
