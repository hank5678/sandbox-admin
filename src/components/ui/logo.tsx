import logoImg from "@/assets/logo.svg"
import { classNames } from "@/utils/class-names"

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement>

const Logo = ({ className, ...props }: LogoProps) => {
  return <img src={logoImg} alt="Logo" className={classNames("h-auto w-8", className)} {...props} />
}

export { Logo }
