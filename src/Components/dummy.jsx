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

// Initial state for selections
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
  };

  // Function to handle save
  const handleSave = () => {
    // Save the selected items
    console.log("Saving selections:", selectedItems);
    setHasChanges(false);
  };

  // Function to handle cancel
  const handleCancel = () => {
    setSelectedItems({});
    setHasChanges(false);
  };

  // Function to handle next
  const handleNext = () => {
    if (currentLevel === "L1") setCurrentLevel("L2");
    else if (currentLevel === "L2") setCurrentLevel("L3");
    setSelectedItems({});
    setHasChanges(false);
  };
  // Function to handle breadcrumb navigation
  const handleBreadcrumbClick = (level, association = null) => {
    if (level === "L1" || level === "L2" || level === "L3") {
      setCurrentLevel(level);
      if (association) {
        setSelectedAssociation(association);
      }
    }
  };

  const Breadcrumb = () => {
    return (
      <div className="text-gray-300 mb-4 flex items-center space-x-2">
        <span
          className="cursor-pointer hover:text-blue-400"
          onClick={() => handleBreadcrumbClick("L1")}
        >
          L1
        </span>

        {(currentLevel === "L2" || currentLevel === "L3") && (
          <>
            <span className="text-gray-500">
              {" "}
              - {selectedAssociation?.parentL1 || ""} ){" "}
            </span>
            <span
              className="cursor-pointer hover:text-blue-400"
              onClick={() => handleBreadcrumbClick("L2")}
            >
              L2
            </span>
          </>
        )}

        {currentLevel === "L3" && (
          <>
            <span className="text-gray-500">
              {" "}
              - {selectedAssociation?.parentL2 || ""} ){" "}
            </span>
            <span
              className="cursor-pointer hover:text-blue-400"
              onClick={() => handleBreadcrumbClick("L3")}
            >
              L3
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
                  selectedAssociation.selected[category].includes(item);
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

      // Get the categories from the first association (template)
      const templateCategories =
        associationsData[currentLevel].associations[0].categories;

      // Convert selections to the required format
      const selected = Object.keys(templateCategories).reduce(
        (acc, category) => {
          acc[category] = templateCategories[category].filter(
            (item) => formData.selected[`${category}-${item}`]
          );
          return acc;
        },
        {}
      );

      if (selectedAssociation) {
        // Update existing association
        selectedAssociation.name = formData.name.trim();
        selectedAssociation.selected = selected;
      } else {
        // Create new association
        const newAssociation = {
          id: Date.now(),
          name: formData.name.trim(),
          categories: templateCategories,
          selected: selected,
        };

        // Add parent association info if needed
        if (currentLevel === "L2") {
          newAssociation.parentL1 = selectedAssociation?.name;
          newAssociation.parentAssociation = selectedAssociation?.name;
        } else if (currentLevel === "L3") {
          newAssociation.parentL1 = selectedAssociation?.parentL1;
          newAssociation.parentL2 = selectedAssociation?.name;
          newAssociation.parentAssociation = selectedAssociation?.name;
        }

        associationsData[currentLevel].associations.push(newAssociation);
        setSelectedAssociation(newAssociation);
      }

      setHasChanges(true);
      setShowModal(false);
    };

    // Get categories from the first association (template)
    const templateCategories =
      associationsData[currentLevel].associations[0].categories;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl text-white mb-4">
            {selectedAssociation ? "Edit Association" : "Add New Association"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">
                Name of Association
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white p-2 rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {Object.entries(templateCategories).map(([category, items]) => (
                <div key={category} className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg text-gray-300 font-medium mb-3">
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
                          className="form-checkbox h-4 w-4 text-blue-600 bg-gray-600 border-gray-500 rounded"
                          checked={
                            formData.selected[`${category}-${item}`] || false
                          }
                          onChange={() => handleCheckboxChange(category, item)}
                        />
                        <span className="text-gray-300">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
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

  return (
    <div className="bg-gray-800 p-6">
      <Breadcrumb />
      <div className="bg-gray-900 rounded">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-left text-gray-300 w-48">Associations</th>
              {currentLevel === "L1" && (
                <>
                  <th className="p-3 text-left text-gray-300">snow fruits</th>
                  <th className="p-3 text-left text-gray-300">dry fruits</th>
                  <th className="p-3 text-left text-gray-300">nuts</th>
                  <th className="p-3 text-left text-gray-300">bananas</th>
                </>
              )}
              {currentLevel === "L2" && (
                <>
                  <th className="p-3 text-left text-gray-300">apricot</th>
                  <th className="p-3 text-left text-gray-300">dates</th>
                  <th className="p-3 text-left text-gray-300">walnut</th>
                  <th className="p-3 text-left text-gray-300">groundnut</th>
                  <th className="p-3 text-left text-gray-300">rasthali</th>
                </>
              )}
              {currentLevel === "L3" && (
                <>
                  <th className="p-3 text-left text-gray-300">Srinagar</th>
                  <th className="p-3 text-left text-gray-300">Tehran</th>
                  <th className="p-3 text-left text-gray-300">Kalanktang</th>
                  <th className="p-3 text-left text-gray-300">Cuddalore</th>
                  <th className="p-3 text-left text-gray-300">Erode</th>
                </>
              )}
              <th className="p-3 text-left text-gray-300 w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {associationsData[currentLevel].associations.map((assoc) => (
              <tr
                key={assoc.id}
                className={`border-b border-gray-700 ${
                  selectedAssociation?.id === assoc.id
                    ? "bg-yellow-600"
                    : "bg-gray-800"
                }`}
              >
                <td
                  className="p-3 text-gray-300 cursor-pointer hover:text-blue-400"
                  onClick={() => handleAssociationClick(assoc)}
                >
                  {assoc.name}
                </td>
                {selectedAssociation?.id === assoc.id
                  ? Object.entries(assoc.categories).map(
                      ([category, items]) => (
                        <td key={category} className="p-3">
                          <div className="space-y-1">
                            {assoc.selected[category].map((item) => (
                              <div key={item} className="text-gray-300 text-sm">
                                {item}
                              </div>
                            ))}
                          </div>
                        </td>
                      )
                    )
                  : Object.entries(assoc.categories).map(([category]) => (
                      <td key={category} className="p-3">
                        <div className="text-gray-500 text-sm italic">
                          Click to view
                        </div>
                      </td>
                    ))}
                <td className="p-3">
                  <button
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => {
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
        <div className="bg-gray-700 p-2 text-center">
          <button
            className="text-gray-300 hover:text-white"
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
            className={`px-4 py-2 rounded ${
              hasChanges ? "bg-red-500 hover:bg-red-600" : "bg-gray-600"
            }`}
            disabled={!hasChanges}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded ${
              hasChanges ? "bg-green-500 hover:bg-green-600" : "bg-gray-600"
            }`}
            disabled={!hasChanges}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        <button
          className={`px-4 py-2 rounded ${
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
