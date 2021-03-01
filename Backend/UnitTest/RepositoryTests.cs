using Xunit;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

using RepositoryLayer;
using ModelLayer.ModelViews;

namespace UnitTest
{
    public class RepositoryTests
    {
        private GameContext context;
        private GameRepositoryLayer MakeRepository(string name) {
            var options = new DbContextOptionsBuilder<GameContext>()
                .UseInMemoryDatabase(databaseName: $"{name}DB")
                .Options;
            context = new GameContext(options);
            return new GameRepositoryLayer(context, null);
        }
        [Fact]
        public async void TestRepositoryCreatePlayer()
        {
            var repository = MakeRepository("TestRepositoryCreatePlayer");
            var pvm = new PlayerViewModel() {
                userName = "tylercadena",
                password = "revature"
            };
            var result = await repository.CreatePlayer(pvm);
            var player = result.Value;
            Assert.Equal("tylercadena", player.userName);
            Assert.Equal("revature", player.password);
        }
        [Fact]
        public async void TestRepositoryLoginLogout() {
            var repository = MakeRepository("TestRepositoryLoginLogout");
            var pvm = new PlayerViewModel() {
                userName = "tylercadena",
                password = "revature"
            };
            var createResult = await repository.CreatePlayer(pvm);
            var createdPlayer = createResult.Value;
            var loginResult = await repository.LoginPlayer("tylercadena", "revature");
            var loginPlayer = loginResult.Value;
            Assert.NotNull(loginPlayer);
            Assert.Equal(createdPlayer.userName, loginPlayer.userName);
            Assert.Equal(createdPlayer.password, loginPlayer.password);
            Assert.Equal(createdPlayer.playerId, loginPlayer.playerId);
        }
        [Fact]
        public async void TestRepositoryDeletePlayer() {
            var repository = MakeRepository("TestRepositoryDeletePlayer");
            var pvm = new PlayerViewModel() {
                userName = "tylercadena",
                password = "revature"
            };
            var createResult = await repository.CreatePlayer(pvm);
            var createdPlayer = createResult.Value;
            var deleteResult = await repository.DeletePlayer(createdPlayer.playerId);
            Assert.Null(deleteResult);
        }
        [Fact]
        public async void TestRepositoryAllPlayers() {
            var repository = MakeRepository("TestRepositoryAllPlayers");
            var pvms = new PlayerViewModel[] {
                new PlayerViewModel() { userName = "tylercadena", password = "revature" },
                new PlayerViewModel() { userName = "marcantony", password = "caesar" },
                new PlayerViewModel() { userName = "elvispresley", password = "groundhog" }
            };
            foreach (var pvm in pvms) {
                var createResult = await repository.CreatePlayer(pvm);
                var temp = createResult.Value;  
            }
            var playersResult = await repository.GetAllPlayers();
            var players = playersResult.ToList();
            Assert.Equal("tylercadena", players[0].userName);
            Assert.Equal("marcantony", players[1].userName);
            Assert.Equal("elvispresley", players[2].userName);
        }
    }
}
