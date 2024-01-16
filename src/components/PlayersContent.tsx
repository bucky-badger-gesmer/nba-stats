import { ApolloError } from "@apollo/client";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { useState } from "react";
import { groupPlayersByLastName } from "../utils/helpers";
import IonImgFallback from "./IonImgFallback";
import LoadingSpinner from "./LoadingSpinner";

interface PlayersContentProps {
  loading: boolean;
  error?: ApolloError;
  data?: any;
  searchTerm: string;
  historic: boolean;
}

const PlayersContent: React.FC<PlayersContentProps> = ({
  loading,
  error,
  data,
  searchTerm,
  historic,
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

  const renderDraftInfo = () => {
    if (selectedPlayer.draft.year === null) {
      return "Undrafted";
    } else {
      if (
        selectedPlayer.draft.round === null ||
        selectedPlayer.draft.year === null
      ) {
        return selectedPlayer.draft.year;
      } else {
        return `${selectedPlayer.draft.year} R${selectedPlayer.draft.round} Pick ${selectedPlayer.draft.pick}`;
      }
    }
  };

  const formatHeight = () => {
    const parts = selectedPlayer.height.split("-");

    const feet = parseInt(parts[0], 10);
    const inches = parseInt(parts[1], 10);
    return <>{`${feet}' ${inches}"`}</>;
  };

  const grouped = groupPlayersByLastName(
    data.playerIndex
      .filter((player: any) => {
        if (historic) {
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
  );

  return (
    <>
      <IonList>
        {Object.keys(grouped).map((key) => {
          return (
            <IonItemGroup key={key}>
              <IonItemDivider sticky={true}>{key}</IonItemDivider>
              {grouped[key].map((player) => {
                return (
                  <IonItem
                    key={player.id}
                    onClick={() => handlePlayerClick(player)}
                  >
                    <IonLabel>
                      {player.firstName} <strong>{player.lastName}</strong>
                    </IonLabel>
                    <IonChip color={player.active ? "success" : "warning"}>
                      {player.active ? "Active" : "Inactive"}
                    </IonChip>
                  </IonItem>
                );
              })}
            </IonItemGroup>
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
                      <IonButton
                        expand="full"
                        shape="round"
                        className="ion-padding"
                      >
                        Player Details
                      </IonButton>
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
                          <IonText slot="end">{formatHeight()}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Weight</IonText>
                          <IonText slot="end">
                            {selectedPlayer.weight} lbs
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Country</IonText>
                          <IonText slot="end">{selectedPlayer.country}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Last Attended</IonText>
                          <IonText slot="end">{selectedPlayer.college}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Draft</IonText>
                          <IonText slot="end">{renderDraftInfo()}</IonText>
                        </IonItem>
                        <IonItem>
                          <IonText slot="start">Career</IonText>
                          <IonText slot="end">
                            {selectedPlayer.career.fromYear} -{" "}
                            {selectedPlayer.active
                              ? "Present"
                              : selectedPlayer.career.toYear}
                          </IonText>
                        </IonItem>
                      </IonList>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
          </>
        )}
      </IonModal>
    </>
  );
};

export default PlayersContent;
