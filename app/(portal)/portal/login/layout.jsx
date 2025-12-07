import MainNavbar from "../component/MainNavbar";


export default function MainLayout({ children }) {
  return (
    <div>
     <MainNavbar/>
      <div className="pt-20"> {/* Prevent content from hiding behind navbar */}
        {children}
      </div>
    </div>
  );
}
