import { NextResponse } from "next/server";

export const handleError = async (error: any) => {
  // Log the error for debugging
  console.error("Error:", error);

  // Construct appropriate response based on error type and context
  if (error.statusCode) {
    // Handle specific HTTP error codes
    return NextResponse.next({
      // Use error.statusCode as the response status code
      status: error.statusCode,
    });
  } else {
    // Handle generic errors
    return NextResponse.next({
      // Use a default error status code
      status: 500,
    });
  }
};
