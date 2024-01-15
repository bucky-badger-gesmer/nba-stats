import { useQuery } from "@apollo/client";
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { PlayersContent } from "../components";
import { GET_PLAYER_INDEX } from "../queries";

const Players: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [historic, setHistoric] = useState(true);
  const { loading, error, data } = useQuery(GET_PLAYER_INDEX);

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value);
  };

  const handleToggleInactive = () => {
    setHistoric(!historic);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-margin ion-padding" slot="start">
            Players
          </IonTitle>
          <IonToggle
            className="ion-margin ion-padding"
            slot="end"
            onIonChange={handleToggleInactive}
            labelPlacement="stacked"
          >
            Historic
          </IonToggle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            animated={true}
            placeholder="Search Players"
            onIonInput={(e) => handleSearch(e)}
            value={searchTerm}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeLg="6">
              <PlayersContent
                loading={loading}
                error={error}
                data={data}
                searchTerm={searchTerm}
                historic={historic}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Players;
