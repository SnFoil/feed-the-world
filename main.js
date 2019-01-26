//game variables
var gameData = {
  ore: 0, //how much ore the player has
  orePerSecond: 1, //how much ore recieved per second
  ingot: 0, //how much ingot the player has
  ingotPerSecond: 0, //how much ingot recieved per second
  orePerClick: 1, //ore recieved per button press
  orePerClickCost: 10, //cost to upgrade orePerClick
  drill: 0, //how many drills the player has
  drillEfficiency: 1, //how much a drill adds to the orePerSecond
  drillCost: 100, //how much it costs to purchase another drill
  furnace: 0, //how many furnaces the player has
  furnaceEfficiency: 50, //how much ore a smelt uses up
  furnaceCost: 1000, //how much it costs to purchase another furnace
  autoMine: 1000, //autoMine is the time, in ms, that the player recieves ore.
  furnaceReward: 1, //how much ore a player receives per smelt
  //upgradeData
  upgradeCostMultiplier: 1.15, //determines the cost of the next upgrade
  upgradeDiscount: 1 //overall discount applied to all upgrades. this can be upgraded as well to decrease the amount.
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
    orePerSecond: 1, //how much ore recieved per second
    ingot: 0, //how much ingot the player has
    ingotPerSecond: 0, //how much ingot recieved per second
    orePerClick: 1, //ore recieved per button press
    orePerClickCost: 10, //cost to upgrade orePerClick
    drill: 0, //how many drills the player has
    drillEfficiency: 1, //how much a drill adds to the orePerSecond
    drillCost: 100, //how much it costs to purchase another drill
    furnace: 0, //how many furnaces the player has
    furnaceEfficiency: 10, //how much a furnace adds to the orePerSecond
    furnaceCost: 1000, //how much it costs to purchase another furnace
    autoMine: 1000, //autoMine is the time, in ms, that the player recieves ore.
    furnaceEfficiency: 50, //how much ore a smelt uses up
    furnaceReward: 1, //how much ore a player receives per smelt
    //upgradeData
    upgradeCostMultiplier: 1.15, //determines the cost of the next upgrade
    upgradeDiscount: 1 //overall discount applied to all upgrades. this can be upgraded as well to decrease the amount.
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
    gameData.orePerClick++
    gameData.orePerClickCost = (gameData.orePerClickCost * gameData.upgradeCostMultiplier).toFixed(0)
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.orePerClick + ") Cost: " + gameData.orePerClickCost + " Ore"
  }
}

//drill purchase
function buyDrill() {
  if (gameData.ore >= gameData.drillCost) {
    gameData.ore -= gameData.drillCost
    gameData.drill++
    gameData.orePerSecond += gameData.drillEfficiency
    gameData.drillCost = (gameData.drillCost * gameData.upgradeCostMultiplier).toFixed(0)
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill + ") Cost: " + gameData.drillCost + " Ore"
  }
}

//furnace purchase
function buyFurnace() {
  if(gameData.ore >= gameData.furnaceCost) {
    gameData.ore -= gameData.furnaceCost
    gameData.furnace++
    gameData.ingotPerSecond += gameData.furnaceEfficiency
    gameData.furnaceCost = (gameData.furnaceCost * gameData.upgradeCost).toFixed(0)
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("furnaceUpgrade").innerHTML = "Buy a furnace (Currently own " + gameData.furnace + ") Cost: " + gameData.furnaceCost + " Ore"
  }
}

//smelt ores into ingots
function oreSmelt() {
  if(gameData.ore >= gameData.furnaceEfficiency) {
    gameData.ore -= gameData.furnaceEfficiency
    gameData.ingot += gameData.furnaceReward
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"
    document.getElementById("oreSmelt").innerHTML = "Smelt " + gameData.furnaceEfficiency + " Ore into " + gameData.furnaceReward + " Gold Ingot"
  }
}

//clock
var mainGameLoop = window.setInterval(function() {
  gameData.ore += gameData.orePerSecond //add orePerSecond to ore
  document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
  if(gameData.ore >= 50) { //enable ore smelter
      document.getElementById("oreSmelt").style.display = "inline-block" //https://www.w3schools.com/cssref/pr_class_display.asp for more types of display, up to you
    }
}, gameData.autoMine)

//autosave
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('oreMinerSave', JSON.stringify(gameData))
}, 1000)
