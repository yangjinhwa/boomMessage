import {data, removeList} from './index.js';

const boomListUl = window.document.getElementById('boomList');
let descData;




const createMsg = (val, key) => {
  let innerText = `
  <p>${val.msg} : <span class="boomTime">${val.boomTime}</span> index : ${key} createdID: ${val.createdId}</p>
    <select name=\"\" id=\"\" >
        <option value=\"3\">3</option>
         <option value=\"5\">5</option>
         <option value=\"2\">2배</option>
          <option value=\"3\">3배</option>
        </select>
        <button>시간 추가</button>
        <select name=\"\" id=\"\">
          <option value=\"3\">-3</option>
          <option value=\"5\">-5</option>
        </select>
        <button>시간 감소</button>
        <button onclick="removeList(this)">삭제</button>
      `;
  return innerText
};

let buttonID = 0;

const drawLists = (data) => {
  data.forEach((val, key) => {
    const innerMsg = createMsg(val, key);
    const boomListLi = document.createElement("li");
    boomListLi.id = val.createdId;
    boomListLi.innerHTML = innerMsg;

    // let createRemoveBtn = document.createElement('button').setAttribute('id',`removeBtn + ${buttonID++}`);
    // console.log(createRemoveBtn);
    boomListUl.appendChild(boomListLi);
  });
};


const sortDescList = () => {
  descData = data.sort((a, b) => {
    if (a.boomTime > b.boomTime) {
      return -1;
    }
    if (a.boomTime < b.boomTime) {
      return 1;
    }
    return 0;
  });

  return descData
};


export const loadLists = () => {
  // 뷰 초기화
  boomListUl.innerHTML = '';
  // 내림차순 정렬
  const descData = sortDescList();
  // li 요소 추가
  drawLists(descData);
};
