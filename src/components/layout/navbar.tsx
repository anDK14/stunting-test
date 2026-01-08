'use client';

import { Bell, Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface NavbarProps {
    onMenuClick?: () => void;
    userName?: string;
    userRole?: string;
    notificationCount?: number;
}

export function Navbar({
    onMenuClick,
    userName = 'User',
    userRole = 'Admin',
    notificationCount = 0,
}: NavbarProps) {
    const initials = userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={onMenuClick}
            >
                <Menu className="h-5 w-5" />
            </Button>

            {/* Search */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Cari balita, NIK, atau nama..."
                        className="pl-8 w-full"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            {notificationCount > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                                >
                                    {notificationCount > 9 ? '9+' : notificationCount}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-96 overflow-y-auto">
                            {notificationCount === 0 ? (
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    Tidak ada notifikasi baru
                                </div>
                            ) : (
                                <>
                                    <DropdownMenuItem className="flex flex-col items-start p-3">
                                        <div className="font-medium">Alert: Stunting Terdeteksi</div>
                                        <div className="text-xs text-muted-foreground">
                                            Balita Ahmad menunjukkan tanda-tanda stunting
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            2 jam yang lalu
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="flex flex-col items-start p-3">
                                        <div className="font-medium">Reminder Pemeriksaan</div>
                                        <div className="text-xs text-muted-foreground">
                                            5 balita dijadwalkan pemeriksaan besok
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            5 jam yang lalu
                                        </div>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-center justify-center text-primary">
                            Lihat Semua Notifikasi
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="" alt={userName} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <div className="hidden sm:flex flex-col items-start text-left">
                                <span className="text-sm font-medium">{userName}</span>
                                <span className="text-xs text-muted-foreground">{userRole}</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>Pengaturan</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            Keluar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
