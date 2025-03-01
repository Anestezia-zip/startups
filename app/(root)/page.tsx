import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { 
  searchParams: Promise<{query?: string}> 
}) {
  const query = (await searchParams).query

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY })  

  return (
    <>
      <section className="hero-container">
        <h1 className="heading rounded-2xl">
          Showcase your startup <br />
          and connect with innovators
        </h1>

        <p className="sub-heading">
          Share your vision, gain support, and stand out in online competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All startups'}
        </p>

        <ul className="mt-7 card_grid w-fit mx-auto">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
