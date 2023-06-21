import React, { useState, useEffect } from 'react'
import { searchProducts } from 'api/productApi'

const SearchResults: React.FC<{ keyword: string }> = ({ keyword }) => {
  const [results, setResults] = useState<string[]>([])

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await searchProducts(keyword)
        setResults(response.data)
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    }

    if (keyword.trim() !== '') {
      fetchSearchResults()
    }
  }, [keyword])

  return (
    <div>
      {results.length > 0 ? (
        <div>
          <h2>검색 결과</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  )
}

export { SearchResults }
