using BusinessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelLayer;
using ModelLayer.ModelViews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Controllers
{
    [Route("api/trade")]
    [ApiController]
    public class TradeController : ControllerBase
    {
        private readonly BusinessLayerClass _businessLayer;

        public TradeController(BusinessLayerClass businessLayer)
        {
            _businessLayer = businessLayer;
        }

        [HttpGet]
        [Route("GetAllTrades")]
        public async Task<IEnumerable<Trade>> GetAllTrades()
        {
            return await _businessLayer.GetAllTrades();
        }
        /// <summary>
        /// Returns the trades from a specified playerid.
        /// </summary>
        /// <param name="playerid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("MyTrades")]
        public async Task<IEnumerable<Trade>> getMyTrades(Guid playerid)
        {
            return await _businessLayer.getMyTrades(playerid);
        }
        /// <summary>
        /// Posts a trade based on a tradeViewModel.
        /// </summary>
        /// <param name="tradeViewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("PostTrade")]
        public async Task<ActionResult<Trade>> setUpATrade(TradeViewModel tradeViewModel)
        {
            if(tradeViewModel is null)
            {
                throw new ArgumentNullException(nameof(tradeViewModel));
            }
            return await _businessLayer.setUpATrade(tradeViewModel);
        }
        /// <summary>
        /// Adds an offer to a trade that was posted based on a tradeViewModel.
        /// </summary>
        /// <param name="tradeViewModel"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("PostOffer")]
        public async Task<ActionResult<Trade>> setOfferToTrade(TradeViewModel tradeViewModel)
        {
            if (tradeViewModel is null)
            {
                throw new ArgumentNullException(nameof(tradeViewModel));
            }
            return await _businessLayer.setOfferToTrade(tradeViewModel);
        }

        [HttpPut]
        [Route("AcceptOffer")]
        public async Task<ActionResult> acceptOffer(TradeViewModel id)
        {
            var temp = await _businessLayer.acceptOffer(id);
            if(temp == null)
            {
                return Ok();
            }
            else
            {
                return NoContent();
            }
        }
    }
}
