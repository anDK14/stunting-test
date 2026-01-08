'use client';

import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    Users,
    Edit,
    Trash2,
    Bell,
    CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function ScheduleDetailPage() {
    const params = useParams();
    const scheduleId = params.id as string;

    // Mock data
    const schedule = {
        id: parseInt(scheduleId),
        type: 'Posyandu Rutin',
        title: 'Posyandu Rutin Januari 2026',
        description: 'Kegiatan posyandu rutin bulanan untuk pemeriksaan kesehatan balita',
        date: '2026-01-15',
        time: '09:00',
        duration: 120,
        location: 'Posyandu Melati 1',
        address: 'Jl. Melati No. 123, RT 001/RW 002, Sukamaju',
        organizer: {
            id: 3,
            name: 'Ibu Ani',
            role: 'Kader Posyandu',
        },
        expected_attendees: 40,
        max_capacity: 50,
        actual_attendees: 38,
        status: 'completed',
        reminder: '1_day',
        notes: 'Mohon membawa buku KIA dan kartu posyandu',
        created_at: '2025-12-20T10:00:00',
        updated_at: '2026-01-15T12:00:00',
    };

    const attendees = [
        { id: 1, nama: 'Ahmad Fauzi', usia: '24 bulan', status: 'hadir', waktu: '09:15' },
        { id: 2, nama: 'Siti Nurhaliza', usia: '18 bulan', status: 'hadir', waktu: '09:30' },
        { id: 3, nama: 'Budi Santoso', usia: '30 bulan', status: 'hadir', waktu: '09:45' },
        { id: 4, nama: 'Dewi Lestari', usia: '12 bulan', status: 'tidak_hadir', waktu: '-' },
    ];

    const activities = [
        {
            id: 1,
            time: '09:00',
            activity: 'Pembukaan dan registrasi peserta',
            status: 'completed',
        },
        {
            id: 2,
            time: '09:30',
            activity: 'Penimbangan dan pengukuran balita',
            status: 'completed',
        },
        {
            id: 3,
            time: '10:30',
            activity: 'Pemberian vitamin dan imunisasi',
            status: 'completed',
        },
        {
            id: 4,
            time: '11:00',
            activity: 'Konseling gizi dan kesehatan',
            status: 'completed',
        },
    ];

    return (
        <DashboardLayout
            role={ROLES.KADER_POSYANDU}
            userName="Ibu Ani"
            userRole="Kader Posyandu"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/schedules">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{schedule.title}</h1>
                            <p className="text-muted-foreground mt-2">
                                {schedule.type}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <Button variant="outline">
                            <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                        </Button>
                        <StatusBadge status={schedule.status} />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Target Peserta</p>
                                <p className="text-3xl font-bold mt-2">{schedule.expected_attendees}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Peserta Hadir</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">
                                    {schedule.actual_attendees}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Kapasitas</p>
                                <p className="text-3xl font-bold mt-2">{schedule.max_capacity}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Durasi</p>
                                <p className="text-3xl font-bold mt-2">{schedule.duration} min</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Schedule Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Detail Jadwal</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">{schedule.description}</p>

                                <Separator />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Tanggal</p>
                                            <p className="font-medium">
                                                {new Date(schedule.date).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Waktu</p>
                                            <p className="font-medium">{schedule.time} WIB</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Lokasi</p>
                                            <p className="font-medium">{schedule.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Penyelenggara</p>
                                            <p className="font-medium">{schedule.organizer.name}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Alamat Lengkap</p>
                                    <p className="text-sm">{schedule.address}</p>
                                </div>

                                {schedule.notes && (
                                    <>
                                        <Separator />
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Catatan</p>
                                            <p className="text-sm">{schedule.notes}</p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Activities Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Rundown Kegiatan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {activities.map((activity, index) => (
                                        <div key={activity.id} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.status === 'completed'
                                                        ? 'bg-green-100 dark:bg-green-900'
                                                        : 'bg-muted'
                                                    }`}>
                                                    {activity.status === 'completed' ? (
                                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                    ) : (
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                </div>
                                                {index < activities.length - 1 && (
                                                    <div className="w-0.5 h-12 bg-border" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium">{activity.activity}</p>
                                                    <Badge variant="outline">{activity.time}</Badge>
                                                </div>
                                                <StatusBadge status={activity.status} className="mt-2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Attendees */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Daftar Peserta</CardTitle>
                                        <CardDescription>
                                            {attendees.filter(a => a.status === 'hadir').length} dari {attendees.length} peserta hadir
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {attendees.map((attendee) => (
                                        <div
                                            key={attendee.id}
                                            className="flex items-center justify-between p-3 rounded-lg border"
                                        >
                                            <div>
                                                <p className="font-medium">{attendee.nama}</p>
                                                <p className="text-sm text-muted-foreground">{attendee.usia}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {attendee.status === 'hadir' && (
                                                    <span className="text-sm text-muted-foreground">
                                                        {attendee.waktu}
                                                    </span>
                                                )}
                                                <StatusBadge status={attendee.status} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Organizer */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Penyelenggara</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="font-medium">{schedule.organizer.name}</p>
                                    <Badge variant="outline">{schedule.organizer.role}</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reminder */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pengingat</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Bell className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {schedule.reminder === '1_day' && '1 Hari Sebelumnya'}
                                        {schedule.reminder === '2_days' && '2 Hari Sebelumnya'}
                                        {schedule.reminder === '1_week' && '1 Minggu Sebelumnya'}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Timeline</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Dibuat</p>
                                        <p className="font-medium">
                                            {new Date(schedule.created_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Terakhir Update</p>
                                        <p className="font-medium">
                                            {new Date(schedule.updated_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Aksi Cepat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" className="w-full justify-start">
                                    <Bell className="mr-2 h-4 w-4" />
                                    Kirim Pengingat
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Users className="mr-2 h-4 w-4" />
                                    Tambah Peserta
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
