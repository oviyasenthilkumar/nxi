import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import Header from "./Header";
import { Link } from "react-router-dom";

const initialProcesses = [
  { id: "01", association: "Dates Dessert", pre: "-", suc: "02", inputs: "apricot, groundnut", processingBrief: "primary base pulp", outputs: "apricot pulp" },
  { id: "02", association: "Dates Dessert", pre: "01", suc: "03", inputs: "dates, walnut", processingBrief: "filler mix", outputs: "dates mix" },
  { id: "03", association: "Dates Dessert", pre: "01", suc: "04", inputs: "rasthali, groundnut", processingBrief: "taste enhance mix", outputs: "banana pulp" },
  { id: "04", association: "Dates Dessert", pre: "03", suc: "-", inputs: "walnut, groundnut", processingBrief: "hydration for baking", outputs: "nuts milk" },
];

const ProcessTable = () => {
  const [processes, setProcesses] = useState(initialProcesses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProcess, setEditingProcess] = useState(null);

  const handleEdit = (process) => {
    setEditingProcess(process);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setProcesses(processes.filter((process) => process.id !== id));
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProcess(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <Link to="/ui">
        {" "}
        <button className="absolute top-4 left-4 border   px-4 py-2  shadow-md  transition cursor-pointer">
          UI Change
        </button>
      </Link>
      <Header />
      <div className="flex justify-between items-center w-full max-w-8xl mb-4 mt-20">
        <h1 className="text-3xl font-bold">Process</h1>
        <button
          className="border-2 border-black px-6 py-4 font-semibold hover:bg-gray-100"
          onClick={() => setIsFormOpen(true)}
        >
          + NEW PROCESS
        </button>
      </div>
      <div className="w-full max-w-8xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-6 text-left">
                  ASSOCIATIONS
                </th>
                <th className="border border-gray-300 p-6 text-left">ID</th>
                <th className="border border-gray-300 p-6 text-left">PRE</th>
                <th className="border border-gray-300 p-6 text-left">SUC</th>
                <th className="border border-gray-300 p-6 text-left">INPUTS</th>
                <th className="border border-gray-300 p-6 text-left">
                  PROCESSING BRIEF
                </th>
                <th className="border border-gray-300 p-6 text-left">
                  OUTPUTS
                </th>
                <th className="border border-gray-300 p-6 text-left">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => (
                <tr key={process.id} className="border border-gray-300">
                  <td className="border border-gray-300 p-6">
                    {process.association}
                  </td>
                  <td className="border border-gray-300 p-6">{process.id}</td>
                  <td className="border border-gray-300 p-6">{process.pre}</td>
                  <td className="border border-gray-300 p-6">{process.suc}</td>
                  <td className="border border-gray-300 p-6">
                    {process.inputs}
                  </td>
                  <td className="border border-gray-300 p-6">
                    {process.processingBrief}
                  </td>
                  <td className="border border-gray-300 p-6">
                    {process.outputs}
                  </td>
                  <td className="border border-gray-300 p-6 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleEdit(process)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleDelete(process.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isFormOpen && (
          <ProcessForm
            onClose={handleFormClose}
            existingProcess={editingProcess}
            setProcesses={setProcesses}
            processes={processes}
          />
        )}
      </div>
    </div>
  );
};


const ProcessForm = ({ onClose, existingProcess, setProcesses, processes }) => {
  const [formData, setFormData] = useState(existingProcess || {
    name: "",
    pre: "Nil",
    suc: "",
    inputs: "",
    processingBrief: "",
    outputs: "",
    details: [{ scope: "", limits: "", processingDetails: "" }],
  });

  const [additionalForms, setAdditionalForms] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = formData.details.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setFormData({ ...formData, details: updatedDetails });
  };

  const addNewDetail = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { scope: "", limits: "", processingDetails: "" }],
    });
  };

  const addNewProcess = () => {
    setAdditionalForms([...additionalForms, { ...formData, id: `${additionalForms.length + 1}` }]);
  };

  const handleSubmit = () => {
    if (existingProcess) {
      setProcesses(processes.map(p => (p.id === existingProcess.id ? formData : p)));
    } else {
      setProcesses([...processes, { ...formData, id: `${processes.length + 1}` }]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-50">
      <div className="bg-white p-6 w-2/5 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Process Form</h1>
        <h2 className="text-2xl font-bold mb-4">Add New Process</h2>
        <div className="grid grid-cols-3 gap-4">
          <label className="font-semibold col-span-1">Name</label>
          <label className="font-semibold col-span-1">Pre</label>
          <label className="font-semibold col-span-1">Suc</label>
          <select name="name" className="border border-gray-300 p-2 col-span-1" value={formData.name} onChange={handleChange}>
            <option>Dates Dessert</option>
          </select>
          <input name="pre" className="border border-gray-300 p-2 col-span-1" value={formData.pre} onChange={handleChange} />
          <input name="suc" className="border border-gray-300 p-2 col-span-1" value={formData.suc} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold">Inputs</label>
            <input name="inputs" className="border border-gray-300 p-2 w-full" placeholder="Inputs" value={formData.inputs} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">Processing Brief</label>
            <input name="processingBrief" className="border border-gray-300 p-2 w-full" placeholder="Processing Brief" value={formData.processingBrief} onChange={handleChange} />
          </div>
        </div>

        <div className="mt-4">
          <label className="font-semibold">Outputs</label>
          <input name="outputs" className="border border-gray-300 p-2 w-full" placeholder="Outputs" value={formData.outputs} onChange={handleChange} />
        </div>

        <h3 className="font-bold mt-4">PROCESSING DETAILING</h3>
        {formData.details.map((detail, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <label className="font-semibold">Scope</label>
              <input className="border border-gray-300 p-2 w-full" placeholder="Scope" value={detail.scope} onChange={(e) => handleDetailChange(index, "scope", e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">Limits</label>
              <input className="border border-gray-300 p-2 w-full" placeholder="Limits" value={detail.limits} onChange={(e) => handleDetailChange(index, "limits", e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">Processing Details</label>
              <input className="border border-gray-300 p-2 w-full" placeholder="Processing Details" value={detail.processingDetails} onChange={(e) => handleDetailChange(index, "processingDetails", e.target.value)} />
            </div>
          </div>
        ))}

        <button className="text-blue-500 mt-2" onClick={addNewDetail}>+ ADD NEW</button>
        
        {additionalForms.map((form, idx) => (
          <div key={idx} className="mt-6 p-4 border-t">
            <h2 className="text-xl font-bold">Additional Process {idx + 1}</h2>
          </div>
        ))}
        
        <button className="mt-4 px-5 py-3 border border-gray-300 text-black rounded w-full" onClick={addNewProcess}>+ ADD NEXT PROCESS</button>

        <div className="flex justify-end mt-4">
          <button onClick={handleSubmit} className="px-4 py-2 bg-black text-white rounded mr-2">SAVE</button>
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded">CANCEL</button>
        </div>
      </div>
    </div>
  );
};





export default ProcessTable;
