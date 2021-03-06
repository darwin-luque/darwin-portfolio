import { useEffect, useState } from 'react';
import { useWindowSize } from '@darwin-portfolio/react/hooks';
import axios, { AxiosResponse } from 'axios';
import { Carousel } from '@darwin-portfolio/react/ui';
import TrackCard from '../../track-card/track-card';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getNewReleasesAction } from '../../../store/actions/music.action';
import { Country, GeolocationResponse } from '../../../types';

const NewReleasesGallery = () => {
  const { tokens } = useAppSelector((state) => state.auth);
  const { newReleases, loading } = useAppSelector((state) => state.music);
  const [countryCode, setCountryCode] = useState<Country>();
  const [gettingLocation, setGettingLocation] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  useEffect(() => {
    if (
      !!tokens.firebase &&
      !!tokens.spotify &&
      newReleases.length === 0 &&
      !gettingLocation
    ) {
      dispatch(getNewReleasesAction(tokens, countryCode));
    }
  }, [tokens, newReleases.length, gettingLocation, countryCode, dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const success: PositionCallback = async (pos) => {
        const geolocation: AxiosResponse<GeolocationResponse> = await axios.get(
          `${process.env['NX_GEOLOCATION']}&lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
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
    });

    return () => clearTimeout(timeoutId);
  }, []);

  const trackCardMinWidth = 300;
  const perPage = Math.floor((width ?? 0) / trackCardMinWidth);

  return (
    <Carousel
      loading={loading.newRelease}
      data={newReleases}
      perPage={perPage}
      ElementTemplate={TrackCard}
      itemMinWidth={trackCardMinWidth}
    />
  );
};

export default NewReleasesGallery;
