"use client";
import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    setScanResult(null);
    setIsScanning(true);

    // Un léger délai pour s'assurer que la div 'reader' est bien dans le DOM
    setTimeout(async () => {
      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      };

      try {
        // 'environment' force la caméra arrière sur smartphone
        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            setScanResult(decodedText);
            stopScanner();
          },
          () => { /* Erreurs de scan silencieuses */ }
        );
      } catch (err) {
        console.error("Erreur caméra:", err);
        setIsScanning(false);
      }
    }, 100);
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.log("Scanner déjà arrêté");
      }
    }
    setIsScanning(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const html5QrCode = new Html5Qrcode("reader");
      
      try {
        const decodedText = await html5QrCode.scanFile(imageFile, true);
        setScanResult(decodedText);
      } catch (err) {
        alert("Aucun code détecté sur cette image.");
      }
    }
  };

  const isURL = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <main className="scan-container">
      <div className="container-small">
        <div className="contact-header">
          <h1 style={{ textAlign: 'center' }}>Scanner de médicaments</h1>
          <p style={{ textAlign: 'center' }} >Scannez un code ou importez une photo pour obtenir les informations.</p>
        </div>

        <div className="scan-card">
          {!isScanning && !scanResult && (
            <div className="scan-actions">
              <button className="btn-submit" onClick={startScanner}>
                <i className="bx bx-camera"></i> Ouvrir la caméra
              </button>
              
              <div className="file-upload-wrapper">
                <label htmlFor="file-input" className="btn-file-label">
                  <i className="bx bx-image-add"></i> Scanner une image
                </label>
                <input 
                  id="file-input"
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          )}

          {isScanning && (
            <div className="scanner-wrapper">
              <div id="reader" style={{ width: '100%' }}></div>
              <button className="btn-stop-scan" onClick={stopScanner}>
                <i className="bx bx-stop-circle"></i> Arrêter le scanner
              </button>
              <p className="scan-hint">La caméra arrière est activée</p>
            </div>
          )}

          {scanResult && (
            <div className="result-card">
              <h3>Résultat de l'analyse</h3>
              <div className="result-box">
                <p>{scanResult}</p>
              </div>

              {isURL(scanResult) ? (
                <a href={scanResult} target="_blank" rel="noopener noreferrer" className="btn-submit">
                  <i className="bx bx-world"></i> Voir les informations
                </a>
              ) : (
                <div className="info-alert">
                  <i className="bx bx-info-circle"></i> Information enregistrée
                </div>
              )}

              <button className="btn-retry" onClick={startScanner}>
                Scanner à nouveau
              </button>
            </div>
          )}
          
          {/* Div cachée nécessaire pour le traitement des fichiers images */}
          <div id="reader" style={{ display: isScanning ? 'block' : 'none' }}></div>
        </div>
      </div>
    </main>
  );
}