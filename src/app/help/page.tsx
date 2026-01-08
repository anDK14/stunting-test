'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    BookOpen,
    Search,
    Video,
    FileText,
    HelpCircle,
    Mail,
    Phone,
} from 'lucide-react';
import { ROLES } from '@/lib/constants';

export default function HelpPage() {
    const faqs = [
        {
            category: 'Umum',
            questions: [
                {
                    q: 'Apa itu sistem monitoring stunting?',
                    a: 'Sistem monitoring stunting adalah platform digital untuk memantau pertumbuhan balita, mendeteksi dini risiko stunting, dan mengelola program intervensi secara terintegrasi.',
                },
                {
                    q: 'Siapa saja yang dapat menggunakan sistem ini?',
                    a: 'Sistem ini dapat digunakan oleh Admin, Petugas Kesehatan, Kader Posyandu, Orang Tua, dan Kepala Puskesmas dengan akses dan fitur yang disesuaikan dengan peran masing-masing.',
                },
                {
                    q: 'Bagaimana cara mendaftar akun baru?',
                    a: 'Klik tombol "Daftar" di halaman login, isi formulir pendaftaran dengan lengkap, pilih role yang sesuai, dan tunggu verifikasi dari admin.',
                },
            ],
        },
        {
            category: 'Data Balita',
            questions: [
                {
                    q: 'Bagaimana cara menambah data balita baru?',
                    a: 'Masuk ke menu "Balita" > klik "Tambah Balita" > isi formulir dengan lengkap termasuk data pribadi, orang tua, dan posyandu > klik "Simpan".',
                },
                {
                    q: 'Apa yang dimaksud dengan Z-Score?',
                    a: 'Z-Score adalah nilai standar deviasi yang digunakan untuk menilai status gizi balita berdasarkan standar WHO. Z-Score < -2 mengindikasikan stunting.',
                },
                {
                    q: 'Bagaimana cara mengupload foto balita?',
                    a: 'Buka detail balita > klik tab "Dokumen" > klik "Upload Foto" > pilih file foto (JPG/PNG, max 2MB) > klik "Upload".',
                },
            ],
        },
        {
            category: 'Pengukuran',
            questions: [
                {
                    q: 'Seberapa sering harus melakukan pengukuran?',
                    a: 'Pengukuran rutin dilakukan setiap bulan di posyandu. Untuk balita dengan risiko stunting, pengukuran dapat dilakukan lebih sering sesuai rekomendasi petugas kesehatan.',
                },
                {
                    q: 'Apa saja data yang perlu diinput saat pengukuran?',
                    a: 'Data yang perlu diinput: tinggi badan, berat badan, lingkar lengan atas, lingkar kepala, tanggal pengukuran, dan catatan tambahan jika ada.',
                },
                {
                    q: 'Bagaimana sistem menghitung Z-Score?',
                    a: 'Sistem menghitung Z-Score secara otomatis berdasarkan data antropometri (TB, BB) dan usia balita menggunakan standar WHO 2006.',
                },
            ],
        },
        {
            category: 'Alert & Intervensi',
            questions: [
                {
                    q: 'Kapan alert stunting muncul?',
                    a: 'Alert muncul otomatis ketika Z-Score TB/U balita < -2 (stunting) atau antara -2 dan -1 (risiko stunting).',
                },
                {
                    q: 'Bagaimana cara membuat program intervensi?',
                    a: 'Masuk ke menu "Intervensi" > klik "Buat Intervensi" > pilih balita > isi detail program > tentukan target dan jadwal > klik "Simpan".',
                },
                {
                    q: 'Apa saja jenis intervensi yang tersedia?',
                    a: 'Jenis intervensi meliputi: Pemberian PMT, Konseling Gizi, Pemantauan Intensif, Rujukan ke Fasilitas Kesehatan, dan Edukasi Orang Tua.',
                },
            ],
        },
        {
            category: 'Laporan',
            questions: [
                {
                    q: 'Bagaimana cara generate laporan?',
                    a: 'Masuk ke menu "Laporan" > pilih template (Bulanan/Triwulan/Tahunan) > klik "Generate" > tunggu proses selesai > klik "Download".',
                },
                {
                    q: 'Format apa saja yang tersedia untuk laporan?',
                    a: 'Laporan dapat didownload dalam format PDF dan Excel untuk memudahkan analisis dan presentasi data.',
                },
            ],
        },
    ];

    const guides = [
        {
            title: 'Panduan Lengkap Sistem',
            description: 'Dokumentasi lengkap penggunaan sistem monitoring stunting',
            icon: BookOpen,
            type: 'PDF',
        },
        {
            title: 'Video Tutorial',
            description: 'Tutorial video step-by-step untuk setiap fitur',
            icon: Video,
            type: 'Video',
        },
        {
            title: 'Quick Start Guide',
            description: 'Panduan cepat untuk memulai menggunakan sistem',
            icon: FileText,
            type: 'PDF',
        },
    ];

    return (
        <DashboardLayout
            role={ROLES.ADMIN}
            userName="Admin User"
            userRole="Administrator"
        >
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Bantuan & Dokumentasi</h1>
                    <p className="text-muted-foreground mt-2">
                        Temukan jawaban dan panduan penggunaan sistem
                    </p>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari bantuan..."
                                className="pl-8"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <div className="grid gap-4 md:grid-cols-3">
                    {guides.map((guide, index) => {
                        const Icon = guide.icon;
                        return (
                            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{guide.title}</CardTitle>
                                            <Badge variant="outline" className="mt-1">{guide.type}</Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {guide.description}
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Lihat Panduan
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* FAQ */}
                <Tabs defaultValue="umum" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="umum">Umum</TabsTrigger>
                        <TabsTrigger value="balita">Data Balita</TabsTrigger>
                        <TabsTrigger value="pengukuran">Pengukuran</TabsTrigger>
                        <TabsTrigger value="alert">Alert & Intervensi</TabsTrigger>
                        <TabsTrigger value="laporan">Laporan</TabsTrigger>
                    </TabsList>

                    {faqs.map((category, catIndex) => (
                        <TabsContent key={catIndex} value={category.category.toLowerCase().replace(' ', '_')}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pertanyaan yang Sering Diajukan</CardTitle>
                                    <CardDescription>
                                        {category.category}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        {category.questions.map((item, qIndex) => (
                                            <AccordionItem key={qIndex} value={`item-${qIndex}`}>
                                                <AccordionTrigger className="text-left">
                                                    <div className="flex items-start gap-2">
                                                        <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                        <span>{item.q}</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground pl-7">
                                                    {item.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Contact Support */}
                <Card>
                    <CardHeader>
                        <CardTitle>Butuh Bantuan Lebih Lanjut?</CardTitle>
                        <CardDescription>
                            Hubungi tim support kami
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-center gap-3 p-4 rounded-lg border">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">Email Support</p>
                                    <p className="text-sm text-muted-foreground">support@stunting-monitor.id</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-lg border">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">Telepon</p>
                                    <p className="text-sm text-muted-foreground">021-1234-5678</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
