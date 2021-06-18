var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastfeed;
var currentTime;

//create feed and lastFed variable here
var feed,lastfeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  lastfeed=database.ref('FeedTime');
  lastfeed.on("value",getFeedTime)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);  

  //create feed the dog button here
  
  feedDog=createButton("Feed the Dog");
  feedDog.position(875,95);
  feedDog.mousePressed(feed_Dog);
 
}

function draw() {
  background("skyblue");
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
  textSize(30);
    fill ("black");
    text("LAST FEED TIME: "+ lastfeed,50,50);
    //textFill ("red");
   // console.log(lastfeed);
 

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);  
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
  //write code here to update food stock and last fed time

  function feed_Dog(){
    dog.addImage(happyDog);
    foodS--;
    console.log(foodS);
    getFeedTime();
    database.ref('/').update({
      Food:foodS  })
    database.ref('/').update({
        FeedTime:lastfeed})
  
    }

async function getFeedTime(data){

  // write code to fetch time from API
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");

  //change the data in JSON format
  var jason = await response.json();
  // write code slice the datetime
  var datetime=jason.datetime;
  lastfeed=datetime.slice(11,16);
  console.log(lastfeed);  
  lastfeed=data.val();

}
