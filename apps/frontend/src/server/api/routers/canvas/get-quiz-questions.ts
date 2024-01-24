import { eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export async function getQuizQuestions({
  submissionId,
}: {
  submissionId: string;
}): Promise<QuizQuestion[]> {
  const session = await getServerAuthSession();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user.id || ""),
  });

  const data = await fetch(
    `https://knoxschools.instructure.com/api/v1/quiz_submissions/${submissionId}/questions?include=quiz_question`,
    {
      headers: {
        Authorization: `Bearer ${user?.canvasApiKey}`,
      },
    },
  ).then(
    (res) =>
      res.json() as Promise<{ quiz_submission_questions: QuizQuestion[] }>,
  );
  return data.quiz_submission_questions;
}

export type QuizQuestion = {
  id: number;
  quiz_id: number;
  quiz_group_id: number | null;
  assessment_question_id: number | null;
  position: number;
  question_name: string;
  // question_type:
  //   | "multiple_choice_question"
  //   | "essay_question"
  //   | "true_false_question"
  //   | "short_answer_question"
  //   | "fill_in_multiple_blanks_question"
  //   | "multiple_answers_question"
  //   | "matching_question"
  //   | "numerical_question"
  //   | "calculated_question"
  //   | "file_upload_question"
  //   | "text_only_question";
  question_text: string;
  variables: unknown;
  formulas: unknown;
  answer_tolerance: unknown;
  formula_decimal_places: unknown;
  matches: unknown;
  flagged: boolean;
  answer: unknown;
  // answers?: unknown;
} & (
  | {
      question_type: "multiple_choice_question";
      answers: { id: number; text: string; html: string }[];
    }
  | { question_type: "short_answer_question" }
  | {
      question_type: "fill_in_multiple_blanks_question";
    }
  | {
      question_type: "multiple_answers_question";
      answers: { id: number; text: string }[];
    }
  | {
      question_type: "matching_question";
      answers: { id: number; text: string }[];
    }
  | { question_type: "numerical_question" }
  | {
      question_type: "calculated_question";
      answers: { variables: { name: string; value: string }[]; id: number }[];
    }
  | { question_type: "essay_question" }
  | {
      question_type: "true_false_question";
      answers: { text: string; id: number }[];
    }
  | { question_type: "file_upload_question" }
  | { question_type: "text_only_question" }
);

const mockData: { quiz_submission_questions: QuizQuestion[] } = {
  quiz_submission_questions: [
    {
      id: 12190920,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 24946347,
      position: 1,
      question_name: "Question 1",
      question_type: "multiple_choice_question",
      question_text: "\u003cp\u003eWhat is the correct answer\u003c/p\u003e",
      answers: [
        {
          id: 939,
          text: "",
          html: "\u003cp\u003eCorrect \u003cstrong\u003eanswer\u003c/strong\u003e\u003c/p\u003e",
        },
        { id: 4405, text: "Incorrect answer", html: "" },
        { id: 9758, text: "", html: "" },
        { id: 9827, text: "", html: "" },
      ],
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: null,
    },
    {
      id: 14853348,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 29301930,
      position: 2,
      question_name: "Question 2",
      question_type: "essay_question",
      question_text: "\u003cp\u003eWrite an essay\u003c/p\u003e",
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: null,
    },
    {
      id: 15797492,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918132,
      position: 3,
      question_name: "Question 3",
      question_type: "multiple_choice_question",
      question_text:
        "\u003cp\u003eHow many donkeys are in the world?\u003c/p\u003e",
      answers: [
        {
          id: 7927,
          text: "",
          html: "\u003cp\u003e1. 2 elephants\u003c/p\u003e",
        },
        { id: 9471, text: "2", html: "" },
        { id: 4410, text: "3", html: "" },
        { id: 482, text: "4", html: "" },
      ],
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: null,
    },
    {
      id: 15797493,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918133,
      position: 4,
      question_name: "Question 4",
      question_type: "true_false_question",
      question_text: "\u003cp\u003eIs blue a color?\u003c/p\u003e",
      answers: [
        { text: "True", id: 6018 },
        { text: "False", id: 4167 },
      ],
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: null,
    },
    {
      id: 15797494,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918134,
      position: 5,
      question_name: "Question 5",
      question_type: "short_answer_question",
      question_text:
        "\u003cp\u003eThe following is ___: The color of the sun is blue.\u003c/p\u003e",
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: null,
    },
    {
      id: 15797495,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918135,
      position: 6,
      question_name: "Question 6",
      question_type: "fill_in_multiple_blanks_question",
      question_text:
        '\u003cp\u003e\u003cinput class="question_input" type="text" autocomplete="off" style="width: 120px;" name="question_15797495_ec9a1c7e5a9f3a6278e9055d8dec00f0" value="{{question_15797495_ec9a1c7e5a9f3a6278e9055d8dec00f0}}"\u003e\n is a color and it has a \u003cinput class="question_input" type="text" autocomplete="off" style="width: 120px;" name="question_15797495_01731fa53c4cf2f32e893d5c3dbae9c1" value="{{question_15797495_01731fa53c4cf2f32e893d5c3dbae9c1}}"\u003e\n hue.\u003c/p\u003e',
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: { color1: null, color2: null },
    },
    {
      id: 15797502,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918148,
      position: 7,
      question_name: "Question 7",
      question_type: "multiple_answers_question",
      question_text: "\u003cp\u003eMultiple answers\u003c/p\u003e",
      answers: [
        { id: 5638, text: "Answer 1" },
        { id: 4463, text: "Answer 2" },
        { id: 5027, text: "Answer 3" },
        { id: 7068, text: "Answer 4" },
      ],
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: [],
    },
    {
      id: 15797503,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918149,
      position: 8,
      question_name: "Question 8",
      question_type: "matching_question",
      question_text: "\u003cp\u003eMath these:\u003c/p\u003e",
      answers: [
        { id: 1563, text: "Match 1" },
        { id: 2707, text: "Match 2" },
        { id: 8427, text: "Match 3" },
        { id: 6265, text: "Match 4" },
      ],
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: [
        { text: "Match 4", match_id: 1430 },
        { text: "Match 3", match_id: 9156 },
        { text: "Match 5", match_id: 8567 },
        { text: "Match 1", match_id: 4844 },
        { text: "Match 2", match_id: 4254 },
      ],
      flagged: false,
      answer: [
        { answer_id: "1563", match_id: null },
        { answer_id: "2707", match_id: null },
        { answer_id: "8427", match_id: null },
        { answer_id: "6265", match_id: null },
      ],
    },
    {
      id: 15797504,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918150,
      position: 9,
      question_name: "Question 9",
      question_type: "numerical_question",
      question_text: "\u003cp\u003eWhat number is one?\u003c/p\u003e",
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: null,
    },
    {
      id: 15797505,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918151,
      position: 10,
      question_name: "Question 10",
      question_type: "calculated_question",
      question_text: "\u003cp\u003eWhat is 5 plus 3\u003c/p\u003e",
      answers: [{ variables: [{ name: "x", value: "3" }], id: 3340 }],
      variables: [{ name: "x", min: 1.0, max: 10.0, scale: 0 }],
      formulas: [{ formula: "5 + x" }],
      answer_tolerance: "0",
      formula_decimal_places: 0,
      matches: null,
      flagged: false,
      answer: null,
    },
    {
      id: 15797507,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918153,
      position: 11,
      question_name: "Question 11",
      question_type: "essay_question",
      question_text: "\u003cp\u003eWrite me an essay:\u003c/p\u003e",
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: null,
    },
    {
      id: 15797509,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: 30918155,
      position: 12,
      question_name: "Question 12",
      question_type: "file_upload_question",
      question_text:
        "\u003cp\u003eUpload a file for me, would ya\u003c/p\u003e",
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: null,
    },
    {
      id: 15797510,
      quiz_id: 1912778,
      quiz_group_id: null,
      assessment_question_id: null,
      position: 12,
      question_name: "Spacer",
      question_type: "text_only_question",
      question_text: "\u003cp\u003eGood job!\u003c/p\u003e",
      variables: null,
      formulas: null,
      answer_tolerance: null,
      formula_decimal_places: null,
      matches: null,
      flagged: false,
      answer: null,
    },
  ],
};
