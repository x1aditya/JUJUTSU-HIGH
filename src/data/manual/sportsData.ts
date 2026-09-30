import { Facility, TeammatePost } from './types';

export const FACILITIES: Facility[] = ['Gym', 'Football Ground', 'Badminton Court'];

export const FACILITY_PHOTOS: Partial<Record<Facility, string>> = {
  'Football Ground': '/images/manual/track.jpg',
};

export const TIME_SLOTS: string[] = ['6:00 AM', '7:00 AM', '5:00 PM', '6:00 PM', '7:00 PM'];

export const DEFAULT_TAKEN_SLOTS: Record<Facility, string[]> = {
  Gym: ['6:00 AM', '6:00 PM'],
  'Football Ground': ['5:00 PM'],
  'Badminton Court': ['7:00 PM'],
};

export const INITIAL_POSTS: TeammatePost[] = [
  {
    id: 'post-1',
    text: 'Need 2 players for football',
    time: 'Sat, 5 PM',
    by: 'Aman',
    createdAt: 'Active today',
  },
];
