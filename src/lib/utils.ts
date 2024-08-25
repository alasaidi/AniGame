import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function timeAgo(dateString: string): string {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const seconds: number = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval: number = Math.floor(seconds / 31536000);
  if (interval >= 1)
    return interval === 1 ? "a year ago" : `${interval} years ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1)
    return interval === 1 ? "a month ago" : `${interval} months ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1)
    return interval === 1 ? "a day ago" : `${interval} days ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1)
    return interval === 1 ? "an hour ago" : `${interval} hours ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return interval === 1 ? "a minute ago" : `${interval} minutes ago`;

  return "just now";
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
