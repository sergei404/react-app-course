import { useActionState } from "react";
import cls from "./AddQuestionPage.module.css";
import { delayFn } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";

const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();

    const resources = formData.get("resources").trim();
    const isClearForm = formData.get("clearForm");

    const res = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: formData.get("question"),
        answer: formData.get("answer"),
        description: formData.get("description"),
        resources: resources.length ? resources.split(",") : [],
        level: Number(formData.get("level")),
        completed: false,
        editDate: undefined,
      }),
    });

    if (res.status === 404) {
      throw new Error(res.statusText);
    }
    const question = res.json();
    toast.success("New question is successfully created!");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: true });

  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
        <QuestionForm formState={formState} formAction={formAction} isPending={isPending} submitBtnText="Add Question" />
      </div>
    </>
  );
};

export default AddQuestionPage;
