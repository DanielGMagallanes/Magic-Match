using Microsoft.EntityFrameworkCore;
using ModelLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepositoryLayer
{
    public class GameContext : DbContext
    {
        public DbSet<Player> players { get; set; }
        public DbSet<Card> cards { get; set; }
        public DbSet<Collection> collections { get; set; }
        public DbSet<Match> matches { get; set; }
        public DbSet<PairMatch> pairs { get; set; }
        public DbSet<Trade> trades { get; set; }

        public GameContext() { }
        public GameContext(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlServer("Server=LocalHost\\SQLEXPRESS01;Database=Project_2_Magic;Trusted_Connection=True;");
            }
        }
    }
}
