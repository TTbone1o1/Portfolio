import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import './Button.css'

type ButtonVariant = 'pill' | 'reset' | 'cover'

type LinkButtonProps = ComponentPropsWithoutRef<'a'> & {
  children: ReactNode
  href: string
  variant?: ButtonVariant
}

type NativeButtonProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode
  href?: undefined
  variant?: ButtonVariant
}

type ButtonProps = LinkButtonProps | NativeButtonProps

function getVariantClassName(variant?: ButtonVariant) {
  if (!variant) {
    return ''
  }

  return `button-${variant}`
}

function Button(props: ButtonProps) {
  const variantClassName = getVariantClassName(props.variant)
  const className = [variantClassName, props.className].filter(Boolean).join(' ')

  if ('href' in props && typeof props.href === 'string') {
    const linkProps = { ...props }
    linkProps.variant = undefined
    linkProps.className = undefined
    return (
      <a {...linkProps} className={className}>
        {props.children}
      </a>
    )
  }

  const buttonProps = { ...props }
  buttonProps.variant = undefined
  buttonProps.className = undefined
  const type = buttonProps.type ?? 'button'

  return (
    <button type={type} {...buttonProps} className={className}>
      {props.children}
    </button>
  )
}

export default Button
