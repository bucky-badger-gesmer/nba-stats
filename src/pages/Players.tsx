import { useQuery } from "@apollo/client";
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
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
          <IonTitle>Players</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeLg="6">
              <IonCard>
                <IonCardHeader>
                  <IonGrid style={{ width: "100%" }}>
                    <IonRow className="ion-justify-content-center">
                      <IonCol size="9">
                        <IonSearchbar
                          animated={true}
                          placeholder="Search"
                          onIonInput={(e) => handleSearch(e)}
                          value={searchTerm}
                        ></IonSearchbar>
                      </IonCol>
                      <IonCol size="3">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        >
                          <IonToggle
                            labelPlacement="stacked"
                            checked={historic}
                            onIonChange={handleToggleInactive}
                          >
                            Historic
                          </IonToggle>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardHeader>
                <IonCardContent>
                  <PlayersContent
                    loading={loading}
                    error={error}
                    data={data}
                    searchTerm={searchTerm}
                    includeInactive={historic}
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Players;
