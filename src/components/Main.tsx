import { useEffect, useState } from "react";
import styled from "styled-components";
import CardContainer from "./Gameboard/";
import Header from "./Header";
import { createPokemon } from "../utils";
import { shuffleArray } from "../utils";
import { MouseEvent } from "react";
import Scoreboard from "./Scoreboard/";

export default function Main() {
  const [pokemon, setPokemon] = useState([{}]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemonSelected, setPokemonSelected] = useState<string[]>([""]);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setPokemon(await createPokemon(9));
      setIsLoading(false);
    })();
  }, []);

  const handleGame = (id: string) => {
    if (pokemonSelected.includes(id)) {
      resetGame();
    } else {
      const newScore = currentScore + 1;
      if (newScore > bestScore) setBestScore(newScore);
      setCurrentScore((prevScore) => prevScore + 1);
      setPokemonSelected([...pokemonSelected, id]);
      setGameOver(false);
    }
  };

  const resetGame = () => {
    setPokemonSelected([""]);
    setCurrentScore(0);
    setGameOver(true);
  };

  const handleClick = async (e: MouseEvent) => {
    const { id } = e.target as HTMLTextAreaElement;
    handleGame(id);
    setPokemon(shuffleArray(pokemon));
  };

  return (
    <>
      <Header />
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <MainWrapper>
        {isLoading && <h1>Loading..</h1>}
        {!isLoading && (
          <CardContainer pokemonList={pokemon} handleClick={handleClick} />
        )}
      </MainWrapper>
    </>
  );
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
