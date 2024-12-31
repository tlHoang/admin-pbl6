"use client";

import { useState, Suspense, useRef, useEffect } from "react";
import { JobListSkeleton } from "@/app/ui/sketetons";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import OpenJobList from "@/app/ui/company/OpenJobList";
import CloseJobList from "@/app/ui/company/CloseJobList";
import axios from "axios";
import { useAuth } from "@/app/contexts/auth-context";

interface Company {
  id: number;
  name: string;
  avatar: string;
  email: string;
  website: string;
}

interface RecruiterAccount {
  _id: string;
  name: string;
  email: string;
}

const RecruiterManager = ({ params }: { params: { id: number } }) => {
  const [accounts, setAccounts] = useState<RecruiterAccount[]>([]);
  const searchParams = useSearchParams();
  const company: Company = {
    id: params.id,
    name: searchParams.get("name") || "Unknown",
    avatar: "/icon/office.svg",
    email: searchParams.get("email") || "Unknown",
    website: "",
  };

  const { token } = useAuth();
  const [activeAccount, setActiveAccount] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"openJobs" | "closeJobs">(
    "openJobs"
  );
  const openJobsRef = useRef<HTMLButtonElement | null>(null);
  const closeJobsRef = useRef<HTMLButtonElement | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const getListAccount = async (): Promise<RecruiterAccount[]> => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/recruiter/getByCompany/${company.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAccounts(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching account recruiter list:", error);
      throw error;
    }
  };

  useEffect(() => {
    getListAccount()
      .then((data) => {
        setAccounts(data);
      })
      .catch((err) => {
        console.log("Error fetching accounts:", err);
      });

    const currentTab =
      activeTab === "openJobs" ? openJobsRef.current : closeJobsRef.current;
    if (currentTab) {
      const { offsetWidth, offsetLeft } = currentTab;
      setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab, activeAccount]);

  // useEffect(() => {
  //   const currentTab =
  //     activeTab === "openJobs" ? openJobsRef.current : closeJobsRef.current;
  //   if (currentTab) {
  //     const { offsetWidth, offsetLeft } = currentTab;
  //     setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
  //   }
  // }, [activeTab, activeAccount]);

  const handleAccountClick = (accountId: string) => {
    setActiveAccount(accountId);
    setActiveTab("openJobs");
  };

  return (
    <div>
      <div className="container mx-auto p-6">
        <button
          onClick={handleBack}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back
        </button>
        <div className="flex items-center justify-between border p-4 rounded-lg">
          <div className="flex items-center">
            <Image
              src={company.avatar}
              width={55}
              height={55}
              alt="Avatar"
              className="rounded-full mr-4"
            />
            <div>
              <p className="font-bold">{company.name}</p>
              <p>Email: {company.email}</p>
              <p>Website: {company.website}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {/* <Image
              src="/icon/edit-button.svg"
              width={20}
              height={20}
              alt="Edit"
              className="mr-2 cursor-pointer"
            />
            <Image
              src="/icon/delete-circle.svg"
              width={20}
              height={20}
              alt="Delete"
              className="cursor-pointer"
            /> */}
          </div>
        </div>

        {/* <h1 className="text-2xl font-semibold mt-8 mb-2">
          Tạo tài khoản tuyển dụng:
        </h1>
        <CreateAccountForm /> */}

        <h1 className="text-2xl font-semibold mt-8 mb-2">
          Danh sách tài khoản tuyển dụng: {accounts.length}
        </h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 mt-4 mb-8">
          {/* Left column: Recruiter accounts */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            {accounts.map((account) => (
              <div
                key={account._id}
                onClick={() => handleAccountClick(account._id)}
                className={`border p-4 rounded-lg shadow-md cursor-pointer ${activeAccount === account._id ? "border-blue-500" : ""
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src="/avatar_temp.jpg"
                      width={55}
                      height={55}
                      alt="Avatar"
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p className="font-bold">{account.name}</p>
                      <p>Email: {account.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {/* <Image
                      src="/icon/edit-button.svg"
                      width={20}
                      height={20}
                      alt="Edit"
                      className="mr-2 cursor-pointer"
                    /> */}
                    {/* <Image
                      src="/icon/delete-circle.svg"
                      width={20}
                      height={20}
                      alt="Delete"
                      className="cursor-pointer"
                    /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column: Job list for the selected account */}
          <div className="col-span-1 md:col-span-6 border p-4 rounded-lg shadow-md">
            {activeAccount ? (
              <>
                <div className="relative">
                  <div className="flex justify-start gap-8 text-xl">
                    <button
                      ref={openJobsRef}
                      className={`py-2 text-xl ${activeTab === "openJobs"
                        ? "text-blue-500"
                        : "text-gray-500"
                        }`}
                      onClick={() => setActiveTab("openJobs")}
                    >
                      Đang tuyển
                    </button>
                    <button
                      ref={closeJobsRef}
                      className={`py-2 text-xl ${activeTab === "closeJobs"
                        ? "text-blue-500"
                        : "text-gray-500"
                        }`}
                      onClick={() => setActiveTab("closeJobs")}
                    >
                      Đã đóng
                    </button>
                  </div>

                  {/* Sliding underline */}
                  <div
                    className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
                    style={{
                      width: underlineStyle.width,
                      left: underlineStyle.left,
                      bottom: "4px",
                    }}
                  ></div>
                </div>

                <Suspense fallback={<JobListSkeleton />}>
                  {activeTab === "openJobs" ? (
                    <OpenJobList recruiterId={activeAccount} />
                  ) : (
                    <CloseJobList recruiterId={activeAccount} />
                  )}
                </Suspense>
              </>
            ) : (
              <p className="text-gray-500">
                Chọn một tài khoản để xem danh sách các bài đăng tuyển
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterManager;
