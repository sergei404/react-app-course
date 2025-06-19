import { useActionState } from "react";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import cls from "./EditQuestionPage.module.css";
import { Button } from "../../components/Button";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { delayFn } from "../../helpers/delayFn";
import { dateFormat } from "../../helpers/dateFormat";

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
  const [formState, formAction, isPending] = useActionState(editCardAction, { ...initialState, clearForm: false });
  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
        <Button>✖</Button>
        <QuestionForm formState={formState} formAction={formAction} isPending={isPending} submitBtnText="Edit Question" />
      </div>
    </>
  );
};
