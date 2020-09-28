import React from "react";
import {
  Alert,
  Divider,
  Skeleton
} from "antd";
import "./styles/ListingsSkeleton.css";

interface Props {
  title: string;
  error?: {
    message: string
  };
}

export const ListingsSkeleton = ({title, error}: Props) => {
  const errorAlert = error ? (
    <Alert
      type="error"
      message={error.message}
      className="listings-skeleton__alert"
    />
  ) : null;

  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{rows: 1}}/>
      <Divider/>
      <Skeleton active paragraph={{rows: 1}}/>
      <Divider/>
      <Skeleton active paragraph={{rows: 1}}/>
    </div>
  );
};
