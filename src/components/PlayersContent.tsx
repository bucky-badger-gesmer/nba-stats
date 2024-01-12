import { ApolloError } from "@apollo/client";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { useState } from "react";
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
                    <IonImg
                      src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.id}.png`}
                      alt={`${player.firstName} ${player.lastName} Avatar`}
                    ></IonImg>
                  </IonAvatar>
                  {player.firstName} {player.lastName}
                </IonItem>
              </VirtualScrollChild>
            );
          })}
      </IonList>
      <IonModal
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
        <IonContent className="ion-padding">
          {selectedPlayer !== null && (
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <IonImg
                  src={`https://cdn.nba.com/headshots/nba/latest/260x190/${selectedPlayer.id}.png`}
                  alt={`${selectedPlayer.firstName} ${selectedPlayer.lastName} Avatar`}
                ></IonImg>
              </IonAvatar>
              {selectedPlayer.firstName} {selectedPlayer.lastName}
            </IonItem>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default PlayersContent;
