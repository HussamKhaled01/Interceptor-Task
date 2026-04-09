using AuthDemo.Api.Models;
using AuthDemo.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AuthDemo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly TokenService _tokenService;

    public AuthController(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        TokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return Unauthorized("Invalid credentials");

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
        if (!result.Succeeded)
            return Unauthorized("Invalid credentials");

        var token = await _tokenService.GenerateToken(user);

        return Ok(new LoginResponse
        {
            Token = token,
            Email = user.Email!,
            ExpiresAt = DateTime.UtcNow.AddHours(1)
        });
    }

    [HttpGet("admin-check")]
    [Authorize(Roles = "Admin")]
    public IActionResult CheckAdmin()
    {
        return Ok(new { message = "Success! You are verified as an Admin." });
    }

    [HttpGet("fail-check")]
    [Authorize(Roles = "SuperAdmin")]
    public IActionResult CheckFail()
    {
        return Ok(new { message = "You shouldn't see this!" });
    }
}
