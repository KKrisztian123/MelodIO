import { Search, useFilterWithFetch } from "@features/Search";
import { wordFilter } from "@features/Search/utils/utils";
import { PropsWithChildren } from "react";

const filterFunction = (value: Album, condition: string) =>
  wordFilter(value.name, condition);
  
const ArtistSearch = ({ children }: PropsWithChildren) => {
  const filter = useFilterWithFetch("filter", {
    endpoint: "/artists",
    method: "GET",
    filterFunc: filterFunction,
  });
  return (
    <Search
      emptyText="Nincs találat"
      emptyDescription={"Nem találtunk ilyen előadót."}
      placeholder="Előadó"
      {...filter}
    >
      {children}
    </Search>
  );
};

export default ArtistSearch;
