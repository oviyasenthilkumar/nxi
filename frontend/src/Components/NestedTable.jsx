import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import Header from "./Header";
import { PlusCircle, Plus } from "lucide-react";

const API_URL = 'http://localhost:5000/api';

const NestedTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [items, setItems] = useState([]);
 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    attributes: [{ name: "attribute1", value: "" }],
    parent: "",
    parentName: "",
  });
  const [data, setData] = useState([]);
  const [rotated, setRotated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleDepth, setVisibleDepth] = useState(1); // Start with only L1 visible
  const [maxPossibleDepth, setMaxPossibleDepth] = useState(1); // Track the maximum possible depth

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate visible depth based on expanded state
  useEffect(() => {
    const getExpandedDepth = () => {
      // Start with at least level 1 visible
      let maxExpandedLevel = 1;
      
      // Helper function to determine max depth of expanded items
      const findMaxExpandedLevel = (items, currentLevel = 1, path = []) => {
        if (!items || !Array.isArray(items)) return;
        
        items.forEach(item => {
          if (!item) return;
          
          const currentPath = [...path, item.name];
          const pathKey = currentPath.join(" > ");
          
          // If this item is expanded, we need to include its level
          if (expanded[pathKey]) {
            // Update max expanded level if this level is deeper
            maxExpandedLevel = Math.max(maxExpandedLevel, currentLevel + 1);
            
            // Check children recursively if they exist
            if (item.children && item.children.length > 0) {
              findMaxExpandedLevel(item.children, currentLevel + 1, currentPath);
            }
          }
        });
      };
      
      findMaxExpandedLevel(data);
      return maxExpandedLevel;
    };
    
    // Update the visible depth based on expanded state
    const newVisibleDepth = getExpandedDepth();
    
    if (newVisibleDepth !== visibleDepth) {
      console.log(`Updating visible depth from ${visibleDepth} to ${newVisibleDepth}`);
      setVisibleDepth(newVisibleDepth);
    }
  }, [expanded, data]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/items`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const items = await response.json();
      
      // Process the data to ensure proper structure
      const processedItems = processDataStructure(items);
      setData(processedItems);
      
      // Calculate the maximum possible depth for reference
      const calculatedMaxDepth = calculateMaxDepth(processedItems);
      setMaxPossibleDepth(calculatedMaxDepth);
      console.log("Maximum possible depth:", calculatedMaxDepth);
      
      // Start with only level 1 visible
      setVisibleDepth(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Process data to ensure children are properly structured
  const processDataStructure = (items) => {
    if (!items || !Array.isArray(items)) return [];
    
    return items.map(item => {
      if (!item) return null;
      
      // Ensure item has a properly initialized children array 
      const processedItem = {
        ...item,
        children: Array.isArray(item.children) ? item.children : []
      };

      // If it has children, recursively process them too
      if (processedItem.children && processedItem.children.length > 0) {
        processedItem.children = processDataStructure(processedItem.children);
      }
      
      return processedItem;
    }).filter(Boolean); // Remove any null items
  };

  const toggleExpand = (name) => {
    setExpanded((prev) => {
      const newExpanded = { ...prev, [name]: !prev[name] };
      
      // If we're collapsing an item, also collapse all its children
      if (!newExpanded[name]) {
        Object.keys(newExpanded).forEach(key => {
          if (key.startsWith(name + " > ")) {
            newExpanded[key] = false;
          }
        });
      }
      
      return newExpanded;
    });
  };

  const handleOpenModal = (parentId) => {
    let parentName = "Root Level";
  
    if (parentId) {
      // Find the parent item from the data array
      const findParentName = (items, parentId) => {
        for (const item of items) {
          if (item.id === parseInt(parentId)) {
            return item.name; // Return the found parent name
          }
          if (item.children) {
            const found = findParentName(item.children, parentId);
            if (found) return found;
          }
        }
        return null;
      };
  
      const foundParentName = findParentName(data, parentId);
      if (foundParentName) {
        parentName = foundParentName;
      }
    }
  
    setFormData({
      name: "",
      description: "",
      attributes: [{ name: "attribute1", value: "" }],
      parent: parentId,
      parentName: parentName,
    });
  
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      description: "",
      attributes: [{ name: "attribute1", value: "" }],
      parent: "",
      parentName: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (index, field, value) => {
    setFormData((prev) => {
      const newAttributes = [...prev.attributes];
      newAttributes[index][field] = value;
      return { ...prev, attributes: newAttributes };
    });
  };  

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { name: "", value: "" }]
    }));
  };

  const addChild = (items, parentPath, currentPath = []) => {
    for (let item of items) {
      const newPath = [...currentPath, item.name];
  
      if (newPath.join(" > ") === parentPath) {
        item.children = item.children || [];
  
        const attributesObject = formData.attributes.reduce((acc, attr, index) => {
          acc[`attribute${index + 1}`] = attr.value;
          return acc;
        }, {});
  
        const newChild = {
          name: formData.name,
          description: formData.description,
          ...attributesObject,
          children: [],
        };
  
        // Add the new child to the list
        item.children.push(newChild);
  
        // Expand parent so new child is visible
        setExpanded(prev => ({
          ...prev,
          [parentPath]: true,  // Expand the parent
        }));
  
        return true;
      }
  
      if (item.children && addChild(item.children, parentPath, newPath)) {
        return true;
      }
    }
    return false;
  };
  
  // Get attributes only from visible items
  const getVisibleAttributes = () => {
    const visibleAttrs = new Set();
    
    // Function to collect attributes from visible items only
    const collectVisibleAttributes = (items, level = 0, path = []) => {
      if (!items || !Array.isArray(items)) return;
      
      items.forEach(item => {
        if (!item) return;
        
        const currentPath = [...path, item.name];
        const pathKey = currentPath.join(" > ");
        
        // For root level or expanded items, collect attributes
        if (level === 0 || isVisible(currentPath)) {
          if (typeof item.attributes === "string") {
            try {
              const parsed = JSON.parse(item.attributes);
              Object.keys(parsed).forEach(key => visibleAttrs.add(key));
            } catch (error) {
              console.error(`Error parsing attributes for ${item.name}:`, error);
            }
          } else if (item.attributes && typeof item.attributes === "object") {
            Object.keys(item.attributes).forEach(key => visibleAttrs.add(key));
          }
          
          // If this item is expanded, check its children too
          if (expanded[pathKey] && item.children && item.children.length > 0) {
            collectVisibleAttributes(item.children, level + 1, currentPath);
          }
        }
      });
    };
    
    collectVisibleAttributes(data);
    
    // Sort attributes numerically
    return Array.from(visibleAttrs).sort((a, b) => {
      const aNum = parseInt(a.replace("attribute", ""));
      const bNum = parseInt(b.replace("attribute", ""));
      return aNum - bNum;
    });
  };
  
  // Check if an item should be visible based on its parents' expanded state
  const isVisible = (path) => {
    if (!path || path.length === 0) return true;
    
    // For each ancestor, check if it's expanded
    for (let i = 1; i < path.length; i++) {
      const ancestorPath = path.slice(0, i).join(" > ");
      if (!expanded[ancestorPath]) {
        return false;
      }
    }
    
    return true;
  };
  
  // Get attributes for currently visible items only
  const visibleAttributeHeaders = getVisibleAttributes();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newItem = {
      name: formData.name,
      description: formData.description,
      parentId: formData.parent || null,
      attributes: formData.attributes.reduce((acc, attr, index) => {
        acc[`attribute${index + 1}`] = attr.value;
        return acc;
      }, {}),
    };
  
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item.");
      }
  
      const addedItem = await response.json();
      console.log("Item added successfully:", addedItem);
  
      // Update the local state based on whether it's a root or child item
      setData((prevData) => {
        const updatedData = [...prevData];
  
        if (!formData.parent) {
          // Root item
          updatedData.push({ ...addedItem, children: [] });
        } else {
          // If it's a child item, find the parent and add the new child
          const addChild = (items, parentId) => {
            return items.map((item) => {
              if (item.id === parseInt(parentId)) {
                return {
                  ...item,
                  children: [...(item.children || []), { ...addedItem, children: [] }],
                };
              }
              if (item.children) {
                return { ...item, children: addChild(item.children, parentId) };
              }
              return item;
            });
          };
  
          return addChild(updatedData, formData.parent);
        }
        
        return updatedData;
      });
  
      // Expand the parent so the new child is visible
      if (formData.parent) {
        setExpanded((prev) => ({
          ...prev,
          [formData.parent]: true,
        }));
      }
  
      // Reset form and close modal
      handleCloseModal();
    } catch (error) {
      console.error("Error adding item:", error);
      alert(`Failed to add item. ${error.message}`);
    }
  };
  
  // Render rows with dynamic level handling
  const renderRows = (items, level = 0, parentPath = []) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return [];
    }
    
    return items.flatMap((item, index, arr) => {
      if (!item) return []; // Skip undefined or null items
      
      const newPath = [...parentPath, item.name];
      const pathKey = newPath.join(" > ");
      const isExpanded = expanded[pathKey];
      const isLastItem = index === arr.length - 1;
      const hasChildren = item.children && Array.isArray(item.children) && item.children.length > 0;
      
      // Skip rendering if parent is not expanded
      if (level > 0 && !isVisible(parentPath)) {
        return [];
      }
  
      // Parse attributes
      let attributes = {};
      if (typeof item.attributes === "string") {
        try {
          attributes = JSON.parse(item.attributes);
        } catch (error) {
          console.error(`Error parsing attributes for ${item.name}:`, error);
        }
      } else if (item.attributes && typeof item.attributes === "object") {
        attributes = item.attributes;
      }
  
      const result = [];
  
      // Main item row
      const mainRow = (
        <tr
          key={pathKey}
          className={`text-black ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
        >
          {/* Empty cells for levels before this item's level */}
          {Array.from({ length: level }).map((_, i) => (
            <td key={`empty-${i}`} className="p-2"></td>
          ))}
  
          {/* This item's cell with name and toggle icon */}
          <td
            className={`p-2 flex items-center gap-2 ${level === 0 ? "font-bold text-red-500" : ""}`}
          >
            <span
              className="cursor-pointer"
              onClick={() => toggleExpand(pathKey)}
            >
              {hasChildren ? (
                isExpanded ? <IoMdArrowDropdown /> : <IoMdArrowDropright />
              ) : (
                <IoMdArrowDropright />
              )}
            </span>
            <span>{item.name}</span>
          </td>
  
          {/* Empty cells for levels after this item's level */}
          {Array.from({ length: visibleDepth - level - 1 }).map((_, i) => (
            <td key={`after-${i}`} className="p-2"></td>
          ))}
  
          {/* Description cell */}
          <td className="p-2">{item.description || "-"}</td>
          
          {/* Attribute cells for this item */}
          {visibleAttributeHeaders.map((attr) => (
            <td key={attr} className="p-2">{attributes[attr] || "-"}</td>
          ))}
        </tr>
      );
  
      result.push(mainRow);
  
      // If expanded, render children recursively
      if (isExpanded && hasChildren) {
        result.push(
          ...renderRows(item.children, level + 1, newPath)
        );
      }
  
      // Add the "Add New" button row when expanded
      if (isExpanded) {
        result.push(
          <tr key={`${pathKey}_add`} className="bg-gray-200">
            {/* Empty cells before the plus button */}
            {Array.from({ length: level + 1 }).map((_, i) => (
              <td key={`empty-before-${i}`} className="p-2"></td>
            ))}
  
            {/* Plus button cell */}
            <td
              className="p-2 text-green-400 cursor-pointer text-center"
              onClick={() => handleOpenModal(item.id.toString())}
            >
              <button
                title="Add New"
                className="group cursor-pointer outline-none duration-300"
                onMouseEnter={() => setRotated(true)}
                onMouseLeave={() => setRotated(false)}
              >
                <PlusCircle
                  size={30}
                  className={`stroke-zinc-400 fill-none duration-300 group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 ${
                    rotated ? "rotate-90" : ""
                  }`}
                />
              </button>
            </td>
  
            {/* Empty cells after the plus button */}
            {Array.from({ length: visibleDepth - level - 2 }).map((_, i) => (
              <td key={`empty-after-plus-${i}`} className="p-2"></td>
            ))}
  
            {/* Empty cells for description and attributes */}
            <td className="p-2"></td>
            {visibleAttributeHeaders.map((_, i) => (
              <td key={`empty_attr${i}`} className="p-2"></td>
            ))}
          </tr>
        );
      }
  
      // Add root level "Add New" button at the end
      if (level === 0 && isLastItem) {
        result.push(
          <tr key={`${pathKey}_add_L1`} className="bg-gray-200">
            <td
              className="p-2 text-green-400 cursor-pointer text-center"
              onClick={() => handleOpenModal("")}
            >
              <button
                title="Add New"
                className="group cursor-pointer outline-none duration-300"
                onMouseEnter={() => setRotated(true)}
                onMouseLeave={() => setRotated(false)}
              >
                <PlusCircle
                  size={30}
                  className={`stroke-zinc-400 fill-none duration-300 group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 ${
                    rotated ? "rotate-90" : ""
                  }`}
                />
              </button>
            </td>
  
            {/* Empty cells after the button */}
            {Array.from({ length: visibleDepth - 1 }).map((_, i) => (
              <td key={`empty-root-after-${i}`} className="p-2"></td>
            ))}
  
            {/* Empty cells for description and attributes */}
            <td className="p-2"></td>
            {visibleAttributeHeaders.map((_, i) => (
              <td key={`empty_root_attr${i}`} className="p-2"></td>
            ))}
          </tr>
        );
      }
  
      return result;
    });
  };

  // Calculate the maximum possible depth in the data
  const calculateMaxDepth = (items, currentDepth = 1) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return currentDepth;
    }
    
    let maxLevel = currentDepth;
    
    for (let item of items) {
      if (item && item.children && Array.isArray(item.children) && item.children.length > 0) {
        const childDepth = calculateMaxDepth(item.children, currentDepth + 1);
        maxLevel = Math.max(maxLevel, childDepth);
      }
    }
    
    return maxLevel;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="p-4 bg-gray-100 text-gray-900">
        <h2 className="text-xl font-bold">Nested Arrays Directory</h2>
        <table className="w-full border-collapse mt-2 bg-white shadow-md">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2 "># ID</th>
              <th className="p-2 ">Array Name</th>
              <th className="p-2 ">Dimension Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 text-center ">
              <td className="p-2">Array 1</td>
              <td className="p-2">Vegetables</td>
              <td className="p-2">...</td>
            </tr>
            <tr className="bg-white text-center ">
              <td className="p-2">Array 2</td>
              <td className="p-2">Fruits</td>
              <td className="p-2">...</td>
            </tr>
            <tr className="bg-gray-50 text-center ">
              <td className="p-2">Array 3</td>
              <td className="p-2">Nuts</td>
              <td className="p-2">...</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto p-4 bg-gray-100">
        <h2 className="text-xl font-bold text-gray-900 m-2">Nested Arrays Creator-Editor</h2>
        
        {/* Add Root Level Entity Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handleOpenModal("")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors"
          >
            <PlusCircle size={20} />
            <span>Add Root Level</span>
          </button>
          
          {/* Optional stats about current data */}
          <div className="text-sm text-gray-500">
            {data.length} root items | {visibleDepth} level{visibleDepth !== 1 ? 's' : ''} visible
          </div>
        </div>
        
        {/* Container with horizontal scroll when exceeding 10 columns */}
        <div className="overflow-x-auto" 
          style={{
            maxWidth: '100%',
            overflowX: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e0 #f7fafc'
          }}>
          <table className="w-full border-collapse bg-white shadow-md min-w-full"
            style={{
              tableLayout: 'fixed', // Use fixed layout for better column control
              width: `${Math.max(100, (visibleDepth + 1 + visibleAttributeHeaders.length) * 10)}%` // Ensure table expands properly
            }}>
            <thead>
              <tr className="bg-gray-300 text-left">
                {/* Generate column headers for currently visible levels only */}
                {Array.from({ length: visibleDepth }).map((_, i) => (
                  <th key={`L${i}`} className="p-2 border-r border-gray-400" style={{ minWidth: '150px' }}>
                    Level {i + 1}
                    {i === 0 && <span className="ml-1 text-red-500">(Root)</span>}
                  </th>
                ))}
                <th className="p-2 border-l border-gray-400">Description</th>
                {visibleAttributeHeaders.map(attr => (
                  <th key={attr} className="p-2">
                    {attr.replace("attribute", "Attr ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderRows(data)}</tbody>
          </table>
        </div>

        {/* Show scroll indicator if table has many columns */}
        {(visibleDepth + 1 + visibleAttributeHeaders.length) > 10 && (
          <div className="text-xs text-gray-500 mt-2 flex items-center justify-end">
            <span>⟺</span>
            <span className="ml-1">Scroll horizontally to see more columns</span>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div className="p-5  max-h-[60vh] overflow-y-auto ">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Data</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">Parent Name:</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName || "Root Level"}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded bg-gray-200 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Description:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 h-20"
                    required
                  ></textarea>
                </div>

                <div className="space-y-3">
                  {formData.attributes.map((attr, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) => handleAttributeChange(index, "value", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                        placeholder={`Attribute Value`}
                      />
                      {/* Delete button for attributes beyond the first one */}
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              attributes: prev.attributes.filter((_, i) => i !== index)
                            }));
                          }}
                          className="p-2 text-red-500 hover:text-red-700 flex-shrink-0"
                          title="Remove attribute"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addAttribute}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mt-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Attribute
                  </button>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NestedTable;
