import {
  addList,
  byId,
  ids,
  handleRemoveList,
  getSelectElementId,
  getQuerySelector, increaseTime, decreaseTime
} from "./data";
import { drawDiffList } from './draw-dom';

export const addBtn = window.document.getElementById('addBtn');
export const msgInput = window.document.getElementById('msgInput');
export const boomListUl = window.document.getElementById('boomList');

addBtn.addEventListener("click", () => {
  const timeSelect = document.getElementById("boomLimitTime").value;
  addList(msgInput.value, timeSelect);
  msgInput.value = '';
  drawDiffList();
});

boomListUl.addEventListener('click', (e) => {
  const target = e.target;
  const targetElementId = getSelectElementId(target);
  const clickedElementType = target.nodeName;
  const increaseElement = getQuerySelector(target, `increaseSelect`);
  const decreaseElement = getQuerySelector(target, `decreaseSelect`);

  if (clickedElementType === 'SELECT') {
    e.stopPropagation();
    return
  }

  if (target.className === 'removeBtn') {
    handleRemoveList(targetElementId);
  }

  if (target.className === 'increaseTimeBtn') {
    increaseTime(increaseElement.value, targetElementId);
  }

  if (target.className === 'decreaseTimeBtn') {
    decreaseTime(decreaseElement.value, targetElementId);
  }
  drawDiffList();
});

const timer = () => {
  setInterval(() => {
    ids.forEach((id, i) => {
      byId[id].time -= 1;
      drawDiffList();

      if (byId[id].time === 0) {
        handleRemoveList(id);
      }
    });
  }, 1000);
};

timer();
drawDiffList();
