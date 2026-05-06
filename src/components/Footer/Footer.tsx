import './Footer.css'

type PrimaryLink = {
  label: string
  href: string
}

type FooterProps = {
  primaryLinks: PrimaryLink[]
  resumeHref: string
}

function Footer({ primaryLinks, resumeHref }: FooterProps) {
  return (
    <footer className="footer" aria-label="Footer">
      <nav className="footer-links" aria-label="Profile links">
        {primaryLinks.map((link) => (
          <a
            key={link.label}
            className="footer-link"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}

        <a className="footer-link" href={resumeHref} target="_blank" rel="noreferrer">
          Resume
        </a>
      </nav>
    </footer>
  )
}

export default Footer
