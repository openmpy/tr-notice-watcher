import axios from "axios";

export async function fetchData(config) {
  const [regular, pinned] = await Promise.all([
    axios.get(config.apiUrl),
    axios.get(config.pinnedApiUrl),
  ]);

  const list = [...regular.data.result.list, ...pinned.data.result.list];
  return list.sort((a, b) => b.id - a.id);
}

export async function fetchEventData(config) {
  const { data } = await axios.get(config.apiUrl);
  return data.result.list.sort((a, b) => b.id - a.id);
}
