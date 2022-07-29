import {
  AnswerType,
  ChoiceAnswer,
  QuestionDTO,
  WrittenAnswer,
} from "features/questions/types";
import {
  mapToAddQuestionDto,
  MULTIPLE_CHOICE,
  SINGLE_CHOICE,
} from "./formInputMapper";
import { QuestionFormInput } from "./QuestionForm";

const getFormInput = (answerType: AnswerType): QuestionFormInput => {
  return {
    score: 2,
    content: "Question",
    writtenAnswerContent: "answer",
    answerType: answerType,
    choices: [
      { content: "Choice 1", valid: false },
      { content: "Choice 2", valid: true },
      { content: "Choice 3", valid: false },
      { content: "Choice 4", valid: false },
    ],
    categories: ["3", "5"],
  };
};

test("should map to QuestionDTO with WrittenAnswer", () => {
  const dto = mapToAddQuestionDto(getFormInput("Written"));
  const writtenAnswer: WrittenAnswer = {
    content: "answer",
    score: 2,
    type: "written",
  };
  const expectedDto: QuestionDTO = {
    content: "Question",
    answer: writtenAnswer,
    categories: [3, 5],
  };

  expect(dto).toStrictEqual(expectedDto);
});

test("should map to QuestionDTO with Single Choice Answer", () => {
  const dto = mapToAddQuestionDto(getFormInput("Single choice"));
  const singleChoiceAnswer: ChoiceAnswer = {
    score: 2,
    choices: [
      { content: "Choice 1", valid: false },
      { content: "Choice 2", valid: true },
      { content: "Choice 3", valid: false },
      { content: "Choice 4", valid: false },
    ],
    choiceAnswerType: SINGLE_CHOICE,
    allValidChoicesRequired: true,
    type: "choice",
  };
  const expectedDto: QuestionDTO = {
    content: "Question",
    answer: singleChoiceAnswer,
    categories: [3, 5],
  };

  expect(dto).toStrictEqual(expectedDto);
});

test("should map to QuestionDTO with Multiple Choice Answer", () => {
  const dto = mapToAddQuestionDto(getFormInput("Multiple choice"));
  const singleChoiceAnswer: ChoiceAnswer = {
    score: 2,
    choices: [
      { content: "Choice 1", valid: false },
      { content: "Choice 2", valid: true },
      { content: "Choice 3", valid: false },
      { content: "Choice 4", valid: false },
    ],
    choiceAnswerType: MULTIPLE_CHOICE,
    allValidChoicesRequired: true,
    type: "choice",
  };
  const expectedDto: QuestionDTO = {
    content: "Question",
    answer: singleChoiceAnswer,
    categories: [3, 5],
  };

  expect(dto).toStrictEqual(expectedDto);
});
