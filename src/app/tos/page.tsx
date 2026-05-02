"use client";
import React from 'react';
// import { useState, useEffect } from "react";
export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="container-small">
        <div className="legal-header">
          <span className="badge-legal">
            <i className="fa-solid fa-file-contract"></i> Légal
          </span>
          <h1>Conditions d'utilisation</h1>
          <p className="last-update">Dernière mise à jour : 27 avril 2026</p>
        </div> 

        <div className="legal-content">
          <section>
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (« CGU ») encadrent l'utilisation de la plateforme 
              <strong> Pharma24</strong>, accessible en ligne et destinée à mettre en relation les utilisateurs (patients) 
              et les pharmacies situées au Bénin, en particulier pour identifier les pharmacies de garde, leurs horaires, 
              et faciliter la prise de contact et réduire les files d'attentes. 
            </p>
          </section>

          <section>
            <h2>2. Acceptation</h2>
            <p>
              L'accès et l'utilisation de la plateforme impliquent l'acceptation pleine et entière des présentes CGU. 
              Si vous n'acceptez pas ces conditions, vous devez cesser immédiatement l'utilisation du service.
            </p>
          </section>

          <section>
            <h2>3. Services proposés</h2>
            <p>Pharma24 propose notamment :</p>
            <ul>
              <li>La consultation des pharmacies de garde et de leurs horaires ;</li>
              <li>La localisation des pharmacies sur une carte interactive ;</li>
              <li>La prise de contact directe avec les pharmacies (téléphone, WhatsApp, itinéraire) ;</li>
              <li>La consultation d'informations indicatives de posologie ;</li>
              <li>Un espace de gestion réservé aux pharmacies abonnées.</li>
            </ul>
          </section>

          <section>
            <h2>4. Compte pharmacie et abonnement</h2>
            <p>
              Les pharmacies peuvent créer un compte afin de référencer leur établissement. La visibilité publique 
              de la fiche pharmacie est conditionnée à un abonnement actif. Deux formules sont proposées :
            </p>
            <div className="pricing-mini-grid">
              <div className="pricing-mini-card">
                <strong>Mensuel</strong>
              </div>
              <div className="pricing-mini-card">
                <strong>Annuel</strong>
              </div>
            </div>
            <p>
              Une fois dans leurs espaces, le pharmacie peuvent gérer son abonnement selon le plan qui lui convient.
            </p>
          </section>

          <section>
            <h2>5. Obligations des utilisateurs</h2>
            <p>L'utilisateur (pharmacie) s'engage à :</p>
            <ul>
              <li>Fournir des informations exactes et à jour ;</li>
              <li>Ne pas détourner la plateforme de sa finalité ;</li>
              <li>Ne pas tenter d'accéder à des données ou comptes ne lui appartenant pas ;</li>
              <li>Respecter les lois en vigueur au Bénin.</li>
            </ul>
          </section>

          <section>
            <h2>6. Obligations des pharmacies</h2>
            <p>
              Chaque pharmacie est responsable des informations qu'elle publie (coordonnées, horaires de garde, 
              numéro MoMo, etc.). Elle doit :
            </p>
            <ul>
              <li>Tenir ses horaires à jour, en particulier les périodes de garde ;</li>
              <li>Respecter la réglementation pharmaceutique en vigueur ;</li>
              <li>Répondre dans des délais raisonnables aux sollicitations légitimes des patients ou des clients.</li>
            </ul>
          </section>

          <section className="alert-box">
            <h2>7. Informations de posologie</h2>
            <p>
              Les informations de posologie présentées sur Pharma24 sont fournies à titre indicatif et pédagogique. 
              Elles ne constituent en aucun cas un avis médical et ne remplacent pas la consultation d'un professionnel 
              de santé. <strong>En cas de doute, consultez un médecin ou un pharmacien.</strong>
            </p>
          </section>


          <section>
            <h2>8. Responsabilité</h2>
            <p>
              Pharma24 met en œuvre les moyens raisonnables pour assurer la disponibilité du service mais ne 
              saurait être tenue responsable des interruptions, erreurs ou inexactitudes dans les données fournies 
              par les pharmacies, ni des préjudices directs ou indirects liés à l'utilisation du service.
            </p>
          </section>

          <section>
            <h2>9. Suspension et résiliation</h2>
            <p>
              Pharma24 se réserve le droit de suspendre ou supprimer un compte en cas de manquement aux présentes 
              CGU, d'informations frauduleuses ou de comportement nuisant à la plateforme ou à ses utilisateurs.
            </p>
          </section>

          <section>
            <h2>10. Modification des CGU</h2>
            <p>
              Pharma24 peut modifier les présentes CGU à tout moment. Les nouvelles conditions s'appliquent 
              dès leur publication sur la plateforme.
            </p>
          </section>

          <section>
            <h2>11. Droit applicable</h2>
            <p>
              Les présentes CGU sont soumises au droit béninois.
            </p>
          </section>

          <section className="contact-legal">
            <h2>13. Contact</h2>
            <p>
              Pour toute question relative aux présentes CGU, écrivez-nous à : 
              <a href="mailto:contact24pharma@gmail.com"> contact24pharma@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
      <div className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  {/* <i className='bx bx-shape-triangle'></i> */}
  <i className="fa-solid fa-play triangle-up"></i>
</div>
    </main>
  );
}