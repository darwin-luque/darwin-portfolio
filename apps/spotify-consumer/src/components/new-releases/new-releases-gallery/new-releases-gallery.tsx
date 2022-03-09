import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Carousel } from '@darwin-portfolio/react/ui';
import TrackCard from '../../track-card/track-card';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getNewReleasesAction } from '../../../store/actions/music.action';
import { Country, GeolocationResponse } from '../../../types';

const NewReleasesGallery = () => {
  const { tokens } = useAppSelector((state) => state.auth);
  const { newReleases } = useAppSelector((state) => state.music);
  const [countryCode, setCountryCode] = useState<Country>();
  const [gettingLocation, setGettingLocation] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tokens && newReleases.length === 0 && !gettingLocation) {
      dispatch(getNewReleasesAction(tokens, countryCode));
    }
  }, [tokens, newReleases.length, gettingLocation]);

  useEffect(() => {
    const success: PositionCallback = async (pos) => {
      const geolocation: AxiosResponse<GeolocationResponse> = await axios.get(
        `${process.env['REACT_APP_GEOLOCATION']}&lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
      );
      setCountryCode(geolocation.data.countryCode);
    };

    const errors = () => setCountryCode(undefined);

    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        switch (result.state) {
          case 'granted':
            navigator.geolocation.getCurrentPosition(success);
            break;
          case 'prompt':
            navigator.geolocation.getCurrentPosition(success, errors, {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            });
            break;
          case 'denied':
          default:
            setCountryCode(undefined);
        }
        setGettingLocation(false);
      });
    }
  }, []);

  return (
    <Carousel data={newReleases} perPage={4} ElementTemplate={TrackCard} />
  );
};

export default NewReleasesGallery;
