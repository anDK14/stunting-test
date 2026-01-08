'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role?: string;
    userName?: string;
    userRole?: string;
}

export function DashboardLayout({
    children,
    role,
    userName,
    userRole,
}: DashboardLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
                <Sidebar role={role} isCollapsed={isSidebarCollapsed} />
            </div>

            {/* Sidebar - Mobile */}
            {isMobileSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    />
                    <div className="lg:hidden">
                        <Sidebar role={role} isCollapsed={false} />
                    </div>
                </>
            )}

            {/* Main Content */}
            <div
                className={cn(
                    'transition-all duration-300',
                    isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
                )}
            >
                <Navbar
                    onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                    userName={userName}
                    userRole={userRole}
                    notificationCount={3}
                />
                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
