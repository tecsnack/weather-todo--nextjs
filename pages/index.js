// pages/index.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getWeatherData } from '../utils/api';
import LocationInput from '../components/LocationInput';
import WeatherDisplay from '../components/WeatherDisplay';
import {
  Container,
  Header,
  InputForm,
  Loading,
  ErrorMessage,
} from '../styles'; // Importieren Sie die Styles aus Ihrer style.js-Datei

const Home = () => {
  const [location, setLocation] = useState(''); // State für die Suchlokation

  const { data, error, isLoading } = useQuery('weatherData', () =>
    getWeatherData(location)
  );

  const handleSearch = (newLocation) => {
    setLocation(newLocation); // Aktualisieren Sie den Suchort im State
  };

  return (
    <Container>
      <Header>Wat den dat für Wedder hier?</Header>
      <LocationInput onSearch={handleSearch} />
      <InputForm>
        {/* Fügen Sie onSubmit und preventDefault hinzu, um das Formular nicht zu senden */}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Suche nach Ort"
        />
        <button type="submit" onClick={() => handleSearch(location)}>
          Suchen
        </button>
      </InputForm>
      {isLoading ? <Loading>Laden...</Loading> : null}
      {error ? <ErrorMessage>Absturz der Wetterinformationstauben</ErrorMessage> : null}
      <WeatherDisplay weatherData={data} />
    </Container>
  );
};

export default Home;
