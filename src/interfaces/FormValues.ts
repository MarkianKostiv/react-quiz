interface Answer {
  answer: string;
  isTrue: boolean;
}

interface Question {
  question: string;
  points: number;
  answers: Answer[];
}

export interface FormValues {
  id: string;
  name: string;
  questions: Question[];
}
