const { UserList } = require("./fakedata");
const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    getUserById: (parent, args) => {
      console.log(args.id);
      // let user = [UserList].filter((user) => {
      //   return user.id == args.id;
      // });
      return UserList[0];
    },
  },

  Mutation: {
    // Create a new user with the provided data
    createUser: (parent, args) => {
      const newUser = {
        //id: UserList.length + 1, // Generate a new unique ID for the user
        id: Math.floor(Math.random() * 1000),
        name: args.name,
        email: args.email,
        address: args.address,
        age: args.age,
        gender: args.gender,
      };
      UserList.push(newUser); // Add the new user to the in-memory data store
      return newUser;
    },

    //   Update an existing user with the provided data
    updateUser: (parent, args) => {
      let updatedUser = null;
      UserList.forEach((user) => {
        if (user.id == args.id) {
          user.name = args.name || user.name;
          user.email = args.email || user.email;
          user.address = args.address || user.address;
          user.age = args.age || user.age;
          user.gender = args.gender || user.gender;
          updatedUser = user;
        }
      });
      return updatedUser;
    },

    //   // Delete an existing user with the provided ID
    deleteUser: (parent, args) => {
      let deletedUser = null;
      UserList.forEach((user, index) => {
        if (user.id == args.id) {
          deletedUser = user;
          UserList.splice(index, 1); // Remove the user from the in-memory data store
        }
      });
      return deletedUser;
    },
  },
};

module.exports = { resolvers };
