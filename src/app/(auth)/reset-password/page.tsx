'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const password = watch('password');

    const onSubmit = async (data: ResetPasswordInput) => {
        if (!token) {
            setError('Token tidak valid');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // TODO: Implement actual reset password logic with Supabase
            console.log('Reset password data:', data, 'token:', token);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setSuccess(true);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/login?reset=success');
            }, 2000);
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrength = (pwd: string) => {
        if (!pwd) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (pwd.length >= 12) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

        if (strength <= 2) return { strength, label: 'Lemah', color: 'bg-destructive' };
        if (strength <= 3) return { strength, label: 'Sedang', color: 'bg-yellow-500' };
        return { strength, label: 'Kuat', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(password || '');

    if (!token) {
        return (
            <AuthLayout
                title="Link Tidak Valid"
                description="Token reset password tidak ditemukan"
            >
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Link reset password tidak valid atau sudah kadaluarsa. Silakan minta link baru.
                    </AlertDescription>
                </Alert>
                <Button
                    onClick={() => router.push('/forgot-password')}
                    className="w-full mt-4"
                >
                    Minta Link Baru
                </Button>
            </AuthLayout>
        );
    }

    if (success) {
        return (
            <AuthLayout
                title="Password Berhasil Diubah"
                description="Anda akan dialihkan ke halaman login"
            >
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                        Password Anda berhasil diubah. Silakan login dengan password baru.
                    </AlertDescription>
                </Alert>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Reset Password"
            description="Masukkan password baru Anda"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-2">
                    <Label htmlFor="password">Password Baru</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Minimal 8 karakter"
                        {...register('password')}
                        disabled={isLoading}
                    />
                    {password && (
                        <div className="space-y-1">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1 flex-1 rounded-full ${i < passwordStrength.strength
                                            ? passwordStrength.color
                                            : 'bg-muted'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Kekuatan password: {passwordStrength.label}
                            </p>
                        </div>
                    )}
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Ulangi password baru"
                        {...register('confirmPassword')}
                        disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Reset Password
                </Button>
            </form>
        </AuthLayout>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <AuthLayout
                title="Reset Password"
                description="Memuat..."
            >
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </AuthLayout>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
