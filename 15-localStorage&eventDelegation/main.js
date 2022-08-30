  // get form
  const addItems = document.querySelector('.add-items');

  // get plate list
  const itemsList = document.querySelector('.plates');

  // get plate from localStorage
  const items = JSON.parse(localStorage.getItem('items')) || [];

  // get checkAll btn
  const checkAll = document.querySelector('[name=checkAll]');
  const unCheckAll = document.querySelector('[name=unCheckAll]');

  // when submit event, invoke addItem
  addItems.addEventListener('submit', addItem);

  // when checkbox clicked, invoke toggleDown
  itemsList.addEventListener('click', toggleDown);

  // 
  checkAll.addEventListener('click', handleCheckAll);
  unCheckAll.addEventListener('click', handleUnCheckAll)
  // update plateList
  populateList(items, itemsList);

function addItem(e){
  e.preventDefault();
  
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  }

  items.push(item);
  populateList(items, itemsList)
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function toggleDown(e){
  if (!e.target.matches('input')) return
  const ele = e.target
  const index = ele.dataset.index
  
  items[index].done = !items[index].done

  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, platesList)
}

function populateList(plates =[], platesList){
  platesList.innerHTML = plates.map((plate, index) => {
    return `
      <li>
        <input type="checkbox" data-index= ${index} id="item${index}" ${plate.done ? 'checked' : ''} />
        <label for="item${index}">${plate.text}</label>
      </li>
    `;
  }).join('')
}

function handleCheckAll(){
  // console.log(items)
  items.forEach((item) => item.done = true)
  save('items', items)
  populateList(items, itemsList)
}

function handleUnCheckAll(){
  // console.log('cancel')
  items.forEach((item) => item.done = false)
  save('items', items)
  populateList(items, itemsList)
}

function save(key, items){
  localStorage.setItem(key, JSON.stringify(items))
}
