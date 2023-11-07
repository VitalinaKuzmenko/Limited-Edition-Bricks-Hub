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
    getUserByUid: async (_, { uid }) => {
      try {
        const userRef = db.collection("users").where("uid", "==", uid);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
          throw new Error("User not found");
        }

        let user = null;
        snapshot.forEach((doc) => {
          user = doc.data();
        });

        return user;
      } catch (error) {
        throw new Error(`Unable to fetch user information: ${error.message}`);
      }
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
  // updateUserByUid: async (_, { uid, name, surname, avatarPath }) => {
  //   try {
  //     const userRef = db.collection("users").where("uid", "==", uid);
  //     const snapshot = await userRef.get();

  //     if (snapshot.empty) {
  //       throw new Error("User not found");
  //     }

  //     let updatedUser = null;
  //     snapshot.forEach((doc) => {
  //       const user = doc.data();
  //       if (name) user.name = name;
  //       if (surname) user.surname = surname;
  //       if (avatarPath) user.avatarPath = avatarPath;
  //       updatedUser = user;
  //       doc.ref.update({
  //         name: name || user.name,
  //         surname: surname || user.surname,
  //         avatarPath: avatarPath || user.avatarPath,
  //       });
  //     });

  //     return updatedUser;
  //   } catch (error) {
  //     throw new Error(`Unable to update user information: ${error.message}`);
  //   }
  // },
};

export default resolvers;
