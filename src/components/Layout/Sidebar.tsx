"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  MessageSquare,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Team", href: "/team", icon: Users },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed z-50 md:static inset-y-0 left-0 w-64 bg-white border-r flex flex-col transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full justify-between flex-1">
          <div>
            <div className="p-6 flex justify-between items-center border-b md:justify-center">
              <h1 className="text-2xl font-bold text-blue-600">Board App</h1>
              <button onClick={onClose} className="md:hidden">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <nav className="px-4 py-2 space-y-1">
              {navItems.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t">
            <button className="flex items-center text-sm text-red-500 hover:underline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
