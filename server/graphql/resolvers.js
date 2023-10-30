import { db } from "../firebaseAdmin.js";

const resolvers = {
  Query: {
    getShopItem: async (_, args) => {
      const itemRef = db.collection("shop_items").doc(args.id);
      const itemSnapshot = await itemRef.get();
      const item = itemSnapshot.data();
      return { id: itemSnapshot.id, ...item };
    },
    getAllShopItems: async () => {
      const itemsRef = db.collection("shop_items");
      const itemsSnapshot = await itemsRef.get();
      const items = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    },
    getTopRatedShopItems: async (_, { limit }) => {
      console.log("Querying top-rated shop items with limit:", limit);
      const itemsRef = db.collection("shop_items");
      const query = itemsRef.orderBy("stars", "desc").limit(limit);
      const itemsSnapshot = await query.get();

      const items = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Found top-rated shop items:", items);

      return items;
    },
  },
};

export default resolvers;
