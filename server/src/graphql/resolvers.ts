import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import {
  Database,
  Listing
} from "../lib/types";

export const resolvers: IResolvers = {
    Query: {
      listings: async (
        _root: undefined,
        _args: Record<string, unknown>,
        {db}: { db: Database }
      ): Promise<Listing[]> => {
        // find({}) return all documents from db
        return await db.listings.find({}).toArray();
      }
    },
    Mutation: {
      deleteListing: async (
        _root: undefined,
        {id}: { id: string },
        {db}: { db: Database }
      ): Promise<Listing> => {
        const deleteResult = await db.listings.findOneAndDelete({
          _id: new ObjectId(id)
        });

        if (!deleteResult.value) {
          throw new Error(`[db] : failed to delete element}`);
        }

        return deleteResult.value;
      }
    },
    Listing: {
      id: (listing: Listing) => listing._id.toString()
    }
  }
;
