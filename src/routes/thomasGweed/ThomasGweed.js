import { useEffect, useMemo, useState } from "preact/hooks";
import browserEnv from 'browser-env';

const ThomasGWeed = ({ isLightSwitchOn, handleLightswitchClick }) => {
  const [albumData, setAlbumData] = useState([]);

  useEffect(() => {
    fetch("/assets/thomasGweedData.json")
      .then((resp) => resp.json())
      .then((albumData) => {
        setAlbumData(albumData);
      });
  }, []);

  const handleAlbumClickMobile = (idx) => {
    const tempAlbumData = [...albumData];
    const tempAlbum = { ...tempAlbumData[idx] };

    tempAlbumData.map((album) => (album.opacity = 0));

    tempAlbum.opacity = 1;
    tempAlbumData[idx] = tempAlbum;

    setAlbumData(tempAlbumData);
  };

  const renderCards = useMemo(
    () =>
      albumData?.map((album, idx) => {
        if (/Mobi|Android/i.test(browserEnv['navigator'].userAgent)) {
          return (
            <>
              {idx === 5 && (
                <div onClick={handleLightswitchClick} className="lightswitch-container lightswitch-mobile">
                  <h5>TGW</h5>
                      {isLightSwitchOn ? (
                        <img alt="Lightswitch is on" src="/assets/lightswitch-on.png" />
                      ) : (
                        <img alt="Lightswitch is off" src="/assets/lightswitch-off.png" />
                      )}
                  <h5>LN</h5>
                </div>
              )}
              <div
                id={`album-${album.id}`}
                className="album-container"
                key={album.id}
              >
                <img
                  alt={`${album.title} album title artwork.`}
                  src={`/assets/thomasGweed/covers/${album.id}.jpg`}
                ></img>
                <div
                  onClick={() => handleAlbumClickMobile(idx)}
                  className="overlay"
                  style={{ opacity: album.opacity }}
                >
                  <div className="album-text">
                    <p>{album.title}</p>
                    <p>{album.description}</p>
                    <p>
                      <a
                        download
                        target="_blank"
                        href={album.url}
                      >
                        Listen
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        } else {
          return (
            <div
              id={`album-${album.id}`}
              className="album-container"
              key={album.id}
            >
              <a target="_blank" href={album.url} download>
                <img
                  alt={`${album.title} album title artwork.`}
                  src={`/assets/thomasGweed/covers/${album.id}.jpg`}
                ></img>
                <div className="overlay">
                  <div className="album-text">
                    <p>{album.title}</p>
                    <p>{album.description}</p>
                  </div>
                </div>
              </a>
            </div>
          );
        }
      }),
    [albumData]
  );

  return <>{renderCards}</>;
};

export default ThomasGWeed;
