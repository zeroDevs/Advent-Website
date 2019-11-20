import React from "react";

import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useMediaQuery } from "@material-ui/core";

import HeroSection from "../components/HeroSection/HeroSection.component";

const useStyles = makeStyles(theme => ({
  root: props => {
    if (props.isMobile) {
      return {
        backgroundImage: "url('images/adventlightsout-mobile.png')",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100%"
      };
    } else {
      return {
        backgroundImage: "url('images/adventlightsout.png')",
        backgroundPosition: "bottom center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%"
      };
    }
  },
  heroContentStyleOverride: {
    ...theme.typography.h3
  },
  welcomeMessage: {
    textAlign: "center"
  },
  joke: {
    ...theme.typography.h6,
    marginTop: "3rem"
  }
}));

function FourZeroFour({ ...props }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles({ isMobile, classes: props.classes });
  return (
    <>
      <HeroSection
        classes={{
          root: classes.root,
          content: classes.heroContentStyleOverride
        }}
      >
        <div className={classes.welcomeMessage}>
          <div>OH NOOOO!!!!</div>
          <div>The lights went out</div>
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Head Home
          </Button>
          <div className={classes.joke}>
            {Object.values(jokes[Math.floor(Math.random() * jokes.length)]).map(
              item => (
                <div>{item}</div>
              )
            )}
          </div>
        </div>
      </HeroSection>
    </>
  );
}

export default React.memo(FourZeroFour);

const jokes = [
  {
    q: "Q: What kind of Christmas music do elves like?",
    a: "A: “Wrap” music"
  },
  {
    q: "Q: How can Santa deliver presents during a thunderstorm?",
    a: "A: His sleigh is flown by raindeer"
  },
  {
    q: "Q: What do you call a snowman with a six pack?",
    a: "A: An abdominal snowman"
  },
  {
    q: "Q: How does a snowman get to work?",
    a: "A: By icicle"
  },
  {
    q: "Q: What do snowmen call their offspring?",
    a: "A: Chill-dren"
  },
  {
    q: "Q. What’s St. Nicholas’s favorite measurement in the metric system?",
    a: "A. The Santameter!"
  },
  {
    q: "Q. Where do Christmas plants go when they want to become movie stars?",
    a: "A. Holly-wood!"
  },
  {
    q: "Q. How do Christmas angels greet each other?",
    a: "A. “Halo!”"
  },
  {
    q: "Q. What’s red and white and falls down chimneys?",
    a: "A. Santa Klutz!"
  },
  {
    q: "Q. Which of Santa’s reindeer has the worst manners?",
    a: "A. RUDE-olph, of course!"
  },
  {
    q:
      "People act like the North Pole and the South Pole are exactly the same, but really, there’s a whole world of difference between them.",
    a: ""
  },
  {
    q: "Q. What did the peanut butter say to the grape on Christmas?",
    a: "A. “‘Tis the season to be jelly!”"
  },
  {
    q: "Q. What’s a sheep’s favorite Christmas song?",
    a: "A. “Fleece Navidad”!"
  },
  {
    q: "Q. What do sheep say to shepherds at Christmastime?",
    a: "A. “Season’s bleatings!”"
  },
  {
    q: "Q. What’s Santa Claus’s favorite type of potato chip?",
    a: "A. Crisp Pringles!"
  },
  {
    q: "Q. What’s Jack Frost’s favorite part of the school day?",
    a: "A. Snow and tell."
  },
  {
    q: "Q. Why do Dasher and Dancer love coffee?",
    a: "A. Because they’re Santa’s star bucks!"
  },
  {
    q: "Q. What does the Gingerbread Man use to make his bed?",
    a: "A. Cookie sheets!"
  },
  {
    q:
      "Q. What do you call an outlaw who steals gift wrapping from the rich to give to the poor?",
    a: "A. Ribbon Hood."
  },
  {
    q: "Q. What do you get if you cross a Christmas tree with an iPad?",
    a: "A. A pineapple!"
  },
  {
    q: "Q. How is the alphabet different on Christmas from every other day?",
    a: "A. There’s Noel!"
  },
  {
    q: "Q. What’s Santa Claus’s favorite track & field event?",
    a: "A. North Pole-vaulting!"
  },
  {
    q: "Q: Why did Scrooge keep a pet lamb?",
    a: "A: Because it would say, “Baaaaahh humbug!”"
  },
  {
    q:
      "Q: What are the best books to read during the holidays? A: The Lord of the Five Golden Rings No Country for Old Menorahs For Whom the Jingle Bells Toll Harry…",
    a: ""
  },
  {
    q: "Q: Where do you find reindeer?\nA: It depends on where you leave them!",
    a: ""
  },
  {
    q: "Q: Who is a Christmas tree’s favorite singer?\nA: Spruce Springsteen",
    a: ""
  },
  {
    q: "Q: What’s Santa’s favorite snack food?",
    a: "A: Crisp Pringles."
  },
  {
    q:
      "Q: How is the alphabet different on Christmas than any other day?\nA: On Christmas, it has Noel.",
    a: ""
  },
  {
    q: "Q: “Why didn’t Rudolph get a good report card?”",
    a: "A: “Because he went down in History.”"
  },
  {
    q:
      "Q: What Do You Sing At An Elf’s Birthday Party?\nA: Freeze A Jolly Good Fellow!",
    a: ""
  },
  {
    q: "Q: What cars do elves drive?",
    a: "A: A toyYoda."
  },
  {
    q: "Q: How did Scrooge win the football game?",
    a: "A: The ghost of Christmas passed"
  },
  {
    q: "Q: What do you call Santa’s helpers?",
    a: "A: Subordinate Clauses."
  },
  {
    q: "Q: What is Santa’s primary language?",
    a: "A: North Polish."
  },
  {
    q: "Q: What do reindeer say before they tell a joke?",
    a: "A: This will sleigh you"
  },
  {
    q: "Q: Why did they couple get hitched on the 24 of December?",
    a: "A: So they could have a married Christmas"
  },
  {
    q: "Q: How do you lift a frozen car?\nA: With a Jack Frost",
    a: ""
  },
  {
    q:
      "Q: Which holiday mascot has the least spare change?\nA: St. Nickel-less",
    a: ""
  },
  {
    q: "Q: What would you call an elf who just has won the lottery?\nA: Welfy",
    a: ""
  },
  {
    q:
      "Q: How did the ornament get addicted to Christmas?\nA; He was hooked on trees his whole life",
    a: ""
  },
  {
    q: "Q: How can you tell a family doesn’t celebrate Christmas?",
    a: "A: The lights are on, but nobody’s a gnome."
  },
  {
    q: "Q: What do you call an obnoxious reindeer?",
    a: "A: RUDEolph."
  },
  {
    q: "Q: Why are Christmas trees so fond of the past?",
    a: "A: Because the present’s beneath them."
  },
  {
    q: "Q: What do you call an elf who sings?",
    a: "A: A wrapper!"
  },
  {
    q: "Q: What do you call a kid who doesn’t believe in Santa?",
    a: "A: A rebel without a Claus."
  },
  {
    q: "Q: What do you call a bankrupt Santa?\nA: Saint Nickel-less.",
    a: ""
  },
  {
    q:
      "Q: Why did the Christmas tree go to the barber?\nA: It needed to be trimmed.",
    a: ""
  },
  {
    q: "Q: What is Santa Claus’ laundry detergent of choice?",
    a: "A: Yule-Tide."
  },
  {
    q: "Q: How does Santa keep his bathroom tiles immaculate?",
    a: "A: He uses Comet."
  },
  {
    q: "Q: What’s Santa’s favorite song by the Ramones?",
    a: "A: Blitzen-krieg Bop."
  },
  {
    q:
      "Q: Why does St. Nick like the Temptations’ version of Silent Night best?",
    a: "A: Because Santa Was A Rolling Stone."
  },
  {
    q:
      "While our great-granddaughters were getting ready for bed on Christmas Eve, Molly had a loose tooth that she wanted to pull. Addison said, “Don’t you dare pull that tooth out…",
    a: ""
  },
  {
    q: "Did you hear that Santa knows karate?",
    a: "He has a black belt."
  },
  {
    q: "Q: Who is Santa’s favorite singer?",
    a: "A: Elf-is Presley."
  },
  {
    q:
      "Q: What do the elves call it when Father Christmas claps his hands at the end of a play?",
    a: "A: Santapplause!"
  },
  {
    q: "Q: What do you say to Santa when he’s taking attendance at school?",
    a: "A: Present."
  },
  {
    q: "Q: Why does Santa have 3 gardens?",
    a: "A: So he can ho-ho-ho."
  },
  {
    q: "Q: Why was Santa’s little helper feeling depressed?",
    a: "A: Because he had low elf esteem."
  },
  {
    q:
      "Q:What do you call Kris Kringle when he goes on his wife’s health insurance?",
    a: "A: A dependent Claus."
  },
  {
    q: "Christmas: The time when everyone gets Santamental.",
    a: ""
  },
  {
    q: "Q: Why did Santa bring 22 reindeer to Walmart?",
    a:
      "A: Because what he wanted to buy cost around 20 bucks, but just in case it was more, he brought some extra doe."
  },
  {
    q: "Q: What kind of bike does Santa Claus ride?",
    a: "A: A Holly Davidson."
  },
  {
    q: "Q: What do you get if you cross Father Christmas with a detective?",
    a: "A: Santa Clues!"
  },
  {
    q: "Q: What nationality is Santa Claus?",
    a: "A: North Polish"
  },
  {
    q: "Q: When Santa is on the beach what do the elves call him?",
    a: "A: Sandy Claus"
  },
  {
    q: "Q: Why does Santa go down the chimney?",
    a: "A: Because it soots him!"
  },
  {
    q: "Q: What do you get if Santa goes down the chimney when a fire is lit?",
    a: "A: Crisp Kringle."
  },
  {
    q: "Q: What’s Santa’s dog’s name?",
    a: "A: Santa Paws!"
  },
  {
    q: "Q: What’s as big as Santa but weighs nothing?",
    a: "A: Santa’s shadow!"
  },
  {
    q: "Q: Why did Santa put a clock in his sleigh?",
    a: "A: Because he wanted to see time fly!"
  },
  {
    q: "Q: Why does Santa have elves in his workshop?",
    a: "A: Because the Seven Dwarfs were busy!"
  },
  {
    q:
      "Q: What did Mrs. Claus say to Santa Claus when she looked up in the sky?",
    a: "A: Looks like rain, dear!"
  },
  {
    q: "Q: How do you know Santa Claus is good at karate?",
    a: "A: He has a black belt!"
  }
];
