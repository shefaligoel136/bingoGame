const Player = require('../../../models/player');


module.exports.index = async function(request, response){
    try{
        const getPlayer = await Player.find({});
        response.send(getPlayer);
        return response.status(200).json({
            message: "Hello ",
        })
    }catch(err){
        console.log(err);
    }
}

module.exports.registerPlayer = async function(request, response){

    try{
        let player = await Player.create({
             name : request.query.name
        });
    

        return response.status(200).json({
            data: {
                player: player
            },
            message: "Hello " + player.name,
        })
    }
    catch(err){
        console.log(err);
    }
}

