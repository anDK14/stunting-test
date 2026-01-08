'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';

interface DocumentUploadProps {
    balitaId: string;
    onUploadComplete?: (files: UploadedFile[]) => void;
}

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    uploaded_at: string;
}

export function DocumentUpload({ balitaId, onUploadComplete }: DocumentUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        // Mock existing files
        {
            id: '1',
            name: 'Kartu_Keluarga.pdf',
            size: 245678,
            type: 'application/pdf',
            url: '#',
            uploaded_at: '2026-01-01T10:00:00',
        },
        {
            id: '2',
            name: 'Akta_Kelahiran.pdf',
            size: 189234,
            type: 'application/pdf',
            url: '#',
            uploaded_at: '2026-01-01T10:05:00',
        },
    ]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg'],
            'application/pdf': ['.pdf'],
        },
        maxSize: 5 * 1024 * 1024, // 5MB
    });

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const removeUploadedFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
        // TODO: Implement actual file deletion from storage
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);
        try {
            // TODO: Implement actual file upload to Supabase Storage
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Mock uploaded files
            const newUploadedFiles: UploadedFile[] = files.map((file, index) => ({
                id: `${Date.now()}-${index}`,
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file),
                uploaded_at: new Date().toISOString(),
            }));

            setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
            setFiles([]);

            if (onUploadComplete) {
                onUploadComplete(newUploadedFiles);
            }
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) {
            return <ImageIcon className="h-8 w-8 text-blue-500" />;
        }
        return <FileText className="h-8 w-8 text-red-500" />;
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <Card>
                <CardHeader>
                    <CardTitle>Upload Dokumen</CardTitle>
                    <CardDescription>
                        Upload foto atau dokumen balita (Max 5MB per file)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                                ? 'border-primary bg-primary/5'
                                : 'border-muted-foreground/25 hover:border-primary/50'
                            }`}
                    >
                        <input {...getInputProps()} />
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        {isDragActive ? (
                            <p className="text-sm text-muted-foreground">Drop files here...</p>
                        ) : (
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Drag & drop files here, or click to select
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Supported: JPG, PNG, PDF (Max 5MB)
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Files to Upload */}
                    {files.length > 0 && (
                        <div className="space-y-2">
                            <Label>Files to Upload ({files.length})</Label>
                            <div className="space-y-2">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-lg border"
                                    >
                                        <div className="flex items-center gap-3">
                                            {getFileIcon(file.type)}
                                            <div>
                                                <p className="text-sm font-medium">{file.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatFileSize(file.size)}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFile(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="w-full"
                            >
                                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {uploading ? 'Uploading...' : 'Upload Files'}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Dokumen Tersimpan</CardTitle>
                        <CardDescription>
                            {uploadedFiles.length} dokumen
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {uploadedFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        {getFileIcon(file.type)}
                                        <div>
                                            <p className="text-sm font-medium">{file.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{formatFileSize(file.size)}</span>
                                                <span>•</span>
                                                <span>
                                                    {new Date(file.uploaded_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                                                View
                                            </a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeUploadedFile(file.id)}
                                        >
                                            <X className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
