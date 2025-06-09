import { useEffect, useState } from "react";
// import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constans";
// import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../components/QuestionCardList";

export const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuestions = async () => {
    try {
      const res = await fetch(`${API_URL}/react`);
      const data = await res.json();
      setCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {/* <QuestionCard /> */}
      {/* {cards.map((card) => (
        <QuestionCard key={card.id} card={card} />
      ))} */}
      <QuestionCardList cards={cards} />
    </>
  );
};
