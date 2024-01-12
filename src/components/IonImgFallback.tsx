import { IonImg } from "@ionic/react";
import { useState } from "react";

interface IonImgFallbackProps {
  src: string;
  alt: string;
}

const IonImgFallback: React.FC<IonImgFallbackProps> = ({
  src,
  alt,
}: IonImgFallbackProps) => {
  const [currentSrc, setCurretSrc] = useState(src);
  const fallbackSrc = "https://ionicframework.com/docs/img/demos/avatar.svg";

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurretSrc(fallbackSrc);
    }
  };

  return <IonImg src={currentSrc} alt={alt} onIonError={handleError}></IonImg>;
};

export default IonImgFallback;
