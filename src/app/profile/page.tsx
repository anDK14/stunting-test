'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Save, Upload } from 'lucide-react';
import { ROLES } from '@/lib/constants';

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false);

    // Mock user data
    const user = {
        id: 2,
        name: 'Dr. Sarah',
        email: 'sarah@example.com',
        phone: '081234567891',
        role: 'petugas_kesehatan',
        nip: '198501012010012001',
        address: 'Jl. Kesehatan No. 45, Jakarta',
        kelurahan: 'Sukamaju',
        kecamatan: 'Kecamatan A',
        joined_date: '2025-01-05',
        posyandu: null,
        bio: 'Petugas kesehatan dengan pengalaman 10 tahun di bidang gizi dan kesehatan anak.',
    };

    const stats = {
        balita_handled: 45,
        interventions: 12,
        schedules: 8,
        alerts_resolved: 23,
    };

    const handleSave = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return (
        <DashboardLayout
            role={ROLES.PETUGAS_KESEHATAN}
            userName="Dr. Sarah"
            userRole="Petugas Kesehatan"
        >
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profil Saya</h1>
                    <p className="text-muted-foreground mt-2">
                        Kelola informasi profil Anda
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <Avatar className="h-32 w-32">
                                        <AvatarImage src="" />
                                        <AvatarFallback className="text-4xl">DS</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xl font-bold">{user.name}</h3>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                    <Badge className="text-sm">
                                        {user.role === 'petugas_kesehatan' ? 'Petugas Kesehatan' : user.role}
                                    </Badge>
                                    <Button variant="outline" className="w-full">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Foto
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Balita Ditangani</span>
                                    <span className="font-bold">{stats.balita_handled}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Intervensi Aktif</span>
                                    <span className="font-bold">{stats.interventions}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Jadwal Bulan Ini</span>
                                    <span className="font-bold">{stats.schedules}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Alert Diselesaikan</span>
                                    <span className="font-bold">{stats.alerts_resolved}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Akun</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Bergabung</p>
                                        <p className="font-medium">
                                            {new Date(user.joined_date).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Pribadi</CardTitle>
                                <CardDescription>
                                    Update informasi pribadi Anda
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Lengkap</Label>
                                        <Input id="name" defaultValue={user.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nip">NIP</Label>
                                        <Input id="nip" defaultValue={user.nip} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        defaultValue={user.bio}
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Kontak</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                defaultValue={user.email}
                                                className="pl-8"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Nomor Telepon</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                defaultValue={user.phone}
                                                className="pl-8"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Address */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Alamat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Alamat Lengkap</Label>
                                    <Textarea
                                        id="address"
                                        defaultValue={user.address}
                                        rows={2}
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="kelurahan">Kelurahan</Label>
                                        <Input id="kelurahan" defaultValue={user.kelurahan} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="kecamatan">Kecamatan</Label>
                                        <Input id="kecamatan" defaultValue={user.kecamatan} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Work Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Pekerjaan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        id="role"
                                        defaultValue="Petugas Kesehatan"
                                        disabled
                                    />
                                </div>

                                {user.posyandu && (
                                    <div className="space-y-2">
                                        <Label htmlFor="posyandu">Posyandu</Label>
                                        <Input id="posyandu" defaultValue={user.posyandu} disabled />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4">
                            <Button variant="outline">Batal</Button>
                            <Button onClick={handleSave} disabled={isLoading}>
                                <Save className="mr-2 h-4 w-4" />
                                Simpan Perubahan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
