using System;
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
    public class TradeTests : IClassFixture<GameFactory<Startup>>
    {
        private GameFactory<Startup> Factory;
        public TradeTests(GameFactory<Startup> factory) {
            Factory = factory;
        }
        [Fact]
        public async void TestClientGetTrades()
        {
            var client = Factory.CreateClient();
            var getTradesRequest = new HttpRequestMessage(HttpMethod.Get, "/api/trade/GetAllTrades");
            getTradesRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            var getTradesResponse = await client.SendAsync(getTradesRequest);
            Assert.True(getTradesResponse.IsSuccessStatusCode);
        }
        [Fact]
        public async void TestClientMakeTrade()
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
            var tyler = await loginResponse.Content.ReadFromJsonAsync<Player>();

            var makeTradeRequest = new HttpRequestMessage(HttpMethod.Post, "/api/trade/PostTrade");
            makeTradeRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            makeTradeRequest.Content = JsonContent.Create(new TradeViewModel() {
                playerCardOffer = 234,
                playerId = tyler.playerId
            });
            var makeTradeResponse = await client.SendAsync(makeTradeRequest);
            Assert.True(makeTradeResponse.IsSuccessStatusCode);

            var getMyTradesRequest = new HttpRequestMessage(HttpMethod.Get, $"/api/trade/MyTrades?playerid={tyler.playerId}");
            getMyTradesRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            var getMyTradesResponse = await client.SendAsync(getMyTradesRequest);
            Assert.True(getMyTradesResponse.IsSuccessStatusCode);
            var myTrades = await getMyTradesResponse.Content.ReadFromJsonAsync<List<Trade>>();
            Assert.NotEqual(0, myTrades.Count);
        }
        [Fact]
        public async void TestClientTradeOffer()
        {
            var client = Factory.CreateClient();
            var registerRequest1 = new HttpRequestMessage(HttpMethod.Post, "/api/player/CreatePlayer");
            registerRequest1.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            registerRequest1.Content = JsonContent.Create(new PlayerViewModel() {
                userName = "johnnybgoode",
                password = "revature"
            });
            var registerResponse1 = await client.SendAsync(registerRequest1);
            var loginRequest1 = new HttpRequestMessage(HttpMethod.Post, "/api/player/Login");
            loginRequest1.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            loginRequest1.Content = JsonContent.Create(new PlayerViewModel() {
                userName = "johnnybgoode",
                password = "revature"
            });
            var loginResponse1 = await client.SendAsync(loginRequest1);
            var tyler = await loginResponse1.Content.ReadFromJsonAsync<Player>();

            var makeTradeRequest = new HttpRequestMessage(HttpMethod.Post, "/api/trade/PostTrade");
            makeTradeRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            makeTradeRequest.Content = JsonContent.Create(new TradeViewModel() {
                playerId = tyler.playerId,
                playerCardOffer = 409741
            });
            var makeTradeResponse = await client.SendAsync(makeTradeRequest);
            var getMyTradesRequest = new HttpRequestMessage(HttpMethod.Get, $"/api/trade/MyTrades?playerid={tyler.playerId}");
            getMyTradesRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            var getMyTradesResponse = await client.SendAsync(getMyTradesRequest);
            var myTrades = await getMyTradesResponse.Content.ReadFromJsonAsync<List<Trade>>();
            var trade = myTrades[0];

            var makeOfferRequest = new HttpRequestMessage(HttpMethod.Put, "/api/trade/PostOffer");
            makeOfferRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            makeOfferRequest.Content = JsonContent.Create(new TradeViewModel() {
                tradeId = trade.tradeId,
                playerId = tyler.playerId,
                playerCardOffer = 409741
            });
            var makeOfferResponse = await client.SendAsync(makeOfferRequest);
            Assert.True(makeOfferResponse.IsSuccessStatusCode);
        }
    }
}
