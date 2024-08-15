export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Budget",
      href: "/budget",
    },
    {
      label: "Cash Flow",
      href: "/cashflow",
    },
    {
      label: "Plan",
      href: "/plan",
    },
    {
      label: "Category",
      href: "/category",
    },
  ],
  navMenuItems: [
    {
      label: "Budget",
      href: "/budget",
    },
    {
      label: "Cash Flow",
      href: "/cashflow",
    },
    {
      label: "Plan",
      href: "/plan",
    },
    {
      label: "Category",
      href: "/category",
    },
    {
      label: "Help & Feedback",
      href: "#",
    },
    {
      label: "Logout",
      href: "#",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
