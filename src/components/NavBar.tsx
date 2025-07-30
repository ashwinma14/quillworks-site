import React from 'react';

const NavBar: React.FC = () => {
  return (
    <header
      className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-[6vw] shadow-[0_4px_40px_rgba(0,0,0,0.02)]"
      data-animate=""
    >
      <span className="font-instrument text-[22px] font-bold tracking-[0.01em] text-[#353535]">
        Quillworks
      </span>
      <a
        href="#"
        className="inline-flex items-center rounded-full border border-[#67705D] px-5 py-2 text-[14px] font-semibold text-[#67705D]
                transition-colors hover:bg-[#F7F8F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#67705D]"
      >
        Join waitlist
      </a>
    </header>
  );
};

export default NavBar;
