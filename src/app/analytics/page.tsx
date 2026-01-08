'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    TrendingDown,
    TrendingUp,
    Users,
    Activity,
    AlertTriangle,
    CheckCircle2,
    BarChart3,
    PieChart,
} from 'lucide-react';
import { ROLES } from '@/lib/constants';

export default function AnalyticsPage() {
    // Mock data
    const overview = {
        total_balita: 1247,
        stunting: 89,
        risiko_stunting: 156,
        normal: 1002,
        prevalensi: 7.1,
        trend: -0.3, // negative means improvement
    };

    const monthlyData = [
        { month: 'Jul', stunting: 95, risiko: 165, normal: 987 },
        { month: 'Agu', stunting: 92, risiko: 162, normal: 993 },
        { month: 'Sep', stunting: 90, risiko: 160, normal: 997 },
        { month: 'Okt', stunting: 91, risiko: 158, normal: 998 },
        { month: 'Nov', stunting: 90, risiko: 157, normal: 1000 },
        { month: 'Des', stunting: 89, risiko: 156, normal: 1002 },
    ];

    const byAge = [
        { range: '0-6 bulan', total: 245, stunting: 12, percentage: 4.9 },
        { range: '7-12 bulan', total: 298, stunting: 18, percentage: 6.0 },
        { range: '13-24 bulan', total: 356, stunting: 28, percentage: 7.9 },
        { range: '25-36 bulan', total: 198, stunting: 17, percentage: 8.6 },
        { range: '37-48 bulan', total: 150, stunting: 14, percentage: 9.3 },
    ];

    const byPosyandu = [
        { name: 'Posyandu Melati 1', balita: 45, stunting: 4, percentage: 8.9 },
        { name: 'Posyandu Melati 2', balita: 38, stunting: 2, percentage: 5.3 },
        { name: 'Posyandu Mawar 1', balita: 52, stunting: 5, percentage: 9.6 },
        { name: 'Posyandu Mawar 2', balita: 41, stunting: 3, percentage: 7.3 },
        { name: 'Posyandu Kenanga', balita: 48, stunting: 4, percentage: 8.3 },
    ];

    const interventionStats = {
        total: 45,
        ongoing: 12,
        completed: 28,
        success_rate: 82.1,
    };

    return (
        <DashboardLayout
            role={ROLES.KEPALA_PUSKESMAS}
            userName="Dr. Budi"
            userRole="Kepala Puskesmas"
        >
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
                    <p className="text-muted-foreground mt-2">
                        Analisis data dan tren monitoring stunting
                    </p>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Balita</p>
                                    <p className="text-3xl font-bold">{overview.total_balita.toLocaleString()}</p>
                                </div>
                                <Users className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-red-200 dark:border-red-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Stunting</p>
                                    <p className="text-3xl font-bold text-red-600">{overview.stunting}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {overview.prevalensi}% prevalensi
                                    </p>
                                </div>
                                <AlertTriangle className="h-8 w-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-yellow-200 dark:border-yellow-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Risiko Stunting</p>
                                    <p className="text-3xl font-bold text-yellow-600">{overview.risiko_stunting}</p>
                                </div>
                                <Activity className="h-8 w-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 dark:border-green-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Trend Prevalensi</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-3xl font-bold text-green-600">
                                            {Math.abs(overview.trend)}%
                                        </p>
                                        <TrendingDown className="h-6 w-6 text-green-600" />
                                    </div>
                                    <p className="text-xs text-green-600 mt-1">Menurun</p>
                                </div>
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <Tabs defaultValue="trend" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="trend">Trend Bulanan</TabsTrigger>
                        <TabsTrigger value="age">Berdasarkan Usia</TabsTrigger>
                        <TabsTrigger value="posyandu">Berdasarkan Posyandu</TabsTrigger>
                        <TabsTrigger value="intervention">Intervensi</TabsTrigger>
                    </TabsList>

                    <TabsContent value="trend" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Trend Stunting 6 Bulan Terakhir</CardTitle>
                                <CardDescription>
                                    Perkembangan kasus stunting per bulan
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80 flex items-center justify-center border rounded-lg bg-muted/50">
                                    <div className="text-center">
                                        <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">
                                            Chart visualization akan ditampilkan di sini
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            (Akan diimplementasikan dengan Recharts)
                                        </p>
                                    </div>
                                </div>

                                {/* Data Table */}
                                <div className="mt-6">
                                    <h4 className="font-semibold mb-4">Data Bulanan</h4>
                                    <div className="space-y-2">
                                        {monthlyData.map((data, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                                                <span className="font-medium">{data.month}</span>
                                                <div className="flex gap-4 text-sm">
                                                    <span className="text-red-600">Stunting: {data.stunting}</span>
                                                    <span className="text-yellow-600">Risiko: {data.risiko}</span>
                                                    <span className="text-green-600">Normal: {data.normal}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="age" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Distribusi Stunting Berdasarkan Usia</CardTitle>
                                <CardDescription>
                                    Prevalensi stunting per kelompok usia
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {byAge.map((item, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{item.range}</span>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-muted-foreground">
                                                        {item.stunting}/{item.total}
                                                    </span>
                                                    <Badge variant={item.percentage > 8 ? 'destructive' : 'secondary'}>
                                                        {item.percentage}%
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-red-500"
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="posyandu" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Performa Posyandu</CardTitle>
                                <CardDescription>
                                    Prevalensi stunting per posyandu
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {byPosyandu.map((item, index) => (
                                        <div key={index} className="p-4 rounded-lg border">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold">{item.name}</h4>
                                                <Badge variant={item.percentage > 8 ? 'destructive' : 'secondary'}>
                                                    {item.percentage}%
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <span>Total Balita: {item.balita}</span>
                                                <span>Stunting: {item.stunting}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="intervention" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-sm text-muted-foreground">Total Intervensi</p>
                                    <p className="text-3xl font-bold">{interventionStats.total}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-sm text-muted-foreground">Berlangsung</p>
                                    <p className="text-3xl font-bold text-blue-600">{interventionStats.ongoing}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-sm text-muted-foreground">Selesai</p>
                                    <p className="text-3xl font-bold text-green-600">{interventionStats.completed}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-sm text-muted-foreground">Success Rate</p>
                                    <p className="text-3xl font-bold text-green-600">{interventionStats.success_rate}%</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Efektivitas Intervensi</CardTitle>
                                <CardDescription>
                                    Analisis keberhasilan program intervensi
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/50">
                                    <div className="text-center">
                                        <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">
                                            Chart efektivitas intervensi
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
