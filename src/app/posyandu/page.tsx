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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { MapPin, Search, Plus, Edit, Users, Activity } from 'lucide-react';
import { ROLES } from '@/lib/constants';

export default function PosyanduPage() {
    // Mock data
    const posyandu = [
        {
            id: 1,
            name: 'Posyandu Melati 1',
            address: 'Jl. Melati No. 123, RT 001/RW 002',
            kelurahan: 'Sukamaju',
            kecamatan: 'Kecamatan A',
            kader_count: 3,
            balita_count: 45,
            status: 'active',
            last_activity: '2026-01-07',
        },
        {
            id: 2,
            name: 'Posyandu Melati 2',
            address: 'Jl. Melati No. 456, RT 003/RW 004',
            kelurahan: 'Sukamaju',
            kecamatan: 'Kecamatan A',
            kader_count: 2,
            balita_count: 38,
            status: 'active',
            last_activity: '2026-01-06',
        },
        {
            id: 3,
            name: 'Posyandu Mawar 1',
            address: 'Jl. Mawar No. 789, RT 005/RW 006',
            kelurahan: 'Sukamulya',
            kecamatan: 'Kecamatan B',
            kader_count: 4,
            balita_count: 52,
            status: 'active',
            last_activity: '2026-01-05',
        },
    ];

    const stats = {
        total: posyandu.length,
        active: posyandu.filter(p => p.status === 'active').length,
        totalKader: posyandu.reduce((sum, p) => sum + p.kader_count, 0),
        totalBalita: posyandu.reduce((sum, p) => sum + p.balita_count, 0),
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
                        <h1 className="text-3xl font-bold tracking-tight">Manajemen Posyandu</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola data posyandu di wilayah Anda
                        </p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Posyandu
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Posyandu Baru</DialogTitle>
                                <DialogDescription>
                                    Form untuk menambah posyandu baru akan ditampilkan di sini
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Posyandu</p>
                                    <p className="text-3xl font-bold">{stats.total}</p>
                                </div>
                                <MapPin className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-green-200 dark:border-green-900">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Aktif</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                                </div>
                                <Activity className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Kader</p>
                                    <p className="text-3xl font-bold">{stats.totalKader}</p>
                                </div>
                                <Users className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Balita</p>
                                    <p className="text-3xl font-bold">{stats.totalBalita}</p>
                                </div>
                                <Users className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pencarian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama posyandu atau lokasi..."
                                className="pl-8"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Posyandu List */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posyandu.map((item) => (
                        <Card key={item.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{item.name}</CardTitle>
                                            <CardDescription className="mt-1">
                                                {item.kelurahan}, {item.kecamatan}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <StatusBadge status={item.status} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Alamat</p>
                                    <p className="text-sm">{item.address}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Kader</p>
                                        <p className="text-2xl font-bold">{item.kader_count}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Balita</p>
                                        <p className="text-2xl font-bold">{item.balita_count}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Aktivitas terakhir: {new Date(item.last_activity).toLocaleDateString('id-ID')}
                                    </p>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button size="sm" className="flex-1">
                                        Detail
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Table View Alternative */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Posyandu (Tabel)</CardTitle>
                        <CardDescription>
                            {posyandu.length} posyandu terdaftar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Posyandu</TableHead>
                                        <TableHead>Lokasi</TableHead>
                                        <TableHead>Kader</TableHead>
                                        <TableHead>Balita</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Aktivitas Terakhir</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {posyandu.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="text-sm">{item.kelurahan}</p>
                                                    <p className="text-xs text-muted-foreground">{item.kecamatan}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>{item.kader_count}</TableCell>
                                            <TableCell>{item.balita_count}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={item.status} />
                                            </TableCell>
                                            <TableCell>
                                                {new Date(item.last_activity).toLocaleDateString('id-ID')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
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
