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
  return await fetchUrl("/api/assignment");
}

export async function getAssignment(id) {
  return await fetchUrl("/api/assignment?id=" + id);
}

export async function getSubmission(id) {
  return await fetchUrl("/api/submission?id=" + id);
}

export async function getAllSubmissions(id) {
  return await fetchUrl("/api/submission?all=true&id=" + id);
}

export async function getAllDoubts() {
  return await fetchUrl("/api/doubts");
}

export async function getDoubt(id) {
  return await fetchUrl("/api/doubts?id=" + id);
}
export async function getResponses(id) {
  return await fetchUrl("/api/responses?id=" + id);
}

export async function getAllTests() {
  return await fetchUrl("/api/tests");
}

export async function getTest(id) {
  return await fetchUrl("/api/tests?id=" + id);
}

export async function getAllSchedule() {
  return await fetchUrl("/api/schedules");
}

export async function getFiles() {
  return await fetchUrl("/api/files");
}

export async function getAllUsers() {
  return await fetchUrl("/api/users");
}

export async function getFees() {
  return await fetchUrl("/api/fees");
}

export async function getSettings() {
  return await fetchUrl("/api/settings");
}

export async function getChats() {
  return await fetchUrl("/api/chats");
}
export async function getChat(id) {
  return await fetchUrl("/api/chats?id=" + id);
}

export async function getUsersByBatch(batch) {
  return await fetchUrl("/api/users?batch=" + batch);
}

export async function getUser(id) {
  return await fetchUrl("/api/users?id=" + id);
}

export async function getAttendanceByDateAndBatch(date, batch) {
  return await fetchUrl("/api/attendance?date=" + date + "&batch=" + batch);
}

export async function getAttendanceByBatch(batch) {
  return await fetchUrl("/api/attendance?batch=" + batch);
}
