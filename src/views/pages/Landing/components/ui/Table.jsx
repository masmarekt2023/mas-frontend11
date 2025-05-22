import React from "react";

const Table = ({className}) => {
  const levels = [
    { name: "Basic", amount: "0", icon: "🌑", percent: "3%", cashback: "0%" },
    { name: "Silver", amount: "100", icon: "🌕", percent: "2.5%", cashback: "0%" },
    { name: "Gold", amount: "250", icon: "🌟", percent: "2%", cashback: "0%" },
    { name: "Diamond", amount: "1500", icon: "💎", percent: "1.5%", cashback: "0%" },
    { name: "MAS Plus", amount: "10000", icon: "🔴", percent: "1%", cashback: "0%" },
  ];

  return (
    <div className={`${className ? className :""} flex items-center justify-center w-full md:overflow-hidden overflow-scroll`}>
      <table className="table-auto border-collapse w-full max-w-4xl text-white">
        <thead>
          <tr className=" ">
            <th className="px-6 py-4 border-b border-purple-600">Level</th>
            <th className="px-6 py-4 border-b border-purple-600">Amount</th>
            <th className="px-6 py-4 border-b border-purple-600">Icon</th>
            <th className="px-6 py-4 border-b border-purple-600 bg-[#7E28C0] text-center rounded-t-md">
              Percent
            </th>
            <th className="px-6 py-4 border-b border-purple-600">Cashback</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "b" : ""
              } text-center`}
            >
              <td className="px-6 py-4 border-b border-purple-600">{level.name}</td>
              <td className="px-6 py-4 border-b border-purple-600">{level.amount}</td>
              <td className="px-6 py-4 border-b border-purple-600">
                <div className="w-8 h-8 bg-white text-center flex items-center justify-center rounded-full mx-auto">
                  {level.icon}
                </div>
              </td>
              <td className="px-6 py-4 border-b border-purple-600 bg-[#7E28C0] font-bold">
                {level.percent}
              </td>
              <td className="px-6 py-4 border-b border-purple-600">{level.cashback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

