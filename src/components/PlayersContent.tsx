import { ApolloError } from "@apollo/client";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFab,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Tag } from "antd";
import { close } from "ionicons/icons";
import { useState } from "react";
import IonImgFallback from "./IonImgFallback";
import LoadingSpinner from "./LoadingSpinner";
import VirtualScrollChild from "./VirtualScrollChild";

interface PlayersContentProps {
  loading: boolean;
  error?: ApolloError;
  data?: any;
  searchTerm: string;
  includeInactive: boolean;
}

const PlayersContent: React.FC<PlayersContentProps> = ({
  loading,
  error,
  data,
  searchTerm,
  includeInactive,
}: PlayersContentProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (loading || data === undefined) {
    return <LoadingSpinner />;
  }

  const handlePlayerClick = (e: any) => {
    setSelectedPlayer(e);
    setIsOpen(true);
  };

  return (
    <>
      <IonList>
        {data.playerIndex
          .filter((player: any) => {
            if (includeInactive) {
              return player;
            } else {
              return player.active === true;
            }
          })
          .filter((player: any) => {
            const playerName =
              `${player.firstName} ${player.lastName}`.toLowerCase();
            return playerName.includes(searchTerm.toLowerCase());
          })
          .map((player: any, i: number) => {
            return (
              <VirtualScrollChild>
                <IonItem key={i} onClick={() => handlePlayerClick(player)}>
                  <IonAvatar aria-hidden="true" slot="start">
                    <IonImgFallback
                      src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.id}.png`}
                      alt={`${player.firstName} ${player.lastName} Avatar`}
                    ></IonImgFallback>
                  </IonAvatar>
                  <Tag color={player.active ? "green" : "volcano"}>
                    {player.active ? "Active" : "Inactive"}
                  </Tag>
                  <IonLabel>
                    {player.firstName} {player.lastName}
                  </IonLabel>
                </IonItem>
              </VirtualScrollChild>
            );
          })}
      </IonList>
      <IonModal
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        isOpen={isOpen}
        onDidDismiss={() => {
          setSelectedPlayer(null);
          setIsOpen(false);
        }}
      >
        {selectedPlayer !== null && (
          <>
            <IonHeader>
              <IonToolbar>
                <IonTitle>
                  {`${selectedPlayer.firstName} ${selectedPlayer.lastName}`}
                </IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsOpen(false)}>
                    <IonIcon icon={close} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonGrid>
                <IonRow className="ion-justify-content-center">
                  <IonCol>
                    <IonCard>
                      <IonImgFallback
                        src={`https://cdn.nba.com/headshots/nba/latest/260x190/${selectedPlayer.id}.png`}
                        alt={`${selectedPlayer.firstName} ${selectedPlayer.lastName} Avatar`}
                      ></IonImgFallback>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <div>
                          <IonText>
                            <p>Points</p>
                            <h3>{selectedPlayer.headlineStats.points}</h3>
                          </IonText>
                        </div>
                        <div>
                          <IonText>
                            <p>Rebounds</p>
                            <h3>{selectedPlayer.headlineStats.rebounds}</h3>
                          </IonText>
                        </div>
                        <div>
                          <IonText>
                            <p>Assists</p>
                            <h3>{selectedPlayer.headlineStats.assists}</h3>
                          </IonText>
                        </div>
                      </div>
                      <IonList>
                        <IonItem>
                          <IonText slot="start">Name</IonText>
                          <IonText slot="end">
                            {selectedPlayer.firstName} {selectedPlayer.lastName}
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Position</IonText>
                          <IonText slot="end">
                            {selectedPlayer.position}
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Height</IonText>
                          <IonText slot="end">{selectedPlayer.height}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Weight</IonText>
                          <IonText slot="end">{selectedPlayer.weight}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Country</IonText>
                          <IonText slot="end">{selectedPlayer.country}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Last Attended</IonText>
                          <IonText slot="end">{selectedPlayer.college}</IonText>
                        </IonItem>
                      </IonList>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
            <IonFab
              slot="fixed"
              vertical="bottom"
              horizontal="center"
              style={{ width: "100%" }}
            >
              <IonButton expand="full" shape="round">
                Player Details
              </IonButton>
            </IonFab>
          </>
        )}
      </IonModal>
    </>
  );
};

export default PlayersContent;
