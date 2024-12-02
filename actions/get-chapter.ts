import { db } from "@/lib/db";
import { Attachement, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}
export default async function getChapter({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: { price: true },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachements: Attachement[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachements = await db.attachement.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: { chapterId },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: { position: "asc" },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        chapterId_userId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      userProgress,
      attachements,
      nextChapter,
      purchase,
    };
  } catch (error) {
    console.log("[GET_CHAPTER] :", error);
    return {
      chapter: null,
      couser: null,
      muxData: null,
      userProgress: null,
      attachements: [],
      nextChapter: null,
      purchase: null,
    };
  }
}
