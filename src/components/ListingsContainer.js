import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import NewListingForm from "./NewListingForm";

function ListingsContainer({ search }) {

  const [listings, setListings] = useState([])
  const [sortBy, setSortBy] = useState("id")

  useEffect(() => {
    fetch("http://localhost:6001/listings")
    .then((r) => r.json())
    .then((listings) => setListings(listings))
  }, []);

  function handleDeleteListing(id) {
    const updatedListingsArray = listings.filter(
      (listing) => listing.id !== id)
    setListings(updatedListingsArray)
  }

  function handleAddListing(newListing) {
    const updatedListingsArray = [newListing, ...listings]
    setListings(updatedListingsArray)
  }

  const filteredListings = listings.filter((listing) => {
    return listing.description.toLowerCase().includes(search.toLowerCase())
  })

  const sortedListings = filteredListings.sort((listingA, listingB) => {
    if (sortBy === "id") {
      return listingA.id - listingB.id;
    } else {
      return listingA.location.localeCompare(listingB.location)
    }
  })

  const listingCards = sortedListings.map((listingObj) => {
    return (
      <ListingCard 
          key={listingObj.id} 
          listing={listingObj}
          onDeleteListing={handleDeleteListing}
          />
    )
  })

  return (
    <main>
      <NewListingForm onAddListing={handleAddListing}/>
      <button onClick={() => setSortBy('id')}>Sort By Default</button>
      <button onClick={() => setSortBy('location')}>Sort By Location</button>
      <ul className="cards">
        {listingCards}
      </ul>
    </main>
  );
}

export default ListingsContainer;
