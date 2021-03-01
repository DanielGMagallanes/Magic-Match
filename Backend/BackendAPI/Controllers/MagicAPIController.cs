using BusinessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelLayer;
using ModelLayer.ModelViews;
using MtgApiManager.Lib.Model;
using MtgApiManager.Lib.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Controllers
{
    [Route("api/MagicAPI")]
    [ApiController]
    public class MagicAPIController : ControllerBase
    {
        private readonly BusinessLayerClass _businessLayer;

        public MagicAPIController(BusinessLayerClass businessLayer)
        {
            _businessLayer = businessLayer;
        }
        /// <summary>
        /// This will accept an int as a parameter to return a card with that id.
        /// the ID we use is the mulitverse id because these are uqiue.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("cardById/{id}")]
        public async Task<ActionResult<Card>> GetCardById(int id)
        {
            return await _businessLayer.GetCardById(id);
        }


        /// <summary>
        /// Instead you can use a name of the card. this must be the exact name
        /// of the card you want to find.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("cardByName/{name}")]
        public async Task<ActionResult<Card>> GetCardByName(string name)
        {
            return await _businessLayer.GetCardById(name);
        }
        /// <summary>
        /// This take a BoostForPlayer which contains the set id and the 
        /// player id. using these two we get a booster pack for the set and
        /// add it to the players colleciton
        /// </summary>
        /// <param name="boosterForPlayer"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("BoosterPack")]
        public async Task<IEnumerable<Card>> GetBoosterPack(BoosterForPlayer boosterForPlayer)
        {
            return await _businessLayer.GetBoosterPack(boosterForPlayer.setid,boosterForPlayer.playerBoughtPack);
        }
    }
}
