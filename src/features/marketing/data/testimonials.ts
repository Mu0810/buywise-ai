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
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    name: "Priya Nair",
    role: "Product designer, Kochi",
    quote:
      "The review summary caught a common complaint about the hinge that I'd never have found in thousands of reviews. Bought a different model and I'm thrilled.",
    rating: 5,
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    name: "Rohan Gupta",
    role: "College student, Delhi",
    quote:
      "Set a price alert on earbuds and BuyWise pinged me during a sale. Grabbed them \u20b92,000 cheaper than list price.",
    rating: 5,
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    name: "Sneha Reddy",
    role: "Marketing lead, Hyderabad",
    quote:
      "The fake-review estimate is brilliant. It flagged a suspiciously perfect product and I dodged a bad purchase.",
    rating: 4,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Vikram Singh",
    role: "Photographer, Jaipur",
    quote:
      "Compared mirrorless cameras side by side with real value scores. It recommended for beginners exactly what I needed.",
    rating: 5,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "Ananya Iyer",
    role: "Founder, Chennai",
    quote:
      "It feels like ChatGPT met Google Shopping. I no longer open ten tabs — I just ask BuyWise and trust the verdict.",
    rating: 5,
    gradient: "from-rose-500 to-red-500",
  },
];
