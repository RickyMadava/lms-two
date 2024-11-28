import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; chapterId: string } }
) {
  try {
    // Check user
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check own course
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.id,
        userId,
      },
    });
    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check chapter & own videos
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.id,
      },
    });
    if (!chapter) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findUnique({
        where: {
          chapterId: params.chapterId,
        },
      });
      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const deletedChapter = await db.chapter.delete({
        where: {
          id: params.chapterId,
          // courseId: params.id,
        },
      });

      const publishedChaptersInCourse = await db.chapter.findMany({
        where: {
          courseId: params.id,
          isPublished: true,
        },
      });
      if (!publishedChaptersInCourse.length) {
        await db.course.update({
          where: {
            id: params.id,
          },
          data: {
            isPublished: false,
          },
        });
      }
      return NextResponse.json(deletedChapter);
    }

    await db.chapter.delete({
      where: {
        id: params.chapterId,
        courseId: params.id,
      },
    });
    return new NextResponse("Chapter deleted", { status: 200 });
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.id,
        userId,
      },
    });
    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.id,
      },
      data: {
        // title: values.title,
        ...values,
      },
    });

    console.log("[VIDEO_URL] :", values.videoUrl);

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });
      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
      const asset = await mux.video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        max_resolution_tier: "1080p",
        video_quality: "basic",
        test: false,
      });

      console.info("[ASSET]", asset);

      await db.muxData.create({
        data: {
          assetId: asset.id,
          chapterId: params.chapterId,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
