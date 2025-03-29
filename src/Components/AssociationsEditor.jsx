import { useState } from "react";
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
        id: 1,
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
        id: 2,
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
        id: 1,
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
        id: 2,
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
        id: 3,
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
}) => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const handleRowClick = (id, level, association) => {
    setSelectedRowId(id === selectedRowId ? null : id);
    onLevelSelect(level, association);
  };

  const renderRows = (items, level = 0) => {
    return items.map((item) => (
      <>
        <tr
          key={item.id}
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
            className="p-2 cursor-pointer w-10"
            onClick={() => toggleRow(item.id)}
          >
            {item.children && item.children.length > 0
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
            onClick={() => handleRowClick(item.id, `L${level + 1}`, item)}
          >
            <span className="mr-2">L{level + 1}</span> {item.name}
          </td>
          <td className="p-2">{item.description || ""}</td>
        </tr>
        {expandedRows[item.id] && item.children
          ? renderRows(item.children, level + 1)
          : null}
      </>
    ));
  };

  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6">
      <table className="w-full text-left">
        <thead>
          <tr className="">
            <th className="p-3 w-10 bg-gray-300">#</th>
            <th className="p-3 bg-gray-300">Association Name</th>
            <th className="p-3 bg-gray-300">Association Description</th>
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
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [breadcrumbHistory, setBreadcrumbHistory] = useState({
    L1: null,
    L2: null,
    L3: null,
  });

  // Function to handle checkbox changes
  const handleCheckboxChange = (association, category, item) => {
    const key = `${association}-${category}-${item}`;
    setSelectedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setHasChanges(true);
  };

  // Function to handle association selection
  const handleAssociationClick = (association) => {
    setSelectedAssociation(association);
    setBreadcrumbHistory((prev) => ({
      ...prev,
      [currentLevel]: association,
    }));

    // Update selected items based on the association's selected values
    const newSelectedItems = {};
    Object.entries(association.selected).forEach(([category, items]) => {
      items.forEach((item) => {
        newSelectedItems[`${association.name}-${category}-${item}`] = true;
      });
    });
    setSelectedItems(newSelectedItems);
    setHasChanges(false);
  };

  // Function to handle save
  const handleSave = () => {
    if (selectedAssociation) {
      // Update the association in the directory table
      const updateDirectoryTable = (data, level, association) => {
        return data.map((item) => {
          if (item.id === association.id) {
            return { ...item, ...association };
          }
          if (item.children) {
            return {
              ...item,
              children: updateDirectoryTable(item.children, level, association),
            };
          }
          return item;
        });
      };

      // Update the tableData with the new association
      const updatedTableData = updateDirectoryTable(
        tableData,
        currentLevel,
        selectedAssociation
      );
      // You would typically update your data source here
      // For now, we'll just log it
      console.log("Updated directory table:", updatedTableData);
    }
    setHasChanges(false);
  };

  // Function to handle cancel
  const handleCancel = () => {
    setSelectedItems({});
    setHasChanges(false);
  };

  // Function to handle next
  const handleNext = () => {
    if (!selectedAssociation) {
      alert("Please select an association first");
      return;
    }

    const hasSelectedItems = Object.values(selectedAssociation.selected).some(
      (items) => items.length > 0
    );

    if (!hasSelectedItems) {
      alert("Please select items in the current association before proceeding");
      return;
    }

    // Find child associations based on parent name
    const nextLevel = currentLevel === "L1" ? "L2" : "L3";
    const childAssociations = associationsData[nextLevel].associations.filter(
      (assoc) => assoc.parentAssociation === selectedAssociation.name
    );

    // Set the first child association if available
    if (childAssociations.length > 0) {
      setSelectedAssociation(childAssociations[0]);
      setBreadcrumbHistory((prev) => ({
        ...prev,
        [nextLevel]: childAssociations[0],
      }));
    } else {
      setSelectedAssociation(null);
    }

    setCurrentLevel(nextLevel);
    setSelectedItems({});
    setHasChanges(false);
  };

  // Function to handle level selection from directory table
  // const handleLevelSelect = (level, association) => {
  //   setCurrentLevel(level);
  //   setSelectedAssociation(association);
  //   setBreadcrumbHistory((prev) => ({
  //     ...prev,
  //     [level]: association,
  //   }));
  // };
  const handleLevelSelect = (level, association) => {
    setCurrentLevel(level);
    setSelectedAssociation(association);

    setBreadcrumbHistory((prev) => {
      const updatedHistory = { ...prev };

      if (level === "L1") {
        updatedHistory.L1 = association;
        updatedHistory.L2 = null;
        updatedHistory.L3 = null;
      } else if (level === "L2") {
        updatedHistory.L2 = association;
        updatedHistory.L1 = prev.L1 || association.parentAssociation; // Ensure parent is stored
        updatedHistory.L3 = null;
      } else if (level === "L3") {
        updatedHistory.L3 = association;
        updatedHistory.L2 = prev.L2 || association.parentAssociation;
        updatedHistory.L1 =
          prev.L1 ||
          (prev.L2 ? prev.L2.parentAssociation : association.parentAssociation);
      }

      return updatedHistory;
    });
  };

  const Breadcrumb = () => {
    // Get parent L1 association name for L2 and L3
    const getParentL1Name = () => {
      if (currentLevel === "L2") {
        return (
          selectedAssociation?.parentAssociation ||
          breadcrumbHistory.L1?.name ||
          ""
        );
      }
      if (currentLevel === "L3") {
        const parentL2 =
          breadcrumbHistory.L2 ||
          associationsData.L2.associations.find(
            (a) => a.name === selectedAssociation?.parentAssociation
          );
        return parentL2?.parentAssociation || breadcrumbHistory.L1?.name || "";
      }
      return breadcrumbHistory.L1?.name || "";
    };

    // Get parent L2 association name for L3
    const getParentL2Name = () => {
      if (currentLevel === "L3") {
        return (
          selectedAssociation?.parentAssociation ||
          breadcrumbHistory.L2?.name ||
          ""
        );
      }
      return breadcrumbHistory.L2?.name || "";
    };

    const handleL1Click = () => {
      const parentL1 = breadcrumbHistory.L1;
      setCurrentLevel("L1");
      setSelectedAssociation(parentL1);
    };

    const handleL2Click = () => {
      const parentL2 = breadcrumbHistory.L2;
      if (parentL2) {
        setCurrentLevel("L2");
        setSelectedAssociation(parentL2);
      }
    };

    return (
      <div className="text-gray-800 mb-4 flex items-center space-x-2">
        <span
          className="cursor-pointer hover:text-blue-400"
          onClick={handleL1Click}
        >
          L1{" "}
          {breadcrumbHistory.L1?.name ? `(${breadcrumbHistory.L1.name})` : ""}
        </span>

        {(currentLevel === "L2" || currentLevel === "L3") && (
          <>
            <span className="text-gray-700"> - </span>
            <span
              className="cursor-pointer hover:text-blue-400"
              onClick={handleL2Click}
            >
              L2{" "}
              {breadcrumbHistory.L2?.name
                ? `(${breadcrumbHistory.L2.name})`
                : ""}
            </span>
          </>
        )}

        {currentLevel === "L3" && (
          <>
            <span className="text-gray-700"> - </span>
            <span className="cursor-pointer hover:text-blue-400">
              L3{" "}
              {selectedAssociation?.name ? `(${selectedAssociation.name})` : ""}
            </span>
          </>
        )}
      </div>
    );
  };
  const [showModal, setShowModal] = useState(false);

  // Get current categories based on level
  const getCurrentCategories = () => {
    switch (currentLevel) {
      case "L1":
        return ["snow fruits", "dry fruits", "nuts", "bananas"];
      case "L2":
        return ["apricot", "dates", "walnut", "groundnut", "rasthali"];
      case "L3":
        return ["Srinagar", "Tehran", "Kalanktang", "Cuddalore", "Erode"];
      default:
        return [];
    }
  };

  // Modal form component
  const AddRowModal = () => {
    const [formData, setFormData] = useState({
      name: selectedAssociation?.name || "",
      selected: selectedAssociation
        ? Object.entries(selectedAssociation.categories).reduce(
            (acc, [category, items]) => {
              items.forEach((item) => {
                acc[`${category}-${item}`] =
                  selectedAssociation.selected[category]?.includes(item);
              });
              return acc;
            },
            {}
          )
        : {},
    });

    const handleCheckboxChange = (category, item) => {
      setFormData((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          [`${category}-${item}`]: !prev.selected[`${category}-${item}`],
        },
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!formData.name.trim()) {
        alert("Please enter an association name");
        return;
      }

      let categories = {};
      let selected = {};

      if (currentLevel === "L1") {
        categories = associationsData.L1.associations[0].categories;
        selected = Object.keys(categories).reduce((acc, category) => {
          acc[category] = categories[category].filter(
            (item) => formData.selected[`${category}-${item}`]
          );
          return acc;
        }, {});
      } else {
        const parentAssoc =
          currentLevel === "L2" ? breadcrumbHistory.L1 : breadcrumbHistory.L2;
        if (parentAssoc) {
          Object.entries(parentAssoc.selected).forEach(([category, items]) => {
            if (items && items.length > 0) {
              items.forEach((item) => {
                categories[item] =
                  associationsData[currentLevel].associations[0].categories[
                    item
                  ] || [];
                selected[item] = categories[item].filter(
                  (subItem) => formData.selected[`${item}-${subItem}`]
                );
              });
            }
          });
        }
      }

      const updatedAssociation = {
        id: selectedAssociation?.id || Date.now(),
        name: formData.name.trim(),
        categories,
        selected,
        parentAssociation:
          currentLevel === "L1"
            ? null
            : breadcrumbHistory[`L${parseInt(currentLevel.charAt(1)) - 1}`]
                ?.name,
      };

      if (selectedAssociation) {
        // Update existing association
        Object.assign(selectedAssociation, updatedAssociation);
      } else {
        // Create new association
        associationsData[currentLevel].associations.push(updatedAssociation);
        setSelectedAssociation(updatedAssociation);
      }

      setHasChanges(true);
      setShowModal(false);
    };

    // Get appropriate categories based on level and parent selection
    const getModalCategories = () => {
      if (currentLevel === "L1") {
        return associationsData.L1.associations[0].categories;
      } else {
        const parentAssoc =
          currentLevel === "L2" ? breadcrumbHistory.L1 : breadcrumbHistory.L2;
        if (!parentAssoc) return {};

        const categories = {};
        Object.entries(parentAssoc.selected).forEach(([category, items]) => {
          if (items && items.length > 0) {
            items.forEach((item) => {
              categories[item] =
                associationsData[currentLevel].associations[0].categories[
                  item
                ] || [];
            });
          }
        });
        return categories;
      }
    };

    const modalCategories = getModalCategories();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl text-black mb-4">
            {selectedAssociation ? "Edit Association" : "Add New Association"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-black mb-2">
                Name of Association
              </label>
              <input
                type="text"
                className="w-full bg-gray-300 text-black p-2 rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {Object.entries(modalCategories).map(([category, items]) => (
                <div key={category} className="bg-gray-300 rounded-lg p-4">
                  <h3 className="text-lg text-black font-medium mb-3">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {items.map((item) => (
                      <label
                        key={item}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600 bg-white border-black rounded"
                          checked={
                            formData.selected[`${category}-${item}`] || false
                          }
                          onChange={() => handleCheckboxChange(category, item)}
                        />
                        <span className="text-black">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-white text-black rounded hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {selectedAssociation ? "Save Changes" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const [expandedRows, setExpandedRows] = useState({});
  //  const [selectedItems, setSelectedItems] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to get headers based on parent selection
  const getTableHeaders = () => {
    switch (currentLevel) {
      case "L1":
        return ["snow fruits", "dry fruits", "nuts", "bananas"];
      case "L2": {
        if (!breadcrumbHistory.L1) return [];

        // Get all selected values from the parent L1 association
        const headers = [];
        Object.entries(breadcrumbHistory.L1.selected).forEach(
          ([category, items]) => {
            if (items && items.length > 0) {
              headers.push(...items);
            }
          }
        );
        return headers;
      }
      case "L3": {
        if (!breadcrumbHistory.L2) return [];

        // Get all selected values from the parent L2 association
        const headers = [];
        Object.entries(breadcrumbHistory.L2.selected).forEach(
          ([category, items]) => {
            if (items && items.length > 0) {
              headers.push(...items);
            }
          }
        );
        return headers;
      }
      default:
        return [];
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-3xl font-semibold mb-6">Associations Directory</h1>
      <DynamicTable
        data={tableData}
        expandedRows={expandedRows}
        toggleRow={toggleRow}
        onLevelSelect={handleLevelSelect}
        currentLevel={currentLevel}
        selectedAssociation={selectedAssociation}
      />
      <div className="bg-white p-6">
        <Breadcrumb />
        <div className="bg-white rounded">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-3 text-left text-black w-48">Associations</th>
                {getTableHeaders().map((header) => (
                  <th key={header} className="p-3 text-left text-black">
                    {header}
                  </th>
                ))}
                <th className="p-3 text-left text-black w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {associationsData[currentLevel].associations.map((assoc) => (
                <tr
                  key={assoc.id}
                  className={`${
                    selectedAssociation?.id === assoc.id
                      ? "bg-yellow-600"
                      : "bg-gray-200"
                  }`}
                >
                  <td
                    className="p-3 text-black cursor-pointer hover:text-blue-400"
                    onClick={() => handleAssociationClick(assoc)}
                  >
                    {assoc.name}
                  </td>
                  {getTableHeaders().map((header) => (
                    <td key={header} className="p-3">
                      <div className="space-y-1">
                        {currentLevel === "L1"
                          ? // For L1, show selected items from each category
                            assoc.selected[header]?.map((item) => (
                              <div key={item} className="text-black text-sm">
                                {item}
                              </div>
                            ))
                          : // For L2 and L3, show selected items directly
                            assoc.selected[header]?.map((item) => (
                              <div key={item} className="text-black text-sm">
                                {item}
                              </div>
                            ))}
                      </div>
                    </td>
                  ))}
                  <td className="p-3">
                    <button
                      className="text-blue-400 hover:text-blue-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAssociation(assoc);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add button */}
          <div className="bg-gray-200 p-2 text-center">
            <button
              className="cursor-pointer text-black"
              onClick={() => {
                setSelectedAssociation(null);
                setShowModal(true);
              }}
            >
              <Plus className="w-5 h-5 inline" />
            </button>
          </div>
        </div>
        {/* Add/Edit modal */}
        {showModal && <AddRowModal />}
        {/* Action buttons */}
        <div className="flex justify-between mt-4">
          <div className="space-x-4">
            <button
              className={`px-4 py-2 rounded cursor-pointer text-white ${
                hasChanges ? "bg-red-500 hover:bg-red-600" : "bg-gray-600"
              }`}
              disabled={!hasChanges}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`cursor-pointer px-4 py-2 rounded text-white ${
                hasChanges ? "bg-green-500 hover:bg-green-600" : "bg-gray-600"
              }`}
              disabled={!hasChanges}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          <button
            className={`cursor-pointer px-4 py-2 rounded text-white ${
              currentLevel === "L3"
                ? "bg-gray-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={currentLevel === "L3"}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
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
