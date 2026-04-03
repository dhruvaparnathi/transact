import { Plus } from "lucide-react";
import NewTransaction from "./NewTransaction";
import logo from "../assets/logo.gif";

const Navbar = ({ setOpenNew }) => {

  return (
  <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">

    <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg">
        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-gray-900">
          Transact
        </h1>
        <p className="text-xs text-gray-500">
          Manage your finances effortlessly
        </p>
        </div>
      </div>

      {/* Right */}
      <button 
      onClick={() => setOpenNew(true)}
      className="flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition shadow-md hover:cursor-pointer">
        <Plus size={18} />
        New Transaction
      </button>

    </div>

  </div>
)
};

export default Navbar;
