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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { ROLES, ROLE_LABELS } from '@/lib/constants';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role_id: 0,
        },
    });

    const password = watch('password');

    const onSubmit = async (data: RegisterInput) => {
        if (!acceptTerms) {
            setError('Anda harus menyetujui syarat dan ketentuan');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // TODO: Implement actual registration logic with Supabase
            console.log('Register data:', data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Redirect to login
            router.push('/login?registered=true');
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

    return (
        <AuthLayout
            title="Buat Akun Baru"
            description="Daftar untuk mengakses sistem monitoring stunting"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        {...register('name')}
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                </div>

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
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="08123456789"
                        {...register('phone')}
                        disabled={isLoading}
                    />
                    {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                        onValueChange={(value) => setValue('role_id', parseInt(value))}
                        disabled={isLoading}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">{ROLE_LABELS[ROLES.ADMIN]}</SelectItem>
                            <SelectItem value="2">{ROLE_LABELS[ROLES.PETUGAS_KESEHATAN]}</SelectItem>
                            <SelectItem value="3">{ROLE_LABELS[ROLES.KADER_POSYANDU]}</SelectItem>
                            <SelectItem value="4">{ROLE_LABELS[ROLES.KEPALA_PUSKESMAS]}</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.role_id && (
                        <p className="text-sm text-destructive">{errors.role_id.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
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
                        placeholder="Ulangi password"
                        {...register('confirmPassword')}
                        disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <div className="flex items-start space-x-2">
                    <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <label
                        htmlFor="terms"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Saya menyetujui{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                            syarat dan ketentuan
                        </Link>{' '}
                        serta{' '}
                        <Link href="/privacy" className="text-primary hover:underline">
                            kebijakan privasi
                        </Link>
                    </label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Daftar
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Masuk di sini
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
