// Fallback data for when Sanity is not connected
export const fallbackProjects = [
  {
    _id: "1",
    title: "FinTech Platform",
    slug: { current: "fintech-platform" },
    description:
      "A comprehensive financial management platform serving 50,000+ users with real-time processing.",
    overview:
      "Built a scalable financial platform with microservices architecture, reducing transaction processing time by 75% and improving user satisfaction by 40%.",
    client: "SecureBank",
    role: "Lead Frontend Engineer",
    duration: "8 months",
    year: "2023",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    mainImage: null,
    githubUrl: "https://github.com/amadisheriff/fintech-platform",
    liveUrl: "https://fintech-demo.vercel.app",
    challenge:
      "The existing legacy system was struggling with performance issues, poor user experience, and security vulnerabilities. The client needed a complete overhaul that could handle high transaction volumes while maintaining regulatory compliance.",
    solution:
      "I architected a modern, scalable solution using React and Node.js, implementing microservices architecture for better performance and maintainability. The new platform reduced transaction processing time by 75% and improved user satisfaction scores by 40%.",
    results: [
      "75% reduction in transaction processing time",
      "40% improvement in user satisfaction",
      "99.9% uptime achieved",
      "50K+ active users onboarded",
    ],
    images: [null, null, null],
    orderRank: 1,
  },
  {
    _id: "2",
    title: "E-Commerce Engine",
    slug: { current: "ecommerce-engine" },
    description:
      "High-performance e-commerce platform with advanced analytics and inventory management.",
    overview:
      "Developed a modern e-commerce solution with real-time inventory tracking, advanced analytics, and seamless payment integration.",
    client: "RetailCorp",
    role: "Full Stack Developer",
    duration: "6 months",
    year: "2023",
    stack: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Redis", "Vercel"],
    mainImage: null,
    githubUrl: "https://github.com/amadisheriff/ecommerce-engine",
    liveUrl: "https://ecommerce-demo.vercel.app",
    challenge:
      "Building a scalable e-commerce platform that could handle high traffic loads while providing real-time inventory updates and seamless checkout experience.",
    solution:
      "Implemented a modern stack with Next.js for optimal performance, integrated Stripe for payments, and used Redis for caching to ensure fast response times.",
    results: [
      "300% increase in conversion rates",
      "50ms average page load time",
      "99.99% payment success rate",
      "Real-time inventory sync",
    ],
    images: [null, null, null],
    orderRank: 2,
  },
  {
    _id: "3",
    title: "AI Content Studio",
    slug: { current: "ai-content-studio" },
    description:
      "AI-powered content creation platform with advanced natural language processing.",
    overview:
      "Created an intelligent content creation platform that helps businesses generate high-quality content using advanced AI models.",
    client: "ContentAI",
    role: "Senior Frontend Engineer",
    duration: "10 months",
    year: "2024",
    stack: ["React", "Python", "OpenAI", "FastAPI", "PostgreSQL", "Docker"],
    mainImage: null,
    githubUrl: "https://github.com/amadisheriff/ai-content-studio",
    liveUrl: "https://ai-content-demo.vercel.app",
    challenge:
      "Developing an intuitive interface for complex AI operations while ensuring fast response times and maintaining content quality.",
    solution:
      "Built a responsive React frontend with real-time collaboration features, integrated multiple AI models, and implemented smart caching strategies.",
    results: [
      "90% reduction in content creation time",
      "500+ active business users",
      "95% user satisfaction rate",
      "Multi-language support",
    ],
    images: [null, null, null],
    orderRank: 3,
  },
  {
    _id: "4",
    title: "Healthcare Dashboard",
    slug: { current: "healthcare-dashboard" },
    description:
      "Real-time healthcare analytics platform for medical professionals.",
    overview:
      "Developed a comprehensive healthcare dashboard that provides real-time patient data visualization and analytics for medical professionals.",
    client: "MedTech Solutions",
    role: "Senior Full Stack Developer",
    duration: "12 months",
    year: "2024",
    stack: ["Vue.js", "Node.js", "MongoDB", "Socket.io", "Chart.js", "AWS"],
    mainImage: null,
    githubUrl: "https://github.com/amadisheriff/healthcare-dashboard",
    liveUrl: "https://healthcare-demo.vercel.app",
    challenge:
      "Creating a HIPAA-compliant platform that could handle sensitive patient data while providing real-time updates and intuitive data visualization.",
    solution:
      "Implemented end-to-end encryption, real-time data synchronization with Socket.io, and created intuitive charts and graphs for complex medical data.",
    results: [
      "HIPAA compliance achieved",
      "Real-time data for 10K+ patients",
      "60% improvement in diagnosis speed",
      "99.9% data security maintained",
    ],
    images: [null, null, null],
    orderRank: 4,
  },
  {
    _id: "5",
    title: "Social Media Analytics",
    slug: { current: "social-media-analytics" },
    description:
      "Advanced social media analytics platform with AI-powered insights.",
    overview:
      "Built a comprehensive social media analytics platform that provides AI-powered insights and automated reporting for marketing teams.",
    client: "SocialMetrics Inc",
    role: "Lead Developer",
    duration: "9 months",
    year: "2023",
    stack: ["React", "Python", "TensorFlow", "PostgreSQL", "Redis", "Docker"],
    mainImage: null,
    githubUrl: "https://github.com/amadisheriff/social-analytics",
    liveUrl: "https://social-analytics-demo.vercel.app",
    challenge:
      "Processing massive amounts of social media data in real-time while providing actionable insights through machine learning algorithms.",
    solution:
      "Developed a scalable data pipeline using Python and TensorFlow, implemented real-time data processing, and created an intuitive dashboard for data visualization.",
    results: [
      "Processing 1M+ posts daily",
      "85% accuracy in sentiment analysis",
      "50% reduction in reporting time",
      "200+ enterprise clients",
    ],
    images: [null, null, null],
    orderRank: 5,
  },
];

export const fallbackExperiences = [
  {
    id: "exp1",
    company: "TechCorp Solutions",
    role: "Senior Software Engineer",
    period: "2022 - Present",
    location: "Remote",
    type: "Full-time",
    description:
      "Leading development of fintech platforms serving 50,000+ users. Architecting scalable microservices infrastructure and mentoring junior developers.",
    achievements: [
      "Reduced transaction processing time by 75%",
      "Improved team productivity by 40% through code review processes",
      "Led migration to microservices architecture",
      "Implemented automated testing and CI/CD pipelines",
    ],
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "AWS",
      "Docker",
      "PostgreSQL",
    ],
    order: 1,
    current: true,
  },
  {
    id: "exp2",
    company: "StartupXYZ",
    role: "Full Stack Developer",
    period: "2020 - 2022",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "Built responsive e-commerce platforms and developed RESTful APIs. Collaborated with design teams to implement pixel-perfect UI components.",
    achievements: [
      "Achieved 300% increase in conversion rates",
      "Reduced page load times by 60%",
      "Integrated multiple third-party services",
      "Delivered 15+ client projects on time",
    ],
    technologies: ["React", "Next.js", "Stripe", "MongoDB", "Express.js"],
    order: 2,
    current: false,
  },
  {
    id: "exp3",
    company: "Digital Agency Pro",
    role: "Frontend Developer",
    period: "2019 - 2020",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "Developed custom WordPress themes and React applications for diverse client projects. Ensured cross-browser compatibility and responsive designs.",
    achievements: [
      "Completed 20+ client projects successfully",
      "Improved client satisfaction scores by 35%",
      "Reduced development time by implementing reusable components",
      "Mentored 2 junior developers",
    ],
    technologies: ["JavaScript", "WordPress", "React", "CSS3", "PHP"],
    order: 3,
    current: false,
  },
];

export const fallbackAbout = {
  title: "Manifesto",
  bio: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "I'm a senior software engineer with over 5 years of experience building scalable web applications and leading development teams. My passion lies in creating exceptional user experiences through thoughtful code architecture and innovative problem-solving.",
        },
      ],
    },
  ],
  manifesto: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "I believe that exceptional software is born at the intersection of technical excellence and human empathy. Every line of code I write serves a purpose beyond functionality—it creates experiences that matter.",
        },
      ],
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "My approach combines rigorous engineering principles with creative problem-solving, always asking not just 'how can we build this?' but 'how can we build this better?'",
        },
      ],
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "With over 6 years of experience across fintech, e-commerce, and AI platforms, I've learned that the most impactful solutions emerge when we deeply understand both the technology and the people who use it.",
        },
      ],
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Docker", "Vercel", "CI/CD"],
    },
    {
      category: "Tools & Methods",
      items: ["Git", "Figma", "Agile", "Testing"],
    },
  ],
  profileImage: null,
  email: "hello@amadisheriff.dev",
  socialLinks: [
    { platform: "github", url: "https://github.com/amadisheriff" },
    { platform: "linkedin", url: "https://linkedin.com/in/amadisheriff" },
    { platform: "twitter", url: "https://twitter.com/amadisheriff" },
  ],
};

export const fallbackHero = {
  headline: "I build digital products with intention and identity.",
  subheadline:
    "Senior Software Engineer crafting exceptional user experiences through thoughtful code architecture and innovative problem-solving. Currently available for new opportunities.",
  ctaText: "View My Work",
  ctaLink: "#work",
  status: "Currently available",
  location: "Based in Lagos, Nigeria",
};
