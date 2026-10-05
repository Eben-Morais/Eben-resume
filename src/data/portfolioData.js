export const portfolioData = {
  personal: {
    name: "Eben Artizio Morais",
    shortName: "Eben Morais",
    roles: ["Junior Web Developer", "Junior Backend Developer"],
    availability: "Open to junior web and backend opportunities",
    tagline: "Final-year Computer Engineering student with practical front-end and backend training, building focused web applications and an IoT-based vehicle emissions monitoring system.",
    bio: [
      "I am a Computer Engineering graduate (B.E. with Honors in AI/ML) and Diploma holder with hands-on experience spanning full-stack web development and quality assurance. My recent work includes building NestJS backends with robust authentication and Prisma ORM, translating Figma designs into responsive webpages, and automating end-to-end test suites using Playwright. As a quick learner and natural problem-solver, I focus on turning complex technical concepts into reliable, production-ready applications. I am actively seeking Junior Web Developer and Junior Backend Developer roles."
    ],
    facts: [
      { label: "Location", value: "Moira, Goa, India" },
      { label: "Education", value: "B.E. Computer Engineering" },
      { label: "Honors", value: "AI & Machine Learning" },
      { label: "Current CGPA", value: "7" },
      { label: "Primary focus", value: "Web & backend development" },
      { label: "Languages", value: "English, Konkani, Hindi" }
    ],
    highlights: [
      { value: "2", label: "development internships" },
      { value: "2", label: "featured projects" },
      { value: "4", label: "certifications" },
      { value: "2026", label: "graduated" }
    ]
  },

  skills: [
    {
      category: "Programming Languages",
      items: ["Java", "C", "C++", "Python", "JavaScript"]
    },
    {
      category: "Front-End Technologies",
      items: ["HTML", "CSS", "JavaScript", "React", "Figma-to-code"]
    },
    {
      category: "Back-End Technologies",
      items: ["NestJS", "Prisma", "Authentication", "Route Protection"]
    },
    {
      category: "Data & Integration",
      items: ["SQL", "Database Integration", "Sensor Data", "Wi-Fi Streaming"]
    },
    {
      category: "Platforms & Project Tools",
      items: ["ESP32", "IoT", "GitHub", "Web Dashboards"]
    },
    {
      category: "Foundational Knowledge",
      items: [
        "Data Structures & Algorithms",
        "Cybersecurity & Privacy",
        "Generative AI",
        "Problem Solving"
      ]
    }
  ],

  experience: [
    {
      role: "Quality Assurance Engineer",
      company: "Simforge",
      period: "Jul 2026 – Present",
      type: "Full time · Quality Assurance Engineer",
      responsibilities: [
        "Automated end-to-end regression test suites with Playwright, significantly improving testing efficiency.",
        "Executed exploratory and manual testing to discover, track, and resolve critical bugs.",
        "Conducted pre-deployment verification for fixes and features, preventing high-priority regressions in production.."
      ],
      tags: ["QA", "Playwright", "Automated Testing", "ManualTesting"]
    },
    {
      role: "Web Developer Trainee",
      company: "Remote Software Solutions Pvt. Ltd.",
      period: "Jul 2025 – Aug 2025",
      type: "Eight-week industrial training · Backend web development",
      responsibilities: [
        "Contributed to backend development and implementation using NestJS.",
        "Worked with authentication and route-protection features.",
        "Supported database integration using Prisma."
      ],
      tags: ["NestJS", "Prisma", "Authentication", "Backend"]
    },
    {
      role: "Front-End Developer Trainee",
      company: "Tentwenty Digital LLP.",
      period: "Aug 2022 – Oct 2022",
      type: "Eight-week industrial training · Front-end development",
      responsibilities: [
        "Contributed to website design and implementation activities.",
        "Used HTML, CSS, and JavaScript to reproduce a webpage from a Figma design."
      ],
      tags: ["HTML", "CSS", "JavaScript", "Figma-to-code"]
    },
    {
      role: "Robotics Internship Training",
      company: "Funminds Learning Tech Pvt. Ltd.",
      location: "Goa",
      period: "2021 · 40 hours",
      responsibilities: [
        "Completed a 40-hour internship training programme focused on robotics."
      ]
    }
  ],

  projects: [
    {
      title: "Vehicle Pollution Monitoring System",
      category: "Monitoring · Dashboard",
      description: "An IoT system designed to monitor vehicle emissions continuously and alert the owner when readings exceed the applicable legal limit.",
      points: [
        "Used an ESP32 to collect sensor data.",
        "Streamed readings through Wi-Fi to a database.",
        "Displayed emissions analytics in a web-based dashboard."
      ],
      tags: ["ESP32", "C++", "HTML", "CSS", "JavaScript", "SQL"],
      note: "Repository and live-demo links were not provided in the CV."
    },
    {
      title: "Fitness Tracking Website",
      category: "Fitness · Progress",
      description: "A website concept that enables users to register, log daily workouts, and review progress reports throughout their fitness journey.",
      points: [
        "Structured user registration and workout-recording features.",
        "Created progress-report views for ongoing tracking."
      ],
      tags: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/devilsdesign/Fitnesshub"
    }
  ],

  education: [
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      institution: "Padre Conceicao College of Engineering, Verna, Goa",
      period: "Aug 2023 – Aug 2026",
      honors: "Artificial Intelligence and Machine Learning",
      score: "Current CGPA: 7"
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Government Polytechnic Panjim",
      period: "2020 – 2023",
      score: "72.80%"
    },
    {
      degree: "Secondary School Certificate (S.S.C.E.)",
      institution: "St. Britto's High School, Mapusa",
      period: "2020",
      score: "66.33%"
    }
  ],

  certifications: [
    {
      name: "Ethical Hacking",
      issuer: "NPTEL",
      date: "Oct 2024",
      description: "Online certification."
    },
    {
      name: "Data Structures and Algorithms Using Java",
      issuer: "NPTEL",
      date: "Oct 2024",
      description: "Online certification."
    },
    {
      name: "Cybersecurity and Privacy",
      issuer: "NPTEL",
      date: "Oct 2025",
      description: "Online certification."
    },
    {
      name: "Getting Started with Generative AI",
      issuer: "IBM SkillsBuild",
      date: "Jul 2026",
      description: "Foundational Generative AI certification."
    }
  ],

  contact: {
    email: "moraiseben@gmail.com",
    phone: "+91 94048 22712",
    location: "Moira, Goa, India",
    linkedin: "https://www.linkedin.com/in/eben-morais",
    github: "https://github.com/Eben-Morais",
    cvFile: "/Eben_Morais_Ph.pdf",
    vcfFile: "/Eben_Morais.vcf",
    qrCode: "/Eben_Morais_Contact_QR.png"
  }
};
