import {
  Answer,
  AnswerType,
  ChoiceAnswer,
  QuestionDTO,
  WrittenAnswer,
} from "../../types";
import { QuestionFormInput } from "./QuestionForm";

export const SINGLE_CHOICE = 1;
export const MULTIPLE_CHOICE = 2;

export const mapToAddQuestionDto = (input: QuestionFormInput): QuestionDTO => ({
  content: input.content,
  categories: input.categories.map((c) => +c),
  answer: mapAnswer(input),
});

const mapAnswer = (input: QuestionFormInput): WrittenAnswer | ChoiceAnswer => {
  const answerType = input.answerType;
  if (answerType === "Single choice" || answerType === "Multiple choice") {
    return {
      type: "choice",
      choiceAnswerType:
        answerType === "Single choice" ? SINGLE_CHOICE : MULTIPLE_CHOICE,
      allValidChoicesRequired: true,
      choices: input.choices,
      score: input.score,
    };
  }
  return {
    type: "written",
    content: input.writtenAnswerContent,
    score: input.score,
  };
};

const defaultChoices = [
  { content: "", valid: false },
  { content: "", valid: false },
];

export const mapToQuestionFormInput = (
  question: QuestionDTO
): QuestionFormInput => {
  const answerType = getAnswerType(question.answer);
  return {
    content: question.content,
    categories: question.categories.map((c) => c.toString()),
    answerType: answerType,
    choices:
      answerType === "Written"
        ? defaultChoices
        : (question.answer as ChoiceAnswer).choices,
    score: question.answer.score,
    writtenAnswerContent:
      answerType === "Written"
        ? (question.answer as WrittenAnswer).content
        : "",
  };
};

const getAnswerType = (answer: Answer): AnswerType => {
  if (answer.type === "written") return "Written";
  const choiceAnswer = answer as ChoiceAnswer;
  if (choiceAnswer.choiceAnswerType === 1) return "Single choice";
  else return "Multiple choice";
};
