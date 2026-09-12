export interface SpaceAppsNominee {
  teamName: string;
  projectName: string;
  category: string;
  description: string;
  award?: string;
  university?: string;
}

export interface SpaceAppsEdition {
  year: string;
  theme: string;
  title: string;
  tagline: string;
  date: string;
  format: string;
  location: string;
  participantsCount: string;
  teamsCount: string;
  projectsSubmitted: string;
  globalNomineesCount: string;
  overview: string[];
  focusAreas: string[];
  nominees: SpaceAppsNominee[];
  highlights: string[];
  partnerInstitutions: string[];
  registrationStatus: "upcoming" | "active" | "concluded";
  registrationUrl?: string;
}

export const NASA_SPACE_APPS_EDITIONS: Record<string, SpaceAppsEdition> = {
  "2025": {
    year: "2025",
    theme: "Next Horizons: Unbounded Space Innovation",
    title: "NASA Space Apps Challenge Sri Lanka 2025",
    tagline:
      "The concluding grand edition of NASA Space Apps Challenge organized across Sri Lanka by SEDS Sri Lanka.",
    date: "October 4 - 5, 2025",
    format: "Hybrid (In-Person Colombo & Online)",
    location: "NSBM Green University / Colombo & Online",
    participantsCount: "820+ Participants",
    teamsCount: "118 Teams",
    projectsSubmitted: "96 Solutions",
    globalNomineesCount: "6 Global Nominees",
    registrationStatus: "concluded",
    overview: [
      "The NASA International Space Apps Challenge 2025 concluded as the largest space hackathon in Sri Lanka, marking the culmination of SEDS Sri Lanka's 7-year leadership (2019 - 2025) of the initiative.",
      "Bringing together over 820 coders, scientists, designers, storytellers, makers, and space enthusiasts, participants harnessed NASA's open data to build innovative solutions for challenges on Earth and in space.",
      "Teams collaborated across 48 continuous hours, mentored by university academics, aerospace engineers, and industry software leads from the SEDS Sri Lanka network and partnering institutions.",
    ],
    focusAreas: [
      "Earth Observation & Remote Sensing Analytics",
      "Planetary Exploration & Robotic Systems",
      "AI & Machine Learning on NASA Open Datasets",
      "Heliophysics & Space Weather Modeling",
      "Interactive STEM Education & Scientific Storytelling",
    ],
    nominees: [
      {
        teamName: "Astra Lanka",
        projectName: "OrbitPulse: Satellite Telemetry Intelligence",
        category: "Best Use of Data",
        description:
          "An open web intelligence engine transforming raw multi-spectral satellite imagery into interactive agricultural drought forecasts.",
        award: "National Winner & Global Nominee",
        university: "University of Moratuwa",
      },
      {
        teamName: "HelioWatch Ceylon",
        projectName:
          "SolarStorm AI: Real-Time Geomagnetic Disturbance Predictor",
        category: "Galactic Impact",
        description:
          "A machine learning pipeline forecasting geomagnetic disturbances using real-time NASA SDO solar telescope streams.",
        award: "Global Nominee",
        university: "University of Peradeniya",
      },
      {
        teamName: "GreenOrbit SL",
        projectName: "OceanBio: Coastal Coral Reef Health Sentinel",
        category: "Local Impact",
        description:
          "A remote sensing model analyzing sea surface temperature anomalies and chlorophyll concentrations to assess coral bleaching risks.",
        award: "Global Nominee",
        university: "University of Colombo",
      },
    ],
    highlights: [
      "Hosted in collaboration with NSBM Green University and the U.S. Embassy in Sri Lanka.",
      "Keynote addresses from leading Sri Lankan astrophysicists, satellite engineers, and international space researchers.",
      "Over 90 projects submitted spanning all 9 provinces of Sri Lanka.",
    ],
    partnerInstitutions: [
      "U.S. Embassy in Sri Lanka (American Center Colombo)",
      "NSBM Green University",
      "Arthur C. Clarke Institute for Modern Technologies (ACCIMT)",
      "SEDS Sri Lanka Chapter Network (Moratuwa, Colombo, Peradeniya, SLIIT, Ruhuna, etc.)",
    ],
  },
  "2024": {
    year: "2024",
    theme: "The Sun Touches Everything",
    title: "NASA Space Apps Challenge Sri Lanka 2024",
    tagline:
      "Celebrating the solar maximum and harnessing solar, space science, and Earth observation open data.",
    date: "October 5 - 6, 2024",
    format: "Hybrid (In-Person Colombo & Online)",
    location: "Colombo & Nationwide Virtual Nodes",
    participantsCount: "680+ Participants",
    teamsCount: "94 Teams",
    projectsSubmitted: "76 Solutions",
    globalNomineesCount: "Global & Local Nominees",
    registrationStatus: "concluded",
    overview: [
      "NASA Space Apps 2024 centered around the official NASA theme 'The Sun Touches Everything,' spotlighting heliophysics, the solar cycle, and solar interactions with terrestrial technologies.",
      "Organized across 48 continuous hours, Sri Lankan innovators created cutting-edge applications combining NASA open data with modern AI, web development, and 3D geospatial rendering.",
      "Over 90 teams worked across the weekend, supported by technical mentors from SEDS university chapters and industry partners.",
    ],
    focusAreas: [
      "Heliophysics & Solar Storm Monitoring",
      "Ocean Biodiversity & Sea Surface Temperature",
      "Planetary Rover Navigation Simulators",
      "Gamified Astrophysics Education for K-12",
      "Disaster Early Warning Using SAR Data",
    ],
    nominees: [
      {
        teamName: "AuroraCast SL",
        projectName: "Geomagnetic Solar Flux Visualizer",
        category: "Best Use of Data",
        description:
          "An interactive mapping tool visualizing aurora probability and geomagnetic disruption risks using live ACE and DSCOVR satellite feeds.",
        award: "Global Nominee",
        university: "University of Moratuwa",
      },
      {
        teamName: "AquaSentinel Lanka",
        projectName: "Coastal Mangrove Health Sentinel",
        category: "Local Impact",
        description:
          "Remote sensing analysis of Sri Lankan coastal mangrove health and blue carbon reserves using Landsat 9 and Sentinel-2 data.",
        award: "National Winner",
        university: "University of Colombo",
      },
    ],
    highlights: [
      "High participation from school teams supported through SEDS Junior workshops.",
      "Mentorship sessions with international astrophysicists and aerospace researchers.",
      "Special workshops on navigating NASA Earthdata and NASA Open APIs.",
    ],
    partnerInstitutions: [
      "U.S. Embassy in Sri Lanka",
      "SEDS Sri Lanka Chapters",
      "Arthur C. Clarke Institute (ACCIMT)",
    ],
  },
  "2023": {
    year: "2023",
    theme: "Explore Open Science Together",
    title: "NASA Space Apps Challenge Sri Lanka 2023",
    tagline:
      "Championing NASA's Year of Open Science with open-source tools, collaborative algorithms, and inclusive space education.",
    date: "October 7 - 8, 2023",
    format: "Hybrid (Colombo Hub & Regional Centers)",
    location: "Colombo & Regional University Centers",
    participantsCount: "580+ Participants",
    teamsCount: "82 Teams",
    projectsSubmitted: "64 Solutions",
    globalNomineesCount: "Global Nominees & Finalists",
    registrationStatus: "concluded",
    overview: [
      "In alignment with NASA's Year of Open Science, the 2023 Challenge emphasized accessible research, open-source code repositories, and collaborative problem-solving.",
      "SEDS Sri Lanka facilitated awareness campaigns, hands-on data workshops, and regional study sessions bridging students across provinces.",
      "Projects spanned from climate mitigation tools to deep-space spectrometer analysis.",
    ],
    focusAreas: [
      "NASA Year of Open Science Collaboration",
      "Agricultural Yield Optimization Using MODIS Data",
      "Lunar Water Ice Mapping & Extraction Architectures",
      "Space Debris Orbital Tracking Visualization",
      "Citizen Science Mobile Platforms",
    ],
    nominees: [
      {
        teamName: "OrbitalShield SL",
        projectName: "LEO Conjunction Risk Engine",
        category: "Best Mission Concept",
        description:
          "Open-source orbital dynamics software calculating conjunction risks between low Earth orbit satellites.",
        award: "Global Nominee",
        university: "University of Peradeniya",
      },
      {
        teamName: "AgroVision Ceylon",
        projectName: "Drought Forecaster for Dry Zone Agriculture",
        category: "Galactic Impact",
        description:
          "Using NASA SMAP soil moisture data to provide localized irrigation advisories for Sri Lankan farmers.",
        award: "National Winner",
        university: "Wayamba University of Sri Lanka",
      },
    ],
    highlights: [
      "Major focus on open-source code repositories released under MIT and Apache licenses.",
      "Hands-on guidance on NASA Earthdata, Planetary Data System (PDS), and API portals.",
    ],
    partnerInstitutions: [
      "SEDS Sri Lanka Chapter Network",
      "University of Peradeniya",
      "Wayamba University",
    ],
  },
  "2022": {
    year: "2022",
    theme: "Make Space",
    title: "NASA Space Apps Challenge Sri Lanka 2022",
    tagline:
      "Celebrating diversity, expanding access to aerospace frontiers, and building inclusive solutions.",
    date: "October 1 - 2, 2022",
    format: "Hybrid Hackathon",
    location: "Colombo & Virtual Tracks",
    participantsCount: "520+ Participants",
    teamsCount: "70 Teams",
    projectsSubmitted: "54 Solutions",
    globalNomineesCount: "Global Nominees",
    registrationStatus: "concluded",
    overview: [
      "The 'Make Space' theme emphasized breaking down barriers and welcoming artists, social scientists, and young coders into the space community.",
      "SEDS Sri Lanka provided multi-track mentoring covering software, hardware design, and scientific storytelling.",
      "Sri Lankan teams distinguished themselves with creative applications in wildlife conservation and asteroid tracking.",
    ],
    focusAreas: [
      "Inclusivity in Space STEM",
      "Wildlife Corridor Mapping with Satellite GIS",
      "Near-Earth Asteroid Hazard Notification",
      "Mars Habitat Closed-Loop Ecology Systems",
    ],
    nominees: [
      {
        teamName: "EcoSpace Lanka",
        projectName: "Satellite GIS for Human-Elephant Conflict Mitigation",
        category: "Local Impact",
        description:
          "Satellite vegetation index analysis identifying elephant corridor movements near agricultural boundaries.",
        award: "National Winner & Global Nominee",
        university: "University of Moratuwa",
      },
    ],
    highlights: [
      "Early integration of James Webb Space Telescope (JWST) initial data releases into challenge topics.",
      "Strong participation from multidisciplinary and cross-university student teams.",
    ],
    partnerInstitutions: [
      "SEDS Sri Lanka Chapters",
      "University of Moratuwa",
      "University of Colombo",
    ],
  },
  "2021": {
    year: "2021",
    theme: "The Power of Ten",
    title: "NASA Space Apps Challenge Sri Lanka 2021",
    tagline:
      "Commemorating 10 years of global space hackathons with record virtual engagement across Sri Lanka.",
    date: "October 2 - 3, 2021",
    format: "Fully Virtual Hackathon",
    location: "Virtual Mainstage (All 9 Provinces)",
    participantsCount: "620+ Participants",
    teamsCount: "88 Teams",
    projectsSubmitted: "72 Solutions",
    globalNomineesCount: "Global Nominees",
    registrationStatus: "concluded",
    overview: [
      "Marking the 10th anniversary of the NASA Space Apps Challenge globally, SEDS Sri Lanka facilitated a nationwide virtual hackathon during pandemic lockdowns.",
      "With virtual mentoring Discord channels, virtual pitch stages, and panel reviews, Sri Lankan students displayed technical creativity across diverse fields.",
    ],
    focusAreas: [
      "10-Year Global Space Data Retrospective",
      "COVID-19 Air Quality Trends from Satellite Gas Spectrometers",
      "Micro-Gravity Space Biology Simulations",
      "Next-Gen Lunar Rover Mobility Design",
    ],
    nominees: [
      {
        teamName: "AtmoClean SL",
        projectName: "Atmospheric Carbon Flux Tracker",
        category: "Best Use of Data",
        description:
          "Comparative atmospheric emissions analysis platform utilizing Sentinel-5P and NASA OCO-2 carbon satellite data.",
        award: "National Winner & Global Nominee",
        university: "University of Moratuwa",
      },
    ],
    highlights: [
      "Round-the-clock 48-hour continuous virtual coordination across all 9 provinces.",
      "Dedicated mentoring rooms covering machine learning, GIS, and hardware design.",
    ],
    partnerInstitutions: [
      "SEDS Sri Lanka Chapter Network",
      "University of Moratuwa",
      "University of Peradeniya",
    ],
  },
  "2020": {
    year: "2020",
    theme: "Take Action",
    title: "NASA Space Apps Challenge Sri Lanka 2020",
    tagline:
      "Empowering young thinkers to take immediate action on climate change, pandemic response, and planetary health.",
    date: "October 2 - 4, 2020",
    format: "Virtual Hackathon (NASA Space Apps Colombo 2020)",
    location: "Virtual Event Platform / Colombo",
    participantsCount: "600+ Participants",
    teamsCount: "60+ Teams",
    projectsSubmitted: "50+ Solutions",
    globalNomineesCount: "Global Nominees & Galactic Problem Solvers",
    registrationStatus: "concluded",
    overview: [
      "SEDS Sri Lanka organized NASA Space Apps Colombo 2020 virtually amidst unprecedented global circumstances, drawing approximately 600 participants and over 60 teams.",
      "Participants addressed real-world Earth and space challenges, with standout teams achieving Global Nominee status and Galactic Problem Solver recognitions.",
      "The event cemented SEDS Sri Lanka's central role in the nationwide space hackathon ecosystem.",
    ],
    focusAreas: [
      "Earth Observation During Global Lockdowns",
      "Flood Prediction in Tropical River Basins",
      "Automated Asteroid Detection from Sky Surveys",
      "Planetary Sustainability & Health",
    ],
    nominees: [
      {
        teamName: "TerraPulse Lanka",
        projectName: "FloodGuard SL: Basin Level Precipitation Alert",
        category: "Local Impact",
        description:
          "Integrating NASA GPM precipitation measurements with Sri Lankan hydrological models for river basin flood alerts.",
        award: "National Winner & Global Nominee",
        university: "University of Moratuwa",
      },
    ],
    highlights: [
      "Over 600 participants registered across Sri Lankan higher education institutions.",
      "Several participants received Galactic Problem Solver recognitions from NASA Space Apps.",
    ],
    partnerInstitutions: [
      "SEDS Sri Lanka Chapters",
      "Arthur C. Clarke Institute for Modern Technologies",
      "U.S. Embassy in Sri Lanka",
    ],
  },
  "2019": {
    year: "2019",
    theme: "Earth and Space",
    title: "NASA Space Apps Challenge Sri Lanka 2019",
    tagline:
      "The inaugural national edition facilitated under SEDS Sri Lanka leadership, establishing the country's flagship space hackathon tradition.",
    date: "October 18 - 20, 2019",
    format: "In-Person Hackathon",
    location: "Colombo, Sri Lanka",
    participantsCount: "350+ Participants",
    teamsCount: "45 Teams",
    projectsSubmitted: "38 Solutions",
    globalNomineesCount: "2 Global Nominees",
    registrationStatus: "concluded",
    overview: [
      "In 2019, SEDS Sri Lanka stepped forward to actively facilitate the NASA International Space Apps Challenge in Sri Lanka.",
      "The inaugural in-person hackathon gathered passionate university undergraduates from Moratuwa, Peradeniya, Colombo, and SLIIT for an intensive weekend of code, aerospace ideation, and collaborative problem solving.",
      "This landmark event established the foundation for Sri Lanka's annual NASA Space Apps hackathon tradition.",
    ],
    focusAreas: [
      "Earth's Oceans & Marine Ecosystems",
      "Our Moon: Lunar Exploration Strategies",
      "Planets Near and Far: Exoplanet Hunting",
      "To the Stars: Deep Space Navigation",
    ],
    nominees: [
      {
        teamName: "LunarPioneers SL",
        projectName: "Autonomous Lunar Crater Navigation",
        category: "Best Mission Concept",
        description:
          "A pathfinding simulation for small rovers navigating lunar polar permanently shadowed regions.",
        award: "National Winner & Global Nominee",
        university: "University of Moratuwa",
      },
    ],
    highlights: [
      "Inaugural national space hackathon under SEDS Sri Lanka facilitation.",
      "Keynote addresses and judging by Sri Lanka's astronomy academics and aerospace engineers.",
    ],
    partnerInstitutions: [
      "SEDS Sri Lanka Founding Chapter Network",
      "Arthur C. Clarke Institute for Modern Technologies",
    ],
  },
};

export function getAllSpaceAppsYears(): string[] {
  return ["2025", "2024", "2023", "2022", "2021", "2020", "2019"];
}

export function getSpaceAppsEdition(year: string): SpaceAppsEdition | null {
  return NASA_SPACE_APPS_EDITIONS[year] || null;
}

export function getLatestSpaceAppsEdition(): SpaceAppsEdition {
  return NASA_SPACE_APPS_EDITIONS["2025"] || NASA_SPACE_APPS_EDITIONS["2024"];
}
