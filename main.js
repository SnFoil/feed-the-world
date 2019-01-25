//game variables
var gameData = {
  ore: 0, //how much ore the player has
  ingot: 0, //how much ingot the player has
  orePerClick: 1, //ore recieved per button press
  orePerClickCost: 10, //cost to upgrade orePerClick
  drill: 0, //how many drills the player has
  drillCost: 100, //how much it costs to purchase another drill
  furnace: 0, //how many furnaces the player has
  furnaceCost: 1000, //how much it costs to purchase another furnace
  autoMine: 1000 //autoMine is the time, in ms, that the player recieves ore.
}

//loads save
var savegame = JSON.parse(localStorage.getItem("oreMinerSave"))
if (savegame !== null) {
  gameData = savegame
}

//initialization
document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.orePerClick + ") Cost: " + gameData.orePerClickCost + " Ore"
document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill + ") Cost: " + gameData.drillCost + " Ore"
document.getElementById("furnaceUpgrade").innerHTML = "Buy a furnace (Currently own " + gameData.furnace + ") Cost: " + gameData.furnaceCost + " Ore"
document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"

  document.getElementById("oreSmelt").style.display = "none" //sets smelt ore into ingots button to be invisible before the player has 50 ore

function developerReset() { //developer reset button
  gameData = {
    ore: 0, //how much ore the player has
    ingot: 0, //how much ingot the player has
    orePerClick: 1, //ore recieved per button press
    orePerClickCost: 10, //cost to upgrade orePerClick
    drill: 0, //how many drills the player has
    drillCost: 100, //how much it costs to purchase another drill
    furnace: 0, //how many furnaces the player has
    furnaceCost: 1000, //how much it costs to purchase another furnace
    autoMine: 1000 //autoMine is the time, in ms, that the player recieves ore.
  }
  document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
  document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"
  document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.orePerClick + ") Cost: " + gameData.orePerClickCost + " Ore"
  document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill + ") Cost: " + gameData.drillCost + " Ore"
}

//ore miner
function mineOre() {
  gameData.ore += gameData.orePerClick
  document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
}

//click upgrade
function buyOrePerClick() {
  if (gameData.ore >= gameData.orePerClickCost) {
    gameData.ore -= gameData.orePerClickCost
    gameData.orePerClick += 1
    gameData.orePerClickCost *= 2
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.orePerClick + ") Cost: " + gameData.orePerClickCost + " Ore"
  }
}

//drill purchase
function buyDrill() {
  if (gameData.ore >= gameData.drillCost) {
    gameData.ore -= gameData.drillCost
    gameData.drill += 1
    gameData.drillCost *= 2
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill + ") Cost: " + gameData.drillCost + " Ore"
  }
}

//furnace purchase
function buyFurnace() {
  if(gameData.ore >= gameData.furnaceCost) {
    gameData.ore -= gameData.furnaceCost
    gameData.furnace += 1
    gameData.furnaceCost *=2
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("furnaceUpgrade").innerHTML = "Buy a furnace (Currently own " + gameData.furnace + ") Cost: " + gameData.furnaceCost + " Ore"
  }
}

//smelt ores into ingots
function oreSmelt() {
  if(gameData.ore >= 10) {
    gameData.ore -= 10
    gameData.ingot += 10
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"
  }
}

//clock
var mainGameLoop = window.setInterval(function() {
  mineOre()
    if(gameData.ingot >= 50) { // >= means greater than or equal to. == means equal to.
      document.getElementById("oreSmelt").style.display = "inline-block" //https://www.w3schools.com/cssref/pr_class_display.asp for more types of display, up to you
    }
}, gameData.autoMine)

//autosave
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('oreMinerSave', JSON.stringify(gameData))
}, 10000)
