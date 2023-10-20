const fetchUrl = async (url) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  };

  const data = await fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
  return data;
};

export async function getAllAssignments() {
  return await fetchUrl("http://localhost:3000/api/assignment");
}

export async function getAllDoubts() {
  return await fetchUrl("http://localhost:3000/api/doubts");
}

export async function getAllTests() {
  return await fetchUrl("http://localhost:3000/api/tests");
}

export async function getSchedule(date) {
  return await fetchUrl("http://localhost:3000/api/schedules?date=" + date);
}

export async function getFiles() {
  return await fetchUrl("http://localhost:3000/api/files");
}
