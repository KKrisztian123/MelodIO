import CenteredTextContainer from "@components/CenteredTextContainer";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import { PropsWithChildren, ReactNode, useContext } from "react";
import { SearchContext } from "./Search";
import { ErrorText } from "@components/Text/ErrorText";
import { Loader } from "@components/Loaders/Loaders";
import CenteredContainer from "@components/Layout/Frame/CenteredContainer/CenteredContainer";

export type SearchContentProps = {
  /** Text title on empty result. */
  emptyText: string;
  /** Text description on empty result. */
  emptyDescription?: ReactNode;
};

/** Contains search results. */
const SearchContent = ({
  children,
  emptyText,
  emptyDescription,
}: PropsWithChildren<SearchContentProps>) => {
  const { result, error, isLoading } = useContext(SearchContext);
  const showEmpty = !error.errorContent && result === false;
  return (
    <Content>
      <CenteredTextContainer
        visible={!isLoading && showEmpty}
        title={emptyText}
        description={emptyDescription}
      />
      <ErrorText ref={error.ref}>{error.errorContent}</ErrorText>
      {isLoading && (
        <CenteredContainer>
          <Loader text="Keresés" />
        </CenteredContainer>
      )}
      {children}
    </Content>
  );
};

export default SearchContent;
