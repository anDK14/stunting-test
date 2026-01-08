'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Baby,
    Activity,
    AlertTriangle,
    Heart,
    Calendar,
    FileText,
    Settings,
    Users,
    MapPin,
} from 'lucide-react';
import { ROLES } from '@/lib/constants';

interface SidebarProps {
    role?: string;
    isCollapsed?: boolean;
}

const menuItems = {
    [ROLES.ADMIN]: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: Baby, label: 'Data Balita', href: '/balita/list' },
        { icon: Activity, label: 'Pengukuran', href: '/pengukuran' },
        { icon: AlertTriangle, label: 'Alerts', href: '/alerts' },
        { icon: Heart, label: 'Intervensi', href: '/interventions' },
        { icon: Calendar, label: 'Jadwal', href: '/schedules' },
        { icon: FileText, label: 'Laporan', href: '/reports' },
        { icon: MapPin, label: 'Posyandu', href: '/posyandu' },
        { icon: Users, label: 'Pengguna', href: '/users' },
        { icon: Settings, label: 'Pengaturan', href: '/settings' },
    ],
    [ROLES.PETUGAS_KESEHATAN]: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/petugas' },
        { icon: Baby, label: 'Data Balita', href: '/balita/list' },
        { icon: Activity, label: 'Pengukuran', href: '/pengukuran' },
        { icon: AlertTriangle, label: 'Alerts', href: '/alerts' },
        { icon: Heart, label: 'Intervensi', href: '/interventions' },
        { icon: Calendar, label: 'Jadwal', href: '/schedules' },
        { icon: FileText, label: 'Laporan', href: '/reports' },
        { icon: Settings, label: 'Pengaturan', href: '/settings' },
    ],
    [ROLES.KADER_POSYANDU]: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/kader' },
        { icon: Baby, label: 'Data Balita', href: '/balita/list' },
        { icon: Activity, label: 'Pengukuran', href: '/pengukuran' },
        { icon: Calendar, label: 'Jadwal', href: '/schedules' },
        { icon: Settings, label: 'Pengaturan', href: '/settings' },
    ],
    [ROLES.KEPALA_PUSKESMAS]: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/kepala' },
        { icon: FileText, label: 'Laporan', href: '/reports' },
        { icon: AlertTriangle, label: 'Monitoring', href: '/alerts' },
        { icon: MapPin, label: 'Posyandu', href: '/posyandu' },
        { icon: Settings, label: 'Pengaturan', href: '/settings' },
    ],
};

type MenuItemType = {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
};

type MenuItemsType = {
    [key: string]: MenuItemType[];
};

export function Sidebar({ role = ROLES.ADMIN, isCollapsed = false }: SidebarProps) {
    const pathname = usePathname();
    const items = (menuItems as MenuItemsType)[role] || (menuItems as MenuItemsType)[ROLES.ADMIN];

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300',
                isCollapsed ? 'w-16' : 'w-64'
            )}
        >
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Heart className="h-5 w-5" />
                    </div>
                    {!isCollapsed && (
                        <span className="font-semibold text-lg">Stunting Monitor</span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 p-4">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <Icon className="h-5 w-5 shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
