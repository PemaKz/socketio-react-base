import { identicon } from 'minidenticons'
import { useMemo } from 'react'

export default function IdenticonAvatar ({ username, saturation, lightness, ...props }) {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(username, saturation, lightness)),
    [username, saturation, lightness]
  )
  return (<img src={svgURI} alt={username} {...props} />)
}