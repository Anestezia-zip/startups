import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

export const experimental_ppr = true;
const md = markdownit()

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })
    if (!post) return notFound()

    const parsedContent = md.render(post?.pitch || '')

    return (
        <section>
            <div className='startup-detail_container mb-44' style={{
                backgroundImage: `url('${post.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <div className='startup-detail_header'>
                    <div className='px-6 py-3 bg-white z-0'>
                        <Link href={`/user/${post.author?._id}`}>
                            <p className='sub-heading bg-blue-100/50'>{post.author.name}</p>
                        </Link>
                        <h1 className='startup-detail_heading'>{post.title}</h1>
                    </div>
                    <div>
                        <Link href={`/user/${post.author?._id}`}>
                            <Image src={post.author.image} alt="avatar" width={48} height={48} className="rounded-full" />
                        </Link>
                    </div>
                    <div className='p-3 flex mr-2'>
                        <ul className='text-text-secondary font-bold'>
                            <li>Category</li>
                            <li>Username</li>
                            <li>Date</li>
                            <li>Views</li>
                        </ul>
                        <ul>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                        </ul>
                        <ul className='space-x-2'>
                            <li className='ml-2'>{post.category}</li>
                            <li>
                                <Link href={`/user/${post.author?._id}`}>
                                    @{post.author.username}
                                </Link>
                            </li>
                            <li>{formatDate((post?._createdAt))}</li>
                            <li>{post.views}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='max-w-4xl mx-auto break-words'>
                <h3 className='text-30-bold mb-3'>Startup details</h3>
                {parsedContent ? (
                    <article className='prose' dangerouslySetInnerHTML={{ __html: parsedContent }} />
                ) : (
                    <p className='no-result'>No details provided</p>
                )}
                <hr className='divider' />

                <div>
                    TODO: Editor selected startups
                </div>

                <div>
                    <Suspense fallback={<Skeleton className='view_skeleton' />}>
                        <View id={id} />
                    </Suspense>
                </div>
            </div>

        </section>
    )
}

export default Page