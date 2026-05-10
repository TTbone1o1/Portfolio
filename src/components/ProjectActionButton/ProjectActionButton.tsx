import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from 'react'

type ActionVariant = 'primary' | 'secondary' | 'ghost'

type LinkActionProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    variant?: ActionVariant
    disabled?: false
  }
>

type ButtonActionProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
    variant?: ActionVariant
  }
>

type ProjectActionButtonProps = LinkActionProps | ButtonActionProps

const baseClassName =
  'inline-flex min-h-11 items-center justify-center rounded-full border px-4 py-2.5 text-sm font-semibold tracking-[-0.02em] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2323ff]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1ea]'

const variantClassNames: Record<ActionVariant, string> = {
  primary:
    'border-[#171411] bg-[#171411] text-[#f6f1e8] shadow-[0_16px_36px_rgba(23,20,17,0.16)] hover:-translate-y-0.5 hover:bg-black',
  secondary:
    'border-[#d9d1c5] bg-white/85 text-[#171411] shadow-[0_10px_24px_rgba(23,20,17,0.07)] hover:-translate-y-0.5 hover:border-[#c7bbaa] hover:bg-white',
  ghost:
    'border-transparent bg-transparent text-[#5f5548] hover:-translate-y-0.5 hover:border-[#d9d1c5] hover:bg-white/70 hover:text-[#171411]',
}

const disabledClassName =
  'cursor-not-allowed border-[#e4ddd2] bg-[#f4efe7] text-[#a09484] shadow-none hover:translate-y-0 hover:border-[#e4ddd2] hover:bg-[#f4efe7]'

function ProjectActionButton(props: ProjectActionButtonProps) {
  const variant = props.variant ?? 'secondary'
  const className = [
    baseClassName,
    props.disabled ? disabledClassName : variantClassNames[variant],
    props.className,
  ]
    .filter(Boolean)
    .join(' ')

  if ('href' in props && typeof props.href === 'string') {
    const anchorProps = { ...props }
    anchorProps.variant = undefined
    anchorProps.className = undefined

    return (
      <a {...anchorProps} className={className}>
        {props.children}
      </a>
    )
  }

  const buttonProps = { ...props }
  buttonProps.variant = undefined
  buttonProps.className = undefined

  return (
    <button type={buttonProps.type ?? 'button'} {...buttonProps} className={className}>
      {props.children}
    </button>
  )
}

export default ProjectActionButton
