using Microsoft.AspNetCore.Identity;

namespace AuthDemo.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var db = services.GetRequiredService<AppDbContext>();
        db.Database.EnsureCreated();

        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();

        const string email = "demo@demo.com";
        const string password = "Demo@1234";

        if (await userManager.FindByEmailAsync(email) == null)
        {
            var user = new IdentityUser
            {
                UserName = email,
                Email = email,
                EmailConfirmed = true
            };

            await userManager.CreateAsync(user, password);
        }
    }
}
