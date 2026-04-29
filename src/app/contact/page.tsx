import React from 'react';

export default function ContactPage() {
  return (
    <section className="contact-section">
      <div className="container">
        {/* En-tête */}
        <div className="contact-header">
          <h1>Contactez-nous</h1>
          <p>Une question ? N'hésitez pas à nous contacter.</p>
        </div>

        <div className="contact-grid">
          {/* Colonne Gauche : Informations */}
          <div className="contact-info-card">
            <div className="info-item">
              <div className="info-icon">
                <i className='bx bx-phone'></i>
              </div>
              <div className="info-text">
                <span>Téléphone</span>
                <p>+229 01 48 52 29 26</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className='bx bxl-whatsapp'></i>
              </div>
              <div className="info-text">
                <span>WhatsApp</span>
                <p>+229 01 48 52 29 26</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className='bx bx-envelope'></i>
              </div>
              <div className="info-text">
                <span>Email</span>
                <p>contact@pharma24.bj</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className='bx bx-map'></i>
              </div>
              <div className="info-text">
                <span>Adresse</span>
                <p>Cotonou, Bénin</p>
              </div>
            </div>

            <a
  href="https://wa.me/2290148522926"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-call"
>
  <i className='bx bxl-whatsapp'></i> Contacter maintenant
</a>
          </div>

          {/* Colonne Droite : Formulaire */}
          <div className="contact-form-card">
            <h3>Envoyez-nous un message</h3>
            <form>
              <div className="input-group">
                <input type="text" placeholder="Votre nom" required />
              </div>
              <div className="input-group">
                <input type="email" placeholder="Votre email" required />
              </div>
              <div className="input-group">
                <textarea placeholder="Votre message" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn-submit">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}