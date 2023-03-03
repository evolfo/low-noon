import "./style";
import { useEffect, useState } from "preact/hooks";
import Router, { route, getCurrentUrl } from "preact-router";
import Home from "./routes/home/Home";
import ThomasGWeed from "./routes/thomasGweed/ThomasGweed";

export default function App() {
  const [isLightSwitchOn, setIsLightSwitchOn] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleLightswitchClick = () => {
    setIsLightSwitchOn(!isLightSwitchOn);
  };

  useEffect(() => {
	if (getCurrentUrl() === "/thomasGweed") {
		setIsLightSwitchOn(true)
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 200)
	}
  }, [])

  useEffect(() => {
    isLightSwitchOn ? route("/thomasGweed") : route("/");
	// Added loading to dependency array as hacky way to force to render component
  }, [loading, isLightSwitchOn]);

  if (loading) {
	return
  }

  return (
    <div className="home-container">
      <div className="header-text">
	  	{isLightSwitchOn ? <h1>THOMAS G WEED</h1> : <h1>Rafferty Swink</h1>}
        {isLightSwitchOn ? null : <h3>Musician, Producer, Mixer</h3>}
        <a href="mailto:rswinkmusic@gmail.com">
          <button>Contact</button>
        </a>
      </div>
      <Router>
        {isLightSwitchOn ? (
          <ThomasGWeed
            path="/thomasGweed"
            isLightSwitchOn={isLightSwitchOn}
            handleLightswitchClick={handleLightswitchClick}
          />
        ) : (
          <Home
            path="/"
            isLightSwitchOn={isLightSwitchOn}
            handleLightswitchClick={handleLightswitchClick}
          />
        )}
      </Router>
	  <div onClick={handleLightswitchClick} className="lightswitch-container">
		  <h5>TGW</h5>
          {isLightSwitchOn ? (
            <img alt="Lightswitch is on" src="/assets/lightswitch-on.png" />
          ) : (
            <img alt="Lightswitch is off" src="/assets/lightswitch-off.png" />
          )}
		  <h5>LN</h5>
        </div>
      {isLightSwitchOn ? (
        <div className="background-image-blue" />
      ) : (
        <div className="background-image" />
      )}
    </div>
  );
}
