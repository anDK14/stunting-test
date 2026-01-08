'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true);
        setError('');

        try {
            // TODO: Implement actual login logic with Supabase
            console.log('Login data:', data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Redirect to dashboard based on role (mock)
            router.push('/admin');
        } catch (err) {
            setError('Email atau password salah. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Selamat Datang"
            description="Masuk ke akun Anda untuk melanjutkan"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        {...register('email')}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-primary hover:underline"
                        >
                            Lupa password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password')}
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="remember" {...register('remember')} />
                    <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Ingat saya
                    </label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Masuk
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Belum punya akun?{' '}
                    <Link href="/register" className="text-primary hover:underline font-medium">
                        Daftar sekarang
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
