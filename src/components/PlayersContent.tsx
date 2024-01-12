import { useQuery } from "@apollo/client";
import LoadingSpinner from "./LoadingSpinner";
import { IonAvatar, IonImg, IonItem, IonList } from "@ionic/react";
import { GET_PLAYER_INDEX } from "../queries";

const PlayersContent: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PLAYER_INDEX);

  if (loading || data === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <IonList>
      {data.playerIndex.map((player: any) => {
        return (
          <IonItem>
            <IonAvatar aria-hidden="true" slot="start">
              <IonImg
                src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.id}.png`}
                alt={`${player.firstName} ${player.lastName} Avatar`}
              ></IonImg>
            </IonAvatar>
            {player.firstName} {player.lastName}
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default PlayersContent;
