'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

export default function EditBalitaPage() {
    const router = useRouter();
    const params = useParams();
    const balitaId = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Mock data - will be replaced with Supabase query
    const existingData = {
        nik: '3201012015001234',
        no_kk: '3201010101010101',
        nama: 'Ahmad Fauzi',
        tanggal_lahir: '2022-01-15',
        jenis_kelamin: 'L' as 'L' | 'P',
        alamat: 'Jl. Melati No. 123',
        rt_rw: '001/002',
        kelurahan: 'Sukamaju',
        kecamatan: 'Kecamatan A',
        nama_ayah: 'Budi Santoso',
        nama_ibu: 'Siti Aminah',
        nik_ayah: '3201011980001111',
        nik_ibu: '3201011985002222',
        no_telp_ortu: '081234567890',
        email_ortu: 'siti@email.com',
        posyandu_id: 1,
        status_aktif: 'aktif' as 'aktif' | 'pindah' | 'meninggal',
        keterangan: '',
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<BalitaInput>({
        resolver: zodResolver(balitaSchema),
        defaultValues: {
            ...existingData,
            status_aktif: existingData.status_aktif || 'aktif',
        },
    });

    useEffect(() => {
        // Set initial values
        setValue('jenis_kelamin', existingData.jenis_kelamin);
        setValue('status_aktif', existingData.status_aktif);
        setValue('posyandu_id', existingData.posyandu_id);
    }, [setValue]);

    const onSubmit = async (data: BalitaInput) => {
        setIsLoading(true);
        setError('');

        try {
            // TODO: Implement actual update logic with Supabase
            console.log('Update balita data:', data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Redirect to balita detail
            router.push(`/balita/${balitaId}`);
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
                    <Link href={`/balita/${balitaId}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Data Balita</h1>
                        <p className="text-muted-foreground mt-2">
                            Update informasi balita: {existingData.nama}
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
                                                defaultValue={existingData.jenis_kelamin}
                                                onValueChange={(value) => setValue('jenis_kelamin', value as 'L' | 'P')}
                                                disabled={isLoading}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="L">Laki-laki</SelectItem>
                                                    <SelectItem value="P">Perempuan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Alamat</CardTitle>
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
                                                {...register('kelurahan')}
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="kecamatan">Kecamatan</Label>
                                            <Input
                                                id="kecamatan"
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
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_ayah">Nama Ayah</Label>
                                            <Input
                                                id="nama_ayah"
                                                {...register('nama_ayah')}
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nama_ibu">Nama Ibu *</Label>
                                            <Input
                                                id="nama_ibu"
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
                                            <Label htmlFor="no_telp_ortu">Nomor Telepon *</Label>
                                            <Input
                                                id="no_telp_ortu"
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
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="status_aktif">Status</Label>
                                        <Select
                                            defaultValue={existingData.status_aktif}
                                            onValueChange={(value) => setValue('status_aktif', value as any)}
                                            disabled={isLoading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="aktif">Aktif</SelectItem>
                                                <SelectItem value="pindah">Pindah</SelectItem>
                                                <SelectItem value="meninggal">Meninggal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="posyandu_id">Posyandu</Label>
                                        <Select
                                            defaultValue={existingData.posyandu_id.toString()}
                                            onValueChange={(value) => setValue('posyandu_id', parseInt(value))}
                                            disabled={isLoading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
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
                        <Link href={`/balita/${balitaId}`}>
                            <Button type="button" variant="outline" disabled={isLoading}>
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" />
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
