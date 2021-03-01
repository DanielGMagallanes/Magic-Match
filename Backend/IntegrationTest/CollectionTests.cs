using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using Xunit;

using BackenAPI;
using ModelLayer;
using ModelLayer.ModelViews;
using IntegrationTest.Utility;

namespace IntegrationTest
{
    public class CollectionTests : IClassFixture<GameFactory<Startup>>
    {
        private GameFactory<Startup> Factory;
        public CollectionTests(GameFactory<Startup> factory) {
            Factory = factory;
        }
        [Fact]
        public async void TestClientGetCardIdOrName()
        {
            var client = Factory.CreateClient();
            var findCardIdRequest = new HttpRequestMessage(HttpMethod.Get, "/api/MagicAPI/cardById/123");
            findCardIdRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            //findCardIdRequest.Content = JsonContent.Create(123);
            var findCardIdResponse = await client.SendAsync(findCardIdRequest);
            Assert.True(findCardIdResponse.IsSuccessStatusCode);

            var findCardNameRequest = new HttpRequestMessage(HttpMethod.Get, "/api/MagicAPI/cardByName/khans");
            findCardNameRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            var findCardNameResponse = await client.SendAsync(findCardNameRequest);
            Assert.True(findCardNameResponse.IsSuccessStatusCode);
        }
        [Fact]
        public async void TestClientAddBooster()
        {
            var client = Factory.CreateClient();
            var registerRequest = new HttpRequestMessage(HttpMethod.Post, "/api/player/CreatePlayer");
            registerRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            registerRequest.Content = JsonContent.Create(new PlayerViewModel() {
                userName = "tylercadena",
                password = "revature"
            });
            var registerResponse = await client.SendAsync(registerRequest);
            var loginRequest = new HttpRequestMessage(HttpMethod.Post, "/api/player/Login");
            loginRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            loginRequest.Content = JsonContent.Create(new PlayerViewModel() {
                userName = "tylercadena",
                password = "revature"
            });
            var loginResponse = await client.SendAsync(loginRequest);
            var thePlayer = await loginResponse.Content.ReadFromJsonAsync<Player>();
            var addBoosterRequest = new HttpRequestMessage(HttpMethod.Post, "/api/MagicAPI/BoosterPack");
            addBoosterRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            addBoosterRequest.Content = JsonContent.Create(new BoosterForPlayer() {
                playerBoughtPack = thePlayer.playerId,
                setid = "ktk"
            });
            var addBoosterResponse = await client.SendAsync(addBoosterRequest);
            Assert.True(addBoosterResponse.IsSuccessStatusCode);
        }
        [Fact]
        public async void TestClientCollectionAddGet()
        {
            var client = Factory.CreateClient();
            var registerRequest = new HttpRequestMessage(HttpMethod.Post, "/api/player/CreatePlayer");
            registerRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            registerRequest.Content = JsonContent.Create(new PlayerViewModel() {
                userName = "tylercadena",
                password = "revature"
            });
            var registerResponse = await client.SendAsync(registerRequest);
            var loginRequest = new HttpRequestMessage(HttpMethod.Post, "/api/player/Login");
            loginRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            loginRequest.Content = JsonContent.Create(new PlayerViewModel() {
                userName = "tylercadena",
                password = "revature"
            });
            var loginResponse = await client.SendAsync(loginRequest);
            var thePlayer = await loginResponse.Content.ReadFromJsonAsync<Player>();
            var addBoosterRequest = new HttpRequestMessage(HttpMethod.Post, "/api/MagicAPI/BoosterPack");
            addBoosterRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            addBoosterRequest.Content = JsonContent.Create(new BoosterForPlayer() {
                playerBoughtPack = thePlayer.playerId,
                setid = "ktk"
            });
            var addBoosterResponse = await client.SendAsync(addBoosterRequest);
            var theBooster = await addBoosterResponse.Content.ReadFromJsonAsync<List<Card>>();
            var getCollectionRequest = new HttpRequestMessage(HttpMethod.Post, $"/api/collection/collections");
            getCollectionRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            getCollectionRequest.Content = JsonContent.Create(new Collection() {
                collectionHolder = thePlayer.playerId
            });
            var getCollectionResponse = await client.SendAsync(getCollectionRequest);
            Assert.True(getCollectionResponse.IsSuccessStatusCode);
            var theCollection = await getCollectionResponse.Content.ReadFromJsonAsync<Collection>();
            var getCardsInCollectionRequest = new HttpRequestMessage(HttpMethod.Post, "/api/collection/GetCardsInCollection");
            getCardsInCollectionRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            getCardsInCollectionRequest.Content = JsonContent.Create(new Collection() {
                collectionId = theCollection.collectionId
            });
            var getCardsInCollectionResponse = await client.SendAsync(getCardsInCollectionRequest);
            Assert.True(getCardsInCollectionResponse.IsSuccessStatusCode);
            var theCards = await getCardsInCollectionResponse.Content.ReadFromJsonAsync<List<Card>>();
            Assert.True(theCards.Exists(c => c.CollectionID == theBooster[0].CollectionID));
        }
    }
}