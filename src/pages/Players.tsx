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
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { PlayersContent } from "../components";
import { GET_PLAYER_INDEX } from "../queries";

const Players: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(GET_PLAYER_INDEX);

  const handleSearch = (event: CustomEvent) => {
    const searchTerm = event.detail.value;
    // const filteredPlayers = data.playerIndex.filter((player: any) => {
    //   const playerName =
    //     `${player.firstName} ${player.lastName}`.toLocaleLowerCase();

    //   return playerName.includes(searchTerm);
    // });
    // console.log("poopee", filteredPlayers);

    setSearchTerm(event.detail.value);
  };

  console.log("searchterm", searchTerm);

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
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonSearchbar
                    animated={true}
                    placeholder="Search"
                    onIonInput={(e) => handleSearch(e)}
                    value={searchTerm}
                  ></IonSearchbar>
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
