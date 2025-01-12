import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Company = {
  userId: string;
  _id: string;
  name: string;
  email: string;
  address: string;
  category: string;
  website: string;
}

const fetchCompanyData = async (token: string): Promise<Company[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/company/admin/profile/all`, {
    headers: {
      Authorization: token,
    },
  });

  const inactiveResponse = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/admin/inactiveCompanies`, {
    headers: {
      Authorization: token,
    },
  });

  const inactiveCompanies = inactiveResponse.data.map((company: { userId: string }) => company.userId);

  const companiesData = response.data
    .filter((company: Company) => !inactiveCompanies.includes(company._id))
    .map((company: Company) => ({
      _id: company._id,
      name: company.name,
      email: company.email,
      address: company.address,
      category: company.category,
      website: company.website,
    }));
  console.log(companiesData)

  return companiesData;
};

export const useAdminCompanyManager = (token: string) => {
  return useQuery({
    queryKey: ['companyData'],
    queryFn: () => fetchCompanyData(token),
  });
};

// const fetchCompanyData = async (token: string): Promise<Company[]> => {
//   const response = await axios.get(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/company/admin/profile/all`, {
//     headers: {
//       Authorization: token,
//     },
//   })
//   console.log(response.data)
//   const companiesData = response.data.map((company: Company) => ({
//     _id: company._id,
//     name: company.name,
//     email: company.email,
//     address: company.address,
//     category: company.category,
//     website: company.website,
//   }));
//   return companiesData;
//   // return [...companiesData, ...companiesData, ...companiesData, ...companiesData, ...companiesData];
// };

// export const useAdminCompanyManager = (token: string) => {
//   return useQuery({
//     queryKey: ['companyData'],
//     queryFn: () => fetchCompanyData(token),
//   });
// };