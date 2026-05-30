/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KeyConcept {
  term: string;
  definition: string;
}

export interface Chapter {
  id: string;
  title: string;
  text: string;
  keyConcepts: KeyConcept[];
  curiosity: string;
  reflectionQuestion: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  category: string;
  interactiveFact: string;
}

export interface ExerciseQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Theme {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  chapters: Chapter[];
  flashcards: Flashcard[];
  exercises: ExerciseQuestion[];
}

export interface HistoricalSource {
  id: string;
  title: string;
  type: 'monumento' | 'arqueologico' | 'texto' | 'mapa';
  era: string;
  location: string;
  description: string;
  imageUrl: string;
  questions: string[];
  suggestedAnswers: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface UserProgress {
  name: string;
  score: number;
  completedChapters: string[]; // List of Chapter IDs completed
  completedQuizzes: {[key: string]: number}; // Quiz ID to Highscore percentage
  completedGames: string[]; // Game IDs completed
  badges: string[]; // Badge IDs
}
