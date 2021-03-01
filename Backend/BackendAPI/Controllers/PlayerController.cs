using Microsoft.AspNetCore.Mvc;
using ModelLayer;
using BusinessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ModelLayer.ModelViews;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackendAPI.Controllers
{
    [Route("api/player")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly BusinessLayerClass _businessLayer;

        public PlayerController(BusinessLayerClass businessLayer)
        {
            _businessLayer = businessLayer;
        }
        /// <summary>
        /// This is intened for an Admin to see all the players using the site.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetPlayers")]
       // [Authorize]
        public async Task<IEnumerable<Player>> GetPlayers()
        {
            return await _businessLayer.GetAllPlayers();

        }
        /// <summary>
        /// This is a login which takes a PlayerViewModel as a parameter. Containing only
        /// two strings inside for username and password.
        /// </summary>
        /// <param name="playerViewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<Player>> Login(PlayerViewModel playerViewModel)
        {
            var check = await _businessLayer.LoginPlayer(playerViewModel.userName,playerViewModel.password);
            if(check == null)
            {
                return CreatedAtAction("CreatePlayer", playerViewModel);
            }
            return check;

        }
        /// <summary>
        /// Accepts a player who wishes to be logged out.
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("Logout")]
        public async Task<ActionResult<Player>> Logout(Player player)
        {
            var temp = await _businessLayer.LogoutPlayer(player.playerId);
            if(temp == null)
            {
                return CreatedAtAction("Login", temp);
            }
            return NoContent();
        }

        /// <summary>
        /// This is a function which will allow a player to edit the 
        /// information already given.
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("EditPlayer")]
        public async Task<ActionResult<Player>> EditPlayer(Player player)
        {
            var temp = await _businessLayer.EditPlayer(player);

            if (temp == null)
            {
                return Ok();
            }
            else
            {
                return NoContent();
            }
        }
        /// <summary>
        /// Using a playerviewmodel to makde a new user.
        /// </summary>
        /// <param name="playerViewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CreatePlayer")]
        public async Task<ActionResult<Player>> CreatePlayer(PlayerViewModel playerViewModel)
        {
            var temp2 = await _businessLayer.CreatePlayer(playerViewModel);

            return CreatedAtAction("Login", new { username = playerViewModel.userName, pass = playerViewModel.password },temp2);
        }

        /// <summary>
        /// Delete player profile by the id of the profile.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("DeletePlayer")]
        public async Task<IActionResult> DeletePlayer(Player id)
        {
            var isDone = await _businessLayer.DeletePlayer(id.playerId);

            return NoContent();
        }
    }
}
