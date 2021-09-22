import del from 'delete';

const cleanOutput = (cb) => {
  del('./dist/');
  cb();
};

export default cleanOutput;
