import { useEffect, useState } from "react";
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

  //const inputRef = useRef()

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    console.log(url, API_URL);
    const response = await fetch(`${API_URL}/${url}`);
    const data = await response.json();
    console.log(data);
    setCards(data);
    return data;
  });

  useEffect(() => {
    getQuestions("react");
  }, []);

  // const testRefHandler = () => {
  //   console.log("ref", inputRef.current.value);
  // };

  const onSearchChangeHandler = (evt) => {
    setSearchValue(evt.target.value);
    console.log(searchValue);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler}/>
      </div>
      {/* <input type="text" ref={inputRef} />
      <button onClick={testRefHandler}>test ref</button> */}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {!isLoading && <QuestionCardList cards={cards} />}
    </>
  );
};
