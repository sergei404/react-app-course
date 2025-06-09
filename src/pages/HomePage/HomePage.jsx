import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { API_URL } from "../../constants";
// import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../components/QuestionCardList";
//import { delayFn } from "../../helpers/delayFn";
import { useFetch } from "../../hooks/useFetch";

export const HomePage = () => {
  const [cards, setCards] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const data = await response.json();
    console.log(data);
    setCards(data);
    return data;
  });

  // const getQuestions = async () => {
  //   try {
  //     setIsLoading(true);
  //     await delayFn();
  //     const res = await fetch(`${API_URL}/react`);
  //     const data = await res.json();
  //     setCards(data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    getQuestions("react");
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {!isLoading && <QuestionCardList cards={cards} />}
    </>
  );
};
