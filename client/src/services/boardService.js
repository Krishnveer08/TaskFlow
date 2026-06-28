import API from "./api";

export const getBoards = async () => {
  const { data } = await API.get("/boards");
  return data.boards;
};

export const createBoard = async (board) => {
  const { data } = await API.post("/boards", board);
  return data.board;
};
export const deleteBoard = async (id) => {
  await API.delete(`/boards/${id}`);
};
export const updateBoard = async (id, board) => {
  const { data } = await API.put(`/boards/${id}`, board);
  return data.board;
};