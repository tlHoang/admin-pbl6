export type CardJob = {
  id: string;
  title: string;
  companyName: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: {
    city: string;
    address: string;
  };
  category: {
    id: string;
    name: string;
  };
  employmentType: string;
  numberApplicant: number;
};

export type JobDetail = {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  };
  companyName: string;
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: {
    city: string;
    address: string;
  };
  employmentType: string;
  postDate: string;
  dueDate: string;
  status: string;
  messageId: string;
  isBookMark: boolean;
  isApplied: boolean;
  numberApplicant: number;
};

export type CardCandidateApplied = {
  idUser: string;
  name: string;
  email: string;
  resumeLink: string;
  coverLetter: string;
  status: string;
  dateSubmit: string;
};

export type Job = {
  title: string;
  company: string;
  salary: string;
  location: string;
};

export type Job2 = {
  id: string;
  title: string;
  category: string;
  company: { name: string };
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: {
    city: string;
    address: string;
  };
  employmentType: string;
  postedDate: string;
  status: string;
};

export type Company = {
  name: string;
  email: string;
  industry: string;
  city: string;
  address: string;
  website: string;
};

export type SignupUser = {
  name: string;
  email: string;
  location: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type UserDataType = {
  id: string;
  email: string;
  name: string;
};

export type UserProfileType = {
  name: string;
  location: string;
  skills: string[];
  experience: string[];
  education: string[];
};
