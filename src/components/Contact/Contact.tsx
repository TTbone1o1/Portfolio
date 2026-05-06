import './Contact.css'

type ContactDetails = {
  email: string
  emailHref: string
  phone: string
  phoneHref: string
}

type ContactProps = {
  contactDetails: ContactDetails
}

function Contact({ contactDetails }: ContactProps) {
  return (
    <div className="contact">
      <div className="contact-secondary-links" aria-label="Contact details">
        <a href={contactDetails.emailHref}>{contactDetails.email}</a>
        <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
      </div>
    </div>
  )
}

export default Contact
