import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-dark">
            Welcome
          </h1>
        </header>
        {children}
      </div>
    </div>
  );
}
