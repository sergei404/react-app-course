import { Link, useNavigate, useParams } from "react-router-dom";
import cls from "./QuestionPage.module.css";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { Loader, SmallLoader } from "../../components/Loader";

export const QuestionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isChecked, setIsChecked] = useState(true);
  const [card, setCard] = useState(null);

  const levelVariant = () => (card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert");
  const completedVariant = () => (card.completed ? "success" : "primary");

  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();
    setCard(data);
  });

  const [updateCard, isCardUpdated] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${card.id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isChecked }),
    });
    const data = await response.json();
    setCard(data);
  });

  useEffect(() => {
    fetchCard();
  }, []);

  useEffect(() => {
    card !== null && setIsChecked(card.completed);
  }, [card]);

  const checkboxChangeHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {isCardLoading && <Loader />}
      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>Level: {card.level}</Badge>
            <Badge variant={completedVariant()}>{card.completed ? "Completed" : "Not Completed"}</Badge>
            {card?.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
          </div>
          <h5 className={cls.cardTitle}>{card.question}</h5>
          <p className={cls.description}>{card.description}</p>
          <div className={cls.cardAnswers}>
            <label>short answer: </label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>
          <div>
            <h6 className={cls.cardLinksTitle}>Resources:</h6>
            <ul className={cls.cardLinks}>
              {card.resources.map((link, i) => {
                return (
                  <li key={i}>
                    <a href={link.trim()} target="_blank" rel="noreferrer">
                      {link.trim()}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <label className={cls.checkWrapper}>
            <input
              type="checkbox"
              className={cls.checkbox}
              checked={isChecked}
              onChange={checkboxChangeHandler}
              disabled={isCardUpdated}
            />
            <span>mark question as completed</span>
            {isCardUpdated && <SmallLoader />}
          </label>
          <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isCardUpdated}>
            Edit Question
          </Button>
          <Button onClick={() => navigate(`/`)} isDisabled={isCardUpdated}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};
