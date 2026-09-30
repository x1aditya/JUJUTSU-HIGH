import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { LOCATIONS_DATA } from '@/data/locations';
import { LocationDetailPageClient } from './LocationDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS_DATA.map((location) => ({
    id: location.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const location = LOCATIONS_DATA.find((item) => item.id === id);

  if (!location) {
    return {
      title: 'Location Not Found | CU Student Survival System',
    };
  }

  return {
    title: `${location.name} | CU Student Survival System`,
    description: `${location.description} - Sector: ${location.category}, Subcategory: ${location.subCategory}`,
  };
}

export default async function LocationPage({ params }: Props) {
  const { id } = await params;
  const location = LOCATIONS_DATA.find((item) => item.id === id);

  if (!location) {
    notFound();
  }

  return <LocationDetailPageClient location={location} />;
}
