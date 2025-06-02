export const roleContentGreeting = {
  administrator: {
    description: [
      "Manage system settings and users.",
      "Configure roles, ads, payments and reports."
    ],
    cta: { text: "Go to Dashboard", href: "/dashboard" }
  },
  editor: {
    description: [
      "Review and edit advertisements efficiently.",
      "Ensure quality and compliance of ads."
    ],
    cta: { text: "Review Ads", href: "/ads/list" }
  },
  advertiser: {
    description: [
      "Explore, create, and track your publications.",
      "Optimize performance and budgets."
    ],
    cta: { text: "Go to Create", href: "/ads/choose-plan" }
  }
};
