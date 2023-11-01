import { db } from "../firebaseAdmin.js";

const resolvers = {
  Query: {
    getShopItem: async (_, args) => {
      const itemRef = db.collection("shop_items").doc(args.id);
      const itemSnapshot = await itemRef.get();
      const item = itemSnapshot.data();
      return { id: itemSnapshot.id, ...item };
    },

    getAllShopItems: async (_, args) => {
      const itemsRef = db.collection("shop_items");
      let query = itemsRef;

      if (args.category !== undefined && args.category.length > 0) {
        query = query.where("category", "in", args.category);
      }

      if (args.age !== undefined && args.age.length > 0) {
        query = query.where("age", "in", args.age);
      }

      if (args.priceRange !== undefined && args.priceRange.length > 0) {
        let minPrice = Number.POSITIVE_INFINITY;
        let maxPrice = Number.NEGATIVE_INFINITY;

        for (const range of args.priceRange) {
          const { minPrice: rangeMin, maxPrice: rangeMax } = range;

          if (rangeMin < minPrice) {
            minPrice = rangeMin;
          }

          if (rangeMax > maxPrice) {
            maxPrice = rangeMax;
          }

          if (rangeMin === rangeMax) {
            maxPrice = 10000;
          }
        }

        query = query.where("price", ">=", minPrice);
        query = query.where("price", "<=", maxPrice);
      }

      if (args.pieceRange !== undefined && args.pieceRange.length > 0) {
        let minPieces = Number.POSITIVE_INFINITY;
        let maxPieces = Number.NEGATIVE_INFINITY;

        for (const range of args.pieceRange) {
          const { minPieces: rangeMin, maxPieces: rangeMax } = range;

          if (rangeMin < minPieces) {
            minPieces = rangeMin;
          }

          if (rangeMax > maxPieces) {
            maxPieces = rangeMax;
          }

          if (rangeMin === rangeMax) {
            maxPieces = 100000;
          }
        }

        query = query.where("pieces", ">=", minPieces);
        query = query.where("pieces", "<=", maxPieces);
      }

      const itemsSnapshot = await query.get();
      const items = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return items;
    },
    getTopRatedShopItems: async (_, { limit }) => {
      const itemsRef = db.collection("shop_items");
      const query = itemsRef.orderBy("stars", "desc").limit(limit);
      const itemsSnapshot = await query.get();

      const items = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return items;
    },
  },
};

export default resolvers;
