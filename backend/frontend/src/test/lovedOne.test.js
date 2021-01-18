//using  axios to test all the loved one end points in the backend
import axios from "axios";

//created sample data to simulate, account creating, log in, update and view account
const SampleLO = {
  firstName: "Mordi",
  lastName: "Goldstein",
  email: "mordigold@hotmail.com",
  idNumber: 9705245078089,
  password: "12345678",
  dob: "1994/03/20",
  gender: "Female",
  cell: "0843823451",
  allergies: "none",
  meds: "none",
  conditions: "none",
  eName: "Abigail",
  eNumber: "0823765498",
};

const sampleSignIn = {
  email: "mordigold@hotmail.com",
  password: "12345678",
  account: "Loved One",
};

let token = "";

const sampleUpdate = {
  firstName: "Michael",
  lastName: "Goldstein",
  email: "mordigold@hotmail.com",
  idNumber: 9705245078089,
  password: "12345678",
  dob: "1994/03/20",
  gender: "Female",
  cell: "0843823451",
  allergies: "none",
  meds: "none",
  conditions: "none",
  eName: "Abigail",
  eNumber: "0823765498",
};

describe("testing Loved One ends points", () => {
  it("gets correct response from creating a Loved One", async () => {
    let message = "";

    await axios
      .post("http://localhost:5000/lovedone/add", SampleLO)
      .then((res) => (message = res.data))
      .catch((err) => console.log(err));

    expect(message).toBe("Loved One Added!");
  });

  it("gets correct status when trying to sign in a loved one", async () => {
    let response = 1;

    await axios
      .post("http://localhost:5000/auth", sampleSignIn)
      .then((res) => {
        response = res.status;
        token = res.data;
      })
      .catch((err) => console.log(err));

    expect(response).toBe(200);
  });

  it("gets correct status when trying to read a loved one", async () => {
    let response = 1;

    await axios
      .get("http://localhost:5000/lovedone/get", {
        headers: { Authorization: token },
      })
      .then((res) => (response = res.status))
      .catch((err) => console.log(err));

    expect(response).toBe(200);
  });

  it("gets correct status when trying to update a loved one", async () => {
    let status = 1;

    await axios
      .post("http://localhost:5000/lovedone/update", sampleUpdate, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => (status = res.status))
      .catch((err) => console.log(err));

    expect(status).toBe(200);
  });
});
