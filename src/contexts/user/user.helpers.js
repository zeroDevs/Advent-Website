export const login = () =>
  fetch("https://aocbot.zerobot.xyz/api/login")
    .then(res => res.json())
    .then(data => console.log(data));
