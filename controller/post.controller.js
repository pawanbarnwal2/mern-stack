import prisma from "../lib/prisma.js";

export const createPost = async (req, res) => {
  try {
    const body = req.body;
    const id = req.id;
    console.log(id);
    const newPost = await prisma.Post.create({
      data: {
        ...body.postData,
        userId: id,
        PostDetails: {
          create: body.postDetail,
        },
      },
    });
    if (!newPost)
      return res.status(404).json({ error: "Some error in creating post" });
    res.status(201).json({ message: "it is working" });
  } catch (err) {
    res.status(505).send({ status: "failed", error: err.message });
  }
};

//getPost
export const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const userData = await prisma.Post.findUnique({
      where: {
        id: postId,
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

export const getPosts = async (req, res) => {
  const postId = req.params.id;
  try {
    const postData = await prisma.Post.findMany();
    if (!postData) {
      return res.status(404).send("user not found");
    }
    return res.status(200).send({ status: "success", post: postData });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
