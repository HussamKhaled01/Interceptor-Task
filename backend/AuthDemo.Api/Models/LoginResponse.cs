namespace AuthDemo.Api.Models;

public class LoginResponse
{
    public string Token { get; set; } = "";
    public string Email { get; set; } = "";
    public DateTime ExpiresAt { get; set; }
}
