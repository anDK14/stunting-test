'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string }> = {
    // Status Aktif
    aktif: { label: 'Aktif', variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
    pindah: { label: 'Pindah', variant: 'secondary' },
    meninggal: { label: 'Meninggal', variant: 'destructive' },

    // Status Gizi
    normal: { label: 'Normal', variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
    stunting: { label: 'Stunting', variant: 'destructive' },
    wasting: { label: 'Wasting', variant: 'destructive' },
    gizi_kurang: { label: 'Gizi Kurang', variant: 'destructive', className: 'bg-orange-500 hover:bg-orange-600' },
    gizi_buruk: { label: 'Gizi Buruk', variant: 'destructive' },
    obesitas: { label: 'Obesitas', variant: 'destructive', className: 'bg-yellow-600 hover:bg-yellow-700' },

    // Kategori Stunting
    tidak_stunting: { label: 'Tidak Stunting', variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
    stunting_berat: { label: 'Stunting Berat', variant: 'destructive' },

    // Alert Severity
    low: { label: 'Rendah', variant: 'secondary' },
    medium: { label: 'Sedang', variant: 'default', className: 'bg-yellow-500 hover:bg-yellow-600' },
    high: { label: 'Tinggi', variant: 'destructive', className: 'bg-orange-500 hover:bg-orange-600' },
    critical: { label: 'Kritis', variant: 'destructive' },

    // Alert Status
    open: { label: 'Terbuka', variant: 'default', className: 'bg-blue-500 hover:bg-blue-600' },
    in_progress: { label: 'Dalam Proses', variant: 'default', className: 'bg-yellow-500 hover:bg-yellow-600' },
    resolved: { label: 'Selesai', variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
    closed: { label: 'Ditutup', variant: 'secondary' },

    // Intervention Status
    planned: { label: 'Direncanakan', variant: 'secondary' },
    ongoing: { label: 'Berlangsung', variant: 'default', className: 'bg-blue-500 hover:bg-blue-600' },
    completed: { label: 'Selesai', variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
    cancelled: { label: 'Dibatalkan', variant: 'destructive' },

    // Schedule Status
    scheduled: { label: 'Terjadwal', variant: 'default', className: 'bg-blue-500 hover:bg-blue-600' },
    rescheduled: { label: 'Dijadwal Ulang', variant: 'default', className: 'bg-yellow-500 hover:bg-yellow-600' },
    no_show: { label: 'Tidak Hadir', variant: 'destructive', className: 'bg-orange-500 hover:bg-orange-600' },

    // User Status
    active: { label: 'Aktif', variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
    inactive: { label: 'Tidak Aktif', variant: 'secondary' },
    suspended: { label: 'Ditangguhkan', variant: 'destructive' },
};

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
    const config = statusConfig[status.toLowerCase()] || {
        label: status,
        variant: variant || 'default'
    };

    return (
        <Badge
            variant={config.variant}
            className={cn(config.className, className)}
        >
            {config.label}
        </Badge>
    );
}
