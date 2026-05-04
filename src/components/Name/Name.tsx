import './Name.css'

type NameProps = {
  children?: string
}

function Name({ children = 'Abraham May' }: NameProps) {
  return <h1 className="name">{children}</h1>
}

export default Name
