import React from 'react';

const NavBar: React.FC = () => {
  return (
    <header
      className="mx-auto flex h-16 max-w-[1100px] items-center justify-start px-[6vw] shadow-[0_4px_40px_rgba(0,0,0,0.02)]"
      data-animate=""
    >
      <span className="font-instrument text-[22px] font-bold tracking-[0.01em] text-[#353535]">
        Quillworks
      </span>
    </header>
  );
};

export default NavBar;
