import Link from "next/link";

const MainNav = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex space-x-4">
        <Link href={"/admin/login"}>
          <button className="w-32 h-12 px-4 py-2 bg-xanhduong-600 text-white rounded-lg font-semibold">
            Đăng nhập
          </button>
        </Link>
        <Link href={"/user/signup"}>
          <button className="w-32 h-12 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg gradient-hover">
            Đăng ký
          </button>
        </Link>
      </div>
      <Link href={"/recruiter/login"} className="text-sm text-blue-600 hover:underline">
        Đăng nhập với tư cách nhà tuyển dụng ?
      </Link>
    </div>
  );
}

export default MainNav;