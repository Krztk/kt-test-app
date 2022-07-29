import { AnswerType } from "../../types";
import { object, string, number, boolean, array } from "yup";

const choiceValidationSchema = object().shape({
  content: string().required().max(256).label("choice's content"),
  valid: boolean().required(),
});

export const validationSchema = object().shape({
  answerType: string().required(),
  content: string().required().max(512),
  score: number().required().min(0.5).max(20),
  writtenAnswerContent: string().when("answerType", {
    is: (answerType: AnswerType) => answerType === "Written",
    then: string().required().max(256),
  }),
  choices: array()
    .when("answerType", {
      is: (answerType: AnswerType) => answerType === "Single choice",
      then: array()
        .min(2)
        .of(choiceValidationSchema)
        .required()
        .test("only-1-valid", "1 valid choice is required", function (value) {
          let valid = 0;
          if (value) {
            for (const choice of value) {
              valid += choice.valid ? 1 : 0;
              if (valid > 1) return false;
            }
          }
          if (valid === 0) return false;
          return true;
        }),
    })
    .when("answerType", {
      is: (answerType: AnswerType) => answerType === "Multiple choice",
      then: array()
        .min(2)
        .of(choiceValidationSchema)
        .required()
        .test(
          "at-least-1-valid",
          "at least 1 valid choice is required",
          function (value) {
            if (value) {
              for (const choice of value) {
                if (choice.valid) return true;
              }
            }
            return false;
          }
        ),
    }),
});
