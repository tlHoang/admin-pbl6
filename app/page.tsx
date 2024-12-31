'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/auth-context";

const Home: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "admin") {
      logout();
      router.push("/admin/login");
    } else {
      router.push("/admin/dashboard");
    }
  }, [isLoggedIn, router]);

  return (
    <div>
    </div>
  );
};

export default Home;