import Image from 'next/image'
import React from 'react'

// export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  return (
    <div>
        <Image src="https://placehold.co/48x48" width={48} height={48} alt='placeholder'/>
    </div>
  )
}

export default StartupCard