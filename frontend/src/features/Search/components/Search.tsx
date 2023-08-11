import { PropsWithChildren, createContext } from "react";
import { searchConfig, useSearchProvider } from "../hooks/searchProvider";
import SearchField from "@components/Search/Search";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import SearchContent from "./SearchContent";
import { SearchContentProps } from "./SearchContent";

/** Search Provider */
export const SearchContext = createContext<
  ReturnType<typeof useSearchProvider>
>({} as ReturnType<typeof useSearchProvider>);

type SearchProps = SearchContentProps &
  searchConfig & {
    /** Sets the search mode.
     *
     *  When set to `search` it displays no results on empty input. This is the default operation mode.
     *
     * On `filter` mode it shows all result with an empty input. This mode only requests information on initial mount. */
    mode: "search" | "filter";

    /** Searchfield placeholder text. */
    placeholder: string;
  };

/** Compontent for searching or filtering in a list of content */
const SearchFeature = ({
  mode,
  children,
  placeholder,
  emptyText,
  emptyDescription,
  ...rest
}: PropsWithChildren<SearchProps>) => {
  const search = useSearchProvider(mode, {...rest});
  return (
    <SearchContext.Provider value={search}>
      <Content sidePadded>
        <SearchField onChange={search.fetch} placeholder={placeholder} />
      </Content>
      <SearchContent emptyText={emptyText} emptyDescription={emptyDescription} >{children}</SearchContent>
    </SearchContext.Provider>
  );
};

export default SearchFeature;
