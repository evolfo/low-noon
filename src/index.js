import "./style";
import { useEffect, useState } from "preact/hooks";
import { route } from 'preact-router';
import Home from "./routes/home/Home";
import ThomasGWeed from "./routes/thomasGweed/thomasGweed";

export default function App() {
  const [isLightSwitchOn, setIsLightSwitchOn] = useState(false);

  const handleLightswitchClick = () => {
    setIsLightSwitchOn(!isLightSwitchOn);
    console.log(isLightSwitchOn);
  };

  return (
    <>
      <div>
        {isLightSwitchOn ? (
          <ThomasGWeed
            isLightSwitchOn={isLightSwitchOn}
            handleLightswitchClick={handleLightswitchClick}
          />
        ) : (
          <Home
            isLightSwitchOn={isLightSwitchOn}
            handleLightswitchClick={handleLightswitchClick}
          />
        )}
      </div>
      {isLightSwitchOn ? (
        <div className="background-image-blue" />
      ) : (
        <div className="background-image" />
      )}
    </>
  );
}
