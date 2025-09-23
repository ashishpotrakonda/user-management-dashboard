import { BsPencil } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";

const UserTable = ({
  users,
  setSelectedUser,
  setIsUserFormModalOpen,
  deleteUser,
}) => {
  const onClickEditButton = (user) => {
    setSelectedUser(user);
    setIsUserFormModalOpen(true);
  };

  return (
    <div className="overflow-x-auto p-4 rounded-lg">
      <table className="w-full text-sm lg:text-base border border-gray-300 border-collapse rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Company</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-gray-100 ">
              <td className="p-3 border-b border-gray-300">{user.id}</td>
              <td className="p-3 border-b border-gray-300">{user.name}</td>
              <td className="p-3 border-b border-gray-300">{user.email}</td>
              <td className="p-3 border-b border-gray-300">{user.company}</td>
              <td className="p-3 border-b border-gray-300 text-base md:text-xl">
                <div className="flex items-center md:gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onClickEditButton(user)}
                  >
                    <BsPencil />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 ml-4"
                    onClick={() => deleteUser(user.id)}
                  >
                    <BsTrash3 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
