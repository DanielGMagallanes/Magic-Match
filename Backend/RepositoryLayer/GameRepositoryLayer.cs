using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModelLayer;
//using ModelLayer.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ModelLayer.ModelViews;
using Microsoft.Extensions.Logging;
using System;

namespace RepositoryLayer
{

    public class GameRepositoryLayer
    {
        private readonly GameContext _gameContext;
        private readonly ILogger<GameRepositoryLayer> _logger;

        public GameRepositoryLayer(GameContext game)
        {
            _gameContext = game;
        }

        public GameRepositoryLayer(GameContext game, ILogger<GameRepositoryLayer> logger)
        {
            _gameContext = game;
            _logger = logger;

        }

        /// <summary>
        /// Adds a card specified by its int id to a collection with an existing
        ///  player's playerId. The quantity of cards being added is also set.
        /// </summary>
        /// <param name="cardId"></param>
        /// <param name="playerGuid"></param>
        /// <param name="quantity"></param>
        /// <returns></returns>
        //public async Task<ActionResult<Collection>> AddToCollection(CollectionViewModel collection)
        //{
        //    var player = await _gameContext.players.Where(x => x.playerId == collection.playerId).FirstOrDefaultAsync();
        //    var card = await _gameContext.cards.Where(x => x.cardId == collection.cardId).FirstOrDefaultAsync();

        //    if (player == null || card == null)
        //    {

        //    }

        //    Collection temp = new Collection()
        //    {
        //        collectionHolder = player.playerId,
        //        //Get from API
        //        //cards = ,
        //        quantity = collection.quantity
        //    };

        //    return null;
        //}

        //parameter needs to change
        public async Task<ActionResult<Collection>> GetCollection(string id)
        {
            var player = await _gameContext.collections.Where(x => x.collectionHolder.ToString() == id).FirstOrDefaultAsync();
            if(player == null)
            {
                _logger.LogInformation($"The requested collection based on player id on {id} was not found.");
                return null;
            }
            else
            {
                Collection temp = player;
                return temp;
            }
        }
        public async Task<IEnumerable<Card>> GetCards(string id)
        {
            var resutls = await _gameContext.cards.Where(x => x.CollectionID.ToString() == id).ToListAsync();
            if(resutls == null)
            {
                _logger.LogInformation($"found not cards");
                return null;
            }
            return resutls;
        }

        /// <summary>
        /// Returns a list of all players.
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Player>> GetAllPlayers()
        {
            return await _gameContext.players.Select(x => x).ToListAsync();
        }

        /// <summary>
        /// Recieves a username and password. If the player exists changes
        ///  their login status to true.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<ActionResult<Player>> LoginPlayer(string username, string password)
        {
            var player = await _gameContext.players.Where(x => x.userName == username && x.password == password).FirstOrDefaultAsync();
            if (player == null)
            {
                _logger.LogInformation($"The requested player {username} was not found.");
                return null;
            }
            
            try
            {
                player.login = true;
                await _gameContext.SaveChangesAsync();               
            }
            catch(ArgumentNullException E)
            {
                _logger.LogInformation($"There was an issue with updating the db, {E}");
            }

            return player;
        }

        /// <summary>
        /// Finds a player by their id, then sets their login status to false.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ActionResult> Logout(Guid id)
        {
            var loggingOut = await _gameContext.players.Where(x => x.playerId == id).FirstOrDefaultAsync();
            loggingOut.login = false;
            await _gameContext.SaveChangesAsync();
            return null;
        }

        /// <summary>
        /// Adds a new player to the system. They will be defaulted with a 0/0
        ///  win/loss record, and they recieve 10000 tokens. A new collection for
        ///  cards is made as well.
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        public async Task<ActionResult<Player>> CreatePlayer(PlayerViewModel player)
        {
            //check if player by username already exists
            var checkUser = await _gameContext.players.Where(x => x.userName == player.userName).FirstOrDefaultAsync();
            if (checkUser == null)
            { 
                Player temp = new Player()
                {
                    userName = player.userName,
                    password = player.password,
                    wins = 0,
                    losses = 0,
                    tokens = 10000
                };

            _gameContext.players.Add(temp);
            await _gameContext.SaveChangesAsync();

            var check = await _gameContext.players.Where(x => x.playerId == temp.playerId).FirstOrDefaultAsync();
            if (check != null)
            {
                Collection collection = new Collection()
                {
                    collectionHolder = check.playerId,
                    quantity = 0
                };
                _gameContext.collections.Add(collection);

                /*Card anew = new Card()
                {
                    cardId = 442185,
                    cardName = "Animar, Soul of Elements",
                    cardClass = "Legendary Creature — Elemental",
                    attackNumber = 1,
                    defenceNumber = 1,
                    imageURL = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=442185&type=card"
                };
                collection.cards.Add(anew);*/
                await _gameContext.SaveChangesAsync();
                return check;
            }
            else
            {
                _logger.LogInformation("There was an issue with adding a new player.");
            }
        }

            return null;
        }

        /// <summary>
        /// Removes a player from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<IActionResult> DeletePlayer(Guid id)
        {
            var tempCheck = await _gameContext.players.Where(x => x.playerId == id).FirstOrDefaultAsync();
            if (tempCheck == null)
            {
                _logger.LogInformation($"There was an issue with finding player by id: {id}");
                return NotFoundResult();
            }

            try
            {
                Player temp = tempCheck;
                _gameContext.players.Remove(temp);
                await _gameContext.SaveChangesAsync();
            }
            catch(Exception E)
            {
                _logger.LogInformation($"There was an issue with updating the db, {E}");
            }

            return null;
        }

        /// <summary>
        /// Looks for a user with a matching id, then changes their userName
        /// and password to that of the passed in player object.
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        public async Task<ActionResult<Player>> EditPlayer(Player player)
        {
            var temp = await _gameContext.players.Where(x => x.playerId == player.playerId).FirstOrDefaultAsync();

            if(temp == null)
            {
                _logger.LogInformation($"There was an issue with finding player by id: {player.playerId}");
                return null;
            }

            try
            {
                temp.userName = player.userName;
                temp.password = player.password;
                await _gameContext.SaveChangesAsync();
            }
            catch(Exception E)
            {
                _logger.LogInformation($"There was an issue with updating the db, {E}");
            }

            return null;
        }

        private IActionResult NotFoundResult()
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> BoosterToCollection(List<Card> pack, Guid playerid)
        {
            Collection temp = _gameContext.collections.Where(x => x.collectionHolder == playerid).FirstOrDefault();
            foreach(var p in pack)
            {
                p.CollectionID = temp.collectionId;
                //what if the person already has the card in collection
                p.qty += 1;
                temp.quantity += 1;
                _gameContext.cards.Add(p);
            }
            await _gameContext.SaveChangesAsync();
            return null;
        }
        /// <summary>
        /// This will get all the trades offered in the database.
        /// Will return an IEnumerable<Trade>.
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Trade>> GetAllTrades()
        {
            return await _gameContext.trades.ToListAsync();
        }
        /// <summary>
        /// Return a list of trades for a player
        /// </summary>
        /// <param name="playerid"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Trade>> getMyTrades(Guid playerid)
        {
            return await _gameContext.trades.Where(x=> x.postPlayer == playerid).ToListAsync();
        }
        /// <summary>
        /// The trade is saved into the database
        /// </summary>
        /// <param name="trade"></param>
        /// <returns></returns>
        public async Task<ActionResult<Trade>> setUpATrade(Trade trade)
        {
            _gameContext.trades.Add(trade);
            await _gameContext.SaveChangesAsync();
            return null;
        }

        /// <summary>
        /// This fills in the other information about the trade
        /// for another player and what they offered.
        /// </summary>
        /// <param name="tradeView"></param>
        /// <returns></returns>
        public async Task<ActionResult<Trade>> setOfferToTrade(TradeViewModel tradeView)
        {
            Trade trade = _gameContext.trades.Where(x => x.tradeId == tradeView.tradeId).FirstOrDefault();
            if (trade == null)
            {
                _logger.LogInformation($"There was an issue with finding trade by id: {tradeView.tradeId}");
                //return null;
            }
            trade.acceptPlayer = tradeView.playerId;
            trade.acceptPlayerCardOffer = tradeView.playerCardOffer;
            trade.active = false;
            await _gameContext.SaveChangesAsync();
            return null;
        }

        /// <summary>
        /// Executes the trade between two users. The agreed upon cards in each
        ///  of their collections will swap owners in te database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ActionResult> acceptOffer(TradeViewModel id)
        {
            Trade trade = _gameContext.trades.Where(x => x.tradeId == id.tradeId).FirstOrDefault();
            if(trade == null)
            {
                _logger.LogInformation($"There was an issue with finding trade by id: {id.tradeId}");
                //return null;
            }
            Collection p1 = _gameContext.collections.Where(x => x.collectionHolder == trade.postPlayer).FirstOrDefault();
            Collection p2 = _gameContext.collections.Where(x => x.collectionHolder == trade.acceptPlayer).FirstOrDefault();
            Card p1card = _gameContext.cards.Where(x => x.Id == trade.postPlayerCardOffer).FirstOrDefault();
            Card p2card = _gameContext.cards.Where(x => x.Id == trade.acceptPlayerCardOffer).FirstOrDefault();

            p1card.CollectionID = p2.collectionId;
            p2card.CollectionID = p1.collectionId;
            trade.accepted = true;
            //trade.active = false;
            await _gameContext.SaveChangesAsync();
            return null;
        }
    }
}
