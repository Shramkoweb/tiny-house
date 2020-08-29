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

type TRefetch = () => Promise<void>;

const deleteListing = async (id: string, refetch: TRefetch) => {
  await server.fetch<DeleteListingData, DeleteListingVariables>({
    query: DELETE_LISTING,
    variables: {
      id
    }
  });

  refetch();
};

const renderListingsList = (listings: Listing[], refetch: TRefetch) => {
  return (
    <ul>
      {
        listings.map(({id, title}) => {
          return (
            <li key={id}>
              <button onClick={() => deleteListing(id, refetch)}>Delete this listing</button>
              {title}
            </li>
          );
        })
      }
    </ul>
  );
};

export const Listings: FC<Props> = ({title}) => {
  const {data, fetchApi} = useQuery<ListingData>(LISTINGS);

  return (
    <div>
      <h2>{title}</h2>
      {data && renderListingsList(data.listings, fetchApi)}
    </div>
  );

};
