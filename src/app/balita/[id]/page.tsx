'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Baby,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Edit,
    Trash2,
    Download,
    QrCode,
    FileText,
    Activity,
    TrendingUp,
    ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

export default function BalitaDetailPage({ params }: { params: { id: string } }) {
    // Mock data - will be replaced with Supabase query
    const balita = {
        id: parseInt(params.id),
        nik: '3201012015001234',
        no_kk: '3201010101010101',
        nama: 'Ahmad Fauzi',
        tanggal_lahir: '2022-01-15',
        jenis_kelamin: 'L',
        alamat: 'Jl. Melati No. 123, RT 001/RW 002',
        kelurahan: 'Sukamaju',
        kecamatan: 'Kecamatan A',
        kota: 'Kota B',
        nama_ayah: 'Budi Santoso',
        nama_ibu: 'Siti Aminah',
        no_telp_ortu: '081234567890',
        email_ortu: 'siti@email.com',
        posyandu: 'Posyandu Melati 1',
        status_aktif: 'aktif',
        foto_balita: null,
        qr_code: null,
    };

    const measurements = [
        {
            id: 1,
            tanggal_ukur: '2026-01-10',
            usia_bulan: 24,
            tinggi_badan: 85.5,
            berat_badan: 11.2,
            lingkar_lengan: 14.5,
            zscore_tb_u: -1.5,
            zscore_bb_u: -1.2,
            zscore_bb_tb: -0.8,
            status_gizi: 'normal',
            petugas: 'Dr. Sarah',
        },
        {
            id: 2,
            tanggal_ukur: '2025-12-10',
            usia_bulan: 23,
            tinggi_badan: 84.0,
            berat_badan: 10.8,
            lingkar_lengan: 14.2,
            zscore_tb_u: -1.6,
            zscore_bb_u: -1.3,
            zscore_bb_tb: -0.9,
            status_gizi: 'normal',
            petugas: 'Dr. Sarah',
        },
    ];

    const documents = [
        { id: 1, type: 'ktp', name: 'KTP Orang Tua.pdf', size: '245 KB', uploaded: '2025-12-01' },
        { id: 2, type: 'kk', name: 'Kartu Keluarga.pdf', size: '312 KB', uploaded: '2025-12-01' },
        { id: 3, type: 'akte_lahir', name: 'Akte Lahir.pdf', size: '198 KB', uploaded: '2025-12-01' },
    ];

    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return `${years} tahun ${remainingMonths} bulan`;
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
                    <div className="flex items-center gap-4">
                        <Link href="/balita/list">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{balita.nama}</h1>
                            <p className="text-muted-foreground mt-2">
                                NIK: {balita.nik} • {calculateAge(balita.tanggal_lahir)}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <QrCode className="mr-2 h-4 w-4" />
                            QR Code
                        </Button>
                        <Link href={`/balita/${balita.id}/edit`}>
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </Button>
                    </div>
                </div>

                {/* Profile Card */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex gap-6">
                            <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-muted">
                                {balita.foto_balita ? (
                                    <img src={balita.foto_balita} alt={balita.nama} className="rounded-lg" />
                                ) : (
                                    <Baby className="h-16 w-16 text-muted-foreground" />
                                )}
                            </div>
                            <div className="flex-1 grid gap-4 md:grid-cols-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                                    <p className="font-medium">{balita.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                                    <p className="font-medium">{new Date(balita.tanggal_lahir).toLocaleDateString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <StatusBadge status={balita.status_aktif} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">No. KK</p>
                                    <p className="font-medium font-mono text-sm">{balita.no_kk}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Posyandu</p>
                                    <p className="font-medium">{balita.posyandu}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Pengukuran Terakhir</p>
                                    <p className="font-medium">{new Date(measurements[0].tanggal_ukur).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="measurements" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="measurements">Riwayat Pengukuran</TabsTrigger>
                        <TabsTrigger value="growth">Grafik Pertumbuhan</TabsTrigger>
                        <TabsTrigger value="family">Data Keluarga</TabsTrigger>
                        <TabsTrigger value="documents">Dokumen</TabsTrigger>
                    </TabsList>

                    {/* Measurements Tab */}
                    <TabsContent value="measurements" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Riwayat Pengukuran</CardTitle>
                                        <CardDescription>Data antropometri dan Z-Score</CardDescription>
                                    </div>
                                    <Link href="/pengukuran">
                                        <Button>
                                            <Activity className="mr-2 h-4 w-4" />
                                            Tambah Pengukuran
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Tanggal</TableHead>
                                                <TableHead>Usia</TableHead>
                                                <TableHead>TB (cm)</TableHead>
                                                <TableHead>BB (kg)</TableHead>
                                                <TableHead>LiLA (cm)</TableHead>
                                                <TableHead>Z-Score TB/U</TableHead>
                                                <TableHead>Z-Score BB/U</TableHead>
                                                <TableHead>Status Gizi</TableHead>
                                                <TableHead>Petugas</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {measurements.map((m) => (
                                                <TableRow key={m.id}>
                                                    <TableCell>{new Date(m.tanggal_ukur).toLocaleDateString('id-ID')}</TableCell>
                                                    <TableCell>{m.usia_bulan} bln</TableCell>
                                                    <TableCell>{m.tinggi_badan}</TableCell>
                                                    <TableCell>{m.berat_badan}</TableCell>
                                                    <TableCell>{m.lingkar_lengan}</TableCell>
                                                    <TableCell className={m.zscore_tb_u < -2 ? 'text-destructive font-medium' : ''}>
                                                        {m.zscore_tb_u}
                                                    </TableCell>
                                                    <TableCell className={m.zscore_bb_u < -2 ? 'text-destructive font-medium' : ''}>
                                                        {m.zscore_bb_u}
                                                    </TableCell>
                                                    <TableCell>
                                                        <StatusBadge status={m.status_gizi} />
                                                    </TableCell>
                                                    <TableCell>{m.petugas}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Growth Chart Tab */}
                    <TabsContent value="growth">
                        <Card>
                            <CardHeader>
                                <CardTitle>Grafik Pertumbuhan</CardTitle>
                                <CardDescription>Visualisasi tumbuh kembang berdasarkan standar WHO</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-96 flex items-center justify-center border rounded-lg bg-muted/50">
                                    <div className="text-center">
                                        <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">
                                            Grafik pertumbuhan akan ditampilkan di sini
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            (Akan diimplementasikan dengan Recharts)
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Family Tab */}
                    <TabsContent value="family">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Orang Tua</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Nama Ayah</p>
                                        <p className="font-medium">{balita.nama_ayah}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Nama Ibu</p>
                                        <p className="font-medium">{balita.nama_ibu}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Nomor Telepon</p>
                                            <p className="font-medium">{balita.no_telp_ortu}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{balita.email_ortu}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Alamat</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                        <div>
                                            <p className="font-medium">{balita.alamat}</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {balita.kelurahan}, {balita.kecamatan}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {balita.kota}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Documents Tab */}
                    <TabsContent value="documents">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Dokumen</CardTitle>
                                        <CardDescription>File dan dokumen terkait</CardDescription>
                                    </div>
                                    <Button>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Upload Dokumen
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {documents.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-center justify-between p-4 rounded-lg border"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-8 w-8 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{doc.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {doc.size} • Uploaded {new Date(doc.uploaded).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
