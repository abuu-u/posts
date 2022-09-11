import { selectName } from 'features/user/user-store'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'shared/lib/store'

interface UseUserInterface {
  onUserExists?: () => void
  onUserNotExists?: () => void
}

export const useUser = (properties?: UseUserInterface) => {
  const name = useAppSelector(selectName)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (name) {
      properties?.onUserExists?.()
    } else {
      properties?.onUserNotExists?.()
    }
  }, [name, properties])

  return { name, isClient }
}
