'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatsCard } from '@/components/shared/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/status-badge';
import {
    Baby,
    AlertTriangle,
    Calendar,
    Heart,
    Activity,
    ArrowRight,
    Clock,
} from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function PetugasDashboard() {
    const stats = {
        assignedCases: 15,
        pendingMeasurements: 8,
        upcomingSchedules: 12,
        activeInterventions: 6,
    };

    const assignedAlerts = [
        {
            id: 1,
            balita: 'Ahmad Fauzi',
            age: '24 bulan',
            status: 'stunting',
            priority: 'high',
            lastUpdate: '2 hari yang lalu',
        },
        {
            id: 2,
            balita: 'Siti Nurhaliza',
            age: '18 bulan',
            status: 'risiko_stunting',
            priority: 'medium',
            lastUpdate: '1 hari yang lalu',
        },
    ];

    const todaySchedule = [
        {
            id: 1,
            time: '09:00',
            balita: 'Budi Santoso',
            type: 'Pemeriksaan Rutin',
            location: 'Posyandu Melati 1',
        },
        {
            id: 2,
            time: '10:30',
            balita: 'Rina Wati',
            type: 'Follow Up',
            location: 'Posyandu Melati 2',
        },
        {
            id: 3,
            time: '13:00',
            balita: 'Dedi Kurniawan',
            type: 'Konseling Gizi',
            location: 'Puskesmas',
        },
    ];

    return (
        <DashboardLayout
            role={ROLES.PETUGAS_KESEHATAN}
            userName="Dr. Sarah"
            userRole="Petugas Kesehatan"
        >
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Petugas</h1>
                    <p className="text-muted-foreground mt-2">
                        Kelola kasus dan jadwal pemeriksaan balita Anda
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Kasus Ditugaskan"
                        value={stats.assignedCases}
                        description="Memerlukan tindak lanjut"
                        icon={AlertTriangle}
                    />
                    <StatsCard
                        title="Pengukuran Pending"
                        value={stats.pendingMeasurements}
                        description="Belum diinput"
                        icon={Activity}
                        className="border-orange-200 dark:border-orange-900"
                    />
                    <StatsCard
                        title="Jadwal Mendatang"
                        value={stats.upcomingSchedules}
                        description="Minggu ini"
                        icon={Calendar}
                    />
                    <StatsCard
                        title="Intervensi Aktif"
                        value={stats.activeInterventions}
                        description="Sedang berlangsung"
                        icon={Heart}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Kasus Saya</CardTitle>
                                    <CardDescription>Kasus yang ditugaskan kepada Anda</CardDescription>
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
                                {assignedAlerts.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className="flex items-center justify-between p-4 rounded-lg border"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{alert.balita}</p>
                                                <StatusBadge status={alert.status} />
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Usia: {alert.age}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Update terakhir: {alert.lastUpdate}
                                            </p>
                                        </div>
                                        <Link href={`/alerts/${alert.id}`}>
                                            <Button size="sm">Tindak Lanjut</Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Jadwal Hari Ini</CardTitle>
                            <CardDescription>Pemeriksaan yang dijadwalkan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {todaySchedule.map((schedule) => (
                                    <div key={schedule.id} className="flex gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Clock className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">{schedule.time}</p>
                                                <StatusBadge status="scheduled" />
                                            </div>
                                            <p className="text-sm">{schedule.balita}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {schedule.type} • {schedule.location}
                                            </p>
                                        </div>
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
                            <Link href="/pengukuran">
                                <Button variant="outline" className="w-full justify-start">
                                    <Activity className="mr-2 h-4 w-4" />
                                    Input Pengukuran
                                </Button>
                            </Link>
                            <Link href="/interventions/add">
                                <Button variant="outline" className="w-full justify-start">
                                    <Heart className="mr-2 h-4 w-4" />
                                    Buat Intervensi
                                </Button>
                            </Link>
                            <Link href="/schedules">
                                <Button variant="outline" className="w-full justify-start">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Lihat Jadwal
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
