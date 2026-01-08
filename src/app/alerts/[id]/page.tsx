'use client';

import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    ArrowLeft,
    AlertTriangle,
    User,
    Calendar,
    Activity,
    FileText,
    CheckCircle2,
    Clock,
} from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';
import { useState } from 'react';

export default function AlertDetailPage() {
    const params = useParams();
    const router = useRouter();
    const alertId = params.id as string;
    const [status, setStatus] = useState('open');

    // Mock data
    const alert = {
        id: parseInt(alertId),
        balita: {
            id: 1,
            nama: 'Ahmad Fauzi',
            nik: '3201012015001234',
            usia: '24 bulan',
            foto: null,
        },
        alert_type: 'stunting',
        severity: 'high',
        status: 'open',
        description: 'Z-Score TB/U: -2.5 (Stunting terdeteksi)',
        measurement: {
            date: '2026-01-07',
            tinggi_badan: 78.5,
            berat_badan: 9.2,
            zscore_tb_u: -2.5,
            zscore_bb_u: -2.1,
            zscore_bb_tb: -1.8,
        },
        assigned_to: {
            id: 2,
            name: 'Dr. Sarah',
            role: 'Petugas Kesehatan',
        },
        created_at: '2026-01-07T10:30:00',
        updated_at: '2026-01-07T10:30:00',
        notes: [],
    };

    const timeline = [
        {
            id: 1,
            type: 'created',
            user: 'System',
            action: 'Alert dibuat otomatis',
            timestamp: '2026-01-07T10:30:00',
        },
        {
            id: 2,
            type: 'assigned',
            user: 'Admin User',
            action: 'Ditugaskan ke Dr. Sarah',
            timestamp: '2026-01-07T10:35:00',
        },
    ];

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        // TODO: Update status via API
    };

    return (
        <DashboardLayout
            role={ROLES.PETUGAS_KESEHATAN}
            userName="Dr. Sarah"
            userRole="Petugas Kesehatan"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/alerts">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Detail Alert</h1>
                            <p className="text-muted-foreground mt-2">
                                Alert #{alert.id} • {alert.balita.nama}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Select value={status} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="open">Terbuka</SelectItem>
                                <SelectItem value="in_progress">Dalam Proses</SelectItem>
                                <SelectItem value="resolved">Selesai</SelectItem>
                                <SelectItem value="closed">Ditutup</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Alert Info */}
                        <Card className="border-orange-200 dark:border-orange-900">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                                            <AlertTriangle className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <CardTitle>{alert.alert_type.toUpperCase()}</CardTitle>
                                            <CardDescription className="mt-1">
                                                {alert.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <StatusBadge status={alert.severity} />
                                        <StatusBadge status={alert.status} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Separator />
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Dibuat</p>
                                            <p className="font-medium">
                                                {new Date(alert.created_at).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Terakhir Update</p>
                                            <p className="font-medium">
                                                {new Date(alert.updated_at).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Measurement Data */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Pengukuran</CardTitle>
                                <CardDescription>
                                    Tanggal: {new Date(alert.measurement.date).toLocaleDateString('id-ID')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="p-4 rounded-lg border">
                                        <p className="text-sm text-muted-foreground">Tinggi Badan</p>
                                        <p className="text-2xl font-bold">{alert.measurement.tinggi_badan} cm</p>
                                    </div>
                                    <div className="p-4 rounded-lg border">
                                        <p className="text-sm text-muted-foreground">Berat Badan</p>
                                        <p className="text-2xl font-bold">{alert.measurement.berat_badan} kg</p>
                                    </div>
                                    <div className="p-4 rounded-lg border">
                                        <p className="text-sm text-muted-foreground">Z-Score TB/U</p>
                                        <p className="text-2xl font-bold text-destructive">
                                            {alert.measurement.zscore_tb_u}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs */}
                        <Tabs defaultValue="notes" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="notes">Catatan</TabsTrigger>
                                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                <TabsTrigger value="actions">Tindakan</TabsTrigger>
                            </TabsList>

                            <TabsContent value="notes">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Catatan</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Textarea
                                            placeholder="Tambahkan catatan..."
                                            rows={4}
                                        />
                                        <Button>Simpan Catatan</Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="timeline">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Timeline</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {timeline.map((item) => (
                                                <div key={item.id} className="flex gap-4">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                        <Clock className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium">{item.action}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.user} • {new Date(item.timestamp).toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="actions">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Tindakan yang Direkomendasikan</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                                            <div>
                                                <p className="font-medium">Buat Intervensi</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Rencanakan program intervensi untuk balita
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                                            <div>
                                                <p className="font-medium">Konseling Orang Tua</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Jadwalkan sesi konseling gizi
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                                            <div>
                                                <p className="font-medium">Pemantauan Intensif</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Tingkatkan frekuensi pemantauan
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Balita Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Balita</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                                        <User className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{alert.balita.nama}</p>
                                        <p className="text-sm text-muted-foreground">{alert.balita.usia}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-muted-foreground">NIK</p>
                                    <p className="font-mono text-sm">{alert.balita.nik}</p>
                                </div>
                                <Link href={`/balita/${alert.balita.id}`}>
                                    <Button variant="outline" className="w-full">
                                        Lihat Detail Balita
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Assigned To */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Ditugaskan Kepada</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="font-medium">{alert.assigned_to.name}</p>
                                    <Badge variant="outline">{alert.assigned_to.role}</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Aksi Cepat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href="/interventions/add">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Activity className="mr-2 h-4 w-4" />
                                        Buat Intervensi
                                    </Button>
                                </Link>
                                <Link href="/schedules/add">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Jadwalkan Pemeriksaan
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full justify-start">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Laporan
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
