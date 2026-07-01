import {
  BellRing,
  GitCompareArrows,
  Heart,
  LayoutDashboard,
  Search,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  items: NavItem[];
}

/**
 * Primary navigation for the marketing site. Hash links scroll to landing
 * page sections.
 */
export const marketingNav: NavItem[] = [
  { title: "Features", href: "/#features" },
  { title: "How it works", href: "/#how-it-works" },
  { title: "Compare", href: "/#comparison" },
  { title: "Pricing", href: "/#pricing" },
  { title: "FAQ", href: "/#faq" },
];

export const footerNav: FooterSection[] = [
  {
    title: "Product",
    items: [
      { title: "Features", href: "/#features" },
      { title: "How it works", href: "/#how-it-works" },
      { title: "Pricing", href: "/#pricing" },
      { title: "AI Assistant", href: "/#hero" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/#comparison" },
      { title: "Blog", href: "/#" },
      { title: "Careers", href: "/#" },
      { title: "Contact", href: "mailto:hello@buywise.ai", external: true },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Help center", href: "/#faq" },
      { title: "Price alerts", href: "/#features" },
      { title: "Store coverage", href: "/#comparison" },
      { title: "Status", href: "/#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy", href: "/#" },
      { title: "Terms", href: "/#" },
      { title: "Cookies", href: "/#" },
      { title: "Affiliate disclosure", href: "/#" },
    ],
  },
];

export interface AppNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  soon?: boolean;
}

/** Primary navigation inside the authenticated app shell. */
export const appNav: AppNavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "AI Chat", href: "/chat", icon: Sparkles },
  { title: "Search", href: "/search", icon: Search },
  { title: "Wishlist", href: "/wishlist", icon: Heart },
  { title: "Price Alerts", href: "/alerts", icon: BellRing },
  { title: "Compare", href: "/compare", icon: GitCompareArrows },
  { title: "Settings", href: "/settings", icon: Settings, soon: true },
];
