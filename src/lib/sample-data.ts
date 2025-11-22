import { ResumeData } from '@/types/resume'
import { v4 as uuidv4 } from 'uuid'

// Generate UUID utility for sample data
const generateId = () => uuidv4()

export const sampleResumeData: ResumeData = {
  id: generateId(),
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    portfolio: 'https://alexjohnson.dev/portfolio',
    summary: 'Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Strong background in leading cross-functional teams and delivering high-quality software solutions.',
  },
  experience: [
    {
      id: generateId(),
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Developer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      location: 'San Francisco, CA',
      description: [
        'Lead development of microservices architecture serving 1M+ users',
        'Mentored 3 junior developers and conducted code reviews',
        'Improved application performance by 40% through optimization',
        'Collaborated with design team to implement responsive UI components'
      ],
      achievements: [
        'Reduced deployment time by 60% by implementing CI/CD pipeline',
        'Increased test coverage from 60% to 95%'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Docker']
    },
    {
      id: generateId(),
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      location: 'Austin, TX',
      description: [
        'Developed and maintained web applications using React and Express.js',
        'Designed and implemented RESTful APIs',
        'Worked closely with product team to define requirements',
        'Participated in agile development process and sprint planning'
      ],
      achievements: [
        'Built user dashboard that increased user engagement by 25%',
        'Optimized database queries reducing load times by 50%'
      ],
      technologies: ['React', 'JavaScript', 'Express.js', 'MongoDB', 'Redis']
    },
    {
      id: generateId(),
      company: 'WebDev Solutions',
      position: 'Frontend Developer',
      startDate: '2019-06',
      endDate: '2020-02',
      current: false,
      location: 'Remote',
      description: [
        'Created responsive web interfaces for various client projects',
        'Collaborated with designers to implement pixel-perfect designs',
        'Ensured cross-browser compatibility and accessibility standards',
        'Maintained and updated existing client websites'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Sass']
    }
  ],
  education: [
    {
      id: generateId(),
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-08',
      endDate: '2019-05',
      current: false,
      location: 'Berkeley, CA',
      gpa: '3.8',
      honors: ['Cum Laude', 'Dean\'s List (4 semesters)'],
      coursework: [
        'Data Structures and Algorithms',
        'Software Engineering',
        'Database Systems',
        'Computer Networks',
        'Machine Learning'
      ]
    }
  ],
  projects: [
    {
      id: generateId(),
      name: 'E-Commerce Platform',
      description: 'Full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'AWS S3'],
      startDate: '2023-01',
      endDate: '2023-06',
      current: false,
      url: 'https://ecommerce-demo.com',
      github: 'https://github.com/alexjohnson/ecommerce-platform',
      highlights: [
        'Implemented secure payment processing with Stripe',
        'Built real-time inventory tracking system',
        'Created responsive design supporting mobile and desktop',
        'Achieved 99.9% uptime with automated testing and monitoring'
      ]
    },
    {
      id: generateId(),
      name: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team collaboration features.',
      technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      startDate: '2022-08',
      endDate: '2022-12',
      current: false,
      url: 'https://taskmanager-app.com',
      github: 'https://github.com/alexjohnson/task-manager',
      highlights: [
        'Real-time collaboration using WebSocket connections',
        'Drag-and-drop interface for task organization',
        'Integrated notifications and deadline reminders',
        'Mobile-responsive design with offline capabilities'
      ]
    },
    {
      id: generateId(),
      name: 'Weather Forecast API',
      description: 'RESTful API service providing weather forecasts with caching and rate limiting.',
      technologies: ['Node.js', 'Express', 'Redis', 'OpenWeather API'],
      startDate: '2021-11',
      endDate: '2022-01',
      current: false,
      github: 'https://github.com/alexjohnson/weather-api',
      highlights: [
        'Implemented intelligent caching strategy reducing API calls by 80%',
        'Added comprehensive rate limiting and authentication',
        'Achieved 50ms average response time',
        'Documented API with OpenAPI specification'
      ]
    }
  ],
  skills: [
    { id: generateId(), name: 'React', category: 'technical', level: 'expert', years: 5 },
    { id: generateId(), name: 'TypeScript', category: 'technical', level: 'advanced', years: 4 },
    { id: generateId(), name: 'Node.js', category: 'technical', level: 'expert', years: 5 },
    { id: generateId(), name: 'Python', category: 'technical', level: 'advanced', years: 3 },
    { id: generateId(), name: 'AWS', category: 'technical', level: 'advanced', years: 3 },
    { id: generateId(), name: 'PostgreSQL', category: 'technical', level: 'advanced', years: 4 },
    { id: generateId(), name: 'MongoDB', category: 'technical', level: 'intermediate', years: 3 },
    { id: generateId(), name: 'Docker', category: 'tool', level: 'advanced', years: 2 },
    { id: generateId(), name: 'Git', category: 'tool', level: 'expert', years: 6 },
    { id: generateId(), name: 'Leadership', category: 'soft', level: 'advanced' },
    { id: generateId(), name: 'Communication', category: 'soft', level: 'expert' },
    { id: generateId(), name: 'Problem Solving', category: 'soft', level: 'expert' }
  ],
  certificates: [
    {
      id: generateId(),
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-03',
      expiryDate: '2026-03',
      credentialId: 'AWS-SAA-2023-001',
      url: 'https://aws.amazon.com/certification/'
    },
    {
      id: generateId(),
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2022-11',
      credentialId: 'PSM-I-2022-456',
      url: 'https://scrum.org/certificates'
    }
  ],
  languages: [
    { id: generateId(), name: 'English', proficiency: 'native' },
    { id: generateId(), name: 'Spanish', proficiency: 'conversational' },
    { id: generateId(), name: 'French', proficiency: 'basic' }
  ],
  references: [
    {
      id: generateId(),
      name: 'Sarah Chen',
      position: 'Engineering Manager',
      company: 'TechCorp Inc.',
      email: 'sarah.chen@techcorp.com',
      phone: '+1 (555) 987-6543',
      relationship: 'Direct Manager'
    },
    {
      id: generateId(),
      name: 'Mike Rodriguez',
      position: 'Senior Software Engineer',
      company: 'StartupXYZ',
      email: 'mike.r@startupxyz.com',
      relationship: 'Former Colleague'
    }
  ],
  customSections: [],
  createdAt: '2023-01-15T10:00:00.000Z',
  updatedAt: new Date().toISOString()
}

export const emptyResumeData: ResumeData = {
  id: '',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
  certificates: [],
  languages: [],
  references: [],
  customSections: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}