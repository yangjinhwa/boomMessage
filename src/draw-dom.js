import {byId, ids} from "./data";


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

export const drawLists = (descIds, boomListUl) => {
  // 뷰 초기화
  descIds.forEach((id) => {

    const boomListLi = document.createElement("li");
    boomListLi.setAttribute('id', id);

    // 메시지 뷰
    const p = document.createElement('p');
    p.innerHTML = `메시지 : ${byId[id].message} , 남은시간 : `;

    // 타이머 뷰
    const span = document.createElement('span');
    span.id = `boomTime-${id}`;
    span.innerHTML = `${byId[id].time}`;
    p.appendChild(span);
    boomListLi.appendChild(p);

    // 옵션셀릭트 뷰
    const optionsSelectNode = createOptions();
    const div = document.createElement('div');
    div.innerHTML = optionsSelectNode;
    boomListLi.appendChild(div);
    boomListUl.appendChild(boomListLi);
  });
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
