'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center text-center">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <Heart className="h-7 w-7" />
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        {description && (
                            <p className="text-muted-foreground mt-2">{description}</p>
                        )}
                    </div>

                    {/* Form Content */}
                    <div>{children}</div>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:block relative bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="max-w-md space-y-6 text-center">
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                <Heart className="relative h-32 w-32 text-primary" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold">
                            Sistem Monitoring Stunting
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Platform terintegrasi untuk monitoring dan tindak lanjut risiko stunting pada balita
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-8">
                            <div className="p-4 rounded-lg bg-background/50 backdrop-blur">
                                <div className="text-3xl font-bold text-primary">1000+</div>
                                <div className="text-sm text-muted-foreground">Balita Terdaftar</div>
                            </div>
                            <div className="p-4 rounded-lg bg-background/50 backdrop-blur">
                                <div className="text-3xl font-bold text-primary">50+</div>
                                <div className="text-sm text-muted-foreground">Posyandu Aktif</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
