import { byebye } from './getData';

console.log('Hello');

function Hello() {
  console.log('Hello');
}

Hello();
const init = async () => {
  await byebye();
};


init();

