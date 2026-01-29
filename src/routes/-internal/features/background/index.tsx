import { Orb } from "./orb"

const Background = () => {
  return (
    <div className="bg-gray-2 fixed top-0 left-0 h-full w-full">
      <Orb hoverIntensity={0.75} rotateOnHover hue={0} backgroundColor="#fafafa" />
    </div>
  )
}

export default Background
