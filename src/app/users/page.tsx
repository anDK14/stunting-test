'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Users, Search, Plus, Edit, Trash2, UserPlus } from 'lucide-react';
import { ROLES } from '@/lib/constants';

export default function UsersPage() {
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock data
    const users = [
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com',
            phone: '081234567890',
            role: 'admin',
            status: 'active',
            posyandu: null,
            created_at: '2025-01-01',
        },
        {
            id: 2,
            name: 'Dr. Sarah',
            email: 'sarah@example.com',
            phone: '081234567891',
            role: 'petugas_kesehatan',
            status: 'active',
            posyandu: null,
            created_at: '2025-01-05',
        },
        {
            id: 3,
            name: 'Ibu Ani',
            email: 'ani@example.com',
            phone: '081234567892',
            role: 'kader_posyandu',
            status: 'active',
            posyandu: 'Posyandu Melati 1',
            created_at: '2025-01-10',
        },
        {
            id: 4,
            name: 'Bapak Ahmad',
            email: 'ahmad@example.com',
            phone: '081234567893',
            role: 'orang_tua',
            status: 'active',
            posyandu: null,
            created_at: '2025-01-15',
        },
        {
            id: 5,
            name: 'Dr. Budi',
            email: 'budi@example.com',
            phone: '081234567894',
            role: 'kepala_puskesmas',
            status: 'active',
            posyandu: null,
            created_at: '2025-01-01',
        },
    ];

    const stats = {
        total: users.length,
        active: users.filter(u => u.status === 'active').length,
        inactive: users.filter(u => u.status === 'inactive').length,
        byRole: {
            admin: users.filter(u => u.role === 'admin').length,
            petugas: users.filter(u => u.role === 'petugas_kesehatan').length,
            kader: users.filter(u => u.role === 'kader_posyandu').length,
            ortu: users.filter(u => u.role === 'orang_tua').length,
            kepala: users.filter(u => u.role === 'kepala_puskesmas').length,
        },
    };

    const getRoleLabel = (role: string) => {
        const labels: { [key: string]: string } = {
            admin: 'Administrator',
            petugas_kesehatan: 'Petugas Kesehatan',
            kader_posyandu: 'Kader Posyandu',
            orang_tua: 'Orang Tua',
            kepala_puskesmas: 'Kepala Puskesmas',
        };
        return labels[role] || role;
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
                        <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola akun pengguna sistem
                        </p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Tambah Pengguna
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                                <DialogDescription>
                                    Form untuk menambah pengguna baru akan ditampilkan di sini
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Total Pengguna</p>
                                <p className="text-3xl font-bold mt-2">{stats.total}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Admin</p>
                                <p className="text-3xl font-bold mt-2">{stats.byRole.admin}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Petugas</p>
                                <p className="text-3xl font-bold mt-2">{stats.byRole.petugas}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Kader</p>
                                <p className="text-3xl font-bold mt-2">{stats.byRole.kader}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Orang Tua</p>
                                <p className="text-3xl font-bold mt-2">{stats.byRole.ortu}</p>
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
                                        placeholder="Cari nama atau email..."
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Role</SelectItem>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                    <SelectItem value="petugas_kesehatan">Petugas Kesehatan</SelectItem>
                                    <SelectItem value="kader_posyandu">Kader Posyandu</SelectItem>
                                    <SelectItem value="orang_tua">Orang Tua</SelectItem>
                                    <SelectItem value="kepala_puskesmas">Kepala Puskesmas</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                                    <SelectItem value="suspended">Ditangguhkan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pengguna</CardTitle>
                        <CardDescription>
                            {users.length} pengguna terdaftar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pengguna</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Telepon</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Posyandu</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Terdaftar</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src="" />
                                                        <AvatarFallback>
                                                            {user.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{user.name}</p>
                                                        <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {user.posyandu || '-'}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={user.status} />
                                            </TableCell>
                                            <TableCell>
                                                {new Date(user.created_at).toLocaleDateString('id-ID')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
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
