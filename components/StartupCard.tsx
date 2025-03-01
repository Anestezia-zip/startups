import { formatDate } from '@/lib/utils'
import { Author, Startup } from '@/sanity/types';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt, views, author, title, category, _id, image, description } = post

  return (
    <li className='startup-card group'>
      <article className='flex flex-col'>
        <header className='flex-between mb-5'>
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className='startup-card-category'>{category}</p>
          </Link>
          <figure className='w-fit'>
            <Link href={`/user/${author?._id}`} className='flex gap-2 items-center'>
              <figcaption className="text-16-medium line-clamp-1">{author?.name}</figcaption>
              <Image src="https://placehold.co/48x48" width={40} height={40} alt='placeholder' className='rounded-full' />
            </Link>
          </figure>
        </header>

        <section>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>

          <Link href={`/startup/${_id}`}>
            <p className="startup-card_desc">{description}</p>
            <img src={image} alt="placeholder" className="startup-card_img" />
          </Link>
        </section>

        <footer className="flex-between gap-3 mt-5">
            <p className="startup-card_date">{formatDate(_createdAt)}</p>
            <button className="startup-card_btn">
              <p>👀 {views}</p>
            </button>
          </footer>
      </article>

    </li>
  )
}

export default StartupCard