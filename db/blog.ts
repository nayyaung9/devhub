import Blog from "./models/Blog";

export async function createBlog({ ...payload }) {
  try {
    let newBlog = new Blog(payload);

    return await newBlog.save();
  } catch (error) {
    throw error;
  }
}

export async function fetchAllBlogs() {
  try {
    let projects = await Blog.find()
      .populate("user", "-password -createdAt -updatedAt")
      .sort({ createdAt: -1 });

    return projects;
  } catch (error) {
    throw error;
  }
}

export async function fetchAuthUserBlogs(userId: string) {
  try {
    let projects = await Blog.find({ user: userId })
      .populate("user")
      .sort({ createdAt: -1 });

    return projects;
  } catch (error) {
    throw error;
  }
}
