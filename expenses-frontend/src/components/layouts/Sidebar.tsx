import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Tag, BarChart3 } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transacciones' },
  { to: '/categories', icon: Tag, label: 'Categorías' },
  { to: '/reports', icon: BarChart3, label: 'Reportes' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-screen sticky top-16">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};