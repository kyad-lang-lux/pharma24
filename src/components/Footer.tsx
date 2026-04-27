import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Colonne Marque */}
          <div className="footer-col brand">
            <div className="footer-logo">
              <div className="logo-icon">
                {/* <i className='bx bx-plus-medical'></i> */}

                <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} 
fill={"currentColor"} viewBox={"0 0 24 24"}>
{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}
<path d="M21 7.99h-5V3c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v4.99H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h5V21c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-5.01h5c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1m-1 6h-5c-.55 0-1 .45-1 1V20h-4v-5.01c0-.55-.45-1-1-1H4v-4h5c.55 0 1-.45 1-1V4h4v4.99c0 .55.45 1 1 1h5z"></path>
</svg>
              </div>
              <div className="logo-text">
                Pharma<span>24</span>
              </div>
            </div>
            <p className="footer-brand-text">
              Trouvez rapidement les pharmacies de garde au Bénin. 
              Réduisez les files d'attente et commandez vos médicaments à distance.
            </p>
          </div>

          {/* Colonne Liens Rapides */}
          <div className="footer-col">
            <h4>Liens rapides</h4>
            <div className="footer-links">
              <Link href="/pharmacies">Pharmacies de garde</Link>
              <Link href="/carte">Carte interactive</Link>
              <Link href="/scanner">Scanner un médicament</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* Colonne Légal */}
          <div className="footer-col">
            <h4>Légal</h4>
            <div className="footer-links">
              <Link href="/tos">Conditions d'utilisation</Link>
              <Link href="/privacy">Politique de confidentialité</Link>
            </div>
          </div>

          {/* Colonne Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-links">
              <div className="footer-contact-item">
                <i className='bx bx-map'></i>
                <span>Cotonou, Bénin</span>
              </div>
              <div className="footer-contact-item">
                <i className='bx bx-phone'></i>
                <span>+229 XX XX XX XX</span>
              </div>
              <div className="footer-contact-item">
                <i className='bx bx-envelope'></i>
                <span>contact@pharma24.bj</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bas du footer */}
        <div className="footer-bottom">
          <p>© 2026 Pharma24. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};