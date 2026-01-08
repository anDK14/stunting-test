'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, Printer } from 'lucide-react';
import QRCode from 'qrcode';
import { useEffect, useRef } from 'react';

interface QRCodeGeneratorProps {
    balitaId: string;
    balitaNama: string;
    balitaNik: string;
}

export function QRCodeGenerator({ balitaId, balitaNama, balitaNik }: QRCodeGeneratorProps) {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        generateQRCode();
    }, [balitaId]);

    const generateQRCode = async () => {
        try {
            // Generate QR code with balita data
            const qrData = JSON.stringify({
                id: balitaId,
                nama: balitaNama,
                nik: balitaNik,
                url: `${window.location.origin}/balita/${balitaId}`,
            });

            if (canvasRef.current) {
                await QRCode.toCanvas(canvasRef.current, qrData, {
                    width: 300,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF',
                    },
                });

                // Also generate data URL for download
                const url = await QRCode.toDataURL(qrData, {
                    width: 300,
                    margin: 2,
                });
                setQrCodeUrl(url);
            }
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const handleDownload = () => {
        if (qrCodeUrl) {
            const link = document.createElement('a');
            link.href = qrCodeUrl;
            link.download = `QR-${balitaNik}-${balitaNama}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow && qrCodeUrl) {
            printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${balitaNama}</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
              }
              .container {
                text-align: center;
                padding: 20px;
              }
              img {
                max-width: 300px;
                margin: 20px 0;
              }
              h2 {
                margin: 10px 0;
              }
              p {
                margin: 5px 0;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>${balitaNama}</h2>
              <p>NIK: ${balitaNik}</p>
              <img src="${qrCodeUrl}" alt="QR Code" />
              <p>Scan untuk melihat detail balita</p>
            </div>
          </body>
        </html>
      `);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 250);
        }
    };

    const handleShare = async () => {
        if (navigator.share && qrCodeUrl) {
            try {
                // Convert data URL to blob
                const response = await fetch(qrCodeUrl);
                const blob = await response.blob();
                const file = new File([blob], `QR-${balitaNik}.png`, { type: 'image/png' });

                await navigator.share({
                    title: `QR Code - ${balitaNama}`,
                    text: `QR Code untuk balita ${balitaNama}`,
                    files: [file],
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>QR Code Balita</CardTitle>
                <CardDescription>
                    Scan QR code untuk akses cepat ke data balita
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-lg border">
                        <canvas ref={canvasRef} />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <p className="font-semibold">{balitaNama}</p>
                    <p className="text-sm text-muted-foreground">NIK: {balitaNik}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <Button onClick={handleDownload} variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download QR Code
                    </Button>
                    <Button onClick={handlePrint} variant="outline" className="w-full">
                        <Printer className="mr-2 h-4 w-4" />
                        Print QR Code
                    </Button>
                    {typeof navigator.share === 'function' && (
                        <Button onClick={handleShare} variant="outline" className="w-full">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share QR Code
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
