export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatPhoneNumber = (phone) => {
  // Format Ghana phone numbers
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    return '+233' + cleaned.substring(1);
  }
  return cleaned;
};

export const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const generateWhatsAppLink = (phone, message = '') => {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};