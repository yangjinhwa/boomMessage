import {loadLists} from "./draw-dom";
// import {selectBoomTimeHandler} from './load';

export const data = [];

const msgInput = window.document.getElementById('msgContent');
const removeBtn = window.document.getElementById('removeBtn');
const addBtn = window.document.getElementById('addBtn');

const boomTimeDom = window.document.getElementsByClassName('boomTime');

const boomLists = window.document.getElementsByClassName('boomLists');
const btnSet = window.document.getElementById("btnSet");

let createdNum = 0;



// 추가하기
const addList = () => {
  const selectNum = document.getElementById("boomLimitTime").value;
  const args = {
    createdId: createdNum++,
    msg: msgInput.value,
    boomTime: selectNum
  };
  data.push(args);
  // 인풋 초기화
  msgInput.value = '';
  loadLists();
};

addBtn.addEventListener("click", addList);


const findIndex = (targetListId) => {
  let findIndex;
  // 클릭한 타겟의 id
  const findEl = data.filter((data) => {
    return data.createdId === targetListId;
  });
  const findElID = findEl[0].createdId;

  for (let i = 0; i < data.length; i++) {
    if (data[i].createdId === findElID) {
      findIndex = i;
      break
    }
  }
  return findIndex
};


// 삭제하기
export const removeList = (target) => {
  const targetListId = Number(target.parentElement.id);
  const targetIndex = findIndex(targetListId);
  data.splice(targetIndex, 1);
  loadLists();
};

// 타임 추가하기
const addTime = (time) => {

};


const updateTime = (time) => {
  if (data.length > 0) {
    setInterval(() => {
      for (let i = 0; i < data.length; i++) {
        const getListLi = document.getElementById('list' + i);
        const getP = getListLi.querySelector("p");
        const getTimeSpan = getP.querySelector(".boomTime");
        getTimeSpan.innerHTML = time;
        // console.log(getTimeSpan);
      }
    }, 1000)
  }
};


const autoRemoveMsg = (id) => {
  const targetIndex = findIndex(id);
  data.splice(targetIndex, 1);
};


const timer = () => {
  setInterval(() => {

    data.forEach((item, i) => {
      data[i].boomTime = Number(item.boomTime) - 1;
      for (let i = 0; i < data.length; i++) {
        const timeElement = window.document.getElementsByClassName('boomTime')[i];
        timeElement.innerHTML = data[i].boomTime;
      }
      if (data[i].boomTime === 0) {
        autoRemoveMsg(item.createdId);
        loadLists();
      }
    });
    // console.log(boomTimeDom);
  }, 1000);
};


// loadLists();
timer();
