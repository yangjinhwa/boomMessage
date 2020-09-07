import {drawLists} from "./draw-dom";

export const byId = {};
export const ids = [];
let createdIdNum = 0;

// 추가하기
export function addList(message, time) {
  const listId = `listId${createdIdNum++}`;
  byId[listId] = {
    id: listId,
    message,
    time: parseInt(time)
  };
  ids.push(listId);
}

// 타이머 추가/감소/삭제
export const getSelectElementId = (target) => {
  const liElement = target.closest("li");
  const elementId = liElement.id;
  return elementId
};

export const getQuerySelector = (target, className) => {
  const parent = target.parentElement;
  const element = parent.querySelector(`.${className}`);
  return element
};

export const increaseTime = (increaseValue,targetElementId) => {
  if (increaseValue === '3' || increaseValue === '5') {
    byId[targetElementId].time += parseInt(increaseValue);
  } else if (increaseValue === '2times') {
    byId[targetElementId].time *= 2;
  } else if (increaseValue === '3times') {
    byId[targetElementId].time *= 3;
  }
};

export const decreaseTime = (decreaseValue,targetElementId) => {
  byId[targetElementId].time -= parseInt(decreaseValue);
};

// 삭제하기
export const handleRemoveList = (elementId) => {
  delete byId[elementId];
  const findIndex = ids.findIndex((i) => i === elementId);
  ids.splice(findIndex, 1);
};

// 내림차순 정렬
const sortDescList = () => {
  const descIds = ids.sort((a, b) => {
    return byId[a].time - byId[b].time
  });
  return descIds
};

export const loadLists = () => {
  // 뷰 초기화
  boomListUl.innerHTML = '';
  // 내림차순 정렬
  const descIds = sortDescList();
  // li 요소 추가
  drawLists(descIds);
};
