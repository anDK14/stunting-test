import { z } from 'zod';

export const measurementSchema = z.object({
    balita_id: z.number().min(1, 'Pilih balita'),
    tanggal_ukur: z.string().min(1, 'Tanggal ukur wajib diisi'),
    usia_bulan: z.number().min(0, 'Usia bulan tidak valid'),
    tinggi_badan: z.number().min(30, 'Tinggi badan minimal 30 cm').max(150, 'Tinggi badan maksimal 150 cm'),
    berat_badan: z.number().min(1, 'Berat badan minimal 1 kg').max(50, 'Berat badan maksimal 50 kg'),
    lingkar_lengan: z.number().min(5, 'Lingkar lengan minimal 5 cm').max(30, 'Lingkar lengan maksimal 30 cm').optional(),
    lingkar_kepala: z.number().min(20, 'Lingkar kepala minimal 20 cm').max(60, 'Lingkar kepala maksimal 60 cm').optional(),
    metode_ukur: z.enum(['berdiri', 'berbaring']).optional(),
    lokasi_ukur: z.string().optional(),
    catatan: z.string().optional(),
});

export type MeasurementInput = z.infer<typeof measurementSchema>;
