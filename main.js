//game data
var gameData = {
  ore: 0, //how much ore the player has
  orePerSecond: 1, //how much ore recieved per second
  ingot: 0, //how much ingot the player has
  ingotPerSecond: 0, //how much ingot recieved per second
  autoMine: 1000, //autoMine is the time, in ms, that the player recieves ore.
  furnaceReward: 1, //how much ore a player receives per smelt
  upgradeCostMultiplier: 1.85, //determines the cost of the next upgrade
  upgradeDiscount: 1, //overall discount applied to all upgrades. this can be upgraded as well to decrease the amount.
  pickaxe: {
    amount: 1, //level of the player's pickaxe
    efficiency: 1, //the number of ore per click
    cost: 10, //cost of a pickaxe upgrade
    htmlElementId: "pickaxeUpgrade",
    buttonText: "Upgrade Pickaxe"
  },
  drill: {
    amount: 0, //how many drills the player has
    efficiency: 1, //how much a drill adds to the orePerSecond
    cost: 100, //how much it costs to purchase another drill
    htmlElementId: "drillUpgrade",
    buttonText: "Buy a drill"
  },
  furnace: 0, //how many furnaces the player has
  furnaceEfficiency: 50, //how much ore a smelt uses up
  furnaceCost: 1000 //how much it costs to purchase another furnace
}

//loads save
var savegame = JSON.parse(localStorage.getItem("oreMinerSave"))
if (savegame !== null) {
  gameData = savegame
}


//initialization
updateOre()
document.getElementById("pickaxeUpgrade").innerHTML = "Pickaxe Upgrade (Currently own " + gameData.pickaxe.amount + ") Cost: " + gameData.pickaxe.cost + " Ore"
document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill.amount + ") Cost: " + gameData.drill.cost + " Ore"
document.getElementById("furnaceUpgrade").innerHTML = "Buy a furnace (Currently own " + gameData.furnace + ") Cost: " + gameData.furnaceCost + " Ore"
document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"
document.getElementById("oreSmelt").style.display = "none" //sets smelt ore into ingots button to be invisible before the player has 50 ore

function developerReset() { //developer reset button
  gameData = {
    ore: 0, //how much ore the player has
    orePerSecond: 1, //how much ore recieved per second
    ingot: 0, //how much ingot the player has
    ingotPerSecond: 0, //how much ingot recieved per second
    autoMine: 1000, //autoMine is the time, in ms, that the player recieves ore.
    furnaceReward: 1, //how much ore a player receives per smelt
    upgradeCostMultiplier: 1.85, //determines the cost of the next upgrade
    upgradeDiscount: 1, //overall discount applied to all upgrades. this can be upgraded as well to decrease the amount.
    pickaxe: {
      amount: 1, //level of the player's pickaxe
      efficiency: 1, //the number of ore per click
      cost: 10, //cost of a pickaxe upgrade
      htmlElementId: "pickaxeUpgrade",
      buttonText: "Upgrade Pickaxe"
    },
    drill: {
      amount: 0, //how many drills the player has
      efficiency: 1, //how much a drill adds to the orePerSecond
      cost: 100, //how much it costs to purchase another drill
      htmlElementId: "drillUpgrade",
      buttonText: "Buy a drill"
    },
    furnace: 0, //how many furnaces the player has
    furnaceEfficiency: 50, //how much ore a smelt uses up
    furnaceCost: 1000 //how much it costs to purchase another furnace
  }
  updateOre()
  document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"
  document.getElementById("pickaxeUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.pickaxe.amount + ") Cost: " + gameData.pickaxe.cost + " Ore"
  document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill + ") Cost: " + gameData.drillCost + " Ore"
}

//ore miner
function mineOre() {
  gameData.ore += gameData.pickaxe.efficiency
  updateOre()
}

//click upgrade
function upgradePickaxe() {
  if (gameData.ore >= gameData.pickaxe.cost) {
    gameData.ore -= gameData.pickaxe.cost
    gameData.pickaxe.amount++
    gameData.pickaxe.cost = calcCost(gameData.pickaxe.cost)
    updateOre()
    gameData.pickaxe.updateButton()
  }
}

//drill purchase
function buyDrill() {
  if (gameData.ore >= gameData.drillCost) {
    gameData.ore -= gameData.drillCost
    gameData.drill++
    gameData.orePerSecond += gameData.drillEfficiency
    gameData.drillCost = calcCost(gameData.drillCost)
    updateOre()
    document.getElementById("drillUpgrade").innerHTML = "Buy a drill (Currently own " + gameData.drill + ") Cost: " + gameData.drillCost + " Ore"
  }
}

//furnace purchase
function buyFurnace() {
  if(gameData.ore >= gameData.furnaceCost) {
    gameData.ore -= gameData.furnaceCost
    gameData.furnace++
    gameData.ingotPerSecond += gameData.furnaceEfficiency
    gameData.furnaceCost = calcCost(gameData.furnaceCost)
    updateOre()
    document.getElementById("furnaceUpgrade").innerHTML = "Buy a furnace (Currently own " + gameData.furnace + ") Cost: " + gameData.furnaceCost + " Ore"
  }
}

//smelt ores into ingots
function oreSmelt() {
  if(gameData.ore >= gameData.furnaceEfficiency) {
    gameData.ore -= gameData.furnaceEfficiency
    gameData.ingot += gameData.furnaceReward
    updateOre()
    document.getElementById("goldIngots").innerHTML = gameData.ingot + " Gold Ingots"
    document.getElementById("oreSmelt").innerHTML = "Smelt" + gameData.furnaceEfficiency + " Ore into" + gameData.furnaceReward + " Gold Ingot"
  }
}

//calculate the cost of the next upgrade
function calcCost(cost) {
  return (cost * gameData.upgradeCostMultiplier * gameData.upgradeDiscount).toFixed(0)
}

//updates html view
function updateOre() {
  document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
}

//updates button
function updateButton(obj) {
  document.getElementById(htmlElementId).innerHTML = buttonText +  " (Currently own " + amount + ") Cost: " + cost + " Ore"
}

//second clock
var mainGameLoop = window.setInterval(function() {
  gameData.ore += gameData.orePerSecond //add orePerSecond to ore
  updateOre()
  if(gameData.ore >= 50) { //enable ore smelter
      document.getElementById("oreSmelt").style.display = "inline-block"
    }
}, gameData.autoMine)

//autosave
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('oreMinerSave', JSON.stringify(gameData))
}, 1000)
