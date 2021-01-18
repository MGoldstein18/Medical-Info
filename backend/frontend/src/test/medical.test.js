//using  axios to test all the medical end points in the backend
import axios from "axios";

//created sample data to simulate, account creating, log in, update and view account

const SampleMedical = {
  firstName: "Mordi",
  lastName: "Goldstein",
  email: "mordigold@hotmail.com",
  password: "12345678",
  dob: "1994/03/20",
  gender: "Female",
  cell: "0843823451",
  reg: "6758493",
  org: "Testing",
  type: "Tester",
};

const sampleSignIn = {
  email: "avigayilralph@gmail.com",
  password: "12345678",
  account: "Medical",
};

//variable to hold the authentication token
let token = "";

const sampleUpdate = {
  firstName: "Mordi",
  lastName: "Goldstein",
  email: "avigayilralph@gmail.com",
  password: "12345678",
  dob: "1994/03/20",
  gender: "Female",
  cell: "0843823451",
  reg: "6758493",
  org: "Testing",
  type: "Tester",
};

const sampleSearch = {
  idNumber: 9705245078089,
};

describe("check medical end points", () => {
  //test to check connection to creation of a new medical professional
  it("gets correct response from creating a Medical Professional", async () => {
    let message = "";
    await axios
      .post("http://localhost:5000/medical/add", SampleMedical)
      .then((res) => {
        message = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    expect(message).toBe("Medical Professional Added!");
  });

  it("gets correct status when trying to sign in a medical professional", async () => {
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

  it("gets correct status when trying to read a medical professional", async () => {
    let response = 1;

    await axios
      .get("http://localhost:5000/medical/get", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => (response = res.status))
      .catch((err) => console.log(err));

    expect(response).toBe(200);
  });

  it("gets correct status when trying to update a medical professional", async () => {
    let status = 1;

    await axios
      .post("http://localhost:5000/medical/update", sampleUpdate, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => (status = res.status))
      .catch((err) => console.log(err));

    expect(status).toBe(200);
  });

  it("gets correct status when searching for a loved one", async () => {
    let response = 1;

    await axios
      .post("http://localhost:5000/lovedone/search", sampleSearch, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => (response = res.status))
      .catch((err) => console.log(err));

    expect(response).toBe(200);
  });
});
