import { IonPage } from "@ionic/react";
import CenteredTextContainer from "../components/CenteredTextContainer";
import "./Search.css";
import PageContent from "../components/Layout/Frame/PageContent/PageContent";
import Search from "../components/Search/Search";
import Content from "../components/Layout/Frame/ContentContainer/Content";
import { useState } from "react";

const SearchPage: React.FC = () => {
  const [result, setResult] = useState<false | []>(false);
  
  const fetchResult = (e: { target: { value: string } }) => {
    const value = e.target.value.trim();
    setResult(value ? []: false);
  };

  return (
    <IonPage>
      <PageContent hasExternalHeader>
        <Content>
          <Search
            onChange={fetchResult}
            placeholder="Előadók, albumok és dalok"
          />
        </Content>
        <Content>
          <CenteredTextContainer
            visible={result === false}
            title="Kezdj keresni"
            description="Keress rá előadókra, dalokra és albumokra."
          />
        </Content>
      </PageContent>
    </IonPage>
  );
};

export default SearchPage;
