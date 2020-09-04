import axios from "axios";

export async function getLoggedInUser() {
  try {
    const { user, following } = await axios.get("/users/whoami");
    return { user, following };
  } catch (err) {
    throw err;
  }
}

export async function getProfile(id) {
  try {
    const { user } = await axios.get(`/${id}`);
    return user;
  } catch (err) {
    throw err;
  }
}

export async function search(q) {
  try {
    const { users } = await axios.get("/search", { params: { q } });
    return users;
  } catch (err) {
    throw err;
  }
}

export async function timeline() {
  try {
    const { tweets } = await axios.get("/timeline");
    return tweets;
  } catch (err) {
    throw err;
  }
}

export async function toggleFollow(xid) {
  try {
    return await axios.post("follow", { xid });
  } catch (err) {
    throw err;
  }
}
