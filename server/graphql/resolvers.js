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
  Mutation: {
    addUser: async (_, { input }) => {
      try {
        const userRef = db.collection("users").doc();
        const newUser = { ...input };
        newUser.id = userRef.id;

        await userRef.set(newUser);

        return newUser;
      } catch (error) {
        throw new Error("Unable to add new user");
      }
    },
  },
};

export default resolvers;
