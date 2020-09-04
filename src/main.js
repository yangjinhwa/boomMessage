import {addList, byId, ids, findElementId, removeList} from "./data";

export const addBtn = window.document.getElementById('addBtn');
export const msgInput = window.document.getElementById('msgInput');

addBtn.addEventListener("click", ()=> {
  const timeSelect = document.getElementById("boomLimitTime").value;
  addList(msgInput.value, timeSelect)
});

findElementId();

const timer = () => {
  setInterval(() => {
    ids.forEach((id, i) => {
      byId[id].time -= 1;
      const boomListId = window.document.querySelector(`#boomTime-${id}`);
      boomListId.innerHTML = byId[id].time;

      if (byId[id].time === 0) {
        removeList(id);
      }
    });
  }, 1000);
};

timer();
