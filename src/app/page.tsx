'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Heart,
  Baby,
  Activity,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Baby,
      title: 'Manajemen Data Balita',
      description: 'Kelola data balita dengan mudah, lengkap dengan riwayat pertumbuhan dan dokumen',
    },
    {
      icon: Activity,
      title: 'Monitoring Real-time',
      description: 'Pantau status gizi dan tumbuh kembang balita secara real-time dengan Z-Score WHO',
    },
    {
      icon: TrendingUp,
      title: 'Deteksi Dini Stunting',
      description: 'Sistem deteksi otomatis dengan alert untuk kasus yang memerlukan tindak lanjut',
    },
    {
      icon: Shield,
      title: 'Workflow Automation',
      description: 'Notifikasi otomatis via WhatsApp, SMS, dan email menggunakan n8n',
    },
    {
      icon: Users,
      title: 'Multi-Role Access',
      description: 'Dashboard khusus untuk Admin, Petugas, Kader, Orang Tua, dan Kepala Puskesmas',
    },
    {
      icon: CheckCircle,
      title: 'Laporan Lengkap',
      description: 'Generate laporan bulanan, triwulan, dan tahunan dengan mudah',
    },
  ];

  const stats = [
    { label: 'Balita Terdaftar', value: '1,247' },
    { label: 'Posyandu Aktif', value: '52' },
    { label: 'Petugas Kesehatan', value: '85' },
    { label: 'Kasus Terdeteksi', value: '89' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
                <Heart className="h-4 w-4 text-primary" />
                <span className="font-medium">Sistem Monitoring Stunting</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Platform Terintegrasi untuk{' '}
                <span className="text-primary">Monitoring Stunting</span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Sistem monitoring dan tindak lanjut risiko stunting pada balita berbasis workflow automation.
                Deteksi dini, notifikasi otomatis, dan laporan komprehensif dalam satu platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Masuk ke Sistem
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="backdrop-blur">
                    <CardContent className="pt-6">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Fitur Unggulan
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Solusi lengkap untuk monitoring dan pencegahan stunting
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Siap Memulai Monitoring Stunting?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ratusan posyandu dan puskesmas yang telah menggunakan
                sistem kami untuk monitoring stunting yang lebih efektif.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg">
                    Daftar Gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Stunting Monitor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Sistem Monitoring Stunting. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
