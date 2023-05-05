import "./App.css";
import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery, useMutation, gql } from "@apollo/client";

//import client from "./apollo-client"; // use the client to make GraphQL queries/mutations here

let StyledPaper;

StyledPaper = styled(Paper)({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const QUERY_ALL_USER = gql`
  query Users {
    users {
      id
      name
      email
      address
      gender
      age
    }
  }
`;

const MUTATION_CREATE_USER = gql`
  mutation CreateUsers(
    $name: String!
    $gender: String!
    $address: String!
    $email: String!
    $age: Int!
  ) {
    createUser(
      name: $name
      gender: $gender
      address: $address
      email: $email
      age: $age
    ) {
      id
      name
      email
      address
      age
      gender
    }
  }
`;

const MUTATION_DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      name
    }
  }
`;

const MUTATION_UPDATE_USER = gql`
  mutation UpdateUsers(
    $updateUserId: ID!
    $email: String
    $address: String
    $gender: String
    $age: Int
  ) {
    updateUser(
      id: $updateUserId
      email: $email
      address: $address
      gender: $gender
      age: $age
    ) {
      name
      email
      address
    }
  }
`;

const Main = () => {
  const [users, setUsers] = useState([]);

  const [isFormValid, setIsFormValid] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const { data, loading, refetch } = useQuery(QUERY_ALL_USER);
  const [deletedUser] = useMutation(MUTATION_DELETE_USER);
  const [createUser] = useMutation(MUTATION_CREATE_USER);

  useEffect(() => {
    console.log(data);
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  if (loading) {
    return <div>Byebye</div>;
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const newUser = { firstName, lastName, email, address, gender };
  //   setUsers([...users, newUser]);
  //   setFirstName("");
  //   setLastName("");
  //   setEmail("");
  //   setAddress("");
  //   setGender("");
  //   setAge("");
  // };

  // const handleDelete = async (id) => {
  //   // const updatedUsers = [...users];
  //   // updatedUsers.splice(index, 1);
  //   // setUsers(updatedUsers);
  // };

  // useEffect(() => {
  //   const isFirstNameValid = firstName.trim().length > 0;
  //   const isLastNameValid = lastName.trim().length > 0;
  //   const isEmailValid = email.trim().length > 0;
  //   const isAddressValid = address.trim().length > 0;
  //   const isGenderValid = gender.trim().length > 0;
  //   const isAgeValid = age.trim().length > 0;

  //   setIsFormValid(
  //     isFirstNameValid &&
  //       isLastNameValid &&
  //       isEmailValid &&
  //       isAddressValid &&
  //       isGenderValid &&
  //       isAgeValid
  //   );
  // }, [firstName, lastName, email, address, gender, age]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledPaper>
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <div>
              <label>Gender:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Other
                </label>
              </div>
            </div>
            <TextField
              label="Age"
              variant="outlined"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <Button
              variant="contained"
              type="submit"
              //disabled={!isFormValid}
              sx={{ mt: 1 }}
              onClick={async () => {
                await createUser({
                  variables: {
                    name: firstName + " " + lastName,
                    email: email,
                    address: address,
                    gender: gender,
                    age: parseInt(age),
                  },
                });

                let { data } = await refetch();
                setUsers(data.users);
              }}
            >
              Submit
            </Button>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledPaper>
            {users.map((user, index) => (
              <div key={user.id} className="user">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Address: {user.address}</p>
                <p>Gender: {user.gender}</p>
                <p>Age: {user.age}</p>
                <Button
                  variant="contained"
                  onClick={async (e) => {
                    await deletedUser({ variables: { id: user.id } });

                    let { data } = await refetch();
                    setUsers(data.users);
                    console.log("keerthana");
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
