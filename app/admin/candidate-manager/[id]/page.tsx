"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/app/contexts/auth-context";
import axios from "axios";
import { formatDOB } from "@/app/lib/utils";
import { UserDetailSkeleton } from "@/app/ui/sketetons";
import { usePathname } from "next/navigation";

type UserProfileType = {
  email: string;
  name: string;
  address?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
};

type EducationType = {
  _id: string;
  school: string;
  major: string;
  duration: string;
  description: string;
};

type ExperienceType = {
  _id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
};

type SkillType = {
  _id: string;
  title: string;
};

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [educations, setEducations] = useState<EducationType[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  // // temp skill
  const [skills, setSkills] = useState<string[]>([]);
  const [fetchedSkills, setFetchedSkills] = useState<SkillType[]>([]);

  const { token } = useAuth();

  const user = usePathname().split("/").pop();

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/user/profile/${user}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUserProfile({
        email: response.data.email,
        name: response.data.name,
        address: response.data.address,
        phone: response.data.phone,
        dateOfBirth: response.data.dateOfBirth,
        gender: response.data.gender,
      });
      setEducations(response.data.education);
      setExperiences(response.data.experience);
      setFetchedSkills(response.data.skills);
      console.log(fetchedSkills)
      setSkills(response.data.skills.map((skill: SkillType) => skill.title));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    return <>
      <UserDetailSkeleton />
    </>
  }

  const handleBack = () => {
    window.history.back();
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4">
        <button onClick={handleBack} className="text-blue-500 hover:text-blue-700">
          ← Back
        </button>
        {/* Profile Information */}
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/avatar_temp.jpg"
              alt="Profile Image"
              width={100}
              height={100}
              className="rounded-full place-self-start"
            />
            <div>
              <h2 className="text-3xl font-bold">{userProfile?.name}</h2>
              <div className="text-sm flex flex-col mt-2">
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-blue-500">📧</span>
                  <p>{userProfile?.email}</p>
                </div>
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-blue-500">📅</span>
                  <p>
                    {formatDOB(userProfile?.dateOfBirth)}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-blue-500">📍</span>
                  <p>
                    {userProfile?.address === ""
                      ? "Địa chỉ"
                      : userProfile?.address}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-blue-500">📞</span>
                  <p>
                    {userProfile?.phone === ""
                      ? "Số điện thoại"
                      : userProfile?.phone}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-blue-500">👤</span>
                  <p>
                    {userProfile?.gender === ""
                      ? "Giới tính"
                      : userProfile?.gender === "male" ? "Nam" : "Nữ"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center border-b-2">
            <h3 className="text-lg font-bold">Học vấn</h3>
          </div>
          {educations.length === 0 && (
            <p className="text-gray-500 mt-2">No education information</p>
          )}
          <ul className="mt-2 space-y-2">
            {educations.map((education: EducationType) => (
              <li key={education._id} className="border-b pb-2 flex justify-between">
                <div>
                  <h4 className="font-bold">{education.school}</h4>
                  <p>{education.major}</p>
                  <p>
                    {education.duration}
                  </p>
                  <p>{education.description}</p>
                </div>
                <div className="flex-shrink-0">
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Kĩ năng</h3>
          </div>
          {skills.length === 0 && (
            <p className="text-gray-500 mt-2">No skill information</p>
          )}
          <ul className="mt-2 space-y-2">
            {skills.map((skill: string) => (
              <span
                key={skill}
                className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </ul>
        </div>

        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Kinh nghiệm làm việc</h3>
          </div>


          {experiences.length === 0 && (
            <p className="text-gray-500 mt-2">No Experience</p>
          )}
          <ul className="mt-2 space-y-2">
            {experiences.map((experience: ExperienceType) => (
              <li key={experience._id} className="border-b pb-2 flex justify-between">
                <div>
                  <h4 className="font-bold">{experience.company}</h4>
                  <p>{experience.position}</p>
                  <p>
                    {experience.duration}
                  </p>
                  <p>{experience.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div >
    </div >
  );
};

export default ProfilePage;
