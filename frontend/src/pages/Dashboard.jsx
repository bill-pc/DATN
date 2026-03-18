import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

export default function Dashboard({ role }) {
    // --- 1 & 2. DỮ LIỆU BIỂU ĐỒ (Giữ nguyên cho đẹp giao diện) ---
    const topSellingData = [
        { name: 'Nike AF1', daBan: 850 },
        { name: 'Jordan 1', daBan: 620 },
        { name: 'Adidas Samba', daBan: 540 },
        { name: 'Vans Old', daBan: 410 },
        { name: 'Converse', daBan: 380 },
    ];

    const aiForecastData = [
        { month: 'T4', nhuCauThucTe: 4000, aiDuBao: 4200 },
        { month: 'T5', nhuCauThucTe: 3000, aiDuBao: 3100 },
        { month: 'T6', nhuCauThucTe: null, aiDuBao: 4800 },
        { month: 'T7', nhuCauThucTe: null, aiDuBao: 5200 },
    ];

    // --- 3. DỮ LIỆU THỰC TẾ KHO HÀNG (4 Kệ x 4 Tầng) ---
    // Sắp xếp từ Tầng 4 (Cao nhất) xuống Tầng 1 (Thấp nhất) cho mỗi Kệ
    const warehouseShelves = [
        {
            id: 'Kệ 1',
            distance: 'Gần cửa nhất',
            levels: [
                { level: 'Tầng 4', item: 'Vớ, Dây giày', activity: 10, isWarning: false },
                { level: 'Tầng 3', item: 'Sandal nam', activity: 25, isWarning: false },
                { level: 'Tầng 2', item: 'Converse 1970s', activity: 65, isWarning: false },
                // Lỗi 1: Chỗ đẹp nhất (Kệ 1, Tầng thấp) nhưng để hàng ế
                { level: 'Tầng 1', item: 'Dép tổ ong', activity: 5, isWarning: true, errorType: 'cold-in-hot' }
            ]
        },
        {
            id: 'Kệ 2',
            distance: 'Cách cửa 5m',
            levels: [
                { level: 'Tầng 4', item: 'Giày trẻ em', activity: 15, isWarning: false },
                { level: 'Tầng 3', item: 'Puma Suede', activity: 35, isWarning: false },
                { level: 'Tầng 2', item: 'Vans Old Skool', activity: 50, isWarning: false },
                { level: 'Tầng 1', item: 'Jordan 1 Mid', activity: 75, isWarning: false }
            ]
        },
        {
            id: 'Kệ 3',
            distance: 'Cách cửa 10m',
            levels: [
                { level: 'Tầng 4', item: 'Biti\'s Hunter', activity: 20, isWarning: false },
                { level: 'Tầng 3', item: 'Giày lười da', activity: 12, isWarning: false },
                { level: 'Tầng 2', item: 'Adidas Stan Smith', activity: 45, isWarning: false },
                { level: 'Tầng 1', item: 'Giày chạy bộ', activity: 60, isWarning: false }
            ]
        },
        {
            id: 'Kệ 4',
            distance: 'Xa cửa nhất (15m)',
            levels: [
                // Lỗi 2: Hàng cực hot nhưng để tít trên cao và xa nhất kho
                { level: 'Tầng 4', item: 'Nike AF1 Trắng', activity: 98, isWarning: true, errorType: 'hot-in-cold' },
                { level: 'Tầng 3', item: 'Adidas Samba', activity: 85, isWarning: true, errorType: 'hot-in-cold' },
                { level: 'Tầng 2', item: 'Giày bóng đá', activity: 30, isWarning: false },
                { level: 'Tầng 1', item: 'Giày bảo hộ', activity: 8, isWarning: false }
            ]
        }
    ];

    // Hàm quy định màu sắc dựa trên số lượt xuất/nhập
    const getColor = (activity) => {
        if (activity >= 80) return 'bg-rose-600 text-white border-rose-700'; // Rất Hot
        if (activity >= 60) return 'bg-orange-500 text-white border-orange-600'; // Hot
        if (activity >= 40) return 'bg-amber-300 text-amber-900 border-amber-400'; // Bình thường
        if (activity >= 20) return 'bg-emerald-300 text-emerald-900 border-emerald-400'; // Ít
        return 'bg-blue-200 text-blue-900 border-blue-300'; // Rất ít (Ế)
    };

    return (
        <div className="space-y-6 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Tổng quan Quản lý Kho</h1>
                    <p className="text-sm text-gray-500 mt-1">Hệ thống AI đang phân tích dữ liệu kho vật lý</p>
                </div>
            </div>

            {/* 4 Thẻ Thống kê nhanh */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Tổng Tồn Kho</p>
                    <h3 className="text-2xl font-bold text-gray-800">12,450 <span className="text-sm font-normal text-gray-500">đôi</span></h3>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Đã xuất (Tháng này)</p>
                    <h3 className="text-2xl font-bold text-emerald-600">1,850</h3>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Độ chính xác AI</p>
                    <h3 className="text-2xl font-bold text-blue-600">94.5%</h3>
                </div>
                <div className="bg-[#1e293b] p-5 rounded-xl shadow-sm text-white">
                    <p className="text-sm text-slate-300 mb-1">AI Dự báo Thiếu hụt</p>
                    <h3 className="text-2xl font-bold">5 <span className="text-sm font-normal text-slate-300">mẫu cần nhập gấp</span></h3>
                </div>
            </div>

            {/* --- PHẦN 1: BIỂU ĐỒ (Thu nhỏ lại) --- */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-base font-bold text-gray-800 mb-3">Top Bán Chạy</h2>
                    <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topSellingData} margin={{ left: -20 }} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 11 }} />
                                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                                <Bar dataKey="daBan" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* Bảng 2: AI Dự báo */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">🤖 AI Dự Báo Xu Thế</h2>
                    </div>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={aiForecastData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="nhuCauThucTe" stroke="#9ca3af" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                                <Area type="monotone" dataKey="aiDuBao" stroke="#8b5cf6" fill="url(#colorAi)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* --- PHẦN 2: BẢN ĐỒ NHIỆT MẶT CẮT KHO THỰC TẾ --- */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        🔥 Heatmap Mặt Cắt 4 Kệ Kho & Vị Trí Sản Phẩm
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Quy tắc AI: Đỏ/Cam (Hot) phải nằm ở <b>Tầng 1-2 & Gần Cửa</b>. Xanh (Cold) phải nằm ở <b>Tầng 3-4 & Xa Cửa</b>.
                    </p>
                </div>

                {/* Cấu trúc Kho */}
                <div className="flex border-4 border-slate-700 rounded-lg bg-slate-100 p-6 gap-6 relative">

                    {/* Cửa kho (Trái) */}
                    <div className="w-20 border-r-4 border-dashed border-sky-500 flex flex-col justify-center items-center bg-sky-50 rounded-l-md">
                        <div className="text-center font-black text-sky-700 writing-vertical-lr  tracking-widest text-lg">
                            CỬA XUẤT NHẬP
                        </div>
                    </div>

                    {/* 4 Kệ hàng */}
                    <div className="flex-1 grid grid-cols-4 gap-6">
                        {warehouseShelves.map((shelf, shelfIdx) => (
                            <div key={shelfIdx} className="flex flex-col">
                                <div className="text-center mb-4">
                                    <h3 className="font-bold text-lg text-slate-800">{shelf.id}</h3>
                                    <span className="text-xs text-slate-500">{shelf.distance}</span>
                                </div>

                                {/* Các tầng của kệ (Khung sắt) */}
                                <div className="flex flex-col gap-2 border-x-4 border-slate-800 p-2 bg-slate-200 rounded-t-sm">
                                    {shelf.levels.map((slot, slotIdx) => (
                                        <div
                                            key={slotIdx}
                                            className={`relative h-16 rounded border flex flex-col items-center justify-center p-1 shadow-sm transition-transform hover:scale-110 cursor-pointer ${getColor(slot.activity)}`}
                                        >
                                            <span className="font-bold text-[13px] text-center leading-tight truncate w-full px-1" title={slot.item}>
                                                {slot.item}
                                            </span>
                                            <span className="text-[11px] font-medium opacity-90 mt-1">
                                                {slot.activity} lượt lấy
                                            </span>

                                            {/* Icon cảnh báo từ AI nếu xếp sai quy tắc */}
                                            {slot.isWarning && (
                                                <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md animate-bounce">
                                                    <span className="text-lg">⚠️</span>
                                                </div>
                                            )}

                                            {/* Tên tầng mờ ở góc */}
                                            <span className="absolute top-1 left-1 text-[9px] opacity-50 font-bold">{slot.level}</span>
                                        </div>
                                    ))}
                                    {/* Chân kệ */}
                                    <div className="h-2 bg-slate-800 w-full mt-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- LỜI KHUYÊN ĐIỀU CHUYỂN CỦA AI --- */}
                <div className="mt-6 bg-rose-50 border border-rose-200 rounded-xl p-5 flex gap-4 items-start shadow-sm">
                    <div className="text-4xl animate-pulse">🤖</div>
                    <div className="w-full">
                        <h3 className="text-rose-800 font-bold text-lg mb-2 flex items-center gap-2">
                            Phát hiện vị trí lưu kho sai quy tắc tối ưu
                        </h3>

                        <div className="space-y-3">
                            <div className="bg-white p-3 rounded border border-rose-100 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        <span className="text-rose-600">Nike AF1 Trắng (98 lượt)</span> và <span className="text-orange-500">Adidas Samba (85 lượt)</span>
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">Đang nằm ở <b>Kệ 4, Tầng 3-4</b> (Vị trí cao nhất, xa cửa nhất). Nhân viên phải lấy xe nâng và đi bộ 15m nhiều lần trong ngày.</p>
                                </div>
                                <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded uppercase">Lãng phí thời gian</span>
                            </div>

                            <div className="bg-white p-3 rounded border border-blue-100 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        <span className="text-blue-600">Dép tổ ong (5 lượt)</span>
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">Đang nằm ở <b>Kệ 1, Tầng 1</b> (Vị trí vàng sát cửa, dễ lấy nhất) nhưng cả ngày không ai xuất kho.</p>
                                </div>
                                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded uppercase">Lãng phí không gian</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-rose-200 flex gap-3">
                            <button className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2">
                                <span>🔄</span> Tạo lệnh hoán đổi tự động (Kệ 4 ⇄ Kệ 1)
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}