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
import { Loader2, AlertCircle, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function CreateInterventionPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedBalita, setSelectedBalita] = useState<any>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // Mock balita data
    const balitaOptions = [
        { id: 1, nama: 'Ahmad Fauzi', nik: '3201012015001234', status_gizi: 'stunting' },
        { id: 2, nama: 'Siti Nurhaliza', nik: '3201012016002345', status_gizi: 'risiko_stunting' },
    ];

    const handleBalitaSelect = (balitaId: string) => {
        const balita = balitaOptions.find(b => b.id === parseInt(balitaId));
        if (balita) {
            setSelectedBalita(balita);
            setValue('balita_id', balita.id);
        }
    };

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError('');

        try {
            console.log('Intervention data:', data);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            router.push('/interventions');
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout
            role={ROLES.PETUGAS_KESEHATAN}
            userName="Dr. Sarah"
            userRole="Petugas Kesehatan"
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/interventions">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Buat Intervensi Baru</h1>
                        <p className="text-muted-foreground mt-2">
                            Rencanakan program intervensi untuk balita
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
                            <CardTitle>Pilih Balita</CardTitle>
                            <CardDescription>Pilih balita yang akan mendapat intervensi</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="balita">Nama Balita *</Label>
                                <Select onValueChange={handleBalitaSelect} disabled={isLoading}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih balita..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {balitaOptions.map((balita) => (
                                            <SelectItem key={balita.id} value={balita.id.toString()}>
                                                {balita.nama} - {balita.nik} ({balita.status_gizi})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedBalita && (
                                <div className="p-4 rounded-lg bg-muted">
                                    <div className="grid gap-2 md:grid-cols-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Nama</p>
                                            <p className="font-medium">{selectedBalita.nama}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">NIK</p>
                                            <p className="font-medium font-mono text-sm">{selectedBalita.nik}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Status Gizi</p>
                                            <p className="font-medium">{selectedBalita.status_gizi}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Intervensi</CardTitle>
                            <CardDescription>Informasi program intervensi</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Tipe Intervensi *</Label>
                                <Select
                                    onValueChange={(value) => setValue('type', value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe intervensi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pmt">Pemberian PMT</SelectItem>
                                        <SelectItem value="konseling">Konseling Gizi</SelectItem>
                                        <SelectItem value="pemantauan">Pemantauan Intensif</SelectItem>
                                        <SelectItem value="rujukan">Rujukan ke Fasilitas Kesehatan</SelectItem>
                                        <SelectItem value="edukasi">Edukasi Orang Tua</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Judul Intervensi *</Label>
                                <Input
                                    id="title"
                                    placeholder="Contoh: Program PMT Pemulihan Gizi"
                                    {...register('title', { required: true })}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Jelaskan detail program intervensi..."
                                    rows={4}
                                    {...register('description', { required: true })}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Tanggal Mulai *</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        {...register('start_date', { required: true })}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="target_date">Target Selesai *</Label>
                                    <Input
                                        id="target_date"
                                        type="date"
                                        {...register('target_date', { required: true })}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="target_outcome">Target Hasil</Label>
                                <Textarea
                                    id="target_outcome"
                                    placeholder="Target yang ingin dicapai dari intervensi ini..."
                                    rows={3}
                                    {...register('target_outcome')}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="frequency">Frekuensi</Label>
                                <Input
                                    id="frequency"
                                    placeholder="Contoh: 3x seminggu, Setiap hari"
                                    {...register('frequency')}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Lokasi Pelaksanaan</Label>
                                <Input
                                    id="location"
                                    placeholder="Contoh: Posyandu Melati 1"
                                    {...register('location')}
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Penanggung Jawab</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="assigned_to">Petugas yang Bertanggung Jawab</Label>
                                <Select
                                    onValueChange={(value) => setValue('assigned_to', value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih petugas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2">Dr. Sarah</SelectItem>
                                        <SelectItem value="3">Bidan Ani</SelectItem>
                                        <SelectItem value="4">Kader Posyandu 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Catatan Tambahan</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Catatan atau instruksi khusus..."
                                    rows={3}
                                    {...register('notes')}
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href="/interventions">
                            <Button type="button" variant="outline" disabled={isLoading}>
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" />
                            Buat Intervensi
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
