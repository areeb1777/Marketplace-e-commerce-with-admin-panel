import md5 from 'md5';

export const getGravatarUrl = (email: string, size: number = 200) => {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};
