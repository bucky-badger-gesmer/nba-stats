import { ApolloError } from "@apollo/client";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
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
}

const PlayersContent: React.FC<PlayersContentProps> = ({
  loading,
  error,
  data,
  searchTerm,
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
                  {player.firstName} {player.lastName}
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
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <IonImgFallback
                  src={`https://cdn.nba.com/headshots/nba/latest/260x190/${selectedPlayer.id}.png`}
                  alt={`${selectedPlayer.firstName} ${selectedPlayer.lastName} Avatar`}
                ></IonImgFallback>
              </IonAvatar>
              {selectedPlayer.firstName} {selectedPlayer.lastName}
            </IonItem>
          )}
          <IonFooter>
            <IonButton expand="full">Player Details</IonButton>
          </IonFooter>
        </IonContent>
      </IonModal>
    </>
  );
};

export default PlayersContent;
