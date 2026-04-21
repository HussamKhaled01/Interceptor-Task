// A generic API response interface in TypeScript.
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// A constrained generic utility function for logging any API response.
export function logResponse<T extends { success: boolean; message: string }>(response: T): void {
  console.log(`[API LOG] Status: ${response.success}, Message: ${response.message}`);
}
