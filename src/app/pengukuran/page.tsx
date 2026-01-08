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
import { Badge } from '@/components/ui/badge';
import { measurementSchema, type MeasurementInput } from '@/lib/validations/measurement';
import { ROLES } from '@/lib/constants';
import { Loader2, AlertCircle, Save, Calculator, TrendingUp } from 'lucide-react';

export default function PengukuranPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedBalita, setSelectedBalita] = useState<any>(null);
    const [zScores, setZScores] = useState<any>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<MeasurementInput>({
        resolver: zodResolver(measurementSchema),
    });

    const tinggi = watch('tinggi_badan');
    const berat = watch('berat_badan');

    // Mock balita data - will be replaced with Supabase query
    const balitaOptions = [
        { id: 1, nama: 'Ahmad Fauzi', nik: '3201012015001234', usia_bulan: 24 },
        { id: 2, nama: 'Siti Nurhaliza', nik: '3201012016002345', usia_bulan: 18 },
        { id: 3, nama: 'Budi Santoso', nik: '3201012017003456', usia_bulan: 30 },
    ];

    const handleBalitaSelect = (balitaId: string) => {
        const balita = balitaOptions.find(b => b.id === parseInt(balitaId));
        if (balita) {
            setSelectedBalita(balita);
            setValue('balita_id', balita.id);
            setValue('usia_bulan', balita.usia_bulan);
        }
    };

    const calculateZScores = () => {
        if (!tinggi || !berat || !selectedBalita) return;

        // Mock Z-Score calculation - will be replaced with actual WHO calculation
        const mockZScores = {
            zscore_tb_u: -1.5,
            zscore_bb_u: -1.2,
            zscore_bb_tb: -0.8,
            status_gizi: 'normal',
            kategori_stunting: 'tidak_stunting',
        };

        setZScores(mockZScores);
    };

    const onSubmit = async (data: MeasurementInput) => {
        setIsLoading(true);
        setError('');

        try {
            // TODO: Implement actual save logic with Supabase
            console.log('Measurement data:', { ...data, ...zScores });

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Redirect to balita detail or success page
            router.push(`/balita/${data.balita_id}`);
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
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Input Pengukuran</h1>
                    <p className="text-muted-foreground mt-2">
                        Input data antropometri balita dan hitung Z-Score otomatis
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Pilih Balita */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pilih Balita</CardTitle>
                            <CardDescription>Cari dan pilih balita yang akan diukur</CardDescription>
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
                                                {balita.nama} - {balita.nik}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.balita_id && (
                                    <p className="text-sm text-destructive">{errors.balita_id.message}</p>
                                )}
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
                                            <p className="text-sm text-muted-foreground">Usia</p>
                                            <p className="font-medium">{selectedBalita.usia_bulan} bulan</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Data Pengukuran */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Antropometri</CardTitle>
                            <CardDescription>Masukkan hasil pengukuran</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="tanggal_ukur">Tanggal Pengukuran *</Label>
                                <Input
                                    id="tanggal_ukur"
                                    type="date"
                                    {...register('tanggal_ukur')}
                                    disabled={isLoading}
                                />
                                {errors.tanggal_ukur && (
                                    <p className="text-sm text-destructive">{errors.tanggal_ukur.message}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="tinggi_badan">Tinggi/Panjang Badan (cm) *</Label>
                                    <Input
                                        id="tinggi_badan"
                                        type="number"
                                        step="0.1"
                                        placeholder="85.5"
                                        {...register('tinggi_badan', { valueAsNumber: true })}
                                        disabled={isLoading}
                                        onChange={(e) => {
                                            register('tinggi_badan').onChange(e);
                                            setZScores(null);
                                        }}
                                    />
                                    {errors.tinggi_badan && (
                                        <p className="text-sm text-destructive">{errors.tinggi_badan.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="berat_badan">Berat Badan (kg) *</Label>
                                    <Input
                                        id="berat_badan"
                                        type="number"
                                        step="0.1"
                                        placeholder="11.2"
                                        {...register('berat_badan', { valueAsNumber: true })}
                                        disabled={isLoading}
                                        onChange={(e) => {
                                            register('berat_badan').onChange(e);
                                            setZScores(null);
                                        }}
                                    />
                                    {errors.berat_badan && (
                                        <p className="text-sm text-destructive">{errors.berat_badan.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="lingkar_lengan">Lingkar Lengan Atas (cm)</Label>
                                    <Input
                                        id="lingkar_lengan"
                                        type="number"
                                        step="0.1"
                                        placeholder="14.5"
                                        {...register('lingkar_lengan', { valueAsNumber: true })}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="metode_ukur">Metode Pengukuran</Label>
                                    <Select
                                        onValueChange={(value) => setValue('metode_ukur', value as 'berdiri' | 'berbaring')}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih metode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="berdiri">Berdiri</SelectItem>
                                            <SelectItem value="berbaring">Berbaring</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lokasi_ukur">Lokasi Pengukuran</Label>
                                <Input
                                    id="lokasi_ukur"
                                    placeholder="Posyandu Melati 1"
                                    {...register('lokasi_ukur')}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="catatan">Catatan</Label>
                                <Textarea
                                    id="catatan"
                                    placeholder="Catatan tambahan (opsional)"
                                    {...register('catatan')}
                                    disabled={isLoading}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={calculateZScores}
                                disabled={!tinggi || !berat || !selectedBalita || isLoading}
                                className="w-full"
                            >
                                <Calculator className="mr-2 h-4 w-4" />
                                Hitung Z-Score
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Z-Score Results */}
                    {zScores && (
                        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Hasil Kalkulasi Z-Score
                                </CardTitle>
                                <CardDescription>
                                    Berdasarkan standar WHO
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="p-4 rounded-lg border bg-background">
                                        <p className="text-sm text-muted-foreground">Z-Score TB/U</p>
                                        <p className="text-2xl font-bold">{zScores.zscore_tb_u}</p>
                                        <p className="text-xs text-muted-foreground mt-1">Tinggi/Usia</p>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-background">
                                        <p className="text-sm text-muted-foreground">Z-Score BB/U</p>
                                        <p className="text-2xl font-bold">{zScores.zscore_bb_u}</p>
                                        <p className="text-xs text-muted-foreground mt-1">Berat/Usia</p>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-background">
                                        <p className="text-sm text-muted-foreground">Z-Score BB/TB</p>
                                        <p className="text-2xl font-bold">{zScores.zscore_bb_tb}</p>
                                        <p className="text-xs text-muted-foreground mt-1">Berat/Tinggi</p>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 rounded-lg border bg-background">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Status Gizi</p>
                                            <p className="text-xl font-bold mt-1">{zScores.status_gizi.toUpperCase()}</p>
                                        </div>
                                        <Badge
                                            variant={zScores.status_gizi === 'normal' ? 'default' : 'destructive'}
                                            className="text-lg px-4 py-2"
                                        >
                                            {zScores.kategori_stunting === 'tidak_stunting' ? 'Tidak Stunting' : 'Stunting'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            onClick={() => router.back()}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={isLoading || !zScores}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" />
                            Simpan Pengukuran
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
