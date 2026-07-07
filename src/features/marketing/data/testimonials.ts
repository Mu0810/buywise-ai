export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  gradient: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Mehta",
    role: "Software engineer, Bengaluru",
    quote:
      "Asked for the best coding laptop under \u20b970k and got three genuinely great options with clear reasons. Saved me an entire weekend of research.",
    rating: 5,
    gradient: "from-amber-400 to-yellow-600",
  },
  {
    name: "Priya Nair",
    role: "Product designer, Kochi",
    quote:
      "The review summary caught a common complaint about the hinge that I'd never have found in thousands of reviews. Bought a different model and I'm thrilled.",
    rating: 5,
    gradient: "from-teal-400 to-cyan-600",
  },
  {
    name: "Rohan Gupta",
    role: "College student, Delhi",
    quote:
      "Set a price alert on earbuds and BuyWise pinged me during a sale. Grabbed them \u20b92,000 cheaper than list price.",
    rating: 5,
    gradient: "from-slate-500 to-slate-700",
  },
  {
    name: "Sneha Reddy",
    role: "Marketing lead, Hyderabad",
    quote:
      "The fake-review estimate is brilliant. It flagged a suspiciously perfect product and I dodged a bad purchase.",
    rating: 4,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    name: "Vikram Singh",
    role: "Photographer, Jaipur",
    quote:
      "Compared mirrorless cameras side by side with real value scores. It recommended for beginners exactly what I needed.",
    rating: 5,
    gradient: "from-orange-400 to-amber-600",
  },
  {
    name: "Ananya Iyer",
    role: "Founder, Chennai",
    quote:
      "It feels like ChatGPT met Google Shopping. I no longer open ten tabs — I just ask BuyWise and trust the verdict.",
    rating: 5,
    gradient: "from-cyan-600 to-teal-800",
  },
];
