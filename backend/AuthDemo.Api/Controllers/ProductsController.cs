using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuthDemo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private static readonly List<object> _products =
    [
        new { Id = 1, Name = "Laptop",   Price = 999.99 },
        new { Id = 2, Name = "Mouse",    Price = 29.99  },
        new { Id = 3, Name = "Keyboard", Price = 79.99  },
        new { Id = 4, Name = "Monitor",  Price = 349.99 }
    ];

    [HttpGet]
    public IActionResult GetAll()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);

        return Ok(new
        {
            requestedBy = email,
            products = _products
        });
    }
}
