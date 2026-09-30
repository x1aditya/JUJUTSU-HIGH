export type LocationCategory = 'Academic' | 'Administration' | 'Student Essentials';

export type SubCategory =
  | 'Lecture Theatres'
  | 'Laboratories'
  | 'Academic Blocks'
  | 'Departments'
  | 'Accounts'
  | 'Registrar'
  | 'Proctor'
  | 'Student Services'
  | 'Library'
  | 'Student Care'
  | 'Hostel Office'
  | 'Food / Cafeteria';

export interface LocationItem {
  id: string;
  name: string;
  category: LocationCategory;
  subCategory: SubCategory;
  description: string;
  purpose: string;
  whoUsesIt: string;
  location: string;
  hours: string;
  contact: string;
  importantNotes: string[];
  image: string;
  iconName: string;
  tags: string[];
  status: 'Open' | 'Closed' | 'Limited Access' | 'Restricted';
  verified: boolean;
  evidenceType?: 'photo' | 'document' | 'field_survey';
  evidenceImage?: string;
  observation?: string;
  gridCoordinates?: { x: number; y: number; block: string };
}

export interface OfficeItem {
  id: string;
  name: string;
  department: string;
  issuesHandled: string[];
  whoShouldVisit: string;
  workingHours: string;
  contact: string;
  location: string;
  status: 'Open' | 'Closed' | 'Lunch Break' | 'By Appointment';
  verified: boolean;
  observation?: string;
  commonTriggers: string[];
  priorityRank?: number;
  image?: string;
  evidenceImage?: string;
}

export type FoodType = 'Cafeteria' | 'Mess' | 'Tuck Shop';

export interface FoodItem {
  id: string;
  name: string;
  type: FoodType;
  openingHours: string;
  location: string;
  status: 'Open Now' | 'Closing Soon' | 'Closed';
  menuPreview: string[];
  todaysSpecial: string;
  mealTimes?: {
    breakfast?: string;
    lunch?: string;
    snacks?: string;
    dinner?: string;
  };
  dietary: ('Pure Veg' | 'Non-Veg Options' | 'Beverages' | 'Quick Bites')[];
  priceRange: '₹' | '₹₹' | '₹₹₹';
  verified: boolean;
  observation?: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category:
    | 'Fees & Accounts'
    | 'Academics & Labs'
    | 'Campus Life & Library'
    | 'ERP & Technical'
    | 'Hostel & Food'
    | 'Student Care';
  recommendedOfficeId?: string;
  recommendedLocationId?: string;
  keywords: string[];
  verified: boolean;
}
