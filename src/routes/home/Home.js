import { useEffect, useMemo, useState } from "react";

const Home = () => {
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

    console.log(tempAlbum, idx)

    tempAlbumData.map((album) => (album.opacity = 0));

    tempAlbum.opacity = 1;
    tempAlbumData[idx] = tempAlbum;

    setAlbumData(tempAlbumData);
  };

  const renderCards = useMemo(
    () =>
      albumData?.map((album, idx) => {
        if (true) {
          return (
            <div
              id={`album-${album.id}`}
              className="album-container"
              key={album.id}
            >
              <img src={`/assets/albums/${album.id}.jpg`}></img>
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
          );
        } else {
          return (
            <div
              id={`album-${album.id}`}
              className="album-container"
              key={album.id}
            >
              <a href={album.url} target="_blank" rel="noopenner noreferrer">
                <img src={`/assets/albums/${album.id}.jpg`}></img>
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
    <div className="home-container">
      <div className="header-text">
        <h1>Rafferty Swink</h1>
        <h3>Musician, Producer, Mixer</h3>
        <a href="mailto:rswinkmusic@gmail.com">
          <button>Contact</button>
        </a>
      </div>
      {renderCards}
    </div>
  );
};

export default Home;
