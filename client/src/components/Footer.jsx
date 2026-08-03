import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

        <p className="text-sm mx-auto">
          © {new Date().getFullYear()} Notes App. All Rights Reserved.
        </p>

        

      </div>
    </footer>
  );
};

export default Footer;