'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth';
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            // TODO: Implement actual forgot password logic with Supabase
            console.log('Forgot password data:', data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setSuccess(true);
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <AuthLayout
                title="Cek Email Anda"
                description="Kami telah mengirimkan link reset password"
            >
                <div className="space-y-6">
                    <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                            Link untuk reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam.
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-4 text-center text-sm text-muted-foreground">
                        <p>
                            Tidak menerima email? Cek folder spam atau{' '}
                            <button
                                onClick={() => setSuccess(false)}
                                className="text-primary hover:underline font-medium"
                            >
                                kirim ulang
                            </button>
                        </p>
                    </div>

                    <Link href="/login">
                        <Button variant="outline" className="w-full">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Login
                        </Button>
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Lupa Password?"
            description="Masukkan email Anda untuk reset password"
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

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Kirim Link Reset Password
                </Button>

                <Link href="/login">
                    <Button variant="ghost" className="w-full">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Login
                    </Button>
                </Link>
            </form>
        </AuthLayout>
    );
}
