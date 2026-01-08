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
import { Heart, Search, Plus, Eye, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function InterventionsPage() {
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    // Mock data
    const interventions = [
        {
            id: 1,
            balita: {
                id: 1,
                nama: 'Ahmad Fauzi',
                nik: '3201012015001234',
            },
            type: 'Pemberian PMT',
            description: 'Pemberian makanan tambahan bergizi tinggi protein',
            status: 'ongoing',
            start_date: '2026-01-01',
            target_date: '2026-03-01',
            assigned_to: 'Dr. Sarah',
            progress: 45,
        },
        {
            id: 2,
            balita: {
                id: 2,
                nama: 'Siti Nurhaliza',
                nik: '3201012016002345',
            },
            type: 'Konseling Gizi',
            description: 'Konseling gizi untuk orang tua tentang MPASI',
            status: 'planned',
            start_date: '2026-01-15',
            target_date: '2026-02-15',
            assigned_to: 'Dr. Sarah',
            progress: 0,
        },
        {
            id: 3,
            balita: {
                id: 3,
                nama: 'Budi Santoso',
                nik: '3201012017003456',
            },
            type: 'Pemantauan Intensif',
            description: 'Pemantauan pertumbuhan setiap minggu',
            status: 'completed',
            start_date: '2025-12-01',
            target_date: '2026-01-01',
            completed_date: '2026-01-05',
            assigned_to: 'Dr. Sarah',
            progress: 100,
        },
    ];

    const stats = {
        total: interventions.length,
        planned: interventions.filter(i => i.status === 'planned').length,
        ongoing: interventions.filter(i => i.status === 'ongoing').length,
        completed: interventions.filter(i => i.status === 'completed').length,
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
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Intervensi</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola program intervensi untuk balita
                        </p>
                    </div>
                    <Link href="/interventions/add">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Buat Intervensi
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Intervensi</p>
                                    <p className="text-3xl font-bold">{stats.total}</p>
                                </div>
                                <Heart className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-blue-200 dark:border-blue-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Direncanakan</p>
                                    <p className="text-3xl font-bold text-blue-600">{stats.planned}</p>
                                </div>
                                <Clock className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-yellow-200 dark:border-yellow-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Berlangsung</p>
                                    <p className="text-3xl font-bold text-yellow-600">{stats.ongoing}</p>
                                </div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-green-200 dark:border-green-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Selesai</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
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
                                        placeholder="Cari nama balita..."
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
                                    <SelectItem value="planned">Direncanakan</SelectItem>
                                    <SelectItem value="ongoing">Berlangsung</SelectItem>
                                    <SelectItem value="completed">Selesai</SelectItem>
                                    <SelectItem value="cancelled">Dibatalkan</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Tipe</SelectItem>
                                    <SelectItem value="pmt">Pemberian PMT</SelectItem>
                                    <SelectItem value="konseling">Konseling Gizi</SelectItem>
                                    <SelectItem value="pemantauan">Pemantauan Intensif</SelectItem>
                                    <SelectItem value="rujukan">Rujukan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Interventions Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Intervensi</CardTitle>
                        <CardDescription>
                            {interventions.length} intervensi ditemukan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Balita</TableHead>
                                        <TableHead>Tipe Intervensi</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead>Mulai</TableHead>
                                        <TableHead>Target</TableHead>
                                        <TableHead>Progress</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Petugas</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {interventions.map((intervention) => (
                                        <TableRow key={intervention.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{intervention.balita.nama}</p>
                                                    <p className="text-xs text-muted-foreground font-mono">
                                                        {intervention.balita.nik}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{intervention.type}</Badge>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {intervention.description}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(intervention.start_date).toLocaleDateString('id-ID')}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(intervention.target_date).toLocaleDateString('id-ID')}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary transition-all"
                                                            style={{ width: `${intervention.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm">{intervention.progress}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={intervention.status} />
                                            </TableCell>
                                            <TableCell>{intervention.assigned_to}</TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/interventions/${intervention.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
