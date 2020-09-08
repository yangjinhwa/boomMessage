import {byId, ids, sortDescList} from "./data";


const createOptions = () => {
  let innerNode = `
        <select name=\"\" class=\"increaseSelect\">
          <option value=\"3\">3</option>
          <option value=\"5\">5</option>
          <option value=\"2times\">2배</option>
          <option value=\"3times\">3배</option>
        </select>
        <button class=\"increaseTimeBtn\">시간 추가</button>
        <select name=\"\" class=\"decreaseSelect\">
          <option value=\"3\">-3</option>
          <option value=\"5\">-5</option>
        </select>
        <button class=\"decreaseTimeBtn\">시간 감소</button>
        <button class=\"removeBtn\">삭제</button>
      `;
  return innerNode
};

export const createBoomMessageEl = (id, message, time) => {
  const boomListLi = document.createElement("li");
  boomListLi.setAttribute('id', id);

  // 메시지 뷰
  const p = document.createElement('p');
  p.innerHTML = `메시지 : ${message} , 남은시간 : `;

  // 타이머 뷰
  const span = document.createElement('span');
  span.id = `boomTime-${id}`;
  span.innerHTML = `${time}`;
  p.appendChild(span);
  boomListLi.appendChild(p);

  // 옵션셀릭트 뷰
  const optionsSelectNode = createOptions();
  const div = document.createElement('div');
  div.innerHTML = optionsSelectNode;
  boomListLi.appendChild(div);

  return boomListLi
}

export const drawDiffList = () => {
  // data에서 순서대로 뒤져서 id가 없으면 추가하고, id가 있으면 time을 업데이트한다.
  // data(5)에서 없어진 경우 DOM(6)에서 찾을거야.
  // data: 업데이트 되야하는 정보. <- data.js
  // DOM: 현재 그려진 리스트 정보. <- getElementById
  const sortedIds = sortDescList();
  const list = sortedIds.map((id) => byId[id]);

  const boomListEl = document.getElementById('boomList');
  const drawnListEls = boomListEl.getElementsByTagName('li');

  const drawnDate = [...drawnListEls].reduce((acc, current, index) => {
    const id = current.id;
    const time = Number(current.getElementsByTagName('span')[0].innerHTML);
    const nextResult = { ...acc };

    nextResult[id] = {
      index,
      id,
      time,
      element: current,
    }

    return nextResult;
  }, {});

  list.forEach((item, index) => {
    const { id, message, time } = item;

    const element = document.getElementById(id);

    if (!element) { // 추가
      const newElement = createBoomMessageEl(id, message, time);
      const boomListEl = document.getElementById('boomList');
      const drawnList = boomListEl.childNodes
      const drawnListNumber = drawnList.length;

      if (index === drawnListNumber) {
        boomListEl.appendChild(newElement);
      } else {
        boomListEl.insertBefore(newElement, drawnList[index + 1]);
      }
    } else {
      const nextTime = time;
      const currentTime = drawnDate[id].time;

      if (nextTime !== currentTime) {
        element.querySelector('span').innerHTML = nextTime;
      }
    }

    delete drawnDate[id];
  })

  Object.keys(drawnDate).forEach((id) => {
    const element = document.getElementById(id);

    element.remove();
  })
}
