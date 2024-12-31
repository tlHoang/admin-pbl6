"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { deletePost } from "@/app/services/jobService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  city: string;
  address: string;
  employmentType: string;
  numberApplicants: number;
}

const JobCardClose: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  salaryMin,
  salaryMax,
  currency,
  city,
  address,
  employmentType,
  numberApplicants,
}) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/admin/edit-job/${id}`);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa công việc này không?"
    );

    if (isConfirmed) {
      try {
        await deletePost(id);
        toast.success("Xóa công việc thành công");
      } catch (error) {
        console.error("Lỗi khi xóa công việc:", error);
        toast.error("Xóa công việc thất bại");
      }
    }
  };

  return (
    <Link href={`/admin/candidate-manager/${id}`}>
      <div className="cursor-pointer p-4 border rounded mb-4 bg-[#b3b3b3]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex space-x-2">
            <Image
              src="/icon/edit-button.svg"
              width={20}
              height={20}
              alt="Edit"
              className="mr-2 cursor-pointer"
              onClick={handleEdit}
            />
            <Image
              src="/icon/delete-circle.svg"
              width={20}
              height={20}
              alt="Delete"
              className="cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center mt-1 gap-x-2">
          <span className="bg-green-100 text-green-600 font-semibold px-2 py-1 text-xs rounded">
            {employmentType}
          </span>
          <p className="text-gray-400">
            Salary: {currency} {salaryMin}-{salaryMax}
          </p>
        </div>

        <div className="flex items-center mt-2">
          <div className="mr-4 flex-shrink-0">
            <Image
              src="/icon/google.svg"
              width={40}
              height={40}
              alt="Company Logo"
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col justify-between">
            <p className="font-semibold">{company}</p>
            <div className="flex items-center">
              <Image
                src="/icon/gray-location.svg"
                width={20}
                height={20}
                alt="Location"
              />
              <p className="ml-1">
                {city}, {address}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center rounded p-2 mt-2 bg-[#d9d9d9] px-4">
          <p>Số lượng ứng tuyển: {numberApplicants}</p>
          <Image
            src="/icon/mag-glass.svg"
            width={20}
            height={20}
            alt="Search icon"
          />
        </div>
      </div>
    </Link>
  );
};

export default JobCardClose;
