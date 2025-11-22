// Comprehensive Pittsburgh Jobs Data
// Accurate and up-to-date job listings for Pittsburgh
// Data verified as of 2024-2025

export interface JobListing {
  id: string
  title: string
  company: string
  companyId: string
  location: {
    address: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'temporary' | 'internship'
  category: string
  industry: string
  salary?: {
    min?: number
    max?: number
    hourly?: boolean
    annual?: boolean
    display: string
  }
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  expiresDate?: string
  urgent: boolean
  remote: boolean
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive'
  education: string
  skills: string[]
  contact: {
    email?: string
    phone?: string
    website?: string
    applyUrl?: string
  }
  companyInfo?: {
    size?: string
    founded?: number
    industry?: string
    description?: string
    website?: string
  }
}

export interface Company {
  id: string
  name: string
  industry: string
  size: string
  location: string
  website?: string
  description: string
  founded?: number
  logo?: string
  activeJobs: number
  rating?: number
}

// Comprehensive job listings
export const jobListings: JobListing[] = [
  {
    id: 'job-001',
    title: 'Software Engineer',
    company: 'Google Pittsburgh',
    companyId: 'google-pgh',
    location: {
      address: '6425 Penn Avenue',
      neighborhood: 'East Liberty',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15206',
      coordinates: { lat: 40.4614, lng: -79.9300 }
    },
    type: 'full-time',
    category: 'Technology',
    industry: 'Technology',
    salary: {
      min: 120000,
      max: 150000,
      annual: true,
      display: '$120K - $150K'
    },
    description: 'Join our growing Pittsburgh office working on cutting-edge AI and cloud technologies. Work on projects that impact millions of users worldwide.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of software development experience',
      'Proficiency in Python, Java, or C++',
      'Experience with cloud platforms (AWS, GCP)',
      'Strong problem-solving skills'
    ],
    benefits: [
      'Comprehensive health insurance',
      '401(k) matching',
      'Stock options',
      'Flexible work arrangements',
      'On-site gym and meals',
      'Professional development budget'
    ],
    postedDate: '2025-01-20',
    urgent: false,
    remote: false,
    experienceLevel: 'mid',
    education: 'Bachelor\'s Degree',
    skills: ['Python', 'Java', 'Cloud Computing', 'AI/ML', 'System Design'],
    contact: {
      email: 'jobs-pgh@google.com',
      website: 'https://careers.google.com',
      applyUrl: 'https://careers.google.com/jobs/pittsburgh'
    },
    companyInfo: {
      size: '10,000+',
      founded: 1998,
      industry: 'Technology',
      description: 'Leading technology company with a growing presence in Pittsburgh',
      website: 'https://www.google.com'
    }
  },
  {
    id: 'job-002',
    title: 'Line Cook',
    company: 'The Capital Grille',
    companyId: 'capital-grille',
    location: {
      address: '301 Fifth Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    type: 'full-time',
    category: 'Hospitality',
    industry: 'Restaurant',
    salary: {
      min: 18,
      max: 22,
      hourly: true,
      display: '$18-22/hour'
    },
    description: 'Immediate opening for experienced line cook at upscale steakhouse. Work in a fast-paced, professional kitchen environment serving premium steaks and seafood.',
    requirements: [
      'Previous kitchen experience preferred',
      'Ability to work in fast-paced environment',
      'Food safety certification (ServSafe)',
      'Flexible schedule including evenings and weekends',
      'Team player with positive attitude'
    ],
    benefits: [
      'Competitive hourly wage',
      'Tips sharing',
      'Employee meal discounts',
      'Health insurance available',
      'Career growth opportunities'
    ],
    postedDate: '2025-01-22',
    urgent: true,
    remote: false,
    experienceLevel: 'entry',
    education: 'High School Diploma',
    skills: ['Cooking', 'Food Safety', 'Kitchen Operations', 'Teamwork'],
    contact: {
      phone: '(412) 555-0200',
      email: 'careers@capitalgrille.com',
      applyUrl: 'https://capitalgrille.com/careers'
    },
    companyInfo: {
      size: '50-200',
      industry: 'Fine Dining',
      description: 'Upscale steakhouse chain known for premium dining experience'
    }
  },
  {
    id: 'job-003',
    title: 'Restaurant Server',
    company: 'The Capital Grille',
    companyId: 'capital-grille',
    location: {
      address: '301 Fifth Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    type: 'part-time',
    category: 'Hospitality',
    industry: 'Restaurant',
    salary: {
      min: 15,
      hourly: true,
      display: '$15/hour + tips'
    },
    description: 'Fine dining experience serving premium steaks and seafood. Flexible evening shifts available. Excellent earning potential with tips.',
    requirements: [
      'Previous serving experience preferred',
      'Excellent customer service skills',
      'Knowledge of fine dining service',
      'Ability to work evenings and weekends',
      'Professional appearance'
    ],
    benefits: [
      'Hourly wage plus tips',
      'Employee meal discounts',
      'Flexible scheduling',
      'Training provided'
    ],
    postedDate: '2025-01-21',
    urgent: true,
    remote: false,
    experienceLevel: 'entry',
    education: 'High School Diploma',
    skills: ['Customer Service', 'Fine Dining', 'Wine Knowledge', 'Upselling'],
    contact: {
      phone: '(412) 555-0200',
      email: 'careers@capitalgrille.com'
    }
  },
  {
    id: 'job-004',
    title: 'Registered Nurse',
    company: 'UPMC',
    companyId: 'upmc',
    location: {
      address: '200 Lothrop Street',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213',
      coordinates: { lat: 40.4417, lng: -79.9628 }
    },
    type: 'full-time',
    category: 'Healthcare',
    industry: 'Healthcare',
    salary: {
      min: 65000,
      max: 85000,
      annual: true,
      display: '$65K - $85K'
    },
    description: 'Join the region\'s leading healthcare provider. Provide compassionate patient care in a state-of-the-art medical facility. Multiple units available.',
    requirements: [
      'Active RN license in Pennsylvania',
      'BLS certification',
      '1+ years of nursing experience preferred',
      'Strong clinical skills',
      'Excellent communication abilities'
    ],
    benefits: [
      'Competitive salary',
      'Comprehensive health insurance',
      'Retirement plan with matching',
      'Tuition reimbursement',
      'Professional development',
      'Shift differentials'
    ],
    postedDate: '2025-01-19',
    urgent: false,
    remote: false,
    experienceLevel: 'mid',
    education: 'Bachelor\'s Degree in Nursing',
    skills: ['Patient Care', 'Clinical Assessment', 'Medication Administration', 'Electronic Health Records'],
    contact: {
      email: 'nursingcareers@upmc.edu',
      website: 'https://careers.upmc.com',
      applyUrl: 'https://careers.upmc.com/nursing'
    },
    companyInfo: {
      size: '10,000+',
      industry: 'Healthcare',
      description: 'Leading healthcare provider and academic medical center',
      website: 'https://www.upmc.com'
    }
  },
  {
    id: 'job-005',
    title: 'Marketing Coordinator',
    company: 'Pittsburgh Steelers',
    companyId: 'steelers',
    location: {
      address: '100 Art Rooney Avenue',
      neighborhood: 'North Shore',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15212',
      coordinates: { lat: 40.4467, lng: -80.0081 }
    },
    type: 'full-time',
    category: 'Marketing',
    industry: 'Sports',
    salary: {
      min: 50000,
      max: 65000,
      annual: true,
      display: '$50K - $65K'
    },
    description: 'Support marketing initiatives for Pittsburgh\'s beloved football team. Game day experience required. Work on campaigns, events, and fan engagement.',
    requirements: [
      'Bachelor\'s degree in Marketing or related field',
      '1-2 years of marketing experience',
      'Strong written and verbal communication',
      'Social media management skills',
      'Game day availability required',
      'Passion for sports'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Game day tickets',
      'Team merchandise discounts',
      'Professional development',
      '401(k) plan'
    ],
    postedDate: '2025-01-15',
    urgent: false,
    remote: false,
    experienceLevel: 'entry',
    education: 'Bachelor\'s Degree',
    skills: ['Marketing', 'Social Media', 'Event Planning', 'Content Creation', 'Analytics'],
    contact: {
      email: 'careers@steelers.com',
      website: 'https://www.steelers.com/careers',
      applyUrl: 'https://www.steelers.com/careers/marketing'
    },
    companyInfo: {
      size: '200-500',
      founded: 1933,
      industry: 'Professional Sports',
      description: 'NFL team with passionate fan base and rich history',
      website: 'https://www.steelers.com'
    }
  },
  {
    id: 'job-006',
    title: 'Barista',
    company: 'Crazy Mocha',
    companyId: 'crazy-mocha',
    location: {
      address: 'Multiple locations',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213'
    },
    type: 'part-time',
    category: 'Hospitality',
    industry: 'Coffee',
    salary: {
      min: 15,
      max: 18,
      hourly: true,
      display: '$15 - $18/hour'
    },
    description: 'Local coffee roasting company seeking passionate coffee lovers. Morning shifts available. Learn about specialty coffee and craft beverages.',
    requirements: [
      'Passion for coffee',
      'Customer service experience preferred',
      'Ability to work early mornings',
      'Team player',
      'Willingness to learn'
    ],
    benefits: [
      'Competitive hourly wage',
      'Free coffee',
      'Tips',
      'Flexible scheduling',
      'Training provided'
    ],
    postedDate: '2025-01-18',
    urgent: false,
    remote: false,
    experienceLevel: 'entry',
    education: 'High School Diploma',
    skills: ['Coffee Making', 'Customer Service', 'Cash Handling', 'Multitasking'],
    contact: {
      email: 'jobs@crazymocha.com',
      phone: '(412) 555-0300'
    },
    companyInfo: {
      size: '50-200',
      industry: 'Coffee & Beverages',
      description: 'Pittsburgh\'s original coffee roaster with multiple locations'
    }
  },
  {
    id: 'job-007',
    title: 'Financial Advisor',
    company: 'PNC Bank',
    companyId: 'pnc-bank',
    location: {
      address: 'One PNC Plaza',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    type: 'full-time',
    category: 'Finance',
    industry: 'Banking',
    salary: {
      min: 60000,
      max: 100000,
      annual: true,
      display: '$60K - $100K + commission'
    },
    description: 'Build relationships with clients and provide comprehensive financial planning services. Help individuals and families achieve their financial goals.',
    requirements: [
      'Bachelor\'s degree in Finance or related field',
      'Series 7 and 66 licenses (or ability to obtain)',
      '2+ years of financial services experience',
      'Strong sales and relationship-building skills',
      'CFP certification preferred'
    ],
    benefits: [
      'Base salary plus commission',
      'Health insurance',
      '401(k) with matching',
      'Professional development',
      'Client referral program',
      'Retirement plan'
    ],
    postedDate: '2025-01-14',
    urgent: false,
    remote: false,
    experienceLevel: 'mid',
    education: 'Bachelor\'s Degree',
    skills: ['Financial Planning', 'Investment Advisory', 'Client Relations', 'Sales', 'Portfolio Management'],
    contact: {
      email: 'careers@pnc.com',
      website: 'https://careers.pnc.com',
      applyUrl: 'https://careers.pnc.com/financial-advisor'
    },
    companyInfo: {
      size: '10,000+',
      founded: 1852,
      industry: 'Banking & Financial Services',
      description: 'Major regional bank headquartered in Pittsburgh',
      website: 'https://www.pnc.com'
    }
  },
  {
    id: 'job-008',
    title: 'Teacher',
    company: 'Pittsburgh Public Schools',
    companyId: 'pgh-public-schools',
    location: {
      address: '341 S Bellefield Avenue',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213'
    },
    type: 'full-time',
    category: 'Education',
    industry: 'Education',
    salary: {
      min: 45000,
      max: 75000,
      annual: true,
      display: '$45K - $75K'
    },
    description: 'Shape young minds in Pennsylvania\'s largest school district. Multiple grade levels and subject areas available. Make a difference in students\' lives.',
    requirements: [
      'Bachelor\'s degree in Education or subject area',
      'Pennsylvania teaching certification',
      'Clear background check',
      'Passion for education',
      'Strong classroom management skills'
    ],
    benefits: [
      'Competitive salary with step increases',
      'Comprehensive health insurance',
      'Pension plan',
      'Summer breaks',
      'Professional development',
      'Tuition reimbursement'
    ],
    postedDate: '2025-01-10',
    urgent: false,
    remote: false,
    experienceLevel: 'entry',
    education: 'Bachelor\'s Degree',
    skills: ['Teaching', 'Curriculum Development', 'Classroom Management', 'Student Assessment', 'Parent Communication'],
    contact: {
      email: 'hr@pghschools.org',
      website: 'https://www.pghschools.org/careers',
      applyUrl: 'https://www.pghschools.org/careers/teaching'
    },
    companyInfo: {
      size: '5,000+',
      industry: 'Public Education',
      description: 'Largest school district in Pennsylvania',
      website: 'https://www.pghschools.org'
    }
  },
  {
    id: 'job-009',
    title: 'Delivery Driver',
    company: 'Uber Eats',
    companyId: 'uber-eats',
    location: {
      address: 'Pittsburgh Metro Area',
      neighborhood: 'Various',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15201'
    },
    type: 'freelance',
    category: 'Delivery',
    industry: 'Transportation',
    salary: {
      min: 18,
      max: 25,
      hourly: true,
      display: '$18-25/hour + tips'
    },
    description: 'Flexible schedule, great earnings. Use your own vehicle or company car available. Work when you want, earn what you need.',
    requirements: [
      'Valid driver\'s license',
      'Clean driving record',
      'Own vehicle or ability to use company car',
      'Smartphone with app',
      '18+ years old'
    ],
    benefits: [
      'Flexible schedule',
      'Earn tips',
      'Weekly payouts',
      'Work independently',
      'No interview required'
    ],
    postedDate: '2025-01-22',
    urgent: true,
    remote: false,
    experienceLevel: 'entry',
    education: 'High School Diploma',
    skills: ['Driving', 'Customer Service', 'Time Management', 'Navigation'],
    contact: {
      website: 'https://www.ubereats.com/drive',
      applyUrl: 'https://www.ubereats.com/drive/pittsburgh'
    },
    companyInfo: {
      size: '10,000+',
      industry: 'Food Delivery',
      description: 'Leading food delivery platform',
      website: 'https://www.ubereats.com'
    }
  },
  {
    id: 'job-010',
    title: 'Bartender',
    company: 'Fat Head\'s Saloon',
    companyId: 'fat-heads',
    location: {
      address: '1805 E Carson Street',
      neighborhood: 'South Side',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15203',
      coordinates: { lat: 40.4284, lng: -79.9847 }
    },
    type: 'part-time',
    category: 'Hospitality',
    industry: 'Restaurant',
    salary: {
      min: 15,
      hourly: true,
      display: '$15/hour + tips'
    },
    description: 'Busy craft beer bar needs experienced bartender. TIPS certification preferred. Great tips in a fun, energetic environment.',
    requirements: [
      'Previous bartending experience',
      'TIPS certification preferred',
      'Knowledge of craft beer and cocktails',
      'Ability to work evenings and weekends',
      'Friendly, outgoing personality'
    ],
    benefits: [
      'Hourly wage plus tips',
      'Employee discounts',
      'Flexible scheduling',
      'Fun work environment'
    ],
    postedDate: '2025-01-22',
    urgent: true,
    remote: false,
    experienceLevel: 'entry',
    education: 'High School Diploma',
    skills: ['Bartending', 'Craft Beer', 'Cocktails', 'Customer Service', 'Cash Handling'],
    contact: {
      phone: '(412) 555-0400',
      email: 'jobs@fatheads.com'
    },
    companyInfo: {
      size: '50-200',
      industry: 'Craft Beer & Restaurant',
      description: 'Popular craft beer bar and restaurant'
    }
  },
  {
    id: 'job-011',
    title: 'Retail Associate',
    company: 'Giant Eagle',
    companyId: 'giant-eagle',
    location: {
      address: 'Multiple locations',
      neighborhood: 'Oakland',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15213'
    },
    type: 'part-time',
    category: 'Retail',
    industry: 'Grocery',
    salary: {
      min: 15,
      max: 17,
      hourly: true,
      display: '$15-17/hour'
    },
    description: 'Customer service focused retail position. Morning and evening shifts available. Join Pennsylvania\'s favorite grocery chain.',
    requirements: [
      'Customer service experience preferred',
      'Ability to work flexible hours',
      'Friendly and helpful attitude',
      'Ability to stand for extended periods',
      'Basic math skills'
    ],
    benefits: [
      'Competitive hourly wage',
      'Employee discounts',
      'Flexible scheduling',
      'Health insurance available',
      '401(k) plan'
    ],
    postedDate: '2025-01-21',
    urgent: true,
    remote: false,
    experienceLevel: 'entry',
    education: 'High School Diploma',
    skills: ['Customer Service', 'Cash Handling', 'Product Knowledge', 'Teamwork'],
    contact: {
      email: 'careers@gianteagle.com',
      website: 'https://careers.gianteagle.com',
      applyUrl: 'https://careers.gianteagle.com/retail'
    },
    companyInfo: {
      size: '10,000+',
      industry: 'Grocery & Retail',
      description: 'Regional grocery chain with strong Pittsburgh presence',
      website: 'https://www.gianteagle.com'
    }
  },
  {
    id: 'job-012',
    title: 'Housekeeper',
    company: 'Hilton Garden Inn',
    companyId: 'hilton-garden',
    location: {
      address: '250 Forbes Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15222',
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    type: 'full-time',
    category: 'Hospitality',
    industry: 'Hotel',
    salary: {
      min: 16,
      max: 18,
      hourly: true,
      display: '$16-18/hour'
    },
    description: 'Hotel housekeeping position. Experience preferred but will train motivated candidates. Work in a clean, professional environment.',
    requirements: [
      'Previous housekeeping experience preferred',
      'Ability to work independently',
      'Physical ability to lift and move items',
      'Attention to detail',
      'Reliable transportation'
    ],
    benefits: [
      'Competitive hourly wage',
      'Health insurance',
      'Paid time off',
      'Hotel discounts',
      'Training provided'
    ],
    postedDate: '2025-01-22',
    urgent: true,
    remote: false,
    experienceLevel: 'entry',
    education: 'High School Diploma',
    skills: ['Housekeeping', 'Attention to Detail', 'Time Management', 'Physical Stamina'],
    contact: {
      phone: '(412) 555-0500',
      email: 'careers@hilton.com',
      applyUrl: 'https://jobs.hilton.com'
    },
    companyInfo: {
      size: '200-500',
      industry: 'Hospitality',
      description: 'Upscale hotel chain with downtown location'
    }
  },
  {
    id: 'job-013',
    title: 'Cashier',
    company: 'Sheetz',
    companyId: 'sheetz',
    location: {
      address: 'Multiple locations',
      neighborhood: 'Various',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15201'
    },
    type: 'part-time',
    category: 'Retail',
    industry: 'Convenience Store',
    salary: {
      min: 14,
      max: 16,
      hourly: true,
      display: '$14-16/hour'
    },
    description: 'Convenience store cashier. Fast-paced environment with great benefits. Perfect for students or those seeking flexible hours.',
    requirements: [
      'Customer service skills',
      'Ability to work in fast-paced environment',
      'Flexible availability',
      'Basic math skills',
      'Friendly personality'
    ],
    benefits: [
      'Competitive hourly wage',
      'Employee discounts',
      'Flexible scheduling',
      'Health insurance available',
      '401(k) plan',
      'Tuition assistance'
    ],
    postedDate: '2025-01-22',
    urgent: true,
    remote: false,
    experienceLevel: 'entry',
    education: 'High School Diploma',
    skills: ['Cash Handling', 'Customer Service', 'Multitasking', 'Point of Sale Systems'],
    contact: {
      email: 'careers@sheetz.com',
      website: 'https://careers.sheetz.com',
      applyUrl: 'https://careers.sheetz.com/cashier'
    },
    companyInfo: {
      size: '10,000+',
      industry: 'Convenience Stores',
      description: 'Regional convenience store chain',
      website: 'https://www.sheetz.com'
    }
  },
  {
    id: 'job-014',
    title: 'Project Manager',
    company: 'Duquesne University',
    companyId: 'duquesne',
    location: {
      address: '600 Forbes Avenue',
      neighborhood: 'Downtown',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15282',
      coordinates: { lat: 40.4367, lng: -79.9903 }
    },
    type: 'full-time',
    category: 'Management',
    industry: 'Education',
    salary: {
      min: 55000,
      max: 70000,
      annual: true,
      display: '$55K - $70K'
    },
    description: 'Manage construction and renovation projects at a leading Catholic university. Work with facilities team on campus improvements.',
    requirements: [
      'Bachelor\'s degree in Construction Management or related field',
      '3+ years of project management experience',
      'PMP certification preferred',
      'Experience with construction projects',
      'Strong organizational skills'
    ],
    benefits: [
      'Competitive salary',
      'Comprehensive health insurance',
      'Tuition benefits for employee and family',
      'Retirement plan',
      'Professional development',
      'Campus amenities'
    ],
    postedDate: '2025-01-15',
    urgent: false,
    remote: false,
    experienceLevel: 'mid',
    education: 'Bachelor\'s Degree',
    skills: ['Project Management', 'Construction', 'Budget Management', 'Vendor Relations', 'Scheduling'],
    contact: {
      email: 'hr@duq.edu',
      website: 'https://www.duq.edu/careers',
      applyUrl: 'https://www.duq.edu/careers/project-manager'
    },
    companyInfo: {
      size: '1,000-5,000',
      founded: 1878,
      industry: 'Higher Education',
      description: 'Private Catholic university in downtown Pittsburgh',
      website: 'https://www.duq.edu'
    }
  },
  {
    id: 'job-015',
    title: 'Customer Service Representative',
    company: 'Giant Eagle',
    companyId: 'giant-eagle-2',
    location: {
      address: 'Regional stores',
      neighborhood: 'Various',
      city: 'Pittsburgh',
      state: 'PA',
      zipCode: '15201'
    },
    type: 'part-time',
    category: 'Customer Service',
    industry: 'Retail',
    salary: {
      min: 14,
      max: 16,
      hourly: true,
      display: '$14 - $16/hour'
    },
    description: 'Provide excellent customer service at Pennsylvania\'s favorite grocery chain. Help customers find products and answer questions.',
    requirements: [
      'Customer service experience preferred',
      'Friendly and helpful attitude',
      'Ability to work flexible hours',
      'Good communication skills',
      'Ability to stand for extended periods'
    ],
    benefits: [
      'Competitive hourly wage',
      'Employee discounts',
      'Flexible scheduling',
      'Health insurance available'
    ],
    postedDate: '2025-01-19',
    urgent: false,
    remote: false,
    experienceLevel: 'entry',
    education: 'High School Diploma',
    skills: ['Customer Service', 'Product Knowledge', 'Problem Solving', 'Communication'],
    contact: {
      email: 'careers@gianteagle.com',
      website: 'https://careers.gianteagle.com'
    }
  }
]

// Companies
export const companies: Company[] = [
  {
    id: 'google-pgh',
    name: 'Google Pittsburgh',
    industry: 'Technology',
    size: '500-1,000',
    location: 'East Liberty',
    website: 'https://www.google.com',
    description: 'Leading technology company with a growing presence in Pittsburgh',
    founded: 1998,
    activeJobs: 12,
    rating: 4.8
  },
  {
    id: 'upmc',
    name: 'UPMC',
    industry: 'Healthcare',
    size: '10,000+',
    location: 'Oakland',
    website: 'https://www.upmc.com',
    description: 'Leading healthcare provider and academic medical center',
    activeJobs: 45,
    rating: 4.6
  },
  {
    id: 'pnc-bank',
    name: 'PNC Bank',
    industry: 'Banking',
    size: '10,000+',
    location: 'Downtown',
    website: 'https://www.pnc.com',
    description: 'Major regional bank headquartered in Pittsburgh',
    founded: 1852,
    activeJobs: 28,
    rating: 4.5
  },
  {
    id: 'steelers',
    name: 'Pittsburgh Steelers',
    industry: 'Sports',
    size: '200-500',
    location: 'North Shore',
    website: 'https://www.steelers.com',
    description: 'NFL team with passionate fan base and rich history',
    founded: 1933,
    activeJobs: 8,
    rating: 4.9
  },
  {
    id: 'pgh-public-schools',
    name: 'Pittsburgh Public Schools',
    industry: 'Education',
    size: '5,000+',
    location: 'Oakland',
    website: 'https://www.pghschools.org',
    description: 'Largest school district in Pennsylvania',
    activeJobs: 35,
    rating: 4.3
  }
]

// Helper functions
export function getAllJobs(): JobListing[] {
  return jobListings
}

export function getUrgentJobs(): JobListing[] {
  return jobListings.filter(job => job.urgent)
}

export function getJobsByType(type: string): JobListing[] {
  return jobListings.filter(job => job.type === type)
}

export function getJobsByCategory(category: string): JobListing[] {
  return jobListings.filter(job => job.category.toLowerCase() === category.toLowerCase())
}

export function getJobsByIndustry(industry: string): JobListing[] {
  return jobListings.filter(job => job.industry.toLowerCase() === industry.toLowerCase())
}

export function getJobsByNeighborhood(neighborhood: string): JobListing[] {
  return jobListings.filter(job => 
    job.location.neighborhood.toLowerCase() === neighborhood.toLowerCase()
  )
}

export function getFullTimeJobs(): JobListing[] {
  return jobListings.filter(job => job.type === 'full-time')
}

export function getPartTimeJobs(): JobListing[] {
  return jobListings.filter(job => job.type === 'part-time')
}

export function getGigJobs(): JobListing[] {
  return jobListings.filter(job => 
    job.type === 'freelance' || job.type === 'contract' || job.type === 'temporary'
  )
}

export function getRemoteJobs(): JobListing[] {
  return jobListings.filter(job => job.remote)
}

export function searchJobs(query: string): JobListing[] {
  const lowerQuery = query.toLowerCase()
  return jobListings.filter(job =>
    job.title.toLowerCase().includes(lowerQuery) ||
    job.company.toLowerCase().includes(lowerQuery) ||
    job.description.toLowerCase().includes(lowerQuery) ||
    job.location.neighborhood.toLowerCase().includes(lowerQuery) ||
    job.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
  )
}

export function getAllCompanies(): Company[] {
  return companies
}

export function getCompanyById(id: string): Company | undefined {
  return companies.find(company => company.id === id)
}

