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
  name: 'GeoAxis Survey Consult',
  tagline: 'Accuracy Builds Tomorrow',
  address: 'Tamso Market, Ghana',       // ← update if your base changes
  phone: '+233 53 989 6049',             // for display
  phoneRaw: '233539896049',              // for tel: and wa.me links
  email: 'geoaxissurveyconsult@gmail.com',
  whatsapp: '233539896049',
};

// Base URLs — build links from these so you never hardcode again
export const WHATSAPP_BASE = `https://wa.me/${COMPANY_INFO.whatsapp}`;
export const MAILTO_BASE   = `mailto:${COMPANY_INFO.email}`;
export const TEL_BASE      = `tel:+${COMPANY_INFO.phoneRaw}`;

export const SOCIAL_LINKS = {
  whatsapp:  'https://wa.me/233539896049',
  facebook:  'https://facebook.com/geoaxissurveyconsult',        // ← verify handle
  instagram: 'https://instagram.com/geoaxissurveyconsult',       // ← verify handle
  linkedin:  'https://linkedin.com/company/geoaxissurveyconsult',// ← verify handle
  twitter:   'https://x.com/geoaxissurvey',                // or x.com/geoaxissurvey
  youtube:   'https://youtube.com/@geoaxissurveyconsult',        // ← verify handle
  tiktok:    'https://tiktok.com/@geoaxissurveyconsult',         // ← verify handle
};

// Icons are handled in the Footer/Navbar — this map lets you loop cleanly
export const SOCIAL_ORDER = [
  'whatsapp',
  'facebook',
  'instagram',
  'linkedin',
  'twitter',
  'youtube',
  'tiktok',
];

// Brand colors pulled from your logo
export const COLORS = {
  primary:    '#F26522',   // accent orange
  secondary:  '#1E2530',   // charcoal dark
  accent:     '#6c757d',   // neutral grey
  background: '#ffffff',
  light:      '#F8F9FA',   // soft off-white
};