import { useEffect, useState } from "react";

const Home = () => {
    const [albumData, setAlbumData] = useState([])

    useEffect(() => {
        fetch('/assets/cardData.json')
            .then(resp => resp.json())
            .then(albumData => {
                setAlbumData(albumData)
            })
    }, [])

    const renderCards = () => (
        albumData?.reverse().map(album => {
            return (
                <div id={`album-${album.id}`} className="album-container" key={album.id}>
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
            )
        })
    )

	return (
		<div className="home-container">
			<h1>Low Noon</h1>
            {renderCards()}
		</div>
	);
}

export default Home