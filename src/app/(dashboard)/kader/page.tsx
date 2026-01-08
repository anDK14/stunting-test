'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatsCard } from '@/components/shared/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/status-badge';
import {
    Baby,
    Activity,
    Calendar,
    MapPin,
    ArrowRight,
    Plus,
} from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function KaderDashboard() {
    const stats = {
        totalBalita: 45,
        measurementsThisMonth: 32,
        upcomingSchedules: 8,
        posyanduName: 'Posyandu Melati 1',
    };

    const recentMeasurements = [
        {
            id: 1,
            balita: 'Ahmad Fauzi',
            date: 'Hari ini, 09:30',
            height: 85.5,
            weight: 11.2,
            status: 'normal',
        },
        {
            id: 2,
            balita: 'Siti Nurhaliza',
            date: 'Hari ini, 10:15',
            height: 78.0,
            weight: 9.5,
            status: 'normal',
        },
    ];

    const upcomingSchedules = [
        {
            id: 1,
            date: 'Besok, 15 Jan',
            type: 'Posyandu Rutin',
            expectedAttendees: 15,
        },
        {
            id: 2,
            date: '20 Jan',
            type: 'Imunisasi Massal',
            expectedAttendees: 25,
        },
    ];

    return (
        <DashboardLayout
            role={ROLES.KADER_POSYANDU}
            userName="Ibu Ani"
            userRole="Kader Posyandu"
        >
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Kader</h1>
                    <p className="text-muted-foreground mt-2">
                        Kelola data balita di {stats.posyanduName}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Balita"
                        value={stats.totalBalita}
                        description="Di posyandu ini"
                        icon={Baby}
                    />
                    <StatsCard
                        title="Pengukuran Bulan Ini"
                        value={stats.measurementsThisMonth}
                        description={`Dari ${stats.totalBalita} balita`}
                        icon={Activity}
                        trend={{ value: 15, isPositive: true }}
                    />
                    <StatsCard
                        title="Jadwal Mendatang"
                        value={stats.upcomingSchedules}
                        description="Kegiatan posyandu"
                        icon={Calendar}
                    />
                    <StatsCard
                        title="Posyandu"
                        value={stats.posyanduName}
                        description="Lokasi tugas"
                        icon={MapPin}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Pengukuran Terbaru</CardTitle>
                                    <CardDescription>Data pengukuran hari ini</CardDescription>
                                </div>
                                <Link href="/pengukuran">
                                    <Button size="sm">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentMeasurements.map((measurement) => (
                                    <div
                                        key={measurement.id}
                                        className="flex items-center justify-between p-4 rounded-lg border"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{measurement.balita}</p>
                                                <StatusBadge status={measurement.status} />
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                TB: {measurement.height} cm • BB: {measurement.weight} kg
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {measurement.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Jadwal Kegiatan</CardTitle>
                                    <CardDescription>Kegiatan posyandu mendatang</CardDescription>
                                </div>
                                <Link href="/schedules">
                                    <Button variant="ghost" size="sm">
                                        Lihat Semua
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingSchedules.map((schedule) => (
                                    <div
                                        key={schedule.id}
                                        className="flex items-center justify-between p-4 rounded-lg border"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium">{schedule.type}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {schedule.date}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Estimasi peserta: {schedule.expectedAttendees} balita
                                            </p>
                                        </div>
                                        <Calendar className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Link href="/balita/add">
                                <Button variant="outline" className="w-full justify-start">
                                    <Baby className="mr-2 h-4 w-4" />
                                    Daftar Balita Baru
                                </Button>
                            </Link>
                            <Link href="/pengukuran">
                                <Button variant="outline" className="w-full justify-start">
                                    <Activity className="mr-2 h-4 w-4" />
                                    Input Pengukuran
                                </Button>
                            </Link>
                            <Link href="/balita/list">
                                <Button variant="outline" className="w-full justify-start">
                                    <Baby className="mr-2 h-4 w-4" />
                                    Lihat Data Balita
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
