import Form from "next/form"
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = async ({ query }: { query?:string }) => {

  return (
    <Form action="/" scroll={false} className="search-form">
      <input 
        type="text" 
        name="query" 
        defaultValue={query}
        className="search-input"
        placeholder="Search startups"
      />

      <div className="flex gap-2 mr-4">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white bg-green-600">
          <Search className="size-5 pt-0.5"/>
        </button>
      </div>
    </Form>
  )
}

export default SearchForm