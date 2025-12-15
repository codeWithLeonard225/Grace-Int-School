// app/(main)/layout.jsx
"use client";
import MainFooter from "../component/MainFooter";
import MainNavbar from "../component/MainNavbar";
import { AuthProvider } from "@/app/context/AuthContext";

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <div>
        <MainNavbar />
        <div className="pt-20">{children}</div>
        <MainFooter />
      </div>
    </AuthProvider>
  );
}
