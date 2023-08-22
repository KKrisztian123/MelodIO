import Carousel, { CarouselItem } from "@components/Carosuel/Carousel";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import usePlayHistory from "@features/PlayHistory/hooks/usePlayHistory";
import HistoryCard from "../HistoryCard/HistoryCard";

const HistoryList = () => {
  const { playHistory } = usePlayHistory();
  return (
    <Content>
      <Carousel>
        {playHistory.map((historyItem,index) => (
          <CarouselItem key={historyItem}>
            <HistoryCard albumId={historyItem} index={index} />
          </CarouselItem>
        ))}
      </Carousel>
    </Content>
  );
};

export default HistoryList;