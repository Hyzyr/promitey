'use client';

export type Testimonial = {
  id: number;
  nameKey: string;
  roleKey: string;
  quoteKey: string;
  photo: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    nameKey: 'landing.testimonials.items.0.name',
    roleKey: 'landing.testimonials.items.0.role',
    quoteKey: 'landing.testimonials.items.0.quote',
    photo: '/images/testimonials/mikhail-avatar.png',
    rating: 5,
  },
  {
    id: 2,
    nameKey: 'landing.testimonials.items.1.name',
    roleKey: 'landing.testimonials.items.1.role',
    quoteKey: 'landing.testimonials.items.1.quote',
    photo: '/images/testimonials/ruslan-avatar.png',
    rating: 4,
  },
  {
    id: 3,
    nameKey: 'landing.testimonials.items.2.name',
    roleKey: 'landing.testimonials.items.2.role',
    quoteKey: 'landing.testimonials.items.2.quote',
    photo: '/images/testimonials/elena-avatar.png',
    rating: 5,
  },
];

export const SLIDES = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export const AUTOPLAY_DELAY = 6000;
export const IDLE_RESUME_DELAY = 5000;
