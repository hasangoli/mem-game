import { SetStateAction, useEffect, useState } from 'react';
import Card from './components/Card';
import shuffle from './utils/shuffle';

type CardPropsType = {
  image: string;
  id: number;
  matched?: boolean;
};

const App = () => {
  const [cards, setCards] = useState<CardPropsType[]>(shuffle);
  const [pickOne, setPickOne] = useState<CardPropsType | null>(null);
  const [pickTwo, setPickTwo] = useState<CardPropsType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [wins, setWins] = useState<number>(0);

  const handleClick = (card: SetStateAction<CardPropsType | null>) => {
    if (!disabled) pickOne ? setPickTwo(card) : setPickOne(card);
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    let pickTimer: NodeJS.Timeout;

    if (pickOne && pickTwo) {
      if (pickOne?.image === pickTwo?.image) {
        setCards(prevCards => {
          return prevCards?.map(card => {
            if (card?.image === pickOne?.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

  useEffect(() => {
    const checkWin = cards?.filter(card => !card?.matched);

    if (cards?.length && checkWin?.length < 1) {
      console.log('You Win!');
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, wins]);

  return (
    <div className='grid'>
      {cards?.map(card => {
        const { image, id, matched } = card;
        return (
          <Card
            key={id}
            image={image}
            selected={card === pickOne || card === pickTwo || matched}
            onClick={() => handleClick(card)}
          />
        );
      })}
    </div>
  );
};

export default App;
