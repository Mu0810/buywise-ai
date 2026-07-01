import { NextResponse, type NextRequest } from "next/server";

import { env, isProduction } from "@/lib/env";
import { logger } from "@/lib/logger";
import { getAlertService } from "@/server/container";

/**
 * Price-drop check job. Wire a scheduler (e.g. Vercel Cron) to hit this
 * endpoint. Protected by CRON_SECRET in production; open in development to
 * allow manual runs.
 */
async function run(request: NextRequest) {
  if (env.CRON_SECRET) {
    const header = request.headers.get("authorization")?.replace("Bearer ", "");
    const provided = header ?? request.nextUrl.searchParams.get("secret");
    if (provided !== env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (isProduction) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured" },
      { status: 503 },
    );
  }

  try {
    const result = await getAlertService().checkAll();
    logger.info("Price alert check complete", result);
    return NextResponse.json(result);
  } catch (error) {
    logger.error("Price alert check failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}

export function GET(request: NextRequest) {
  return run(request);
}

export function POST(request: NextRequest) {
  return run(request);
}
