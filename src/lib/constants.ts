// Application Constants

// User Roles
export const ROLES = {
  ADMIN: 'admin',
  PETUGAS_KESEHATAN: 'petugas_kesehatan',
  KADER_POSYANDU: 'kader_posyandu',
  KEPALA_PUSKESMAS: 'kepala_puskesmas',
} as const;

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.PETUGAS_KESEHATAN]: 'Petugas Kesehatan',
  [ROLES.KADER_POSYANDU]: 'Kader Posyandu',
  [ROLES.KEPALA_PUSKESMAS]: 'Kepala Puskesmas',
} as const;

// Status Options
export const STATUS_AKTIF = {
  AKTIF: 'aktif',
  PINDAH: 'pindah',
  MENINGGAL: 'meninggal',
} as const;

export const STATUS_GIZI = {
  NORMAL: 'normal',
  STUNTING: 'stunting',
  WASTING: 'wasting',
  GIZI_KURANG: 'gizi_kurang',
  GIZI_BURUK: 'gizi_buruk',
  OBESITAS: 'obesitas',
} as const;

export const KATEGORI_STUNTING = {
  TIDAK_STUNTING: 'tidak_stunting',
  STUNTING: 'stunting',
  STUNTING_BERAT: 'stunting_berat',
} as const;

// Alert Types
export const ALERT_TYPE = {
  STUNTING: 'stunting',
  RISIKO_STUNTING: 'risiko_stunting',
  GIZI_BURUK: 'gizi_buruk',
  BERAT_TURUN: 'berat_turun',
} as const;

export const ALERT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const ALERT_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const;

// Intervention Types
export const JENIS_INTERVENSI = {
  PMT: 'pmt',
  KONSELING: 'konseling',
  RUJUKAN: 'rujukan',
  KUNJUNGAN: 'kunjungan',
  EDUKASI: 'edukasi',
} as const;

export const INTERVENTION_STATUS = {
  PLANNED: 'planned',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Schedule Types
export const JENIS_PEMERIKSAAN = {
  RUTIN: 'rutin',
  FOLLOW_UP: 'follow_up',
  IMUNISASI: 'imunisasi',
  VITAMIN: 'vitamin',
} as const;

export const SCHEDULE_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  RESCHEDULED: 'rescheduled',
  NO_SHOW: 'no_show',
} as const;

// Document Types
export const DOCUMENT_TYPE = {
  KTP: 'ktp',
  KK: 'kk',
  AKTE_LAHIR: 'akte_lahir',
  KMS: 'kms',
  FOTO: 'foto',
  LAINNYA: 'lainnya',
} as const;

// Notification Types
export const NOTIFICATION_TYPE = {
  ALERT: 'alert',
  REMINDER: 'reminder',
  INFO: 'info',
  SYSTEM: 'system',
} as const;

export const NOTIFICATION_CHANNEL = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
  PUSH: 'push',
  IN_APP: 'in_app',
} as const;

// Z-Score Thresholds
export const ZSCORE_THRESHOLDS = {
  STUNTING: -2,
  STUNTING_BERAT: -3,
  WASTING: -2,
  WASTING_BERAT: -3,
  GIZI_LEBIH: 2,
  OBESITAS: 3,
} as const;

// Gender
export const JENIS_KELAMIN = {
  LAKI_LAKI: 'L',
  PEREMPUAN: 'P',
} as const;

// Report Types
export const REPORT_TYPE = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  ANNUAL: 'annual',
  CUSTOM: 'custom',
  ADHOC: 'adhoc',
} as const;

// Metode Ukur
export const METODE_UKUR = {
  BERDIRI: 'berdiri',
  BERBARING: 'berbaring',
} as const;

// File Upload Limits
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'dd MMMM yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'dd MMM yyyy HH:mm',
} as const;
