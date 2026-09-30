import { LOCATIONS_DATA } from './locations';
import { OFFICES_DATA } from './offices';
import { FOOD_DATA } from './food';
import { FAQS_DATA } from './faqs';
import { LocationItem, OfficeItem, FoodItem, FAQItem, LocationCategory, FoodType } from './types';

export * from './types';
export * from './locations';
export * from './offices';
export * from './food';
export * from './faqs';

/**
 * Service Layer & Future Neon PostgreSQL Connector Interface
 * 
 * Note for future Evaluation / Production expansion:
 * When integrating Neon PostgreSQL (@neondatabase/serverless or drizzle-orm),
 * swap these asynchronous getters with database queries without breaking UI components.
 */

export async function getLocations(options?: {
  query?: string;
  category?: LocationCategory | 'All';
  subCategory?: string;
}): Promise<LocationItem[]> {
  let results = [...LOCATIONS_DATA];

  if (options?.category && options.category !== 'All') {
    results = results.filter((item) => item.category === options.category);
  }

  if (options?.subCategory && options.subCategory !== 'All') {
    results = results.filter((item) => item.subCategory === options.subCategory);
  }

  if (options?.query && options.query.trim().length > 0) {
    const q = options.query.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.purpose.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  return results;
}

export async function getLocationById(id: string): Promise<LocationItem | null> {
  const found = LOCATIONS_DATA.find((item) => item.id === id);
  return found || null;
}

export async function getOffices(query?: string): Promise<OfficeItem[]> {
  let results = [...OFFICES_DATA];

  if (query && query.trim().length > 0) {
    const q = query.toLowerCase().trim();
    results = results.filter(
      (office) =>
        office.name.toLowerCase().includes(q) ||
        office.department.toLowerCase().includes(q) ||
        office.issuesHandled.some((issue) => issue.toLowerCase().includes(q)) ||
        office.commonTriggers.some((trigger) => trigger.toLowerCase().includes(q)) ||
        office.location.toLowerCase().includes(q)
    );
  }

  return results;
}

export async function getFoodItems(type?: FoodType | 'All'): Promise<FoodItem[]> {
  if (!type || type === 'All') {
    return FOOD_DATA;
  }
  return FOOD_DATA.filter((item) => item.type === type);
}

export async function getFaqs(options?: {
  query?: string;
  category?: string;
}): Promise<FAQItem[]> {
  let results = [...FAQS_DATA];

  if (options?.category && options.category !== 'All') {
    results = results.filter((faq) => faq.category === options.category);
  }

  if (options?.query && options.query.trim().length > 0) {
    const q = options.query.toLowerCase().trim();
    results = results.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }

  return results;
}
