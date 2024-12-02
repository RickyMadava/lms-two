"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}
const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   if (playbackId) {
  //     setIsReady(false);
  //   }
  // }, [playbackId]);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute flex inset-0 items-center justify-center bg-slate-800">
          <Loader2 className="h-10 w-10 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-3 bg-slate-800">
          <Lock className="h-10 w-10 text-secondary" />
          <p className="text-lg font-bold text-secondary">Locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          playbackId={playbackId}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {
            // if (completeOnEnd) {
            //   axios.post(
            //     `/api/courses/${courseId}/chapters/${chapterId}/progress`,
            //     {
            //       isCompleted: true,
            //     }
            //   );
            //   useConfettiStore.setState({ open: true });
            // }
            // if (nextChapterId) {
            //   router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            // }
          }}
          autoPlay
        />
      )}
    </div>
  );
};

export default VideoPlayer;
