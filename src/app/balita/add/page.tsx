'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { balitaSchema, type BalitaInput } from '@/lib/validations/balita';
import { ROLES } from '@/lib/constants';
import { Loader2, AlertCircle, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddBalitaPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<BalitaInput>({
        resolver: zodResolver(balitaSchema),
        defaultValues: {
            status_aktif: 'aktif',
        },
    });

    const onSubmit = async (data: BalitaInput) => {
        setIsLoading(true);
        setError('');

        try {
            // TODO: Implement actual save logic with Supabase
            console.log('Balita data:', data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Redirect to balita list
            router.push('/balita/list');
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout
            role={ROLES.ADMIN}
            userName="Admin User"
            userRole="Administrator"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/balita/list">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tambah Balita Baru</h1>
                        <p className="text-muted-foreground mt-2">
                            Lengkapi form di bawah untuk mendaftarkan balita baru
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Tabs defaultValue="personal" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="personal">Data Balita</TabsTrigger>
                            <TabsTrigger value="parent">Data Orang Tua</TabsTrigger>
                            <TabsTrigger value="additional">Data Tambahan</TabsTrigger>
                        </TabsList>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Tab 1: Data Balita */}
                        <TabsContent value="personal" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Pribadi Balita</CardTitle>
                                    <CardDescription>Data identitas balita</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nik">NIK Balita *</Label>
                                            <Input
                                                id="nik"
                                                placeholder="16 digit NIK"
                                                maxLength={16}
                                                {...register('nik')}
                                                disabled={isLoading}
                                            />
                                            {errors.nik && (
                                                <p className="text-sm text-destructive">{errors.nik.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="no_kk">No. Kartu Keluarga</Label>
                                            <Input
                                                id="no_kk"
                                                placeholder="16 digit No. KK"
                                                maxLength={16}
                                                {...register('no_kk')}
                                                disabled={isLoading}
                                            />
                                            {errors.no_kk && (
                                                <p className="text-sm text-destructive">{errors.no_kk.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="nama">Nama Lengkap Balita *</Label>
                                        <Input
                                            id="nama"
                                            placeholder="Nama lengkap balita"
                                            {...register('nama')}
                                            disabled={isLoading}
                                        />
                                        {errors.nama && (
                                            <p className="text-sm text-destructive">{errors.nama.message}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                                            <Input
                                                id="tanggal_lahir"
                                                type="date"
                                                {...register('tanggal_lahir')}
                                                disabled={isLoading}
                                            />
                                            {errors.tanggal_lahir && (
                                                <p className="text-sm text-destructive">{errors.tanggal_lahir.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="jenis_kelamin">Jenis Kelamin *</Label>
                                            <Select
                                                onValueChange={(value) => setValue('jenis_kelamin', value as 'L' | 'P')}
                                                disabled={isLoading}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="L">Laki-laki</SelectItem>
                                                    <SelectItem value="P">Perempuan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.jenis_kelamin && (
                                                <p className="text-sm text-destructive">{errors.jenis_kelamin.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Alamat</CardTitle>
                                    <CardDescription>Alamat tempat tinggal balita</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="alamat">Alamat Lengkap</Label>
                                        <Textarea
                                            id="alamat"
                                            placeholder="Jalan, nomor rumah, dll"
                                            {...register('alamat')}
                                            disabled={isLoading}
                                        />
                                        {errors.alamat && (
                                            <p className="text-sm text-destructive">{errors.alamat.message}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="rt_rw">RT/RW</Label>
                                            <Input
                                                id="rt_rw"
                                                placeholder="001/002"
                                                {...register('rt_rw')}
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="kelurahan">Kelurahan</Label>
                                            <Input
                                                id="kelurahan"
                                                placeholder="Nama kelurahan"
                                                {...register('kelurahan')}
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="kecamatan">Kecamatan</Label>
                                            <Input
                                                id="kecamatan"
                                                placeholder="Nama kecamatan"
                                                {...register('kecamatan')}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Tab 2: Data Orang Tua */}
                        <TabsContent value="parent" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Orang Tua</CardTitle>
                                    <CardDescription>Informasi orang tua/wali balita</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_ayah">Nama Ayah</Label>
                                            <Input
                                                id="nama_ayah"
                                                placeholder="Nama lengkap ayah"
                                                {...register('nama_ayah')}
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nama_ibu">Nama Ibu *</Label>
                                            <Input
                                                id="nama_ibu"
                                                placeholder="Nama lengkap ibu"
                                                {...register('nama_ibu')}
                                                disabled={isLoading}
                                            />
                                            {errors.nama_ibu && (
                                                <p className="text-sm text-destructive">{errors.nama_ibu.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nik_ayah">NIK Ayah</Label>
                                            <Input
                                                id="nik_ayah"
                                                placeholder="16 digit NIK"
                                                maxLength={16}
                                                {...register('nik_ayah')}
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nik_ibu">NIK Ibu</Label>
                                            <Input
                                                id="nik_ibu"
                                                placeholder="16 digit NIK"
                                                maxLength={16}
                                                {...register('nik_ibu')}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="no_telp_ortu">Nomor Telepon *</Label>
                                            <Input
                                                id="no_telp_ortu"
                                                placeholder="08123456789"
                                                {...register('no_telp_ortu')}
                                                disabled={isLoading}
                                            />
                                            {errors.no_telp_ortu && (
                                                <p className="text-sm text-destructive">{errors.no_telp_ortu.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email_ortu">Email</Label>
                                            <Input
                                                id="email_ortu"
                                                type="email"
                                                placeholder="email@example.com"
                                                {...register('email_ortu')}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Tab 3: Data Tambahan */}
                        <TabsContent value="additional" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Tambahan</CardTitle>
                                    <CardDescription>Data posyandu dan keterangan lainnya</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="posyandu_id">Posyandu</Label>
                                        <Select
                                            onValueChange={(value) => setValue('posyandu_id', parseInt(value))}
                                            disabled={isLoading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih posyandu" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Posyandu Melati 1</SelectItem>
                                                <SelectItem value="2">Posyandu Melati 2</SelectItem>
                                                <SelectItem value="3">Posyandu Mawar 1</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="keterangan">Keterangan</Label>
                                        <Textarea
                                            id="keterangan"
                                            placeholder="Catatan tambahan (opsional)"
                                            {...register('keterangan')}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4">
                        <Link href="/balita/list">
                            <Button type="button" variant="outline" disabled={isLoading}>
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" />
                            Simpan Data
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
