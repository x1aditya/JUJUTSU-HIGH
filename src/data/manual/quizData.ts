import { ClubCategory, QuizQuestion } from './types';

export const CATEGORY_KANJI: Record<ClubCategory, string> = {
  Technical: '技',
  Cultural: '芸',
  Sports: '闘',
  Social: '絆',
};

export const CATEGORY_INFO: Record<
  ClubCategory,
  {
    name: string;
    pathTitle: string;
    description: string;
    badgeColor: string;
    glowColor: string;
  }
> = {
  Technical: {
    name: 'Technical',
    pathTitle: 'Cursed Technique & Logic',
    description:
      'You analyze, innovate, and engineer. Hackathons, robotics, and build nights are where your domain expands.',
    badgeColor: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
    glowColor: 'rgba(34, 211, 238, 0.4)',
  },
  Cultural: {
    name: 'Cultural',
    pathTitle: 'Expression & Performance Arts',
    description:
      'You thrive in the spotlight, backstage rhythm, and street plays. The campus stage is your battlefield.',
    badgeColor: 'text-pink-400 border-pink-400/40 bg-pink-400/10',
    glowColor: 'rgba(255, 59, 107, 0.4)',
  },
  Sports: {
    name: 'Sports',
    pathTitle: 'Physical Prowess & Arena Domain',
    description:
      'High endurance, team discipline, and relentless drive. The tracks, courts, and fields call your name.',
    badgeColor: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
    glowColor: 'rgba(74, 222, 128, 0.4)',
  },
  Social: {
    name: 'Social',
    pathTitle: 'Alliance & Leadership Network',
    description:
      'Community building, debates, MUNs, and social impact drives. Your power lies in connection and charisma.',
    badgeColor: 'text-purple-300 border-purple-400/40 bg-purple-400/10',
    glowColor: 'rgba(196, 181, 253, 0.4)',
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    q: 'How do you want to spend a free evening?',
    a: [
      { text: 'Building something on my laptop', category: 'Technical' },
      { text: 'On stage or making art', category: 'Cultural' },
      { text: 'On a court or ground', category: 'Sports' },
      { text: 'Talking with a big group', category: 'Social' },
    ],
  },
  {
    id: 2,
    q: 'Pick a weekend plan.',
    a: [
      { text: 'A hackathon', category: 'Technical' },
      { text: 'A fest performance', category: 'Cultural' },
      { text: 'Match day', category: 'Sports' },
      { text: 'A volunteering drive', category: 'Social' },
    ],
  },
  {
    id: 3,
    q: 'What are you best at?',
    a: [
      { text: 'Solving problems', category: 'Technical' },
      { text: 'Creating and performing', category: 'Cultural' },
      { text: 'Staying active', category: 'Sports' },
      { text: 'Leading and connecting', category: 'Social' },
    ],
  },
  {
    id: 4,
    q: 'What do you want from a club?',
    a: [
      { text: 'New skills', category: 'Technical' },
      { text: 'A place to express myself', category: 'Cultural' },
      { text: 'Fitness and teamwork', category: 'Sports' },
      { text: 'New friends', category: 'Social' },
    ],
  },
];
