const sort = (arr) => {
  const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
  return [...arr].sort((a, b) => {
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
};

export default sort;
