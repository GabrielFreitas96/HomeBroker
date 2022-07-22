const splitString = (string: string) => {
  const token: any = string.split(' ');
  console.log('funcao de split', token[1]);
  return token[1] 

}

export default splitString;