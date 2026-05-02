import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="container-small">
        <div className="legal-header">
          <span className="badge-legal">
            <i className="fa-solid fa-shield-halved"></i> Confidentialité
          </span>
          <h1>Politique de confidentialité</h1>
          <p className="last-update">Dernière mise à jour : 27 avril 2026</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Pharma24 attache la plus grande importance à la protection de votre vie privée. 
              La présente politique décrit les données que nous collectons, la manière dont elles sont utilisées, 
              et les droits dont vous disposez sur ces données.
            </p>
          </section>

          <section>
            <h2>2. Données collectées</h2>
            <p>Nous collectons uniquement les données strictement nécessaires au fonctionnement du service :</p>
            <ul>
              <li>
                <strong>Pour les pharmacies :</strong> nom de l'établissement, département, commune, ville, 
                quartier, téléphone, WhatsApp, numéro MoMo, lien Google Maps, horaires de garde, e-mail du compte.
              </li>
              <li>
                <strong>Pour les utilisateurs :</strong> aucune donnée personnelle n'est requise pour consulter les pharmacies. 
                Une géolocalisation peut être demandée, avec votre accord, pour centrer la carte.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Finalités</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul>
              <li>Permettre aux utilisateurs de trouver une pharmacie de garde et de la contacter ;</li>
              <li>Gérer le compte pharmacie et l'abonnement (crédits, statut actif/inactif) ;</li>
              <li>Améliorer le service et mesurer son utilisation de manière agrégée ;</li>
              <li>Répondre à vos demandes de support.</li>
            </ul>
          </section>

          <section>
            <h2>4. Base légale</h2>
            <p>
              Le traitement de vos données repose sur l'exécution du contrat (utilisation du service), 
              votre consentement (géolocalisation), et notre intérêt légitime à assurer la sécurité et 
              l'amélioration de la plateforme.
            </p>
          </section>

          <section>
            <h2>5. Destinataires</h2>
            <p>
              Vos données ne sont jamais vendues. Elles peuvent être traitées par nos prestataires techniques 
              (hébergement, base de données, authentification) dans le strict cadre du fonctionnement du service. 
              Les informations publiques de la fiche pharmacie sont accessibles à tout utilisateur de la plateforme.
            </p>
          </section>

          <section>
            <h2>6. Durée de conservation</h2>
            <p>
              Les données du compte pharmacie sont conservées tant que le compte est actif. Elles sont supprimées 
              sur demande ou après une période d'inactivité prolongée. Les compteurs de vues sont conservés sous 
              forme agrégée.
            </p>
          </section>

          <section>
            <h2>7. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données : 
              chiffrement des connexions (HTTPS), authentification sécurisée, contrôle d'accès strict aux données 
              via des règles de sécurité au niveau base de données.
            </p>
          </section>

          <section>
            <h2>8. Vos droits</h2>
            <p>Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
            <ul>
              <li>Droit d'accès à vos données ;</li>
              <li>Droit de rectification ;</li>
              <li>Droit à l'effacement (« droit à l'oubli ») ;</li>
              <li>Droit d'opposition et de limitation du traitement ;</li>
              <li>Droit à la portabilité de vos données.</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à : 
              <a href="mailto:contact24pharma@gmail.com" className="text-green"> contact24pharma@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2>9. Cookies</h2>
            <p>
              Pharma24 utilise uniquement des cookies techniques nécessaires au fonctionnement du service 
              (session, préférences). Aucun cookie publicitaire ou de pistage tiers n'est déposé sans votre consentement.
            </p>
          </section>

          <section>
            <h2>10. Modifications</h2>
            <p>
              La présente politique peut être mise à jour. La date de dernière modification est indiquée en haut de la page.
            </p>
          </section>

          <section className="contact-legal">
            <h2>11. Contact</h2>
            <p>
              Pour toute question, écrivez-nous à : 
              <a href="mailto:contact24pharma@gmail.com"> contact24pharma@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}