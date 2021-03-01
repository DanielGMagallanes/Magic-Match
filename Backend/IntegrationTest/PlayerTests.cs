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
    public class PlayerTests : IClassFixture<GameFactory<Startup>>
    {
        private GameFactory<Startup> Factory;
        public PlayerTests(GameFactory<Startup> factory) {
            Factory = factory;
        }
        [Fact]
        public async void TestClientCreatePlayer()
        {
            var client = Factory.CreateClient();
            var registerRequest = new HttpRequestMessage(HttpMethod.Post, "/api/player/CreatePlayer");
            registerRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            registerRequest.Content = JsonContent.Create(new PlayerViewModel() {
                userName = "tylercadena",
                password = "revature"
            });
            var registerResponse = await client.SendAsync(registerRequest);
            Assert.True(registerResponse.IsSuccessStatusCode);
        }
        [Fact]
        public async void TestClientLoginLogout()
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
            Assert.True(loginResponse.IsSuccessStatusCode);
            var thePlayer = await loginResponse.Content.ReadFromJsonAsync<Player>();
            var logoutRequest = new HttpRequestMessage(HttpMethod.Put, "/api/player/Logout");
            logoutRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            logoutRequest.Content = JsonContent.Create(thePlayer);
            var logoutResponse = await client.SendAsync(logoutRequest);
            Assert.True(logoutResponse.IsSuccessStatusCode);
        }
        [Fact]
        public async void TestClientEditPlayer()
        {
            var client = Factory.CreateClient();
            var registerRequest = new HttpRequestMessage(HttpMethod.Post, "/api/player/CreatePlayer");
            registerRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            registerRequest.Content = JsonContent.Create(new PlayerViewModel() {
                userName = "johnnybgoode",
                password = "revature"
            });
            var registerResponse = await client.SendAsync(registerRequest);
            var loginRequest = new HttpRequestMessage(HttpMethod.Post, "/api/player/Login");
            loginRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            loginRequest.Content = JsonContent.Create(new PlayerViewModel() {
                userName = "johnnybgoode",
                password = "revature"
            });
            var loginResponse = await client.SendAsync(loginRequest);
            Assert.True(loginResponse.IsSuccessStatusCode);
            var thePlayer = await loginResponse.Content.ReadFromJsonAsync<Player>();
            thePlayer.password = "erutaver";
            var editRequest = new HttpRequestMessage(HttpMethod.Put, "/api/player/EditPlayer");
            editRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            editRequest.Content = JsonContent.Create(thePlayer);
            var editResponse = await client.SendAsync(editRequest);
            Assert.True(editResponse.IsSuccessStatusCode);
        }
        [Fact]
        public async void TestClientDeletePlayer()
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
            Assert.True(loginResponse.IsSuccessStatusCode);
            var thePlayer = await loginResponse.Content.ReadFromJsonAsync<Player>();
            var logoutRequest = new HttpRequestMessage(HttpMethod.Put, "/api/player/Logout");
            logoutRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            logoutRequest.Content = JsonContent.Create(thePlayer);
            var logoutResponse = await client.SendAsync(logoutRequest);
            var deleteRequest = new HttpRequestMessage(HttpMethod.Delete, "/api/player/DeletePlayer");
            deleteRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            deleteRequest.Content = JsonContent.Create(thePlayer);
            var deleteResponse = await client.SendAsync(deleteRequest);
            Assert.True(deleteResponse.IsSuccessStatusCode);
            var allRequest = new HttpRequestMessage(HttpMethod.Get, "/api/player/GetPlayers");
            allRequest.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            var allResponse = await client.SendAsync(allRequest);
            Assert.True(allResponse.IsSuccessStatusCode);
            var listPlayers = await allResponse.Content.ReadFromJsonAsync<List<Player>>();
            Assert.Null(listPlayers.Find(p => p.playerId == thePlayer.playerId));
        }
    }
}
