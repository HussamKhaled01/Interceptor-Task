using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AuthDemo.Api.Models;

namespace AuthDemo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> _products =
    [
        new Product { Id = 1, Name = "Laptop",   Price = 999.99m },
        new Product { Id = 2, Name = "Mouse",    Price = 29.99m  },
        new Product { Id = 3, Name = "Keyboard", Price = 79.99m  },
        new Product { Id = 4, Name = "Monitor",  Price = 349.99m }
    ];

    // Returns all products wrapped in ApiResponse<List<Product>>
    [HttpGet]
    public ActionResult<ApiResponse<List<Product>>> GetAll()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        return Ok(ApiResponse<List<Product>>.CreateSuccess(_products, $"Products retrieved for {email}"));
    }

    // Testing generic response with 'string' type
    [HttpGet("status")]
    public ActionResult<ApiResponse<string>> GetStatus()
    {
        return Ok(ApiResponse<string>.CreateSuccess("All systems operational"));
    }

    // Testing generic response with 'int' type
    [HttpGet("count")]
    public ActionResult<ApiResponse<int>> GetCount()
    {
        return Ok(ApiResponse<int>.CreateSuccess(_products.Count));
    }

    // Testing generic error response
    [HttpGet("not-found/{id}")]
    public ActionResult<ApiResponse<Product>> GetById(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);

        if (product is null)
            return NotFound(ApiResponse<Product>.CreateError($"Product with ID {id} was not found"));

        return Ok(ApiResponse<Product>.CreateSuccess(product));
    }
}
