import * as bcrypt from 'bcrypt';
export async function hashPassword(password: string) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt?.genSalt(saltRounds);
    const hashedPassword = await bcrypt?.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export const matchPassword = async (password: string, hashed_password: string) => {
    const isMatch = await bcrypt.compare(password, hashed_password)
    return isMatch
}