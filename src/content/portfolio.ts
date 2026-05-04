export type Project = {
  name: string
  summary: string
  videoSrc: string | null
  sectionClassName?: string
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
    name: 'Crosi.co',
    summary:
      'I made this based on a problem I had myself. Crosi.co makes uploading posts across platforms easier and cuts down repetitive posting work.',
    videoSrc: null,
  },
  {
    name: 'Portio',
    summary:
      'I had a problem with counting calories, so I made an app that records the foods you take a photo of and makes logging meals simpler.',
    videoSrc: null,
  },
  {
    name: 'Timecapped',
    summary:
      'I always wanted to journal, and this became my first real breakthrough in mobile development while building something I actually wanted to use.',
    videoSrc: null,
  },
]
