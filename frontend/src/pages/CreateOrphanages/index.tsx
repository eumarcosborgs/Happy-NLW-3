import React, { FormEvent, ChangeEvent, useCallback, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Sidebar from '../../components/Sidebar';
import { mapIcon } from '../../utils/mapIcon';

import { Container, InputBlock, Main } from './styles';

const CreateOrphanage: React.FC = () => {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const handleSetMarker = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setPosition({ latitude: lat, longitude: lng });
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const { latitude, longitude } = position;

      const data = new FormData();
      data.append('name', name);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('about', about);
      data.append('instructions', instructions);
      data.append('opening_hours', opening_hours);
      data.append('open_on_weekends', String(open_on_weekends));

      images.forEach(image => {
        data.append('images', image);
      });

      await api.post('orphanages', data);

      alert('Cadastro realizado com sucesso!');

      history.push('/home');
    },
    [
      about,
      name,
      position,
      instructions,
      open_on_weekends,
      opening_hours,
      images,
      history,
    ],
  );

  const handleInputFiles = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      const selectedImages = Array.from(event.target.files);

      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image);
      });

      setImagesPreview(selectedImagesPreview);
    },
    [],
  );

  return (
    <Container>
      <Sidebar />
      <Main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-19.6772007, -51.1878715]}
              style={{ width: '100%', height: 280 }}
              zoom={16}
              onClick={handleSetMarker}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TOKEN_MAP}`}
              />
              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <InputBlock>
              <input
                placeholder="Nome"
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <textarea
                placeholder="Sobre"
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <div className="images-container">
                {imagesPreview.map(image => {
                  return <img key={image} src={image} alt={name} />;
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input multiple onChange={handleInputFiles} type="file" id="image[]" />
              </div>
            </InputBlock>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <InputBlock>
              <textarea
                placeholder="Instruções"
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <input
                placeholder="Horário de abertura"
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </InputBlock>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </Main>
    </Container>
  );
};

export default CreateOrphanage;
// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
