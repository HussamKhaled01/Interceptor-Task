namespace AuthDemo.Api.Models;

// A generic response wrapper that works with any non-nullable type.
public class ApiResponse<T> where T : notnull
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public string Message { get; set; } = string.Empty;

    public static ApiResponse<T> CreateSuccess(T data, string message = "Request successful")
    {
        return new ApiResponse<T>
        {
            Success = true,
            Data = data,
            Message = message
        };
    }

    public static ApiResponse<T> CreateError(string message = "Something went wrong")
    {
        return new ApiResponse<T>
        {
            Success = false,
            Data = default,
            Message = message
        };
    }
}
