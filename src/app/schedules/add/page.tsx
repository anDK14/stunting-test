'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ROLES } from '@/lib/constants';
import { Loader2, AlertCircle, ArrowLeft, Save, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function CreateSchedulePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [attendees, setAttendees] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError('');

        try {
            console.log('Schedule data:', { ...data, attendees });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            router.push('/schedules');
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const addAttendee = () => {
        setAttendees([...attendees, '']);
    };

    const removeAttendee = (index: number) => {
        setAttendees(attendees.filter((_, i) => i !== index));
    };

    return (
        <DashboardLayout
            role={ROLES.KADER_POSYANDU}
            userName="Ibu Ani"
            userRole="Kader Posyandu"
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/schedules">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Buat Jadwal Baru</h1>
                        <p className="text-muted-foreground mt-2">
                            Jadwalkan kegiatan posyandu atau pemeriksaan
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Jadwal</CardTitle>
                            <CardDescription>Detail kegiatan yang akan dijadwalkan</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Tipe Kegiatan *</Label>
                                <Select
                                    onValueChange={(value) => setValue('type', value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe kegiatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="posyandu">Posyandu Rutin</SelectItem>
                                        <SelectItem value="imunisasi">Imunisasi</SelectItem>
                                        <SelectItem value="pemeriksaan">Pemeriksaan Balita</SelectItem>
                                        <SelectItem value="konseling">Konseling Gizi</SelectItem>
                                        <SelectItem value="penyuluhan">Penyuluhan Kesehatan</SelectItem>
                                        <SelectItem value="follow_up">Follow Up</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Judul Kegiatan *</Label>
                                <Input
                                    id="title"
                                    placeholder="Contoh: Posyandu Rutin Januari 2026"
                                    {...register('title', { required: true })}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Jelaskan detail kegiatan..."
                                    rows={3}
                                    {...register('description')}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Tanggal *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        {...register('date', { required: true })}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="time">Waktu *</Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        {...register('time', { required: true })}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="duration">Durasi (menit)</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    placeholder="120"
                                    {...register('duration')}
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Lokasi & Penanggung Jawab</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Lokasi *</Label>
                                <Select
                                    onValueChange={(value) => setValue('location', value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih lokasi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="posyandu_1">Posyandu Melati 1</SelectItem>
                                        <SelectItem value="posyandu_2">Posyandu Melati 2</SelectItem>
                                        <SelectItem value="posyandu_3">Posyandu Mawar 1</SelectItem>
                                        <SelectItem value="puskesmas">Puskesmas</SelectItem>
                                        <SelectItem value="other">Lokasi Lain</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Alamat Lengkap</Label>
                                <Textarea
                                    id="address"
                                    placeholder="Alamat detail lokasi kegiatan..."
                                    rows={2}
                                    {...register('address')}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="organizer">Penyelenggara *</Label>
                                <Select
                                    onValueChange={(value) => setValue('organizer', value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih penyelenggara" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="3">Ibu Ani - Kader Posyandu</SelectItem>
                                        <SelectItem value="2">Dr. Sarah - Petugas Kesehatan</SelectItem>
                                        <SelectItem value="4">Bidan Ani</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Peserta</CardTitle>
                            <CardDescription>Estimasi jumlah peserta yang akan hadir</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="expected_attendees">Estimasi Jumlah Peserta</Label>
                                <Input
                                    id="expected_attendees"
                                    type="number"
                                    placeholder="20"
                                    {...register('expected_attendees')}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="max_capacity">Kapasitas Maksimal</Label>
                                <Input
                                    id="max_capacity"
                                    type="number"
                                    placeholder="30"
                                    {...register('max_capacity')}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Target Peserta</Label>
                                <Select
                                    onValueChange={(value) => setValue('target_group', value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih target peserta" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Balita</SelectItem>
                                        <SelectItem value="stunting">Balita Stunting</SelectItem>
                                        <SelectItem value="risiko">Balita Risiko Stunting</SelectItem>
                                        <SelectItem value="normal">Balita Normal</SelectItem>
                                        <SelectItem value="specific">Balita Tertentu</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pengingat & Notifikasi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reminder">Kirim Pengingat</Label>
                                <Select
                                    onValueChange={(value) => setValue('reminder', value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih waktu pengingat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Tidak Ada</SelectItem>
                                        <SelectItem value="1_day">1 Hari Sebelumnya</SelectItem>
                                        <SelectItem value="2_days">2 Hari Sebelumnya</SelectItem>
                                        <SelectItem value="1_week">1 Minggu Sebelumnya</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Catatan Tambahan</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Informasi tambahan untuk peserta..."
                                    rows={3}
                                    {...register('notes')}
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href="/schedules">
                            <Button type="button" variant="outline" disabled={isLoading}>
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" />
                            Buat Jadwal
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
