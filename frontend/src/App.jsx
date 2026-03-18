import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

export default function App() {
  // Giả lập phân quyền: 'manager' hoặc 'staff'
  const [role, setRole] = useState('manager'); 

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      <Sidebar role={role} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar role={role} setRole={setRole} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Dashboard role={role} />
        </main>
      </div>
    </div>
  );
}