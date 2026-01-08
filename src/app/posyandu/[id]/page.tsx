'use client';

import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Users, Activity, Calendar, Edit } from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function PosyanduDetailPage() {
    const params = useParams();
    const posyanduId = params.id as string;

    // Mock data
    const posyandu = {
        id: parseInt(posyanduId),
        name: 'Posyandu Melati 1',
        address: 'Jl. Melati No. 123, RT 001/RW 002',
        kelurahan: 'Sukamaju',
        kecamatan: 'Kecamatan A',
        kota: 'Jakarta Selatan',
        phone: '021-1234567',
        email: 'melati1@posyandu.id',
        status: 'active',
        established_date: '2020-01-15',
        last_activity: '2026-01-07',
    };

    const kaders = [
        { id: 1, name: 'Ibu Ani', phone: '081234567890', role: 'Ketua' },
        { id: 2, name: 'Ibu Siti', phone: '081234567891', role: 'Anggota' },
        { id: 3, name: 'Ibu Dewi', phone: '081234567892', role: 'Anggota' },
    ];

    const stats = {
        total_balita: 45,
        stunting: 4,
        risiko_stunting: 6,
        normal: 35,
        kader_count: 3,
        activities_this_month: 4,
    };

    const recentActivities = [
        {
            id: 1,
            type: 'Posyandu Rutin',
            date: '2026-01-07',
            attendees: 38,
            measurements: 38,
        },
        {
            id: 2,
            type: 'Imunisasi',
            date: '2025-12-28',
            attendees: 42,
            measurements: 42,
        },
    ];

    const balitaList = [
        { id: 1, nama: 'Ahmad Fauzi', usia: '24 bulan', status: 'stunting' },
        { id: 2, nama: 'Siti Nurhaliza', usia: '18 bulan', status: 'risiko_stunting' },
        { id: 3, nama: 'Budi Santoso', usia: '30 bulan', status: 'normal' },
    ];

    return (
        <DashboardLayout
            role={ROLES.ADMIN}
            userName="Admin User"
            userRole="Administrator"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/posyandu">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{posyandu.name}</h1>
                            <p className="text-muted-foreground mt-2">
                                {posyandu.kelurahan}, {posyandu.kecamatan}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <StatusBadge status={posyandu.status} />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Total Balita</p>
                                <p className="text-3xl font-bold mt-2">{stats.total_balita}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-red-200 dark:border-red-900">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Stunting</p>
                                <p className="text-3xl font-bold text-red-600 mt-2">{stats.stunting}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-yellow-200 dark:border-yellow-900">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Risiko</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.risiko_stunting}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Kegiatan Bulan Ini</p>
                                <p className="text-3xl font-bold mt-2">{stats.activities_this_month}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Posyandu Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Posyandu</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Alamat Lengkap</p>
                                        <p className="font-medium">{posyandu.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Kelurahan</p>
                                        <p className="font-medium">{posyandu.kelurahan}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Kecamatan</p>
                                        <p className="font-medium">{posyandu.kecamatan}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Kota</p>
                                        <p className="font-medium">{posyandu.kota}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Telepon</p>
                                        <p className="font-medium">{posyandu.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{posyandu.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Tanggal Berdiri</p>
                                        <p className="font-medium">
                                            {new Date(posyandu.established_date).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Aktivitas Terakhir</p>
                                        <p className="font-medium">
                                            {new Date(posyandu.last_activity).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activities */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Kegiatan Terbaru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="p-4 rounded-lg border">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold">{activity.type}</h4>
                                                <Badge variant="outline">
                                                    {new Date(activity.date).toLocaleDateString('id-ID')}
                                                </Badge>
                                            </div>
                                            <div className="flex gap-4 text-sm text-muted-foreground">
                                                <span>Peserta: {activity.attendees}</span>
                                                <span>•</span>
                                                <span>Pengukuran: {activity.measurements}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Balita List */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Daftar Balita</CardTitle>
                                        <CardDescription>
                                            {stats.total_balita} balita terdaftar
                                        </CardDescription>
                                    </div>
                                    <Link href={`/balita/list?posyandu=${posyanduId}`}>
                                        <Button variant="outline" size="sm">
                                            Lihat Semua
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {balitaList.map((balita) => (
                                        <Link key={balita.id} href={`/balita/${balita.id}`}>
                                            <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                                                <div>
                                                    <p className="font-medium">{balita.nama}</p>
                                                    <p className="text-sm text-muted-foreground">{balita.usia}</p>
                                                </div>
                                                <StatusBadge status={balita.status} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Kader */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Kader Posyandu</CardTitle>
                                <CardDescription>{kaders.length} kader aktif</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {kaders.map((kader) => (
                                        <div key={kader.id} className="p-3 rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <Users className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{kader.name}</p>
                                                    <Badge variant="outline" className="text-xs mt-1">
                                                        {kader.role}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {kader.phone}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Aksi Cepat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href="/schedules/add">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Jadwalkan Kegiatan
                                    </Button>
                                </Link>
                                <Link href="/balita/add">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Users className="mr-2 h-4 w-4" />
                                        Tambah Balita
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full justify-start">
                                    <Activity className="mr-2 h-4 w-4" />
                                    Lihat Laporan
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
