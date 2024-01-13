import { useQuery } from "@apollo/client";
import {
  IonButtons,
  IonCard,
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
  const { loading, error, data } = useQuery(GET_PLAYER_INDEX);

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value);
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
                  <IonGrid>
                    <IonRow>
                      <IonCol className="ion-align-self-center">
                        <IonSearchbar
                          animated={true}
                          placeholder="Search"
                          onIonInput={(e) => handleSearch(e)}
                          value={searchTerm}
                        ></IonSearchbar>
                      </IonCol>
                      <IonCol size="auto" className="ion-align-self-center">
                        <IonToggle labelPlacement="stacked">
                          Include Inactive
                        </IonToggle>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardHeader>
                <PlayersContent
                  loading={loading}
                  error={error}
                  data={data}
                  searchTerm={searchTerm}
                />
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Players;
