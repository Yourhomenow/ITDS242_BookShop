import React from "react";

function App() {
  const members = [
    {
      name: "Phumthai Hassadeepong",
      role: "ERD",
      email: "Phumthai.has@student.mahidol.ac.th",
      instagram: "zawile_n",
      image: "/pic/team1.jpg",
      bgColor: "#d7e8f3",
    },
    {
      name: "Thanadon Seesoda",
      role: "Data Dictionary",
      email: "thanadon.see@student.mahidol.ac.th",
      instagram: "thehome_ew",
      image: "/pic/team2.jpg",
      bgColor: "#fff0c7",
    },
    {
      name: "Pimnicha Aemcharoen",
      role: "UX / UI",
      email: "pimnicha.aem@student.mahidol.ac.th",
      instagram: "petaleiva",
      image: "/pic/team3.jpg",
      bgColor: "#f3ded1",
    },
    {
      name: "Kason Woonbumroong",
      role: "Reporting",
      email: "kason.woo@student.mahidol.ac.th",
      instagram: "kasnkub",
      image: "/pic/team4.jpg",
      bgColor: "#dedaf4",
    },
    {
      name: "Panjira Yamroj",
      role: "Reporting",
      email: "panjira.yam@student.mahidol.ac.th",
      instagram: "conf_usedso",
      image: "/pic/team5.jpg",
      bgColor: "#dedaf4",
    },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');
          * { font-family: 'Kanit', sans-serif; }
        `}
      </style>

      <div className="min-h-screen bg-[#f7f4ed] pb-20">
        {/* Top Navbar */}
        <nav className="w-full h-16 bg-[#6d5651] flex items-center px-8 shadow-sm">
          <img
            src="/pic/มหาสมุุด Ocean Emblem Logo (5).png"
            alt="Logo"
            className="h-16 object-contain"
          />
        </nav>

        {/* Header Banner - เปลี่ยนสีพื้นหลังหลังคำว่า OUR TEAM เป็น #fff5d9 */}
        <header className="relative w-full py-6 bg-[#fff5d9] flex justify-center items-center mb-10 shadow-sm">
          <button
            className="absolute left-8 w-10 h-10 rounded-2xl bg-white/80 hover:bg-white text-gray-500 flex items-center justify-center text-xl shadow-sm transition"
            onClick={() => window.history.back()}
          >
            ↶
          </button>
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-[#5c4a47]">
            OUR TEAM
          </h1>
        </header>

        {/* Content Container */}
        <main className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-8">
          {/* Row 1: 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {members.slice(0, 3).map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>

          {/* Row 2: 2 Cards Centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
            {members.slice(3, 5).map((member, index) => (
              <MemberCard key={index + 3} member={member} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

function MemberCard({ member }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Profile Image */}
      <div className="w-full aspect-[3/4] overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content Section */}
      <div
        className="p-6 flex-1 flex flex-col justify-between"
        style={{ backgroundColor: member.bgColor }}
      >
        <div>
          <h2 className="text-2xl font-bold text-[#5c4a47] mb-1">
            {member.role}
          </h2>
          <p className="text-sm text-[#7a6b68] font-medium mb-4">
            {member.name}
          </p>

          <div className="text-xs text-[#6b5c59] space-y-1 leading-relaxed">
            <p>
              <span className="font-bold">Name:</span> {member.name}
            </p>
            <p>
              <span className="font-bold">Role:</span> {member.role}
            </p>
            <p className="break-all">
              <span className="font-bold">Email:</span> {member.email}
            </p>
            <p>
              <span className="font-bold">Tel:</span> -
            </p>
          </div>
        </div>

        {/* Instagram Footer */}
        <div className="flex items-center gap-2 mt-5 text-[#5c4a47] text-xs font-semibold">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="truncate">{member.instagram}</span>
        </div>
      </div>
    </div>
  );
}

export default App;