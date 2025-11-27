/**
 * Format date to dd / mm / yyyy format
 * @param date - Date string, Date object, or timestamp
 * @returns Formatted date string in dd / mm / yyyy format
 * @example
 * formatDate('2025-11-17') // '17 / 11 / 2025'
 * formatDate(new Date()) // '17 / 11 / 2025'
 * formatDate(1700179200000) // '17 / 11 / 2023'
 */
export const formatDate = (date: string | Date | number): string => {
  const dateObj = new Date(date);

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day} / ${month} / ${year}`;
};

/**
 * Format date to dd/mm/yyyy format (without spaces)
 * @param date - Date string, Date object, or timestamp
 * @returns Formatted date string in dd/mm/yyyy format
 * @example
 * formatDateCompact('2025-11-17') // '17/11/2025'
 */
export const formatDateCompact = (date: string | Date | number): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Format date to Vietnamese locale format
 * @param date - Date string, Date object, or timestamp
 * @returns Formatted date string with Vietnamese text
 * @example
 * formatDateVN('2025-11-17') // '17 tháng 11, 2025'
 */
export const formatDateVN = (date: string | Date | number): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${day} tháng ${month}, ${year}`;
};

/**
 * Format date to relative time (today, yesterday, 2 days ago, etc.)
 * @param date - Date string, Date object, or timestamp
 * @returns Relative time string in Vietnamese
 * @example
 * formatRelativeTime(new Date()) // 'Hôm nay'
 * formatRelativeTime(new Date(Date.now() - 86400000)) // 'Hôm qua'
 * formatRelativeTime(new Date(Date.now() - 172800000)) // '2 ngày trước'
 * formatRelativeTime('2025-10-17') // '31 ngày trước' or '17/10/2025'
 */
export const formatRelativeTime = (date: string | Date | number): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // Future dates
  if (diffMs < 0) {
    return formatDateCompact(dateObj);
  }

  // Just now (less than 1 minute)
  if (diffSeconds < 60) {
    return "Vừa xong";
  }

  // Minutes ago
  if (diffMinutes < 60) {
    return `${diffMinutes} phút trước`;
  }

  // Hours ago (same day)
  if (diffHours < 24 && now.getDate() === dateObj.getDate()) {
    return `${diffHours} giờ trước`;
  }

  // Today
  if (diffDays === 0 && now.getDate() === dateObj.getDate()) {
    return "Hôm nay";
  }

  // Yesterday
  if (
    diffDays === 1 ||
    (diffHours < 48 && now.getDate() - dateObj.getDate() === 1)
  ) {
    return "Hôm qua";
  }

  // Days ago (less than 7 days)
  if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  }

  // Weeks ago (less than 4 weeks)
  if (diffWeeks < 4) {
    return `${diffWeeks} tuần trước`;
  }

  // Months ago (less than 12 months)
  if (diffMonths < 12) {
    return `${diffMonths} tháng trước`;
  }

  // Years ago
  if (diffYears > 0) {
    return `${diffYears} năm trước`;
  }

  // Fallback to compact date format
  return formatDateCompact(dateObj);
};

/**
 * Format date to relative time with full date fallback
 * @param date - Date string, Date object, or timestamp
 * @param maxDays - Maximum days to show relative time (default: 7)
 * @returns Relative time string or full date
 * @example
 * formatRelativeTimeWithFallback(new Date()) // 'Hôm nay'
 * formatRelativeTimeWithFallback('2025-10-17') // '17/10/2025' (if > 7 days)
 * formatRelativeTimeWithFallback('2025-11-10', 14) // '7 ngày trước' (custom maxDays)
 */
export const formatRelativeTimeWithFallback = (
  date: string | Date | number,
  maxDays: number = 7
): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // If beyond maxDays, show full date
  if (diffDays > maxDays || diffMs < 0) {
    return formatDateCompact(dateObj);
  }

  return formatRelativeTime(dateObj);
};
