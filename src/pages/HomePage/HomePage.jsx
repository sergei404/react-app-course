import { useEffect, useState, useMemo } from "react";
import { Loader } from "../../components/Loader";
import { API_URL } from "../../constants";
import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../components/QuestionCardList";
//import { delayFn } from "../../helpers/delayFn";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";

export const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    console.log(url, API_URL);
    const response = await fetch(`${API_URL}/${url}`);
    const data = await response.json();
    setCards(data);
    return data;
  });

  const questions = useMemo(
    () => cards.filter((card) => card.question.toLowerCase().includes(searchValue.trim())),
    [cards, searchValue],
  );

  useEffect(() => {
    getQuestions(`react/?${sortSelectValue}`);
  }, [sortSelectValue]);

  const onSearchChangeHandler = (evt) => {
    setSearchValue(evt.target.value);
  };

  const onSortChangeHandler = (evt) => {
    console.log(evt.target.value);
    setSortSelectValue(evt.target.value);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
        <select onChange={onSortChangeHandler} value={sortSelectValue} className={cls.select}>
          <option value="">sort by</option>
          <hr />
          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">complited ASC</option>
          <option value="_sort=-completed">complited DESC</option>
        </select>
      </div>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {questions.length === 0 && <p className={cls.noCards}>No cards...</p>}
      {!isLoading && <QuestionCardList cards={questions} />}
    </>
  );
};
