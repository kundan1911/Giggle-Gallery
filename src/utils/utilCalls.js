export const getCategorisedData = (videos, category) => {
  if (category === "All") {
    return [...videos];
  }
  return videos.filter((video) => video.category === category);
};

export const isPresentInState = (state, data) => {
  return state?.some((arr) => arr._id === data._id);
};

export const findById = (data, value) =>
  data.find((item) => item._id === value);

export const getShuffleArr = ([...arr]) => {
  var currentIndex = arr.length,
    tempValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = tempValue;
  }
  return arr;
};
