"use client";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { FileVideo, Files, Upload } from "lucide-react";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { GetFfmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const Video = () => {
  const [VideoFile, setVideoFile] = useState<File | null>(null);
  const PromptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;
    if (!files) {
      return;
    }
    const selecFile = files[0];
    setVideoFile(selecFile);
  }

  async function ConvertVideo(video: File) {
    console.log("convert video");
    const ffmpeg = await GetFfmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));
    /*ffmpeg.on('log' , log => {
    console.log(log)
  })*/

    ffmpeg.on("progress", (progress) => {
      console.log("convert progress" + Math.round(progress.progress * 100));
    });

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "Output.mp3",
    ]);

    const data = await ffmpeg.readFile("Output.mp3");
    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });

    console.log("covert finished");
    return audioFile;
  }

  async function HandleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = PromptInputRef.current?.value;
    if (!VideoFile) {
      return;
    }

    const audioFile = await ConvertVideo(VideoFile);
    console.log(audioFile);
  }

  const PreviewUrl = useMemo(() => {
    if (!VideoFile) {
      return null;
    }
    return URL.createObjectURL(VideoFile);
  }, [VideoFile]);

  return (
    <form onSubmit={HandleUploadVideo} action="" className="space-y-6 ">
      <label
        htmlFor="video"
        className="overflow-hidden relative border flex items-center justify-center rounded-md aspect-video cursor-pointer border-dashed flex-col text-sm gap-2 hover:bg-primary/5"
      >
        {PreviewUrl ? (
          <video
            src={PreviewUrl}
            controls={false}
            className="pointer-events-none absolute "
          />
        ) : (
          <>
            <FileVideo />
            upload video
          </>
        )}
      </label>
      <input
        type="file"
        id="video"
        accept="video/mp4"
        onChange={handleFileSelect}
        className="sr-only"
      />
      <Separator />
      <div className="space-y-1">
        <Label htmlFor="transcription_prompt ">transcription prompt </Label>
        <Textarea
          ref={PromptInputRef}
          id="transcription_prompt"
          className="min-h-20 leading-6 resize-none"
          placeholder="Include keywords mentioned in the video separated by commas (,)"
        />
      </div>
      <Button type="submit" className="w-full">
        Upload video <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
};

export default Video;
