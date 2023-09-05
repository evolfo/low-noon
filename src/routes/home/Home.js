import { useEffect, useMemo, useState } from "preact/hooks";

const Home = ({ isLightSwitchOn, handleLightswitchClick }) => {
  const [albumData, setAlbumData] = useState([]);

  // When you add new albums, don't forget to add the corresponding
  // CSS class at the bottom of style.css

  useEffect(() => {
    fetch("/assets/cardData.json")
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
        if (/Mobi|Android/i.test(navigator.userAgent)) {
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
                  src={`/assets/albums/${album.id}.jpg`}
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
                        href={album.url}
                        target="_blank"
                        rel="noopenner noreferrer"
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
              <a href={album.url} target="_blank" rel="noopenner noreferrer">
                <img
                  alt={`${album.title} album title artwork.`}
                  src={`/assets/albums/${album.id}.jpg`}
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

  return (
      <>{renderCards}</>
  );
};

export default Home;
