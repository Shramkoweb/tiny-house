import { IResolvers } from "apollo-server-express";
import { listings } from "../listings";

export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return listings;
    }
  },
  Mutation: {
    deleteListing: (_root: undefined, {id}: { id: string }) => {
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          // splice return array of removed item('s) so we need destruct first item
          const [removedItem] = listings.splice(i, 1);

          return removedItem;
        }
      }

      throw new Error(`Failed to remove item: id:${id}`);
    }
  }
};
