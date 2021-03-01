using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using RepositoryLayer;

namespace IntegrationTest.Utility
{
    public class GameFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseContentRoot(".");
			base.ConfigureWebHost(builder);
			builder.ConfigureServices(services => {
				var descriptor = services.SingleOrDefault(d =>
					d.ServiceType == typeof(DbContextOptions<GameContext>)
				);
				services.Remove(descriptor);
				services.AddDbContext<GameContext>(options => {
					options.UseInMemoryDatabase(databaseName: "InMemoryDb");
				});
				var sp = services.BuildServiceProvider();
				using (var scope = sp.CreateScope()) {
					var scopedServices = scope.ServiceProvider;
					var db = scopedServices.GetRequiredService<GameContext>();
					var logger = scopedServices.GetRequiredService<ILogger<GameFactory<TStartup>>>();
					db.Database.EnsureDeleted();
					db.Database.EnsureCreated();
				}
			});
        }
    }
}