import { IonPage } from "@ionic/react";
import "./Search.css";
import PageContent from "../components/Layout/Frame/PageContent/PageContent";
import { Search, useSearch, useSearchContext } from "@features/Search";

const SearchPage: React.FC = () => {
  const search = useSearch("search", { method: "GET", endpoint: "/search" });
  
  return (
    <IonPage >
      <PageContent hasExternalHeader fullWidth>
        <Search
          {...search}
          placeholder="Előadók, albumok és dalok"
          emptyText="Kezdj keresni"
          emptyDescription={"Keress rá előadókra, dalokra és albumokra."}
        >
          <SearchResult/>
        </Search>
      </PageContent>
    </IonPage>
  );
};

const SearchResult = () => {
  const {result} = useSearchContext();
  console.log(result)
  return <div></div>;
};

export default SearchPage;
