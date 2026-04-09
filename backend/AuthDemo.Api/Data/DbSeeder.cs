using Microsoft.AspNetCore.Identity;

namespace AuthDemo.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var db = services.GetRequiredService<AppDbContext>();
        db.Database.EnsureCreated();

        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

        // Create the Admin Role if it doesnt exist
        const string adminRole = "Admin";
        if (!await roleManager.RoleExistsAsync(adminRole))
        {
            await roleManager.CreateAsync(new IdentityRole(adminRole));
        }

        const string email = "demo@demo.com";
        const string password = "Demo@1234";

        var user = await userManager.FindByEmailAsync(email);
        if (user == null)
        {
            user = new IdentityUser
            {
                UserName = email,
                Email = email,
                EmailConfirmed = true
            };

            await userManager.CreateAsync(user, password);
        }

        // Ensure the user has the Admin Role
        if (!await userManager.IsInRoleAsync(user, adminRole))
        {
            await userManager.AddToRoleAsync(user, adminRole);
        }
    }
}
