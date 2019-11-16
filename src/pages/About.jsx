import React from "react";

export default function About(props) {
  fetch(" https://aocbot.zerobot.xyz/api/login ")
  .then(res => res.json())
  .then(data => console.log(data));
  return (
    <>
      <div>About Page</div>
    </>
  );
}
