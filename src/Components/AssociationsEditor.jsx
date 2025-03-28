
import { useState } from "react";
import tableData from "./AssociationTable.json";
import Header from '../Components/Header'
import { Plus } from "lucide-react";


const AssociationsEditor = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  


  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCheckboxChange = (association, category, item) => {
    setSelectedItems((prev) => {
      const key = `${association}-${category}-${item}`;
      const updatedItems = {
        ...prev,
        [key]: !prev[key],
      };
      
      console.log("Updated Selected Items:", updatedItems); // Debugging Log
      return updatedItems;
    });
  };
  

  return (
    <div><Header/>
    <div className="p-6 bg-white text-black min-h-screen">
    
      <h1 className="text-3xl font-semibold mb-6">Associations Directory</h1>
      <DynamicTable
        data={tableData}
        expandedRows={expandedRows}
        toggleRow={toggleRow}
      />
      <SelectionTable
        selectedItems={selectedItems}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
    </div>
  );
};


const DynamicTable = ({ data, expandedRows, toggleRow }) => {
  const renderRows = (items, level = 0) => {
    return items.map((item) => (
      <>
        <tr
          key={item.id}
          className={` p-2 ${
            level % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
          }`}
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
            className={` p-2 pl-${
              (level + 1) * 6
            } font-medium`}
            style={{ paddingLeft: `${level * 20}px` }}
          >
            <span className="text-gray-400 mr-2">L{level + 1}</span> {item.name}
          </td>
          <td className=" p-2">
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
    
    <div className=" p-5 rounded-lg overflow-auto  mb-6">
   
      <table className="w-full  text-left">
        <thead>
          <tr className="bg-gray-300 text-black">
            <th className=" p-3 w-10">#</th>
            <th className=" p-3">Association Name</th>
            <th className=" p-3">
              Association Description
            </th>
          </tr>
        </thead>
        <tbody>{renderRows(data)}</tbody>
      </table>
    </div>
  );
};


const SelectionTable = ({ selectedItems, handleCheckboxChange }) => {
  // Associations list
  const [associations, setAssociations] = useState([
    "Apple Shake",
    "Dates Dessert",
    "Nuts Overload",
    "Banana Smoothie",
  ]);

  // Categories and their items
  const categories = ["Snow Fruits", "Dry Fruits", "Nuts", "Bananas"];
  const items = {
    "Apple Shake": {
      "Snow Fruits": ["Apple", "Peach"],
      "Dry Fruits": ["Raisins", "Figs"],
      Nuts: ["Cashew", "Almond"],
      Bananas: ["Malavazhai", "Karpooravalli"],
    },
    "Dates Dessert": {
      "Snow Fruits": ["Apricot"],
      "Dry Fruits": ["Dates"],
      Nuts: ["Walnut", "Groundnut", "Pistachio"],
      Bananas: ["Rasthali"],
    },
    "Nuts Overload": {
      "Snow Fruits": ["Peach"],
      "Dry Fruits": ["Figs", "Dates"],
      Nuts: ["Cashew", "Almond", "Walnut"],
      Bananas: ["Sevazhai", "Poovam"],
    },
    "Banana Smoothie": {
      "Snow Fruits": ["Cherry"],
      "Dry Fruits": ["Raisins"],
      Nuts: ["Almond", "Pistachio"],
      Bananas: ["Yellaki", "Karpooravalli"],
    },
  };

  // State for selected association
  const [selectedAssociation, setSelectedAssociation] = useState(associations[0]);
  const [selectedLevel, setSelectedLevel] = useState(associations[0]);
  const [showL2, setShowL2] = useState(false);
  const [showL3, setShowL3] = useState(false);

  const [savedData, setSavedData] = useState({ L1: tableData, L2: [], L3: [] });
  const [selectedL2, setSelectedL2] = useState(null);
  const handleAssociationClick = (association) => {
    console.log("Selected Association:", association); // Debugging log
    setSelectedAssociation(association);
  };
  const handleLevelClick = (association) => {
    console.log("Selected Association:", association); // Debugging log
    setSelectedAssociation(association);
  };

  
 
  const [showModal, setShowModal] = useState(false);
  const [newAssociation, setNewAssociation] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewAssociation("");
  };
  
  
  const handleSave = () => {
    const newL2Entries = [
      {
        id: "l2-tn-special",
        name: "TN Special",
        parent_id: "l1-selected",
        attributes: {
          "Snow Fruits": ["apricot - Srinagar"],
          "Dry Fruits": ["dates - Dubai"],
          "Nuts": ["walnut - Kalaktang"],
          "Bananas": ["rasthali - Erode"]
        }
      },
      {
        id: "l2-ap-special",
        name: "AP Special",
        parent_id: "l1-selected",
        attributes: {
          "Snow Fruits": ["apricot - Srinagar"],
          "Dry Fruits": ["dates - Tehran"],
          "Nuts": ["walnut - Dheradhun"],
          "Bananas": ["rasthali - Salem"]
        }
      }
    ];

    setSavedData((prevData) => ({
      ...prevData,
      L2: [...(prevData.L2 || []), ...newL2Entries]
    }));
    setShowL2(true);

    if (newAssociation.trim() === "") return; // Prevent empty entries

    setAssociations((prev) => [...prev, newAssociation]); // Append to the array
  
    setNewAssociation(""); 
    setShowModal(false); 
  };
  const handleSaveL3 = () => {
    const newL3Entries = [
      {
        id: "l3-category-1",
        name: "Regular",
        parent_id: selectedL2, // ✅ Add parent_id for filtering
        attributes: [
          { category: "Srinagar", type: "Hybrid", variety: "" },
          { category: "Tehran", type: "Hybrid", variety: "" },
          { category: "Kalanktang", type: "Hybrid", variety: "" },
          { category: "Cuddalore", type: "Hybrid", variety: "" },
          { category: "Erode", type: "Organic", variety: "" },
        ],
      },
      {
        id: "l3-category-2",
        name: "Hybrid",
        parent_id: selectedL2,
        attributes: [
          { category: "Srinagar", type: "GMO", variety: "" },
          { category: "Tehran", type: "Organic", variety: "" },
          { category: "Kalanktang", type: "Organic", variety: "" },
          { category: "Cuddalore", type: "Organic", variety: "" },
          { category: "Erode", type: "", variety: "" },
        ],
      },
      {
        id: "l3-category-3",
        name: "Organic",
        parent_id: selectedL2,
        attributes: [
          { category: "Srinagar", type: "", variety: "" },
          { category: "Tehran", type: "", variety: "" },
          { category: "Kalanktang", type: "GMO", variety: "" },
          { category: "Cuddalore", type: "GMO", variety: "" },
          { category: "Erode", type: "", variety: "" },
        ],
      },
    ];

    setSavedData((prevData) => ({
      ...prevData,
      L3: [...prevData.L3, ...newL3Entries],
    }));

    setShowL3(true);
  };
const [selectedL3, setSelectedL3] = useState(null);


  return (
    <div className="bg-white p-5 rounded-lg overflow-auto shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Associations Creator - Editor
      </h2>
      {/* Show Selected Association in L1 Format */}
      {selectedAssociation && (
        <div className="text-black  text-sm mb-4 0 p-3 rounded">
          L1 - {selectedAssociation}
        </div>
      )}
      {/* Table Layout */}
      <div className="flex">
        {/* Association Names (Left Column) */}
        <div className="w-1/4">
          <div className="relative">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-300 text-black">
                  <th className="text-black p-3"># ID</th>
                  <th className="text-black p-3">Name of Association</th>
                </tr>
              </thead>
              <tbody>
                {associations.map((association, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer text-black bg-gray-300 ${
                      selectedAssociation === association
                        ? "bg-yellow-600 text-white"
                        : ""
                    }`}
                    onClick={() => handleAssociationClick(association)}
                  >
                    <td className=" p-3">{index + 1}</td>
                    <td className=" p-3 font-medium">{association}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* ADD BUTTON ROW */}
          <tr className="bg-gray-300 text-black hover:bg-gray-600 cursor-pointer">
            <td className="p-3 text-center " colSpan="6">
              <button
                className="w-5 h-3  rounded-full flex items-center justify-center hover:scale-110"
                onClick={handleOpenModal}
              >
                <Plus className="text-black w-6 h-6" />
              </button>
            </td>
          </tr>
        </div>
        {/* Modal for Adding New Association */}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
            <div className="bg-gray-400 p-5 rounded-lg w-[30%]">
              <h2 className="text-xl font-bold">Add New Association</h2>
              <input
                type="text"
                placeholder="Enter association name"
                value={newAssociation}
                onChange={(e) => setNewAssociation(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-300 "
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-500  px-4 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Checkboxes (Right Column) */}
        <div className="w-3/4 ">
          <table className="w-full  text-left">
            <thead>
              <tr className="bg-gray-300 text-black">
                {categories.map((category) => (
                  <th key={category} className="border border-gray-300 p-3">
                    {category}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody >
              <tr className="text-black bg-gray-300  ">
                {categories.map((category) => (
                  <td key={category} className=" p-18">
                    {items[selectedAssociation][category]?.map((item) => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 p-5"
                          checked={
                            selectedItems[
                              `${selectedAssociation}-${category}-${item}`
                            ] || false
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              selectedAssociation,
                              category,
                              item
                            )
                          }
                        />
                        {item}
                      </label>
                    )) || <span className="text-gray-500">-</span>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Save Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleSave}
          className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
        >
          Save
        </button>
      </div>

      {showL2 && savedData.L2 && (
        <div className="p-6  text-black">
          <h1 className="text-3xl font-semibold mb-6">L2 Associations</h1>
          <div className="w-full">
            <table className="w-full  text-left">
              <thead>
                <tr className="bg-gray-300 text-black">
                  <th className=" p-3">
                    Name of association
                  </th>
                  <th className=" p-3">Snow Fruits</th>
                  <th className=" p-3">Dry Fruits</th>
                  <th className=" p-3">Nuts</th>
                  <th className=" p-3">Bananas</th>
                </tr>
              </thead>

              <tbody>
                {savedData.L2.map((entry) => (
                  <tr key={entry.id} className="text-black bg-gray-200">
                    {/* Association Name - Clickable */}
                    <td
                      className={` p-3 cursor-pointer ${
                        selectedL2 === entry.id
                          ? "bg-yellow-600 text-black"
                          : ""
                      }`}
                      onClick={() => setSelectedL2(entry.id)}
                    >
                      {entry.name}
                    </td>

                    {/* Other categories - Non-clickable */}
                    {["Snow Fruits", "Dry Fruits", "Nuts", "Bananas"].map(
                      (category) => (
                        <td
                          key={category}
                          className="p-3"
                        >
                          {entry.attributes[category]?.map((item, idx) => (
                            <label key={idx} className="flex items-center">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={
                                  selectedItems[
                                    `${entry.name}-${category}-${item}`
                                  ] || false
                                }
                                onChange={() =>
                                  handleCheckboxChange(
                                    entry.name,
                                    category,
                                    item
                                  )
                                }
                              />
                              {item}
                            </label>
                          )) || <span className="text-gray-500">-</span>}
                        </td>
                      )
                    )}
                  </tr>
                ))}
                {/* {selectedL2 && savedData.L3.length > 0 && (
                  <div className="p-6 text-gray-200">
                    <h1 className="text-3xl font-semibold mb-6">
                      L3 Associations
                    </h1>
                    <table className="w-full border border-gray-700 text-left">
                      <thead>
                        <tr className="bg-gray-700 text-gray-300">
                          <th className="border border-gray-700 p-3">
                            L3 Name
                          </th>
                          <th className="border border-gray-700 p-3">
                            Category
                          </th>
                          <th className="border border-gray-700 p-3">Type</th>
                          <th className="border border-gray-700 p-3">
                            Variety
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {savedData.L3.filter(
                          (entry) => entry.parent_id === selectedL2
                        ).map((entry) =>
                          entry.attributes.map((attr, index) => (
                            <tr
                              key={`${entry.id}-${index}`}
                              className="text-gray-200 bg-gray-800"
                            >
                              <td className="border border-gray-700 p-3">
                                {entry.name}
                              </td>
                              <td className="border border-gray-700 p-3">
                                {attr.category}
                              </td>
                              <td className="border border-gray-700 p-3">
                                {attr.type}
                              </td>
                              <td className="border border-gray-700 p-3">
                                {attr.variety}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )} */}
              </tbody>
            </table>
            {/* Save Button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleSaveL3}
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* L3 Table */}
      {showL3 && savedData.L3.length > 0 && (
        <div className="p-6 ">
          <h1 className="text-3xl text-black font-semibold mb-6">L3 Associations</h1>
          <div className="w-full">
            <table className="w-full  text-left">
              <thead>
                <tr className="bg-gray-300 text-black">
                  <th className=" p-3">
                    Name of Association
                  </th>
                  <th className=" p-3">Srinagar</th>
                  <th className=" p-3">Tehran</th>
                  <th className=" p-3">Kalanktang</th>
                  <th className=" p-3">Cuddalore</th>
                  <th className=" p-3">Erode</th>
                </tr>
              </thead>
              <tbody>
                {savedData.L3.filter(
                  (entry) => entry.parent_id === selectedL2
                ).map((entry) => (
                  <tr key={entry.id} className="text-black bg-gray-200">
                    {/* Association Name - Clickable */}
                    <td
                      className={` p-3 cursor-pointer ${
                        selectedL3 === entry.id
                          ? "bg-yellow-600 text-black"
                          : ""
                      }`}
                      onClick={() => setSelectedL3(entry.id)}
                    >
                      {entry.name}
                    </td>

                    {/* Attributes - Categories with checkboxes */}
                    {[
                      "Srinagar",
                      "Tehran",
                      "Kalanktang",
                      "Cuddalore",
                      "Erode",
                    ].map((category) => {
                      const attr = entry.attributes.find(
                        (attr) => attr.category === category
                      );
                      return (
                        <td
                          key={category}
                          className=" p-3"
                        >
                          {attr && attr.type ? (
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={
                                  selectedItems[
                                    `${entry.name}-${category}-${attr.type}`
                                  ] || false
                                }
                                onChange={() =>
                                  handleCheckboxChange(
                                    entry.name,
                                    category,
                                    attr.type
                                  )
                                }
                              />
                              {attr.type}
                            </label>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Save Button */}
            {/* <div className="mt-4 text-center">
              <button
                onClick={handleSaveL3}
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
              >
                Save
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssociationsEditor;


