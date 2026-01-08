'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    FileText,
    Download,
    Calendar,
    TrendingDown,
    Users,
    MapPin,
    Plus,
    Filter,
} from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function ReportsPage() {
    // Mock data - will be replaced with Supabase query
    const reports = [
        {
            id: 1,
            title: 'Laporan Bulanan Desember 2025',
            type: 'monthly',
            period: 'Desember 2025',
            generated_at: '2026-01-01',
            generated_by: 'Admin User',
            file_size: '2.4 MB',
            status: 'completed',
        },
        {
            id: 2,
            title: 'Laporan Triwulan IV 2025',
            type: 'quarterly',
            period: 'Q4 2025',
            generated_at: '2025-12-31',
            generated_by: 'Admin User',
            file_size: '5.8 MB',
            status: 'completed',
        },
        {
            id: 3,
            title: 'Laporan Tahunan 2025',
            type: 'annual',
            period: '2025',
            generated_at: '2025-12-31',
            generated_by: 'Admin User',
            file_size: '12.3 MB',
            status: 'completed',
        },
    ];

    const stats = {
        totalReports: 24,
        thisMonth: 3,
        prevalensi: 7.1,
        coverage: 89.5,
    };

    return (
        <DashboardLayout
            role={ROLES.KEPALA_PUSKESMAS}
            userName="Dr. Budi"
            userRole="Kepala Puskesmas"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Laporan</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola dan generate laporan monitoring stunting
                        </p>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Generate Laporan Baru
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Laporan</p>
                                    <p className="text-3xl font-bold">{stats.totalReports}</p>
                                </div>
                                <FileText className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Bulan Ini</p>
                                    <p className="text-3xl font-bold">{stats.thisMonth}</p>
                                </div>
                                <Calendar className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Prevalensi</p>
                                    <p className="text-3xl font-bold">{stats.prevalensi}%</p>
                                </div>
                                <TrendingDown className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Coverage</p>
                                    <p className="text-3xl font-bold">{stats.coverage}%</p>
                                </div>
                                <Users className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Report Templates */}
                <Card>
                    <CardHeader>
                        <CardTitle>Template Laporan</CardTitle>
                        <CardDescription>Pilih template untuk generate laporan baru</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="pt-6">
                                    <Calendar className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="font-semibold mb-2">Laporan Bulanan</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Laporan monitoring stunting per bulan
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Generate
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="pt-6">
                                    <Calendar className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="font-semibold mb-2">Laporan Triwulan</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Laporan monitoring per triwulan
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Generate
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="pt-6">
                                    <Calendar className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="font-semibold mb-2">Laporan Tahunan</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Laporan monitoring per tahun
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Generate
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                {/* Reports List */}
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all">Semua Laporan</TabsTrigger>
                        <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                        <TabsTrigger value="quarterly">Triwulan</TabsTrigger>
                        <TabsTrigger value="annual">Tahunan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Riwayat Laporan</CardTitle>
                                        <CardDescription>
                                            {reports.length} laporan tersedia
                                        </CardDescription>
                                    </div>
                                    <Button variant="outline">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {reports.map((report) => (
                                        <div
                                            key={report.id}
                                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                                    <FileText className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{report.title}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline">{report.type}</Badge>
                                                        <span className="text-sm text-muted-foreground">
                                                            {report.period}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">•</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {report.file_size}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Generated by {report.generated_by} • {new Date(report.generated_at).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    Preview
                                                </Button>
                                                <Button size="sm">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="monthly">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">
                                    Filter untuk laporan bulanan
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="quarterly">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">
                                    Filter untuk laporan triwulan
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="annual">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">
                                    Filter untuk laporan tahunan
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
