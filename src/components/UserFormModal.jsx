import { useState } from "react";

const UserFormModal = ({ selectedUser, onSubmitForm, onClose }) => {
  const [name, setName] = useState(selectedUser?.name || "");
  const [company, setCompany] = useState(selectedUser?.company || "");
  const [email, setEmail] = useState(selectedUser?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !company.trim() || !email.trim()) return;

    onSubmitForm({ id: selectedUser?.id, name, company, email });
    setName("");
    setCompany("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-7 rounded-lg w-[300px]">
        <h2 className="text-xl font-semibold mb-2">Add User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            className="w-full p-2 border border-gray-300 rounded mb-3"
            onChange={(e) => setCompany(e.target.value)}
          />
          <div className="text-sm flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            >
              {selectedUser ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
