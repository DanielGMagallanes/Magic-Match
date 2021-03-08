using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Core;
using ModelLayer;
using ModelLayer.ModelViews;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MtgApiManager.Lib.Model;
using MtgApiManager.Lib.Service;

namespace BusinessLayer
{
    public class BusinessLayerClass
    {
        private readonly GameRepositoryLayer _gameRepositoryLayer;
        IMtgServiceProvider serviceProvider = new MtgServiceProvider();

        public BusinessLayerClass(GameRepositoryLayer gameRepositoryLayer)
        {
            _gameRepositoryLayer = gameRepositoryLayer;
        }

        public async Task<ActionResult<Collection>> GetCollection(string id)
        {
            return await _gameRepositoryLayer.GetCollection(id);
        }

        public async Task<IEnumerable<Card>> GetCards(string id)
        {
            return await _gameRepositoryLayer.GetCards(id);
        }

        public async Task<IEnumerable<Player>> GetAllPlayers()
        {
            return await _gameRepositoryLayer.GetAllPlayers();
        }
        /// <summary>
        /// using two strings to login a player.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<Player>> LoginPlayer(string username, string password)
        {
            return await _gameRepositoryLayer.LoginPlayer(username, password);
        }
        /// <summary>
        /// This is where we are passing the player who wishes to be 
        /// loged out.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ActionResult> LogoutPlayer(Guid id)
        {
            return await _gameRepositoryLayer.Logout(id);
        }
        /// <summary>
        /// This is just a middle step before the player gets created.
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Player>> CreatePlayer(PlayerViewModel player)
        {
            return await _gameRepositoryLayer.CreatePlayer(player);
        }
        /// <summary>
        /// A Guid is accepted to find the player which wanting wanting or needing 
        /// to be deleted.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<IActionResult> DeletePlayer(Guid id)
        {
            return await _gameRepositoryLayer.DeletePlayer(id);
        }

        /// <summary>
        /// Will return a list of Trades
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Trade>> GetAllTrades()
        {
            return await _gameRepositoryLayer.GetAllTrades();
        }
        /// <summary>
        /// Return a list of trades by the playerid.
        /// </summary>
        /// <param name="playerid"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Trade>> getMyTrades(Guid playerid)
        {
            return await _gameRepositoryLayer.getMyTrades(playerid);
        }
        /// <summary>
        /// This accepts a TradeViewModel which has the player id and 
        /// the card the player offered up. sets active to true.
        /// </summary>
        /// <param name="tradeViewModel"></param>
        /// <returns></returns>
        public async Task<ActionResult<Trade>> setUpATrade(TradeViewModel tradeViewModel)
        {
            Trade trade = new Trade();
            trade.postPlayer = tradeViewModel.playerId;
            trade.postPlayerCardOffer = tradeViewModel.playerCardOffer;
            trade.active = true;

            return await _gameRepositoryLayer.setUpATrade(trade);
        }

        public async Task<ActionResult<Trade>> setOfferToTrade(TradeViewModel tradeView)
        {
            return await _gameRepositoryLayer.setOfferToTrade(tradeView);
        }

        public async Task<ActionResult> acceptOffer(TradeViewModel id)
        {
            return await _gameRepositoryLayer.acceptOffer(id);
        }

        /// <summary>
        /// Calls the EditPlayer method in the repository layer. Passes a
        ///  player object to the EditPlayer method.
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        public async Task<ActionResult<Player>> EditPlayer(Player player)
        {
            return await _gameRepositoryLayer.EditPlayer(player);
        }

        /// <summary>
        /// Using the Muiltverse id to find a card for the magic api wrapper.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ActionResult<Card>> GetCardById(int id)
        {
            ICardService service = serviceProvider.GetCardService();
            var result = await service.FindAsync(id);
            if (result.IsSuccess)
            {
                var value = result.Value;
                int attack = 0;
                int.TryParse(value.Power, out attack);
                int defense = 0;
                int.TryParse(value.Toughness, out defense);
                Card card = new Card()
                {
                    cardId = (int)value.MultiverseId,
                    cardName = value.Name,
                    cardClass = value.Type,
                    attackNumber = attack,
                    defenceNumber = defense,
                    imageURL = value.ImageUrl.ToString()
                };

                return card;
            }
            else
            {
                var exception = result.Exception;
                return null;
            }
        }

        /// <summary>
        /// This is a method for getting a card within a collection by the 
        /// id of the card.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ActionResult<Card>> getCard(int id)
        {
            return await _gameRepositoryLayer.getCard(id);
        }
        /// <summary>
        /// Getting the info we want from and storing it in a card to send back.
        /// If nothing is found than a empty card is returned
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public async Task<ActionResult<Card>> GetCardByName(string name)
        {
            ICardService service = serviceProvider.GetCardService();
            var result = await service.Where(x => x.Name, name).AllAsync();
            var temp = result.Value;
            Card card = new Card();
            foreach (var i in temp)
            {
                if (i.Name == name)
                {
                    int attack = 0;
                    int.TryParse(i.Power, out attack);
                    int defense = 0;
                    int.TryParse(i.Power, out defense);

                    card.cardId = (int)i.MultiverseId;
                    card.cardName = i.Name;
                    card.cardClass = i.Type;
                    card.attackNumber = attack;
                    card.defenceNumber = defense;
                    card.imageURL = i.ImageUrl.ToString();
                }
            }

            return card;
        }
        /// <summary>
        /// This is where get only the information we want at the moment.
        /// We focus on getting creatures or lands only.
        /// </summary>
        /// <param name="pack"></param>
        /// <param name="playerid"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Card>> GetBoosterPack(string pack,Guid playerid)
        {
            List<Card> boosterCards = new List<Card>();
            ISetService service = serviceProvider.GetSetService();
            var result = await service.GenerateBoosterAsync(pack);

            foreach(var card in result.Value)
            {
                for(int i =0; i< card.Types.Length;i++)
                {
                    if(card.Types[i]=="Creature")
                    {
                        Card card1 = new Card();
                        int attack = 0;
                        int.TryParse(card.Power, out attack);
                        int defense = 0;
                        int.TryParse(card.Power, out defense);
                        card1.cardId = (int)card.MultiverseId;
                        card1.cardName = card.Name;
                        card1.cardClass = card.Type;
                        card1.attackNumber = attack;
                        card1.defenceNumber = defense;
                        card1.imageURL = card.ImageUrl.ToString();
                        boosterCards.Add(card1);
                    }
                    else if(card.Types[i] == "Land")
                    {
                        Card card1 = new Card();
                        card1.cardId = (int)card.MultiverseId;
                        card1.cardName = card.Name;
                        card1.cardClass = card.Type;
                        card1.attackNumber = 0;
                        card1.defenceNumber = 0;
                        card1.imageURL = card.ImageUrl.ToString();
                        boosterCards.Add(card1);  
                    }
                }
            }

             await _gameRepositoryLayer.BoosterToCollection(boosterCards, playerid);

            return boosterCards;
        }
    }
}
