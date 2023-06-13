import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
  updatePost,
  getPostComments,
} from "../controllers/posts.js";

const router = new Router();

// Create Post
// http://localhost:3002/api/posts

router.post("/", checkAuth, createPost);

// Get all Posts
// http://localhost:3002/api/posts

router.get("/", getAll);

// Get Post by Id
// http://localhost:3002/api/posts/:id

router.get("/:id", getById);

// Get my Posts
// http://localhost:3002/api/posts/user/me

router.get("/user/me", checkAuth, getMyPosts);

// Update Post
// http://localhost:3002/api/posts/:id

router.put("/:id", checkAuth, updatePost);

// Remove Post
// http://localhost:3002/api/posts/:id

router.delete("/:id", checkAuth, removePost);

// Get Post Comments
// http://localhost:3002/api/posts/comments/:id

router.get("/comments/:id", getPostComments);

export default router;
