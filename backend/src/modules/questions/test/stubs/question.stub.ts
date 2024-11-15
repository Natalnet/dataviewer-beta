import { QuestionsByDifficulty } from "src/modules/questions/schemas/questionsbydifficulty.schema";

export const questionStub = (): QuestionsByDifficulty => {
  return {
    question_id: '100',
    percentage: 23.5
  }
}