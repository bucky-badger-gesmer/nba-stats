import { ApolloError } from "@apollo/client";
import { IonAvatar, IonImg, IonItem, IonList } from "@ionic/react";
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
  const [playersLoading, setPlayersLoading] = useState(true);
  const [allPlayers, setAllPlayers] = useState<any[]>([]);

  if (loading || data === undefined) {
    return <LoadingSpinner />;
  }

  // const players = data.playerIndex.filter((player: any) => {
  //   const playerName =
  //     `${player.firstName} ${player.lastName}`.toLocaleLowerCase();

  //   return playerName.includes(searchTerm);
  // });

  // console.log("players", players);
  console.log("content bay", searchTerm);
  return (
    <IonList>
      {data.playerIndex
        .filter((player: any) => {
          const playerName =
            `${player.firstName} ${player.lastName}`.toLocaleLowerCase();
          return playerName.includes(searchTerm);
        })
        .map((player: any) => {
          return (
            <VirtualScrollChild>
              <IonItem key={player.id}>
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
  );
};

export default PlayersContent;
