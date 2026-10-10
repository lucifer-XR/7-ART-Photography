import wedding from "@/assets/work-wedding.jpg";
import corporate from "@/assets/work-corporate.jpg";
import graduation from "@/assets/work-graduation.jpg";
import portrait from "@/assets/work-portrait.jpg";

export const images = { wedding, corporate, graduation, portrait };

/** ILLUSTRATIVE DEMO DATA — not real employees. Replace with real records. */
export type Artist = {
  id: string;
  name: string;
  discipline: "Photographer" | "Videographer";
  specialization: string;
  years: number;
  rating: number;
  featuredOrder: number;
  bio: string;
  availability: string;
  samples: string[];
};

export const artists: Artist[] = [
  { id: "a1", name: "Demo Artist — Nadia Perera", discipline: "Photographer", specialization: "Weddings", years: 9, rating: 4.8, featuredOrder: 1, bio: "Quiet, observational coverage of ceremonies and the moments between them.", availability: "Weekends", samples: [wedding, portrait] },
  { id: "a2", name: "Demo Artist — Kavin Silva", discipline: "Videographer", specialization: "Event Films", years: 7, rating: 4.6, featuredOrder: 2, bio: "Cinematic short films with natural sound and restrained grading.", availability: "Weekdays & weekends", samples: [corporate, graduation] },
  { id: "a3", name: "Demo Artist — Amaya Fernando", discipline: "Photographer", specialization: "Portraits", years: 11, rating: 4.9, featuredOrder: 3, bio: "Sculpted light and still, honest portraiture.", availability: "By appointment", samples: [portrait, wedding] },
  { id: "a4", name: "Demo Artist — Ruwan Jayasinghe", discipline: "Photographer", specialization: "Corporate Events", years: 6, rating: 4.4, featuredOrder: 4, bio: "Conferences, launches and keynote documentation.", availability: "Weekdays", samples: [corporate, portrait] },
  { id: "a5", name: "Demo Artist — Ishara Wickrama", discipline: "Photographer", specialization: "Graduations", years: 5, rating: 4.7, featuredOrder: 5, bio: "Campus ceremonies, faculty portraits and group work.", availability: "Seasonal", samples: [graduation, wedding] },
  { id: "a6", name: "Demo Artist — Dilan Rathnayake", discipline: "Videographer", specialization: "Weddings", years: 8, rating: 4.5, featuredOrder: 6, bio: "Wedding films told through vows, speeches and stillness.", availability: "Weekends", samples: [wedding, graduation] },
  { id: "a7", name: "Demo Artist — Sachini Herath", discipline: "Photographer", specialization: "Editorial", years: 10, rating: 4.9, featuredOrder: 7, bio: "Fashion-led editorial imagery for brands and publications.", availability: "By appointment", samples: [portrait, corporate] },
  { id: "a8", name: "Demo Artist — Tharindu Bandara", discipline: "Videographer", specialization: "Corporate Events", years: 4, rating: 4.2, featuredOrder: 8, bio: "Event recaps, interviews and highlight reels.", availability: "Weekdays", samples: [corporate, graduation] },
  { id: "a9", name: "Demo Artist — Hiruni Gamage", discipline: "Photographer", specialization: "Private Celebrations", years: 6, rating: 4.6, featuredOrder: 9, bio: "Birthdays, anniversaries and intimate gatherings.", availability: "Weekends", samples: [wedding, portrait] },
];

/**
 * Handwritten Bubble Sort — descending by rating.
 * Tie rule: equal ratings keep featured order (stable: only swap when strictly lower).
 * No built-in sort is used.
 */
export function bubbleSortByRating(input: Artist[]): Artist[] {
  const arr = input.slice();
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j]!.rating < arr[j + 1]!.rating) {
        const tmp = arr[j]!;
        arr[j] = arr[j + 1]!;
        arr[j + 1] = tmp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

/** Featured order — also a manual bubble pass, no built-in sort. */
export function featuredFirst(input: Artist[]): Artist[] {
  const arr = input.slice();
  for (let i = 0; i < arr.length - 1; i++)
    for (let j = 0; j < arr.length - 1 - i; j++)
      if (arr[j]!.featuredOrder > arr[j + 1]!.featuredOrder) [arr[j], arr[j + 1]] = [arr[j + 1]!, arr[j]!];
  return arr;
}

export const categories = ["Wedding Photography", "Corporate Events", "Portraits", "Graduations", "Editorial", "Private Celebrations", "Event Videography"] as const;

export type Work = { id: string; title: string; category: (typeof categories)[number]; img: string; w: number; h: number; artistId: string; details: string };

export const works: Work[] = [
  { id: "w1", title: "Under the Arch", category: "Wedding Photography", img: wedding, w: 768, h: 1024, artistId: "a1", details: "Hillside ceremony · 35mm" },
  { id: "w2", title: "A New Era", category: "Corporate Events", img: corporate, w: 1024, h: 768, artistId: "a4", details: "Keynote · Colombo" },
  { id: "w3", title: "Caps to the Sky", category: "Graduations", img: graduation, w: 1024, h: 1024, artistId: "a5", details: "Convocation · Campus" },
  { id: "w4", title: "The Coat", category: "Portraits", img: portrait, w: 768, h: 1024, artistId: "a3", details: "Studio · Single light" },
  { id: "w5", title: "Side Light", category: "Editorial", img: portrait, w: 768, h: 1024, artistId: "a7", details: "Editorial series" },
  { id: "w6", title: "Vows, Recorded", category: "Event Videography", img: wedding, w: 768, h: 1024, artistId: "a6", details: "Wedding film still" },
  { id: "w7", title: "Evening Toast", category: "Private Celebrations", img: corporate, w: 1024, h: 768, artistId: "a9", details: "Anniversary dinner" },
  { id: "w8", title: "Class of Light", category: "Graduations", img: graduation, w: 1024, h: 1024, artistId: "a5", details: "Faculty ceremony" },
  { id: "w9", title: "Stage Notes", category: "Event Videography", img: corporate, w: 1024, h: 768, artistId: "a8", details: "Recap reel still" },
];

/** Sample prices (editable). Final pricing will be recalculated server-side. */
export const packages = [
  { id: "essential", name: "Essential", desc: "Focused coverage for intimate events.", hours: "3 hours", deliverables: ["1 photographer", "150 edited images", "Online gallery"], extras: ["Extra hour", "Printed album"], price: 45000 },
  { id: "signature", name: "Signature", desc: "Our most requested photo + film package.", hours: "6 hours", deliverables: ["Photographer + videographer", "400 edited images", "3-min highlight film"], extras: ["Drone footage", "Same-day preview"], price: 120000 },
  { id: "full-day", name: "Full Day", desc: "Complete storytelling from first light to last dance.", hours: "10 hours", deliverables: ["2 photographers + videographer", "800+ edited images", "10-min feature film"], extras: ["Second location", "Heirloom album"], price: 210000 },
];

export const lkr = (n: number) => "LKR " + n.toLocaleString("en-LK");
