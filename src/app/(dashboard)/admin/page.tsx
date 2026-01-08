'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatsCard } from '@/components/shared/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Baby,
    AlertTriangle,
    TrendingUp,
    Users,
    Activity,
    Calendar,
    ArrowRight,
    MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function AdminDashboard() {
    // Mock data - will be replaced with actual data from Supabase
    const stats = {
        totalBalita: 1247,
        stuntingCases: 89,
        activeAlerts: 23,
        totalPosyandu: 52,
    };

    const recentAlerts = [
        {
            id: 1,
            balita: 'Ahmad Fauzi',
            nik: '3201012015001234',
            type: 'Stunting Terdeteksi',
            severity: 'high',
            date: '2 jam yang lalu',
        },
        {
            id: 2,
            balita: 'Siti Nurhaliza',
            nik: '3201012016002345',
            type: 'Risiko Stunting',
            severity: 'medium',
            date: '5 jam yang lalu',
        },
        {
            id: 3,
            balita: 'Budi Santoso',
            nik: '3201012017003456',
            type: 'Berat Badan Turun',
            severity: 'low',
            date: '1 hari yang lalu',
        },
    ];

    const recentActivities = [
        {
            id: 1,
            action: 'Pengukuran baru ditambahkan',
            user: 'Dr. Sarah',
            target: 'Ahmad Fauzi',
            time: '10 menit yang lalu',
        },
        {
            id: 2,
            action: 'Intervensi dimulai',
            user: 'Bidan Ani',
            target: 'Siti Nurhaliza',
            time: '1 jam yang lalu',
        },
        {
            id: 3,
            action: 'Balita baru terdaftar',
            user: 'Kader Posyandu 1',
            target: 'Rina Wati',
            time: '3 jam yang lalu',
        },
    ];

    return (
        <DashboardLayout
            role={ROLES.ADMIN}
            userName="Admin User"
            userRole="Administrator"
        >
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
                    <p className="text-muted-foreground mt-2">
                        Selamat datang kembali! Berikut ringkasan sistem monitoring stunting.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Balita"
                        value={stats.totalBalita.toLocaleString()}
                        description="Balita terdaftar aktif"
                        icon={Baby}
                        trend={{ value: 12, isPositive: true }}
                    />
                    <StatsCard
                        title="Kasus Stunting"
                        value={stats.stuntingCases}
                        description="Memerlukan intervensi"
                        icon={AlertTriangle}
                        trend={{ value: -5, isPositive: true }}
                        className="border-orange-200 dark:border-orange-900"
                    />
                    <StatsCard
                        title="Alert Aktif"
                        value={stats.activeAlerts}
                        description="Memerlukan tindak lanjut"
                        icon={Activity}
                        className="border-red-200 dark:border-red-900"
                    />
                    <StatsCard
                        title="Posyandu"
                        value={stats.totalPosyandu}
                        description="Posyandu terdaftar"
                        icon={MapPin}
                        trend={{ value: 8, isPositive: true }}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Recent Alerts */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Alert Terbaru</CardTitle>
                                    <CardDescription>
                                        Kasus yang memerlukan perhatian segera
                                    </CardDescription>
                                </div>
                                <Link href="/alerts">
                                    <Button variant="ghost" size="sm">
                                        Lihat Semua
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentAlerts.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{alert.balita}</p>
                                                <Badge
                                                    variant={
                                                        alert.severity === 'high'
                                                            ? 'destructive'
                                                            : alert.severity === 'medium'
                                                                ? 'default'
                                                                : 'secondary'
                                                    }
                                                >
                                                    {alert.type}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                NIK: {alert.nik}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{alert.date}</p>
                                        </div>
                                        <Link href={`/alerts/${alert.id}`}>
                                            <Button variant="outline" size="sm">
                                                Detail
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activities */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Aktivitas Terbaru</CardTitle>
                            <CardDescription>Aktivitas sistem terkini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex gap-4">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                            <Activity className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium">{activity.action}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {activity.user} • {activity.target}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                        <CardDescription>Akses fitur yang sering digunakan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Link href="/balita/add">
                                <Button variant="outline" className="w-full justify-start">
                                    <Baby className="mr-2 h-4 w-4" />
                                    Tambah Balita
                                </Button>
                            </Link>
                            <Link href="/pengukuran">
                                <Button variant="outline" className="w-full justify-start">
                                    <Activity className="mr-2 h-4 w-4" />
                                    Input Pengukuran
                                </Button>
                            </Link>
                            <Link href="/schedules/add">
                                <Button variant="outline" className="w-full justify-start">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Buat Jadwal
                                </Button>
                            </Link>
                            <Link href="/reports">
                                <Button variant="outline" className="w-full justify-start">
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    Lihat Laporan
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
