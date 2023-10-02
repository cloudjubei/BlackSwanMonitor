interface Props {
  title: string
  id?: string
  className?: string
  href?: string
}

export const LinkButton = ({ title, id, className, href }: Props) => {
  return <a href={href} id={id} className={`link-button ${className}`}>{title}</a>
}