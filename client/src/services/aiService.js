import API from "./api";

export const estimateTask = async (task) => {
  const { data } = await API.post("/ai/estimate", {
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  return data.estimate;
};