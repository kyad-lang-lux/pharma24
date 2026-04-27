"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Bloc de données structuré selon la hiérarchie du Bénin
const BENIN_DATA = [
  {
    departement: "ATLANTIQUE",
    communes: [
      {
        nom: "Abomey-Calavi",
        villes: [
          {
            nom: "Godomey",
            quartiers: [
              "Salamey",
              "Togoudo",
              "Houèdonou",
              "Cocotomey",
              "Fidjrossè-Kpota",
              "Découngbé",
              "Denou",
              "Hevié-Adovié",
            ],
          },
          {
            nom: "Abomey-Calavi",
            quartiers: [
              "Zogbadjè",
              "Tankpè",
              "Sèmè",
              "Tokpa-Zoungo",
              "Grawi",
              "Kansounkpa",
            ],
          },
          { nom: "Akassato", quartiers: ["Glo-Djigbé", "Missébo", "Zopah"] },
        ],
      },
      {
        nom: "Ouidah",
        villes: [
          {
            nom: "Ouidah Centre",
            quartiers: ["Sogbadji", "Toutche", "Fonsaramè", "Zoungbodji"],
          },
          { nom: "Pahou", quartiers: ["Houndjava", "Acadjamè", "Kpovié"] },
        ],
      },
    ],
  },
  {
    departement: "LITTORAL",
    communes: [
      {
        nom: "Cotonou",
        villes: [
          {
            nom: "1er Arrondissement",
            quartiers: ["Dandji", "Donaten", "Finagnon", "Tchanhounkpami"],
          },
          {
            nom: "6ème Arrondissement",
            quartiers: ["Aidjèdo", "Hindé", "Ladji", "Vêdoko"],
          },
          {
            nom: "9ème Arrondissement",
            quartiers: ["Fifadji", "Ménontin", "Zogbo", "Zogbohouè"],
          },
          {
            nom: "12ème Arrondissement",
            quartiers: ["Fidjrossè", "Agla", "Akogbato", "Cadjèhoun"],
          },
        ],
      },
    ],
  },
  {
    departement: "OUÉMÉ",
    communes: [
      {
        nom: "Porto-Novo",
        villes: [
          {
            nom: "Arrondissements 1-5",
            quartiers: [
              "Agbokou",
              "Djassin",
              "Tokpota",
              "Ayélawadjè",
              "Houinmè",
              "Kandévié",
              "Louho",
            ],
          },
        ],
      },
      {
        nom: "Sèmè-Kpodji",
        villes: [
          {
            nom: "Agblangandan",
            quartiers: ["PK10", "Cité de l'Espoir", "Gbagla"],
          },
          { nom: "Ekpè", quartiers: ["Ekpè-Hadjaho", "Tchonvi", "Djeffa"] },
        ],
      },
    ],
  },
  {
    departement: "BORGOU",
    communes: [
      {
        nom: "Parakou",
        villes: [
          {
            nom: "Arrondissements 1-3",
            quartiers: [
              "Albarika",
              "Amanwignon",
              "Bakpérou",
              "Tibona",
              "Titirou",
              "Yarakinnin",
            ],
          },
        ],
      },
    ],
  },
  {
    departement: "ZOU",
    communes: [
      {
        nom: "Bohicon",
        villes: [
          {
            nom: "Bohicon Centre",
            quartiers: ["Agbanwémè", "Gnidjazoun", "Sogba", "Kpocon"],
          },
        ],
      },
      {
        nom: "Abomey",
        villes: [
          { nom: "Vidolè", quartiers: ["Goho", "Djègbé", "Hountondji"] },
        ],
      },
    ],
  },
  {
    departement: "MONO",
    communes: [
      {
        nom: "Lokossa",
        villes: [
          { nom: "Lokossa Centre", quartiers: ["Agonvè", "Glo", "Sèhou-Laba"] },
        ],
      },
    ],
  },
  {
    departement: "ALIBORI",
    communes: [
      {
        nom: "Kandi",
        villes: [
          {
            nom: "Kandi Centre",
            quartiers: ["Baobab", "Madina", "Pèpère-Béri"],
          },
        ],
      },
    ],
  },
  {
    departement: "ATACORA",
    communes: [
      {
        nom: "Natitingou",
        villes: [
          {
            nom: "Natitingou Centre",
            quartiers: ["Kantaborifa", "Ourou-Boni", "Yelwa"],
          },
        ],
      },
    ],
  },
  {
    departement: "DONGA",
    communes: [
      {
        nom: "Djougou",
        villes: [
          {
            nom: "Djougou Centre",
            quartiers: ["Kamouhoun", "Madina", "Taïfa"],
          },
        ],
      },
    ],
  },
  {
    departement: "COLLINES",
    communes: [
      {
        nom: "Dassa-Zoumè",
        villes: [
          { nom: "Dassa Centre", quartiers: ["Arigbo", "Esso", "Zongo"] },
        ],
      },
    ],
  },
  {
    departement: "PLATEAU",
    communes: [
      {
        nom: "Pobè",
        villes: [
          { nom: "Pobè Centre", quartiers: ["Issaba", "Oke-Ola", "Towé"] },
        ],
      },
    ],
  },
  {
    departement: "COUFFO",
    communes: [
      {
        nom: "Aplahoué",
        villes: [
          {
            nom: "Aplahoué Centre",
            quartiers: ["Azovè", "Kissamey", "Godohou"],
          },
        ],
      },
    ],
  },
];

export default function HomePage() {
  const [selDept, setSelDept] = useState("");
  const [selCommune, setSelCommune] = useState("");
  const [selVille, setSelVille] = useState("");
  const [selQuartier, setSelQuartier] = useState("");

  // Options filtrées
  const currentDept = BENIN_DATA.find((d) => d.departement === selDept);
  const currentCommune = currentDept?.communes.find(
    (c) => c.nom === selCommune,
  );
  const currentVille = currentCommune?.villes.find((v) => v.nom === selVille);

  return (
    <main>
      <section className="hero">
        <div className="container hero-container">
          {/* Contenu Texte */}
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fa-solid fa-star-of-life"></i>
              🇧🇯 Pharmacies de garde au Bénin
            </div>

            <h1>
              Une pharmacie <span className="green">de</span> <br />
              <span className="green">garde</span> en quelques <br />
              secondes.
            </h1>

            <p className="hero-description">
              Localisez les pharmacies ouvertes près de chez vous, commandez par
              WhatsApp, payez par MoMo et passez juste récupérer.
            </p>

            <div className="hero-actions">
              <Link href="/pharmacies" className="btn-primary">
                <i className="fa-solid fa-magnifying-glass"></i>
                Voir les pharmacies
              </Link>

              <Link href="/carte" className="btn-secondary">
                <i className="fa-solid fa-location-dot"></i>
                Voir la carte
              </Link>
            </div>

            <div className="hero-features">
              <div className="feature-item">
                <i className="fa-regular fa-circle-check"></i>
                100% gratuit
              </div>
              <div className="feature-item">
                <i className="fa-regular fa-circle-check"></i>
                Mise à jour 24/7
              </div>
              <div className="feature-item">
                <i className="fa-regular fa-circle-check"></i>
                Sans inscription
              </div>
            </div>
          </div>

          {/* Image et Badges Flottants */}
          <div className="hero-image-wrapper">
            <img
              src="/img/img1.png"
              alt="Pharmacien servant un client au Bénin"
              className="main-hero-img"
            />

            {/* Badge De Garde */}
            <div className="badge-float badge-garde">
              <div className="icon-box bg-blue">
                <i className="fa-solid fa-bolt-lightning"></i>
              </div>
              <div className="badge-text">
                <span>De garde</span>
                <strong>24h / 24</strong>
              </div>
            </div>

            {/* Badge WhatsApp */}
            <div className="badge-float badge-whatsapp">
              <div className="icon-box">
                <img src="/whatsapp.png" alt="WA" width="30" />
              </div>
              <div className="badge-text">
                <span>Commande</span>
                <strong>via WhatsApp</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
 
<br />
   <br />
   
  
      <section className="search-section">
        <div className="container">
          <div className="search-card">
            <div className="search-header-badge">Recherche rapide</div>
            <h2 className="search-title">Où cherchez-vous une pharmacie ?</h2>

            <div className="search-grid">
              {/* Département */}
              <div className="select-wrapper">
                <select
                  value={selDept}
                  onChange={(e) => {
                    setSelDept(e.target.value);
                    setSelCommune("");
                    setSelVille("");
                    setSelQuartier("");
                  }}
                >
                  <option value="">Département</option>
                  {BENIN_DATA.map((d) => (
                    <option key={d.departement} value={d.departement}>
                      {d.departement}
                    </option>
                  ))}
                </select>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              {/* Commune - Débloqué si selDept n'est pas vide */}
              <div className="select-wrapper">
                <select
                  value={selCommune}
                  onChange={(e) => {
                    setSelCommune(e.target.value);
                    setSelVille("");
                    setSelQuartier("");
                  }}
                  disabled={selDept === ""}
                >
                  <option value="">Commune</option>
                  {currentDept?.communes.map((c) => (
                    <option key={c.nom} value={c.nom}>
                      {c.nom}
                    </option>
                  ))}
                </select>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              {/* Ville / Arrondissement - Débloqué si selCommune n'est pas vide */}
              <div className="select-wrapper">
                <select
                  value={selVille}
                  onChange={(e) => {
                    setSelVille(e.target.value);
                    setSelQuartier("");
                  }}
                  disabled={selCommune === ""}
                >
                  <option value="">Ville (Arrond.)</option>
                  {currentCommune?.villes.map((v) => (
                    <option key={v.nom} value={v.nom}>
                      {v.nom}
                    </option>
                  ))}
                </select>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              {/* Quartier - Débloqué si selVille n'est pas vide */}
              <div className="select-wrapper">
                <select
                  value={selQuartier}
                  onChange={(e) => setSelQuartier(e.target.value)}
                  disabled={selVille === ""}
                >
                  <option value="">Quartier</option>
                  {currentVille?.quartiers.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            <button className="btn-search-submit" disabled={!selDept}>
              <i className="fa-solid fa-location-crosshairs"></i>
              Trouver une pharmacie
            </button>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
<section className="stats-section">
  <div className="container stats-grid">
    
    <div className="stat-card">
      <div className="stat-icon-wrapper">
        <i className="fa-solid fa-location-dot"></i>
      </div>
      <div className="stat-content">
        <span className="stat-number">120+</span>
        <span className="stat-label">Pharmacies référencées</span>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon-wrapper">
        <i className="fa-solid fa-users"></i>
      </div>
      <div className="stat-content">
        <span className="stat-number">15 000+</span>
        <span className="stat-label">Utilisateurs actifs</span>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon-wrapper">
        <i className="fa-solid fa-clock"></i>
      </div>
      <div className="stat-content">
        <span className="stat-number">24/7</span>
        <span className="stat-label">Service disponible</span>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon-wrapper">
        <i className="fa-solid fa-star"></i>
      </div>
      <div className="stat-content">
        <span className="stat-number">4.8/5</span>
        <span className="stat-label">Note moyenne</span>
      </div>
    </div>

  </div>
</section>

{/* Section Pourquoi Pharma24 - Titre */}
<section className="features-intro">
  <span className="badge-light">Pourquoi Pharma24 ?</span>
  <h2>Les problèmes que nous résolvons</h2>
  <p>Une solution pensée pour les patients du Bénin, simple et accessible à tous.</p>
</section>

{/* Bloc 1 : Réduire les files d'attente (Image à droite) */}
<section className="feature-block">
  <div className="container feature-grid">
    <div className="feature-text">
      <div className="feature-icon-box">
        <i className="fa-regular fa-comment-dots"></i>
      </div>
      <h3>Réduisez les files d'attente</h3>
      <p>
        Plus besoin d'attendre longtemps en pharmacie. Commandez vos médicaments 
        à distance par WhatsApp, payez par MoMo et passez juste récupérer votre 
        commande déjà préparée.
      </p>
    </div>
    <div className="feature-image">
      <img src="/img/img2.png" alt="Réduisez les files d'attente" />
    </div>
  </div>
</section>

{/* Bloc 2 : Trouver la pharmacie (Image à gauche) */}
<section className="feature-block reverse">
  <div className="container feature-grid">
    <div className="feature-image">
      <img src="/img/img3.png" alt="Trouvez la pharmacie" />
    </div>
    <div className="feature-text">
      <div className="feature-icon-box">
        <i className="fa-regular fa-map"></i>
      </div>
      <h3>Trouvez la pharmacie de garde près de chez vous</h3>
      <p>
        Identifiez en un clin d'œil les pharmacies ouvertes ou de garde dans votre quartier, 
        votre ville ou votre commune. Fini les déplacements inutiles vers des pharmacies fermées.
      </p>
    </div>
  </div>
</section>

{/* Bloc 3 : Tous les contacts (Image à droite) */}
<section className="feature-block">
  <div className="container feature-grid">
    <div className="feature-text">
      <div className="feature-icon-box">
        <i className="fa-solid fa-phone-volume"></i>
      </div>
      <h3>Tous les contacts à portée de main</h3>
      <p>
        Téléphone, WhatsApp, numéro MoMo, lien Google Maps : tout est disponible 
        directement sur la fiche de chaque pharmacie. Appelez ou écrivez en un seul tap.
      </p>
    </div>
    <div className="feature-image">
      <img src="/img/img4.png" alt="Contacts à portée de main" />
    </div>
  </div>
</section>


<section className="how-it-works">
  <div className="container">
    <div className="section-header">
      <span className="badge-light">Étapes simples</span>
      <h2>Comment ça marche ?</h2>
      <p>Trois étapes rapides pour obtenir vos médicaments sans stress.</p>
    </div>

    <div className="steps-grid">
      {/* Étape 1 */}
      <div className="step-card">
        <div className="step-number">01</div>
        <div className="step-icon">
          <i className="fa-solid fa-magnifying-glass-location"></i>
        </div>
        <h4>Recherchez</h4>
        <p>Sélectionnez votre zone pour trouver les pharmacies de garde ouvertes.</p>
      </div>

      {/* Étape 2 */}
      <div className="step-card">
        <div className="step-number">02</div>
        <div className="step-icon">
          <i className="fa-brands fa-whatsapp"></i>
        </div>
        <h4>Commandez</h4>
        <p>Contactez la pharmacie via WhatsApp pour envoyer votre ordonnance.</p>
      </div>

      {/* Étape 3 */}
      <div className="step-card">
        <div className="step-number">03</div>
        <div className="step-icon">
          <i className="fa-solid fa-truck-medical"></i>
        </div>
        <h4>Récupérez</h4>
        <p>Payez par MoMo et passez récupérer votre commande sans attendre.</p>
      </div>
    </div>
  </div>
</section>




<section className="cta-section">
  <div className="container">
    <div className="cta-card">
      <div className="cta-content">
        <span className="cta-badge">Prêt à commencer ?</span>
        <h2>Trouvez votre pharmacie de garde en un clic</h2>
        <p>
          Rejoignez des milliers d'utilisateurs au Bénin qui simplifient leur accès 
          aux soins de santé. Rapide, gratuit et sans inscription.
        </p>
        
        <div className="cta-buttons">
  {/* Redirection vers la page des pharmacies */}
  <Link href="/pharmacies" className="btn-primary-white">
    <i className="fa-solid fa-magnifying-glass"></i>
    Trouver une pharmacie
  </Link>

  {/* Lien direct vers WhatsApp */}
  <Link 
    href="/contact" 
    target="_blank" 
    className="btn-outline-white"
  >
    <i className="fa-brands fa-whatsapp"></i>
    Nous contacter
  </Link>
</div>
      </div>
      
      {/* Éléments décoratifs animés en arrière-plan de la carte */}
      <div className="cta-circle circle-1"></div>
      <div className="cta-circle circle-2"></div>
    </div>
  </div>
</section>

<section className="testimonials-section">
  <div className="container">
    <div className="section-header">
      <span className="badge-light">Témoignages</span>
      <h2>Ce que disent nos utilisateurs</h2>
      <p>Des centaines de personnes utilisent Pharma24 chaque jour pour simplifier leur quotidien.</p>
    </div>

    <div className="testimonials-track">
      {/* On met deux fois le même groupe pour créer la boucle infinie */}
      {[1, 2].map((i) => (
        <div className="testimonials-group" key={i}>
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar-circle bg-blue">KA</div>
              <div>
                <h4>Koffi Agossou</h4>
                <span>Cotonou, Littoral</span>
              </div>
            </div>
            <p>"Grâce à Pharma24, j'ai trouvé une pharmacie de garde à minuit pour mon fils sans avoir à faire le tour de la ville."</p>
            <div className="stars">
              {[...Array(5)].map((_, idx) => <i key={idx} className="fa-solid fa-star"></i>)}
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar-circle bg-green">SD</div>
              <div>
                <h4>Sika Dossou</h4>
                <span>Abomey-Calavi</span>
              </div>
            </div>
            <p>"Le fait de pouvoir commander par WhatsApp et payer par MoMo change tout. C'est un gain de temps énorme."</p>
            <div className="stars">
              {[...Array(5)].map((_, idx) => <i key={idx} className="fa-solid fa-star"></i>)}
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar-circle bg-orange">MT</div>
              <div>
                <h4>Marc Tognon</h4>
                <span>Porto-Novo</span>
              </div>
            </div>
            <p>"Interface simple et efficace. Je recommande Pharma24 à tous mes proches au Bénin."</p>
            <div className="stars">
              {[...Array(5)].map((_, idx) => <i key={idx} className="fa-solid fa-star"></i>)}
            </div>
          </div>
          
          {/* Ajoute tes autres cartes ici si besoin, elles seront dupliquées automatiquement par le .map */}
        </div>
      ))}
    </div>
  </div>
</section>







<section className="faq-section">
  <div className="container">
    <div className="section-header">
      <h2>Questions fréquentes</h2>
      <p>Tout ce que vous devez savoir sur Pharma24</p>
    </div>

    <div className="faq-container">
      {/* Question 1 */}
      <details className="faq-item">
        <summary>
          Comment trouver une pharmacie de garde ?
          <i className="fa-solid fa-chevron-down"></i>
        </summary>
        <div className="faq-content">
          <p>
            Il vous suffit d'utiliser notre barre de recherche rapide en haut de la page. 
            Sélectionnez votre ville ou quartier pour voir instantanément les pharmacies 
            ouvertes actuellement près de chez vous.
          </p>
        </div>
      </details>

      {/* Question 2 */}
      <details className="faq-item">
        <summary>
          Comment commander mes médicaments via WhatsApp ?
          <i className="fa-solid fa-chevron-down"></i>
        </summary>
        <div className="faq-content">
          <p>
            Sur la fiche de la pharmacie choisie, cliquez sur le bouton "Commander via WhatsApp". 
            Vous serez redirigé vers une discussion sécurisée pour envoyer votre ordonnance 
            ou votre liste de produits.
          </p>
        </div>
      </details>

      {/* Question 3 */}
      <details className="faq-item">
        <summary>
          Est-ce que le service est payant pour les patients ?
          <i className="fa-solid fa-chevron-down"></i>
        </summary>
        <div className="faq-content">
          <p>
            Non, l'utilisation de Pharma24 pour rechercher une pharmacie et consulter les 
            horaires de garde est 100% gratuite pour tous les utilisateurs au Bénin.
          </p>
        </div>
      </details>

      {/* Question 4 */}
      <details className="faq-item">
        <summary>
          Quels sont les moyens de paiement acceptés ?
          <i className="fa-solid fa-chevron-down"></i>
        </summary>
        <div className="faq-content">
          <p>
            Lorsque vous commandez à distance, vous pouvez régler vos achats via Mobile Money 
            (MoMo ou Flooz) directement avec la pharmacie avant de passer récupérer votre commande.
          </p>
        </div>
      </details>

      {/* Question 5 */}
      <details className="faq-item">
        <summary>
          Comment fonctionne le scanner de médicaments ?
          <i className="fa-solid fa-chevron-down"></i>
        </summary>
        <div className="faq-content">
          <p>
            Le scanner vous permet d'identifier un médicament à partir de sa boîte pour 
            obtenir des informations sur sa posologie et vérifier sa disponibilité dans 
            les pharmacies partenaires.
          </p>
        </div>
      </details>
    </div>
  </div>
</section>






    </main>
  );
}
