import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//get all user
export const getAllUser = async (req, res) => {
  const { username, password, email } = req.body;
  const allUser = await prisma.User.findMany();
  console.log(allUser);
  res.status(200).json({ allUser });
};

//signup user
export const signupUser = async (req, res) => {
  const { username, password, email, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  try {
    const newUser = await prisma.User.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name,
      },
    });
    const { password, ...user } = newUser;
    console.log(newUser);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).send(err);
  }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("userLogin", email);

  try {
    const userDetail = await prisma.User.findUnique({
      where: { email },
    });
    console.log(userDetail);
    if (!userDetail) res.status(404).send("User not found");
    const isValidPasswword = await bcrypt.compare(
      password,
      userDetail.password
    );

    if (!isValidPasswword) {
      return res.status(404).send("password not match");
    }
    const token = jwt.sign({ id: userDetail.id }, "secret_key", {
      expiresIn: "1d",
      //   1000 * 60 * 60 * 24 * 7
    });
    res.cookie("token_key", token, { httpOnly: true });
    return res
      .status(200)
      .send({ id: userDetail.id, message: "Success Login" });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//updateProfile
export const updateProfile = async (req, res) => {
  const id = req.params.id;

  const { username, name, email } = req.body;

  try {
    const userDetail = await prisma.User.findUnique({
      where: { email },
    });
    console.log(userDetail, "userDetail");
    if (!userDetail) {
      return res.status(404).send({ message: "user details not found" });
    }
    const updatedUser = await prisma.User.update({
      where: { email },
      data: {
        username,
        name,
      },
    });

    if (!updatedUser) {
      return res.status(403).send({ message: "error occured" });
    }
    res.status(202).send({ message: "updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    console.log(deleteUser, id);
    if (!deleteUser) {
      return res.status(404).send("user not found");
    }
    return res.status(200).send({ message: " succesfully delted the user" });
    console.log(deleteUser);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//getuser
export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userData) {
      return res.status(404).send("user not found");
    }
    return res.status(200).send({ status: "success", user: userData });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
