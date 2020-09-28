import React, { FC } from "react";
import {
  useMutation,
  useQuery
} from "react-apollo";
import { gql } from "apollo-boost";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings: FC<Props> = ({title}) => {
  const {data, loading, error, refetch} = useQuery<ListingsData>(LISTINGS);
  console.log(data);
  const [
    deleteListing,
    {
      loading: deleteListingLoading,
      error: deleteListingError,
    },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({variables: {id}});
    refetch();
  };

  const listings = data?.listings;

  const listingsList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}{" "}
            <button onClick={() => handleDeleteListing(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Uh oh! Something went wrong - please try again later :(</p>;
  }

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
    </div>
  );

};
