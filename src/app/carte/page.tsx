"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// 1. Chargement dynamique des composants Leaflet et du Cluster
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { 
  ssr: false,
  loading: () => <div className="map-loading">Chargement de la carte...</div>
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

// Import dynamique du Cluster Group
const MarkerClusterGroup = dynamic(() => import('react-leaflet-cluster'), { ssr: false });

export default function PharmacyMap() {
  const [mounted, setMounted] = useState(false);
  const [icons, setIcons] = useState<{ green: any, red: any } | null>(null);

  useEffect(() => {
    setMounted(true);

    const L = require('leaflet');
    
    // Icône verte pour les pharmacies ouvertes
    const green = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      className: 'marker-ouvert' // On peut ajouter une classe pour du CSS personnalisé
    });

    // Icône rouge pour les pharmacies fermées
    const red = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    setIcons({ green, red });
  }, []);

  const position: [number, number] = [6.3654, 2.4183]; // Cotonou

  // Liste des pharmacies (tu peux en ajouter beaucoup plus pour voir l'effet cluster)
  const pharmacies = [
    { id: 1, name: "Pharmacie Camp Guezo", pos: [6.358, 2.420] as [number, number], status: 'ouvert' },
    { id: 2, name: "Pharmacie Saint Jean", pos: [6.368, 2.430] as [number, number], status: 'ferme' },
    { id: 3, name: "Pharmacie de l'Étoile", pos: [6.370, 2.432] as [number, number], status: 'ouvert' },
    { id: 4, name: "Pharmacie Fidjrossè", pos: [6.361, 2.380] as [number, number], status: 'ouvert' },
  ];

  if (!mounted) return <div className="map-loading">Initialisation de la carte...</div>;

  return (
    <section className="map-section">
      <div className="container">
        <div className="contact-header">
          <h1>Carte des pharmacies</h1>
          <p>Les pharmacies proches sont regroupées pour une meilleure visibilité.</p>
          <div className="map-legend">
            <span className="legend-item"><span className="dot green"></span> Ouvert</span>
            <span className="legend-item"><span className="dot red"></span> Fermé</span>
          </div>
        </div>

        <div className="map-wrapper" style={{ height: "550px", width: "100%", borderRadius: "20px", overflow: "hidden" }}>
          {icons && (
            <MapContainer 
              center={position} 
              zoom={13} 
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* MarkerClusterGroup enveloppe tes marqueurs pour les mettre en évidence */}
              <MarkerClusterGroup 
                chunkedLoading 
                maxClusterRadius={50}
              >
                {pharmacies.map((pharma) => (
                  <Marker 
                    key={pharma.id} 
                    position={pharma.pos}
                    icon={pharma.status === 'ouvert' ? icons.green : icons.red}
                  >
                    <Popup>
                      <div className="popup-content">
                        <strong>{pharma.name}</strong> <br /> 
                        <span className={`status-badge ${pharma.status}`}>
                          {pharma.status === 'ouvert' ? 'Ouvert 24h/24' : 'Fermé actuellement'}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          )}
        </div>
      </div>
    </section>
  );
}