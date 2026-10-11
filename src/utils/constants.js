export const SURVEY_TYPES = [
  'Cadastral Survey',
  'Boundary Survey',
  'Topographic Survey',
  'Construction Survey',
  'Drone Survey',
  'Mining Survey',
];

export const REQUEST_STATUS = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export const COMPANY_INFO = {
  name: 'MapRivo Survey Consult',
  tagline: 'Mapping Today, Shaping Tomorrow.',
  address: 'Accra, Ghana',
  phone: '+233 53 989 6049',
  phoneRaw: '233539896049',
  email: 'maprivo.surveyconsult@gmail.com',
  whatsapp: '233539896049',
};

// Base URLs — build links from these so you never hardcode again
export const WHATSAPP_BASE = `https://wa.me/${COMPANY_INFO.whatsapp}`;
export const MAILTO_BASE   = `mailto:${COMPANY_INFO.email}`;
export const TEL_BASE      = `tel:+${COMPANY_INFO.phoneRaw}`;

// Only WhatsApp is active right now — add Facebook/Instagram/etc.
// back here once the accounts exist and the icons will render automatically.
export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/233539896049',
};

// Icons are handled in the Footer/Navbar — this map lets you loop cleanly
export const SOCIAL_ORDER = [
  'whatsapp',
];

// Brand colors aligned with the MapRivo logo
export const COLORS = {
  primary:    '#0B2D6B',   // MapRivo navy
  secondary:  '#16A34A',   // emerald green
  accent:     '#3B82F6',   // sky blue
  background: '#FFFFFF',
  light:      '#F7F8FA',
};