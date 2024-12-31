'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/auth-context";

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    } else {
      router.push("/admin/login");
    }
  }, [isLoggedIn, router]);

  return (
    <div>
    </div>
  );
};

export default Home;