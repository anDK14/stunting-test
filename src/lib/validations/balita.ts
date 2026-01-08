import { z } from 'zod';

export const balitaSchema = z.object({
    // Data Balita
    nik: z.string().length(16, 'NIK harus 16 digit').regex(/^[0-9]+$/, 'NIK hanya boleh angka'),
    no_kk: z.string().length(16, 'No. KK harus 16 digit').regex(/^[0-9]+$/, 'No. KK hanya boleh angka').optional(),
    nama: z.string().min(3, 'Nama minimal 3 karakter'),
    tanggal_lahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
    jenis_kelamin: z.enum(['L', 'P']),

    // Alamat
    alamat: z.string().min(10, 'Alamat minimal 10 karakter').optional(),
    rt_rw: z.string().optional(),
    kelurahan: z.string().optional(),
    kecamatan: z.string().optional(),
    kota: z.string().optional(),

    // Data Orang Tua
    nama_ayah: z.string().min(3, 'Nama ayah minimal 3 karakter').optional(),
    nama_ibu: z.string().min(3, 'Nama ibu minimal 3 karakter'),
    nik_ayah: z.string().length(16, 'NIK ayah harus 16 digit').regex(/^[0-9]+$/, 'NIK hanya boleh angka').optional(),
    nik_ibu: z.string().length(16, 'NIK ibu harus 16 digit').regex(/^[0-9]+$/, 'NIK hanya boleh angka').optional(),
    no_telp_ortu: z.string().min(10, 'Nomor telepon minimal 10 digit').regex(/^[0-9]+$/, 'Nomor telepon hanya boleh angka'),
    email_ortu: z.string().email('Email tidak valid').optional(),

    // Posyandu
    posyandu_id: z.number().min(1, 'Pilih posyandu').optional(),

    // Status
    status_aktif: z.enum(['aktif', 'pindah', 'meninggal']).optional(),
    keterangan: z.string().optional(),
});

export type BalitaInput = z.infer<typeof balitaSchema>;
