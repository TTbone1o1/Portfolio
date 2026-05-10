export type ProjectId = 'crosi' | 'portio' | 'timecapped'

export type ProjectStat = {
  label: string
  value: string
}

export type ProjectLink = {
  label: string
  href: string | null
}

export type CaseStudy = {
  problem: string
  solution: string
  role: string
  techStack: string[]
  learned: string
  links: ProjectLink[]
}

export type Project = {
  id: ProjectId
  number: string
  name: string
  tagline: string
  summary: string
  videoSrc: string | null
  viewHref: string | null
  techStack: string[]
  stats: ProjectStat[]
  caseStudy: CaseStudy
}

export const displayName = 'Abraham May'

export const resumeHref = '/Abraham_Resume.pdf'

export const contactDetails = {
  email: 'AbrahamMay1015@gmail.com',
  emailHref: 'mailto:AbrahamMay1015@gmail.com',
  phone: '615-604-9977',
  phoneHref: 'tel:6156049977',
}

export const primaryLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/TTbone1o1',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abrahammay/',
  },
]

export const projects: Project[] = [
  {
    id: 'crosi',
    number: '01',
    name: 'Crosi.co',
    tagline: 'Cross-platform publishing without repeated upload work.',
    summary:
      'I made this based on a problem I had myself. Crosi.co makes uploading posts across platforms easier and cuts down repetitive posting work.',
    videoSrc: null,
    viewHref: null,
    techStack: ['React', 'TypeScript', 'Product UX', 'Automation Thinking'],
    stats: [
      { label: 'Platforms unified', value: '3 surfaces' },
      { label: 'Publishing flow', value: '1 upload path' },
      { label: 'Pain removed', value: 'Less repeat work' },
    ],
    caseStudy: {
      problem:
        'Posting the same content across multiple platforms meant rewriting captions, repeating uploads, and managing three slightly different flows every time.',
      solution:
        'I designed Crosi.co as one publishing flow that reduces duplicated upload steps and turns cross-platform posting into a cleaner product workflow.',
      role:
        'I owned the concept, product direction, interface design, and implementation decisions around simplifying the publishing flow.',
      techStack: ['React', 'TypeScript', 'UI systems', 'Product strategy'],
      learned:
        'I learned that a strong product starts by compressing repeated effort into one obvious action instead of just making the existing workflow prettier.',
      links: [
        { label: 'View project', href: null },
        { label: 'Watch demo', href: null },
      ],
    },
  },
  {
    id: 'portio',
    number: '02',
    name: 'Portio',
    tagline: 'Photo-first nutrition logging with less friction.',
    summary:
      'I had a problem with counting calories, so I made an app that records the foods you take a photo of and makes logging meals simpler.',
    videoSrc: null,
    viewHref: null,
    techStack: ['React Native', 'TypeScript', 'Camera UX', 'Nutrition flows'],
    stats: [
      { label: 'Input method', value: '1 quick photo' },
      { label: 'Nutrition view', value: '4 core macros' },
      { label: 'Logging goal', value: 'Less friction' },
    ],
    caseStudy: {
      problem:
        'Traditional calorie tracking feels slow because every meal becomes manual search, guessing, and too many steps before anything gets recorded.',
      solution:
        'Portio starts with a photo and turns it into a fast nutrition snapshot so logging meals feels closer to capturing than data entry.',
      role:
        'I shaped the product around the user flow, built the interaction direction, and focused on reducing friction in the meal logging experience.',
      techStack: ['React Native', 'TypeScript', 'Camera flows', 'Mobile product UX'],
      learned:
        'I learned that health tools only work when the interface respects how little patience people have in the moment they need to log something.',
      links: [
        { label: 'View project', href: null },
        { label: 'Watch demo', href: null },
      ],
    },
  },
  {
    id: 'timecapped',
    number: '03',
    name: 'Timecapped',
    tagline: 'A lighter journaling habit built around one saved moment.',
    summary:
      'I always wanted to journal, and this became my first real breakthrough in mobile development while building something I actually wanted to use.',
    videoSrc: null,
    viewHref: null,
    techStack: ['React Native', 'TypeScript', 'Habit design', 'Mobile UI'],
    stats: [
      { label: 'Daily ritual', value: '1 saved moment' },
      { label: 'Entry style', value: 'Short-form capture' },
      { label: 'Milestone', value: 'Mobile breakthrough' },
    ],
    caseStudy: {
      problem:
        'Journaling often fails because the blank page feels too big and the habit asks for more energy than most days can support.',
      solution:
        'Timecapped narrows the task down to capturing one memory, making the habit smaller, more approachable, and easier to return to daily.',
      role:
        'I used this project to push my mobile development ability forward while designing a calmer journaling experience around a single action.',
      techStack: ['React Native', 'TypeScript', 'Interaction design', 'Habit systems'],
      learned:
        'I learned that reducing scope can make a product feel more personal, more usable, and more likely to become part of a real routine.',
      links: [
        { label: 'View project', href: null },
        { label: 'Watch demo', href: null },
      ],
    },
  },
]
