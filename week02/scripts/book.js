const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#chaptersList');

button.addEventListener('click', function () {

  if (input.value.trim() !== '') {
  
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = input.value;
    deleteButton.textContent = '❌';

    deleteButton.addEventListener('click', () => {
      list.removeChild(li);
    });

    li.append(deleteButton);
    list.append(li);

    input.value = '';
  } else {
    alert('Please enter a chapter name.');
  }

  input.focus();
});
