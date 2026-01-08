'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Check, Trash2, Mail, MessageSquare, AlertTriangle } from 'lucide-react';
import { ROLES } from '@/lib/constants';

export default function NotificationsPage() {
    const [filter, setFilter] = useState('all');

    // Mock data
    const notifications = [
        {
            id: 1,
            type: 'alert',
            title: 'Stunting Terdeteksi',
            message: 'Ahmad Fauzi terdeteksi stunting dengan Z-Score TB/U: -2.5',
            timestamp: '2026-01-07T10:30:00',
            read: false,
            priority: 'high',
            link: '/alerts/1',
        },
        {
            id: 2,
            type: 'reminder',
            title: 'Pengingat Jadwal',
            message: 'Posyandu Rutin besok pukul 09:00 di Posyandu Melati 1',
            timestamp: '2026-01-06T14:00:00',
            read: false,
            priority: 'medium',
            link: '/schedules',
        },
        {
            id: 3,
            type: 'system',
            title: 'Laporan Bulanan Tersedia',
            message: 'Laporan monitoring stunting bulan Desember 2025 sudah tersedia',
            timestamp: '2026-01-01T08:00:00',
            read: true,
            priority: 'low',
            link: '/reports',
        },
        {
            id: 4,
            type: 'intervention',
            title: 'Intervensi Dimulai',
            message: 'Program PMT untuk Siti Nurhaliza telah dimulai',
            timestamp: '2025-12-28T11:00:00',
            read: true,
            priority: 'medium',
            link: '/interventions/2',
        },
    ];

    const stats = {
        total: notifications.length,
        unread: notifications.filter(n => !n.read).length,
        today: notifications.filter(n => {
            const today = new Date().toDateString();
            return new Date(n.timestamp).toDateString() === today;
        }).length,
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'alert':
                return <AlertTriangle className="h-5 w-5 text-orange-600" />;
            case 'reminder':
                return <Bell className="h-5 w-5 text-blue-600" />;
            case 'intervention':
                return <MessageSquare className="h-5 w-5 text-green-600" />;
            default:
                return <Mail className="h-5 w-5 text-gray-600" />;
        }
    };

    const getTimeAgo = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays} hari yang lalu`;
        if (diffHours > 0) return `${diffHours} jam yang lalu`;
        return 'Baru saja';
    };

    const markAsRead = (id: number) => {
        // TODO: Implement mark as read
        console.log('Mark as read:', id);
    };

    const deleteNotification = (id: number) => {
        // TODO: Implement delete
        console.log('Delete:', id);
    };

    const markAllAsRead = () => {
        // TODO: Implement mark all as read
        console.log('Mark all as read');
    };

    return (
        <DashboardLayout
            role={ROLES.PETUGAS_KESEHATAN}
            userName="Dr. Sarah"
            userRole="Petugas Kesehatan"
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Notifikasi</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola notifikasi dan pengingat Anda
                        </p>
                    </div>
                    <Button onClick={markAllAsRead}>
                        <Check className="mr-2 h-4 w-4" />
                        Tandai Semua Dibaca
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Notifikasi</p>
                                    <p className="text-3xl font-bold">{stats.total}</p>
                                </div>
                                <Bell className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-blue-200 dark:border-blue-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Belum Dibaca</p>
                                    <p className="text-3xl font-bold text-blue-600">{stats.unread}</p>
                                </div>
                                <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Hari Ini</p>
                                    <p className="text-3xl font-bold">{stats.today}</p>
                                </div>
                                <Bell className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Notifications List */}
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all">Semua</TabsTrigger>
                        <TabsTrigger value="unread">Belum Dibaca ({stats.unread})</TabsTrigger>
                        <TabsTrigger value="alert">Alert</TabsTrigger>
                        <TabsTrigger value="reminder">Pengingat</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Semua Notifikasi</CardTitle>
                                <CardDescription>
                                    {notifications.length} notifikasi
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200' : 'hover:bg-accent'
                                                }`}
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background border">
                                                {getIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="font-semibold">{notification.title}</p>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                    {!notification.read && (
                                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span>{getTimeAgo(notification.timestamp)}</span>
                                                    <span>•</span>
                                                    <Badge variant="outline" className="text-xs">
                                                        {notification.type}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {!notification.read && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteNotification(notification.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="unread">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">
                                    Filter untuk notifikasi yang belum dibaca
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="alert">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">
                                    Filter untuk notifikasi alert
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reminder">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">
                                    Filter untuk notifikasi pengingat
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
