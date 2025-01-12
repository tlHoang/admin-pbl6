import axios from "axios";

export const categories = [
  { id: "1", name: "Graphics & Design" },
  { id: "2", name: "Code & Programming" },
  { id: "3", name: "Digital Marketing" },
  { id: "4", name: "Video & Animation" },
  { id: "5", name: "Writing & Translation" },
  { id: "6", name: "Music & Audio" },
  { id: "7", name: "Business & Finance" },
  { id: "8", name: "Lifestyle & Wellness" },
  { id: "9", name: "Photography" },
  { id: "10", name: "IT & Networking" },
  { id: "11", name: "Engineering" },
  { id: "12", name: "Education & Training" },
  { id: "13", name: "Consulting" },
];

export async function fetchJobs() {
  // delay de demo
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam",
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam",
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam",
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam",
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam",
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam",
    },
  ];
}

export async function fetchCompanyAccount(token: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/admin/inactiveCompanies`, {
    headers: {
      'Authorization': token
    }
  });
  return response.data;
  // await new Promise((resolve) => setTimeout(resolve, 500));
  // return [
  //   {
  //     name: "Google Inc.",
  //     email: "google@google.com",
  //     industry: "IT",
  //     phone: "0123456789",
  //     location: {
  //       city: "Đà Nẵng",
  //       address: "123 Nguyễn Lương Bằng",
  //     },
  //     website: "https://google.com",
  //   },
  //   {
  //     name: "Facebook Inc.",
  //     email: "facebook@facebook.com",
  //     industry: "IT",
  //     phone: "0123456789",
  //     location: {
  //       city: "Hà Nội",
  //       address: "456 Nguyễn Lương Bằng",
  //     },
  //     website: "https://facebook.com",
  //   },
  // ];
}

export const predefinedSkills = [
  "React",
  "Vue",
  "Angular",
  "NodeJS",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "SASS",
  "LESS",
  "Bootstrap",
  "Material UI",
  "Ant Design",
  "Tailwind CSS",
  "Jest",
  "Mocha",
  "Chai",
  "Cypress",
  "Selenium",
  "Git",
  "Docker",
  "Kubernetes",
  "AWS",
  "Google Cloud",
  "Azure",
  "Firebase",
  "Heroku",
  "Netlify",
  "Vercel",
  "CI/CD",
  "Agile",
];

export const companyField = [
  "Công nghệ thông tin",
  "Tài chính - Ngân hàng",
  "Bất động sản",
  "Giáo dục - Đào tạo",
  "Y tế - Chăm sóc sức khỏe",
  "Thời trang - Làm đẹp",
  "Du lịch - Nhà hàng - Khách sạn",
  "Sản xuất - Công nghiệp",
  "Thương mại điện tử",
  "Vận tải - Logistics",
  "Marketing - Quảng cáo",
  "Nông nghiệp",
  "Môi trường",
  "Năng lượng tái tạo",
  "Pháp lý",
  "Truyền thông - Báo chí",
  "Giải trí - Truyền hình",
  "Kiến trúc - Xây dựng",
  "Dịch vụ khách hàng",
  "Outsourcing",
];

export const provinces = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bạc Liêu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Dương",
  "Bình Định",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "TP. Hồ Chí Minh",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái"
]