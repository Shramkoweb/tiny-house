import React, { FC } from "react";
import {
  server,
  useQuery
} from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData
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

export const Listings: FC<Props> = ({title}) => {
  const {data, loading, error, refetch} = useQuery<ListingsData>(LISTINGS);
  const [
    deleteListing,
    {
      loading: deleteListingLoading,
      error: deleteListingError,
    },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
     await deleteListing({ id });
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

  // const renderListingsList = (listings: Listing[], refetch: TRefetch) => {
  //   return (
  //     <ul>
  //       {
  //         listings.map(({id, title}) => {
  //           return (
  //             <li key={id}>
  //               <button onClick={() => handleDeleteListing(id, refetch)}>Delete this listing</button>
  //               {title}
  //             </li>
  //           );
  //         })
  //       }
  //     </ul>
  //   );
  // };

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

      {/*{data && renderListingsList(data.listings, fetchApi)}*/}
    </div>
  );

};
