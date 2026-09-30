import { Club, ClubCategory } from './types';

export const CLUBS: Club[] = [
  {
    name: 'Coding Club',
    cat: 'Technical',
    about: 'Build nights, competitive coding, and hackathon prep.',
    join: 'Fill the form at the B1 notice board.',
  },
  {
    name: 'Robotix',
    cat: 'Technical',
    about: 'Robots, drones, embedded systems, and IoT hardware.',
    join: 'Short interview, bring a project idea.',
  },
  {
    name: 'Dance Society',
    cat: 'Cultural',
    about: 'Stage shows, choreo showdowns, and annual fest acts.',
    join: 'Auditions on the first Saturday.',
  },
  {
    name: 'Drama Circle',
    cat: 'Cultural',
    about: 'Street plays (Nukkad Natak), theatre, and stage productions.',
    join: 'Open to all students.',
  },
  {
    name: 'Football League',
    cat: 'Sports',
    about: 'Inter-block tournaments, daily practice, and university trials.',
    join: 'Register a team of 7 at the sports office.',
  },
  {
    name: 'Fitness Crew',
    cat: 'Sports',
    about: 'Group strength training, calisthenics, and bodyweight challenges.',
    join: 'Gym card required.',
  },
  {
    name: 'Debate Union',
    cat: 'Social',
    about: 'Parliamentary debate, public speaking, and Model United Nations (MUN).',
    join: 'Open to all, first meeting is an open trial.',
  },
  {
    name: 'Volunteer Squad',
    cat: 'Social',
    about: 'Campus cleanups, blood donation drives, and community outreach.',
    join: 'Sign up on the day at the student square.',
  },
];

export const CATEGORY_COLORS: Record<
  ClubCategory,
  {
    border: string;
    borderHover: string;
    tagBg: string;
    tagText: string;
    kanjiColor: string;
    accentLine: string;
  }
> = {
  Technical: {
    border: 'border-cyan-500/25',
    borderHover: 'hover:border-cyan-400/80',
    tagBg: 'bg-cyan-500/10',
    tagText: 'text-cyan-400',
    kanjiColor: 'text-cyan-400/15',
    accentLine: 'border-l-cyan-400',
  },
  Cultural: {
    border: 'border-pink-500/25',
    borderHover: 'hover:border-pink-400/80',
    tagBg: 'bg-pink-500/10',
    tagText: 'text-pink-400',
    kanjiColor: 'text-pink-400/15',
    accentLine: 'border-l-pink-400',
  },
  Sports: {
    border: 'border-emerald-500/25',
    borderHover: 'hover:border-emerald-400/80',
    tagBg: 'bg-emerald-500/10',
    tagText: 'text-emerald-400',
    kanjiColor: 'text-emerald-400/15',
    accentLine: 'border-l-emerald-400',
  },
  Social: {
    border: 'border-purple-500/25',
    borderHover: 'hover:border-purple-400/80',
    tagBg: 'bg-purple-500/10',
    tagText: 'text-purple-300',
    kanjiColor: 'text-purple-300/15',
    accentLine: 'border-l-purple-400',
  },
};
