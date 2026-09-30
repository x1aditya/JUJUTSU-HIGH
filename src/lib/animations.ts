export const DOMAIN_SHIFT_TITLES: Record<string, string> = {
  '/': 'DOMAIN INITIALIZED // ZERO',
  '/directory': 'DOMAIN SHIFT // CAMPUS',
  '/offices': 'DOMAIN SHIFT // GUIDANCE',
  '/food': 'DOMAIN SHIFT // RECHARGE',
  '/faq': 'DOMAIN SHIFT // SURVIVAL',
};

export function getDomainShiftTitle(pathname: string): string {
  if (DOMAIN_SHIFT_TITLES[pathname]) {
    return DOMAIN_SHIFT_TITLES[pathname];
  }
  if (pathname.startsWith('/location')) {
    return 'DOMAIN LOCK // COORDINATES';
  }
  return 'DOMAIN SHIFT // ACTIVE';
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return true;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
