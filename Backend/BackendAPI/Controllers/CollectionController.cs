
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer;
using Microsoft.AspNetCore.Mvc;
using ModelLayer;
using ModelLayer.ModelViews;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackendAPI.Controllers
{
    [Route("api/collection")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly BusinessLayerClass _businessLayer;

        public CollectionController(BusinessLayerClass businessLayer)
        {
            _businessLayer = businessLayer;
        }

        [HttpPost]
        [Route("collections")]
        public async Task<ActionResult<Collection>> GetCollection(Collection id)
        {
            return await _businessLayer.GetCollection(id.collectionHolder.ToString());
        }

        [HttpPost]
        [Route("GetCardsInCollection")]
        public async Task<IEnumerable<Card>> GetCards(Collection id)
        {
            return await _businessLayer.GetCards(id.collectionId.ToString());
        }

        [HttpGet]
        [Route("GetCard/{id}")]
        public async Task<ActionResult<Card>> getCard(int id)
        {
            return await _businessLayer.getCard(id);
        }

        //[HttpPost]
        //[Route("add")]
        //public async Task<ActionResult<Collection>> AddToCollection(CollectionViewModel collection)
        //{
        //    return await _businessLayer.AddToCollection(collection);
        //}
    }
}