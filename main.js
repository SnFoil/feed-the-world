
//all variables
var gameData = {
  ore: 0,
  orePerClick: 1,
  orePerClickCost: 10,
  drill: 0,
  drillCost: 100,
  furnace: 0,
  furnaceCost: 1000

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
    document.getElementById("furnaceUpgrade").innerHTML = "Buy a furnace (Currently own " + gameData.furnace + ") Cost: " + gameData.drillCost + " Ore"
  }
}

//smelt ores into ingots
function oreSmelt() {
  if(gameData.ore >= 10) {
    gameData.ore -= 10
    gameData.gold += 10
    document.getElementById("oreMined").innerHTML = gameData.ore + " Gold Ore"
    document.getElementById("goldIngots").innerHTML = gameData.gold + " Gold Ingots"
  }
}

//clock
var mainGameLoop = window.setInterval(function() {
  mineOre()
  //oreSmelt()
}, 100)

//autosave
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('oreMinerSave', JSON.stringify(gameData))
}, 10000)

//loads save
var savegame = JSON.parse(localStorage.getItem("oreMinerSave"))
if (savegame !== null) {
  gameData = savegame
}
