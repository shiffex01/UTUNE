import { HiMenu } from "react-icons/hi";

const PageHeader = ({ title, onMenuClick, children }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-2xl"
        >
          <HiMenu />
        </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          {title}
        </h1>
      </div>

      {/* RIGHT SIDE (optional buttons like Download) */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default PageHeader;