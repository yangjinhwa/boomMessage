// import {loadLists} from "./draw-dom";
import {msgInput} from "./main";
import {drawLists} from "./draw-dom";

// data 모습 임시 구체화
const byIdDummy = {
  'listId0': {id: 'listId0', message: '123', time: 3},
  'listId1': {id: 'listId1', message: '123', time: 3},
  'listId2': {id: 'listId3', message: '123', time: 3},
};

export const byId = {};
export const ids = [];
const boomListUl = window.document.getElementById('boomList');
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
  msgInput.value = '';
  loadLists();
}

// 타이머 추가/감소/삭제
export const findElementId = () => {
  boomListUl.addEventListener('click', (e) => {
    const target = e.target;
    const liElement = target.closest("li");
    const elementId = liElement.id;
    const parent = target.parentElement;
    const increaseElement = parent.querySelector('.increaseSelect');
    const decreaseElement = parent.querySelector('.decreaseSelect');
    const clickedElementType = e.target.nodeName;
    if (clickedElementType === 'SELECT') {
      target.stopPropagation();
    }

    if (target.className === 'removeBtn') {
      removeList(elementId);
    }

    if (target.className === 'increaseTimeBtn') {
      increaseTime(increaseElement,elementId);
    }

    if (target.className === 'decreaseTimeBtn') {
      decreaseTime(decreaseElement,elementId);
    }

    loadLists();
  });
};

const increaseTime = (increaseElement,elementId) => {
  const increaseValue = increaseElement.value;
  if (increaseValue === '3' || increaseValue === '5') {
    byId[elementId].time += parseInt(increaseValue);
  } else if (increaseValue === '2times') {
    console.log('2배수');
    byId[elementId].time *= 2;
  } else if (increaseValue === '3times') {
    byId[elementId].time *= 3;
  }
};

const decreaseTime = (decreaseElement,elementId) => {
  const decreaseValue = decreaseElement.value;
  if (decreaseValue === '3' || decreaseValue === '5') {
    byId[elementId].time -= parseInt(decreaseValue);
  }
};


// 삭제하기
export const removeList = (elementId) => {
  delete byId[elementId];
  const findIndex = ids.findIndex((i) => i === elementId);
  ids.splice(findIndex, 1);
  console.log(ids);
  loadLists();
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
