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
    getWishlistItems: async (_, { userId }) => {
      try {
        const userRef = db
          .collection("users")
          .doc(userId)
          .collection("wishlist");
        const snapshot = await userRef.get();

        const wishlistItems = [];
        snapshot.forEach((doc) => {
          const shopItemData = doc.data();
          // Map the document data to your ShopItem type
          const shopItem = {
            id: doc.id,
            ...shopItemData,
          };
          wishlistItems.push(shopItem);
        });

        console.log("wishlist items", wishlistItems);

        return wishlistItems;
      } catch (error) {
        throw new Error(`Unable to fetch wishlist items: ${error.message}`);
      }
    },
  },

  Mutation: {
    addUser: async (_, { input }) => {
      try {
        const userRef = db.collection("users").doc(input.uid);
        const newUser = { ...input };
        newUser.id = userRef.id;

        await userRef.set(newUser);

        const wishlistData = {};
        const bagData = {};

        const wishlistRef = userRef.collection("wishlist").doc();
        const bagRef = userRef.collection("bag").doc();

        await wishlistRef.set(wishlistData);
        await bagRef.set(bagData);

        return newUser;
      } catch (error) {
        throw new Error("Unable to add a new user or create collections");
      }
    },
    addToWishlist: async (_, { userId, shopItemId }) => {
      try {
        const userRef = db.collection("users").doc(userId);
        const shopItemRef = db.collection("shop_items").doc(shopItemId);

        await userRef.update({
          wishlist: admin.firestore.FieldValue.arrayUnion(shopItemRef),
        });

        return userRef.get().then((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        throw new Error("Unable to add a new user or create collections");
      }
    },
    removeFromWishlist: async (_, { userId, shopItemId }) => {
      try {
        const userRef = db.collection("users").doc(userId);
        const shopItemRef = db.collection("shop_items").doc(shopItemId);

        await userRef.update({
          wishlist: admin.firestore.FieldValue.arrayRemove(shopItemRef),
        });

        return userRef.get().then((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        throw new Error("Unable to add a new user or create collections");
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
