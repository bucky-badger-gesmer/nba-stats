import { ApolloError } from "@apollo/client";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFooter,
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
          .map((player: any) => {
            return (
              <VirtualScrollChild>
                <IonItem
                  key={player.id}
                  onClick={() => handlePlayerClick(player)}
                >
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
        initialBreakpoint={0.85}
        breakpoints={[0, 0.85]}
        isOpen={isOpen}
        onDidDismiss={() => {
          setSelectedPlayer(null);
          setIsOpen(false);
        }}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              {selectedPlayer !== null &&
                `${selectedPlayer.firstName} ${selectedPlayer.lastName}`}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" fullscreen>
          {selectedPlayer !== null && (
            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <IonCol>
                  <IonCard>
                    <IonImgFallback
                      src={`https://cdn.nba.com/headshots/nba/latest/260x190/${selectedPlayer.id}.png`}
                      alt={`${selectedPlayer.firstName} ${selectedPlayer.lastName} Avatar`}
                    ></IonImgFallback>
                    <IonList>
                      <IonItem>
                        <IonText slot="start">Name</IonText>
                        <IonText slot="end">
                          {selectedPlayer.firstName} {selectedPlayer.lastName}
                        </IonText>
                      </IonItem>
                      <IonItem>
                        <IonText slot="start">Position</IonText>
                        <IonText slot="end">{selectedPlayer.position}</IonText>
                      </IonItem>
                    </IonList>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
          <IonFooter>
            <IonButton expand="full" shape="round">
              Player Details
            </IonButton>
          </IonFooter>
        </IonContent>
      </IonModal>
    </>
  );
};

export default PlayersContent;
