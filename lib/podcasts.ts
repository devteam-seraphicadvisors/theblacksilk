// Podcast / event episode data shared by the Events page and the home page.
// The Events page merges these with live data from /api/events.

export interface Speaker {
  name: string;
  title?: string;
  role?: string;
  bio?: string;
  image?: string;
}

export interface PodcastEpisode {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  youtubeUrl: string;
  youtubeId?: string;
  isUpcoming: boolean;
  flags: string[];
  speakers: Speaker[];
  category: string;
  duration?: string;
  episodeNumber?: string;
}

export const UPCOMING_PODCASTS: PodcastEpisode[] = [
  {
    id: "upcoming-dpdp-part-2",
    slug: "dialogue-on-india-dpdp-act-part-2",
    title:
      "Dialogue on India's Digital Personal Data Protection Act, 2023 - Part 2: Consent Managers & Cross-Border Data Flows",
    description:
      "The second installment in our flagship podcast series examining operational frameworks for Consent Managers, cross-border transmission limits, and penalty enforcement under India's DPDP Act.",
    date: "2026-04-15T14:00:00.000Z",
    youtubeUrl: "https://www.youtube.com/@TheBlackSilk",
    youtubeId: "x624GRuNkZA",
    isUpcoming: true,
    flags: ["UPCOMING", "NEW", "PREMIERES SOON"],
    episodeNumber: "EPISODE 04",
    category: "DPDP Series",
    duration: "45 mins",
    speakers: [
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
      {
        name: "Mr. Mayank Grover",
        title: "Partner, Seraphic Advisors",
      },
    ],
  },
  {
    id: "upcoming-ai-courts",
    slug: "algorithmic-governance-and-ai-in-indian-courts",
    title:
      "Algorithmic Governance & AI in Indian Courts: Admissibility, Transparency, and Neural Liability",
    description:
      "An in-depth inquiry into emerging AI evidentiary protocols, bias audits in automated dispute resolution, and regulatory compliance standards for judicial technological deployments.",
    date: "2026-04-28T16:00:00.000Z",
    youtubeUrl: "https://www.youtube.com/@TheBlackSilk",
    youtubeId: "7laF3tgWZ_E",
    isUpcoming: true,
    flags: ["UPCOMING", "NEW", "IN PRODUCTION"],
    episodeNumber: "EPISODE 05",
    category: "AI & Judiciary",
    duration: "50 mins",
    speakers: [
      {
        name: "Dr. Rajesh Kumar",
        title: "Former Chief Justice & Research Chair",
      },
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
    ],
  },
  {
    id: "upcoming-smart-contracts",
    slug: "web3-smart-contracts-commercial-dispute-resolution",
    title:
      "Smart Contracts, Blockchain Forensics and Commercial Arbitration Venues",
    description:
      "Exploring judicial enforceability of decentralized agreements, cryptographic audit logs in courtroom discovery, and multinational arbitration conventions.",
    date: "2026-05-12T14:30:00.000Z",
    youtubeUrl: "https://www.youtube.com/@TheBlackSilk",
    youtubeId: "Xk49GiJay68",
    isUpcoming: true,
    flags: ["UPCOMING", "SPECIAL EDITION"],
    episodeNumber: "EPISODE 06",
    category: "Blockchain Law",
    duration: "40 mins",
    speakers: [
      {
        name: "Neil Dawes",
        title: "Managing Partner, DawesCo LLP",
      },
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
    ],
  },
];

// Fallback past episodes matching database records
export const FALLBACK_PAST_PODCASTS: PodcastEpisode[] = [
  {
    id: "past-colloquy-ai",
    slug: "colloquy-on-artificial-intelligence-with-ray-sharma-and-kps-kohli",
    title: "Colloquy on Artificial Intelligence with Ray Sharma and KPS Kohli",
    description:
      "Ray is the founder and leader of Extreme Venture Partners, Canada's top seed stage venture fund with 100+ startups exited to Apple, Google, EA, McKesson, and Salesforce. A wide-ranging colloquy on AI venture trends and regulatory paradigms.",
    date: "2023-11-27T12:24:00.000Z",
    youtubeUrl: "https://youtu.be/7laF3tgWZ_E",
    youtubeId: "7laF3tgWZ_E",
    isUpcoming: false,
    flags: ["RECORDED", "WATCH NOW", "AI & VENTURE"],
    episodeNumber: "EPISODE 03",
    category: "AI & Venture",
    duration: "38 mins",
    speakers: [
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
      {
        name: "Ray Sharma",
        title: "Founder, Extreme Venture Partners",
      },
    ],
  },
  {
    id: "past-dpdp-part-1",
    slug: "dialogue-on-india-s-digital-personal-data-protection-act-2023-part-1",
    title: "Dialogue on India's Digital Personal Data Protection Act, 2023 - Part 1",
    description:
      "Mr. Mayank Grover and Mr. KPS Kohli discuss the implications of the DPDP Act for individuals and enterprises alike, debating seminal provisions and the statutory role of 'Consent Managers'.",
    date: "2023-09-12T23:00:00.000Z",
    youtubeUrl:
      "https://www.youtube.com/watch?v=x624GRuNkZA&embeds_referring_euri=https%3A%2F%2Ftheblacksilk.org%2F&source_ve_path=MjM4NTE",
    youtubeId: "x624GRuNkZA",
    isUpcoming: false,
    flags: ["RECORDED", "WATCH NOW", "DPDP SERIES"],
    episodeNumber: "EPISODE 01",
    category: "DPDP Series",
    duration: "42 mins",
    speakers: [
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
      {
        name: "Mr. Mayank Grover",
        title: "Partner, Seraphic Advisors",
      },
    ],
  },
  {
    id: "past-roundtable-dpdp",
    slug: "roundtable-conference-on-digital-personal-data-protection-act-2023",
    title:
      "Roundtable Conference on Digital Personal Data Protection Act 2023 and Its Implications",
    description:
      "Held at the India International Centre, New Delhi. Opening address by Chief Guest Justice V.N. Sinha (Retd.). Panellists delved into data privacy, consent architecture, cross-border data transfers, and enforcement.",
    date: "2023-08-31T10:30:00.000Z",
    youtubeUrl: "http://youtube.com/watch?v=Xk49GiJay68",
    youtubeId: "Xk49GiJay68",
    isUpcoming: false,
    flags: ["RECORDED", "WATCH NOW", "ROUNDTABLE"],
    episodeNumber: "SPECIAL SYMPOSIUM",
    category: "Roundtable",
    duration: "1 hr 15 mins",
    speakers: [
      {
        name: "Justice VN Sinha (Retd.)",
        title: "Chief Guest, Former Judge",
      },
      {
        name: "Mr. Sukanta Dey",
        title: "Senior Consultant (Moderator)",
      },
      {
        name: "Mr. KPS Kohli",
        title: "Partner, Seraphic Advisors",
      },
      {
        name: "Neil Dawes",
        title: "Managing Partner, DawesCo LLP",
      },
    ],
  },
];
