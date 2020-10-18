import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import localMarkerImg from '../../images/map-marker.svg';
import { mapIcon } from '../../utils/mapIcon';
import api from '../../services/api';

import { Container } from './styles';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Orphanages: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);
  return (
    <Container>
      <aside>
        <header>
          <img src={localMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>

        <footer>
          <strong>Paranaíba</strong>
          <span>Mato Grosso do Sul</span>
        </footer>
      </aside>

      <Map
        center={[-19.6772007, -51.1878715]}
        zoom={16}
        style={{ width: '100%', height: '100%' }}
      >
        {/* {<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />} */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TOKEN_MAP}`}
        />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create">
        <FiPlus size={32} color="#fff" />
      </Link>
    </Container>
  );
};

export default Orphanages;
