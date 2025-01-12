export interface Subject {
  id: string;
  name: string;
  language: string;
}

export interface Question {
  id: string;
  subject: string;
  question: string;
  studentAnswer?: string;
  feedback?: string;
  isCorrect?: boolean;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface Feedback {
  text: string;
  culturalContext?: string;
  suggestions?: string[];
  resources?: string[];
}