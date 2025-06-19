import { useActionState } from "react";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import cls from "./EditQuestionPage.module.css";
// import { Button } from "../../components/Button";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { delayFn } from "../../helpers/delayFn";
import { dateFormat } from "../../helpers/dateFormat";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const editCardAction = async (_prevState, formData) => {
  try {
    await delayFn();

    const resources = formData.get("resources").trim();
    const isClearForm = formData.get("clearForm");
    const questionId = formData.get("questionId");

    const res = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        question: formData.get("question"),
        answer: formData.get("answer"),
        description: formData.get("description"),
        resources: resources.length ? resources.split(",") : [],
        level: formData.get("level"),
        completed: formData.get("complited"),
        editDate: dateFormat(new Date()),
      }),
    });

    if (res.status === 404) {
      throw new Error(res.statusText);
    }
    const question = res.json();
    toast.success("The question is edited successfully!");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

export const EditQuestion = ({ initialState = {} }) => {
  const navigation = useNavigate();
  const [formState, formAction, isPending] = useActionState(editCardAction, { ...initialState, clearForm: false });

  const [removeQuestion, isQuestionRemoved] = useFetch(async () => {
    await fetch(`${API_URL}/react/${initialState.id}`, {
      method: "DELETE",
    });
    toast.success("The question has been successfully removed!");
    navigation("/");
  });

  const onRemoveQuestionHandler = () => {
    if (confirm("Ara you sure?")) {
      removeQuestion();
    }
  };

  return (
    <>
      {(isPending || isQuestionRemoved) && <Loader />}
      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
        <button className={cls.deleteCardBtn} disabled={isPending || isQuestionRemoved} onClick={onRemoveQuestionHandler}>
          ✖
        </button>
        <QuestionForm
          formState={formState}
          formAction={formAction}
          isPending={isPending || isQuestionRemoved}
          submitBtnText="Edit Question"
        />
      </div>
    </>
  );
};
