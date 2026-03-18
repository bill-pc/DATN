import React from 'react';

export default function Navbar({ role, setRole }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex px-4 py-2 bg-gray-100 rounded-lg w-1/3">
        <span className="text-gray-500 mr-2">🔍</span>
        <input 
          type="text" 
          placeholder="Tìm mã giày, size, màu sắc..." 
          className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Nút gọi AI Chatbot */}
        <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100">
          🤖 AI Trợ lý Kho
        </button>

        {/* Thông tin User */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">Phan Quốc Kiệt</p>
            <p className="text-xs text-gray-500 capitalize">{role === 'manager' ? 'Quản lý kho' : 'Nhân viên kho'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold cursor-pointer" onClick={() => setRole(role === 'manager' ? 'staff' : 'manager')} title="Click để đổi Role test giao diện">
            PQK
          </div>
        </div>
      </div>
    </header>
  );
}