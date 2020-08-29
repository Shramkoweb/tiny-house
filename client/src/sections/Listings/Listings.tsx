import React, { FC } from "react";
import {
  server,
  useQuery
} from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  Listing,
  ListingData
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

const deleteListing = async (id: string) => {
  await server.fetch<DeleteListingData, DeleteListingVariables>({
    query: DELETE_LISTING,
    variables: {
      id
    }
  });
};

const renderListingsList = (listings: Listing[]) => {
  return (
    <ul>
      {
        listings.map(({id, title}) => {
          return (
            <li key={id}>
              <button onClick={() => deleteListing(id)}>Delete this listing</button>
              {title}
            </li>
          );
        })
      }
    </ul>
  );
};

export const Listings: FC<Props> = ({title}) => {
  const {data} = useQuery<ListingData>(LISTINGS);

  return (
    <div>
      <h2>{title}</h2>
      {data && renderListingsList(data.listings)}
    </div>
  );

};
