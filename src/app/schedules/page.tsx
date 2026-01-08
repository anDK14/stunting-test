'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Users } from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function SchedulesPage() {
    // Mock data - will be replaced with Supabase query
    const schedules = [
        {
            id: 1,
            date: '2026-01-15',
            time: '09:00',
            type: 'Posyandu Rutin',
            location: 'Posyandu Melati 1',
            attendees: 15,
            status: 'scheduled',
            petugas: 'Dr. Sarah',
        },
        {
            id: 2,
            date: '2026-01-15',
            time: '10:30',
            type: 'Follow Up',
            location: 'Posyandu Melati 2',
            attendees: 8,
            status: 'scheduled',
            petugas: 'Bidan Ani',
        },
        {
            id: 3,
            date: '2026-01-20',
            time: '09:00',
            type: 'Imunisasi Massal',
            location: 'Puskesmas',
            attendees: 30,
            status: 'scheduled',
            petugas: 'Dr. Sarah',
        },
    ];

    const groupByDate = (schedules: any[]) => {
        const grouped: { [key: string]: any[] } = {};
        schedules.forEach(schedule => {
            const date = schedule.date;
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(schedule);
        });
        return grouped;
    };

    const groupedSchedules = groupByDate(schedules);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Hari Ini';
        if (date.toDateString() === tomorrow.toDateString()) return 'Besok';

        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <DashboardLayout
            role={ROLES.KADER_POSYANDU}
            userName="Ibu Ani"
            userRole="Kader Posyandu"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Jadwal Kegiatan</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola jadwal pemeriksaan dan kegiatan posyandu
                        </p>
                    </div>
                    <Link href="/schedules/add">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Buat Jadwal
                        </Button>
                    </Link>
                </div>

                {/* Calendar View Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle>Kalender</CardTitle>
                        <CardDescription>Tampilan kalender bulanan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-96 flex items-center justify-center border rounded-lg bg-muted/50">
                            <div className="text-center">
                                <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    Kalender view akan ditampilkan di sini
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    (Akan diimplementasikan dengan react-day-picker)
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Jadwal Mendatang</h2>

                    {Object.entries(groupedSchedules).map(([date, daySchedules]) => (
                        <div key={date} className="space-y-4">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold">{formatDate(date)}</h3>
                                <Badge variant="outline">{daySchedules.length} kegiatan</Badge>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {daySchedules.map((schedule) => (
                                    <Card key={schedule.id} className="hover:shadow-md transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle className="text-lg">{schedule.type}</CardTitle>
                                                    <CardDescription className="mt-1">
                                                        {schedule.petugas}
                                                    </CardDescription>
                                                </div>
                                                <Badge>{schedule.status}</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span>{schedule.time} WIB</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span>{schedule.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span>{schedule.attendees} peserta</span>
                                            </div>
                                            <div className="flex gap-2 pt-2">
                                                <Button variant="outline" size="sm" className="flex-1">
                                                    Detail
                                                </Button>
                                                <Button size="sm" className="flex-1">
                                                    Edit
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
