'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    Heart,
    User,
    Calendar,
    MapPin,
    FileText,
    CheckCircle2,
    Clock,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function InterventionDetailPage() {
    const params = useParams();
    const interventionId = params.id as string;
    const [newNote, setNewNote] = useState('');

    // Mock data
    const intervention = {
        id: parseInt(interventionId),
        balita: {
            id: 1,
            nama: 'Ahmad Fauzi',
            nik: '3201012015001234',
            usia: '24 bulan',
        },
        type: 'Pemberian PMT',
        title: 'Program PMT Pemulihan Gizi',
        description: 'Pemberian makanan tambahan bergizi tinggi protein untuk pemulihan status gizi',
        status: 'ongoing',
        start_date: '2026-01-01',
        target_date: '2026-03-01',
        frequency: '3x seminggu',
        location: 'Posyandu Melati 1',
        assigned_to: {
            id: 2,
            name: 'Dr. Sarah',
            role: 'Petugas Kesehatan',
        },
        progress: 45,
        target_outcome: 'Meningkatkan Z-Score TB/U minimal 0.5 poin dalam 2 bulan',
        created_at: '2025-12-28T10:00:00',
        updated_at: '2026-01-07T14:30:00',
    };

    const progressHistory = [
        {
            id: 1,
            date: '2026-01-07',
            progress: 45,
            notes: 'PMT diberikan sesuai jadwal. Balita menunjukkan peningkatan nafsu makan.',
            updated_by: 'Dr. Sarah',
        },
        {
            id: 2,
            date: '2026-01-04',
            progress: 30,
            notes: 'Minggu pertama berjalan lancar. Orang tua kooperatif.',
            updated_by: 'Dr. Sarah',
        },
        {
            id: 3,
            date: '2026-01-01',
            progress: 0,
            notes: 'Program dimulai. Edukasi diberikan kepada orang tua.',
            updated_by: 'Dr. Sarah',
        },
    ];

    const measurements = [
        {
            date: '2026-01-07',
            tinggi_badan: 79.2,
            berat_badan: 9.5,
            zscore_tb_u: -2.3,
            status: 'Perbaikan',
        },
        {
            date: '2026-01-01',
            tinggi_badan: 78.5,
            berat_badan: 9.2,
            zscore_tb_u: -2.5,
            status: 'Baseline',
        },
    ];

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
                        <Link href="/interventions">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Detail Intervensi</h1>
                            <p className="text-muted-foreground mt-2">
                                {intervention.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Edit</Button>
                        <Button>Update Progress</Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Intervention Info */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Heart className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle>{intervention.title}</CardTitle>
                                            <CardDescription className="mt-1">
                                                {intervention.type}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <StatusBadge status={intervention.status} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">{intervention.description}</p>

                                <Separator />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Tanggal Mulai</p>
                                        <p className="font-medium">
                                            {new Date(intervention.start_date).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Target Selesai</p>
                                        <p className="font-medium">
                                            {new Date(intervention.target_date).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Frekuensi</p>
                                        <p className="font-medium">{intervention.frequency}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Lokasi</p>
                                        <p className="font-medium">{intervention.location}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">Target Hasil</p>
                                    <p className="text-sm">{intervention.target_outcome}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Progress Intervensi</CardTitle>
                                <CardDescription>
                                    {intervention.progress}% selesai
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Progress</span>
                                        <span className="font-medium">{intervention.progress}%</span>
                                    </div>
                                    <Progress value={intervention.progress} className="h-3" />
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="font-semibold">Riwayat Progress</h4>
                                    {progressHistory.map((item) => (
                                        <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                                                <TrendingUp className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium">{item.progress}% Complete</p>
                                                    <Badge variant="outline">
                                                        {new Date(item.date).toLocaleDateString('id-ID')}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{item.notes}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Oleh: {item.updated_by}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Measurements */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Pengukuran</CardTitle>
                                <CardDescription>Perkembangan antropometri selama intervensi</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {measurements.map((m, index) => (
                                        <div key={index} className="p-4 rounded-lg border">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="font-semibold">
                                                    {new Date(m.date).toLocaleDateString('id-ID')}
                                                </p>
                                                <Badge>{m.status}</Badge>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">TB</p>
                                                    <p className="text-lg font-bold">{m.tinggi_badan} cm</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">BB</p>
                                                    <p className="text-lg font-bold">{m.berat_badan} kg</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Z-Score TB/U</p>
                                                    <p className="text-lg font-bold">{m.zscore_tb_u}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notes */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Catatan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea
                                    placeholder="Tambahkan catatan baru..."
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    rows={4}
                                />
                                <Button>Simpan Catatan</Button>
                            </CardContent>
                        </Card>
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
                                        <p className="font-semibold">{intervention.balita.nama}</p>
                                        <p className="text-sm text-muted-foreground">{intervention.balita.usia}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-muted-foreground">NIK</p>
                                    <p className="font-mono text-sm">{intervention.balita.nik}</p>
                                </div>
                                <Link href={`/balita/${intervention.balita.id}`}>
                                    <Button variant="outline" className="w-full">
                                        Lihat Detail Balita
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Assigned To */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Penanggung Jawab</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="font-medium">{intervention.assigned_to.name}</p>
                                    <Badge variant="outline">{intervention.assigned_to.role}</Badge>
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
                                            {new Date(intervention.created_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Terakhir Update</p>
                                        <p className="font-medium">
                                            {new Date(intervention.updated_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
