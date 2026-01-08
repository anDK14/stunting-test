'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Download, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function BalitaListPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock data - will be replaced with actual data from Supabase
    const balitaData = [
        {
            id: 1,
            nik: '3201012015001234',
            nama: 'Ahmad Fauzi',
            tanggal_lahir: '2022-01-15',
            jenis_kelamin: 'L',
            nama_ibu: 'Siti Aminah',
            posyandu: 'Posyandu Melati 1',
            status_aktif: 'aktif',
            last_measurement: '2026-01-10',
            status_gizi: 'normal',
        },
        {
            id: 2,
            nik: '3201012016002345',
            nama: 'Siti Nurhaliza',
            tanggal_lahir: '2022-06-20',
            jenis_kelamin: 'P',
            nama_ibu: 'Dewi Sartika',
            posyandu: 'Posyandu Melati 2',
            status_aktif: 'aktif',
            last_measurement: '2026-01-08',
            status_gizi: 'stunting',
        },
        {
            id: 3,
            nik: '3201012017003456',
            nama: 'Budi Santoso',
            tanggal_lahir: '2021-11-10',
            jenis_kelamin: 'L',
            nama_ibu: 'Ratna Sari',
            posyandu: 'Posyandu Melati 1',
            status_aktif: 'aktif',
            last_measurement: '2026-01-05',
            status_gizi: 'normal',
        },
    ];

    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
        return `${months} bulan`;
    };

    return (
        <DashboardLayout
            role={ROLES.ADMIN}
            userName="Admin User"
            userRole="Administrator"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Data Balita</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola data balita terdaftar
                        </p>
                    </div>
                    <Link href="/balita/add">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Balita
                        </Button>
                    </Link>
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
                                        placeholder="Cari nama atau NIK..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="aktif">Aktif</SelectItem>
                                    <SelectItem value="pindah">Pindah</SelectItem>
                                    <SelectItem value="meninggal">Meninggal</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Balita</CardTitle>
                        <CardDescription>
                            Total {balitaData.length} balita terdaftar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>NIK</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Usia</TableHead>
                                        <TableHead>Jenis Kelamin</TableHead>
                                        <TableHead>Nama Ibu</TableHead>
                                        <TableHead>Posyandu</TableHead>
                                        <TableHead>Status Gizi</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {balitaData.map((balita) => (
                                        <TableRow key={balita.id}>
                                            <TableCell className="font-mono text-sm">
                                                {balita.nik}
                                            </TableCell>
                                            <TableCell className="font-medium">{balita.nama}</TableCell>
                                            <TableCell>{calculateAge(balita.tanggal_lahir)}</TableCell>
                                            <TableCell>{balita.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</TableCell>
                                            <TableCell>{balita.nama_ibu}</TableCell>
                                            <TableCell>{balita.posyandu}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={balita.status_gizi} />
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={balita.status_aktif} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/balita/${balita.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/balita/${balita.id}/edit`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="sm">
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
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
