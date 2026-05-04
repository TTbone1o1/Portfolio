import Button from '../Button/Button'
import './Contact.css'

type PrimaryLink = {
  label: string
  href: string
}

type ContactDetails = {
  email: string
  emailHref: string
  phone: string
  phoneHref: string
}

type ContactProps = {
  primaryLinks: PrimaryLink[]
  resumeHref: string
  contactDetails: ContactDetails
}

function Contact({ primaryLinks, resumeHref, contactDetails }: ContactProps) {
  return (
    <div className="contact">
      <div className="contact-primary-links" aria-label="Primary links">
        {primaryLinks.map((link) => (
          <Button
            key={link.label}
            variant="pill"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </Button>
        ))}

        <Button variant="pill" href={resumeHref} target="_blank" rel="noreferrer">
          Resume
        </Button>
      </div>

      <div className="contact-secondary-links" aria-label="Contact details">
        <a href={contactDetails.emailHref}>{contactDetails.email}</a>
        <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
      </div>
    </div>
  )
}

export default Contact
