import { QuestionDTO } from "features/questions";

export interface TestTemplateHeaderDTO {
  id: number;
  name: string;
  numberOfQuestions: number;
}

export interface AddTestTemplateDTO {
  name: string;
  questionIds: number[];
}

export interface TestTemplateDTO {
  id: number;
  name: string;
  questions: QuestionDTO[];
}
