
import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import Header from "./Header";
import { Link } from "react-router-dom";

const entityHierarchy = {
   "#123456": [
     { id: "#2001", name: "Apple", description: "A sweet red fruit." },
     { id: "#2002", name: "Pears", description: "A soft, juicy fruit." },
     { id: "#2003", name: "Apricot", description: "A small, orange fruit." },
     { id: "#2004", name: "Peach", description: "A fuzzy-skinned fruit." },
   ],
   "#2001": [
     { id: "#2101", name: "Srinagar", description: "A famous apple-growing region." },
     { id: "#2102", name: "Shimla", description: "Known for quality apples." },
     { id: "#2103", name: "Queenstown", description: "Produces hybrid apples." },
     { id: "#2104", name: "Ooty", description: "Organic apple farming." },
   ],
   "#2101": [
     { id: "#2201", name: "Hybrid", description: "Crossbred apple variety." },
     { id: "#2202", name: "Organic", description: "Grown without pesticides." },
     { id: "#2203", name: "GMO", description: "Genetically modified apples." },
   ],
   "#2102": [
     { id: "#2201", name: "Hybrid", description: "Crossbred apple variety." },
 
     { id: "#2203", name: "GMO", description: "Genetically modified apples." },
   ],
   "#2103": [
     { id: "#2201", name: "Hybrid", description: "Crossbred apple variety." },
     { id: "#2202", name: "Organic", description: "Grown without pesticides." },
     { id: "#2203", name: "GMO", description: "Genetically modified apples." },
   ],
   "#2104": [
     { id: "#2201", name: "Hybrid", description: "Crossbred apple variety." },
     { id: "#2202", name: "Organic", description: "Grown without pesticides." },
     { id: "#2203", name: "GMO", description: "Genetically modified apples." },
   ],
   "#2002": [
     { id: "#2301", name: "Shimla", description: "Pears grown in the hills." },
     { id: "#2302", name: "Ooty", description: "Organic pear farming." },
   ],
   "#2101": [
     { id: "#2201", name: "Hybrid", description: "Crossbred apple variety." },
     { id: "#2202", name: "Organic", description: "Grown without pesticides." },
     { id: "#2203", name: "GMO", description: "Genetically modified apples." },
   ],
 
  
   "#2003": [
     { id: "#2401", name: "Srinagar", description: "Apricot farms in the valley." },
   ],
  
   "#2004": [
     { id: "#2501", name: "Queenstown", description: "Peach orchards here." },
   ],
  
   // New Structure for Dry Fruits
   "#123457": [
     { id: "#3001", name: "Rasins", description: "A kidney-shaped nut." },
     { id: "#3002", name: "Figs", description: "A hard-shelled nut." },
     { id: "#3003", name: "Almond", description: "A crunchy nut." },
   
   ],
   "#3002": [
     { id: "#3101", name: "Nasik", description: "A famous apple-growing region." },
     { id: "#3102", name: "Dindigul", description: "Known for quality apples." },
     { id: "#3104", name: "Theni", description: "Organic apple farming." },
   ],
   "#3001": [
     { id: "#3101", name: "Cairo", description: "A famous apple-growing region." },
     { id: "#3102", name: "Istanbul", description: "Known for quality apples." },
     { id: "#3103", name: "Mangalore", description: "Produces hybrid apples." },
   ],
  
   "#3101": [
     { id: "#3201", name: "Hybrid", description: "Crossbred apple variety." },
     { id: "#3202", name: "Organic", description: "Grown without pesticides." },
     { id: "#3203", name: "GMO", description: "Genetically modified apples." },
   ],
  

   "#123458": [
     { id: "#4001", name: "Cashew", description: "A kidney-shaped nut." },
     { id: "#4002", name: "Walnut", description: "A hard-shelled nut." },
     { id: "#4003", name: "Almond", description: "A crunchy nut." },
     { id: "#4004", name: "Groundnut", description: "Also known as peanuts." },
     { id: "#4005", name: "Pistachio", description: "A green nut with a hard shell." },
   ],
  
   "#4001": [
     { id: "#4101", name: "Panruti", description: "A famous apple-growing region." },
     { id: "#4102", name: "Kannur", description: "Known for quality apples." },
     { id: "#4103", name: "Guntur", description: "Produces hybrid apples." },
   ], 
   "#4002": [
     { id: "#4201", name: "Kalanktang", description: "A famous apple-growing region." },
     { id: "#4202", name: "Dheradhun", description: "Known for quality apples." },
   ],
   "#4003": [
     { id: "#4301", name: "Dheradhun", description: "A famous apple-growing region." },
     { id: "#4302", name: "Srinagar", description: "Known for quality apples." },
   
   ], 
   "#4004": [
     { id: "#4401", name: "Cudallore", description: "A famous apple-growing region." },
     { id: "#4402", name: "Nellore", description: "Known for quality apples." },
   
   ],
   "#4005": [
     { id: "#4501", name: "Kalanktang", description: "A famous apple-growing region." },
     { id: "#4502", name: "Dheradhun", description: "Known for quality apples." },
   
   ],  

  
   "#4101": [
     { id: "#4201", name: "Hybrid", description: "Crossbred apple variety." },
     { id: "#4202", name: "Organic", description: "Grown without pesticides." },
     { id: "#4203", name: "GMO", description: "Genetically modified apples." },
   ],
   "#4102": [
    { id: "#4201", name: "Hybrid", description: "Crossbred apple variety." },
    { id: "#4202", name: "Organic", description: "Grown without pesticides." },
    { id: "#4203", name: "GMO", description: "Genetically modified apples." },
  ], "#4103": [
    { id: "#4201", name: "Hybrid", description: "Crossbred apple variety." },
    { id: "#4202", name: "Organic", description: "Grown without pesticides." },
    { id: "#4203", name: "GMO", description: "Genetically modified apples." },
  ], "#4104": [
    { id: "#4201", name: "Hybrid", description: "Crossbred apple variety." },
    { id: "#4202", name: "Organic", description: "Grown without pesticides." },
    { id: "#4203", name: "GMO", description: "Genetically modified apples." },
  ],

   "#123459": [
     { id: "#5001", name: "Malavazhai", description: "A kidney-shaped nut." },
     { id: "#5002", name: "Karpooravalli", description: "A hard-shelled nut." },
     { id: "#5003", name: "Yellaki", description: "A crunchy nut." },
     { id: "#5004", name: "Sevazhai", description: "Also known as peanuts." },
     { id: "#5005", name: "Rasthali", description: "A green nut with a hard shell." },
     { id: "#5006", name: "Poovam", description: "A green nut with a hard shell." },
   ],
   "#5001": [
    { id: "#5101", name: "Yelagiri", description: "A famous apple-growing region." },
    { id: "#5102", name: "Sirumalai", description: "Known for quality apples." },
    { id: "#5103", name: "Yearcaud", description: "Produces hybrid apples." },
    { id: "#5104", name: "Kambam", description: "Produces hybrid apples." },
  ],
   "#5002": [
     { id: "#5201", name: "Trichy", description: "A famous apple-growing region." },
     { id: "#5202", name: "Tanjore", description: "Known for quality apples." },
     { id: "#5204", name: "Nellai", description: "Organic apple farming." },
     { id: "#5204", name: "Theni", description: "Organic apple farming." },
   ],
  
   "#5003": [
     { id: "#5301", name: "Kaynakumari", description: "A famous apple-growing region." },
     { id: "#5302", name: "Nagarkovil", description: "Known for quality apples." },
     { id: "#5303", name: "Kollam", description: "Produces hybrid apples." },
     { id: "#5303", name: "Pallakad", description: "Produces hybrid apples." },
   ],
   "#5004": [
     { id: "#5401", name: "Pollachi", description: "A famous apple-growing region." },
     { id: "#5402", name: "Marthandam", description: "Known for quality apples." },
    
   ],
   "#5005": [
     { id: "#5501", name: "Salem", description: "A famous apple-growing region." },
     { id: "#5502", name: "Erode", description: "Known for quality apples." },
     
   ],
  
   "#5101": [
    
     { id: "#5121", name: "Organic", description: "Grown without pesticides." },
    
   ],
   "#5102": [
    
     { id: "#5122", name: "Organic", description: "Grown without pesticides." },
    
   ],
   "#5103": [
    
     { id: "#5123", name: "Organic", description: "Grown without pesticides." },
    
   ],
   "#5104": [
    { id: "#5124", name: "Hybrid", description: "Crossbred apple variety." },
     { id: "#5125", name: "Organic", description: "Grown without pesticides." },
    
   ],

   "#5201": [
    
     { id: "#5211", name: "Organic", description: "Grown without pesticides." },
    
   ],
   "#5202": [
    
     { id: "#5221", name: "Organic", description: "Grown without pesticides." },
    
   ],
   "#5203": [
    
     { id: "#5222", name: "Organic", description: "Grown without pesticides." },
    
   ],
   "#5204": [
    { id: "#5223", name: "Hybrid", description: "Crossbred apple variety." },
     { id: "#5224", name: "Organic", description: "Grown without pesticides." },
    
   ],
   "#5301": [
    
    { id: "#5311", name: "Organic", description: "Grown without pesticides." },
   
  ],
  "#5302": [
   
    { id: "#5312", name: "Organic", description: "Grown without pesticides." },
   
  ],
  "#5303": [
   
    { id: "#5313", name: "Organic", description: "Grown without pesticides." },
   
  ],
  "#5304": [
   { id: "#5314", name: "Hybrid", description: "Crossbred apple variety." },
    { id: "#5315", name: "Organic", description: "Grown without pesticides." },
   
  ],
  "#5401": [
    
    { id: "#5411", name: "Organic", description: "Grown without pesticides." },
   
  ],
  "#5402": [
   
    { id: "#5412", name: "Organic", description: "Grown without pesticides." },
   
  ],
  "#5403": [
   
    { id: "#5413", name: "Organic", description: "Grown without pesticides." },
   
  ],
  "#5404": [
   { id: "#5414", name: "Hybrid", description: "Crossbred apple variety." },
    { id: "#5415", name: "Organic", description: "Grown without pesticides." },
   
  ],
 };


 const initialEntities = [
   { id: "#123456", name: "Snow Fruits", description: "A variety of cold-weather fruits." },
   { id: "#123457", name: "Dry Fruits", description: "A sweet red fruit." },
   { id: "#123458", name: "Nuts", description: "A soft, juicy fruit." },
   { id: "#123459", name: "Banana", description: "A small, orange fruit." },
  
 ];


const EntitiesTable = () => {
  const [entities, setEntities] = useState(initialEntities);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  const [hierarchyLevels, setHierarchyLevels] = useState([{ id: null, name: "L0" }]); // Track hierarchy


  const handleRowClick = (entityId, entityName) => {
    if (entityHierarchy[entityId]) {
      setEntities(entityHierarchy[entityId]);
      setHierarchyLevels([...hierarchyLevels, { id: entityId, name: entityName }]);
    }
  };

  const handleNavigateBack = (index) => {
    const newHierarchy = hierarchyLevels.slice(0, index + 1);
    setHierarchyLevels(newHierarchy);

    if (index === 0) {
      setEntities(initialEntities);
    } else {
      setEntities(entityHierarchy[newHierarchy[index].id] || []);
    }
  };

  const handleFormOpen = (entity = null) => {
    setEditingEntity(entity);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingEntity(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <Header />
      <Link to="/ui">
        {" "}
        <button className="absolute top-4 left-4 border   px-4 py-2  shadow-md  transition">
          Ui change
        </button>
      </Link>
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-8xl mb-4 mt-20">
        <h1 className="text-3xl font-bold">Entities</h1>

        {/* Breadcrumbs Below */}
        {/* <div className="flex items-center space-x-2 mt-4">
          {hierarchyLevels.map((level, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="px-4 py-3 text-xl border border-gray-300 cursor-pointer hover:text-blue-600 flex items-center"
                onClick={() => handleNavigateBack(index)}
              >
                {index === 0 ? (
                  <span className="text-xl">🏠︎</span> // Home icon for L0
                ) : (
                  <span>L{index}</span> // L1, L2, etc.
                )}
                {index !== 0 && <span className="ml-1"> | {level.name}</span>}
              </span>
              {index < hierarchyLevels.length - 1 && (
                <span className="text-gray-500">{">"}</span>
              )}
            </div>
          ))}
        </div> */}
        <div className="flex items-center space-x-2 mt-4">
          {hierarchyLevels.map((level, index) => (
            
            <div key={index} className="flex items-center space-x-2">
              <span
                className="px-4 py-3 text-xl border border-gray-300 cursor-pointer hover:text-blue-600 flex items-center"
                onClick={() => handleNavigateBack(index)}
              >
                {index === 0 ? (
                  <span className="flex items-center space-x-1">
                    <span className="text-xl">🏠︎</span>
                    {/* <span className="ml-1">{level.name}</span>{" "} */}
                    {/* Home with name */}
                  </span>
                ) : (
                  <span className="flex items-center space-x-1">
                    <span>{`L${index} - ${level.name}`}</span>{" "}
                    {/* L1 Department, L2 Team */}
                  </span>
                )}
              </span>
              {index < hierarchyLevels.length - 1 && (
                <span className="text-gray-500">{">"}</span>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => handleFormOpen()}
          className="px-5 py-4 border text-xl font-bold"
        >
          + New Entity
        </button>
      </div>

      {/* Table */}
      <div className="w-full max-w-8xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-6 text-left">ID</th>
                <th className="border border-gray-300 p-6 text-left">NAME</th>
                <th className="border border-gray-300 p-6 text-left">
                  DESCRIPTION
                </th>
              </tr>
            </thead>
            <tbody>
              {entities.map((entity, index) => (
                <tr
                  key={entity.id}
                  className="border border-gray-300 cursor-pointer"
                  onClick={() => handleRowClick(entity.id,entity.name)}
                >
                  <td className="border border-gray-300 p-8">{entity.id}</td>
                  <td className="border border-gray-300 p-8">{entity.name}</td>
                  <td
                    className="border border-gray-300 p-8 relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {entity.description}
                    {hoveredIndex === index && (
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2 bg-white p-1">
                        <button
                          onClick={() => handleFormOpen(entity)}
                          className="text-gray-500 hover:text-gray-700 p-4"
                        >
                          <Pencil size={16} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-2">
                          <Trash size={16} />
                        </button>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Render the New Entity Form */}
        {isFormOpen && (
          <AddNewEntityForm
            key={editingEntity?.id || "new"} // Forces re-render when entity changes
            onClose={handleFormClose}
            existingEntity={editingEntity}
            setEntities={setEntities}
            entities={entities}
          />
        )}
      </div>
    </div>
  );
};

// AddNewEntityForm Component
const AddNewEntityForm = ({ onClose, existingEntity, setEntities, entities }) => {
  const [name, setName] = useState(existingEntity?.name || "");
const [description, setDescription] = useState(existingEntity?.description || "");



  const [attributes, setAttributes] = useState([
    { name: "Attribute-1", value: "Value-1" },
    { name: "Attribute-2", value: "Value-2" },
  ]);

  
const addAttribute = () => {
  setAttributes([...attributes, { name: "", value: "" }]);
};

const handleAttributeChange = (index, field, value) => {
  const updatedAttributes = [...attributes];
  updatedAttributes[index][field] = value;
  setAttributes(updatedAttributes);
};
  const handleSubmit = () => {
    if (existingEntity) {
      // Update existing entity
      setEntities(
        entities.map((entity) =>
          entity.id === existingEntity.id ? { ...entity, name, description } : entity
        )
      );
      
    } else {
      // Add new entity
      const newEntity = {
        id: `#${Math.floor(Math.random() * 1000000)}`, // Generate random ID
        name,
        description,
      };
      setEntities([...entities, newEntity]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-50">
      <div className="bg-white p-6 w-1/3 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {existingEntity ? "Edit Entity" : "Add New Entity"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
      <h3 className="text-lg font-medium">Attributes</h3>
      {attributes.map((attr, index) => (
        <div key={index} className="flex space-x-2 mt-2">
          <input
            type="text"
            className="w-1/2 p-2 border border-gray-300 rounded"
            placeholder="Attribute Name"
            value={attr.name}
            onChange={(e) => handleAttributeChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            className="w-1/2 p-2 border border-gray-300 rounded"
            placeholder="Attribute Value"
            value={attr.value}
            onChange={(e) => handleAttributeChange(index, "value", e.target.value)}
          />
        </div>
      ))}
      <button className="text-blue-500 mt-2" onClick={addAttribute}>
        + ADD ATTRIBUTE
      </button>
    </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-black text-white rounded">
            {existingEntity ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntitiesTable;
