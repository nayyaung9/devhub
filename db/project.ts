import Project from "./models/Project";

export async function createProject({ ...payload }) {
  try {
    let newProject = new Project(payload);

    return await newProject.save();
  } catch (error) {
    return error;
  }
}

export async function fetchAllProjects() {
  try {
    let projects = await Project.find()
      .populate("user")
      .sort({ createdAt: -1 });

    return projects;
  } catch (error) {
    return error;
  }
}
