import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

type ProcessMode = "remove-background" | "on-model";

interface ProcessRequest {
  fileId: string;
  mode: ProcessMode;
  options?: {
    modelGender?: "female" | "male";
    modelStyle?: "minimal" | "editorial" | "casual";
    backgroundType?: "white" | "gradient" | "transparent";
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ProcessRequest = await request.json();
    const { fileId, mode, options } = body;

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    if (!mode || !["remove-background", "on-model"].includes(mode)) {
      return NextResponse.json(
        { error: "Invalid mode. Use 'remove-background' or 'on-model'." },
        { status: 400 }
      );
    }

    // Simulate AI processing time
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 1000)
    );

    // In production: call your AI service (Replicate, OpenAI, custom model, etc.)
    // and return the processed image URL

    // Mock response with placeholder processed image
    const processedId = `processed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const mockResults: Record<ProcessMode, object> = {
      "remove-background": {
        processedId,
        mode: "remove-background",
        resultUrl: "https://via.placeholder.com/800x1000/FFFFFF/000000?text=Studio+Background",
        // In production: actual URL from AI processing
        backgroundType: options?.backgroundType ?? "white",
        processingTime: 2.3,
      },
      "on-model": {
        processedId,
        mode: "on-model",
        resultUrl: "https://via.placeholder.com/800x1000/F5F5F5/333333?text=On+Model",
        // In production: actual URL from AI processing
        modelGender: options?.modelGender ?? "female",
        modelStyle: options?.modelStyle ?? "minimal",
        processingTime: 4.7,
      },
    };

    return NextResponse.json({
      success: true,
      fileId,
      ...mockResults[mode],
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Internal server error during processing" },
      { status: 500 }
    );
  }
}

// GET endpoint to check processing status (for async jobs)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
  }

  // In production: check job status from queue/database
  return NextResponse.json({
    jobId,
    status: "completed", // pending | processing | completed | failed
    progress: 100,
    resultUrl: null, // URL when completed
  });
}
