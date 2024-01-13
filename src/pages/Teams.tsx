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
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Teams: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Teams</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeLg="6">
              <IonCard>
                <IonCardHeader>
                  {/* <IonSearchbar
                    animated={true}
                    placeholder="Search"
                    onIonInput={(e) => handleSearch(e)}
                    value={searchTerm}
                  ></IonSearchbar> */}
                </IonCardHeader>
                {/* <PlayersContent
                  loading={loading}
                  error={error}
                  data={data}
                  searchTerm={searchTerm}
                /> */}
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Teams;
