const Game = require('../../../models/game');

// const Card = require('../../../models/cards');

let arr = createArray(0,75);
let numbersArray = createArray(0,75);
let count = 0;

// // http://localhost:8000/api/v1/game/createGame - output : gameId
// // http://localhost:8000/api/v1/game/joinRoom - input : playerId , gameId , output : card
// // http://localhost:8000/api/v1/game/details - input : gameId , output : [player-card]
// // http://localhost:8000/api/v1/game/startGame - socket : number create , broadcast





module.exports.index = async function(request,response){
    try{
        let currentGames = await Game.find({})
        response.send(currentGames);
        return response.status(200).json({
            
            message: "The Current games are",
        })

    }catch(err){

    }
}

module.exports.createRoom = async function(request,response){
    try{
        let room = await Game.create({
            "players" : {
                "name" : request.query.name,
                "card" : createCard()
            },
            game_id : Math.floor(Math.random()*100000)
        })

        room.save();

        // console.log(room);

        return response.status(200).json({
            data: {
                room: room,

            },
            message: "Room Created",
        })
    }catch(err){
        console.log(err);
    }
}

module.exports.joinRoom = async function(request,response){
    try{
        let nPlayer = await Game.find({_id: request.query.game_id},{players: 1})
        let countPlayer = nPlayer[0].players.length
        console.log(countPlayer);
        let join = await Game.findOneAndUpdate({
                        _id : request.query.game_id,
                    },{$push:{
                        "players" : {
                            "name" : request.query.name,
                            "card" : createCard()
                        }
        }});

        return response.status(200).json({
            data: {
                join: join,

            },
            message: "Room Joined",
        })
            
    }catch(err){
        console.log(err);
    }
}

module.exports.startGame = async function(request,response){
    try{

        let game =  await Game.findOne({_id : request.query.game_id}).exec(function(err,game){
            // console.log(game)

            setInterval(function(){ 
                //this code runs every 3 seconds 
                if(count<30){
                    count++;
                    let randomIndex = generateNumber(0,numbersArray.length-1);
        
                    let randomNumber = numbersArray[randomIndex];
                    // console.log(randomNumber);
                    console.log(game.game_board)
        
                    game.game_board.push(randomNumber);
        
                    numbersArray.splice(randomIndex,1);
                    if(randomNumber>=1 && randomNumber<=15){
                        randomNumber = "B"+randomNumber;
                    }else if(randomNumber>=16 && randomNumber<=30){
                        randomNumber = "I"+randomNumber;
                    }else if(randomNumber>=31 && randomNumber<=45){
                        randomNumber = "N"+randomNumber;
                    }else if(randomNumber>=46 && randomNumber<=60){
                        randomNumber = "G"+randomNumber;
                    }else if(randomNumber>=61 && randomNumber<=75){
                        randomNumber = "O"+randomNumber;
                    }
                    
                    // output.innerHTML = randomNumber;
                    // play();  
                }else{
                    // output.innerHTML = allBingoNumber;
                    console.log("Over");
                    game.save();
                    clearInterval();
                }   
            }, 3000); 
            return response.status(200).json({
                data: {
                    game: game,
    
                },
                message: "Game Started",
            })
        });    
    }catch(err){
        console.log(err);
    }
}

module.exports.playerSelect = async function(request,response){
    try{
        let game = await (await Game.findOne({_id:request.query.game_id})).execPopulate(function(err,game){
            // console.log(game.players);
            game.players.map(player =>{
                if(player._id == request.query.player_id){
                    player.bingoNumbers.push(request.query.number)
                }
                // console.log(player._id);
            })
            return response.status(200).json({
                data: {
                    game: game
        
                },
                message: "Room Created",
            })
        })
        
    
    
    }catch(err){
        console.log(err);
    }
    
}

function generateNumber(min,max){
        let step1 = max - min + 1;
        let step2 = Math.random() * step1;
        let result = Math.floor(step2) + min;
        return result;
    }
    
function createArray(start,end){
        let myArray = [];
    
        for(let i=start;i<end;i++){
            myArray.push(i+1);
        }
    
        return myArray;
}

function displayCard(card) {
    content = "";
    for(let i=0;i<5;i++){
        content =content + "<tr>";
        for(let j=0;j<5;j++){''
            content = content + "<td id='" + card[i][j] + "' onclick='selectNumber("+ card[i][j] +")'>" + card[i][j] + "</td>";
        }
        content = content + "</tr>";
    }
    document.getElementById("display_card").innerHTML = content;
}
    


function createCard(){
    
    // console.log(arr);
    let card = [];
    let num;
    for(let i=0;i<5;i++){
        card[i] = [];
        for(let j=0;j<5;j++){
            if(j==0){
               num = generateCardNumber(1,15); 
               card[i][j] = num;
            }else if(j==1){
                num =  generateCardNumber(16,30);
                card[i][j] = num;
            }else if(j==2){
                num =   generateCardNumber(31,45); 
                card[i][j] = num;
            }
            else if(j==3){
                num =   generateCardNumber(46,60); 
                card[i][j] = num;
            }
            else if(j==4){
                num =   generateCardNumber(61,75); 
                card[i][j] = num;
            }
        }

    }
    console.log(card);
    // displayCard(card);
    return JSON.stringify(card);
}

function generateCardNumber(i,j){
    let randomIndex = generateNumber(i,j);
    let randomNumber = arr[randomIndex - 1];
    if(randomNumber == -1){
        return generateCardNumber(i,j);
    }
    arr[randomIndex - 1] = -1;
    return randomNumber;
}

// function play() {   
//     var beepsound = new Audio(   
//     'https://www.soundjay.com/button/sounds/beep-01a.mp3');   
//     beepsound.play();   
// }  