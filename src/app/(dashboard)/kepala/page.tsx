'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatsCard } from '@/components/shared/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    TrendingDown,
    TrendingUp,
    Users,
    MapPin,
    FileText,
    Download,
    BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function KepalaDashboard() {
    const stats = {
        totalBalita: 1247,
        stuntingRate: 7.1,
        coverageRate: 89.5,
        totalPosyandu: 52,
    };

    const regionalData = [
        {
            kecamatan: 'Kecamatan A',
            balita: 312,
            stunting: 18,
            percentage: 5.8,
            trend: 'down',
        },
        {
            kecamatan: 'Kecamatan B',
            balita: 285,
            stunting: 25,
            percentage: 8.8,
            trend: 'up',
        },
        {
            kecamatan: 'Kecamatan C',
            balita: 298,
            stunting: 21,
            percentage: 7.0,
            trend: 'down',
        },
        {
            kecamatan: 'Kecamatan D',
            balita: 352,
            stunting: 25,
            percentage: 7.1,
            trend: 'stable',
        },
    ];

    const recentReports = [
        {
            id: 1,
            title: 'Laporan Bulanan Desember 2025',
            date: '1 Jan 2026',
            type: 'Bulanan',
        },
        {
            id: 2,
            title: 'Laporan Triwulan IV 2025',
            date: '31 Des 2025',
            type: 'Triwulan',
        },
        {
            id: 3,
            title: 'Laporan Tahunan 2025',
            date: '31 Des 2025',
            type: 'Tahunan',
        },
    ];

    return (
        <DashboardLayout
            role={ROLES.KEPALA_PUSKESMAS}
            userName="Dr. Budi"
            userRole="Kepala Puskesmas"
        >
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Kepala Puskesmas</h1>
                    <p className="text-muted-foreground mt-2">
                        Monitoring dan evaluasi program stunting wilayah
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Balita"
                        value={stats.totalBalita.toLocaleString()}
                        description="Terdaftar di wilayah"
                        icon={Users}
                        trend={{ value: 8, isPositive: true }}
                    />
                    <StatsCard
                        title="Prevalensi Stunting"
                        value={`${stats.stuntingRate}%`}
                        description="Dari total balita"
                        icon={TrendingDown}
                        trend={{ value: -2.3, isPositive: true }}
                        className="border-orange-200 dark:border-orange-900"
                    />
                    <StatsCard
                        title="Cakupan Pemeriksaan"
                        value={`${stats.coverageRate}%`}
                        description="Target 90%"
                        icon={BarChart3}
                        trend={{ value: 5, isPositive: true }}
                    />
                    <StatsCard
                        title="Posyandu Aktif"
                        value={stats.totalPosyandu}
                        description="Di seluruh wilayah"
                        icon={MapPin}
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Data Per Kecamatan</CardTitle>
                        <CardDescription>
                            Distribusi kasus stunting berdasarkan wilayah
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {regionalData.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-lg border"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">{data.kecamatan}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {data.balita} balita • {data.stunting} kasus stunting
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-2xl font-bold">{data.percentage}%</p>
                                            <p className="text-xs text-muted-foreground">Prevalensi</p>
                                        </div>
                                        {data.trend === 'down' ? (
                                            <TrendingDown className="h-5 w-5 text-green-600" />
                                        ) : data.trend === 'up' ? (
                                            <TrendingUp className="h-5 w-5 text-red-600" />
                                        ) : (
                                            <div className="h-5 w-5" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Laporan Terbaru</CardTitle>
                                    <CardDescription>Dokumen laporan yang tersedia</CardDescription>
                                </div>
                                <Link href="/reports">
                                    <Button variant="ghost" size="sm">
                                        Lihat Semua
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentReports.map((report) => (
                                    <div
                                        key={report.id}
                                        className="flex items-center justify-between p-3 rounded-lg border"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-sm">{report.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {report.type} • {report.date}
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Aksi Cepat</CardTitle>
                            <CardDescription>Fitur yang sering digunakan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <Link href="/reports">
                                    <Button variant="outline" className="w-full justify-start">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Lihat Semua Laporan
                                    </Button>
                                </Link>
                                <Link href="/reports/generate">
                                    <Button variant="outline" className="w-full justify-start">
                                        <BarChart3 className="mr-2 h-4 w-4" />
                                        Generate Laporan Baru
                                    </Button>
                                </Link>
                                <Link href="/monitoring">
                                    <Button variant="outline" className="w-full justify-start">
                                        <TrendingUp className="mr-2 h-4 w-4" />
                                        Monitoring Real-time
                                    </Button>
                                </Link>
                                <Link href="/analytics">
                                    <Button variant="outline" className="w-full justify-start">
                                        <BarChart3 className="mr-2 h-4 w-4" />
                                        Analisis Data
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
