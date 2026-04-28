"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let scanner: Html5QrcodeScanner;

    if (isScanning) {
      scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        /* verbose= */ false
      );

      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          setIsScanning(false);
          scanner.clear(); // Arrête la caméra après détection
        },
        (error) => {
          // Gestion silencieuse des erreurs de lecture continue
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch((error) => console.error("Failed to clear scanner", error));
      }
    };
  }, [isScanning]);

  // Fonction pour vérifier si le résultat est un lien URL
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
          <h1>Scanner de médicaments</h1>
          <p>Scannez le code-barres ou QR code d'un médicament pour obtenir ses informations.</p>
        </div>

        <div className="scan-card">
          {!isScanning && !scanResult && (
            <button className="btn-submit" onClick={() => setIsScanning(true)}>
              <i className="bx bx-camera"></i> Lancer le scanner
            </button>
          )}

          {isScanning && (
            <div className="scanner-wrapper">
              <div id="reader"></div>
              <button className="btn-stop-scan" onClick={() => setIsScanning(false)}>
                <i className="bx bx-stop-circle"></i> Arrêter le scanner
              </button>
              <p className="scan-hint">Pointez la caméra vers le code du médicament</p>
            </div>
          )}

          {scanResult && (
            <div className="result-card">
              <h3>Résultat du scan</h3>
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

              <button className="btn-retry" onClick={() => { setScanResult(null); setIsScanning(true); }}>
                Scanner à nouveau
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}