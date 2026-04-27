"use client";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Liste des routes où la Navbar et le Footer ne doivent pas apparaître
  const isDashboard =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/abonnement") ||
    pathname?.startsWith("/profil");
    // pathname?.startsWith("/connexion") ||
    // pathname?.startsWith("/inscription");

  return (
    <html lang="fr">
      <head>
        <title>Pharma24 | Pharmacies de garde au Bénin 🇧🇯</title>
        <meta name="description" content="Trouvez une pharmacie de garde en quelques secondes au Bénin. Commandez via WhatsApp et payez par MoMo." />
        
        {/* Favicon */}
        <link rel="icon" href="/img/logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
{/* Boxicons CDN */}
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        {/* Font Awesome pour les icônes */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        />
      </head>

      <body>
        {!isDashboard && <Navbar />}
        <main>{children}</main>
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}