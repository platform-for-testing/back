export interface TestHeader {
    id: number;
    name: string;
}

export interface Test {
    questions: Question[];
}

export interface Question {
    id: number;
    questionType: string;
    answerType: string;
    question: string;
    required: boolean;
    answers: Answer[];
}

export interface Answer {
    id: number;
    answer: string;
}

export interface TestResult {
    id: number;
    questions: QuestionResult[];
}

export interface QuestionResult {
    id: number;
}

export interface OneChoiceResult {
    answers: number;
}

export interface MultiChoiceResult {
    answers: number[];
}

export interface OpenAnswerResult {
    answers: string;
}

export interface YesNoResult {
    answers: boolean;
}

export interface Response {
    success: boolean;
    status: number;
}

export interface NoDataResponse {
    message: string;
}

export interface Error {
    error: object;
}