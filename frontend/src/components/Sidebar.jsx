import React from 'react';

export default function Sidebar({ role }) {
  const managerLinks = [
    { name: 'Tổng quan', icon: '📊' },
    { name: 'Quản lý Sản phẩm', icon: '👟' },
    { name: 'Yêu cầu Xuất kho', icon: '📤' },
    { name: 'Quản lý Nhân viên', icon: '👥' },
  ];

  const staffLinks = [
    { name: 'Tổng quan', icon: '📊' },
    { name: 'Quét AI Nhập/Xuất', icon: '📷' }, // Tích hợp YOLOv8
    { name: 'Vị trí Kệ hàng', icon: '🗄️' },
  ];

  const sharedLinks = [
    { name: 'Tìm kiếm & Tồn kho', icon: '🔍' },
    { name: 'Báo cáo Nhập-Xuất', icon: '📈' },
    { name: 'AI Dự báo & Gợi ý', icon: '🤖' },
  ];

  const links = role === 'manager' 
    ? [...managerLinks, ...sharedLinks] 
    : [...staffLinks, ...sharedLinks];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col transition-all duration-300">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-white text-xl font-bold tracking-wider">SMART WAREHOUSE</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Menu Chính ({role === 'manager' ? 'Quản lý' : 'Nhân viên'})
        </p>
        
        {links.map((link, idx) => (
          <a key={idx} href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <span>{link.icon}</span>
            <span className="text-sm font-medium">{link.name}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-sm font-medium">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}