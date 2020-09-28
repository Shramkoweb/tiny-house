import React, { FC } from "react";
import {
  useMutation,
  useQuery
} from "react-apollo";
import {
  Alert,
  Avatar,
  Button,
  List,
  Spin
} from "antd";
import { gql } from "apollo-boost";

import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";
import { ListingsSkeleton } from "./components/ListingsSkeleton";

// TODO rewrite to SASS
import "./styles/Listings.css";

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
    <List
      dataSource={listings}
      renderItem={listing => {
        const {id, title, image, address} = listing;

        return (
          <List.Item
            actions={[
              <Button
                type="primary"
                data-id={id}
                onClick={() => handleDeleteListing(id)}
              >
                Delete
              </Button>
            ]}
          >
            <List.Item.Meta
              title={title}
              description={address}
              avatar={
                <Avatar
                  src={image}
                  shape="square"
                  size={48}
                />
              }
            />
          </List.Item>
        );
      }}
    />
  ) : null;

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title}/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error={error}/>
      </div>
    );
  }

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong :(. Please try again later."
      className="listings__alert"
    />
  ) : null;

  return (
    <div className="listings">
      {deleteListingErrorAlert}
      <Spin spinning={deleteListingLoading}>
        <h2>{title}</h2>
        {listingsList}
      </Spin>
    </div>
  );
};
