// version 1

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
  onAddNew,
}) => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const handleRowClick = (id, level, association, event) => {
    // If clicking the expand button
    if (event.target.closest(".expand-button")) {
      toggleRow(id);
      return;
    }

    // If clicking the association name
    setSelectedRowId(id === selectedRowId ? null : id);
    onLevelSelect(level, association);
  };

  const renderRows = (items, level = 0) => {
    const currentLevelStr = `L${level + 1}`;
    const isLastLevel = level === 2; // L3 is the last level

    return (
      <>
        {items.map((item) => (
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
                className="p-2 cursor-pointer w-10 expand-button"
                onClick={(e) =>
                  handleRowClick(item.id, currentLevelStr, item, e)
                }
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
                onClick={(e) =>
                  handleRowClick(item.id, currentLevelStr, item, e)
                }
              >
                <span className="mr-2">L{level + 1}</span> {item.name}
              </td>
              <td className="p-2">{item.description || ""}</td>
            </tr>
            {expandedRows[item.id] && item.children
              ? renderRows(item.children, level + 1)
              : null}
          </>
        ))}
        {/* Add new row button for each level */}
        <tr className="hover:bg-gray-100">
          <td className="p-2"></td>
          <td
            className="p-2 font-medium cursor-pointer text-blue-500 hover:text-blue-700"
            style={{ paddingLeft: `${level * 20}px` }}
            onClick={() => onAddNew(currentLevelStr)}
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Add New L{level + 1}
          </td>
          <td className="p-2"></td>
        </tr>
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
  const [selectedAssociation, setSelectedAssociation] = useState(
    associationsData.L1.associations[0]
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [breadcrumbHistory, setBreadcrumbHistory] = useState({
    L1: associationsData.L1.associations[0],
    L2: null,
    L3: null,
  });
  const [newAssociationName, setNewAssociationName] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showNewAssociationTable, setShowNewAssociationTable] = useState(false);
  const [newAssociation, setNewAssociation] = useState({
    name: "",
    description: "",
    mappings: {},
  });
  const [editingAssociation, setEditingAssociation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to handle checkbox changes
  const handleCheckboxChange = (association, category, item) => {
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

  const handleNewItemCheckboxChange = (category, item) => {
    setNewItemData((prev) => {
      const newSelected = { ...prev.selected };
      if (!newSelected[category]) {
        newSelected[category] = [];
      }
      if (newSelected[category].includes(item)) {
        newSelected[category] = newSelected[category].filter((i) => i !== item);
      } else {
        newSelected[category].push(item);
      }
      return { ...prev, selected: newSelected };
    });
  };

  // Function to handle association selection
  const handleAssociationClick = (association, event) => {
    // If clicking the expand button
    if (event.target.closest(".expand-button")) {
      setIsExpanded(!isExpanded);
      return;
    }

    // If clicking the association name
    setSelectedAssociation(association);
    setEditingAssociation(association);
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
      // Update the association in associationsData
      const levelAssociations = associationsData[currentLevel].associations;
      const index = levelAssociations.findIndex(
        (a) => a.id === selectedAssociation.id
      );
      if (index !== -1) {
        levelAssociations[index] = selectedAssociation;
      }

      // Update the directory table
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
        updatedHistory.L1 = prev.L1 || association.parentAssociation;
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

      // Update the associationsData
      if (selectedAssociation) {
        // Update existing association
        Object.assign(selectedAssociation, updatedAssociation);
      } else {
        // Create new association
        associationsData[currentLevel].associations.push(updatedAssociation);
        setSelectedAssociation(updatedAssociation);
      }

      // Update the directory table (tableData)
      const updateDirectoryTable = (data, level, association) => {
        if (!data) return data;

        if (level === currentLevel) {
          // If we're at the correct level, update or add the association
          const existingIndex = data.findIndex(
            (item) => item.id === association.id
          );
          if (existingIndex >= 0) {
            // Update existing association
            data[existingIndex] = { ...data[existingIndex], ...association };
          } else {
            // Add new association
            data.push({
              id: association.id,
              name: association.name,
              description: "",
              children: [],
            });
          }
        } else if (
          level === "L1" &&
          (currentLevel === "L2" || currentLevel === "L3")
        ) {
          // For L2 and L3, find the parent in L1 and add/update the child
          data.forEach((item) => {
            if (item.name === association.parentAssociation) {
              if (!item.children) item.children = [];

              if (currentLevel === "L2") {
                // Update or add L2 association
                const existingIndex = item.children.findIndex(
                  (child) => child.id === association.id
                );
                if (existingIndex >= 0) {
                  item.children[existingIndex] = {
                    ...item.children[existingIndex],
                    ...association,
                  };
                } else {
                  item.children.push({
                    id: association.id,
                    name: association.name,
                    description: "",
                    children: [],
                  });
                }
              } else if (currentLevel === "L3") {
                // Find the L2 parent and update or add L3 association
                const l2Parent = item.children.find(
                  (child) => child.name === association.parentAssociation
                );
                if (l2Parent) {
                  if (!l2Parent.children) l2Parent.children = [];
                  const existingIndex = l2Parent.children.findIndex(
                    (child) => child.id === association.id
                  );
                  if (existingIndex >= 0) {
                    l2Parent.children[existingIndex] = {
                      ...l2Parent.children[existingIndex],
                      ...association,
                    };
                  } else {
                    l2Parent.children.push({
                      id: association.id,
                      name: association.name,
                      description: "",
                    });
                  }
                }
              }
            }
          });
        }

        return data;
      };

      // Update the tableData with the new association
      const updatedTableData = updateDirectoryTable(
        tableData,
        currentLevel,
        updatedAssociation
      );
      // You would typically update your data source here
      console.log("Updated directory table:", updatedTableData);

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
    if (!selectedAssociation) return [];

    switch (currentLevel) {
      case "L1":
        return Object.keys(selectedAssociation.categories);
      case "L2": {
        // Get headers from parent L1's selected items
        const parentL1 = breadcrumbHistory.L1;
        if (!parentL1) return [];

        const headers = [];
        Object.entries(parentL1.selected).forEach(([category, items]) => {
          if (items && items.length > 0) {
            headers.push(...items);
          }
        });
        return headers;
      }
      case "L3": {
        // Get headers from parent L2's selected items
        const parentL2 = breadcrumbHistory.L2;
        if (!parentL2) return [];

        const headers = [];
        Object.entries(parentL2.selected).forEach(([category, items]) => {
          if (items && items.length > 0) {
            headers.push(...items);
          }
        });
        return headers;
      }
      default:
        return [];
    }
  };

  const handleAddNewRow = (level) => {
    setShowNewAssociationTable(true);
    setNewAssociation({
      name: "",
      description: "",
      mappings: {},
    });
    setEditingAssociation(null);
  };

  const handleNewAssociationChange = (field, value) => {
    setNewAssociation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMappingChange = (level1Item, level2Item, checked) => {
    setNewAssociation((prev) => {
      const newMappings = { ...prev.mappings };
      if (checked) {
        if (!newMappings[level1Item]) {
          newMappings[level1Item] = [];
        }
        newMappings[level1Item].push(level2Item);
      } else {
        if (newMappings[level1Item]) {
          newMappings[level1Item] = newMappings[level1Item].filter(
            (item) => item !== level2Item
          );
        }
      }
      return { ...prev, mappings: newMappings };
    });
  };

  const handleSaveNewAssociation = () => {
    if (!newAssociation.name.trim()) {
      alert("Please enter an association name");
      return;
    }

    // Get the next ID
    const maxId = Math.max(
      ...associationsData[currentLevel].associations.map((a) => a.id)
    );
    const nextId = maxId + 1;

    const newAssoc = {
      id: nextId,
      name: newAssociation.name.trim(),
      description: newAssociation.description.trim(),
      categories: associationsData[currentLevel].associations[0].categories,
      selected: {},
      parentAssociation:
        currentLevel === "L1"
          ? null
          : breadcrumbHistory[`L${parseInt(currentLevel.charAt(1)) - 1}`]?.name,
    };

    // Initialize selected based on mappings
    Object.keys(
      associationsData[currentLevel].associations[0].categories
    ).forEach((category) => {
      newAssoc.selected[category] = [];
    });

    // Add to associationsData at the beginning
    associationsData[currentLevel].associations.unshift(newAssoc);

    // Update the directory table
    const updateDirectoryTable = (data, level, association) => {
      if (!data) return data;

      if (level === currentLevel) {
        data.unshift({
          id: association.id,
          name: association.name,
          description: association.description,
          children: [],
        });
      }
      return data;
    };

    const updatedTableData = updateDirectoryTable(
      tableData,
      currentLevel,
      newAssoc
    );
    console.log("Updated directory table:", updatedTableData);

    setShowNewAssociationTable(false);
    setNewAssociation({
      name: "",
      description: "",
      mappings: {},
    });
  };

  // Function to get categories based on level and parent selection
  const getCategories = () => {
    if (!selectedAssociation) return {};

    switch (currentLevel) {
      case "L1":
        return selectedAssociation.categories;
      case "L2": {
        // Get categories based on parent L1's selections
        const parentL1 = breadcrumbHistory.L1;
        if (!parentL1) return {};

        const categories = {};
        Object.entries(parentL1.selected).forEach(([category, items]) => {
          items.forEach((item) => {
            categories[item] = selectedAssociation.categories[item] || [];
          });
        });
        return categories;
      }
      case "L3": {
        // Get categories based on parent L2's selections
        const parentL2 = breadcrumbHistory.L2;
        if (!parentL2) return {};

        const categories = {};
        Object.entries(parentL2.selected).forEach(([category, items]) => {
          items.forEach((item) => {
            categories[item] = selectedAssociation.categories[item] || [];
          });
        });
        return categories;
      }
      default:
        return {};
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
        onAddNew={handleAddNewRow}
      />

      {showNewAssociationTable && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Association</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={newAssociation.name}
                onChange={(e) =>
                  handleNewAssociationChange("name", e.target.value)
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
                value={newAssociation.description}
                onChange={(e) =>
                  handleNewAssociationChange("description", e.target.value)
                }
                placeholder="Enter association description"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">Level 1 Items</th>
                  <th className="p-3 border">Level 2 Items</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  associationsData.L1.associations[0].categories
                ).map(([category, items]) => (
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
                                newAssociation.mappings[category]?.includes(
                                  item
                                ) || false
                              }
                              onChange={(e) =>
                                handleMappingChange(
                                  category,
                                  item,
                                  e.target.checked
                                )
                              }
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => setShowNewAssociationTable(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSaveNewAssociation}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Only show the editor if an association is selected or being created */}
      {(selectedAssociation || showNewAssociationTable) && (
        <div className="bg-white p-6">
          <Breadcrumb />
          <div className="bg-white p-5 rounded-lg overflow-auto shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Associations Creator - Editor (Level {currentLevel})
            </h2>

            <div className="flex">
              {/* Left side - Input Fields */}
              <div className="w-1/4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name of Association
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={selectedAssociation.name || ""}
                      onChange={(e) => {
                        setSelectedAssociation({
                          ...selectedAssociation,
                          name: e.target.value,
                        });
                        setHasChanges(true);
                      }}
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
                      value={selectedAssociation.description || ""}
                      onChange={(e) => {
                        setSelectedAssociation({
                          ...selectedAssociation,
                          description: e.target.value,
                        });
                        setHasChanges(true);
                      }}
                      placeholder="Enter association description"
                    />
                  </div>
                </div>
              </div>

              {/* Right side - Categories */}
              <div className="w-3/4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-300 text-black">
                      {getTableHeaders().map((header) => (
                        <th key={header} className="border border-gray-300 p-3">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-black bg-gray-200">
                      {getTableHeaders().map((header) => (
                        <td key={header} className="p-9">
                          {getCategories()[header]?.map((item) => (
                            <label
                              key={item}
                              className="flex items-center mb-2"
                            >
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={
                                  selectedAssociation.selected[
                                    header
                                  ]?.includes(item) || false
                                }
                                onChange={() =>
                                  handleCheckboxChange(
                                    selectedAssociation,
                                    header,
                                    item
                                  )
                                }
                              />
                              <span className="text-black">{item}</span>
                            </label>
                          ))}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Save Button */}
            {hasChanges && (
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
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

