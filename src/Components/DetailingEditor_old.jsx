import React, { useState, useEffect } from "react";
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

    const dummyArrayEntities = [
      { category: "Snow Fruits", items: ["Apricot", ""] },
      { category: "Dry Fruits", items: ["Dates", ""] },
      { category: "Nuts", items: ["Walnut", "Groundnut"] },
      { category: "Bananas", items: ["Rasthali", ""] },
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
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRowId(id === selectedRowId ? null : id);
  };

  const renderRows = (items, level = 0) => {
    return items.map((item) => (
      <>
        <tr
          key={item.id}
          className={`cursor-pointer ${
            selectedRowId === item.id
              ? "bg-yellow-500" // Selected row color
              : hoveredRowId === item.id
              ? "bg-gray-100" // Hover color
              : ""
          }`}
          onMouseEnter={() => setHoveredRowId(item.id)}
          onMouseLeave={() => setHoveredRowId(null)}
        >
          <td
            className=" p-2 cursor-pointer w-10"
            onClick={() => toggleRow(item.id)}
          >
            {item.children && item.children.length > 0
              ? expandedRows[item.id]
                ? "▾"
                : "▸"
              : ""}
          </td>
          <td
            className={` p-2 font-medium cursor-pointer ${
              selectedRowId === item.id ? "bg-yellow-500" : ""
            }`}
            style={{ paddingLeft: `${level * 20}px` }}
            onClick={() => handleRowClick(item.id)}
          >
            <span className=" mr-2">L{level + 1}</span> {item.name}
          </td>
          <td className=" p-2">{item.description || ""}</td>
        </tr>
        {expandedRows[item.id] && item.children
          ? renderRows(item.children, level + 1)
          : null}
      </>
    ));
  };

  return (
    <div className=" p-5 rounded-lg overflow-auto shadow-lg mb-6">
      <table className="w-full text-left">
        <thead>
          <tr className="">
            <th className=" p-3 w-10 bg-gray-300">#</th>
            <th className=" p-3 bg-gray-300">Association Name</th>
            <th className=" p-3 bg-gray-300">Association Description</th>
          </tr>
        </thead>
        <tbody>{renderRows(data)}</tbody>
      </table>
    </div>
  );
};

const ArrayEntitiesTable = ({ data = [] }) => {
  // Ensure data has at least one valid entry before rendering the table
  if (!data.length || !data[0]?.items) {
    return <p className="text-red-500">No data available</p>;
  }

  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-4 ">assot detailing</h2>
      <p className="mb-2">array entities</p>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300 text-black">
            {data.map((entity, index) => (
              <th key={index} className="p-3 font-semibold text-left">
                {entity.category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data[0]?.items?.map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className={`cursor-pointer hover:bg-gray-100 ${
                rowIndex ? "" : ""
              }`}
            >
              {data.map((entity, colIndex) => (
                <td key={colIndex} className="p-3">
                  {entity?.items?.[rowIndex] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProcessingTables = ({
  processingData,
  processingDetails,
  setProcessingData,
}) => {
  const [selectedProcessingId, setSelectedProcessingId] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewProcessing, setIsNewProcessing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [processingSets, setProcessingSets] = useState([]);
  const [processingDetailsData, setProcessingDetailsData] = useState({});
  const inputOptions = [
    { value: "Apricot", label: "Apricot" },
    { value: "Walnut", label: "Walnut" },
    { value: "Groundnut", label: "Groundnut " },
    { value: "Dates", label: "Dates " },
    { value: "Rasthali", label: "Rasthali " },
  ];

  const getNextDetailId = () => {
    if (processingSets.length === 0) return "PD01";
    const existingIds = processingSets.map((item) =>
      parseInt(item.id.replace("PD", ""))
    );
    const maxId = Math.max(...existingIds);
    return `PD${(maxId + 1).toString().padStart(2, "0")}`;
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProcessingDetailChange = (id, field, value) => {
    setProcessingSets((prev) => {
      const newSets = [...prev];
      const index = newSets.findIndex((set) => set.id === id);
      if (index !== -1) {
        newSets[index] = { ...newSets[index], [field]: value };
      }
      return newSets;
    });
  };

  const handleAddProcessingDetail = () => {
    const newId = getNextDetailId();
    setProcessingSets((prev) => [
      ...prev,
      {
        id: newId,
        scope: "",
        limits: "",
        processingDetails: "",
      },
    ]);
  };

  const handleRemoveProcessingDetail = (id) => {
    setProcessingSets((prev) => prev.filter((set) => set.id !== id));
  };

  const getNextId = () => {
    if (processingData.length === 0) return "01";
    const existingIds = processingData.map((item) => parseInt(item.id, 10));
    const maxId = Math.max(...existingIds);
    const nextId = (maxId + 1).toString().padStart(2, "0");
    return nextId;
  };

  const handleRowClick = (id) => {
    setSelectedProcessingId(id);
  };

  const handleOpenModal = (item = null) => {
    setIsNewProcessing(!item);
    setEditedData(
      item || {
        id: getNextId(),
        pre: "",
        suc: "",
        inputs: [],
        processingBrief: "",
        outputs: "",
      }
    );
    if (item) {
      setProcessingSets(processingDetailsData[item.id] || []);
    } else {
      setProcessingSets([
        {
          id: "PD01",
          scope: "",
          limits: "",
          processingDetails: "",
        },
      ]);
    }
    setModalOpen(true);
  };

  const handleAddRow = () => {
    handleOpenModal();
  };

  const handleSave = () => {
    setProcessingData((prevData) => {
      if (prevData.some((item) => item.id === editedData.id)) {
        return prevData.map((item) =>
          item.id === editedData.id ? { ...editedData } : item
        );
      } else {
        return [...prevData, { ...editedData }];
      }
    });
    setProcessingDetailsData((prev) => ({
      ...prev,
      [editedData.id]: processingSets,
    }));
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Tabulations</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-3 bg-gray-300">ID#</th>
            <th className="p-3 bg-gray-300">Predecessor</th>
            <th className="p-3 bg-gray-300">Successor</th>
            <th className="p-3 bg-gray-300">Inputs</th>
            <th className="p-3 bg-gray-300">Processing Brief</th>
            <th className="p-3 bg-gray-300">Outputs</th>
            <th className="p-3 bg-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {processingData.map((item) => (
            <tr
              key={item.id}
              className={`cursor-pointer hover:bg-gray-100 ${
                selectedProcessingId === item.id ? "bg-blue-50" : ""
              }`}
              onClick={() => handleRowClick(item.id)}
            >
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.pre}</td>
              <td className="p-2">{item.suc}</td>
              <td className="p-2">{item.inputs.join(", ")}</td>
              <td className="p-2">{item.processingBrief}</td>
              <td className="p-2">{item.outputs}</td>
              <td className="p-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleOpenModal(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mb-4 px-4 py-2 text-blue-500 rounded"
        onClick={handleAddRow}
      >
        +
      </button>

      {selectedProcessingId && (
        <ProcessingDetailsTable
          selectedId={selectedProcessingId}
          processingDetailsData={processingDetailsData}
          setProcessingDetailsData={setProcessingDetailsData}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-3/4 flex max-h-[80vh] overflow-hidden">
            {/* Left Side: Scrollable Form */}
            <div className="w-1/2 pr-4 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {isNewProcessing ? "New Processing" : "Edit Processing"}
              </h2>

              <label className="block">Predecessor:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={editedData.pre || ""}
                onChange={(e) => handleInputChange("pre", e.target.value)}
              >
                <option value="">None</option>
                {processingData.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.id}
                  </option>
                ))}
              </select>

              <label className="block">Successor:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={editedData.suc || ""}
                onChange={(e) => handleInputChange("suc", e.target.value)}
              >
                <option value="">None</option>
                {processingData.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.id}
                  </option>
                ))}
              </select>

              <label className="block font-medium mb-1">Inputs:</label>
              <div className="relative">
                <button
                  className="w-full p-2 border border-gray-300 rounded mb-2 text-left"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {editedData.inputs?.length > 0
                    ? editedData.inputs.join(", ")
                    : "Select Inputs"}
                </button>
                {showDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded mt-1 z-10 shadow-md">
                    {inputOptions.map((item) => (
                      <label
                        key={item.value}
                        className="flex items-center p-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          value={item.value}
                          checked={editedData.inputs?.includes(item.value)}
                          onChange={(e) => {
                            let newInputs = [...(editedData.inputs || [])];
                            if (e.target.checked) {
                              newInputs.push(item.value);
                            } else {
                              newInputs = newInputs.filter(
                                (val) => val !== item.value
                              );
                            }
                            handleInputChange("inputs", newInputs);
                          }}
                          className="mr-2"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-4">
                Selected:{" "}
                {editedData.inputs?.length > 0
                  ? editedData.inputs.join(", ")
                  : "None"}
              </p>

              <label className="block">Processing Brief:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={editedData.processingBrief || ""}
                onChange={(e) =>
                  handleInputChange("processingBrief", e.target.value)
                }
              />

              <label className="block">Outputs:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={editedData.outputs || ""}
                onChange={(e) => handleInputChange("outputs", e.target.value)}
              />

              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Right Side: Processing Details */}
            <div className="w-1/2 pl-4 border-l overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Processing Details</h2>

              {processingSets.map((set) => (
                <div key={set.id} className="mb-6 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Detail ID: {set.id}</h3>
                    {set.id !== "PD01" && (
                      <button
                        onClick={() => handleRemoveProcessingDetail(set.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Remove Detail
                      </button>
                    )}
                  </div>

                  <label className="block mb-2">Scope</label>
                  <input
                    type="text"
                    value={set.scope}
                    onChange={(e) =>
                      handleProcessingDetailChange(
                        set.id,
                        "scope",
                        e.target.value
                      )
                    }
                    className="border p-2 w-full mb-4"
                  />

                  <label className="block mb-2">Limits</label>
                  <input
                    type="text"
                    value={set.limits}
                    onChange={(e) =>
                      handleProcessingDetailChange(
                        set.id,
                        "limits",
                        e.target.value
                      )
                    }
                    className="border p-2 w-full mb-4"
                  />

                  <label className="block mb-2">Processing Details</label>
                  <input
                    type="text"
                    value={set.processingDetails}
                    onChange={(e) =>
                      handleProcessingDetailChange(
                        set.id,
                        "processingDetails",
                        e.target.value
                      )
                    }
                    className="border p-2 w-full mb-4"
                  />
                </div>
              ))}

              <button
                onClick={handleAddProcessingDetail}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Add New Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProcessingDetailsTable = ({
  selectedId,
  processingDetailsData,
  setProcessingDetailsData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    scope: "",
    limits: "",
    processingDetails: "",
  });
  const [processingSets, setProcessingSets] = useState([]);

  const getNextDetailId = () => {
    if (processingSets.length === 0) return "PD01";
    const existingIds = processingSets.map((item) =>
      parseInt(item.id.replace("PD", ""))
    );
    const maxId = Math.max(...existingIds);
    return `PD${(maxId + 1).toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const dummyProcessingDetails = [
      {
        id: "01",
        scope: "Washed and dried only",
        limits: "50 - 60 gas",
        processingDetails: "...",
      },
      {
        id: "02",
        scope: "Soaked overnight",
        limits: "Min 6 hours",
        processingDetails: "..",
      },
      {
        id: "03",
        scope: "Filtered and blended",
        limits: "Proper blending",
        processingDetails: "...",
      },
      {
        id: "04",
        scope: "Dried & Packed",
        limits: "Storage up to 6 months",
        processingDetails: "...",
      },
    ];

    // Initialize with dummy data if no data exists for the selected ID
    if (selectedId && !processingDetailsData[selectedId]) {
      // Find the matching dummy data for the selected ID
      const matchingData = dummyProcessingDetails.find(
        (item) => item.id === selectedId
      );
      if (matchingData) {
        const initialSet = [
          {
            id: "PD01",
            scope: matchingData.scope,
            limits: matchingData.limits,
            processingDetails: matchingData.processingDetails,
          },
        ];
        setProcessingSets(initialSet);
        setProcessingDetailsData((prev) => ({
          ...prev,
          [selectedId]: initialSet,
        }));
      }
    } else if (selectedId && processingDetailsData[selectedId]) {
      setProcessingSets(processingDetailsData[selectedId]);
    }
  }, [selectedId, processingDetailsData, setProcessingDetailsData]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleChange = (id, field, value) => {
    setProcessingSets((prev) => {
      const newSets = [...prev];
      const index = newSets.findIndex((set) => set.id === id);
      if (index !== -1) {
        newSets[index] = { ...newSets[index], [field]: value };
      }
      return newSets;
    });
  };

  const handleAddSet = () => {
    const newId = getNextDetailId();
    setProcessingSets((prev) => [
      ...prev,
      {
        id: newId,
        scope: "",
        limits: "",
        processingDetails: "",
      },
    ]);
  };

  const handleRemoveSet = (id) => {
    setProcessingSets((prev) => prev.filter((set) => set.id !== id));
  };

  const handleSave = () => {
    setProcessingDetailsData((prev) => ({
      ...prev,
      [selectedId]: processingSets,
    }));
    setIsModalOpen(false);
  };

  if (!selectedId) return null;

  return (
    <div className="p-5 rounded-lg overflow-auto shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Processing Details for ID: {selectedId}
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-3 bg-gray-300">Detail ID</th>
            <th className="p-3 bg-gray-300">Scope</th>
            <th className="p-3 bg-gray-300">Limits</th>
            <th className="p-3 bg-gray-300">Processing Details</th>
            <th className="p-3 bg-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {processingSets.map((set) => (
            <tr key={set.id}>
              <td className="p-2">{set.id}</td>
              <td className="p-2">{set.scope}</td>
              <td className="p-2">{set.limits}</td>
              <td className="p-2">{set.processingDetails}</td>
              <td className="p-2">
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              Edit Processing Details
            </h2>

            {processingSets.map((set) => (
              <div key={set.id} className="mb-6 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Detail ID: {set.id}</h3>
                  {set.id !== "PD01" && (
                    <button
                      onClick={() => handleRemoveSet(set.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove Detail
                    </button>
                  )}
                </div>

                <label className="block mb-2">Scope</label>
                <input
                  type="text"
                  value={set.scope}
                  onChange={(e) =>
                    handleChange(set.id, "scope", e.target.value)
                  }
                  className="border p-2 w-full mb-4"
                />

                <label className="block mb-2">Limits</label>
                <input
                  type="text"
                  value={set.limits}
                  onChange={(e) =>
                    handleChange(set.id, "limits", e.target.value)
                  }
                  className="border p-2 w-full mb-4"
                />

                <label className="block mb-2">Processing Details</label>
                <input
                  type="text"
                  value={set.processingDetails}
                  onChange={(e) =>
                    handleChange(set.id, "processingDetails", e.target.value)
                  }
                  className="border p-2 w-full mb-4"
                />
              </div>
            ))}

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleAddSet}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add New Detail
              </button>
              <div className="space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProcessingEditor;
