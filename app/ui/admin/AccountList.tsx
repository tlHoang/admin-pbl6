import { useEffect, useState } from "react";
import AccountCard from "./AccountCard";
import { fetchCompanyAccount } from "@/app/lib/data";
import { AccountListSkeleton } from "../AdminSkeletons";
import Pagination from "../Pagination";
import { useAuth } from "@/app/contexts/auth-context";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  _id: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  createdBy: string;
  isActive: boolean;
}

const AccountList = () => {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const loadAccounts = async () => {
    try {
      const data = await fetchCompanyAccount(token || "");
      setAccounts(data);
      console.log("data", data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    loadAccounts();
  }, []);

  const handleCreateAccount = async (formData: FormData) => {
    await axios.put(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/admin/editStatus/`, {
      accountId: formData._id,
      isActive: true
    }, {
      headers: {
        Authorization: token,
      },
    })

    loadAccounts();
    toast.success("Tạo tài khoản thành công");
  };

  const handleDeleteAccount = (formData: FormData) => {
    console.log("tu choi", formData);
  };

  if (loading) {
    return (
      <AccountListSkeleton />
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        Số lượng tài khoản cần cấp: {accounts.length}
      </h1>

      <div className="space-y-6">
        {accounts.map((account, index) => (
          <AccountCard
            key={index}
            handleCreateAccount={handleCreateAccount}
            handleDeleteAccount={handleDeleteAccount}
            initialFormData={account}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={1} />
      </div>
    </div>
  );
};

export default AccountList;