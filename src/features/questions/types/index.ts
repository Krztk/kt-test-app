export type QuestionDTO = {
  content: string;
  categories: number[];
  answer: Answer;
};

export type QuestionHeaderDTO = {
  id: number;
  content: string;
  numberOfTimesUsedInTests: number;
  type: "Written" | "Single choice" | "Multiple choice";
};

export type Question = {
  id: number;
  content: string;
  categories: number[];
  answer: Answer;
};

export type Answer = WrittenAnswer | ChoiceAnswer;

export type WrittenAnswer = {
  type: "written";
  content: string;
  score: number;
};

export type ChoiceAnswer = {
  type: "choice";
  choiceAnswerType: number;
  allValidChoicesRequired: boolean;
  choices: Choice[];
  score: number;
};

export interface Choice {
  content: string;
  valid: boolean;
}
