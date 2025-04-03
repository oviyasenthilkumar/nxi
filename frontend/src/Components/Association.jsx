import React, { useState } from "react";
import { Pencil, Trash, Image } from "lucide-react";
import Header from "./Header";
import { Link } from "react-router-dom";

const initialEntities = [
  { id: "#123456", name: "Apple Shake", description: "Lorem ipsum dolor sit amet." },
  { id: "#123457", name: "dates dessert", description: "Ut enim ad minim veniam." },
  { id: "#123458", name: "Nuts", description: "Duis aute irure dolor in reprehenderit." },
  { id: "#123459", name: "Bananas", description: "Excepteur sint occaecat cupidatat non proident." },
];

const Association = () => {
  const [entities, setEntities] = useState(initialEntities);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("Level 0");

  const handleEdit = (entity) => {
    setEditingEntity(entity);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setEntities(entities.filter((entity) => entity.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <Link to="/ui">
        {" "}
        <button className="absolute top-4 left-4 border   px-4 py-2  shadow-md  transition cursor-pointer">
          Ui change
        </button>
      </Link>
      <Header />

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-8xl mb-6 mt-10">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">Associations</h1>
          <select
            className="border p-4 px-12 border-gray-200"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="Level 0">Level 0</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
          </select>
        </div>
        <button
          className="border-2 border-black px-6 py-4 font-semibold hover:bg-gray-100"
          onClick={() => setIsFormOpen(true)}
        >
          + NEW ASSOCIATION
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
              {entities.map((entity) => (
                <tr key={entity.id} className="border border-gray-300">
                  <td className="border border-gray-300 p-8">{entity.id}</td>
                  <td className="border border-gray-300 p-8">{entity.name}</td>
                  <td className="border border-gray-300 p-8 relative group">
                    {/* Description */}
                    <span>{entity.description}</span>

                    {/* Edit & Delete Icons (Visible on Hover) */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 flex space-x-2">
                      <button
                        onClick={() => handleEdit(entity)}
                        className="p-2 text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(entity.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Modal */}
      {isFormOpen && (
        <AddNewEntityForm
          onClose={() => setIsFormOpen(false)}
          existingEntity={editingEntity}
          setEntities={setEntities}
          entities={entities}
        />
      )}
    </div>
  );
};

// Form Component (Modal)
const AddNewEntityForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([
    { name: "apple", checked: false },
    { name: "pears", checked: false },
    { name: "apricot", checked: true },
    { name: "peach", checked: false },
  ]);

  const handleCheckboxChange = (index) => {
    const newCategories = [...categories];
    newCategories[index].checked = !newCategories[index].checked;
    setCategories(newCategories);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-md">
      <div className="bg-white p-6 w-[800px] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add New Associations</h2>
          <div>
            
            <button className="px-8 py-2 bg-black text-white mr-2">Save</button>
            <button onClick={onClose} className="border px-6 py-2 mr-2">Cancel</button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter name"  onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Description</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Description"  onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        {/* Table Layout for Categories */}
        <div className="border border-gray-200 p-4">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3"><Image size={16} className="inline-block mr-2" /> SNOW FRUITS</th>
                <th className="p-3"><Image size={16} className="inline-block mr-2" /> DRY FRUITS</th>
                <th className="p-3"><Image size={16} className="inline-block mr-2" /> NUTS</th>
                <th className="p-3"><Image size={16} className="inline-block mr-2" /> BANANAS</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={category.checked}
                      onChange={() => handleCheckboxChange(index)}
                      className="mr-2"
                    />
                    {category.name}
                  </td>
                  <td className="p-3">
                    <input type="checkbox" className="mr-2" /> {/* Placeholder */}
                  </td>
                  <td className="p-3">
                    <input type="checkbox" className="mr-2" /> {/* Placeholder */}
                  </td>
                  <td className="p-3">
                    <input type="checkbox" className="mr-2" /> {/* Placeholder */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Association;
