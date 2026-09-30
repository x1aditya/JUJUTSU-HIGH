export type ClubCategory = 'Technical' | 'Cultural' | 'Sports' | 'Social';

export interface Club {
  name: string;
  cat: ClubCategory;
  about: string;
  join: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  place: string;
  club: string;
  image?: string;
}

export interface CampusDiscovery {
  id: string;
  img: string;
  title: string;
  saw: string;
  built: string;
}

export interface SeniorTip {
  id: string;
  text: string;
  by: string;
}

export interface QuizAnswer {
  text: string;
  category: ClubCategory;
}

export interface QuizQuestion {
  id: number;
  q: string;
  a: QuizAnswer[];
}

export type Facility = 'Gym' | 'Football Ground' | 'Badminton Court';

export interface TeammatePost {
  id: string;
  text: string;
  time: string;
  by: string;
  createdAt?: string;
}

export type ManualTab = 'quiz' | 'clubs' | 'events' | 'sports' | 'tips' | 'campus';
