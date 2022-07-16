import bcrypt from 'bcrypt';

const generateCryptPassword = (password: string): string => {
  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (password:string, hash: string) => (bcrypt.compareSync(password, hash));

export { generateCryptPassword, comparePassword };
