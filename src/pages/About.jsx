import React from "react";

import Contributors from "../components/Contributors/Contributors.component";
import TextSection from "../components/TextSection/TextSection.component";

export default function About(props) {
  return (
    <>
      <TextSection title={"About AoC"}>
        <h3>What is AoC?</h3>
        <p>
          Advent of Code (AoC) is an advent calendar for programmers, where each
          day of December you are provided with a new problem to solve with a
          language of your choice. Each year has a fantastic plot and story line
          you can follow along with as you solve each days challenge.
        </p>

        <h3>Who makes Advent of Code?</h3>
        <p>
          Each year <a href="https://was.tl">Eric Wastl</a> and a small team go
          about creating an event that is enjoyed by hundreds of thousands of
          enthusiasts around the globe. You can find out more about it on the{" "}
          <a href="https://adventofcode.com/about">AoC Website</a>
        </p>

        <h3>What is ZTM's involvement?</h3>
        <p>
          Whilst AoC provide an official leaderboard, we thought it would be
          awesome to have a collection hub and leaderboard for all solutions
          created by members of the Zero To Mastery community. A central
          location where you can view solutions from other members, add your own
          solutions, give some love to your favourite solutions and of course
          see how you rank against other members of the community.
        </p>

        <h3>Can I join in?</h3>
        <p>
          Everyone is encouraged to participate, it's a fantastic opportunity to
          learn, practice and expand your knowledge and skill set. It's also a
          huge amount of fun.
        </p>

        <h3>What languages can I use?</h3>
        <p>
          You are free to use whichever language you feel would be best suited
          to the problem at hand. You are also welcome to submit multiple
          solutions in different languages.
        </p>
      </TextSection>
      <Contributors />
      <TextSection title={"The Project"}>
        <h3>The Aim</h3>
        <p>
          The aim of this project was to redevelop and build upon last years
          version of this website, which was embedded into the old Zero To
          Mastery website, which you can find{" "}
          <a href="https://zero-to-mastery.github.io/zero-to-mastery-website/events/advent-of-code.html">
            here
          </a>
          .
        </p>

        <h3>The Frontend</h3>
        <p>
          For this project we decided to use a React front end and Material-UI.
          Using Material-UI allowed us to concentrate on building the app out,
          when time was limited, rather than focusing on the building out brand
          new component styling.
        </p>

        <h3>The Backend</h3>
        <p>
          Due to the functions we needed the Backend to perform, we decided to
          run the backend from a Discord bot utilizing Discord.js and Mongo.
          This essentially provided us with more control over how and when we
          could post automatic updates to the Discord server, whilst also
          ensuring solutions were legitimate ZTM member solutions.
        </p>

        <h3>The Team</h3>
        <p>
          A small team made up of fellow students from the Star Mentors and
          Management Team (some of which are listed above), spent the month of
          November planning, discussing and building out this web application.
        </p>

        <h3>The Repo & Bug/Feature Reporting</h3>
        <p>
          If you would like to take a look at the code, you can find the github
          repository{" "}
          <a href="https://github.com/zeroDevs/Advent-Website/">here</a>. Please
          feel free to create issues for bug tracking and feature requests.
          Although it is unlikely that new features will be added whilst the
          event is live, however they will most definitely be considered next
          year.
        </p>
      </TextSection>
    </>
  );
}
