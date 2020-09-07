import {
  addList,
  byId,
  ids,
  loadLists,
  handleRemoveList,
  getSelectElementId,
  getQuerySelector, increaseTime, decreaseTime
} from "./data";

export const addBtn = window.document.getElementById('addBtn');
export const msgInput = window.document.getElementById('msgInput');
export const boomListUl = window.document.getElementById('boomList');

addBtn.addEventListener("click", ()=> {
  const timeSelect = document.getElementById("boomLimitTime").value;
  addList(msgInput.value, timeSelect);
  msgInput.value = '';
  loadLists();
});

boomListUl.addEventListener('click', (e) => {
  const target = e.target;
  const targetElementId = getSelectElementId(target);
  const clickedElementType = target.nodeName;
  const increaseElement = getQuerySelector(target,`increaseSelect`);
  const decreaseElement = getQuerySelector(target,`decreaseSelect`);

  if (clickedElementType === 'SELECT') {
    e.stopPropagation();
  //  버블링이 안막힘...구현실패...
  }

  if (target.className === 'removeBtn') {
    e.preventDefault();
    handleRemoveList(targetElementId);
  }

  if (target.className === 'increaseTimeBtn') {
    e.preventDefault();
    increaseTime(increaseElement.value,targetElementId);
  }

  if (target.className === 'decreaseTimeBtn') {
    e.preventDefault();
    decreaseTime(decreaseElement.value,targetElementId);
  }
  loadLists();
});

const timer = () => {
  setInterval(() => {
    ids.forEach((id, i) => {
      byId[id].time -= 1;
      const boomListId = window.document.querySelector(`#boomTime-${id}`);
      boomListId.innerHTML = byId[id].time;

      if (byId[id].time === 0) {
        handleRemoveList(id);
        loadLists();
      }
    });
  }, 1000);
};

timer();
