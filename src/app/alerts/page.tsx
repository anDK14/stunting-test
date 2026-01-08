'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Search, Filter, Eye, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function AlertsPage() {
    const [statusFilter, setStatusFilter] = useState('all');
    const [severityFilter, setSeverityFilter] = useState('all');

    // Mock data - will be replaced with Supabase query
    const alerts = [
        {
            id: 1,
            balita: {
                id: 1,
                nama: 'Ahmad Fauzi',
                nik: '3201012015001234',
                usia: '24 bulan',
            },
            alert_type: 'stunting',
            severity: 'high',
            status: 'open',
            description: 'Z-Score TB/U: -2.5 (Stunting terdeteksi)',
            assigned_to: 'Dr. Sarah',
            created_at: '2026-01-07T10:30:00',
            measurement_date: '2026-01-07',
        },
        {
            id: 2,
            balita: {
                id: 2,
                nama: 'Siti Nurhaliza',
                nik: '3201012016002345',
                usia: '18 bulan',
            },
            alert_type: 'risiko_stunting',
            severity: 'medium',
            status: 'in_progress',
            description: 'Z-Score TB/U: -1.8 (Risiko stunting)',
            assigned_to: 'Dr. Sarah',
            created_at: '2026-01-06T14:20:00',
            measurement_date: '2026-01-06',
        },
        {
            id: 3,
            balita: {
                id: 3,
                nama: 'Budi Santoso',
                nik: '3201012017003456',
                usia: '30 bulan',
            },
            alert_type: 'berat_turun',
            severity: 'low',
            status: 'resolved',
            description: 'Penurunan berat badan 0.5 kg dalam 1 bulan',
            assigned_to: 'Dr. Sarah',
            created_at: '2026-01-05T09:15:00',
            measurement_date: '2026-01-05',
            resolved_at: '2026-01-06T16:00:00',
        },
    ];

    const stats = {
        total: alerts.length,
        open: alerts.filter(a => a.status === 'open').length,
        in_progress: alerts.filter(a => a.status === 'in_progress').length,
        resolved: alerts.filter(a => a.status === 'resolved').length,
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays} hari yang lalu`;
        if (diffHours > 0) return `${diffHours} jam yang lalu`;
        return 'Baru saja';
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <DashboardLayout
            role={ROLES.PETUGAS_KESEHATAN}
            userName="Dr. Sarah"
            userRole="Petugas Kesehatan"
        >
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Alert & Deteksi</h1>
                    <p className="text-muted-foreground mt-2">
                        Kelola kasus yang memerlukan tindak lanjut
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Alert</p>
                                    <p className="text-3xl font-bold">{stats.total}</p>
                                </div>
                                <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-red-200 dark:border-red-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Terbuka</p>
                                    <p className="text-3xl font-bold text-red-600">{stats.open}</p>
                                </div>
                                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-yellow-200 dark:border-yellow-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Dalam Proses</p>
                                    <p className="text-3xl font-bold text-yellow-600">{stats.in_progress}</p>
                                </div>
                                <Clock className="h-8 w-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-green-200 dark:border-green-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Selesai</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
                                </div>
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter & Pencarian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Cari nama balita atau NIK..."
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="open">Terbuka</SelectItem>
                                    <SelectItem value="in_progress">Dalam Proses</SelectItem>
                                    <SelectItem value="resolved">Selesai</SelectItem>
                                    <SelectItem value="closed">Ditutup</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Severity</SelectItem>
                                    <SelectItem value="critical">Kritis</SelectItem>
                                    <SelectItem value="high">Tinggi</SelectItem>
                                    <SelectItem value="medium">Sedang</SelectItem>
                                    <SelectItem value="low">Rendah</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Alerts List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Alert</CardTitle>
                        <CardDescription>
                            {alerts.length} alert ditemukan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {alerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                                >
                                    <div className={`h-12 w-1 rounded-full ${getSeverityColor(alert.severity)}`} />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold">{alert.balita.nama}</h3>
                                                    <Badge variant="outline" className="text-xs">
                                                        {alert.alert_type.replace('_', ' ').toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    NIK: {alert.balita.nik} • {alert.balita.usia}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <StatusBadge status={alert.severity} />
                                                <StatusBadge status={alert.status} />
                                            </div>
                                        </div>
                                        <p className="text-sm">{alert.description}</p>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <div className="flex items-center gap-4">
                                                <span>Ditugaskan ke: {alert.assigned_to}</span>
                                                <span>•</span>
                                                <span>{getTimeAgo(alert.created_at)}</span>
                                            </div>
                                            <Link href={`/alerts/${alert.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
