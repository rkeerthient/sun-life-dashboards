export const ANALYTICS_DATA = [
  {
    SearchTerm: "Farmers Services",
    Impressions: 56000,
    Clicks: 1500,
    CTR: 2.68,
    Position: 4.7,
  },
  {
    SearchTerm: "Online Farmers",
    Impressions: 31000,
    Clicks: 1200,
    CTR: 3.87,
    Position: 6.2,
  },
  {
    SearchTerm: "Farmers Insurance",
    Impressions: 42000,
    Clicks: 1800,
    CTR: 4.29,
    Position: 2.4,
  },
  {
    SearchTerm: "Farmers Accounts",
    Impressions: 69000,
    Clicks: 2500,
    CTR: 3.62,
    Position: 8.1,
  },
  {
    SearchTerm: "Farmers Finance",
    Impressions: 48000,
    Clicks: 900,
    CTR: 1.88,
    Position: 3.5,
  },
  {
    SearchTerm: "Farmers Online",
    Impressions: 36000,
    Clicks: 2000,
    CTR: 5.56,
    Position: 7.8,
  },
  {
    SearchTerm: "Farmers Cards",
    Impressions: 55000,
    Clicks: 2800,
    CTR: 5.09,
    Position: 5.3,
  },
  {
    SearchTerm: "Farmers Solutions",
    Impressions: 4200,
    Clicks: 800,
    CTR: 19.05,
    Position: 1.9,
  },
  {
    SearchTerm: "Farmers Support",
    Impressions: 27000,
    Clicks: 1500,
    CTR: 5.56,
    Position: 9.0,
  },
  {
    SearchTerm: "Farmers Info",
    Impressions: 61000,
    Clicks: 1200,
    CTR: 1.97,
    Position: 4.1,
  },
];

export const TABS = [
  "About Me",
  // "My Team",
  "Analytics",
  "Scout",
  "Social",
  "Suggestions",
  "Reviews",
  "Learning & Support",
];

export const defaultFieldsSchema = {
  interests: "TEXT_LIST",
  languages: "TEXT_LIST",
  hobbies: "TEXT_LIST",
};

export const PROFILE_COMPLETENESS_FIELDS = [
  { key: "name", label: "Name" },
  { key: "address", label: "Address" },
  { key: "mainPhone", label: "Phone" },
  { key: "hours", label: "Hours" },
  { key: "headshot", label: "Headshot" },
  { key: "certifications", label: "Certifications" },
  { key: "brands", label: "Brands" },
  { key: "specialities", label: "Specialities" },
];
export interface InsightItem {
  id: number;
  desc: string;
  title: string;
  link: string;
  badges: string[];
}
export const SCOUT_INSIGHTS: InsightItem[] = [
  {
    id: 1,
    desc: "These locations have significantly fewer reviews than competitors – closing this gap can boost local rankings, improve trust and drive more visits.",
    title: "Ask 5-10 customers weekly: These locations are behind in reviews.",
    link: "https://www.yext.com/s/514581/scout/scan/01999734-27da-76bf-b464-8d86806b4904/details/metrics/17?b=514581&center=%5B-114.53985%2C38.31977393256523%5D&zoom=2.1099722385406494&selectedMetric=googleRank&omitUnranked=true&scoringMethod=1",
    badges: ["High Impact"],
  },
  {
    id: 2,
    desc: "Locations with more photos get higher engagement! These locations have significantly fewer photos than competitors – this may reduce visibility and engagement in Google search.\nBusinesses with high-quality photos see 42% more requests for directions on Google Maps (Google Research).",
    title:
      "Fix Visibility: These locations have fewer photos – add more today!",
    link: "https://www.yext.com/s/514581/scout/scan/01999734-27da-76bf-b464-8d86806b4904/details/metrics/13?b=514581&center=%5B-114.53985%2C38.31977393256523%5D&zoom=2.1099722385406494&selectedMetric=googleRank&omitUnranked=true&scoringMethod=1",
    badges: ["Data/Listings", "High Impact"],
  },
  {
    id: 3,
    desc: "These locations have a lower Google rating than the average of top competitors. A lower rating can reduce customer trust and affect local search rankings.\nBusinesses rated below 4.0 receive fewer clicks and engagement in local search results.",
    title:
      "Enhance Trust: The ratings of these locations are below those of competitors – Take action now!",
    link: "https://www.yext.com/s/514581/scout/scan/01999734-27da-76bf-b464-8d86806b4904/details/metrics/18?b=514581&center=%5B-114.53985%2C38.31977393256523%5D&zoom=2.1099722385406494&selectedMetric=googleRank&omitUnranked=true&scoringMethod=1",
    badges: ["Reputation", "High Impact"],
  },
  {
    id: 4,
    desc: "These locations have fewer business attributes than competitors—this may limit visibility in search and reduce customer trust.\nGoogle confirms that businesses with complete attributes receive 37% more clicks from search results (Google, 2023).",
    title:
      "Fix It Now: These locations are Missing Key Business Details—Update Today!",
    link: "https://www.yext.com/s/514581/scout/scan/01999734-27da-76bf-b464-8d86806b4904/details/metrics/101?b=514581&center=%5B-114.53985%2C38.31977393256523%5D&zoom=2.1099722385406494&selectedMetric=googleRank&omitUnranked=true&scoringMethod=1",
    badges: ["Data/Listings", "High Impact"],
  },
];

// Notification bell: “2 New Campaigns Available”

// Alert 1 Profile Link Error

// Notification Bell “3 New Comments to Review”

export const NOTIFICATIONS_DATA = [
  {
    name: "2 New Campaigns Available",
    icon: "📣",
    id: "notification1",
  },
  {
    name: "1 Profile Link Error",
    icon: "⚠️",
    id: "notification2",
  },
  {
    name: "3 New Comments to Review",
    icon: "💬",
    id: "notification3",
  },
];
