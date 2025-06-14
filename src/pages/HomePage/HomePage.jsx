import { useEffect, useState, useMemo, useRef } from "react";
import { Loader } from "../../components/Loader";
import { API_URL } from "../../constants";
import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../components/QuestionCardList";
//import { delayFn } from "../../helpers/delayFn";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const controlsContainerRef = useRef();
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [cards, setCards] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const data = await response.json();
    setCards(data);
    return data;
  });

  const questions = useMemo(() => {
    if (cards?.data) {
      if (searchValue.trim()) {
        return cards.data.filter((card) => card.question.toLowerCase().includes(searchValue.trim()));
      } else {
        return cards.data;
      }
    }
    return [];
  }, [cards, searchValue]);

  const pagination = useMemo(() => {
    const totalCardsCount = cards?.pages || 0;
    return Array(totalCardsCount)
      .fill(0)
      .map((_, idx) => idx + 1);
  }, [cards]);

  useEffect(() => {
    getQuestions(`react/${searchParams}`);
    //getQuestions(`react/?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  }, [searchParams]);

  const onSearchChangeHandler = (evt) => {
    setSearchValue(evt.target.value);
  };

  const onSortChangeHandler = (evt) => {
    setSortSelectValue(evt.target.value);
    setSearchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${evt.target.value}`);
  };

  const paginationHandler = (evt) => {
    if (evt.target instanceof HTMLButtonElement) {
      setSearchParams(`?_page=${evt.target.textContent}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`);
      controlsContainerRef.current.scrollIntoView({behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
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
      <QuestionCardList cards={questions} />
      {questions.length === 0 ? (
        <p className={cls.noCards}>No cards...</p>
      ) : (
        <div className={cls.paginationContainer} onClick={paginationHandler}>
          {pagination.map((el) => (
            <Button key={el} isActive={el === +searchParams[searchParams.indexOf("=") + 1]}>
              {el}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};
