// Database Types - Generated from Supabase Schema

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            roles: {
                Row: {
                    id: number
                    name: string
                    permissions: Json
                    description: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    permissions?: Json
                    description?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    permissions?: Json
                    description?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            users: {
                Row: {
                    id: number
                    email: string
                    password: string
                    name: string
                    phone: string | null
                    role_id: number | null
                    nip: string | null
                    position: string | null
                    status: 'active' | 'inactive' | 'suspended'
                    profile_photo: string | null
                    last_login: string | null
                    email_verified_at: string | null
                    created_at: string
                    updated_at: string
                    deleted_at: string | null
                }
                Insert: {
                    id?: number
                    email: string
                    password: string
                    name: string
                    phone?: string | null
                    role_id?: number | null
                    nip?: string | null
                    position?: string | null
                    status?: 'active' | 'inactive' | 'suspended'
                    profile_photo?: string | null
                    last_login?: string | null
                    email_verified_at?: string | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Update: {
                    id?: number
                    email?: string
                    password?: string
                    name?: string
                    phone?: string | null
                    role_id?: number | null
                    nip?: string | null
                    position?: string | null
                    status?: 'active' | 'inactive' | 'suspended'
                    profile_photo?: string | null
                    last_login?: string | null
                    email_verified_at?: string | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
            }
            balita: {
                Row: {
                    id: number
                    nik: string
                    no_kk: string | null
                    nama: string
                    tanggal_lahir: string
                    jenis_kelamin: 'L' | 'P'
                    alamat: string | null
                    rt_rw: string | null
                    kelurahan: string | null
                    kecamatan: string | null
                    kota: string | null
                    nama_ayah: string | null
                    nama_ibu: string | null
                    nik_ayah: string | null
                    nik_ibu: string | null
                    no_telp_ortu: string | null
                    email_ortu: string | null
                    foto_balita: string | null
                    qr_code: string | null
                    posyandu_id: number | null
                    user_id: number | null
                    status_aktif: 'aktif' | 'pindah' | 'meninggal'
                    keterangan: string | null
                    created_at: string
                    updated_at: string
                    deleted_at: string | null
                }
                Insert: {
                    id?: number
                    nik: string
                    no_kk?: string | null
                    nama: string
                    tanggal_lahir: string
                    jenis_kelamin: 'L' | 'P'
                    alamat?: string | null
                    rt_rw?: string | null
                    kelurahan?: string | null
                    kecamatan?: string | null
                    kota?: string | null
                    nama_ayah?: string | null
                    nama_ibu?: string | null
                    nik_ayah?: string | null
                    nik_ibu?: string | null
                    no_telp_ortu?: string | null
                    email_ortu?: string | null
                    foto_balita?: string | null
                    qr_code?: string | null
                    posyandu_id?: number | null
                    user_id?: number | null
                    status_aktif?: 'aktif' | 'pindah' | 'meninggal'
                    keterangan?: string | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Update: {
                    id?: number
                    nik?: string
                    no_kk?: string | null
                    nama?: string
                    tanggal_lahir?: string
                    jenis_kelamin?: 'L' | 'P'
                    alamat?: string | null
                    rt_rw?: string | null
                    kelurahan?: string | null
                    kecamatan?: string | null
                    kota?: string | null
                    nama_ayah?: string | null
                    nama_ibu?: string | null
                    nik_ayah?: string | null
                    nik_ibu?: string | null
                    no_telp_ortu?: string | null
                    email_ortu?: string | null
                    foto_balita?: string | null
                    qr_code?: string | null
                    posyandu_id?: number | null
                    user_id?: number | null
                    status_aktif?: 'aktif' | 'pindah' | 'meninggal'
                    keterangan?: string | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
            }
            measurements: {
                Row: {
                    id: number
                    balita_id: number
                    tanggal_ukur: string
                    usia_bulan: number
                    tinggi_badan: number | null
                    berat_badan: number | null
                    lingkar_lengan: number | null
                    lingkar_kepala: number | null
                    zscore_tb_u: number | null
                    zscore_bb_u: number | null
                    zscore_bb_tb: number | null
                    zscore_lk_u: number | null
                    status_gizi: 'normal' | 'stunting' | 'wasting' | 'gizi_kurang' | 'gizi_buruk' | 'obesitas' | null
                    kategori_stunting: 'tidak_stunting' | 'stunting' | 'stunting_berat' | null
                    catatan: string | null
                    petugas_id: number | null
                    metode_ukur: 'berdiri' | 'berbaring' | null
                    lokasi_ukur: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: number
                    balita_id: number
                    tanggal_ukur: string
                    usia_bulan: number
                    tinggi_badan?: number | null
                    berat_badan?: number | null
                    lingkar_lengan?: number | null
                    lingkar_kepala?: number | null
                    zscore_tb_u?: number | null
                    zscore_bb_u?: number | null
                    zscore_bb_tb?: number | null
                    zscore_lk_u?: number | null
                    status_gizi?: 'normal' | 'stunting' | 'wasting' | 'gizi_kurang' | 'gizi_buruk' | 'obesitas' | null
                    kategori_stunting?: 'tidak_stunting' | 'stunting' | 'stunting_berat' | null
                    catatan?: string | null
                    petugas_id?: number | null
                    metode_ukur?: 'berdiri' | 'berbaring' | null
                    lokasi_ukur?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: number
                    balita_id?: number
                    tanggal_ukur?: string
                    usia_bulan?: number
                    tinggi_badan?: number | null
                    berat_badan?: number | null
                    lingkar_lengan?: number | null
                    lingkar_kepala?: number | null
                    zscore_tb_u?: number | null
                    zscore_bb_u?: number | null
                    zscore_bb_tb?: number | null
                    zscore_lk_u?: number | null
                    status_gizi?: 'normal' | 'stunting' | 'wasting' | 'gizi_kurang' | 'gizi_buruk' | 'obesitas' | null
                    kategori_stunting?: 'tidak_stunting' | 'stunting' | 'stunting_berat' | null
                    catatan?: string | null
                    petugas_id?: number | null
                    metode_ukur?: 'berdiri' | 'berbaring' | null
                    lokasi_ukur?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            alerts: {
                Row: {
                    id: number
                    balita_id: number
                    measurement_id: number
                    alert_type: 'stunting' | 'risiko_stunting' | 'gizi_buruk' | 'berat_turun'
                    severity: 'low' | 'medium' | 'high' | 'critical'
                    status: 'open' | 'in_progress' | 'resolved' | 'closed'
                    description: string | null
                    assigned_to: number | null
                    resolved_at: string | null
                    resolution_notes: string | null
                    resolved_by: number | null
                    auto_generated: boolean
                    created_at: string
                    updated_at: string
                }
            }
            interventions: {
                Row: {
                    id: number
                    balita_id: number
                    alert_id: number | null
                    judul_intervensi: string
                    jenis_intervensi: 'pmt' | 'konseling' | 'rujukan' | 'kunjungan' | 'edukasi'
                    tanggal_mulai: string | null
                    tanggal_target_selesai: string | null
                    tanggal_selesai: string | null
                    status: 'planned' | 'ongoing' | 'completed' | 'cancelled'
                    target_intervensi: string | null
                    progress_percentage: number
                    petugas_id: number | null
                    catatan: string | null
                    hambatan: string | null
                    rekomendasi: string | null
                    created_at: string
                    updated_at: string
                }
            }
            schedules: {
                Row: {
                    id: number
                    balita_id: number
                    tanggal_jadwal: string
                    jenis_pemeriksaan: 'rutin' | 'follow_up' | 'imunisasi' | 'vitamin'
                    lokasi: string | null
                    petugas_id: number | null
                    status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show'
                    reminder_sent: boolean
                    reminder_sent_at: string | null
                    catatan: string | null
                    rescheduled_from: number | null
                    created_at: string
                    updated_at: string
                }
            }
        }
    }
}
