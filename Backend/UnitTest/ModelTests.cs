using Xunit;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

using ModelLayer;
using ModelLayer.ModelViews;

// 'int' is not nullable by default so some instances of Required cannot be tested.

namespace UnitTest
{
    public class ModelTests
    {
        [Fact]
        public void TestValidateCardRequired()
        {
            Card card = new Card();
            ValidationContext context = new ValidationContext(card);
            List<ValidationResult> results = new List<ValidationResult>();

            bool valid = Validator.TryValidateObject(card, context, results, true);
            Assert.False(valid);
            
            Assert.Equal(3, results.Count);
        }
        [Fact]
        public void TestValidateCollectionRange()
        {
            Collection collection = new Collection();
            ValidationContext context = new ValidationContext(collection);
            List<ValidationResult> results = new List<ValidationResult>();

            bool valid = Validator.TryValidateObject(collection, context, results, true);
            Assert.True(valid);
            Assert.Equal(0, results.Count);
        }
        [Fact]
        public void TestValidateTradeRequired() {
            Trade trade = new Trade();
            ValidationContext context = new ValidationContext(trade);
            List<ValidationResult> results = new List<ValidationResult>();

            bool valid = Validator.TryValidateObject(trade, context, results, true);
            Assert.True(valid);
            Assert.Equal(0, results.Count);
        }
        [Fact]
        public void TestValidatePlayerRequired()
        {
            Player player = new Player();
            ValidationContext context = new ValidationContext(player);
            List<ValidationResult> results = new List<ValidationResult>();

            bool valid = Validator.TryValidateObject(player, context, results, true);
            Assert.False(valid);
            Assert.Equal(2, results.Count);
        }
        [Fact]
        public void TestValidatePlayerStringLengthAndRange()
        {
            Player player = new Player() {
                userName = "Supercalifragilisticexpialidocious",
                password = "Supercalifragilisticexpialidocious",
                wins = -1,
                losses = -1
            };
            ValidationContext context = new ValidationContext(player);
            List<ValidationResult> results = new List<ValidationResult>();

            bool valid = Validator.TryValidateObject(player, context, results, true);
            Assert.False(valid);
            Assert.Equal(4, results.Count);
            Assert.Equal("The user name must be within 3 to 25 characters", results[0].ErrorMessage);
            Assert.Equal("The user name must be within 3 to 25 characters", results[1].ErrorMessage);
        }
        [Fact]
        public void TestValidateMatchAndPair()
        {
            Player player1 = new Player() {
                userName = "Supercalifragilisticexpialidocious",
                password = "Supercalifragilisticexpialidocious",
                wins = 9,
                losses = 1
            };
            Player player2 = new Player() {
                userName = player1.userName.Reverse().ToString(),
                password = player1.password.Reverse().ToString(),
                wins = 3,
                losses = 23
            };
            Match match = new Match() {
                matchId = 2,
                player1 = player1,
                player1PairPicked = 2,
                player2 = player2,
                player2PairPicked = 4
            };
            ValidationContext contextMatch = new ValidationContext(match);
            List<ValidationResult> resultsMatch = new List<ValidationResult>();
            bool validMatch = Validator.TryValidateObject(match, contextMatch, resultsMatch, true);
            Assert.True(validMatch);

            PairMatch pair = new PairMatch() {
                pairId = 3,
                cardId = 46,
                matchId = match.matchId,
                player = player1
            };
            ValidationContext contextPair = new ValidationContext(pair);
            List<ValidationResult> resultsPair = new List<ValidationResult>();
            bool validPair = Validator.TryValidateObject(pair, contextPair, resultsPair, true);
            Assert.True(validPair);
        }
        [Fact]
        public void TestValidatePlayerViewModelRequired()
        {
            PlayerViewModel pvm = new PlayerViewModel();
            ValidationContext context = new ValidationContext(pvm);
            List<ValidationResult> results = new List<ValidationResult>();

            bool valid = Validator.TryValidateObject(pvm, context, results, true);
            Assert.False(valid);
            Assert.Equal(2, results.Count);
        }
        [Fact]
        public void TestValidatePlayerViewModelStringLength()
        {
            PlayerViewModel pvm = new PlayerViewModel() {
                userName = "Supercalifragilisticexpialidocious",
                password = "Supercalifragilisticexpialidocious",
            };
            ValidationContext context = new ValidationContext(pvm);
            List<ValidationResult> results = new List<ValidationResult>();

            bool valid = Validator.TryValidateObject(pvm, context, results, true);
            Assert.False(valid);
            Assert.Equal(2, results.Count);
            Assert.Equal("The user name must be within 3 to 25 characters", results[0].ErrorMessage);
            Assert.Equal("The user name must be within 3 to 25 characters", results[1].ErrorMessage);
        }
        
    }
}
