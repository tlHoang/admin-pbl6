import { FC, useEffect, useState } from "react";

interface FormData {
  _id: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  createdBy: string;
  isActive: boolean;
}
interface AccountCardProps {
  key: number;
  handleCreateAccount: (formData: FormData) => void;
  handleDeleteAccount: (formData: FormData) => void;
  initialFormData: FormData;
}

const AccountCard: FC<AccountCardProps> = ({ handleCreateAccount, initialFormData }) => {
  const [formData, setFormData] = useState<FormData>({
    _id: "",
    userId: "",
    email: "",
    name: "",
    role: "",
    createdBy: "",
    isActive: false,
  });

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  return (
    <div className="border p-4 rounded-lg shadow">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-medium">Tên công ty</label>
          <input
            name="companyName"
            className="border rounded p-2 w-full"
            value={formData.name}
            disabled
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium">Email công ty</label>
          <input
            name="companyEmail"
            className="border rounded p-2 w-full"
            value={formData.email}
            disabled
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleCreateAccount(formData)}
          >
            Tạo tài khoản
          </button>
          {/* <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleDeleteAccount(formData)}
          >
            Xóa
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;