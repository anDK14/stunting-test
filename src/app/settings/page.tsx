'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Lock, Shield, Save } from 'lucide-react';
import { ROLES } from '@/lib/constants';

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return (
        <DashboardLayout
            role={ROLES.ADMIN}
            userName="Admin User"
            userRole="Administrator"
        >
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
                    <p className="text-muted-foreground mt-2">
                        Kelola profil dan preferensi akun Anda
                    </p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="profile">
                            <User className="mr-2 h-4 w-4" />
                            Profil
                        </TabsTrigger>
                        <TabsTrigger value="notifications">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifikasi
                        </TabsTrigger>
                        <TabsTrigger value="security">
                            <Lock className="mr-2 h-4 w-4" />
                            Keamanan
                        </TabsTrigger>
                        <TabsTrigger value="privacy">
                            <Shield className="mr-2 h-4 w-4" />
                            Privasi
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Profil</CardTitle>
                                <CardDescription>
                                    Update informasi profil Anda
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="" />
                                        <AvatarFallback className="text-2xl">AU</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <Button variant="outline">Upload Foto</Button>
                                        <p className="text-sm text-muted-foreground">
                                            JPG, PNG atau GIF. Maksimal 2MB.
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Lengkap</Label>
                                        <Input id="name" defaultValue="Admin User" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue="admin@example.com" />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Nomor Telepon</Label>
                                        <Input id="phone" defaultValue="081234567890" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Input id="role" defaultValue="Administrator" disabled />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Ceritakan tentang diri Anda..."
                                        rows={4}
                                    />
                                </div>

                                <Button onClick={handleSave} disabled={isLoading}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Simpan Perubahan
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preferensi Notifikasi</CardTitle>
                                <CardDescription>
                                    Atur bagaimana Anda ingin menerima notifikasi
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Email Notifikasi</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Terima notifikasi melalui email
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>WhatsApp Notifikasi</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Terima notifikasi melalui WhatsApp
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Alert Stunting</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Notifikasi saat terdeteksi kasus stunting baru
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Reminder Jadwal</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Pengingat untuk jadwal pemeriksaan
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Laporan Bulanan</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Terima laporan bulanan otomatis
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>

                                <Button onClick={handleSave} disabled={isLoading}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Simpan Preferensi
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ubah Password</CardTitle>
                                <CardDescription>
                                    Update password Anda secara berkala untuk keamanan
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Password Saat Ini</Label>
                                    <Input id="current-password" type="password" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-password">Password Baru</Label>
                                    <Input id="new-password" type="password" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>

                                <Button onClick={handleSave} disabled={isLoading}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Update Password
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sesi Aktif</CardTitle>
                                <CardDescription>
                                    Kelola perangkat yang terhubung dengan akun Anda
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Windows PC - Chrome</p>
                                            <p className="text-sm text-muted-foreground">
                                                Jakarta, Indonesia • Aktif sekarang
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Privacy Tab */}
                    <TabsContent value="privacy" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pengaturan Privasi</CardTitle>
                                <CardDescription>
                                    Kontrol siapa yang dapat melihat informasi Anda
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Profil Publik</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Tampilkan profil Anda di direktori
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Tampilkan Email</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Email dapat dilihat oleh pengguna lain
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Tampilkan Nomor Telepon</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Nomor telepon dapat dilihat oleh pengguna lain
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>

                                <Button onClick={handleSave} disabled={isLoading}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Simpan Pengaturan
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
