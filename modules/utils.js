// Random function
export const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const inArea = (area1, area2) => {
    if (area1.x <= area2.x + area2.width && area1.x >= area2.x && area1.y <= area2.y + area2.height && area1.y >= area2.y) return true;
    else return false;
};